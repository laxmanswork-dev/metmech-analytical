import { LOGO_EMBLEM } from '../../data/brand.js'
import styles from './Watermark.module.css'

// The company emblem in the bottom-right corner of a photograph. Place it as
// the last child of the element that is exactly the photograph's box, and give
// that element `position: relative`. Hosts can tune it through
// --watermark-size, --watermark-inset and --watermark-pad, or `className`.
// Decorative, so it is hidden from assistive technology and the pointer.
export default function Watermark({ className }) {
  return (
    <span
      className={className ? `${styles.watermark} ${className}` : styles.watermark}
      aria-hidden="true"
    >
      <img
        src={LOGO_EMBLEM.src}
        width={LOGO_EMBLEM.width}
        height={LOGO_EMBLEM.height}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </span>
  )
}
