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

// Google's own listing for the business: "Metmech Analytical Engineers",
// 1st Cross St, Balaji Nagar, Ekkattuthangal, Chennai 600032 (place ID below).
// Checked on 2026-10-30: the name (with its Tamil form), area and PIN match
// the client's details. Two differences for the client to confirm or correct
// on the listing itself: it says "1st Cross St" (the client's address says
// "1st Street") and gives the phone number 099868 29743, which is not one of
// the numbers above.
//
// The map and the directions link look the business up by name, the same
// search the site has always linked to, so both land on that listing. The
// street address alone does not resolve: Google places it in Kodambakkam with
// no pin, so it must not be used for the map.
const MAPS_QUERY = 'Metmech Analytical Engineers, Balaji Nagar, Ekkattuthangal, Chennai 600032'

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`

// Route planning to the listing, in the Maps app on phones.
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`

// The embedded map. This embed needs no API key, so nothing secret is in the
// bundle. It loads from Google, which the privacy policy says.
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&output=embed`

// The business's Google profile, where its reviews are, by its permanent
// place ID (taken from the listing's own "Open in Maps" link).
export const GOOGLE_PROFILE_URL = 'https://www.google.com/maps?cid=9473148114890735893'

// The star rating and review count shown beside the reviews link, e.g.
// { value: 4.1, count: 278 }. Left null: the figures change with every
// review, and a copy typed in here would soon be out of date. With null the
// link invites visitors to read the reviews without quoting a number.
export const GOOGLE_RATING = null
