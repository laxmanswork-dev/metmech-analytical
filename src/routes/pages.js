import { INSTRUMENTS } from '../data/instruments.js'
import { SERVICES } from '../data/services.js'

// Language-neutral paths. English is served at the path itself, Tamil under /ta.
export const ROUTES = {
  home: '/',
  services: '/testing-services',
  equipment: '/equipment',
  industries: '/industries',
  privacy: '/privacy-policy',
}

// Sections of the home page that the navigation scrolls to. Each value is the
// home path plus the id of the section.
export const HOME_SECTIONS = {
  about: '/#about',
  contact: '/#contact',
}

// Where every "Start a Test" action leads: the enquiry form in the home page's
// contact section.
export const ENQUIRY_PATH = '/#enquiry'

// About and Contact used to be pages of their own. Their old addresses send
// visitors to the matching home section instead of a missing page.
export const LEGACY_REDIRECTS = [
  { from: '/about', to: HOME_SECTIONS.about },
  { from: '/contact', to: HOME_SECTIONS.contact },
]

// Footer navigation, in display order. `key` maps to `nav.<key>` in the dictionaries.
export const NAV_ITEMS = [
  { key: 'home', path: ROUTES.home },
  { key: 'about', path: HOME_SECTIONS.about },
  { key: 'services', path: ROUTES.services },
  { key: 'equipment', path: ROUTES.equipment },
  { key: 'industries', path: ROUTES.industries },
  { key: 'contact', path: HOME_SECTIONS.contact },
]

// Header navigation. Home, About Us and Contact are all on the home page;
// "Our Services" groups the pages about what the lab does, each with its own
// route.
export const HEADER_NAV = [
  { key: 'home', path: ROUTES.home },
  {
    key: 'ourServices',
    children: ['services', 'equipment', 'industries'].map((key) => ({ key, path: ROUTES[key] })),
  },
  { key: 'about', path: HOME_SECTIONS.about },
  { key: 'contact', path: HOME_SECTIONS.contact },
]

export const servicePath = (slug) => `${ROUTES.services}/${slug}`
export const instrumentPath = (slug) => `${ROUTES.equipment}/${slug}`

// Every indexable page. Prerendering and the sitemap are generated from this list.
export const ALL_PATHS = [
  ...Object.values(ROUTES),
  ...SERVICES.map(({ slug }) => servicePath(slug)),
  ...INSTRUMENTS.map(({ slug }) => instrumentPath(slug)),
]
