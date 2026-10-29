import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage.js'
import { ROUTES } from '../../routes/pages.js'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './Card.module.css'
import own from './IndustryCard.module.css'

// Card linking to an industry's section on the Industries page. The whole card
// is clickable through its title link; "View Details" is a visual cue, not a
// second link.
export default function IndustryCard({ industry }) {
  const { t } = useLanguage()

  return (
    <article className={`${styles.card} ${styles.linked} ${own.card}`}>
      <div className={`${styles.body} ${own.body}`}>
        <h3 className={styles.title}>
          <LocalizedLink to={`${ROUTES.industries}#${industry}`} className={styles.titleLink}>
            {t(`industries.items.${industry}.title`)}
          </LocalizedLink>
        </h3>
        <p className={styles.text}>{t(`industries.items.${industry}.summary`)}</p>
        <span className={`${styles.more} ${own.more}`} aria-hidden="true">
          {t('actions.viewDetails')}
          <ArrowRight size={15} />
        </span>
      </div>
    </article>
  )
}
