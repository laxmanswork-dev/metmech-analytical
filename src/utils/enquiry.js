import { EMAILS, ENQUIRY_API_URL } from '../data/site.js'

export const EMPTY_ENQUIRY = {
  name: '',
  company: '',
  email: '',
  phone: '',
  requirement: '',
  material: '',
  message: '',
  consent: false,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARACTERS = /^[\d\s()+-]+$/

// Returns the names of invalid fields, in form order. Each name is also the
// key of its message under `contact.form.errors`.
// The API must repeat these checks: client-side validation can be bypassed.
export function validateEnquiry(values) {
  const invalid = []
  const digits = values.phone.replace(/\D/g, '')

  if (!values.name.trim()) invalid.push('name')
  if (!EMAIL_PATTERN.test(values.email.trim())) invalid.push('email')
  if (!PHONE_CHARACTERS.test(values.phone) || digits.length < 7 || digits.length > 15) {
    invalid.push('phone')
  }
  if (!values.requirement.trim()) invalid.push('requirement')
  if (!values.consent) invalid.push('consent')

  return invalid
}

export const isEnquiryApiConfigured = Boolean(ENQUIRY_API_URL)

// Posts the enquiry to the API. Resolves on a 2xx response and rejects on any
// other response or a network failure.
export async function submitEnquiry(values, language) {
  const response = await fetch(ENQUIRY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...values, language }),
  })

  if (!response.ok) {
    throw new Error(`Enquiry API responded with ${response.status}`)
  }
}

// Fallback used while no API exists: a mailto link that opens the visitor's
// email app with the enquiry filled in. `labels` maps field names to their
// translated labels.
export function buildEnquiryMailto(values, labels, subject) {
  const lines = ['name', 'company', 'email', 'phone', 'requirement', 'material', 'message']
    .filter((field) => values[field].trim())
    .map((field) => `${labels[field]}: ${values[field].trim()}`)

  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  return `mailto:${EMAILS[0]}?${query}`
}
