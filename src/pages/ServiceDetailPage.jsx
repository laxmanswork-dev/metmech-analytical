import { ArrowRight } from 'lucide-react'
import { useParams } from 'react-router'
import Button from '../components/common/Button.jsx'
import CheckList from '../components/common/CheckList.jsx'
import CtaBand from '../components/common/CtaBand.jsx'
import FaqList from '../components/common/FaqList.jsx'
import MediaFrame from '../components/common/MediaFrame.jsx'
import PageHero from '../components/common/PageHero.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import ServiceCard from '../components/common/ServiceCard.jsx'
import Grid from '../components/layout/Grid.jsx'
import Section from '../components/layout/Section.jsx'
import LocalizedLink from '../components/navigation/LocalizedLink.jsx'
import { getServiceImage } from '../data/images.js'
import { getService } from '../data/services.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ENQUIRY_PATH, instrumentPath, ROUTES, servicePath } from '../routes/pages.js'
import content from '../styles/content.module.css'
import NotFoundPage from './NotFoundPage.jsx'

// One template for every service. Structure comes from src/data/services.js
// and all wording from `services.items.<slug>` in the dictionaries.
export default function ServiceDetailPage() {
  const { slug } = useParams()
  const { t, tm } = useLanguage()
  const service = getService(slug)

  if (!service) return <NotFoundPage />

  const item = tm(`services.items.${slug}`)
  const labels = tm('services.labels')
  const { image, alt } = getServiceImage(service, t)

  return (
    <>
      <Seo
        title={item.metaTitle ?? item.title}
        description={item.summary}
        path={servicePath(slug)}
        image={image ?? undefined}
      />
      <PageHero
        title={item.title}
        lead={item.summary}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.services'), to: ROUTES.services },
          { label: item.title, to: servicePath(slug) },
        ]}
      />

      <Section>
        <div className={content.split}>
          <div className={content.stack}>
            <p className={content.lead}>{item.intro}</p>

            <div className={content.block}>
              <h2>{labels.evaluates}</h2>
              <CheckList items={item.evaluates} />
            </div>

            <div className={content.block}>
              <h2>{labels.why}</h2>
              <p>{item.why}</p>
            </div>

            <div className={content.block}>
              <h2>{labels.applications}</h2>
              <CheckList items={item.applications} />
            </div>

            <div className={content.block}>
              <h2>{labels.methods}</h2>
              <CheckList items={item.methods} />
              {item.methodsNote && <p className={content.note}>{item.methodsNote}</p>}
            </div>
          </div>

          <div className={content.aside}>
            <MediaFrame image={image} alt={alt} eager />

            {service.instruments.length > 0 && (
              <div className={content.block}>
                <h2>{labels.instruments}</h2>
                <ul className={content.linkList}>
                  {service.instruments.map((instrument) => (
                    <li key={instrument}>
                      <LocalizedLink to={instrumentPath(instrument)}>
                        {t(`equipment.items.${instrument}.name`)}
                        <ArrowRight aria-hidden="true" size={16} />
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={content.actions}>
              <Button to={ENQUIRY_PATH}>{labels.enquire}</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section narrow labelledBy="faq-heading">
        <SectionHeading id="faq-heading" title={labels.faq} />
        <FaqList items={item.faq} />
      </Section>

      <Section labelledBy="related-heading">
        <SectionHeading id="related-heading" title={labels.related} />
        <Grid min="lg">
          {service.related.map((related) => (
            <ServiceCard key={related} slug={related} />
          ))}
        </Grid>
      </Section>

      <CtaBand />
    </>
  )
}
