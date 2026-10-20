import { useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useLanguage } from '../../hooks/useLanguage.js'
import { useRouteChangeReset } from '../../hooks/useRouteChangeReset.js'
import ErrorBoundary from '../common/ErrorBoundary.jsx'
import ErrorFallback from '../common/ErrorFallback.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import styles from './SiteLayout.module.css'

const MAIN_ID = 'main-content'

export default function SiteLayout() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  useRouteChangeReset(mainRef)

  return (
    <>
      <a className={styles.skipLink} href={`#${MAIN_ID}`}>
        {t('a11y.skipToContent')}
      </a>
      <Header />
      <main id={MAIN_ID} ref={mainRef} tabIndex={-1} className={styles.main}>
        {/* Keyed by path so a page error is cleared when the visitor navigates away. */}
        <ErrorBoundary key={pathname} fallback={<ErrorFallback />}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
