import { Flame, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ORBIT_CENTRE_IMAGE, ORBIT_ITEMS, ORBIT_THUMBNAIL_SIZE } from '../../data/orbit.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import Watermark from '../common/Watermark.jsx'
import styles from './ScientificOrbit.module.css'

// Six testing categories circling a central instrument.
//
// The motion is entirely CSS. One animation turns the ring; each category
// counter-turns to stay upright; and each category's emphasis and caption use
// the same duration with a delay derived from its place on the ring. Because
// they share a timeline, the highlighted image, label and caption cannot drift
// apart, and nothing re-renders while the orbit runs.
//
// React state changes only on interaction: hovering or focusing a category
// highlights it for the moment, clicking or tapping pins it, and either one
// pauses the orbit so the target does not move away.
export default function ScientificOrbit() {
  const { t, tm } = useLanguage()
  // The lines each name is set on inside its circle in the current language.
  const labelLines = tm('home.orbit.labelLines')
  const raisedLabels = tm('home.orbit.labelRaised')
  const rootRef = useRef(null)
  const [pinned, setPinned] = useState(null)
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

  const highlighted = pinned ?? hovered
  const isHeld = isUserPaused || pinned !== null
  const isPaused = isHeld || hovered !== null || !isInView

  const togglePlayback = () => {
    if (isHeld) {
      setPinned(null)
      setIsUserPaused(false)
    } else {
      setIsUserPaused(true)
    }
  }

  return (
    <div
      ref={rootRef}
      className={styles.orbit}
      data-paused={isPaused ? '' : undefined}
      data-override={highlighted ? '' : undefined}
    >
      <div className={styles.stage}>
        <div className={styles.track} aria-hidden="true" />
        <div className={styles.activeArc} aria-hidden="true" />

        <div className={styles.centre}>
          {/* Largest element on first load, so it is not lazy-loaded. */}
          <img
            src={ORBIT_CENTRE_IMAGE.src}
            width={ORBIT_CENTRE_IMAGE.width}
            height={ORBIT_CENTRE_IMAGE.height}
            alt={t('home.orbit.centreAlt')}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className={styles.ring}>
          <div aria-hidden="true">
            {ORBIT_ITEMS.map(({ slug }, index) => (
              <span key={slug} className={styles.spoke} style={{ '--i': index }} />
            ))}
          </div>

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
                      <button
                        type="button"
                        className={styles.item}
                        data-first={index === 0 ? '' : undefined}
                        data-active={highlighted === slug ? '' : undefined}
                        aria-label={title}
                        aria-pressed={pinned === slug}
                        aria-describedby={`orbit-description-${slug}`}
                        onClick={() => setPinned((current) => (current === slug ? null : slug))}
                        onKeyDown={(event) => {
                          if (event.key === 'Escape') setPinned(null)
                        }}
                        // Touch has no hover: a tap pins instead.
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
                      </button>
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
          aria-label={t(isHeld ? 'home.orbit.play' : 'home.orbit.pause')}
          onClick={togglePlayback}
        >
          {isHeld ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
        </button>
      </div>

      {/* Visual captions. Assistive technology gets each description from its
          button through aria-describedby, so this block is not read twice. */}
      <div className={styles.captions} aria-hidden="true">
        {ORBIT_ITEMS.map(({ slug }, index) => (
          <div
            key={slug}
            className={styles.caption}
            style={{ '--i': index }}
            data-first={index === 0 ? '' : undefined}
            data-active={highlighted === slug ? '' : undefined}
          >
            <p className={styles.captionTitle}>{t(`services.items.${slug}.title`)}</p>
            <p id={`orbit-description-${slug}`}>{t(`home.orbit.items.${slug}`)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
