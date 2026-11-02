// Enquiry fields and validation, shared by the form and the enquiry API
// (worker/index.js). Kept free of browser and build-time imports so the
// Worker can use the same rules.

// The text fields, in form order. The requirement is not one: it is a list of
// REQUIREMENTS ids.
export const ENQUIRY_FIELDS = ['name', 'company', 'email', 'phone', 'message']

// What a visitor can ask for, in two groups, each option as [id, English
// name]. The English names are what the company receives, whatever the site
// language; the form shows translated names (contact.form.requirementOptions
// and requirementGroups). The casting ids match the categories on the
// casting page (src/data/casting.js), whose enquire links preselect them;
// the heat treatment page's enquire links preselect 'heat-treatment'.
export const REQUIREMENT_GROUPS = [
  {
    id: 'testing',
    name: 'Testing Requirements',
    options: [
      ['metal', 'Metal Testing'],
      ['ceramic', 'Ceramic Testing'],
      ['polymer', 'Polymer Testing'],
      ['biofilm', 'Biofilm Testing'],
      ['dental', 'Dental Applications'],
    ],
  },
  {
    id: 'casting',
    name: 'Casting & Material Development',
    options: [
      ['aluminium-casting', 'Aluminium Alloy Casting'],
      ['magnesium-casting', 'Magnesium Alloy Casting'],
      ['zinc-casting', 'Zinc Alloy Casting'],
      ['stir-casting', 'Stir Casting'],
      ['controlled-atmosphere-casting', 'Controlled-Atmosphere Casting'],
      ['mmc-development', 'Metal Matrix Composite Development'],
      ['casting-quality', 'Casting Quality Assessment'],
      ['heat-treatment', 'Heat Treatment'],
      ['casting-other', 'Other Casting Requirements'],
    ],
  },
]

// Every option of every group, in form order.
export const REQUIREMENTS = REQUIREMENT_GROUPS.flatMap(({ options }) => options)

const REQUIREMENT_IDS = REQUIREMENTS.map(([id]) => id)
const REQUIREMENT_NAMES = Object.fromEntries(REQUIREMENTS)
const GROUP_NAMES = Object.fromEntries(REQUIREMENT_GROUPS.map(({ id, name }) => [id, name]))

// The selected options, grouped: [groupName, "Name, Name"] for each group with
// at least one selected, in form order. `names` maps option ids and
// `groupNames` group ids to names; the defaults are English.
export const requirementLines = (ids, names = REQUIREMENT_NAMES, groupNames = GROUP_NAMES) =>
  REQUIREMENT_GROUPS.map(({ id, options }) => [
    groupNames[id],
    options
      .filter(([option]) => ids.includes(option))
      .map(([option]) => names[option])
      .join(', '),
  ]).filter(([, selected]) => selected)

// The selection as one readable line: "Testing Requirements: Metal Testing;
// Casting & Material Development: Stir Casting".
export const formatRequirements = (ids, names, groupNames) =>
  requirementLines(ids, names, groupNames)
    .map(([group, selected]) => `${group}: ${selected}`)
    .join('; ')

// Known requirement ids from an untrusted list, each once, in form order.
export const knownRequirements = (requested) =>
  Array.isArray(requested) ? REQUIREMENT_IDS.filter((id) => requested.includes(id)) : []

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
  values.requirement = knownRequirements(data?.requirement)
  return values
}
