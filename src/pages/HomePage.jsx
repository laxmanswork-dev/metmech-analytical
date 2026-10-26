import { ArrowRight } from 'lucide-react'
import cardStyles from '../components/common/Card.module.css'
import CtaBand from '../components/common/CtaBand.jsx'
import InstrumentCard from '../components/common/InstrumentCard.jsx'
import JsonLd from '../components/common/JsonLd.jsx'
import ProcessSteps from '../components/common/ProcessSteps.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import ServiceCard from '../components/common/ServiceCard.jsx'
import Grid from '../components/layout/Grid.jsx'
import Section from '../components/layout/Section.jsx'
import LocalizedLink from '../components/navigation/LocalizedLink.jsx'
import { INDUSTRIES } from '../data/industries.js'
import { FEATURED_INSTRUMENTS } from '../data/instruments.js'
import { HOME_SERVICES } from '../data/services.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'
import HomeHero from '../sections/HomeHero.jsx'
import WhatWeOffer from '../sections/WhatWeOffer.jsx'
import WhyChoose from '../sections/WhyChoose.jsx'
import content from '../styles/content.module.css'
import { organizationSchema } from '../utils/structuredData.js'

export default function HomePage() {
  const { t, tm } = useLanguage()

  return (
    <>
      <Seo description={t('home.meta.description')} path={ROUTES.home} />
      <JsonLd data={organizationSchema()} />

      <HomeHero />

      <WhatWeOffer />

      <Section tone="muted" labelledBy="testing-heading">
        <SectionHeading
          id="testing-heading"
          title={t('home.testing.heading')}
          lead={t('home.testing.lead')}
        />
        <Grid min="lg">
          {HOME_SERVICES.map((slug) => (
            <ServiceCard key={slug} slug={slug} />
          ))}
        </Grid>
        <LocalizedLink to={ROUTES.services} className={content.moreLink}>
          {t('actions.viewAllServices')}
          <ArrowRight aria-hidden="true" size={18} />
        </LocalizedLink>
      </Section>

      <Section labelledBy="instruments-heading">
        <SectionHeading
          id="instruments-heading"
          title={t('home.instruments.heading')}
          lead={t('home.instruments.lead')}
        />
        <Grid min="lg">
          {FEATURED_INSTRUMENTS.map((slug) => (
            <InstrumentCard key={slug} slug={slug} />
          ))}
        </Grid>
        <LocalizedLink to={ROUTES.equipment} className={content.moreLink}>
          {t('actions.viewAllInstruments')}
          <ArrowRight aria-hidden="true" size={18} />
        </LocalizedLink>
      </Section>

      <Section tone="muted" labelledBy="industries-heading">
        <SectionHeading
          id="industries-heading"
          title={t('home.industries.heading')}
          lead={t('home.industries.lead')}
        />
        <Grid min="lg">
          {INDUSTRIES.map(({ key }) => (
            <article key={key} className={`${cardStyles.card} ${cardStyles.linked}`}>
              <div className={cardStyles.body}>
                <h3 className={cardStyles.title}>
                  <LocalizedLink
                    to={`${ROUTES.industries}#${key}`}
                    className={cardStyles.titleLink}
                  >
                    {t(`industries.items.${key}.title`)}
                  </LocalizedLink>
                </h3>
                <p className={cardStyles.text}>{t(`industries.items.${key}.summary`)}</p>
                <span className={cardStyles.more} aria-hidden="true">
                  {t('actions.viewDetails')}
                  <ArrowRight size={16} />
                </span>
              </div>
            </article>
          ))}
        </Grid>
        <LocalizedLink to={ROUTES.industries} className={content.moreLink}>
          {t('actions.viewAllIndustries')}
          <ArrowRight aria-hidden="true" size={18} />
        </LocalizedLink>
      </Section>

      <WhyChoose />

      <Section tone="tint" labelledBy="process-heading">
        <SectionHeading
          id="process-heading"
          title={t('home.process.heading')}
          lead={t('home.process.lead')}
        />
        <ProcessSteps steps={tm('home.process.steps')} />
      </Section>

      <CtaBand />
    </>
  )
}
