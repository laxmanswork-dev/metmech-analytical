import { useLanguage } from '../../hooks/useLanguage.js'
import { breadcrumbSchema } from '../../utils/structuredData.js'
import Container from '../layout/Container.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import JsonLd from './JsonLd.jsx'
import styles from './PageHero.module.css'
import Watermark from './Watermark.jsx'

// Title band at the top of every inner page. Holds the page's single <h1>.
// `breadcrumbs` is [{ label, to }] and also produces the breadcrumb schema.
// `image` ({ src, width, height }) adds a photograph beside the title.
// `action` (such as a button) sits under the lead.
// `imageSlot` keeps a 4:3 frame for a photograph at the right even while
// `image` is null, so the layout is ready before the photo arrives; a photo
// placed in the frame is cropped to 4:3.
export default function PageHero({
  title,
  lead,
  breadcrumbs,
  image,
  imageAlt,
  imageSlot = false,
  action,
}) {
  const { language } = useLanguage()
  const hasImageColumn = Boolean(image) || imageSlot

  return (
    <div className={styles.hero}>
      <Container className={hasImageColumn ? styles.withImage : undefined}>
        <div>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
          {action && <div className={styles.action}>{action}</div>}
        </div>
        {hasImageColumn && (
          <div
            className={`${styles.image} ${imageSlot ? styles.slot : ''}`}
            aria-hidden={image ? undefined : 'true'}
          >
            {image && (
              <>
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={imageAlt}
                  fetchPriority="high"
                  decoding="async"
                />
                <Watermark />
              </>
            )}
          </div>
        )}
      </Container>
      {breadcrumbs && <JsonLd data={breadcrumbSchema(breadcrumbs, language)} />}
    </div>
  )
}
