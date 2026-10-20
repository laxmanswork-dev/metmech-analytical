// Instrument catalogue. Names and descriptions are in the dictionaries under
// `equipment.items.<slug>`.
//
// `specs` holds only values stated in the client's machine documents. `label`
// is a key in `equipment.specLabels`; `value` is language-neutral. A `null`
// value is shown as "Awaiting confirmation". Where two client documents
// disagree, the field is left out or set to null (see README, "Open questions").
export const INSTRUMENT_CATEGORIES = ['mechanical', 'hardness', 'microscopy', 'thermal', 'surface', 'other']

export const INSTRUMENTS = [
  {
    slug: 'sem-eds',
    category: 'microscopy',
    services: ['sem-eds-analysis', 'material-characterization'],
    specs: [
      { label: 'make', value: 'Zeiss' },
      { label: 'model', value: 'Sigma' },
      { label: 'electronSource', value: 'Schottky thermal field emitter' },
      { label: 'acceleratingVoltage', value: '0.2 to 30 kV' },
      { label: 'probeCurrent', value: '4 pA to 20 nA' },
      { label: 'variablePressure', value: '2 – 133 Pa' },
      {
        label: 'detectors',
        value:
          'In-lens secondary electron, Everhart-Thornley secondary electron, variable pressure secondary electron, backscattered electron',
      },
      { label: 'semResolution', value: '2.8 nm / 1.5 nm' },
      { label: 'maxImageSize', value: '3072 × 2304 pixels' },
      { label: 'chamber', value: 'Specimens up to 250 mm diameter and 45 mm tall' },
      { label: 'edsDetector', value: '80 mm² silicon-drift detector' },
    ],
  },
  {
    slug: 'ta-sdt-650',
    category: 'thermal',
    services: ['thermal-analysis'],
    specs: [
      { label: 'make', value: 'TA Instruments' },
      { label: 'model', value: 'SDT 650' },
      // The client's two documents state different upper limits (800 °C and 1500 °C).
      { label: 'temperatureRange', value: null },
      { label: 'tempPrecision', value: '±0.5 °C' },
      { label: 'heatingRate', value: '0.1 to 100 °C/min' },
      { label: 'calorimetricAccuracy', value: '±2% (based on metal standards)' },
      { label: 'heatCapacityAccuracy', value: '±5%' },
      { label: 'sampleCapacity', value: '200 mg' },
      { label: 'weighingAccuracy', value: '±0.5%' },
      { label: 'weighingPrecision', value: '±0.1%' },
      { label: 'vacuum', value: '50 µTorr' },
    ],
  },
  {
    slug: 'universal-testing-machine',
    category: 'mechanical',
    services: ['mechanical-testing'],
    specs: [
      { label: 'make', value: 'FIE (Fuel Instruments and Engineers)' },
      { label: 'maxLoad', value: '5 tonnes (50 kN)' },
      { label: 'loadAccuracy', value: '0.1 N' },
      { label: 'crossheadSpeed', value: '1 – 300 mm/min' },
      { label: 'crossheadAccuracy', value: '0.01 mm' },
    ],
  },
  {
    slug: 'impact-testing-machine',
    category: 'mechanical',
    services: ['mechanical-testing'],
    specs: [
      { label: 'model', value: 'XJJU-5.5' },
      { label: 'testType', value: 'Izod' },
      { label: 'impactEnergy', value: '0.1 – 14 J' },
      { label: 'impactSpeed', value: '3.5 m/s' },
      { label: 'display', value: 'Analog' },
      { label: 'standards', value: 'ISO 179, ISO 180, ASTM D256, GB/T 1043, GB/T 1843' },
    ],
  },
  {
    slug: 'micro-vickers-hardness-tester',
    category: 'hardness',
    services: ['hardness-testing'],
    // Make and model are omitted: the client's two documents name different makes.
    specs: [
      { label: 'loadRange', value: '10 g to 1 kg' },
      { label: 'leastCount', value: '0.01 mm' },
      { label: 'objectives', value: '10X, 40X' },
      { label: 'camera', value: '5 MP' },
      { label: 'scales', value: 'HV, HRA, HRC, 15N, 30N' },
      { label: 'standards', value: 'ASTM E92, GB/T 4340.2' },
    ],
  },
  {
    slug: 'shore-d-hardness-tester',
    category: 'hardness',
    services: ['hardness-testing'],
    specs: [
      { label: 'make', value: 'Yuzuki (Japan)' },
      { label: 'measuringRange', value: '0 – 100 HSD' },
      { label: 'resolution', value: '0.5' },
      { label: 'display', value: 'Analog, with auto hold' },
    ],
  },
  {
    slug: 'metallurgical-microscope',
    category: 'microscopy',
    services: ['material-characterization', 'sample-preparation'],
    specs: [
      { label: 'make', value: 'Dewinter' },
      { label: 'model', value: 'Victory-800' },
      { label: 'magnification', value: '50X to 800X' },
      { label: 'eyepieces', value: 'Paired 10X and 15X' },
      { label: 'objectives', value: '5X, 10X, 20X, 25X, 45X, 80X' },
      { label: 'illumination', value: '12 V, 50 W halogen lamp' },
      { label: 'polarisation', value: 'Polariser prism' },
      { label: 'camera', value: '5 MP' },
      { label: 'software', value: 'Dewinter Material Plus (version 2)' },
    ],
  },
  {
    slug: 'stereo-digital-microscope',
    category: 'microscopy',
    services: ['material-characterization'],
    specs: [
      { label: 'make', value: 'Celestron' },
      { label: 'magnification', value: '20X to 200X' },
      { label: 'camera', value: '5 MP' },
      { label: 'software', value: 'MicroCapture Pro (version 2.3)' },
    ],
  },
  {
    slug: 'contact-angle-measurement-system',
    category: 'surface',
    services: ['surface-corrosion-testing'],
    specs: [
      {
        label: 'measuringMethods',
        value: 'Sessile drop (static and dynamic) for contact angle; pendant drop for surface and interfacial tension',
      },
      { label: 'measuringRange', value: '0.1° to 180°' },
      { label: 'resolution', value: '0.1°' },
      { label: 'accuracy', value: '0.3°' },
      { label: 'maxSampleSize', value: '160 × 100 × 10 mm' },
      { label: 'camera', value: '10 MP' },
    ],
  },
  {
    slug: 'electrochemical-workstation',
    category: 'surface',
    services: ['surface-corrosion-testing'],
    // Model is omitted: the client's documents name both CS310M and CS350M.
    specs: [
      { label: 'make', value: 'Corrtest' },
      { label: 'electrodeSystem', value: '2-, 3- or 4-electrode' },
      { label: 'potentialRange', value: '±10 V' },
      { label: 'currentRange', value: '±2 A' },
      { label: 'eisFrequency', value: '10 µHz to 1 MHz' },
      {
        label: 'techniques',
        value: 'EIS, polarisation curve (Tafel plot), cyclic and linear sweep voltammetry, open circuit potential, electrochemical noise',
      },
    ],
  },
  {
    slug: 'surface-roughness-tester',
    category: 'surface',
    services: ['surface-corrosion-testing'],
    specs: [
      { label: 'make', value: 'Mitutoyo' },
      { label: 'model', value: 'Surftest SJ-210' },
    ],
  },
  {
    slug: 'wear-test-machine',
    category: 'surface',
    services: ['surface-corrosion-testing'],
    specs: [
      { label: 'make', value: 'Ducom' },
      { label: 'loadRange', value: 'Up to 20 N' },
      { label: 'rotationalSpeed', value: 'Up to 2000 rpm' },
      { label: 'wearRange', value: '0 to 2000 µm' },
    ],
  },
  {
    slug: 'xrd-system',
    category: 'other',
    services: ['material-characterization'],
    specs: [],
  },
]

// Shown on the home page.
export const FEATURED_INSTRUMENTS = [
  'sem-eds',
  'ta-sdt-650',
  'micro-vickers-hardness-tester',
  'impact-testing-machine',
  'contact-angle-measurement-system',
]

export const getInstrument = (slug) => INSTRUMENTS.find((instrument) => instrument.slug === slug)
