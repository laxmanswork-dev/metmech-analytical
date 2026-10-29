import SectionHeading from '../components/common/SectionHeading.jsx'
import Section from '../components/layout/Section.jsx'
import { useLanguage } from '../hooks/useLanguage.js'
import styles from './WhatWeOffer.module.css'

// "What We Offer" block on the home page: the four capabilities as white cards,
// each a title over a short description.
export default function WhatWeOffer() {
  const { t, tm } = useLanguage()

  return (
    <Section labelledBy="capabilities-heading" spacing="compact">
      <SectionHeading id="capabilities-heading" title={t('home.capabilities.heading')} />
      <ul className={styles.list}>
        {tm('home.capabilities.items').map(({ title, text }) => (
          <li key={title} className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
