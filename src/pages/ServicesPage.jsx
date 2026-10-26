import CtaBand from '../components/common/CtaBand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import ServiceCard from '../components/common/ServiceCard.jsx'
import Grid from '../components/layout/Grid.jsx'
import Section from '../components/layout/Section.jsx'
import { PAGE_BACKGROUNDS, SECTION_BACKGROUNDS } from '../data/backgrounds.js'
import { FOCUS_SERVICE, SERVICE_CATEGORIES } from '../data/services.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'

export default function ServicesPage() {
  const { t } = useLanguage()

  return (
    <>
      <Seo
        title={t('services.meta.title')}
        description={t('services.meta.description')}
        path={ROUTES.services}
      />
      <PageHero
        background={PAGE_BACKGROUNDS.services}
        title={t('services.hero.title')}
        lead={t('services.hero.lead')}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.services'), to: ROUTES.services },
        ]}
      />

      <Section background={SECTION_BACKGROUNDS.servicesCategories} labelledBy="categories-heading">
        <SectionHeading
          id="categories-heading"
          title={t('services.overview.heading')}
          lead={t('services.overview.lead')}
        />
        <Grid min="lg">
          {SERVICE_CATEGORIES.map((slug) => (
            <ServiceCard key={slug} slug={slug} />
          ))}
        </Grid>
      </Section>

      <Section background={SECTION_BACKGROUNDS.servicesFocus} labelledBy="focus-heading">
        <SectionHeading
          id="focus-heading"
          title={t('services.focus.heading')}
          lead={t('services.focus.text')}
        />
        <Grid min="lg">
          <ServiceCard slug={FOCUS_SERVICE} />
        </Grid>
      </Section>

      <CtaBand heading={t('services.help.heading')} text={t('services.help.text')} />
    </>
  )
}
