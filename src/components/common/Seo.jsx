import { HERO_IMAGE } from '../../data/images.js'
import { SITE_NAME, SITE_URL } from '../../data/site.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import { DEFAULT_LANGUAGE, LANGUAGES } from '../../i18n/config.js'
import { localizePath } from '../../utils/paths.js'

// Route-level metadata. React 19 hoists these tags into <head>, and the
// prerender step writes them into each page's static HTML.
//
// `title`    page title; omitted on the home page, which uses the site title.
// `path`     language-neutral path such as "/about"; omit for pages that have
//            no canonical address (for example the 404 page).
// `image`    { src, width, height } for link previews; defaults to the lab photograph.
// `noindex`  keeps the page out of search results.
//
// Canonical, hreflang, og:url and og:image need absolute URLs, so they are
// only emitted when VITE_SITE_URL is configured.
export default function Seo({ title, description, path, image = HERO_IMAGE, noindex = false }) {
  const { language, t } = useLanguage()
  const fullTitle = title ? `${title} | ${SITE_NAME}` : t('site.defaultTitle')
  const absoluteUrl = (code) => SITE_URL + localizePath(path, code)
  const hasUrls = Boolean(SITE_URL && path)
  const { ogLocale } = LANGUAGES.find(({ code }) => code === language)

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}

      {hasUrls && <link rel="canonical" href={absoluteUrl(language)} />}
      {hasUrls &&
        LANGUAGES.map(({ code }) => (
          <link key={code} rel="alternate" hrefLang={code} href={absoluteUrl(code)} />
        ))}
      {hasUrls && (
        <link rel="alternate" hrefLang="x-default" href={absoluteUrl(DEFAULT_LANGUAGE)} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={ogLocale} />
      {hasUrls && <meta property="og:url" content={absoluteUrl(language)} />}
      {SITE_URL && <meta property="og:image" content={SITE_URL + image.src} />}
      {SITE_URL && <meta property="og:image:width" content={String(image.width)} />}
      {SITE_URL && <meta property="og:image:height" content={String(image.height)} />}
      <meta name="twitter:card" content="summary" />
    </>
  )
}
