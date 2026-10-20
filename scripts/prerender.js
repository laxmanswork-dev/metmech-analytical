// Build step 3 of 3 (see "build" in package.json).
//
// Renders every page in every language to a static HTML file in dist/, so
// crawlers and link previews receive real content and metadata without running
// JavaScript. Also writes 404.html and, when VITE_SITE_URL is set, sitemap.xml
// and the Sitemap line in robots.txt.
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

const { render, pages, siteUrl, defaultLanguage } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
)
const template = await readFile(path.join(distDir, 'index.html'), 'utf8')

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
console.log(`Prerendered ${paths.length} pages and 404.html`)

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
