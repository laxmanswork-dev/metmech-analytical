import { ArrowRight } from 'lucide-react'
import { useParams } from 'react-router'
import Button from '../components/common/Button.jsx'
import CheckList from '../components/common/CheckList.jsx'
import CtaBand from '../components/common/CtaBand.jsx'
import MediaFrame from '../components/common/MediaFrame.jsx'
import Numeral from '../components/common/Numeral.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Seo from '../components/common/Seo.jsx'
import SpecTable from '../components/common/SpecTable.jsx'
import Section from '../components/layout/Section.jsx'
import LocalizedLink from '../components/navigation/LocalizedLink.jsx'
import { INSTRUMENT_IMAGES } from '../data/images.js'
import { getInstrument } from '../data/instruments.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ENQUIRY_PATH, instrumentPath, ROUTES, servicePath } from '../routes/pages.js'
import content from '../styles/content.module.css'
import NotFoundPage from './NotFoundPage.jsx'

// One template for every instrument. Specifications come from
// src/data/instruments.js; nothing is shown that the client has not supplied.
export default function InstrumentDetailPage() {
  const { slug } = useParams()
  const { t, tm } = useLanguage()
  const instrument = getInstrument(slug)

  if (!instrument) return <NotFoundPage />

  const item = tm(`equipment.items.${slug}`)
  const labels = tm('equipment.labels')
  const image = INSTRUMENT_IMAGES[slug]

  return (
    <>
      <Seo
        title={item.name}
        description={`${item.purpose} ${item.short}.`}
        path={instrumentPath(slug)}
        image={image}
      />
      <PageHero
        title={item.name}
        lead={item.purpose}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.equipment'), to: ROUTES.equipment },
          { label: item.name, to: instrumentPath(slug) },
        ]}
      />

      <Section>
        <div className={content.split}>
          <div className={content.stack}>
            <div className={content.block}>
              <h2>
                <Numeral value={1} />
                {labels.overview}
              </h2>
              <p>{item.overview}</p>
            </div>

            <div className={content.block}>
              <h2>
                <Numeral value={2} />
                {labels.applications}
              </h2>
              <CheckList items={item.applications} />
            </div>

            <div className={content.block}>
              <h2>
                <Numeral value={3} />
                {labels.specifications}
              </h2>
              {instrument.specs.length > 0 ? (
                <>
                  <SpecTable specs={instrument.specs} />
                  <p className={content.note}>{labels.specsSource}</p>
                </>
              ) : (
                <p className={content.note}>{labels.specsPending}</p>
              )}
            </div>
          </div>

          <aside className={content.aside}>
            <MediaFrame image={image} alt={item.imageAlt} eager />

            <div className={content.block}>
              <h2>{labels.category}</h2>
              <p>{t(`equipment.categories.${instrument.category}`)}</p>
            </div>

            <div className={content.block}>
              <h2>{labels.relatedServices}</h2>
              <ul className={content.linkList}>
                {instrument.services.map((service) => (
                  <li key={service}>
                    <LocalizedLink to={servicePath(service)}>
                      {t(`services.items.${service}.title`)}
                      <ArrowRight aria-hidden="true" size={16} />
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={content.actions}>
              <Button to={ENQUIRY_PATH}>{labels.enquire}</Button>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
