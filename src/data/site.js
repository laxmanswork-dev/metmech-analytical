// Company identity and contact details as supplied by the client.
// Do not change these without the client's confirmation.
export const SITE_NAME = 'Metmech Analytical Engineers'
export const OFFICIAL_NAME = 'METMECH ANALYTICAL ENGINEERS'

// Production origin without a trailing slash. Empty in development.
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

// Public address of the enquiry API. Empty until the backend exists.
export const ENQUIRY_API_URL = (import.meta.env.VITE_ENQUIRY_API_URL ?? '').trim()

export const PHONES = [
  { display: '99620 34530', tel: '+919962034530' },
  { display: '89404 61946', tel: '+918940461946' },
  { display: '82485 42077', tel: '+918248542077' },
]

export const EMAILS = ['metmech2005@yahoo.co.in', 'metmechanalyticalengineers@gmail.com']

// Used for structured data. The displayed address comes from the dictionaries.
export const ADDRESS = {
  streetAddress: '#131/7, Block No. 1, 2nd Floor, Balaji Nagar, 1st Street, Ekkattuthangal',
  addressLocality: 'Chennai',
  addressRegion: 'Tamil Nadu',
  postalCode: '600032',
  addressCountry: 'IN',
}

// A search link rather than a pinned location: the exact map pin has not been
// verified with the client.
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Metmech Analytical Engineers, Balaji Nagar, Ekkattuthangal, Chennai 600032',
)}`
