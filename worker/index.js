// The site's only server code: the enquiry API at POST /api/enquiry.
//
// Cloudflare serves the prerendered pages in dist/ directly; this Worker runs
// only for /api/* (see "run_worker_first" in wrangler.jsonc). It validates an
// enquiry with the same rules as the form, then sends it to the business's
// WhatsApp (worker/whatsapp.js). The visitor is told it was sent only once
// WhatsApp has accepted the message.
//
// Configuration is in wrangler.jsonc ("vars") and Worker secrets; see the
// README, "WhatsApp enquiry notifications".
import { normaliseEnquiry, validateEnquiry } from '../src/utils/enquiryRules.js'
import { isWhatsAppConfigured, notificationParameters, sendEnquiryNotification } from './whatsapp.js'

const ENQUIRY_PATH = '/api/enquiry'
const MAX_BODY_BYTES = 32 * 1024
const SUBMISSION_ID = /^[\w-]{8,64}$/

// Submission ids already sent, so a retried or repeated request is not sent
// twice. Kept for a day in Cloudflare's cache (shared by the Worker's
// instances in a data centre), with this instance's memory as a first check
// that also covers a repeat arriving while the first is still being sent.
const DUPLICATE_WINDOW_SECONDS = 24 * 60 * 60
const recentSubmissions = new Map()
const duplicateKey = (id) => `https://enquiry-submissions.invalid/${id}`

async function wasSent(id) {
  if (recentSubmissions.get(id) === 'sent') return true
  return Boolean(await globalThis.caches?.default.match(duplicateKey(id)))
}

async function markSent(id) {
  if (recentSubmissions.size > 1000) recentSubmissions.clear()
  recentSubmissions.set(id, 'sent')
  try {
    await globalThis.caches?.default.put(
      duplicateKey(id),
      new Response('sent', { headers: { 'Cache-Control': `max-age=${DUPLICATE_WINDOW_SECONDS}` } }),
    )
  } catch (error) {
    // The enquiry has been sent; only the record of it is missing.
    console.error(`Could not record enquiry ${id}: ${error.message}`)
  }
}

// The static pages get their security headers from dist/_headers; the API's
// own responses carry the ones that matter for JSON.
const json = (body, status = 200, headers = {}) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  })

// Responses carry a short reason only; details stay in the Worker's logs.
const unavailable = () => json({ ok: false, error: 'unavailable' }, 503)

export async function handleEnquiry(request, env) {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method-not-allowed' }, 405, { Allow: 'POST' })
  }

  // The form is served from the same origin; refuse posts from other sites.
  const origin = request.headers.get('Origin')
  if (origin && origin !== new URL(request.url).origin) {
    return json({ ok: false, error: 'forbidden' }, 403)
  }
  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return json({ ok: false, error: 'unsupported-media-type' }, 415)
  }

  const text = await request.text()
  if (text.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'too-large' }, 413)
  }
  let data
  try {
    data = JSON.parse(text)
  } catch {
    return json({ ok: false, error: 'invalid-json' }, 400)
  }

  // The hidden field that people leave empty. Automated form fillers are told
  // the enquiry was accepted, and nothing is sent.
  if (typeof data?.website === 'string' && data.website.trim()) {
    return json({ ok: true })
  }

  const enquiry = normaliseEnquiry(data)
  const invalid = validateEnquiry(enquiry)
  if (invalid.length > 0) {
    return json({ ok: false, error: 'invalid', fields: invalid }, 422)
  }

  const submissionId = typeof data.submissionId === 'string' ? data.submissionId : ''
  if (!SUBMISSION_ID.test(submissionId)) {
    return json({ ok: false, error: 'invalid', fields: ['submissionId'] }, 400)
  }

  if (!isWhatsAppConfigured(env)) {
    console.error('Enquiry not sent: WhatsApp notifications are not configured.')
    return unavailable()
  }

  if (await wasSent(submissionId)) {
    return json({ ok: true, duplicate: true })
  }
  if (recentSubmissions.get(submissionId) === 'sending') {
    return json({ ok: false, error: 'in-progress' }, 409)
  }

  const context = {
    about: typeof data.about === 'string' ? data.about.slice(0, 120) : '',
    page: typeof data.page === 'string' && data.page.startsWith('/') ? data.page.slice(0, 200) : '',
    language: data.language === 'ta' ? 'ta' : 'en',
  }

  recentSubmissions.set(submissionId, 'sending')
  try {
    await sendEnquiryNotification(env, notificationParameters(enquiry, context))
  } catch (error) {
    recentSubmissions.delete(submissionId)
    console.error(`Enquiry not sent: ${error.message}`)
    return unavailable()
  }
  await markSent(submissionId)
  return json({ ok: true })
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === ENQUIRY_PATH) {
      return handleEnquiry(request, env)
    }
    // Any other /api/* path: the site's 404 page.
    return env.ASSETS.fetch(request)
  },
}
