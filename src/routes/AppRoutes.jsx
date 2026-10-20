import { Route, Routes } from 'react-router'
import SiteLayout from '../components/layout/SiteLayout.jsx'
import { LANGUAGE_CODES } from '../i18n/config.js'
import AboutPage from '../pages/AboutPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import EquipmentPage from '../pages/EquipmentPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import IndustriesPage from '../pages/IndustriesPage.jsx'
import InstrumentDetailPage from '../pages/InstrumentDetailPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import PrivacyPage from '../pages/PrivacyPage.jsx'
import ServiceDetailPage from '../pages/ServiceDetailPage.jsx'
import ServicesPage from '../pages/ServicesPage.jsx'
import { localizePath } from '../utils/paths.js'
import { ROUTES } from './pages.js'

const PAGE_ROUTES = [
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.about, element: <AboutPage /> },
  { path: ROUTES.services, element: <ServicesPage /> },
  { path: `${ROUTES.services}/:slug`, element: <ServiceDetailPage /> },
  { path: ROUTES.equipment, element: <EquipmentPage /> },
  { path: `${ROUTES.equipment}/:slug`, element: <InstrumentDetailPage /> },
  { path: ROUTES.industries, element: <IndustriesPage /> },
  { path: ROUTES.contact, element: <ContactPage /> },
  { path: ROUTES.privacy, element: <PrivacyPage /> },
]

// Every page is registered once per language: "/about" and "/ta/about".
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        {LANGUAGE_CODES.flatMap((language) =>
          PAGE_ROUTES.map(({ path, element }) => (
            <Route
              key={`${language}:${path}`}
              path={localizePath(path, language)}
              element={element}
            />
          )),
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
