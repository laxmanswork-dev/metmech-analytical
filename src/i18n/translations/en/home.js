export default {
  meta: {
    description:
      'Metmech Analytical Engineers is a Chennai research lab offering mechanical testing, hardness testing, SEM with EDS, thermal analysis, and surface and corrosion testing.',
  },
  hero: {
    // Shown in uppercase above the heading.
    eyebrow: 'Material Testing · Analytical Research',
    // The heading, one entry per line. Shown in uppercase.
    titleLines: ['Advancing', 'Materials', 'Through Science.'],
    text: 'We test metals, polymers and composites to support industrial and research needs.',
  },
  // The rotating display of testing categories in the hero.
  orbit: {
    label: 'Testing capabilities',
    centreAlt: 'Scanning electron microscope with operator workstation',
    pause: 'Pause animation',
    play: 'Play animation',
    // The lines each name is set on inside its circle, which is about 110px
    // wide: keep lines short. Each entry must spell the service title.
    labelLines: {
      'mechanical-testing': ['Mechanical', 'Testing'],
      'hardness-testing': ['Hardness', 'Testing'],
      'material-characterization': ['Material', 'Characterization'],
      'thermal-analysis': ['Thermal', 'Analysis'],
      'surface-corrosion-testing': ['Surface &', 'Corrosion', 'Testing'],
      'welding-processing': ['Welding &', 'Processing'],
    },
    // Names whose last line is too wide for the bottom of the circle; they are
    // set a little higher.
    labelRaised: ['material-characterization'],
    items: {
      'mechanical-testing': 'Tensile strength, compression, impact and flexural behaviour.',
      'hardness-testing': 'Material resistance to indentation and deformation.',
      'material-characterization': 'Microstructure, composition and material properties.',
      'thermal-analysis': 'Thermal behaviour and temperature-dependent properties.',
      'surface-corrosion-testing':
        'Surface condition, coating performance and corrosion behaviour.',
      'welding-processing': 'Weld quality, process evaluation and material integrity.',
    },
  },
  capabilities: {
    heading: 'What We Offer',
    items: [
      {
        title: 'Accurate Testing',
        points: [
          'Suitable instruments for each test',
          'Testing methods agreed for your sample',
          'Reliable results through consistent testing procedures',
        ],
      },
      {
        title: 'Advanced Instruments',
        points: [
          'Mechanical and hardness testing',
          'Microscopy and material analysis',
          'Thermal and surface testing',
        ],
      },
      {
        title: 'Industrial & Research Support',
        points: [
          'Support for manufacturers and engineers',
          'Testing for students and researchers',
          // U+2011 non-breaking hyphen: keeps "project-based" whole on one line.
          'Routine and project‑based testing',
        ],
      },
      {
        title: 'Technical Consultation',
        points: [
          'Understand your testing requirements',
          'Identify suitable testing methods',
          'Discuss objectives before testing begins',
        ],
      },
    ],
  },
  testing: {
    heading: 'Our Testing Capabilities',
    lead: 'Explore our services by material and testing requirement.',
  },
  instruments: {
    heading: 'Featured Instruments',
    lead: 'Some of the instruments used for our testing and analysis work.',
  },
  industries: {
    heading: 'Industries We Support',
    lead: 'Material questions come up in every engineering sector. These are the areas we work with most often.',
  },
  why: {
    heading: 'Why Choose Us?',
    items: [
      {
        title: 'Range of testing services',
        text: 'Mechanical, hardness, microstructure, thermal, surface and corrosion tests are available from one laboratory.',
      },
      {
        title: 'Analytical instrumentation',
        text: 'Access to SEM with EDS, XRD, thermal analysis and metallurgical microscopy for deeper investigation.',
      },
      {
        title: 'Metals, polymers and composites',
        text: 'We test metallic materials as well as polymers and fibre-reinforced composites.',
      },
      {
        title: 'Clear technical communication',
        text: 'Results are shared with the context needed to understand them, and we are available to discuss them.',
      },
      {
        title: 'Help choosing the right test',
        text: 'Describe the problem you are trying to solve and we will help identify a suitable testing approach.',
      },
    ],
  },
  process: {
    heading: 'How an Enquiry Works',
    lead: 'A typical testing enquiry follows these steps.',
    steps: [
      {
        title: 'Share your requirement',
        text: 'Tell us about your material, sample and what you need to find out.',
      },
      {
        title: 'Discuss the testing need',
        text: 'We talk through the objective, the applicable standard and any constraints.',
      },
      {
        title: 'Confirm the suitable test',
        text: 'The test method, number of samples and specimen details are agreed.',
      },
      {
        title: 'Coordinate sample submission',
        text: 'You send or deliver the samples to our laboratory in Chennai.',
      },
      {
        title: 'Receive results',
        text: 'We share the results and remain available for technical discussion.',
      },
    ],
  },
}
