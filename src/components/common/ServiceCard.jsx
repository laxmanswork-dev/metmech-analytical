import { ArrowRight } from 'lucide-react'
import { getServiceImage } from '../../data/images.js'
import { getService } from '../../data/services.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import { servicePath } from '../../routes/pages.js'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './Card.module.css'
import MediaFrame from './MediaFrame.jsx'

// Card linking to a service detail page. The whole card is clickable through
// its title link; "View Details" is a visual cue, not a second link.
export default function ServiceCard({ slug }) {
  const { t } = useLanguage()
  const { image, alt } = getServiceImage(getService(slug), t)

  return (
    <article className={`${styles.card} ${styles.linked}`}>
      <div className={styles.media}>
        <MediaFrame image={image} alt={alt} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <LocalizedLink to={servicePath(slug)} className={styles.titleLink}>
            {t(`services.items.${slug}.title`)}
          </LocalizedLink>
        </h3>
        <p className={styles.text}>{t(`services.items.${slug}.summary`)}</p>
        <span className={styles.more} aria-hidden="true">
          {t('actions.viewDetails')}
          <ArrowRight size={16} />
        </span>
      </div>
    </article>
  )
}
