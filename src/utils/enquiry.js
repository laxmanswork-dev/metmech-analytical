import { EMAILS, ENQUIRY_API_URL, whatsappUrl } from '../data/site.js'
import { requirementLines } from './enquiryRules.js'

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

const FORM_ORDER = ['name', 'company', 'email', 'phone', 'requirement', 'message']

// A field as [label, text] lines, leaving out an empty one. The requirement
// gives one line per group with a selection, labelled with the group's name
// (English unless `requirementNames` and `groupNames` are given).
const fieldLines = (values, field, label, requirementNames, groupNames) => {
  if (field === 'requirement') {
    return requirementLines(values.requirement, requirementNames, groupNames)
  }
  const text = values[field].trim()
  return text ? [[label, text]] : []
}

// The labels in the WhatsApp message, in the order the client asked for. The
// message is for the company, so it is in English whatever the site language.
// The requirement lines carry their group names instead.
const WHATSAPP_LABELS = [
  ['name', 'Name'],
  ['company', 'Company / Institution'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['requirement', null],
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
    for (const [name, text] of fieldLines(values, field, label)) lines.push(`${name}: ${text}`)
  }
  lines.push('', 'Please contact me regarding this enquiry.')
  return whatsappUrl(lines.join('\n'))
}

// Offered when sending through the API fails: a mailto link
// that opens the visitor's email app with the enquiry filled in. `labels`
// maps field names to their translated labels, requirementOptions to the
// translated option names and requirementGroups to the group names; `about`
// is a line naming the instrument or service, or null.
export function buildEnquiryMailto(values, labels, subject, about = null) {
  const lines = FORM_ORDER.flatMap((field) =>
    fieldLines(values, field, labels[field], labels.requirementOptions, labels.requirementGroups),
  ).map(([name, text]) => `${name}: ${text}`)
  if (about) lines.unshift(about)

  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  return `mailto:${EMAILS[0]}?${query}`
}
