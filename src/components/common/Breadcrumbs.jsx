import { ChevronRight } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage.js'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './Breadcrumbs.module.css'

// `items` is [{ label, to }] from the home page down to the current page.
// The last item is the current page and is not a link.
export default function Breadcrumbs({ items }) {
  const { t } = useLanguage()

  return (
    <nav aria-label={t('a11y.breadcrumb')}>
      <ol className={styles.list}>
        {items.map(({ label, to }, index) => {
          const isCurrent = index === items.length - 1
          return (
            <li key={to} className={styles.item}>
              {index > 0 && <ChevronRight aria-hidden="true" size={14} />}
              {isCurrent ? (
                <span aria-current="page">{label}</span>
              ) : (
                <LocalizedLink to={to} className={styles.link}>
                  {label}
                </LocalizedLink>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
