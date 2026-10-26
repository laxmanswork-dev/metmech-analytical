// Service content. `methods` lists only tests that appear in the client's own
// test list; standards are named only where the client's documents cite them.
export default {
  meta: {
    title: 'Material Testing Services',
    description:
      'Mechanical, hardness, microstructure, thermal, surface and corrosion testing services from Metmech Analytical Engineers, Chennai.',
  },
  hero: {
    title: 'Material Testing Services',
    lead: 'A wide range of mechanical, analytical, and material testing solutions for industrial and research requirements.',
  },
  overview: {
    heading: 'Service Categories',
    lead: 'Each category below explains what the tests show, where they are used and which methods are available.',
  },
  focus: {
    heading: 'In Focus: SEM with EDS',
    text: 'High-magnification imaging and elemental analysis for surface, fracture and microstructure studies.',
  },
  help: {
    heading: 'Not sure which test you need?',
    text: 'Describe your requirement and our team can help you discuss a suitable testing approach.',
  },
  labels: {
    evaluates: 'What the Test Evaluates',
    why: 'Why It Matters',
    applications: 'Common Applications',
    methods: 'Available Methods',
    instruments: 'Instruments Used',
    faq: 'Frequently Asked Questions',
    related: 'Related Services',
    enquire: 'Enquire About This Service',
    typicalApplications: 'Typical applications',
  },
  items: {
    'mechanical-testing': {
      title: 'Mechanical Testing',
      summary:
        'Tensile, compression, flexural, shear and impact tests that show how a material behaves under load.',
      intro:
        'Mechanical testing measures how a material responds when it is pulled, pressed, bent or struck. We test metals, polymers and fibre-reinforced composites.',
      evaluates: [
        'Strength: the load a material withstands before it yields or breaks',
        'Ductility: how far it stretches or deforms before failure',
        'Stiffness and bending behaviour',
        'Toughness: resistance to sudden impact',
        'Bond and joint strength in adhesives, laminates and welds',
      ],
      why: 'Design calculations and quality checks rely on measured properties, not assumed ones. Mechanical tests confirm that a material or component meets its specification and help compare materials, suppliers or process changes.',
      applications: [
        'Incoming material verification and quality control',
        'Qualification of composite laminates and polymer parts',
        'Weld and adhesive joint evaluation',
        'Data for research projects and publications',
      ],
      methods: [
        'Tensile test',
        'Compression test',
        'Flexural test (3-point and 4-point bending)',
        'Shear test, including lap shear',
        'Impact test (Izod and Charpy)',
        'Drop-weight impact test',
        'T-peel test',
        'Interlaminar (delamination) test',
      ],
      methodsNote:
        'Tests on polymers and composites are carried out to the standard you specify, such as ASTM D638 (tensile), ASTM D790 (flexural) and ASTM D256 (Izod impact).',
      faq: [
        {
          q: 'What kind of specimens do I need to provide?',
          a: 'Specimen shape and size depend on the test standard. Tell us the standard or the material and product form, and we will confirm the dimensions and quantity before you prepare samples.',
        },
        {
          q: 'Do you test both metals and polymers?',
          a: 'Yes. We carry out mechanical tests on metals, polymers and fibre-reinforced composites.',
        },
        {
          q: 'Can you cut test specimens from my material?',
          a: 'Specimen cutting is available for many materials. See Sample Preparation & Processing, or ask us when you enquire.',
        },
      ],
    },
    'hardness-testing': {
      title: 'Hardness Testing',
      summary:
        'Micro Vickers, Brinell, Rockwell and Shore hardness measurements for metals and polymers.',
      intro:
        'Hardness is a material’s resistance to indentation. It is a quick, widely used check that relates to strength, wear resistance and the effect of heat treatment.',
      evaluates: [
        'Surface and bulk hardness of metals',
        'Hardness variation across a weld, case-hardened layer or coating',
        'Hardness of rubbers and plastics (Shore scales)',
      ],
      why: 'Hardness testing needs only a small area and leaves a tiny mark, so it suits finished parts and small samples. A hardness survey across a section shows how a process such as welding or heat treatment has changed the material.',
      applications: [
        'Checking heat treatment and case depth',
        'Hardness profiles across welds and heat-affected zones',
        'Quality control of castings and machined parts',
        'Grading of polymer and rubber materials',
      ],
      methods: [
        'Micro Vickers hardness (individual indentations)',
        'Micro hardness survey (multiple readings across a section)',
        'Brinell hardness',
        'Rockwell hardness',
        'Shore A and Shore D hardness',
      ],
      faq: [
        {
          q: 'Which hardness test should I choose?',
          a: 'It depends on the material, its thickness and what you need to learn. Micro Vickers suits small areas, thin layers and profiles; Brinell and Rockwell suit bulk metals; Shore is used for polymers and rubbers. We can advise.',
        },
        {
          q: 'Does the sample need preparation?',
          a: 'Micro hardness testing needs a flat, polished surface. We can mount and polish the sample for you.',
        },
      ],
    },
    'material-characterization': {
      title: 'Material Characterization',
      summary:
        'Microscopy, SEM with EDS, XRD and related techniques that reveal a material’s structure and composition.',
      intro:
        'Characterization looks inside a material: its microstructure, the elements it contains and the phases present. It explains why a material performs the way it does.',
      evaluates: [
        'Microstructure: grain size, phases and inclusions',
        'Surface features and fracture surfaces at high magnification',
        'Elemental composition of a selected area',
        'Crystalline phases present in a material',
        'Porosity, case depth and decarburised depth',
      ],
      why: 'Two materials with the same nominal grade can behave very differently if their microstructure differs. Characterization links processing to performance and is central to failure analysis.',
      applications: [
        'Failure analysis and fracture investigation',
        'Verification of heat treatment and casting quality',
        'Coating and surface layer examination',
        'Phase identification and research studies',
      ],
      methods: [
        'Micro examination (metallography)',
        'Macro examination',
        'Scanning Electron Microscopy (SEM)',
        'Energy Dispersive Spectroscopy (EDS)',
        'X-ray Diffraction (XRD)',
        'Porosity measurement',
        'Failure analysis (combined test package)',
        'TEM, XPS, XRF, BET and Raman spectroscopy analysis',
      ],
      faq: [
        {
          q: 'What is the difference between micro and macro examination?',
          a: 'Macro examination looks at a sample at low magnification to show features such as weld profiles, flow lines and large defects. Micro examination uses a metallurgical microscope on a polished, etched sample to show grains, phases and inclusions.',
        },
        {
          q: 'What does a failure analysis involve?',
          a: 'It usually combines visual examination, microscopy, hardness and composition checks to find out why a part failed. The scope is agreed with you based on the component and its history.',
        },
      ],
    },
    'thermal-analysis': {
      title: 'Thermal Analysis',
      summary:
        'Simultaneous TGA and DSC measurements that show how a material changes as it is heated.',
      intro:
        'Thermal analysis heats a small sample under controlled conditions and records what happens. Thermogravimetric analysis (TGA) tracks weight change; differential scanning calorimetry (DSC) tracks heat flow.',
      evaluates: [
        'Thermal stability and decomposition temperature',
        'Moisture, volatile and filler content',
        'Melting, crystallisation and other transitions',
        'Oxidation behaviour',
      ],
      why: 'Many materials are processed or used at elevated temperature. Knowing when a material loses weight, melts or reacts helps set processing limits and compare formulations.',
      applications: [
        'Polymer and composite formulation studies',
        'Filler and ash content determination',
        'Thermal stability comparison of materials',
        'Research on metals, ceramics and powders',
      ],
      methods: ['Simultaneous TGA and DSC (TG/DTA), including specimen preparation'],
      faq: [
        {
          q: 'How much sample is required?',
          a: 'Only a small quantity is needed; the instrument accepts samples up to 200 mg. We will confirm the amount and form for your material.',
        },
        {
          q: 'What do I receive?',
          a: 'You receive the weight-change and heat-flow curves recorded against temperature, with the test conditions used.',
        },
      ],
    },
    'surface-corrosion-testing': {
      title: 'Surface & Corrosion Testing',
      summary:
        'Contact angle, surface roughness, wear and corrosion tests that describe how a surface performs in service.',
      intro:
        'Many failures begin at the surface. These tests measure surface texture and wetting, and how a material stands up to friction and corrosive environments.',
      evaluates: [
        'Wettability: how a liquid spreads on a surface (contact angle)',
        'Surface roughness',
        'Wear and friction behaviour at room and elevated temperature',
        'Corrosion rate and resistance in a given environment',
        'Susceptibility to stress corrosion',
      ],
      why: 'Coatings, seals, bearings and exposed structures all depend on surface behaviour. Measuring it helps select materials and treatments and predict service life.',
      applications: [
        'Evaluation of coatings and surface treatments',
        'Comparing wear resistance of materials and lubricants',
        'Corrosion studies of metals and alloys',
        'Checking surface finish after machining',
      ],
      methods: [
        'Wettability / contact angle measurement',
        'Surface roughness measurement, with or without profile graph',
        'Wear test at room temperature and elevated temperature',
        'Corrosion test',
        'Electrochemical corrosion test',
        'Stress corrosion test (ASTM G36)',
        'Water absorption test',
        'Porosity measurement',
      ],
      faq: [
        {
          q: 'What is a contact angle and why measure it?',
          a: 'It is the angle a liquid drop makes with a surface. A low angle means the liquid wets the surface; a high angle means it is repelled. It is used to assess coatings, cleaning and adhesion.',
        },
        {
          q: 'What does an electrochemical corrosion test show?',
          a: 'It uses a potentiostat to measure how a metal behaves in a chosen solution, giving values such as corrosion current and corrosion rate much faster than a long exposure test.',
        },
      ],
    },
    'welding-processing': {
      title: 'Welding & Processing',
      summary:
        'Welding, casting, powder metallurgy, heat treatment and coating processes for research and development work.',
      intro:
        'Alongside testing, we carry out material processing for project and development work, so that samples can be produced and tested in one place.',
      evaluates: [
        'Joint quality from different welding processes',
        'The effect of process parameters on properties',
        'Feasibility of alloy, composite or coating routes',
      ],
      why: 'Research and product development often need small batches made under controlled conditions. Producing and testing them together shortens the path from idea to data.',
      applications: [
        'Academic and industrial research projects',
        'Process parameter studies',
        'Preparation of welded, cast or sintered test samples',
      ],
      methods: [
        'Friction stir welding and friction stir processing (FSW / FSP)',
        'TIG and MIG welding',
        'Friction welding',
        'Aluminium and magnesium casting',
        'Powder metallurgy compaction',
        'Sintering in argon atmosphere',
        'Heat treatment',
        'Manganese phosphate and Ni-P coating',
        'Spark erosion (EDM) project work',
      ],
      faq: [
        {
          q: 'Can you both produce and test my samples?',
          a: 'Yes. Samples processed here can go on to mechanical, hardness, microstructure or corrosion testing as required.',
        },
      ],
    },
    'sample-preparation': {
      title: 'Sample Preparation & Processing',
      imageAlt:
        'Technician fitting a mounted specimen to an automatic grinding and polishing machine, with polishing discs and suspensions on the bench',
      summary:
        'Cutting, mounting, grinding, polishing and etching to prepare specimens for testing and microscopy.',
      intro:
        'Reliable results start with a properly prepared specimen. We prepare samples for microscopy, hardness testing and mechanical tests.',
      evaluates: [
        'A flat, scratch-free surface for microscopy and micro hardness',
        'Specimens cut to the dimensions a test standard requires',
      ],
      why: 'Poor preparation can damage or hide the features being examined. Careful cutting, mounting and polishing ensures that what is seen under the microscope represents the material.',
      applications: [
        'Metallographic specimens for micro examination',
        'Mounted samples for micro hardness testing',
        'Test specimens cut from plates, laminates and components',
      ],
      methods: [
        'Sectioning and cutting',
        'Cold-setting mounting',
        'Hot-press mounting and polishing',
        'Grinding, polishing and etching',
        'FRP test specimen cutting',
        'EDM wire cutting',
        'Water jet cutting',
        'TEM sample preparation',
      ],
      faq: [
        {
          q: 'Why are samples mounted before polishing?',
          a: 'Mounting in resin protects the edges of the sample and gives a regular shape that can be held flat during grinding and polishing.',
        },
        {
          q: 'How large a sample can be mounted?',
          a: 'Hot-press mounting is offered for samples within about 25 × 25 × 10 mm. For other sizes, please ask.',
        },
      ],
    },
    'sem-eds-analysis': {
      title: 'Scanning Electron Microscope (SEM) with EDS',
      // The instrument page has the same name, so the browser title differs.
      metaTitle: 'SEM with EDS Analysis Service',
      summary:
        'High-magnification imaging of surfaces with elemental analysis of selected areas.',
      intro:
        'A scanning electron microscope (SEM) uses a focused beam of electrons to image a sample’s surface structure and morphology at far higher magnification than an optical microscope. Energy dispersive spectroscopy (EDS) uses the X-rays produced by the same beam to identify the elements present.',
      evaluates: [
        'Surface structure and morphology at high magnification',
        'Fracture surface features that indicate how a part failed',
        'Particle, fibre and coating size and shape',
        'Elemental composition of a point or area, and element distribution maps',
      ],
      why: 'Features that decide how a material performs are often too small for an optical microscope. SEM shows them, and EDS identifies what they are made of, within the limits of the instrument and the sample.',
      applications: [
        'Material surface analysis',
        'Elemental composition (EDS)',
        'Fractography and failure investigation',
        'Microstructure examination',
        'Research and industrial applications',
      ],
      methods: ['SEM imaging', 'EDS elemental analysis'],
      methodsNote:
        'SEM analysis is carried out on a Zeiss Sigma field-emission instrument. See the instrument page for its specifications.',
      faq: [
        {
          q: 'What samples are suitable for SEM?',
          a: 'Samples must be solid, dry and able to fit the chamber. Non-conductive samples may need a conductive coating. Tell us about your material and we will advise.',
        },
        {
          q: 'Is EDS the same as a full chemical analysis?',
          a: 'No. EDS identifies and estimates the elements in a small area near the surface. It is well suited to comparing regions and identifying particles or inclusions, but it is not a substitute for bulk chemical analysis.',
        },
        {
          q: 'How long does SEM analysis take?',
          a: 'Timing depends on the number of samples and instrument scheduling. We will give you an estimate when you enquire.',
        },
      ],
    },
  },
}
