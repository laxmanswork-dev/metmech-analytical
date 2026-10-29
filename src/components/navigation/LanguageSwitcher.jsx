import { Link, useLocation } from 'react-router'
import { useLanguage } from '../../hooks/useLanguage.js'
import { LANGUAGES } from '../../i18n/config.js'
import { localizePath, stripLanguage } from '../../utils/paths.js'
import { storeLanguage } from '../../utils/storage.js'
import styles from './LanguageSwitcher.module.css'

// Real links to the same page in each language, so the switcher works for
// crawlers and without JavaScript once pages are prerendered.
//
// The header's copy is the language navigation landmark. Pass `group` for a
// second copy (the footer's): it is then a labelled group, so assistive
// technology does not list two identical "Language" navigation regions.
export default function LanguageSwitcher({ group = false }) {
  const { language, t } = useLanguage()
  const { pathname, search, hash } = useLocation()
  const page = stripLanguage(pathname)
  const Wrapper = group ? 'div' : 'nav'
  const wrapperProps = group
    ? { role: 'group', 'aria-label': t('a11y.languageSwitcher') }
    : { 'aria-label': t('a11y.languageSwitcher') }

  return (
    <Wrapper {...wrapperProps}>
      <ul className={styles.list}>
        {LANGUAGES.map(({ code, label }) => (
          <li key={code}>
            <Link
              to={localizePath(page, code) + search + hash}
              className={styles.link}
              lang={code}
              hrefLang={code}
              aria-current={code === language ? 'true' : undefined}
              onClick={() => storeLanguage(code)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}
