import { ArrowRight } from 'lucide-react'
import Button from '../components/common/Button.jsx'
import CheckList from '../components/common/CheckList.jsx'
import CtaBand from '../components/common/CtaBand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ProcessSteps from '../components/common/ProcessSteps.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import Section from '../components/layout/Section.jsx'
import LocalizedLink from '../components/navigation/LocalizedLink.jsx'
import { CASTING_CATEGORIES, CASTING_MICROGRAPHS, categoryNumber } from '../data/casting.js'
import { CASTING_HERO_IMAGE } from '../data/images.js'
import { SPECIMENS } from '../data/specimens.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ENQUIRY_PATH, ROUTES, servicePath } from '../routes/pages.js'
import content from '../styles/content.module.css'
import styles from './CastingPage.module.css'

// The enquiry form's link state for casting work in general, or for one
// category: the form then names the category and has its option selected.
const enquiryState = (slug) =>
  slug
    ? { enquiryAbout: { kind: 'casting', slug }, requirement: [slug], from: ROUTES.casting }
    : { enquiryAbout: { kind: 'casting' }, from: ROUTES.casting }

const categoriesIn = (group) => CASTING_CATEGORIES.filter((category) => category.group === group)

// Casting & Material Development. Structure comes from src/data/casting.js and
// all wording from `casting` in the dictionaries.
export default function CastingPage() {
  const { t, tm } = useLanguage()
  const intro = tm('casting.intro')
  const sections = tm('casting.sections')

  return (
    <>
      <Seo title={t('casting.meta.title')} description={t('casting.meta.description')} path={ROUTES.casting} />
      <PageHero
        title={t('casting.hero.title')}
        lead={t('casting.hero.lead')}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.casting'), to: ROUTES.casting },
        ]}
        // The hero photograph: see CASTING_HERO_IMAGE in src/data/images.js.
        image={CASTING_HERO_IMAGE}
        imageAlt={t('casting.hero.imageAlt')}
        imageSlot
        action={
          <Button to={ENQUIRY_PATH} state={enquiryState()} variant="inverse" shape="cylinder">
            {t('casting.enquire')}
          </Button>
        }
      />

      <Section labelledBy="casting-intro-heading">
        <div className={content.split}>
          <div className={content.stack}>
            <div className={content.block}>
              <h2 id="casting-intro-heading">{intro.heading}</h2>
              <p className={content.lead}>{intro.lead}</p>
              <p>{intro.text}</p>
              <p className={content.note}>{intro.note}</p>
            </div>
            <CategoryIndex />
          </div>
          <Micrographs />
        </div>
      </Section>

      <Section labelledBy="alloy-heading">
        <SectionHeading id="alloy-heading" title={sections.alloy.heading} lead={sections.alloy.lead} />
        <div className={styles.alloyGrid}>
          {categoriesIn('alloy').map(({ slug }) => (
            <CategoryCard key={slug} slug={slug} />
          ))}
        </div>
      </Section>

      <Section labelledBy="specialist-heading">
        <SectionHeading
          id="specialist-heading"
          title={sections.specialist.heading}
          lead={sections.specialist.lead}
        />
        <div className={styles.pairGrid}>
          {categoriesIn('specialist').map(({ slug }) => (
            <CategoryCard key={slug} slug={slug} featured>
              {slug === 'stir-casting' && <Comparison />}
            </CategoryCard>
          ))}
        </div>
      </Section>

      <Section labelledBy="development-heading">
        <SectionHeading
          id="development-heading"
          title={sections.development.heading}
          lead={sections.development.lead}
        />
        <div className={styles.pairGrid}>
          {categoriesIn('development').map(({ slug, services }) => (
            <CategoryCard key={slug} slug={slug} services={services} />
          ))}
        </div>
      </Section>

      <Section labelledBy="casting-process-heading">
        <SectionHeading
          id="casting-process-heading"
          title={sections.process.heading}
          lead={sections.process.lead}
        />
        <ProcessSteps steps={tm('casting.process')} />
        <p className={`${content.note} ${styles.processNote}`}>{sections.process.note}</p>
      </Section>

      <Section labelledBy="casting-applications-heading">
        <div className={styles.applications}>
          <div className={styles.applicationsHeader}>
            <h2 id="casting-applications-heading">{sections.applications.heading}</h2>
            <p className={styles.applicationsLead}>{sections.applications.lead}</p>
          </div>
          <ul className={styles.applicationList}>
            {tm('casting.applications').map(({ title, text }) => (
              <li key={title} className={styles.application}>
                <h3 className={styles.applicationTitle}>{title}</h3>
                <p className={styles.applicationText}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        heading={t('casting.help.heading')}
        text={t('casting.help.text')}
        actionLabel={t('casting.enquire')}
        state={enquiryState()}
      />
    </>
  )
}

// Links to the seven categories further down the page, with their numbers.
function CategoryIndex() {
  const { t } = useLanguage()

  return (
    <nav aria-label={t('casting.labels.index')}>
      <ol className={styles.index}>
        {CASTING_CATEGORIES.map(({ slug }) => (
          <li key={slug}>
            <a href={`#${slug}`} className={styles.indexLink}>
              <span className={styles.indexNumber} aria-hidden="true">
                {categoryNumber(slug)}
              </span>
              {t(`casting.categories.${slug}.title`)}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// The reference micrographs from the client's specimen sets, captioned with
// the specimen's name, magnification and etchant, and a link to the full set.
function Micrographs() {
  const { t, tm } = useLanguage()
  const intro = tm('casting.intro')
  const specimens = CASTING_MICROGRAPHS.map((slug) => SPECIMENS.find((item) => item.slug === slug))

  return (
    <div className={styles.figures}>
      <div className={styles.figureGrid}>
        {specimens.map(({ slug, magnification, pictures: [picture] }) => {
          const name = t(`research.specimens.${slug}.name`)
          return (
            <figure key={slug} className={styles.figure}>
              <img
                src={picture.src}
                srcSet={`${picture.srcSmall} 400w, ${picture.src} 640w`}
                sizes="(min-width: 64rem) 28rem, (min-width: 30rem) 45vw, 100vw"
                width={picture.width}
                height={picture.height}
                alt={t('research.labels.alt', { name, magnification })}
                loading="lazy"
                decoding="async"
              />
              <figcaption className={styles.figureCaption}>
                <span className={styles.figureName}>{name}</span>
                {magnification} · {t(`research.specimens.${slug}.etchant`)}
              </figcaption>
            </figure>
          )
        })}
      </div>
      <p className={styles.figuresNote}>{intro.figuresCaption}</p>
      <LocalizedLink to={ROUTES.research} className={styles.figuresLink}>
        {intro.figuresLink}
        <ArrowRight aria-hidden="true" size={16} />
      </LocalizedLink>
    </div>
  )
}

// One category: its number, title and explanation, what it covers, and a
// link to the enquiry form with the category selected. `featured` gives the
// specialist processes more emphasis; `services` lists related testing
// services; `children` (such as the stir casting comparison) follows the list.
function CategoryCard({ slug, featured = false, services, children }) {
  const { t, tm } = useLanguage()
  const item = tm(`casting.categories.${slug}`)
  const labels = tm('casting.labels')
  const titleId = `${slug}-title`

  return (
    <article
      id={slug}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      aria-labelledby={titleId}
    >
      <div className={styles.cardHead}>
        <span className={styles.number} aria-hidden="true">
          {categoryNumber(slug)}
        </span>
        {featured && <span className={styles.tag}>{labels.specialist}</span>}
      </div>
      <h3 id={titleId} className={styles.title}>
        {item.title}
      </h3>
      <p className={styles.text}>{item.text}</p>

      <div className={styles.part}>
        <h4 className={styles.partHeading}>{labels.covers}</h4>
        <CheckList items={item.points} />
      </div>

      {item.applications && (
        <div className={styles.part}>
          <h4 className={styles.partHeading}>{labels.applications}</h4>
          <ul className={styles.chips}>
            {item.applications.map((application) => (
              <li key={application}>{application}</li>
            ))}
          </ul>
        </div>
      )}

      {children}

      {services && (
        <div className={styles.part}>
          <h4 className={styles.partHeading}>{labels.services}</h4>
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
      )}

      {item.note && <p className={content.note}>{item.note}</p>}

      <LocalizedLink to={ENQUIRY_PATH} state={enquiryState(slug)} className={styles.enquire}>
        {labels.enquire}
        <span className="visually-hidden">: {item.title}</span>
        <ArrowRight aria-hidden="true" size={16} />
      </LocalizedLink>
    </article>
  )
}

// Conventional alloy casting beside composite-oriented stir casting, so it is
// clear that reinforcement is not part of every casting.
function Comparison() {
  const { tm } = useLanguage()
  const { heading, conventional, composite } = tm('casting.comparison')

  return (
    <div className={styles.part}>
      <h4 className={styles.partHeading}>{heading}</h4>
      <dl className={styles.comparison}>
        {[conventional, composite].map(({ title, text }) => (
          <div key={title} className={styles.comparisonItem}>
            <dt className={styles.comparisonTitle}>{title}</dt>
            <dd className={styles.comparisonText}>{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
