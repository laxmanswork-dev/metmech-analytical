import { Globe, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { LOGO_EMBLEM } from '../../data/brand.js'
import { OFFICIAL_NAME } from '../../data/site.js'
import { useHomeSection } from '../../hooks/useHomeSection.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import { ENQUIRY_PATH, HEADER_NAV, HOME_SECTIONS, ROUTES } from '../../routes/pages.js'
import { stripLanguage } from '../../utils/paths.js'
import Button from '../common/Button.jsx'
import LanguageSwitcher from '../navigation/LanguageSwitcher.jsx'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import NavDropdown from '../navigation/NavDropdown.jsx'
import Container from './Container.jsx'
import styles from './Header.module.css'

const MENU_ID = 'site-menu'

// Ids of the home-page sections the navigation links to, in page order.
const SECTION_IDS = Object.values(HOME_SECTIONS).map((path) => path.split('#')[1])

// The name is set on two lines, "METMECH ANALYTICAL" over "ENGINEERS", so it
// is split at the last word rather than left to wrap wherever it runs out of room.
const NAME_BREAK = OFFICIAL_NAME.lastIndexOf(' ')
const NAME_FIRST_LINE = OFFICIAL_NAME.slice(0, NAME_BREAK)
const NAME_SECOND_LINE = OFFICIAL_NAME.slice(NAME_BREAK + 1)

// One row, three groups:
//   left    logo, company name and descriptor
//   centre  Home · Our Services (a dropdown) · About Us · Contact
//           Home, About Us and Contact are all on the home page: About Us and
//           Contact scroll to their sections, and while the home page is
//           showing, the current item follows the section being read.
//   right   one outlined group: language selection and "Start a Test"
//
// On large screens all three sit on the bar. On smaller screens the centre
// group becomes a menu opened by a button, and on phones the right-hand group
// moves into that menu too.
//
// Phone and email are deliberately not here; they live in the footer and on
// the contact page.
export default function Header() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const isHome = stripLanguage(pathname) === ROUTES.home
  const section = useHomeSection(SECTION_IDS, isHome)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const closeMenu = () => setIsMenuOpen(false)

  // While the menu is open: focus starts on its first link (the menu comes
  // before its button in the page), and Escape closes it and returns focus to
  // the button.
  useEffect(() => {
    if (!isMenuOpen) return undefined
    menuRef.current?.querySelector('a')?.focus()

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  // Language selection and the request action, used on the bar and in the menu.
  const utility = (
    <>
      <div className={styles.language}>
        <Globe aria-hidden="true" className={styles.globe} />
        <LanguageSwitcher />
      </div>
      <div className={styles.request}>
        <Button to={ENQUIRY_PATH} shape="cylinder" onClick={closeMenu}>
          {t('actions.requestTest')}
        </Button>
      </div>
    </>
  )

  return (
    <header className={styles.header}>
      <Container className={styles.bar}>
        <LocalizedLink to={ROUTES.home} className={styles.brand} onClick={closeMenu}>
          <img
            className={styles.logo}
            src={LOGO_EMBLEM.src}
            width={LOGO_EMBLEM.width}
            height={LOGO_EMBLEM.height}
            alt=""
            decoding="async"
          />
          <span className={styles.wordmark}>
            <span className={styles.brandName}>
              <span className={styles.brandLine}>{NAME_FIRST_LINE}</span>{' '}
              <span className={styles.brandLine}>{NAME_SECOND_LINE}</span>
            </span>
            <span className={styles.brandTag}>{t('site.descriptor')}</span>
          </span>
        </LocalizedLink>

        <div
          ref={menuRef}
          id={MENU_ID}
          className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}
        >
          <nav id="primary-navigation" aria-label={t('a11y.mainNavigation')}>
            <ul className={styles.navList}>
              {HEADER_NAV.map(({ key, path, children }) => (
                <li key={key}>
                  {children ? (
                    <NavDropdown
                      label={t(`nav.${key}`)}
                      items={children}
                      buttonClassName={styles.navLink}
                      onNavigate={closeMenu}
                    />
                  ) : (
                    <NavItem
                      path={path}
                      label={t(`nav.${key}`)}
                      isCurrent={isHome && (path.split('#')[1] ?? null) === section}
                      onClick={closeMenu}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Shown in the menu at the widths where the bar cannot hold it. */}
          <div className={`${styles.utility} ${styles.menuUtility}`}>{utility}</div>
        </div>

        <div className={styles.actions}>
          <div className={`${styles.utility} ${styles.barUtility}`}>{utility}</div>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-controls={MENU_ID}
            aria-label={t(isMenuOpen ? 'a11y.closeMenu' : 'a11y.openMenu')}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </Container>
    </header>
  )
}

// A link to the home page or one of its sections. The current one is marked
// for assistive technology as well as styled.
function NavItem({ path, label, isCurrent, onClick }) {
  const isSection = path.includes('#')
  let current
  if (isCurrent) current = isSection ? 'location' : 'page'

  return (
    <LocalizedLink
      to={path}
      className={styles.navLink}
      aria-current={current}
      data-current={isCurrent ? '' : undefined}
      onClick={onClick}
    >
      {label}
    </LocalizedLink>
  )
}
