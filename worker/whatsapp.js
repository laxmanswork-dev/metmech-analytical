// Sends an enquiry to the business's WhatsApp through the WhatsApp Business
// Platform Cloud API.
//
// A business may only start a conversation with an approved message template,
// so the notification is the template named in WHATSAPP_TEMPLATE_NAME with the
// enquiry's fields as its nine body parameters, in this order:
//
//   {{1}} name           {{6}} testing requirements (English names)
//   {{2}} phone          {{7}} additional message
//   {{3}} email          {{8}} page the enquiry was started from
//   {{4}} company        {{9}} date and time received (IST)
//   {{5}} regarding
//
// The template text to submit for approval is in the README ("WhatsApp
// enquiry notifications").

import { formatRequirements } from '../src/utils/enquiryRules.js'

const DEFAULT_API_VERSION = 'v23.0'
const REQUEST_TIMEOUT_MS = 10_000

// Parameters may not contain line breaks, tabs or runs of more than four
// spaces, and may not be empty. Long values are shortened so the whole
// message stays within WhatsApp's length limit.
const PARAMETER_LIMITS = [60, 20, 80, 60, 80, 200, 160, 60, 30]
const NOT_PROVIDED = 'Not provided'

function parameter(value, limit) {
  const text = String(value ?? '')
    .replace(/[\r\n\t]+/g, ' / ')
    .replace(/ {2,}/g, ' ')
    .trim()
  if (!text) return NOT_PROVIDED
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text
}

const receivedAt = (date) =>
  `${new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)} IST`

// The body parameters for an enquiry (as returned by normaliseEnquiry) and
// its context: { about, page, language }.
export function notificationParameters(enquiry, { about, page, language }, date = new Date()) {
  const where = page ? `${page}${language === 'ta' ? ' (Tamil)' : ''}` : ''
  return [
    enquiry.name,
    enquiry.phone,
    enquiry.email,
    enquiry.company,
    about || 'General enquiry',
    formatRequirements(enquiry.requirement),
    enquiry.message,
    where,
    receivedAt(date),
  ].map((value, index) => parameter(value, PARAMETER_LIMITS[index]))
}

export function isWhatsAppConfigured(env) {
  return Boolean(
    env.WHATSAPP_ACCESS_TOKEN &&
      /^\d+$/.test(env.WHATSAPP_PHONE_NUMBER_ID ?? '') &&
      /^\d{8,15}$/.test(env.WHATSAPP_RECIPIENT_NUMBER ?? '') &&
      env.WHATSAPP_TEMPLATE_NAME,
  )
}

// Sends the notification. Resolves with the WhatsApp message id once the API
// has accepted the message; rejects otherwise. Errors carry the API's status
// and error code only, never the token or the enquiry.
export async function sendEnquiryNotification(env, parameters) {
  const version = env.WHATSAPP_API_VERSION || DEFAULT_API_VERSION
  const url = `https://graph.facebook.com/${version}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: env.WHATSAPP_RECIPIENT_NUMBER,
      type: 'template',
      template: {
        name: env.WHATSAPP_TEMPLATE_NAME,
        language: { code: env.WHATSAPP_TEMPLATE_LANGUAGE || 'en' },
        components: [
          { type: 'body', parameters: parameters.map((text) => ({ type: 'text', text })) },
        ],
      },
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  const result = await response.json().catch(() => null)
  const messageId = result?.messages?.[0]?.id
  if (!response.ok || !messageId) {
    const code = result?.error?.code ?? 'none'
    throw new Error(`WhatsApp API responded with ${response.status} (error code ${code})`)
  }
  return messageId
}
