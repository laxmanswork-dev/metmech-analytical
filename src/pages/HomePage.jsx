import { ArrowRight } from 'lucide-react'
import Button from '../components/common/Button.jsx'
import IndustryCard from '../components/common/IndustryCard.jsx'
import InstrumentCard from '../components/common/InstrumentCard.jsx'
import JsonLd from '../components/common/JsonLd.jsx'
import ProcessSteps from '../components/common/ProcessSteps.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import ServiceCard from '../components/common/ServiceCard.jsx'
import Grid from '../components/layout/Grid.jsx'
import Section from '../components/layout/Section.jsx'
import { INDUSTRIES } from '../data/industries.js'
import { FEATURED_INSTRUMENTS } from '../data/instruments.js'
import { HOME_SERVICES } from '../data/services.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'
import AboutSection from '../sections/AboutSection.jsx'
import ContactSection from '../sections/ContactSection.jsx'
import HomeHero from '../sections/HomeHero.jsx'
import HomeIntro from '../sections/HomeIntro.jsx'
import WhatWeOffer from '../sections/WhatWeOffer.jsx'
import WhyChoose from '../sections/WhyChoose.jsx'
import { organizationSchema } from '../utils/structuredData.js'

export default function HomePage() {
  const { t, tm } = useLanguage()

  return (
    <>
      <Seo description={t('home.meta.description')} path={ROUTES.home} />
      <JsonLd data={organizationSchema()} />

      <HomeIntro />

      <HomeHero />

      <WhatWeOffer />

      <Section labelledBy="testing-heading">
        <SectionHeading
          id="testing-heading"
          title={t('home.testing.heading')}
          lead={t('home.testing.lead')}
          action={
            <Button to={ROUTES.services}>
              {t('actions.viewAllServices')}
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
          }
        />
        <Grid min="lg">
          {HOME_SERVICES.map((slug) => (
            <ServiceCard key={slug} slug={slug} />
          ))}
        </Grid>
      </Section>

      <Section labelledBy="instruments-heading">
        <SectionHeading
          id="instruments-heading"
          title={t('home.instruments.heading')}
          lead={t('home.instruments.lead')}
          action={
            <Button to={ROUTES.equipment}>
              {t('actions.viewAllInstruments')}
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
          }
        />
        <Grid min="lg">
          {FEATURED_INSTRUMENTS.map((slug) => (
            <InstrumentCard key={slug} slug={slug} />
          ))}
        </Grid>
      </Section>

      <Section labelledBy="industries-heading">
        <SectionHeading
          id="industries-heading"
          title={t('home.industries.heading')}
          lead={t('home.industries.lead')}
          action={
            <Button to={ROUTES.industries}>
              {t('actions.viewAllIndustries')}
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
          }
        />
        <Grid min="lg">
          {INDUSTRIES.map(({ key }) => (
            <IndustryCard key={key} industry={key} />
          ))}
        </Grid>
      </Section>

      <WhyChoose />

      <AboutSection />

      <Section labelledBy="process-heading">
        <SectionHeading
          id="process-heading"
          title={t('home.process.heading')}
          lead={t('home.process.lead')}
        />
        <ProcessSteps steps={tm('home.process.steps')} />
      </Section>

      <ContactSection />
    </>
  )
}
