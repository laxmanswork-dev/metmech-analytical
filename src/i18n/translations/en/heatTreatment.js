// Heat treatment page content. Only the price list's "Heat treatment charges/
// set" and the specimen booklets' descriptions support this page; see
// src/data/heatTreatment.js. Nothing here names furnaces, temperature limits,
// capacities, certifications or guaranteed results.
export default {
  meta: {
    title: 'Heat Treatment',
    description:
      'Heat treatment of test sets at Metmech Analytical Engineers, Chennai, with the result checked by hardness testing, microstructure and mechanical testing.',
  },
  hero: {
    title: 'Heat Treatment',
    lead: 'Heat treatment of test sets for research and development work, with the result checked by the laboratory’s testing services.',
  },
  enquire: 'Discuss Your Heat Treatment',
  intro: {
    heading: 'Heat Treatment and Testing Together',
    lead: 'Heat treatment changes the structure of a metal, and with it the metal’s hardness, strength and toughness. Treating a set and testing it in one place shows what the treatment achieved.',
    note: 'Every job is scoped on enquiry. The material, the treatment and the tests are agreed with you before work begins.',
  },
  specimens: {
    heading: 'What Heat Treatment Does to a Metal',
    lead: 'Four treatments as they appear in our standard metallographic specimens, each with its photomicrograph. They illustrate the treatments and are not a list of what can be done for your material: tell us what you need and we will confirm.',
    link: 'View the full specimen set',
  },
  treatments: {
    normalizing: {
      title: 'Normalizing',
      text: 'The steel is austenitized and cooled in air. This low carbon steel shows uniform grains of pearlite in a ferrite matrix.',
    },
    annealing: {
      title: 'Annealing',
      text: 'The steel is austenitized and cooled slowly inside the furnace. This medium carbon steel shows a coarse pearlitic structure.',
    },
    'hardening-tempering': {
      title: 'Hardening and Tempering',
      text: 'The steel is heated to the austenitizing temperature, soaked, and quenched in water, oil or polymer to form hard martensite, then tempered.',
    },
    'case-carburizing': {
      title: 'Case Carburizing',
      text: 'Low carbon steel is held in a carbonaceous atmosphere in a gas carburizing furnace, which raises the carbon content of the surface and leaves a softer core.',
    },
  },
  checks: {
    heading: 'Checking the Result',
    lead: 'These testing services show whether a heat treatment has done what was intended.',
    services: {
      'hardness-testing': 'Hardness and case depth',
      'material-characterization': 'Microstructure',
      'mechanical-testing': 'Strength and toughness',
    },
  },
  help: {
    heading: 'Have a heat treatment requirement?',
    text: 'Tell us the material, the treatment you have in mind and the result you need. We will confirm what can be done and agree the scope with you.',
  },
}
