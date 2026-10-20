import { ArrowRight } from 'lucide-react'
import CheckList from '../components/common/CheckList.jsx'
import CtaBand from '../components/common/CtaBand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Seo from '../components/common/Seo.jsx'
import Section from '../components/layout/Section.jsx'
import LocalizedLink from '../components/navigation/LocalizedLink.jsx'
import { INDUSTRIES } from '../data/industries.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES, servicePath } from '../routes/pages.js'
import content from '../styles/content.module.css'
import styles from './IndustriesPage.module.css'

export default function IndustriesPage() {
  const { t, tm } = useLanguage()
  const labels = tm('industries.labels')

  return (
    <>
      <Seo
        title={t('industries.meta.title')}
        description={t('industries.meta.description')}
        path={ROUTES.industries}
      />
      <PageHero
        title={t('industries.hero.title')}
        lead={t('industries.hero.lead')}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.industries'), to: ROUTES.industries },
        ]}
      />

      {INDUSTRIES.map(({ key, services }, index) => {
        const item = tm(`industries.items.${key}`)
        const headingId = `${key}-heading`

        return (
          // Each section's id is the target of the industry links on the home page.
          <Section
            key={key}
            id={key}
            tone={index % 2 === 0 ? 'default' : 'muted'}
            labelledBy={headingId}
          >
            <div className={styles.header}>
              <h2 id={headingId}>{item.title}</h2>
              <p className={styles.summary}>{item.summary}</p>
            </div>

            <div className={styles.columns}>
              <div className={content.block}>
                <h3>{labels.challenge}</h3>
                <p>{item.challenge}</p>
                <h3>{labels.support}</h3>
                <p>{item.support}</p>
              </div>

              <div className={content.block}>
                <h3>{labels.questions}</h3>
                <CheckList items={item.questions} />
              </div>

              <div className={content.block}>
                <h3>{labels.services}</h3>
                <ul className={content.linkList}>
                  {services.map((service) => (
                    <li key={service}>
                      <LocalizedLink to={servicePath(service)}>
                        {t(`services.items.${service}.title`)}
                        <ArrowRight aria-hidden="true" size={16} />
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        )
      })}

      <CtaBand />
    </>
  )
}
