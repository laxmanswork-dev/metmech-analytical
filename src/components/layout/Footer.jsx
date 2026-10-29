import { EMAILS, OFFICIAL_NAME, PHONES } from '../../data/site.js'
import { SERVICE_CATEGORIES } from '../../data/services.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import { NAV_ITEMS, ROUTES, servicePath } from '../../routes/pages.js'
import LanguageSwitcher from '../navigation/LanguageSwitcher.jsx'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import Container from './Container.jsx'
import styles from './Footer.module.css'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const { t, tm } = useLanguage()

  return (
    <footer className={styles.footer}>
      <Container className={styles.columns}>
        <div>
          <p className={styles.name}>{OFFICIAL_NAME}</p>
          <p className={styles.descriptor}>{t('site.descriptor')}</p>
          <p className={styles.summary}>{t('site.summary')}</p>
        </div>

        <nav aria-label={t('a11y.footerNavigation')}>
          <h2 className={styles.heading}>{t('footer.navHeading')}</h2>
          <ul className={styles.list}>
            {NAV_ITEMS.map(({ key, path }) => (
              <li key={key}>
                <LocalizedLink to={path} className={styles.link}>
                  {t(`nav.${key}`)}
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services-heading">
          <h2 id="footer-services-heading" className={styles.heading}>
            {t('footer.servicesHeading')}
          </h2>
          <ul className={styles.list}>
            {SERVICE_CATEGORIES.map((slug) => (
              <li key={slug}>
                <LocalizedLink to={servicePath(slug)} className={styles.link}>
                  {t(`services.items.${slug}.title`)}
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>{t('footer.contactHeading')}</h2>
          <ul className={styles.list}>
            {PHONES.map(({ display, tel }) => (
              <li key={tel}>
                <a href={`tel:${tel}`} className={styles.link}>
                  {display}
                </a>
              </li>
            ))}
            {EMAILS.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className={styles.link}>
                  {email}
                </a>
              </li>
            ))}
          </ul>
          <address className={styles.address}>
            {tm('contact.info.addressLines').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>
      </Container>

      <Container className={styles.bottom}>
        {/* The static page carries the build year; the browser may be a year ahead. */}
        <p suppressHydrationWarning>{t('footer.copyright', { year: CURRENT_YEAR })}</p>
        <LocalizedLink to={ROUTES.privacy} className={styles.link}>
          {t('nav.privacy')}
        </LocalizedLink>
        <LanguageSwitcher group />
      </Container>
    </footer>
  )
}
