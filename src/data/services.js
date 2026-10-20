// Service catalogue. Titles and content are in the dictionaries under
// `services.items.<slug>`.
//
// `image` is the slug of the instrument whose photograph illustrates the
// service, or null where no suitable client photograph exists yet (a labelled
// placeholder is shown instead).
export const SERVICES = [
  {
    slug: 'mechanical-testing',
    image: 'universal-testing-machine',
    instruments: ['universal-testing-machine', 'impact-testing-machine'],
    related: ['hardness-testing', 'sample-preparation', 'material-characterization'],
  },
  {
    slug: 'hardness-testing',
    image: 'micro-vickers-hardness-tester',
    instruments: ['micro-vickers-hardness-tester', 'shore-d-hardness-tester'],
    related: ['mechanical-testing', 'material-characterization', 'sample-preparation'],
  },
  {
    slug: 'material-characterization',
    image: 'metallurgical-microscope',
    instruments: ['metallurgical-microscope', 'stereo-digital-microscope', 'sem-eds', 'xrd-system'],
    related: ['sem-eds-analysis', 'hardness-testing', 'sample-preparation'],
  },
  {
    slug: 'thermal-analysis',
    image: 'ta-sdt-650',
    instruments: ['ta-sdt-650'],
    related: ['material-characterization', 'mechanical-testing'],
  },
  {
    slug: 'surface-corrosion-testing',
    image: 'electrochemical-workstation',
    instruments: [
      'contact-angle-measurement-system',
      'surface-roughness-tester',
      'wear-test-machine',
      'electrochemical-workstation',
    ],
    related: ['material-characterization', 'sem-eds-analysis', 'hardness-testing'],
  },
  {
    slug: 'welding-processing',
    image: null,
    instruments: [],
    related: ['mechanical-testing', 'hardness-testing', 'material-characterization'],
  },
  {
    slug: 'sample-preparation',
    image: null,
    instruments: ['metallurgical-microscope'],
    related: ['material-characterization', 'hardness-testing', 'mechanical-testing'],
  },
  {
    slug: 'sem-eds-analysis',
    image: 'sem-eds',
    instruments: ['sem-eds'],
    related: ['material-characterization', 'surface-corrosion-testing', 'sample-preparation'],
  },
]

// The seven categories listed on the Testing Services page.
export const SERVICE_CATEGORIES = [
  'mechanical-testing',
  'hardness-testing',
  'material-characterization',
  'thermal-analysis',
  'surface-corrosion-testing',
  'welding-processing',
  'sample-preparation',
]

// The six cards on the home page.
export const HOME_SERVICES = SERVICE_CATEGORIES.filter((slug) => slug !== 'welding-processing')

// The specialist service highlighted separately.
export const FOCUS_SERVICE = 'sem-eds-analysis'

export const getService = (slug) => SERVICES.find((service) => service.slug === slug)
