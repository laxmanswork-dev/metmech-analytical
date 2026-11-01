// The casting page's categories, in display order. All wording is in the
// dictionaries under `casting.categories.<slug>`; the number shown on each
// category (01, 02...) is its place in this list.
//
// Each slug is also a requirement id in the enquiry form
// (src/utils/enquiryRules.js), so a category's enquire link can preselect it.
//
// `group` places the category on the page: `alloy` (conventional casting of
// one alloy system), `specialist` (the two processes the client named as
// particular expertise, shown with more emphasis) or `development`.
// `services` are existing testing services the category draws on.
//
// What the client's documents confirm (checked 2026-11-01): the price list
// ("Testing charges-reg.docx") offers aluminium casting and a magnesium
// casting process, porosity measurement, micro and macro examination, and the
// hardness, mechanical, wear, corrosion and SEM/EDS tests. Zinc casting, stir
// casting, controlled-atmosphere casting and metal matrix composites come
// from the client's brief only; the README lists them under "Open questions
// for the client". The wording says no more than that: no equipment, gases,
// capacities or results are named.
export const CASTING_CATEGORIES = [
  { slug: 'aluminium-casting', group: 'alloy' },
  { slug: 'magnesium-casting', group: 'alloy' },
  { slug: 'zinc-casting', group: 'alloy' },
  { slug: 'stir-casting', group: 'specialist' },
  { slug: 'controlled-atmosphere-casting', group: 'specialist' },
  { slug: 'mmc-development', group: 'development', services: ['material-characterization'] },
  {
    slug: 'casting-quality',
    group: 'development',
    services: [
      'material-characterization',
      'sem-eds-analysis',
      'hardness-testing',
      'mechanical-testing',
      'surface-corrosion-testing',
    ],
  },
]

// Reference micrographs shown on the page: specimens from the client's own
// standard metallographic sets (src/data/specimens.js): an Al-Si-Cu alloy
// and AZ91 magnesium, both with dendritic structures. They illustrate the
// alloy systems; the captions do not present them as results of a casting
// project.
export const CASTING_MICROGRAPHS = ['aluminium-alloy', 'magnesium-alloy']

export const categoryNumber = (slug) =>
  String(CASTING_CATEGORIES.findIndex((category) => category.slug === slug) + 1).padStart(2, '0')
