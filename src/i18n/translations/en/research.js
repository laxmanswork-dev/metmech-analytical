// Research capabilities page. Every fact comes from the client's two
// "Standard Metallographic Specimens" booklets (24-specimen and 12-specimen
// sets); see src/data/specimens.js. Descriptions restate the booklet text in
// shorter form and keep its compositions, temperatures and units. Obvious
// typing errors in the booklets are corrected ("Brontz", "salt bath durance").
export default {
  meta: {
    title: 'Research Capabilities: Metallography',
    description:
      'Standard metallographic specimens from Metmech Analytical Engineers: 24 steels, cast irons, non-ferrous alloys, welds and coatings, each with its photomicrograph, magnification and etchant.',
  },
  hero: {
    title: 'Research Capabilities',
    lead: 'Metallography and microstructure: standard specimens taken from genuine materials, heat treated, polished and etched to show how composition and processing shape a metal.',
    imageAlt:
      'Photomicrograph of spheroidal graphitic cast iron at 100X, showing graphite nodules ringed by ferrite',
  },
  intro: {
    heading: 'Standard Metallographic Specimens',
    lead: 'Each specimen is documented with its photomicrograph, the magnification and etchant used, and a description of the microstructure.',
    preparationHeading: 'How each specimen is prepared',
    preparation: [
      {
        title: 'Genuine material',
        text: 'Every specimen is taken from a genuine material.',
      },
      {
        title: 'Heat treated',
        text: 'It is given the intended heat treatment, such as normalizing, annealing, hardening and tempering or carburizing, in specialized furnaces.',
      },
      {
        title: 'Polished and etched',
        text: 'It is polished through the full polishing sequence and etched with the correct etchant as per ASTM / BS standards.',
      },
    ],
    setsHeading: 'Two specimen sets',
    sets: {
      full: {
        count: '24',
        title: 'Specimen set of 24',
        text: 'Steels, cast irons, non-ferrous alloys, welded joints, an electroplated component, a powder metallurgy sample and bearing metal.',
      },
      compact: {
        count: '12',
        title: 'Specimen set of 12',
        text: 'Specimens 1 to 12: carbon, high speed, hardened and tempered, stainless and case carburized steels, three cast irons, an aluminium alloy and Muntz metal.',
      },
    },
    relatedHeading: 'Related testing services',
  },
  catalogue: {
    heading: 'Specimen Catalogue',
    lead: 'Photomicrographs from the specimen booklets. The scale bar in each image gives the magnification and length.',
  },
  groups: {
    steels: 'Carbon, Alloy and Stainless Steels',
    castIrons: 'Cast Irons',
    nonFerrous: 'Non-Ferrous Alloys',
    joiningCoatings: 'Welds, Coatings and Powder Metallurgy',
  },
  labels: {
    number: 'No.',
    specimen: 'Specimen',
    magnification: 'Magnification',
    etchant: 'Etchant',
    sets: 'Included in',
    bothSets: 'Sets of 12 and 24',
    fullSetOnly: 'Set of 24',
    specimenNumber: 'Specimen {number}',
    alt: 'Photomicrograph of {name} at {magnification}',
    altZone: 'Photomicrograph of {name}, {zone}, at {magnification}',
  },
  // The page is an illustrated book that turns its own pages.
  book: {
    label: 'Research capabilities book',
    contents: 'Contents',
    photomicrograph: 'Photomicrograph',
    pageShort: 'Page',
    page: 'Page {page} of {total}',
    pages: 'Pages {from} and {to} of {total}',
    goTo: 'Go to page {page}: {name}',
    controls: 'Book controls',
    previous: 'Previous page',
    next: 'Next page',
    pause: 'Pause page turning',
    play: 'Turn pages automatically',
    restart: 'Back to the first page',
  },
  zones: {
    case: 'Case',
    core: 'Core',
    parent: 'Parent metal',
    weld: 'Weld zone',
  },
  reference: {
    heading: 'Specimen Reference Table',
    lead: 'All 24 specimens with the magnification and etchant used for each micrograph.',
  },
  care: {
    heading: 'Handling and Storage',
    lead: 'From the instructions supplied with each specimen set.',
    items: [
      'Handle specimens with care. Avoid finger marks and scratches on the polished and etched surface.',
      'Do not wipe the etched surface.',
      'Store the specimens in desiccated boxes when they are not in use.',
      'If a specimen rusts, repolish it on a polishing machine with ½ or ¼ micron diamond paste and etch it again with the correct etchant.',
      'Keep each specimen in its own slot after use; do not interchange their positions.',
    ],
  },
  cta: {
    heading: 'Enquire About Metallographic Specimens',
    text: 'Tell us which specimen set or specimens you are interested in, or send us a sample for micro examination.',
  },
  specimens: {
    'low-carbon-steel': {
      name: 'Low Carbon Steel',
      etchant: '2% Nital solution',
      description:
        'Plate steel with less than 0.25% carbon, austenitized and cooled in air (normalized). Uniform grains of pearlite (ferrite and cementite) in a ferrite matrix, with flow lines from cold working and rolling. Steel with less than 0.8% carbon is called hypoeutectoid steel.',
    },
    'medium-carbon-steel': {
      name: 'Medium Carbon Steel',
      etchant: '2% Nital solution',
      description:
        'Steel with about 0.45% carbon, austenitized and cooled slowly inside the furnace (annealed). Coarse pearlite grains in a ferrite matrix; the pearlite is noticeably larger than in a normalized structure because of the slower cooling.',
    },
    'high-carbon-steel': {
      name: 'High Carbon Steel',
      etchant: '2% Nital solution',
      description:
        'Steel with 0.90% carbon and 1.2 to 1.3% chromium, austenitized and furnace cooled. Cementite (dark) and chromium carbide grains in a pearlite matrix. Steel with more than 0.8% carbon is called hypereutectoid steel.',
    },
    'high-speed-steel': {
      name: 'High Speed Steel',
      etchant: '2% Nital solution',
      description:
        'Tool steel with 0.8% carbon, 2% molybdenum, 4% chromium, 1% vanadium and 18% tungsten. Austenitized at 1250°C in a salt bath furnace, quenched in a salt bath and tempered at 550°C for 2 hours. White alloy carbide particles in a matrix of tempered martensite.',
    },
    'hardened-tempered-steel': {
      name: 'Hardened and Tempered Steel',
      etchant: '2% Nital solution',
      description:
        'Heated to the austenitizing temperature so the BCC structure transforms to FCC, then quenched in water, oil or polymer to form martensite (body-centred tetragonal) for high hardness and strength. Tempering below the austenitizing temperature avoids cracking and relieves thermal stresses. Tempered martensite, with untempered martensite visible at higher magnification.',
    },
    'grey-cast-iron': {
      name: 'Grey Cast Iron',
      etchant: '3% Nital solution',
      description:
        'Cast iron with 3.8% carbon and 2.6% silicon, annealed at 800°C for 1 hour after casting. Carbon in cast iron is present as combined carbon (cementite) and as free graphite. Graphite flakes, in a pearlite and ferrite matrix when etched.',
    },
    'malleable-iron': {
      name: 'Malleable Iron',
      etchant: '3% Nital solution',
      description:
        'Made from white cast iron by a malleabilising heat treatment, which gathers the free carbon into near-spherical temper carbon nodules and improves elongation and bending. Temper carbon nodules in a fully pearlitic matrix: pearlitic malleable cast iron.',
    },
    'sg-iron': {
      name: 'Spheroidal Graphitic (S.G.) Cast Iron',
      etchant: '3% Nital solution',
      description:
        'Molten grey cast iron is nodularized with an inoculant just before it is poured from the ladle, so graphite forms as spheres. Also called nodular or ductile iron. Graphite nodules ringed by ferrite (the “bull’s-eye” structure) in a mainly ferritic matrix with some pearlite. Its elongation is far higher than that of grey cast iron, which is almost negligible.',
    },
    'austenitic-stainless-steel': {
      name: 'Austenitic Stainless Steel',
      etchant: 'Electrolytic oxalic acid etching',
      description:
        '18% chromium, 8% nickel stainless steel. Single-phase, solution-annealed austenite in equiaxed, uniform grains with clear boundaries and no carbide precipitation at them. The black dots are non-metallic inclusions, with some alloy carbide particles inside the grains.',
    },
    'case-carburized-steel': {
      name: 'Case Carburized Steel',
      etchant: '2% Nital solution',
      description:
        'Low carbon steel (0.15% carbon) gas carburized at 925°C for five hours, raising the surface carbon to a depth of 0.35 mm. The case, at 0.85% carbon, shows cementite and pearlite; the core shows a little fine, spheroidized pearlite in a ferrite matrix, the spheroidization coming from the long soak at temperature.',
    },
    'aluminium-alloy': {
      name: 'Aluminium Alloy',
      etchant: 'Hydrofluoric acid solution',
      description:
        'Aluminium alloy with 3% copper and 6% silicon. Fine Al-Si eutectic in a matrix of aluminium solid solution, with dendritic, acicular Al-Si particles in the primary aluminium. The eutectic particles are rounded rather than sharp or script-like. Dark grains are Al-Si eutectic; light grains are CuAl₂.',
    },
    'muntz-metal': {
      name: 'Muntz Metal',
      etchant: 'Potassium dichromate solution',
      description:
        'Cast copper alloy of 60% copper and 40% zinc. Fine, needle-like alpha phase in a beta matrix, formed by eutectic solidification during casting. This two-phase alpha-beta structure gives the alloy its strength and hardness.',
    },
    brass: {
      name: 'Copper Alloy (Brass)',
      etchant: 'Ammonia and hydrogen peroxide solution',
      description:
        'Wrought leaded tin brass of about 70% copper, 15 to 20% zinc, 2 to 3% tin and 1% lead. Fine, dark lead particles dispersed in beta solid solution, with recrystallized alpha grains from prior cold working. A structure with good strength and machinability.',
    },
    'white-cast-iron': {
      name: 'White Cast Iron',
      etchant: '2% Nital solution',
      description:
        'Produced by suddenly chilling molten grey cast iron, so no graphite forms. About 3.5% carbon, present as massive cementite carbides in a dendritic pattern. Very hard and wear resistant (also called abrasion-resistant iron), it is used in steel rolling mills, pump impellers, vane pumps and flour mills.',
    },
    'titanium-alloy': {
      name: 'Titanium Alloy',
      etchant: 'Kroll’s reagent',
      description:
        'Alpha-beta alloy to ASTM Grade 5 (Ti6Al4V): under 6% aluminium and under 4% vanadium, balance titanium. Solution annealed above the beta transus at 980°C for 30 minutes and air cooled, then held at 704°C for 1 hour and air cooled. Coarse, plate-like alpha grains (light) with beta phase (dark) at their boundaries.',
    },
    'friction-welded-steel': {
      name: 'Friction Welded Steel',
      etchant: '2% Nital solution',
      description:
        'Friction welding is a solid-state process: heat comes from friction between a moving and a stationary part, and an upset force fuses them without melting, so it is closer to forging than to conventional welding. Low carbon steel welded from both sides. The parent metal shows pearlite in ferrite; the weld zone shows much finer, uniform pearlite with no filler metal and some voids from lack of fusion, refined by severe plastic deformation and frictional heat.',
    },
    'electroplated-component': {
      name: 'Electroplated Component',
      etchant: '2% Nital solution',
      description:
        'Electroplating coats one metal over another for mechanical or corrosion properties. This component, of the kind used for car and two-wheeler shock absorber rods, is coated with hard chromium and nickel. The coating, 30 microns thick in total, reaches up to 1200 HV against 250 HV for the base metal, giving a hard surface that resists wear and corrosion. Hard chromium differs from decorative chromium, which only adds lustre.',
    },
    'fusion-welded-steel': {
      name: 'Fusion Welded Mild Steel',
      etchant: '2% Nital solution',
      description:
        'Two low carbon steel plates welded with a low carbon electrode. Fusion welding melts the joint, creating a heat-affected zone. The parent metal shows uniform pearlite grains in ferrite; the weld zone shows fine dendritic grains from rapid solidification, with pearlite dendrites within primary ferrite dendrites.',
    },
    bronze: {
      name: 'Copper Alloy (Bronze)',
      etchant: 'Potassium dichromate solution',
      description:
        'Commercial bronze recorded as 45% zinc, 0.8% lead and 0.5% tin, with traces of bismuth and iron and copper as the remainder. Uniform dendritic alpha grains (white) in a matrix of transformed beta (dark).',
    },
    'aa6061-aluminium': {
      name: 'AA6061 Aluminium Alloy',
      etchant: 'Keller’s reagent',
      description:
        'A medium to high strength, heat-treatable alloy with very good corrosion resistance and weldability (with reduced strength in the weld zone) and medium fatigue strength. Mg₂Si and Al-Si precipitates dispersed uniformly in primary alpha aluminium. Used in automobile components.',
    },
    'magnesium-alloy': {
      name: 'Magnesium Alloy',
      etchant: 'Picric acid solution',
      description:
        'ASTM grade AZ91: magnesium with about 9% aluminium and 1% zinc. A dendritic structure, with eutectic beta phase (Mg₁₇Al₁₂) along the grain boundaries of primary alpha magnesium. Used for gearbox housings, laptop frames, camera bodies and non-load-bearing aerospace parts for its strength-to-weight ratio and castability.',
    },
    'powder-metallurgy': {
      name: 'Powder Metallurgy Sample',
      etchant: '2% Nital solution',
      description:
        'Steel powder compacted under high pressure and sintered at high temperature in argon to prevent oxidation. Medium carbon steel grains of pearlite in ferrite. The black areas are pores from compaction, reduced by finer powder and higher compaction pressure.',
    },
    'bearing-metal': {
      name: 'Bearing Metal',
      etchant: 'Potassium dichromate and Nital solutions',
      description:
        'Bearing metal lined over a steel bush, as used in automobile connecting rod bearings running against the crankshaft. The lining is sintered copper powder with dark lead and tin particles (right) on a medium carbon steel base (left); the proportions are chosen for sliding wear resistance.',
    },
    'pure-copper': {
      name: 'Pure Copper',
      etchant: 'Ferric chloride solution',
      description:
        'Wrought copper of about 98% purity. Equiaxed, polygonal grains of different sizes, with some twinned grains from cold working and fine copper oxide particles at the grain boundaries. Its face-centred cubic structure gives copper its ductility and electrical conductivity.',
    },
  },
}
