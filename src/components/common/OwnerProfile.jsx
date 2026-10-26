import { LOGO_EMBLEM } from '../../data/brand.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import styles from './OwnerProfile.module.css'

// A 4:5 portrait with the person's name and designation beneath it.
// `person` is { name, designation: { en, ta }, photo } as in src/data/owner.js.
// Without a photograph the frame keeps its size and shows the company emblem,
// faint on a tinted ground, like MediaFrame: no stand-in face, no broken image
// and no "coming soon" text. Parts that are not yet confirmed are left out,
// and with nothing to say the figure is hidden from assistive technology.
export default function OwnerProfile({ person }) {
  const { language, t } = useLanguage()
  const { name, photo } = person
  const designation = person.designation?.[language]
  const hasCaption = Boolean(name || designation)

  return (
    <figure className={styles.profile} aria-hidden={!hasCaption && !photo ? true : undefined}>
      <div className={photo ? styles.frame : `${styles.frame} ${styles.empty}`}>
        {photo ? (
          <img
            className={styles.photo}
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={name ? t('about.owner.photoAlt', { name }) : ''}
            loading="lazy"
            decoding="async"
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
        ) : (
          <img
            className={styles.emblem}
            src={LOGO_EMBLEM.src}
            width={LOGO_EMBLEM.width}
            height={LOGO_EMBLEM.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      {hasCaption && (
        <figcaption className={styles.caption}>
          {name && <span className={styles.name}>{name}</span>}
          {designation && <span className={styles.designation}>{designation}</span>}
        </figcaption>
      )}
    </figure>
  )
}
