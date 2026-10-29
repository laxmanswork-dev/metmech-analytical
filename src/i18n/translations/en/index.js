// English dictionary, split by area. ta/ must mirror this structure key for key.
import about from './about.js'
import common from './common.js'
import contact from './contact.js'
import equipment from './equipment.js'
import home from './home.js'
import industries from './industries.js'
import privacy from './privacy.js'
import research from './research.js'
import services from './services.js'

export default { ...common, home, about, services, equipment, industries, research, contact, privacy }
