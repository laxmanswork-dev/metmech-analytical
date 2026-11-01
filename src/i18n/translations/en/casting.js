// Casting page content. Only aluminium casting and the magnesium casting
// process appear in the client's price list; zinc, stir and controlled-
// atmosphere casting and metal matrix composites come from the client's brief
// (see src/data/casting.js). Nothing here names equipment, gases,
// capacities, certifications or guaranteed results.
export default {
  meta: {
    title: 'Metal Casting & Material Development',
    description:
      'Aluminium, magnesium and zinc alloy casting, stir casting, controlled-atmosphere processing and metal matrix composite development, with microstructural and property evaluation, at Metmech Analytical Engineers, Chennai.',
  },
  hero: {
    title: 'Advanced Metal Casting & Material Development',
    lead: 'Exploring advanced casting techniques to develop, process, and evaluate metal alloys for demanding engineering and research applications.',
    // Describe the hero photograph here once it is added
    // (src/assets/images/casting/casting-hero.webp).
    imageAlt: '',
  },
  enquire: 'Discuss Your Casting Project',
  // What a casting enquiry is about when it names no category.
  enquiryName: 'Casting & Material Development',
  intro: {
    heading: 'Casting Expertise',
    lead: 'We specialise in advanced casting processes for zinc, aluminium, and magnesium alloys, with expertise in stir casting and controlled-atmosphere processing. Our research focuses on process optimisation, material development, microstructural characterisation, and the evaluation of casting quality for industrial and research applications.',
    text: 'Casting sits beside our testing services, so a cast sample can go on to microstructural examination and property testing within the same project.',
    note: 'Every casting project is scoped individually. The alloy, the casting route and the tests are agreed with you before work begins.',
    figuresCaption:
      'Reference micrographs from our standard metallographic specimen sets, showing the dendritic structures typical of these alloy systems.',
    figuresLink: 'View the full specimen set',
  },
  labels: {
    covers: 'What this covers',
    applications: 'Application areas',
    services: 'Related testing services',
    enquire: 'Enquire about this',
    specialist: 'Specialist expertise',
    // Names the list of links to the categories, for screen readers.
    index: 'Casting categories',
  },
  sections: {
    alloy: {
      heading: 'Alloy Casting',
      lead: 'Conventional casting of aluminium, magnesium and zinc alloys: the alloy is melted and cast on its own, and the work concerns the alloy, the casting parameters and the quality of the result.',
    },
    specialist: {
      heading: 'Specialist Casting Processes',
      lead: 'Two processes we bring particular expertise to: stir casting for composite development, and controlled-atmosphere processing for melts that react with air.',
    },
    development: {
      heading: 'Composite Development & Casting Quality',
      lead: 'Developing new cast materials, and evaluating castings with the laboratory’s testing services.',
    },
    process: {
      heading: 'How a Casting Project Runs',
      lead: 'The stages a casting project can include, from the first discussion to the technical findings.',
      note: 'Each project uses only the stages it needs. Some cover casting alone; others only the evaluation of castings you supply.',
    },
    applications: {
      heading: 'Applications & Research Areas',
      lead: 'Fields where casting and composite development are applied. They describe the scope of the work, not past client projects.',
    },
  },
  comparison: {
    heading: 'Alloy casting and stir casting',
    conventional: {
      title: 'Conventional alloy casting',
      text: 'The alloy is melted and cast without additions. The study concerns the alloy, the casting parameters and the soundness of the casting.',
    },
    composite: {
      title: 'Composite-oriented stir casting',
      text: 'Reinforcement is stirred into the melt to produce a metal matrix composite. It is used when a project calls for a composite, not as part of every casting.',
    },
  },
  categories: {
    'aluminium-casting': {
      title: 'Aluminium Alloy Casting',
      text: 'Aluminium alloys combine low density with good castability, which makes them central to lightweight engineering. We cast aluminium alloys for development and research work and evaluate how the casting route shapes the material.',
      points: [
        'Aluminium alloy development and processing',
        'Optimisation of casting parameters',
        'Evaluation of microstructure and material properties',
        'Assessment of casting defects, with the examinations available to the project',
      ],
      applications: [
        'Automotive components',
        'Aerospace research',
        'Industrial components',
        'Engineering development',
      ],
    },
    'magnesium-casting': {
      title: 'Magnesium Alloy Casting',
      text: 'Magnesium is the lightest structural metal, and its alloys are widely studied for weight reduction. Molten magnesium is highly reactive, so melting and pouring must be planned around oxidation and safe handling.',
      points: [
        'Magnesium alloy casting and processing research',
        'Evaluation of process parameters',
        'Microstructural characterisation',
        'Assessment of mechanical properties',
        'Controlled-atmosphere considerations for reactive magnesium melts',
      ],
      note: 'Magnesium casting is arranged project by project. Feasibility, melt handling and scope are confirmed with you before any work is agreed.',
    },
    'zinc-casting': {
      title: 'Zinc Alloy Casting',
      text: 'Zinc alloys melt at comparatively low temperatures and fill moulds well, and are used for detailed cast parts and, in zinc–aluminium grades, for bearing applications. We approach zinc alloy casting as material-processing and research work.',
      points: [
        'Zinc alloy casting and process development',
        'Evaluation of casting parameters',
        'Microstructure and material-property assessment',
        'Investigation of casting quality and defects',
        'Research involving zinc-based engineering materials',
      ],
      note: 'Zinc alloy work is scoped on enquiry: tell us the alloy and what you need to learn, and we will confirm what can be done.',
    },
    'stir-casting': {
      title: 'Stir Casting',
      text: 'Stir casting is a liquid-state route to metal matrix composites. The molten metal is stirred mechanically while selected reinforcement is added, so that the reinforcement is drawn into the melt and spread through it before it solidifies. How evenly it spreads, and how well it bonds with the metal, largely decides the composite’s properties.',
      points: [
        'Melt preparation and processing',
        'Controlled stirring parameters',
        'Reinforcement incorporation and distribution',
        'Metal matrix composite development',
        'Evaluation of microstructural uniformity',
        'Assessment of porosity, interfaces and mechanical properties, with the tests available to the project',
      ],
    },
    'controlled-atmosphere-casting': {
      title: 'Controlled-Atmosphere Casting',
      text: 'Many molten metals react with air: they oxidise, take up gas or form inclusions that weaken the casting. Managing the atmosphere around the melt, where the process calls for it, limits these effects and helps keep the melt clean and the process stable.',
      points: [
        'Atmosphere management during suitable casting processes',
        'Oxidation and contamination considerations',
        'Process stability and melt quality',
        'Special handling of reactive molten metals, particularly magnesium',
        'Process evaluation for research and material development',
      ],
      note: 'The atmosphere and set-up are chosen to suit each alloy and process, and agreed with you as part of the project scope.',
    },
    'mmc-development': {
      title: 'Metal Matrix Composite Development',
      text: 'A metal matrix composite combines a metal or alloy with a reinforcing phase to reach properties the base metal cannot, such as higher stiffness or wear resistance. Developing one means choosing the reinforcement, incorporating it, and checking how it is distributed and bonded.',
      points: [
        'Metal matrix composite research',
        'Reinforcement selection and incorporation, to suit the project',
        'Reinforcement distribution and interface evaluation',
        'Microstructural characterisation',
        'Mechanical-property assessment',
        'Research-led material development',
      ],
    },
    'casting-quality': {
      title: 'Casting Quality & Material Characterisation',
      text: 'Castings are evaluated with the laboratory’s testing services. The tests for each project are chosen from those below and agreed with you in advance.',
      points: [
        'Micro and macro examination of the cast structure',
        'SEM with EDS for microstructure, fracture surfaces and composition',
        'Hardness testing',
        'Tensile and compression testing',
        'Porosity and defect evaluation',
        'Wear and corrosion testing, where relevant',
        'Comparison of casting parameters with the resulting properties',
      ],
    },
  },
  process: [
    {
      title: 'Requirement Assessment',
      text: 'We understand the alloy system, the intended application, the research objective and the material requirements.',
    },
    {
      title: 'Material & Process Selection',
      text: 'We identify a suitable casting route for the alloy, any reinforcement and the project’s objectives.',
    },
    {
      title: 'Casting Process Development',
      text: 'Relevant process parameters are evaluated, with atmosphere requirements where they apply.',
    },
    {
      title: 'Sample Preparation & Characterisation',
      text: 'Specimens are prepared and their microstructure and quality assessed.',
    },
    {
      title: 'Property Evaluation',
      text: 'Material tests are carried out according to the agreed project scope.',
    },
    {
      title: 'Technical Findings',
      text: 'We present the agreed observations, test results and technical documentation.',
    },
  ],
  applications: [
    {
      title: 'Lightweight engineering materials',
      text: 'Aluminium and magnesium alloys for parts where weight matters.',
    },
    {
      title: 'Aluminium-based metal matrix composites',
      text: 'Reinforced aluminium for higher stiffness and wear resistance.',
    },
    {
      title: 'Magnesium alloy research',
      text: 'Casting behaviour, microstructure and properties of magnesium alloys.',
    },
    {
      title: 'Zinc-based engineering components',
      text: 'Zinc alloys for detailed cast parts and bearing applications.',
    },
    {
      title: 'Automotive material research',
      text: 'Lighter alloys and composites for vehicle components.',
    },
    {
      title: 'Wear-resistant material development',
      text: 'Reinforced and alloyed materials for sliding and abrasive contact.',
    },
    {
      title: 'Materials science and academic research',
      text: 'Sample production and characterisation for theses, projects and publications.',
    },
    {
      title: 'Industrial component development',
      text: 'Evaluation of alloys and casting routes for industrial parts.',
    },
  ],
  help: {
    heading: 'Planning a casting or composite project?',
    text: 'Tell us the alloy, the process you have in mind and what you need to learn. We will confirm what can be done and agree the scope with you.',
  },
}
