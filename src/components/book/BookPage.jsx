import { ArrowRight } from 'lucide-react'
import { memo } from 'react'
import { LOGO_EMBLEM } from '../../data/brand.js'
import { BOOK_PAGES, SPECIMEN_BY_SLUG, SPECIMEN_START } from '../../data/researchBook.js'
import { SPECIMENS } from '../../data/specimens.js'
import { ENQUIRY_PATH, servicePath } from '../../routes/pages.js'
import Button from '../common/Button.jsx'
import Watermark from '../common/Watermark.jsx'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './BookPage.module.css'

// One page of the research book: its running head, its content and its foot
// (the publication and the page number). Pages are laid out in units of their
// own width, so a page looks the same at every size the book is shown at.
//
// `onJump` (the contents' links to each specimen) is left out for the copies
// of a page drawn on a turning leaf.

const RELATED_SERVICES = ['material-characterization', 'sample-preparation']
const SET_KEYS = ['full', 'compact']
const INTRO_PICTURE = SPECIMEN_BY_SLUG['sg-iron'].pictures[0]

const pad = (number) => String(number).padStart(2, '0')

// Micrographs are shown at most about 450px wide.
const PLATE_SIZES = '(min-width: 56rem) 28rem, 90vw'

function Micrograph({ picture, alt, eager }) {
  return (
    <span className={styles.micrograph}>
      <img
        src={picture.src}
        srcSet={`${picture.srcSmall} 400w, ${picture.src} 640w`}
        sizes={PLATE_SIZES}
        width={picture.width}
        height={picture.height}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      <Watermark />
    </span>
  )
}

function BookPage({ page, index, t, tm, onJump, eager }) {
  const number = index + 1
  const specimen = page.slug ? SPECIMEN_BY_SLUG[page.slug] : null
  const text = specimen ? tm(`research.specimens.${specimen.slug}`) : null

  let head = t('research.hero.title')
  if (specimen) head = t(`research.groups.${specimen.group}`)
  if (page.kind === 'contents') head = t('research.book.contents')
  if (page.kind === 'reference') head = t('research.reference.heading')

  return (
    <div className={styles.frame}>
      <div className={styles.sheet} data-kind={page.kind} data-side={index % 2 ? 'right' : 'left'}>
        {page.kind !== 'title' && <p className={styles.head}>{head}</p>}
        <div className={styles.body}>
          <PageBody
            page={page}
            specimen={specimen}
            text={text}
            t={t}
            tm={tm}
            onJump={onJump}
            eager={eager}
          />
        </div>
        <p className={styles.foot}>
          <span className={styles.publication}>
            {index % 2 ? t('research.intro.heading') : 'Metmech Analytical Engineers'}
          </span>
          <span className={styles.folio}>{pad(number)}</span>
        </p>
      </div>
    </div>
  )
}

function PageBody({ page, specimen, text, t, tm, onJump, eager }) {
  const intro = tm('research.intro')
  const labels = tm('research.labels')

  switch (page.kind) {
    case 'title':
      return (
        <>
          <img
            className={styles.emblem}
            src={LOGO_EMBLEM.src}
            width={LOGO_EMBLEM.width}
            height={LOGO_EMBLEM.height}
            alt=""
          />
          <p className={styles.imprint}>
            <span>Metmech Analytical Engineers</span>
            <span className={styles.descriptor}>{t('site.descriptor')}</span>
          </p>
          <p className={styles.title}>{t('research.hero.title')}</p>
          <p className={styles.lead}>{t('research.hero.lead')}</p>
        </>
      )

    case 'introduction':
      return (
        <>
          <figure className={styles.figure}>
            <Micrograph picture={INTRO_PICTURE} alt={t('research.hero.imageAlt')} eager={eager} />
            <figcaption className={styles.caption}>
              {t('research.labels.specimenNumber', { number: SPECIMEN_BY_SLUG['sg-iron'].number })}{' '}
              · {t('research.specimens.sg-iron.name')} · {SPECIMEN_BY_SLUG['sg-iron'].magnification}
            </figcaption>
          </figure>
          <h2 className={styles.heading}>{intro.heading}</h2>
          <p className={styles.text}>{intro.lead}</p>
        </>
      )

    case 'preparation':
      return (
        <>
          <h2 className={styles.heading}>{intro.preparationHeading}</h2>
          <ol className={styles.steps}>
            {intro.preparation.map(({ title, text: stepText }) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{stepText}</span>
              </li>
            ))}
          </ol>
        </>
      )

    case 'sets':
      return (
        <>
          <h2 className={styles.heading}>{intro.setsHeading}</h2>
          <ul className={styles.sets}>
            {SET_KEYS.map((key) => {
              const set = intro.sets[key]
              return (
                <li key={key}>
                  <span className={styles.setCount} aria-hidden="true">
                    {set.count}
                  </span>
                  <span>
                    <strong>{set.title}</strong>
                    <span className={styles.setText}>{set.text}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </>
      )

    case 'contents':
      return (
        <>
          {page.from === 0 && (
            <>
              <h2 className={styles.heading}>{t('research.catalogue.heading')}</h2>
              <p className={styles.note}>{t('research.catalogue.lead')}</p>
            </>
          )}
          <ol className={styles.contents} start={page.from + 1}>
            {SPECIMENS.slice(page.from, page.to).map((entry) => {
              const start = SPECIMEN_START[entry.slug] + 1
              const name = t(`research.specimens.${entry.slug}.name`)
              const inner = (
                <>
                  <span className={styles.entryNumber}>{pad(entry.number)}</span>
                  <span className={styles.entryName}>{name}</span>
                  <span className={styles.entryPage}>{start}</span>
                </>
              )
              return (
                <li key={entry.slug}>
                  {onJump ? (
                    <button
                      type="button"
                      className={styles.entry}
                      aria-label={t('research.book.goTo', { page: start, name })}
                      onClick={() => onJump(start - 1)}
                    >
                      {inner}
                    </button>
                  ) : (
                    <span className={styles.entry}>{inner}</span>
                  )}
                </li>
              )
            })}
          </ol>
        </>
      )

    case 'specimen':
      return (
        <>
          <p className={styles.specimenLabel}>{labels.specimen}</p>
          <p className={styles.specimenNumber} aria-hidden="true">
            {pad(specimen.number)}
          </p>
          <h2 className={styles.specimenName}>
            <span className="visually-hidden">
              {t('research.labels.specimenNumber', { number: specimen.number })}:{' '}
            </span>
            {text.name}
          </h2>
          {page.part === 'heading' && (
            <Facts specimen={specimen} text={text} labels={labels} t={t} />
          )}
          {page.part !== 'heading' && <p className={styles.description}>{text.description}</p>}
        </>
      )

    case 'plate': {
      const picture = specimen.pictures[page.zone]
      const zone = picture.zone && t(`research.zones.${picture.zone}`)
      const alt = t(zone ? 'research.labels.altZone' : 'research.labels.alt', {
        name: text.name,
        zone,
        magnification: specimen.magnification,
      })
      return (
        <>
          <p className={styles.plateLabel}>
            {t('research.book.photomicrograph')}
            {zone && <span className={styles.zone}>{zone}</span>}
          </p>
          <figure className={styles.plate}>
            <Micrograph picture={picture} alt={alt} eager={eager} />
            <figcaption className={styles.caption}>
              {t('research.labels.specimenNumber', { number: specimen.number })} · {text.name}
              {zone && ` · ${zone}`}
            </figcaption>
          </figure>
          {/* A two-zone specimen lists its details on its first page. */}
          {!specimen.zones && <Facts specimen={specimen} text={text} labels={labels} t={t} />}
        </>
      )
    }

    case 'reference':
      return (
        <>
          {page.from === 0 && (
            <>
              <h2 className={styles.heading}>{t('research.reference.heading')}</h2>
              <p className={styles.note}>{t('research.reference.lead')}</p>
            </>
          )}
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{labels.number}</th>
                <th scope="col">{labels.specimen}</th>
                <th scope="col">{labels.magnification}</th>
                <th scope="col">{labels.etchant}</th>
              </tr>
            </thead>
            <tbody>
              {SPECIMENS.slice(page.from, page.to).map((entry) => (
                <tr key={entry.slug}>
                  <td>{entry.number}</td>
                  <th scope="row">
                    {t(`research.specimens.${entry.slug}.name`)}
                    <span className={styles.rowSet}>
                      {entry.inCompactSet ? labels.bothSets : labels.fullSetOnly}
                    </span>
                  </th>
                  <td>{entry.magnification}</td>
                  <td>{t(`research.specimens.${entry.slug}.etchant`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )

    case 'care':
      return (
        <>
          <h2 className={styles.heading}>{t('research.care.heading')}</h2>
          <p className={styles.note}>{t('research.care.lead')}</p>
          <ul className={styles.care}>
            {tm('research.care.items').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )

    case 'enquiry':
      // The enquiry, and the testing services that use these specimens.
      return (
        <>
          <h2 className={styles.heading}>{t('research.cta.heading')}</h2>
          <p className={styles.text}>{t('research.cta.text')}</p>
          <div className={styles.action}>
            <Button to={ENQUIRY_PATH}>
              {t('actions.requestTest')}
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
          </div>
          <h3 className={styles.subheading}>{intro.relatedHeading}</h3>
          <ul className={styles.links}>
            {RELATED_SERVICES.map((slug) => (
              <li key={slug}>
                <LocalizedLink to={servicePath(slug)}>
                  {t(`services.items.${slug}.title`)}
                  <ArrowRight aria-hidden="true" />
                </LocalizedLink>
              </li>
            ))}
          </ul>
          <p className={styles.colophon}>
            <img
              src={LOGO_EMBLEM.src}
              width={LOGO_EMBLEM.width}
              height={LOGO_EMBLEM.height}
              alt=""
            />
            <span>Metmech Analytical Engineers</span>
          </p>
        </>
      )

    default:
      return null
  }
}

// Magnification, etchant and which sets the specimen is in.
function Facts({ specimen, text, labels, t }) {
  return (
    <dl className={styles.facts}>
      <div>
        <dt>{labels.magnification}</dt>
        <dd>{specimen.magnification}</dd>
      </div>
      <div>
        <dt>{labels.etchant}</dt>
        <dd>{text.etchant}</dd>
      </div>
      <div>
        <dt>{labels.sets}</dt>
        <dd>
          {t(specimen.inCompactSet ? 'research.labels.bothSets' : 'research.labels.fullSetOnly')}
        </dd>
      </div>
    </dl>
  )
}

export default memo(BookPage)

export const PAGE_COUNT = BOOK_PAGES.length
