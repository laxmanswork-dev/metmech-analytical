import { EMAILS, ENQUIRY_API_URL, whatsappUrl } from '../data/site.js'
import { ENQUIRY_FIELDS } from './enquiryRules.js'

// The API repeats these checks: client-side validation can be bypassed.
export { EMPTY_ENQUIRY, validateEnquiry } from './enquiryRules.js'

export const isEnquiryApiConfigured = Boolean(ENQUIRY_API_URL)

// Posts the enquiry to the API. `context` is { about, page, submissionId }:
// what the enquiry concerns (an instrument or service name, or null), the
// language-neutral path it was started from, and an id that stays the same
// when the visitor retries, so the API can ignore repeats.
// Resolves on a 2xx response and rejects on any other response or a network
// failure.
export async function submitEnquiry(values, language, context) {
  const response = await fetch(ENQUIRY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...values, ...context, language }),
  })

  if (!response.ok) {
    throw new Error(`Enquiry API responded with ${response.status}`)
  }
}

// The labels in the WhatsApp message, in the order the client asked for. The
// message is for the company, so it is in English whatever the site language.
const WHATSAPP_LABELS = [
  ['name', 'Name'],
  ['company', 'Company / Institution'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['material', 'Material / Sample'],
  ['requirement', 'Testing Service'],
  ['message', 'Message'],
]

// Used while no API exists: a WhatsApp click-to-chat link to the company's
// number with the enquiry typed in. It only prepares the message; the visitor
// still presses Send in WhatsApp. Empty optional fields are left out. `about`
// is the English name of the instrument or service, or null.
export function buildEnquiryWhatsApp(values, about = null) {
  const lines = ['New Website Enquiry — Metmech Analytical Engineers', '']
  if (about) lines.push(`Enquiry about: ${about}`)
  for (const [field, label] of WHATSAPP_LABELS) {
    const value = values[field].trim()
    if (value) lines.push(`${label}: ${value}`)
  }
  lines.push('', 'Please contact me regarding this enquiry.')
  return whatsappUrl(lines.join('\n'))
}

// Offered when sending through the API fails: a mailto link
// that opens the visitor's email app with the enquiry filled in. `labels`
// maps field names to their translated labels; `about` is a line naming the
// instrument or service, or null.
export function buildEnquiryMailto(values, labels, subject, about = null) {
  const lines = ENQUIRY_FIELDS.filter((field) => values[field].trim()).map(
    (field) => `${labels[field]}: ${values[field].trim()}`,
  )
  if (about) lines.unshift(about)

  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  return `mailto:${EMAILS[0]}?${query}`
}
