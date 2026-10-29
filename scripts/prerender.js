// Build step 3 of 3 (see "build" in package.json).
//
// Renders every page in every language to a static HTML file in dist/, so
// crawlers and link previews receive real content and metadata without running
// JavaScript. Also writes 404.html, _headers (the security and caching headers
// Cloudflare serves with the files) and, when VITE_SITE_URL is set, sitemap.xml
// and the Sitemap line in robots.txt.
import { createHash } from 'node:crypto'
import { appendFile, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-ssr')

const HEAD_SLOT = '<!--app-head-->'
const HTML_SLOT = '<!--app-html-->'
// React writes <title>, <meta> and <link> tags at the very start of its output.
const LEADING_HEAD_TAGS = /^(?:<title>[^<]*<\/title>|<meta [^>]*\/>|<link [^>]*\/>)+/

const { render, pages, redirects, siteUrl, defaultLanguage, enquiryApiUrl } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
)
// The body text face (Inter, Latin subset) is only discovered once the CSS has
// been parsed, so it arrived late and text drawn in the fallback font reflowed
// when it landed. Preloading it starts the download with the page. The file
// name carries a content hash, so it is looked up in the build output.
const bodyFont = (await readdir(path.join(distDir, 'assets'))).find((name) =>
  /^inter-latin-wght-normal-.*\.woff2$/.test(name),
)
const template = (await readFile(path.join(distDir, 'index.html'), 'utf8')).replace(
  '</head>',
  bodyFont
    ? `  <link rel="preload" as="font" type="font/woff2" href="/assets/${bodyFont}" crossorigin />\n  </head>`
    : '</head>',
)

if (!template.includes(HEAD_SLOT) || !template.includes(HTML_SLOT)) {
  throw new Error(`index.html must contain ${HEAD_SLOT} and ${HTML_SLOT}`)
}

function buildDocument(urlPath) {
  const { html, language } = render(urlPath)
  const head = html.match(LEADING_HEAD_TAGS)?.[0] ?? ''

  if (!head.includes('<title>')) {
    throw new Error(`No <title> was rendered for ${urlPath}`)
  }

  return template
    .replace('<html lang="en">', `<html lang="${language}">`)
    .replace(HEAD_SLOT, `<!--seo-start-->${head}<!--seo-end-->`)
    .replace('<div id="root">', `<div id="root" data-prerendered="${urlPath}">`)
    .replace(HTML_SLOT, html.slice(head.length))
}

async function writePage(urlPath) {
  const file = path.join(distDir, urlPath, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, buildDocument(urlPath))
}

// A page that only forwards the visitor, for an old address whose content now
// lives in a section of the home page. Works on any static host and without
// the app's JavaScript; kept out of search results and the sitemap.
function buildRedirect(to) {
  const target = siteUrl ? `${siteUrl}${to}` : to
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<meta charset="utf-8" />',
    '<meta name="robots" content="noindex" />',
    `<link rel="canonical" href="${target}" />`,
    `<meta http-equiv="refresh" content="0; url=${to}" />`,
    '<title>Redirecting…</title>',
    `<script>location.replace(${JSON.stringify(to)})</script>`,
    `<p><a href="${to}">Continue</a></p>`,
    '',
  ].join('\n')
}

function buildSitemap() {
  const urls = pages.flatMap(({ alternates }) =>
    alternates.map(({ path: urlPath }) => {
      const links = [
        ...alternates.map(({ language, path: href }) => ({ language, href })),
        {
          language: 'x-default',
          href: alternates.find(({ language }) => language === defaultLanguage).path,
        },
      ]
        .map(
          ({ language, href }) =>
            `    <xhtml:link rel="alternate" hreflang="${language}" href="${siteUrl}${href}" />`,
        )
        .join('\n')

      return `  <url>\n    <loc>${siteUrl}${urlPath}</loc>\n${links}\n  </url>`
    }),
  )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

const paths = pages.flatMap(({ alternates }) => alternates.map((alternate) => alternate.path))

// 404.html first: it needs the untouched template path, and "/" overwrites index.html.
// The path is one no route matches, so it renders the not-found page.
await writeFile(path.join(distDir, '404.html'), buildDocument('/404'))
for (const urlPath of paths) {
  await writePage(urlPath)
}
for (const { from, to } of redirects) {
  const file = path.join(distDir, from, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, buildRedirect(to))
}
console.log(`Prerendered ${paths.length} pages, 404.html and ${redirects.length} redirects`)

// Security headers, applied by Cloudflare to every response from dist/.
// The Content-Security-Policy allows scripts only from the site itself plus
// the small inline scripts in the generated pages, each by the hash of its
// exact text, so they are collected here after every page is written. The
// only third party is the Google Maps embed in the contact section. Inline
// style attributes are allowed because the components set CSS variables
// through them (no script can run through a style attribute).
async function htmlFiles(dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await htmlFiles(full)))
    else if (entry.name.endsWith('.html')) found.push(full)
  }
  return found
}
const scriptHashes = new Set()
for (const file of await htmlFiles(distDir)) {
  const html = await readFile(file, 'utf8')
  for (const [, attributes, body] of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/application\/ld\+json/.test(attributes)) continue
    scriptHashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`)
  }
}
const connectSources = ["'self'", enquiryApiUrl && new URL(enquiryApiUrl).origin].filter(Boolean)
const policy = [
  "default-src 'self'",
  `script-src 'self' ${[...scriptHashes].join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src ${connectSources.join(' ')}`,
  'frame-src https://www.google.com https://maps.google.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')
await writeFile(
  path.join(distDir, '_headers'),
  [
    '/*',
    `  Content-Security-Policy: ${policy}`,
    '  Strict-Transport-Security: max-age=31536000; includeSubDomains',
    '  X-Content-Type-Options: nosniff',
    '  X-Frame-Options: DENY',
    '  Referrer-Policy: strict-origin-when-cross-origin',
    '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    '',
    // Built assets have content hashes in their names, so they never change.
    '/assets/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '',
  ].join('\n'),
)
console.log(`Wrote _headers (${scriptHashes.size} inline script hashes in the security policy)`)

if (siteUrl) {
  await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap())
  await appendFile(path.join(distDir, 'robots.txt'), `\nSitemap: ${siteUrl}/sitemap.xml\n`)
  console.log(`Wrote sitemap.xml for ${siteUrl}`)
} else {
  console.warn(
    'VITE_SITE_URL is not set: canonical, hreflang and og:url tags and sitemap.xml were omitted.',
  )
}

// A background video is downloaded by every visitor to the home page, so a
// full-size file is a serious performance problem. scripts/prepare-video.js
// should prevent that; this is the safety net if it could not run.
const MAX_VIDEO_BYTES = 5 * 1024 * 1024
const assetsDir = path.join(distDir, 'assets')
for (const name of await readdir(assetsDir)) {
  if (!name.endsWith('.mp4')) continue
  const { size } = await stat(path.join(assetsDir, name))
  if (size > MAX_VIDEO_BYTES) {
    console.warn(
      `
WARNING: ${name} is ${(size / 1024 / 1024).toFixed(1)} MB. The hero video must be a few MB at most; see src/assets/video/README.md.
`,
    )
  }
}

await rm(serverDir, { recursive: true, force: true })
