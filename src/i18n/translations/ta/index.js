// Tamil dictionary, split by area. Mirrors en/ key for key.
// The brand name and standard abbreviations (SEM, EDS, XRD, TGA, DSC, ASTM)
// stay in Latin script. All Tamil text is a draft that needs review by a
// Tamil-speaking subject expert before launch.
import about from './about.js'
import casting from './casting.js'
import common from './common.js'
import contact from './contact.js'
import equipment from './equipment.js'
import heatTreatment from './heatTreatment.js'
import home from './home.js'
import industries from './industries.js'
import privacy from './privacy.js'
import research from './research.js'
import services from './services.js'

export default {
  ...common,
  home,
  about,
  services,
  casting,
  heatTreatment,
  equipment,
  industries,
  research,
  contact,
  privacy,
}
