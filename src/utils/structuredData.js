import { ADDRESS, EMAILS, PHONES, SITE_NAME, SITE_URL } from '../data/site.js'
import { localizePath } from './paths.js'

// Schema.org data built only from facts the client has supplied. No ratings,
// reviews, opening hours or coordinates are included because none are verified.

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    ...(SITE_URL && { url: SITE_URL }),
    telephone: PHONES[0].tel,
    email: EMAILS[0],
    address: { '@type': 'PostalAddress', ...ADDRESS },
  }
}

// `items` is [{ label, to }] from the visible breadcrumb trail. Breadcrumb
// schema needs absolute URLs, so nothing is returned without a site URL.
export function breadcrumbSchema(items, language) {
  if (!SITE_URL) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ label, to }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: label,
      item: SITE_URL + localizePath(to, language),
    })),
  }
}
