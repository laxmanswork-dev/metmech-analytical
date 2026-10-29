import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { ENQUIRY_API_URL, SITE_URL } from './data/site.js'
import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from './i18n/config.js'
import { loadLanguage } from './i18n/translations/index.js'
import { ALL_PATHS, LEGACY_REDIRECTS } from './routes/pages.js'
import { getLanguageFromPath, localizePath } from './utils/paths.js'

// Build-time entry used only by scripts/prerender.js. It is never shipped to
// the browser.

// Every language is rendered at build time, so load all dictionaries up front.
await Promise.all(LANGUAGE_CODES.map(loadLanguage))

export const siteUrl = SITE_URL
// Read by scripts/prerender.js, which allows it in the security policy.
export const enquiryApiUrl = ENQUIRY_API_URL
export const defaultLanguage = DEFAULT_LANGUAGE

// One entry per page, with its URL path in every language.
export const pages = ALL_PATHS.map((path) => ({
  alternates: LANGUAGE_CODES.map((language) => ({
    language,
    path: localizePath(path, language),
  })),
}))

// Old addresses that now point at a home-page section, in every language.
export const redirects = LEGACY_REDIRECTS.flatMap(({ from, to }) =>
  LANGUAGE_CODES.map((language) => ({
    from: localizePath(from, language),
    to: localizePath(to, language),
  })),
)

// Renders the app at `path` and returns the markup plus the language to set on <html>.
export function render(path) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )

  return { html, language: getLanguageFromPath(path) }
}
