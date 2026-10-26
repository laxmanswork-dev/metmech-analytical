import Numeral from '../components/common/Numeral.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Section from '../components/layout/Section.jsx'
import { useLanguage } from '../hooks/useLanguage.js'
import styles from './WhatWeOffer.module.css'

// "What We Offer" block on the home page: the four capabilities as white cards,
// each a title over short points numbered I, II, III, on a navy-veiled
// photograph of the lab (see WhatWeOffer.module.css). The points are an
// ordered list, so their order is conveyed without the visible numerals,
// which are hidden from assistive technology.
export default function WhatWeOffer() {
  const { t, tm } = useLanguage()

  return (
    <Section labelledBy="capabilities-heading" className={styles.section}>
      <SectionHeading id="capabilities-heading" title={t('home.capabilities.heading')} />
      <ul className={styles.list}>
        {tm('home.capabilities.items').map(({ title, points }) => (
          <li key={title} className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <ol className={styles.points}>
              {points.map((point, index) => (
                <li key={point} className={styles.point}>
                  <Numeral value={index + 1} className={styles.numeral} />
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </Section>
  )
}
