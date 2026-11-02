// Browser regression tests for the failures the client reported on 2026-11-02:
// the research book (the "Std-24 booklet") showing blank, the central booklet
// not opening, and the casting, heat treatment and equipment pages.
//
//   npm run test:e2e
//
// Runs against BASE_URL, by default a local `npx wrangler dev --port 8788`,
// which serves dist/ with Cloudflare's routing. Set BASE_URL to the live site
// for a production smoke test. BROWSERS is a comma-separated list of
// chromium, firefox, webkit or name=path/to/chrome.exe for an older Chromium
// build; Chrome 109 is the one that matters (the last for Windows 7).
//
// ONLY limits the run to tests whose names contain it, comma-separated.
//
// Sends nothing to the company: the enquiry test stops at the WhatsApp address.
import { chromium, firefox, webkit } from 'playwright'
import en from '../../src/i18n/translations/en/index.js'

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:8788'
const BROWSERS = (process.env.BROWSERS ?? 'chromium').split(',')

const VIEWPORTS = [
  [320, 568], [360, 800], [375, 812], [390, 844], [430, 932],
  [768, 1024], [820, 1180], [1024, 768],
  [1280, 720], [1366, 768], [1440, 900], [1920, 1080],
]

// The data modules import images, which Node cannot load, so what the tests
// need from them is listed here or read from the sitemap.
const ORBIT_SLUGS = [
  'mechanical-testing',
  'hardness-testing',
  'material-characterization',
  'thermal-analysis',
  'surface-corrosion-testing',
  'welding-processing',
]
const REDIRECTS = [
  ['/about', '/#about'],
  ['/contact', '/#contact'],
  ['/equipment/powder-metallurgy-press', '/equipment/micro-utm'],
  ['/casting', '/casting-services'],
  ['/heat-treatment', '/heat-treatment-services'],
]
const servicePath = (slug) => `/testing-services/${slug}`
const sitemapPaths = async () => {
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text()
  return [...sitemap.matchAll(/<loc>[^<]*?\.com([^<]*)<\/loc>/g)].map(([, path]) => path || '/')
}

const results = []
const record = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  if (!ok) console.log(`  FAIL ${name}: ${detail}`)
}

async function launch(entry) {
  const [name, executablePath] = entry.split('=')
  const type = { firefox, webkit }[name] ?? chromium
  return { name, browser: await type.launch(executablePath ? { executablePath } : {}) }
}

// A page that skips the intro film and collects anything that goes wrong.
// The Cloudflare beacon is left out: it is injected at the edge, and the
// policy blocks it (see README); `pageIssues` is about the site's own files.
async function openPage(browser, { width, height, touch = false, skipIntro = true }) {
  const context = await browser.newContext({
    viewport: { width, height },
    ...(touch && browser.browserType().name() !== 'firefox' ? { hasTouch: true } : {}),
  })
  if (skipIntro) {
    await context.addInitScript(() => sessionStorage.setItem('metmech-intro-seen', '1'))
  }
  // The security policy upgrades every request to https, which WebKit applies
  // even on a local address with no https to answer it, so the local server
  // is tested without the policy there. The other browsers and the live site
  // are tested with it.
  if (browser.browserType().name() === 'webkit' && BASE.startsWith('http://')) {
    await context.route('**/*', async (route) => {
      const response = await route.fetch()
      const headers = { ...response.headers() }
      delete headers['content-security-policy']
      delete headers['strict-transport-security']
      await route.fulfill({ response, headers })
    })
  }
  const page = await context.newPage()
  page.issues = []
  const isOwn = (text) => !text.includes('cloudflareinsights')
  page.on('pageerror', (error) => page.issues.push(`error: ${error.message}`))
  page.on('console', (message) => {
    if (message.type() === 'error' && isOwn(message.text())) page.issues.push(message.text().slice(0, 160))
  })
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith(BASE)) {
      page.issues.push(`${response.status()} ${response.url()}`)
    }
  })
  return page
}

const go = (page, path) => page.goto(BASE + path, { waitUntil: 'load' })
const pathOf = (page) => new URL(page.url()).pathname
const h1 = (page) => page.locator('h1').first().innerText()

const CENTRE = 'a[aria-label^="Explore our research"]'
const orbitLink = (slug) => `ul a[href="${servicePath(slug)}"][aria-describedby]`

// The rectangle of an element, measured after any entrance animation.
const box = (page, selector) => page.locator(selector).first().boundingBox()

async function testResearchBook(browser, label) {
  for (const [width, height] of VIEWPORTS) {
    const page = await openPage(browser, { width, height })
    await go(page, '/research-capabilities')
    await page.waitForTimeout(600)
    const size = await page.evaluate(() => {
      const book = document.querySelector('[class*="_book_"]').getBoundingClientRect()
      const page = [...document.querySelectorAll('[class*="_page_"]')].find((node) => node.offsetWidth > 0)
      return { width: book.width, height: book.height, page: page?.offsetWidth ?? 0 }
    })
    record(`${label} book has size ${width}x${height}`, size.width > 150 && size.height > 200 && size.page > 100, JSON.stringify(size))
    if (width === 1366 || width === 390) {
      const next = page.getByRole('button', { name: /next/i })
      const before = await page.locator('[class*="_controls"]').innerText()
      await next.click()
      await page.waitForTimeout(1200)
      const after = await page.locator('[class*="_controls"]').innerText()
      record(`${label} book turns ${width}x${height}`, before !== after, `${before} -> ${after}`)
    }
    record(`${label} book clean ${width}x${height}`, page.issues.length === 0, page.issues.join('; '))
    await page.context().close()
  }
}

async function testCentre(browser, label) {
  for (const [width, height] of VIEWPORTS) {
    const touch = width <= 1024
    const page = await openPage(browser, { width, height, touch })
    await go(page, '/')
    await page.waitForTimeout(1800)
    await page.locator(CENTRE).scrollIntoViewIfNeeded()
    const rect = await box(page, CENTRE)
    const cx = rect.x + rect.width / 2
    const cy = rect.y + rect.height / 2
    // The whole window of the frame must lead to the book, not to a neighbour.
    const misses = await page.evaluate(({ cx, cy, r, selector }) => {
      const link = document.querySelector(selector)
      const out = []
      for (const [dx, dy] of [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1], [-0.7, -0.7], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7]]) {
        const target = document.elementFromPoint(cx + dx * r, cy + dy * r)
        if (!target || !link.contains(target)) out.push(`${dx},${dy}:${target?.tagName}.${target?.className}`)
      }
      return out
    }, { cx, cy, r: rect.width * 0.32, selector: CENTRE })
    record(`${label} centre hit area ${width}x${height}`, misses.length === 0, misses.join(' '))
    if (touch && browser.browserType().name() !== 'firefox') await page.touchscreen.tap(cx, cy)
    else await page.mouse.click(cx, cy)
    await page.waitForURL('**/research-capabilities', { timeout: 5000 }).catch(() => {})
    record(`${label} centre opens book ${width}x${height}`, pathOf(page) === '/research-capabilities', page.url())
    await page.context().close()
  }
  // Keyboard, and a first visit with the intro film playing out.
  const page = await openPage(browser, { width: 1366, height: 768 })
  await go(page, '/')
  await page.waitForTimeout(1000)
  await page.locator(CENTRE).focus()
  await page.keyboard.press('Enter')
  await page.waitForURL('**/research-capabilities', { timeout: 5000 }).catch(() => {})
  record(`${label} centre by keyboard`, pathOf(page) === '/research-capabilities', page.url())
  await page.context().close()

  const first = await openPage(browser, { width: 1366, height: 768, skipIntro: false })
  await go(first, '/')
  await first.waitForTimeout(8000)
  await first.locator(CENTRE).click({ timeout: 5000 }).catch(() => {})
  await first.waitForURL('**/research-capabilities', { timeout: 5000 }).catch(() => {})
  record(`${label} centre after intro film`, pathOf(first) === '/research-capabilities', first.url())
  await first.context().close()
}

async function testOrbit(browser, label) {
  for (const [width, height, touch] of [[1366, 768, false], [1024, 768, true], [768, 1024, true], [390, 844, true], [320, 568, true]]) {
    for (const slug of ORBIT_SLUGS) {
      const page = await openPage(browser, { width, height, touch })
      await go(page, '/')
      await page.waitForTimeout(1500)
      const selector = orbitLink(slug)
      // Scrolled by the still frame: Playwright waits for a moving element to stop.
      await page.locator(CENTRE).scrollIntoViewIfNeeded()
      // As a person would: wait until the circle has come round to where it
      // is on the screen and not passing under the floating buttons.
      await page.waitForFunction((selector) => {
        const link = document.querySelector(selector)
        const { x, y, width, height } = link.getBoundingClientRect()
        const target = document.elementFromPoint(x + width / 2, y + height / 2)
        return target && link.contains(target)
      }, selector, { timeout: 35000 })
      // A mouse first rests on the circle, which stops the orbit. A finger
      // lands where the circle is at that moment.
      let rect = await box(page, selector)
      if (!touch) {
        await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2)
        await page.waitForTimeout(400)
        rect = await box(page, selector)
      }
      const x = rect.x + rect.width / 2
      const y = rect.y + rect.height / 2
      if (touch && browser.browserType().name() !== 'firefox') await page.touchscreen.tap(x, y)
      else await page.mouse.click(x, y)
      await page.waitForTimeout(700)
      const title = en.services.items[slug].title
      const heading = pathOf(page) === servicePath(slug) ? await h1(page) : null
      record(`${label} orbit ${slug} ${width}x${height}`, pathOf(page) === servicePath(slug) && heading === title, `${page.url()} h1=${heading}`)
      if (pathOf(page) === servicePath(slug)) {
        await page.goBack()
        await page.waitForTimeout(300)
        record(`${label} orbit back ${slug} ${width}`, pathOf(page) === '/', page.url())
      }
      await page.context().close()
    }
  }
}

// Reaches a page through the header's "Our Services", on the bar or in the
// phone menu, then checks the direct address and a refresh.
async function testPageRoute(browser, label, path, navLabel, headingText) {
  for (const [width, height] of [[1366, 768], [768, 1024], [390, 844]]) {
    const page = await openPage(browser, { width, height })
    await go(page, '/')
    const menu = page.locator('button[aria-controls="site-menu"]')
    if (await menu.isVisible()) await menu.click()
    await page.getByRole('button', { name: 'Our Services' }).click()
    await page.getByRole('link', { name: navLabel, exact: true }).first().click()
    await page.waitForTimeout(500)
    record(`${label} nav to ${path} ${width}`, pathOf(page) === path && (await h1(page)) === headingText, `${page.url()}`)
    await page.reload({ waitUntil: 'load' })
    record(`${label} refresh ${path} ${width}`, (await h1(page)) === headingText, await h1(page))
    record(`${label} clean ${path} ${width}`, page.issues.length === 0, page.issues.join('; '))
    await page.context().close()
  }
  const page = await openPage(browser, { width: 1366, height: 768 })
  const response = await go(page, path)
  record(`${label} direct ${path}`, response.status() === 200 && (await h1(page)) === headingText, String(response.status()))
  const tamil = await go(page, `/ta${path}`)
  record(`${label} direct /ta${path}`, tamil.status() === 200 && (await page.getAttribute('html', 'lang')) === 'ta', String(tamil.status()))
  await page.context().close()
}

async function testStatuses() {
  const check = async (path, expected) => {
    const response = await fetch(BASE + path, { redirect: 'manual' })
    record(`status ${path}`, response.status === expected, String(response.status))
  }
  const paths = await sitemapPaths()
  record('sitemap lists the new page', paths.includes('/heat-treatment-services') && paths.includes('/ta/heat-treatment-services'), `${paths.length} urls`)
  await Promise.all(paths.map((path) => check(path, 200)))
  await check('/this-page-does-not-exist', 404)
  await check('/heat-treatment-servicess', 404)
  await Promise.all(REDIRECTS.map(async ([from, to]) => {
    const response = await fetch(BASE + from)
    const html = await response.text()
    record(`redirect stub ${from}`, response.status === 200 && html.includes(to), to)
  }))
}

// Every card and list link on the pages that list services and equipment
// leads to a page whose heading matches what the link is called.
async function testEquipmentLinks(browser, label) {
  const page = await openPage(browser, { width: 1366, height: 768 })
  const paths = await sitemapPaths()
  const slugs = (prefix) => paths.filter((path) => path.startsWith(prefix)).map((path) => path.slice(prefix.length))
  const expected = [
    ...slugs('/testing-services/').map((slug) => [servicePath(slug), en.services.items[slug].title]),
    ...slugs('/equipment/').map((slug) => [`/equipment/${slug}`, en.equipment.items[slug].name]),
  ]
  for (const [path, title] of expected) {
    await go(page, path)
    record(`${label} heading ${path}`, (await h1(page)) === title, await h1(page))
    const broken = await page.evaluate(async () => {
      for (const image of document.querySelectorAll('img')) image.loading = 'eager'
      await Promise.all([...document.images].map((image) => image.decode().catch(() => {})))
      return [...document.images].filter((image) => image.naturalWidth === 0).map((image) => image.src)
    })
    record(`${label} images ${path}`, broken.length === 0, broken.join(' '))
  }
  for (const list of ['/equipment', '/testing-services', '/industries', '/']) {
    await go(page, list)
    const links = await page.evaluate(() => [...new Set([...document.querySelectorAll('main a[href^="/"]')].map((a) => a.getAttribute('href')))])
    const known = new Set(expected.map(([path]) => path))
    for (const href of links.filter((link) => known.has(link))) {
      const anchor = page.locator(`main a[href="${href}"]`).first()
      if (!(await anchor.isVisible())) continue
      await anchor.evaluate((node) => node.click())
      await page.waitForTimeout(150)
      record(`${label} ${list} -> ${href}`, pathOf(page) === href, page.url())
      await page.goBack()
      await page.waitForTimeout(100)
    }
  }
  record(`${label} equipment links clean`, page.issues.length === 0, page.issues.join('; '))
  await page.context().close()
}

async function testLanguage(browser, label) {
  const page = await openPage(browser, { width: 1366, height: 768 })
  for (const path of ['/', '/casting-services', '/heat-treatment-services', '/research-capabilities', '/equipment', servicePath('hardness-testing')]) {
    await go(page, path)
    const english = await h1(page)
    await page.locator('a[hreflang="ta"]:visible').first().click()
    await page.waitForTimeout(500)
    const expectedPath = path === '/' ? '/ta' : `/ta${path}`
    const tamil = await h1(page)
    record(`${label} to Tamil ${path}`, pathOf(page).replace(/\/$/, '') === expectedPath && english !== tamil && /[஀-௿]/.test(tamil + await page.locator('nav').first().innerText()), `${page.url()} ${tamil}`)
    await page.locator('a[hreflang="en"]:visible').first().click()
    await page.waitForTimeout(300)
    record(`${label} back to English ${path}`, pathOf(page) === path, page.url())
  }
  record(`${label} language clean`, page.issues.length === 0, page.issues.join('; '))
  await page.context().close()
}

async function testContact(browser, label) {
  const page = await openPage(browser, { width: 1366, height: 768 })
  await go(page, '/heat-treatment-services')
  await page.getByRole('link', { name: 'Discuss Your Heat Treatment' }).first().click()
  await page.waitForTimeout(800)
  record(`${label} enquiry names heat treatment`, (await page.locator('#enquiry').innerText()).includes('Heat Treatment'), page.url())
  const box = page.locator('input[name="enquiry-requirement"][value="heat-treatment"]')
  record(`${label} enquiry preselects heat treatment`, await box.isChecked())
  await page.evaluate(() => {
    window.open = (url) => {
      window.openedUrl = url
      return {}
    }
  })
  await page.fill('#enquiry-name', 'Regression Test')
  await page.fill('#enquiry-email', 'test@example.com')
  await page.fill('#enquiry-phone', '9876543210')
  await page.locator('input[type="checkbox"]:not([name="enquiry-requirement"])').first().check()
  await page.locator('#enquiry button[type="submit"]').click()
  await page.waitForTimeout(400)
  const opened = await page.evaluate(() => window.openedUrl ?? '')
  record(`${label} enquiry opens WhatsApp with the text`, opened.startsWith('https://wa.me/') && decodeURIComponent(opened).includes('Heat Treatment'), opened.slice(0, 80))

  const hrefs = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')))
  record(`${label} phone link`, hrefs.some((href) => href.startsWith('tel:+91')))
  record(`${label} WhatsApp link`, hrefs.some((href) => href.startsWith('https://wa.me/')))
  await go(page, '/')
  const google = await page.evaluate(() => [...document.querySelectorAll('a[href*="google.com/maps"]')].map((a) => a.href))
  record(`${label} Google link`, google.length > 0, google[0])
  await page.context().close()
}

// No sideways scrolling, errors, or missing images on any page at any size.
async function testSweep(browser, label) {
  const pages = ['/', '/testing-services', '/casting-services', '/heat-treatment-services', '/equipment', '/industries', '/research-capabilities', '/privacy-policy', '/ta', '/ta/casting-services', '/ta/heat-treatment-services', '/ta/research-capabilities']
  for (const [width, height] of VIEWPORTS) {
    const page = await openPage(browser, { width, height })
    for (const path of pages) {
      await go(page, path)
      await page.waitForTimeout(250)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      record(`${label} overflow ${path} ${width}`, overflow <= 0, `${overflow}px`)
    }
    record(`${label} sweep clean ${width}`, page.issues.length === 0, [...new Set(page.issues)].join('; '))
    await page.context().close()
  }
}

const ONLY = process.env.ONLY?.split(',')
// One test failing outright, such as a crashed page, must not hide the others.
const run = async (name, test) => {
  if (ONLY && !ONLY.some((part) => name.includes(part))) return
  try {
    await test()
  } catch (error) {
    record(`${name} did not finish`, false, error.message.split('\n')[0])
  }
}

await run('statuses', testStatuses)
for (const entry of BROWSERS) {
  const { name, browser } = await launch(entry)
  console.log(`== ${name} ${browser.version()}`)
  const heading = (key) => en[key].hero.title
  await run('book', () => testResearchBook(browser, name))
  await run('centre', () => testCentre(browser, name))
  await run('orbit', () => testOrbit(browser, name))
  await run('casting', () => testPageRoute(browser, name, '/casting-services', en.nav.casting, heading('casting')))
  await run('heat', () => testPageRoute(browser, name, '/heat-treatment-services', en.nav.heatTreatment, heading('heatTreatment')))
  await run('equipment', () => testEquipmentLinks(browser, name))
  await run('language', () => testLanguage(browser, name))
  await run('contact', () => testContact(browser, name))
  await run('sweep', () => testSweep(browser, name))
  await browser.close()
}

const failed = results.filter(({ ok }) => !ok)
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed`)
process.exit(failed.length > 0 ? 1 : 0)
