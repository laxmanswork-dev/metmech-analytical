export default {
  meta: {
    description:
      'Metmech Analytical Engineers is a Chennai research lab offering mechanical testing, hardness testing, SEM with EDS, thermal analysis, and surface and corrosion testing.',
  },
  // The 6-second company intro shown over the home page.
  intro: {
    skip: 'Skip intro',
  },
  hero: {
    // Shown in uppercase above the heading.
    eyebrow: 'Material Testing · Research Laboratory',
    // The heading, one entry per line. Shown in uppercase.
    titleLines: ['Advanced', 'Engineering', 'Solutions'],
    text: 'We test metals, polymers and composites to support industrial and research needs, including failure analysis.',
    // The link to the business's Google profile under the buttons: a title
    // over a line of detail. With a rating set in src/data/site.js the
    // rating versions are used instead.
    reviews: { title: 'Google Reviews', text: 'Read feedback from our clients' },
    rating: { title: '{value}/5 on Google', text: 'Based on {count} reviews' },
  },
  // The rotating display of testing categories in the hero.
  orbit: {
    label: 'Testing capabilities',
    explore: 'Explore our research capabilities: metallographic specimens and their microstructures',
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
        text: 'We match each test to a suitable instrument and agree the testing method for your sample, so consistent procedures give you reliable results.',
      },
      {
        title: 'Advanced Instruments',
        text: 'Our laboratory is equipped for mechanical and hardness testing, microscopy and material analysis, and thermal and surface testing.',
      },
      {
        title: 'Industrial & Research Support',
        text: 'We support manufacturers and engineers as well as students and researchers, with both routine and project‑based testing.',
      },
      {
        title: 'Technical Consultation',
        text: 'We take time to understand your testing requirements, identify suitable methods and discuss your objectives before testing begins.',
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
    lead: 'Practical materials testing and analytical support for engineering, manufacturing and research.',
    items: [
      {
        title: 'Range of Testing Services',
        text: 'Mechanical, hardness, microstructure, thermal, surface and corrosion tests are available from one laboratory.',
      },
      {
        title: 'Analytical Instrumentation',
        text: 'Access to SEM with EDS, XRD, thermal analysis and metallurgical microscopy for deeper investigation.',
      },
      {
        title: 'Metals, Polymers and Composites',
        text: 'We test metallic materials as well as polymers and fibre-reinforced composites.',
      },
      {
        title: 'Clear Technical Communication',
        text: 'Results are shared with the context needed to understand them, and we are available to discuss them.',
      },
      {
        title: 'Help Choosing the Right Test',
        text: 'Describe the problem you are trying to solve and we will help identify a suitable testing approach.',
      },
    ],
  },
  process: {
    heading: 'How an Enquiry Works',
    lead: 'A typical testing enquiry follows these steps.',
    steps: [
      {
        title: 'Share Your Requirement',
        text: 'Tell us about your material, sample and what you need to find out.',
      },
      {
        title: 'Discuss the Testing Need',
        text: 'We talk through the objective, the applicable standard and any constraints.',
      },
      {
        title: 'Confirm the Suitable Test',
        text: 'The test method, number of samples and specimen details are agreed.',
      },
      {
        title: 'Coordinate Sample Submission',
        text: 'You send or deliver the samples to our laboratory in Chennai.',
      },
      {
        title: 'Receive Results',
        text: 'We share the results and remain available for technical discussion.',
      },
    ],
  },
}
