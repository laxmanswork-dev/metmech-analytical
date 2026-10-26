import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/noto-sans-tamil/wght.css'
import '@fontsource/barlow-semi-condensed/latin-600.css'
import './styles/tokens.css'
import './styles/base.css'

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { loadLanguage } from './i18n/translations/index.js'
import { getLanguageFromPath, normalizePath } from './utils/paths.js'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// The dictionary for this page's language must be in place before the first
// render, so the markup matches the prerendered HTML.
await loadLanguage(getLanguageFromPath(window.location.pathname))

// scripts/prerender.js stamps each static page with the path it was rendered for.
// Hydrate only when that matches the requested URL. Otherwise (dev server, or a
// host that served a fallback page for this URL) discard the static markup and
// its metadata, and render from scratch.
const prerenderedPath = container.dataset.prerendered

if (prerenderedPath === normalizePath(window.location.pathname)) {
  hydrateRoot(container, app)
} else {
  if (prerenderedPath !== undefined) {
    container.replaceChildren()
    removePrerenderedHead()
  }
  createRoot(container).render(app)
}

// Removes the nodes between the <!--seo-start--> and <!--seo-end--> markers.
function removePrerenderedHead() {
  const isMarker = (node, name) => node.nodeType === Node.COMMENT_NODE && node.data === name
  let node = [...document.head.childNodes].find((child) => isMarker(child, 'seo-start'))

  while (node) {
    const next = node.nextSibling
    const isEnd = isMarker(node, 'seo-end')
    node.remove()
    node = isEnd ? null : next
  }
}
