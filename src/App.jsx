import LanguageProvider from './i18n/LanguageProvider.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

// Router-agnostic application tree: main.jsx wraps it in a BrowserRouter and
// entry-server.jsx in a StaticRouter for prerendering.
export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  )
}
