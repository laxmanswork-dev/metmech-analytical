import CtaBand from '../components/common/CtaBand.jsx'
import OwnerProfile from '../components/common/OwnerProfile.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ProcessSteps from '../components/common/ProcessSteps.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import Section from '../components/layout/Section.jsx'
import { ABOUT_IMAGE } from '../data/images.js'
import { OWNER } from '../data/owner.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'
import WhyChoose from '../sections/WhyChoose.jsx'
import content from '../styles/content.module.css'
import styles from './AboutPage.module.css'

export default function AboutPage() {
  const { t, tm } = useLanguage()

  return (
    <>
      <Seo
        title={t('about.meta.title')}
        description={t('about.meta.description')}
        path={ROUTES.about}
      />
      <PageHero
        title={t('about.hero.title')}
        lead={t('about.hero.lead')}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.about'), to: ROUTES.about },
        ]}
        image={ABOUT_IMAGE}
        imageAlt={t('about.hero.imageAlt')}
      />

      <Section labelledBy="intro-heading">
        <div className={styles.intro}>
          <div>
            <SectionHeading id="intro-heading" title={t('about.intro.heading')} />
            <div className={content.block}>
              {tm('about.intro.paragraphs').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <OwnerProfile person={OWNER} />
        </div>
      </Section>

      <Section tone="muted" spacing="compact" labelledBy="vision-heading">
        <h2 id="vision-heading" className="visually-hidden">
          {t('about.vision.heading')} / {t('about.mission.heading')}
        </h2>
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

      <WhyChoose />

      <Section tone="tint" labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          title={t('about.approach.heading')}
          lead={t('about.approach.lead')}
        />
        <ProcessSteps steps={tm('about.approach.steps')} />
      </Section>

      <CtaBand />
    </>
  )
}
