// The heat treatment page's reference specimens, in display order. All wording
// is in the dictionaries under `heatTreatment`.
//
// What the client's documents confirm (checked 2026-11-02): the price list
// ("Testing charges-reg.docx") has "Heat treatment charges/ set" and nothing
// more; the specimen booklets (STD-24, STD-12) say their specimens were heat
// treated in specialized furnaces and describe each treatment below. No
// document names the furnaces, temperature limits, batch sizes or which
// treatments are offered to customers, so the page does not state them and
// presents these treatments as what the specimens show.
//
// `specimen` is a slug in src/data/specimens.js.
export const HEAT_TREATMENTS = [
  { slug: 'normalizing', specimen: 'low-carbon-steel' },
  { slug: 'annealing', specimen: 'medium-carbon-steel' },
  { slug: 'hardening-tempering', specimen: 'hardened-tempered-steel' },
  { slug: 'case-carburizing', specimen: 'case-carburized-steel' },
]

// Testing services that check the result of a heat treatment.
export const HEAT_TREATMENT_SERVICES = [
  'hardness-testing',
  'material-characterization',
  'mechanical-testing',
]
