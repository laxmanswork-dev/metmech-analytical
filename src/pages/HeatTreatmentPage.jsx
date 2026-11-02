import { ArrowRight } from 'lucide-react'
import Button from '../components/common/Button.jsx'
import CtaBand from '../components/common/CtaBand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import Section from '../components/layout/Section.jsx'
import LocalizedLink from '../components/navigation/LocalizedLink.jsx'
import { HEAT_TREATMENT_SERVICES, HEAT_TREATMENTS } from '../data/heatTreatment.js'
import { SPECIMENS } from '../data/specimens.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ENQUIRY_PATH, ROUTES, servicePath } from '../routes/pages.js'
import content from '../styles/content.module.css'
import styles from './CastingPage.module.css'
import own from './HeatTreatmentPage.module.css'

const ENQUIRY_STATE = {
  enquiryAbout: { kind: 'heatTreatment' },
  requirement: ['heat-treatment'],
  from: ROUTES.heatTreatment,
}

// Heat Treatment. Structure comes from src/data/heatTreatment.js and all
// wording from `heatTreatment` in the dictionaries. It shares the casting
// page's styles, as the two pages are siblings in "Our Services".
export default function HeatTreatmentPage() {
  const { t, tm } = useLanguage()
  const intro = tm('heatTreatment.intro')
  const specimens = tm('heatTreatment.specimens')
  const checks = tm('heatTreatment.checks')

  return (
    <>
      <Seo
        title={t('heatTreatment.meta.title')}
        description={t('heatTreatment.meta.description')}
        path={ROUTES.heatTreatment}
      />
      <PageHero
        title={t('heatTreatment.hero.title')}
        lead={t('heatTreatment.hero.lead')}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.heatTreatment'), to: ROUTES.heatTreatment },
        ]}
        action={
          <Button to={ENQUIRY_PATH} state={ENQUIRY_STATE} variant="inverse" shape="cylinder">
            {t('heatTreatment.enquire')}
          </Button>
        }
      />

      <Section labelledBy="heat-intro-heading">
        <div className={content.block}>
          <h2 id="heat-intro-heading">{intro.heading}</h2>
          <p className={content.lead}>{intro.lead}</p>
          <p className={content.note}>{intro.note}</p>
        </div>
      </Section>

      <Section labelledBy="heat-specimens-heading">
        <SectionHeading id="heat-specimens-heading" title={specimens.heading} lead={specimens.lead} />
        <div className={styles.pairGrid}>
          {HEAT_TREATMENTS.map(({ slug, specimen }) => (
            <Treatment key={slug} slug={slug} specimen={specimen} />
          ))}
        </div>
        <LocalizedLink to={ROUTES.research} className={`${styles.figuresLink} ${own.specimensLink}`}>
          {specimens.link}
          <ArrowRight aria-hidden="true" size={16} />
        </LocalizedLink>
      </Section>

      <Section labelledBy="heat-checks-heading">
        <SectionHeading id="heat-checks-heading" title={checks.heading} lead={checks.lead} />
        <ul className={content.linkList}>
          {HEAT_TREATMENT_SERVICES.map((service) => (
            <li key={service}>
              <LocalizedLink to={servicePath(service)}>
                {t(`services.items.${service}.title`)}: {checks.services[service]}
                <ArrowRight aria-hidden="true" size={16} />
              </LocalizedLink>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        heading={t('heatTreatment.help.heading')}
        text={t('heatTreatment.help.text')}
        actionLabel={t('heatTreatment.enquire')}
        state={ENQUIRY_STATE}
      />
    </>
  )
}

// One treatment: its name, what it does, and the micrograph of the specimen
// from the client's sets that shows it.
function Treatment({ slug, specimen }) {
  const { t, tm } = useLanguage()
  const { title, text } = tm(`heatTreatment.treatments.${slug}`)
  const {
    magnification,
    pictures: [picture],
  } = SPECIMENS.find((item) => item.slug === specimen)
  const name = t(`research.specimens.${specimen}.name`)

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      <figure className={`${styles.figure} ${own.figure}`}>
        <img
          src={picture.src}
          srcSet={`${picture.srcSmall} 400w, ${picture.src} 640w`}
          sizes="(min-width: 64rem) 34rem, 100vw"
          width={picture.width}
          height={picture.height}
          alt={t('research.labels.alt', { name, magnification })}
          loading="lazy"
          decoding="async"
        />
        <figcaption className={styles.figureCaption}>
          <span className={styles.figureName}>{name}</span>
          {magnification} · {t(`research.specimens.${specimen}.etchant`)}
        </figcaption>
      </figure>
    </article>
  )
}
