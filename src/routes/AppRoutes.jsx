import { Navigate, Route, Routes } from 'react-router'
import SiteLayout from '../components/layout/SiteLayout.jsx'
import { LANGUAGE_CODES } from '../i18n/config.js'
import EquipmentPage from '../pages/EquipmentPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import IndustriesPage from '../pages/IndustriesPage.jsx'
import InstrumentDetailPage from '../pages/InstrumentDetailPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import PrivacyPage from '../pages/PrivacyPage.jsx'
import ServiceDetailPage from '../pages/ServiceDetailPage.jsx'
import ServicesPage from '../pages/ServicesPage.jsx'
import { localizePath } from '../utils/paths.js'
import { LEGACY_REDIRECTS, ROUTES } from './pages.js'

const PAGE_ROUTES = [
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.services, element: <ServicesPage /> },
  { path: `${ROUTES.services}/:slug`, element: <ServiceDetailPage /> },
  { path: ROUTES.equipment, element: <EquipmentPage /> },
  { path: `${ROUTES.equipment}/:slug`, element: <InstrumentDetailPage /> },
  { path: ROUTES.industries, element: <IndustriesPage /> },
  { path: ROUTES.privacy, element: <PrivacyPage /> },
]

// Every page is registered once per language: "/equipment" and "/ta/equipment".
// The old About and Contact addresses redirect to their home-page sections, in
// the same language. The prerendered redirect pages (scripts/prerender.js)
// cover a first visit; these cover links followed inside the app.
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
        {LANGUAGE_CODES.flatMap((language) =>
          LEGACY_REDIRECTS.map(({ from, to }) => (
            <Route
              key={`${language}:${from}`}
              path={localizePath(from, language)}
              element={<Navigate to={localizePath(to, language)} replace />}
            />
          )),
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
