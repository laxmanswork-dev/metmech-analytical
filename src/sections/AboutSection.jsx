import OwnerProfile from '../components/common/OwnerProfile.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Section from '../components/layout/Section.jsx'
import { OWNER } from '../data/owner.js'
import { useLanguage } from '../hooks/useLanguage.js'
import content from '../styles/content.module.css'
import styles from './AboutSection.module.css'

// "About Us" on the home page, the target of the About Us links (#about): who
// the firm is, its leadership, expertise and purpose, with the owner's
// portrait, then its vision and mission.
export default function AboutSection({ tone }) {
  const { t, tm } = useLanguage()

  return (
    <Section id="about" tone={tone} labelledBy="about-heading">
      <div className={styles.intro}>
        <div>
          <SectionHeading id="about-heading" title={t('about.hero.title')} />
          <div className={styles.copy}>
            {tm('about.intro.paragraphs').map((paragraph) => (
              <p key={paragraph} className={content.lead}>
                {paragraph}
              </p>
            ))}
            {tm('about.intro.sections').map(({ heading, text }) => (
              <div key={heading} className={styles.topic}>
                <h3>{heading}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <OwnerProfile person={OWNER} />
      </div>

      <div className={styles.purpose}>
        <div className={styles.statement}>
          <h3>{t('about.vision.heading')}</h3>
          <p>{t('about.vision.text')}</p>
        </div>
        <div className={styles.statement}>
          <h3>{t('about.mission.heading')}</h3>
          <p>{t('about.mission.text')}</p>
        </div>
      </div>
    </Section>
  )
}
