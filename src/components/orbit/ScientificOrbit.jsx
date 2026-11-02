import { Flame, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ORBIT_ITEMS, ORBIT_THUMBNAIL_SIZE } from '../../data/orbit.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import { servicePath } from '../../routes/pages.js'
import { announceHeroMotion } from '../../utils/heroMotion.js'
import Watermark from '../common/Watermark.jsx'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import CircleFrame from './CircleFrame.jsx'
import HexRing from './HexRing.jsx'
import styles from './ScientificOrbit.module.css'

// Six testing categories riding a machined hexagonal plate (HexRing) that
// turns about a still, round frame whose window holds the specimen book and
// leads to the research capabilities page (CircleFrame). On arrival the ring
// swings up first, then the frame drops in and seats, then the book opens.
//
// The motion is entirely CSS. The plate and the orbit turn clockwise
// together; each category counter-turns to stay upright; and each
// category's emphasis and caption use the orbit's duration with a delay
// derived from its place on the circle. Because they share a timeline, the
// highlighted image and its caption cannot drift apart, and nothing
// re-renders while the orbit runs.
//
// React state changes only on interaction: hovering or focusing a category
// highlights it and pauses the orbit so the target does not move away, and
// clicking or tapping it opens that service's page.
export default function ScientificOrbit() {
  const { t, tm } = useLanguage()
  // The lines each name is set on inside its circle in the current language.
  const labelLines = tm('home.orbit.labelLines')
  const raisedLabels = tm('home.orbit.labelRaised')
  const rootRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [isInView, setIsInView] = useState(true)

  // Stop animating while the hero is scrolled out of view.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting))
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [])

  const isPaused = isUserPaused || hovered !== null || !isInView

  // The pause button stops the hero's background video too (see heroMotion.js).
  // Only the visitor's own choice is passed on, not a hover.
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    announceHeroMotion(isUserPaused)
  }, [isUserPaused])

  return (
    <div
      ref={rootRef}
      className={styles.orbit}
      data-paused={isPaused ? '' : undefined}
      data-override={hovered ? '' : undefined}
    >
      <div className={styles.stage}>
        <HexRing paused={isPaused} />
        <CircleFrame paused={isPaused} />

        <div className={styles.pivot}>
          <ul className={styles.list} aria-label={t('home.orbit.label')}>
            {ORBIT_ITEMS.map(({ slug, image }, index) => {
              const title = t(`services.items.${slug}.title`)
              // Each line ends with a space so the lines read as one phrase,
              // matching the button's accessible name. It does not show.
              const lines = (labelLines[slug] ?? [title]).map((line) => (
                <span key={line} className={styles.labelLine}>
                  {line}{' '}
                </span>
              ))
              return (
                <li key={slug} className={styles.arm} style={{ '--i': index }}>
                  <div className={styles.upright}>
                    <div className={styles.counter}>
                      <LocalizedLink
                        to={servicePath(slug)}
                        className={styles.item}
                        data-first={index === 0 ? '' : undefined}
                        data-active={hovered === slug ? '' : undefined}
                        aria-label={title}
                        aria-describedby={`orbit-description-${slug}`}
                        // Touch has no hover: a tap goes straight to the page.
                        onPointerEnter={(event) => {
                          if (event.pointerType !== 'mouse') return
                          setHovered(slug)
                        }}
                        onPointerLeave={() => setHovered(null)}
                        // Keyboard focus highlights; focus left behind by a click does not.
                        onFocus={(event) => {
                          if (!event.target.matches(':focus-visible')) return
                          setHovered(slug)
                        }}
                        onBlur={() => setHovered(null)}
                      >
                        <span className={styles.media}>
                          {image ? (
                            <img
                              src={image}
                              width={ORBIT_THUMBNAIL_SIZE}
                              height={ORBIT_THUMBNAIL_SIZE}
                              alt=""
                              decoding="async"
                            />
                          ) : (
                            <span className={styles.icon}>
                              <Flame aria-hidden="true" />
                            </span>
                          )}
                          <span
                            className={styles.label}
                            data-raised={raisedLabels.includes(slug) ? '' : undefined}
                            aria-hidden="true"
                          >
                            {lines}
                          </span>
                          {image && <Watermark className={styles.watermark} />}
                        </span>
                      </LocalizedLink>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-label={t(isUserPaused ? 'home.orbit.play' : 'home.orbit.pause')}
          onClick={() => setIsUserPaused((current) => !current)}
        >
          {isUserPaused ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
        </button>
      </div>

      {/* Visual captions. Assistive technology gets each description from its
          link through aria-describedby, so this block is not read twice. */}
      <div className={styles.captions} aria-hidden="true">
        {ORBIT_ITEMS.map(({ slug }, index) => (
          <div
            key={slug}
            className={styles.caption}
            style={{ '--i': index }}
            data-first={index === 0 ? '' : undefined}
            data-active={hovered === slug ? '' : undefined}
          >
            <p className={styles.captionTitle}>{t(`services.items.${slug}.title`)}</p>
            <p id={`orbit-description-${slug}`}>{t(`home.orbit.items.${slug}`)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
