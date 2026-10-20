import { ArrowRight } from 'lucide-react'
import { INSTRUMENT_IMAGES } from '../../data/images.js'
import { getInstrument } from '../../data/instruments.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import { instrumentPath } from '../../routes/pages.js'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './Card.module.css'
import MediaFrame from './MediaFrame.jsx'

// Card linking to an instrument detail page.
export default function InstrumentCard({ slug }) {
  const { t } = useLanguage()
  const { category } = getInstrument(slug)
  const item = `equipment.items.${slug}`

  return (
    <article className={`${styles.card} ${styles.linked}`}>
      <div className={styles.media}>
        <MediaFrame image={INSTRUMENT_IMAGES[slug]} alt={t(`${item}.imageAlt`)} />
      </div>
      <div className={styles.body}>
        <p className={styles.eyebrow}>{t(`equipment.categories.${category}`)}</p>
        <h3 className={styles.title}>
          <LocalizedLink to={instrumentPath(slug)} className={styles.titleLink}>
            {t(`${item}.name`)}
          </LocalizedLink>
        </h3>
        <p className={styles.text}>{t(`${item}.purpose`)}</p>
        <span className={styles.more} aria-hidden="true">
          {t('actions.viewSpecifications')}
          <ArrowRight size={16} />
        </span>
      </div>
    </article>
  )
}
