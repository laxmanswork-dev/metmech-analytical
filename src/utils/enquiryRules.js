// Enquiry fields and validation, shared by the form and the enquiry API
// (worker/index.js). Kept free of browser and build-time imports so the
// Worker can use the same rules.

export const ENQUIRY_FIELDS = ['name', 'company', 'email', 'phone', 'requirement', 'material', 'message']

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

// Longest value the API keeps for each field; anything beyond is cut off.
export const FIELD_LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 30,
  requirement: 2000,
  material: 1000,
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
  if (!values.requirement.trim()) invalid.push('requirement')
  if (values.consent !== true) invalid.push('consent')

  return invalid
}

// The fields of an untrusted request body as trimmed strings within their
// limits, with consent as a boolean. Unknown fields are dropped.
export function normaliseEnquiry(data) {
  const values = { consent: data?.consent === true }
  for (const field of ENQUIRY_FIELDS) {
    const value = typeof data?.[field] === 'string' ? data[field].trim() : ''
    values[field] = value.slice(0, FIELD_LIMITS[field])
  }
  return values
}
