// Industry content describes how material testing applies to each sector.
// It makes no claim about named customers or industry-specific approvals.
export default {
  meta: {
    title: 'Industries We Support',
    description:
      'How material testing and analysis from Metmech Analytical Engineers supports automotive, manufacturing, aerospace, energy, research and general engineering work.',
  },
  hero: {
    title: 'Industries We Support',
    lead: 'Testing solutions for a range of industrial and research applications.',
  },
  labels: {
    challenge: 'Typical material challenges',
    support: 'How testing helps',
    questions: 'Questions customers bring to us',
    services: 'Relevant testing services',
  },
  items: {
    automotive: {
      title: 'Automotive',
      summary: 'Material checks for components that must be light, strong and durable.',
      challenge:
        'Vehicle parts face repeated loading, vibration, heat and corrosion. Lighter alloys, polymers and composites are replacing traditional materials, and each must be proven.',
      support:
        'Mechanical and hardness tests confirm strength and heat treatment. Microscopy and SEM help investigate cracked or worn parts. Corrosion and wear tests compare coatings and surface treatments.',
      questions: [
        'Does this casting or forging meet the specified hardness and strength?',
        'Why did this component crack in service?',
        'Which coating gives better corrosion resistance?',
      ],
    },
    manufacturing: {
      title: 'Manufacturing',
      summary: 'Quality control and troubleshooting for materials and processes.',
      challenge:
        'Manufacturers need consistent raw material and stable processes. A change in supplier, heat treatment or welding parameters can alter a product’s properties.',
      support:
        'Routine tensile, hardness and microstructure checks verify incoming material and finished parts. Surface roughness and wear tests check finishing operations.',
      questions: [
        'Is this batch of material the same as the last one?',
        'Has heat treatment achieved the required case depth?',
        'Is this weld sound and strong enough?',
      ],
    },
    aerospace: {
      title: 'Aerospace',
      summary: 'Characterization of lightweight alloys and composite laminates.',
      challenge:
        'Aerospace materials combine low weight with high strength, and are often fibre-reinforced composites or advanced alloys whose behaviour must be thoroughly understood.',
      support:
        'Tensile, flexural, shear and delamination tests characterize composite laminates. Thermal analysis and SEM support material development and investigation.',
      questions: [
        'What are the tensile and flexural properties of this laminate?',
        'How does this material behave as temperature rises?',
        'What does the fracture surface tell us about the failure?',
      ],
    },
    energy: {
      title: 'Energy',
      summary: 'Testing for materials exposed to heat, wear and corrosive environments.',
      challenge:
        'Energy equipment operates for long periods under heat, pressure and corrosive conditions. Material degradation has to be anticipated and monitored.',
      support:
        'Corrosion and electrochemical tests assess resistance in specific environments. Thermal analysis, wear testing and microstructure examination support material selection and life assessment.',
      questions: [
        'How quickly will this alloy corrode in this environment?',
        'Is this coating protecting the base metal?',
        'Has the microstructure changed after service exposure?',
      ],
    },
    research: {
      title: 'Research & Development',
      summary: 'Testing and analysis support for academic and industrial research.',
      challenge:
        'Researchers developing new alloys, composites and coatings need dependable data, often from small batches and non-standard samples.',
      support:
        'We provide processing, specimen preparation, testing and characterization, including SEM with EDS, XRD and thermal analysis, to generate data for projects and publications.',
      questions: [
        'Can you prepare and test specimens from my experimental material?',
        'What phases and elements are present in this sample?',
        'Which tests will best support my study?',
      ],
    },
    engineering: {
      title: 'General Engineering',
      summary: 'Practical testing for fabricators, workshops and engineering firms.',
      challenge:
        'Fabricators and engineering firms regularly need to confirm a material grade, qualify a weld or understand why a part failed, often at short notice.',
      support:
        'Standard mechanical and hardness tests, macro and micro examination, and failure analysis provide clear answers for everyday engineering decisions.',
      questions: [
        'What is the hardness and strength of this material?',
        'Can you examine this weld?',
        'Why did this shaft, bolt or gear fail?',
      ],
    },
  },
}
