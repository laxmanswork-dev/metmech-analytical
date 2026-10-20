import { useLanguage } from '../../hooks/useLanguage.js'
import styles from './MediaFrame.module.css'
import Watermark from './Watermark.jsx'

// A fixed 4:3 frame that shows an image without cropping it, so photographs of
// different shapes line up in a grid. `image` is { src, width, height }.
// Without an image it shows a clearly labelled placeholder.
// Set `eager` for an image visible on first load; others are lazy-loaded.
// The photograph sits in its own box, sized to its shape, so the watermark
// lands on the photograph's corner rather than in the frame's empty margin.
export default function MediaFrame({ image, alt, eager = false }) {
  const { t } = useLanguage()

  if (!image) {
    return (
      <div className={`${styles.frame} ${styles.placeholder}`}>
        <span>{t('labels.photoPending')}</span>
      </div>
    )
  }

  // Wider than the 4:3 frame: fill its width. Narrower: fill its height.
  const fit = image.width * 3 >= image.height * 4 ? 'width' : 'height'

  return (
    <div className={styles.frame}>
      <div
        className={styles.photo}
        data-fit={fit}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
        />
        <Watermark />
      </div>
    </div>
  )
}
