import { INSTRUMENTS } from '../data/instruments.js'
import { SERVICES } from '../data/services.js'

// Language-neutral paths. English is served at the path itself, Tamil under /ta.
export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/testing-services',
  equipment: '/equipment',
  industries: '/industries',
  contact: '/contact',
  privacy: '/privacy-policy',
}

// Where every "Start a Test" action leads: the enquiry form on the contact page.
export const ENQUIRY_PATH = `${ROUTES.contact}#enquiry`

// Main navigation, in display order. `key` maps to `nav.<key>` in the dictionaries.
export const NAV_ITEMS = ['home', 'about', 'services', 'equipment', 'industries', 'contact'].map(
  (key) => ({ key, path: ROUTES[key] }),
)

// Header navigation. "Our Services" groups the pages about what the lab does;
// every page keeps its own route. The footer still lists all six from NAV_ITEMS.
export const HEADER_NAV = [
  { key: 'home', path: ROUTES.home },
  {
    key: 'ourServices',
    children: ['services', 'equipment', 'industries'].map((key) => ({ key, path: ROUTES[key] })),
  },
  { key: 'about', path: ROUTES.about },
  { key: 'contact', path: ROUTES.contact },
]

export const servicePath = (slug) => `${ROUTES.services}/${slug}`
export const instrumentPath = (slug) => `${ROUTES.equipment}/${slug}`

// Every indexable page. Prerendering and the sitemap are generated from this list.
export const ALL_PATHS = [
  ...Object.values(ROUTES),
  ...SERVICES.map(({ slug }) => servicePath(slug)),
  ...INSTRUMENTS.map(({ slug }) => instrumentPath(slug)),
]
