// Enquiry fields and validation, shared by the form and the enquiry API
// (worker/index.js). Kept free of browser and build-time imports so the
// Worker can use the same rules.

// The text fields, in form order. The testing requirement is not one: it is a
// list of TESTING_REQUIREMENTS ids.
export const ENQUIRY_FIELDS = ['name', 'company', 'email', 'phone', 'message']

// What a visitor can ask to have tested, as [id, English name]. The English
// names are what the company receives, whatever the site language; the form
// shows translated names (contact.form.requirementOptions).
export const TESTING_REQUIREMENTS = [
  ['metal', 'Metal Testing'],
  ['ceramic', 'Ceramic Testing'],
  ['polymer', 'Polymer Testing'],
  ['biofilm', 'Biofilm Testing'],
  ['dental', 'Dental Applications'],
]

const REQUIREMENT_NAMES = Object.fromEntries(TESTING_REQUIREMENTS)

// Selected requirement ids as one readable line, in the order the options are
// listed: "Metal Testing, Polymer Testing". `names` maps ids to names; the
// default is English.
export const formatRequirements = (ids, names = REQUIREMENT_NAMES) =>
  TESTING_REQUIREMENTS.filter(([id]) => ids.includes(id))
    .map(([id]) => names[id])
    .join(', ')

export const EMPTY_ENQUIRY = {
  name: '',
  company: '',
  email: '',
  phone: '',
  requirement: [],
  message: '',
  consent: false,
}

// Longest value the API keeps for each field; anything beyond is cut off.
export const FIELD_LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 30,
  message: 3000,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARACTERS = /^[\d\s()+-]+$/

// Returns the names of invalid fields, in form order. Each name is also the
// key of its message under `contact.form.errors`.
export function validateEnquiry(values) {
  const invalid = []
  const digits = values.phone.replace(/\D/g, '')

  if (!values.name.trim()) invalid.push('name')
  if (!EMAIL_PATTERN.test(values.email.trim())) invalid.push('email')
  if (!PHONE_CHARACTERS.test(values.phone) || digits.length < 7 || digits.length > 15) {
    invalid.push('phone')
  }
  if (values.requirement.length === 0) invalid.push('requirement')
  if (values.consent !== true) invalid.push('consent')

  return invalid
}

// The fields of an untrusted request body as trimmed strings within their
// limits, the requirement as the known ids it lists (each once, in option
// order) and consent as a boolean. Unknown fields and ids are dropped.
export function normaliseEnquiry(data) {
  const values = { consent: data?.consent === true }
  for (const field of ENQUIRY_FIELDS) {
    const value = typeof data?.[field] === 'string' ? data[field].trim() : ''
    values[field] = value.slice(0, FIELD_LIMITS[field])
  }
  const requested = Array.isArray(data?.requirement) ? data.requirement : []
  values.requirement = TESTING_REQUIREMENTS.map(([id]) => id).filter((id) => requested.includes(id))
  return values
}
