import CtaBand from '../components/common/CtaBand.jsx'
import FeatureCard from '../components/common/FeatureCard.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ProcessSteps from '../components/common/ProcessSteps.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import Grid from '../components/layout/Grid.jsx'
import Section from '../components/layout/Section.jsx'
import { HERO_IMAGE } from '../data/images.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'
import WhyChoose from '../sections/WhyChoose.jsx'
import content from '../styles/content.module.css'

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
        image={HERO_IMAGE}
        imageAlt={t('about.hero.imageAlt')}
      />

      <Section narrow labelledBy="intro-heading">
        <SectionHeading id="intro-heading" title={t('about.intro.heading')} />
        <div className={content.block}>
          {tm('about.intro.paragraphs').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section tone="muted" labelledBy="vision-heading">
        <h2 id="vision-heading" className="visually-hidden">
          {t('about.vision.heading')} / {t('about.mission.heading')}
        </h2>
        <Grid min="lg">
          <FeatureCard title={t('about.vision.heading')} text={t('about.vision.text')} />
          <FeatureCard title={t('about.mission.heading')} text={t('about.mission.text')} />
        </Grid>
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
