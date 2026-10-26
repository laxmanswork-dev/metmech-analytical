import { LOGO_EMBLEM } from '../../data/brand.js'
import styles from './MediaFrame.module.css'
import Watermark from './Watermark.jsx'

// A fixed 4:3 frame that shows an image without cropping it, so photographs of
// different shapes line up in a grid. `image` is { src, width, height }.
// Without an image (the client has not yet supplied one) it shows the company
// emblem, faint on a tinted ground: a quiet branded tile, never a stand-in
// photograph and never "to be added" text on the public site. It is
// decorative; the card's title says what the card is.
// Set `eager` for an image visible on first load; others are lazy-loaded.
// The photograph sits in its own box, sized to its shape, so the watermark
// lands on the photograph's corner rather than in the frame's empty margin.
export default function MediaFrame({ image, alt, eager = false }) {
  if (!image) {
    return (
      <div className={`${styles.frame} ${styles.placeholder}`}>
        <img
          src={LOGO_EMBLEM.src}
          width={LOGO_EMBLEM.width}
          height={LOGO_EMBLEM.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
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
