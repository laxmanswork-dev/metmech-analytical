import { useLanguage } from '../../hooks/useLanguage.js'
import { breadcrumbSchema } from '../../utils/structuredData.js'
import Container from '../layout/Container.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import JsonLd from './JsonLd.jsx'
import PhotoBackdrop from './PhotoBackdrop.jsx'
import styles from './PageHero.module.css'
import Watermark from './Watermark.jsx'

// Title band at the top of every inner page. Holds the page's single <h1>.
// `breadcrumbs` is [{ label, to }] and also produces the breadcrumb schema.
// `image` ({ src, width, height }) adds a photograph beside the title.
// `background` (from src/data/backgrounds.js) sets a photograph behind the
// band, under a navy veil.
export default function PageHero({ title, lead, breadcrumbs, image, imageAlt, background }) {
  const { language } = useLanguage()

  return (
    <div className={background ? `${styles.hero} ${styles.photo}` : styles.hero}>
      {background && <PhotoBackdrop image={background} lazy={false} />}
      <Container className={image ? styles.withImage : undefined}>
        <div>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
        </div>
        {image && (
          <div className={styles.image}>
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={imageAlt}
              fetchPriority="high"
              decoding="async"
            />
            <Watermark />
          </div>
        )}
      </Container>
      {breadcrumbs && <JsonLd data={breadcrumbSchema(breadcrumbs, language)} />}
    </div>
  )
}
