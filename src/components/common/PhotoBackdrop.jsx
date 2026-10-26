import { useEffect, useRef, useState } from 'react'
import styles from './PhotoBackdrop.module.css'

// A photograph behind a band of the page, under a flat navy veil: the site's
// one treatment for background imagery (the home page's What We Offer band is
// the original). Place it as the first child of an element with
// `position: relative` and `isolation: isolate`; it fills that element.
//
// `image` is { src, mobile, position, veil } from src/data/backgrounds.js.
// `lazy` (default) waits until the band is near the viewport before loading
// the photograph; until then the band is plain navy, so nothing below the
// first screen costs a download up front. Title bands pass lazy={false}.
export default function PhotoBackdrop({ image, lazy = true }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(!lazy)

  useEffect(() => {
    if (visible) return undefined
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [visible])

  const style = {
    '--backdrop-position': image.position ?? 'center',
    '--backdrop-veil': image.veil ?? 0.72,
  }
  if (visible) {
    style['--backdrop'] = `url(${image.src})`
    style['--backdrop-mobile'] = `url(${image.mobile ?? image.src})`
  }

  return <div ref={ref} className={styles.backdrop} style={style} aria-hidden="true" />
}
