import { ArrowRight, ExternalLink, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Button from '../components/common/Button.jsx'
import Container from '../components/layout/Container.jsx'
import ScientificOrbit from '../components/orbit/ScientificOrbit.jsx'
import { HERO_POSTER, HERO_POSTER_MOBILE, HERO_VIDEO, HERO_VIDEO_MOBILE } from '../data/images.js'
import { GOOGLE_PROFILE_URL, GOOGLE_RATING } from '../data/site.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ENQUIRY_PATH, ROUTES } from '../routes/pages.js'
import { HERO_MOTION_EVENT } from '../utils/heroMotion.js'
import styles from './HomeHero.module.css'

// How long before its end the video starts dissolving into the poster. The
// fade itself takes 0.5s (HomeHero.module.css); browsers report playback time
// only about four times a second, so the rest is headroom to be sure the fade
// has finished before the clip restarts.
const LOOP_FADE_SECONDS = 1.1

// Phones held upright get their own clip. It is a 9:16 picture centred in a
// 16:9 frame, so the hero must be at least 16:9 tall for its width or the
// black sides show; below 37.5rem (600px) the hero always is (measured to
// 0.56 at 600px, against 0.5625). Wider screens get the landscape clip. Must
// match the poster's breakpoint in HomeHero.module.css.
const MOBILE_MEDIA = '(max-width: 37.49rem)'

export default function HomeHero() {
  const { t, tm } = useLanguage()

  // The clip's last frame does not match its first, so a plain loop shows a
  // cut. The poster underneath is the first frame: fading the video out over
  // its final moments dissolves into that frame, and the restart is invisible.
  const [isEndingLoop, setIsEndingLoop] = useState(false)
  const handleTimeUpdate = (event) => {
    const { currentTime, duration } = event.currentTarget
    if (!duration) return
    setIsEndingLoop(duration - currentTime < LOOP_FADE_SECONDS)
  }

  // The orbit's pause button pauses this video as well (see heroMotion.js).
  const videoRef = useRef(null)
  const isPausedRef = useRef(false)
  useEffect(() => {
    const handleMotion = ({ detail }) => {
      isPausedRef.current = detail.paused
      const video = videoRef.current
      if (!video) return
      if (detail.paused) video.pause()
      else video.play().catch(() => {})
    }
    window.addEventListener(HERO_MOTION_EVENT, handleMotion)
    return () => window.removeEventListener(HERO_MOTION_EVENT, handleMotion)
  }, [])

  // The browser picks a <source> only when the video loads, so a window
  // resized or a phone turned across the breakpoint would keep the other
  // clip. Reloading makes it pick again; only the newly matching clip is
  // fetched. A visitor who paused the hero stays paused.
  useEffect(() => {
    if (!HERO_VIDEO_MOBILE) return undefined
    const query = window.matchMedia(MOBILE_MEDIA)
    const handleChange = () => {
      const video = videoRef.current
      if (!video) return
      setIsEndingLoop(false)
      video.load()
      if (isPausedRef.current) video.pause()
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className={styles.hero}>
      {/* Decorative background video (see src/assets/video/README.md). Layers, back to
          front: the poster frame, the video, then an overlay that darkens only
          the areas behind the text and the animation. */}
      {HERO_VIDEO && (
        <>
          {/* The poster is a CSS background, so a phone or a desktop only ever
              fetches its own frame (see .poster). */}
          {HERO_POSTER && (
            <div
              className={styles.poster}
              style={{
                '--poster': `url(${HERO_POSTER})`,
                '--poster-mobile': HERO_POSTER_MOBILE ? `url(${HERO_POSTER_MOBILE})` : undefined,
              }}
            />
          )}
          {/* The browser takes the first <source> whose media matches when the
              page loads and downloads only that file, so a phone never fetches
              the desktop clip or the reverse. */}
          <video
            ref={videoRef}
            className={`${styles.video} ${isEndingLoop ? styles.videoEnding : ''}`}
            onTimeUpdate={HERO_POSTER ? handleTimeUpdate : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          >
            {HERO_VIDEO_MOBILE && <source src={HERO_VIDEO_MOBILE} type="video/mp4" media={MOBILE_MEDIA} />}
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className={styles.overlay} />
        </>
      )}

      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{t('home.hero.eyebrow')}</p>
          {/* Each line ends with a space so the heading reads as one sentence. */}
          <h1 className={styles.title}>
            {tm('home.hero.titleLines').map((line) => (
              <span key={line} className={styles.titleLine}>
                {line}{' '}
              </span>
            ))}
          </h1>
          <p className={styles.text}>{t('home.hero.text')}</p>
          {/* One conversion path: the enquiry is the solid primary action,
              the same "Start a Test" as the header and the closing band.
              Browsing the services is the solid white alternative, placed first. */}
          <div className={styles.actions}>
            <Button to={ROUTES.services} variant="inverse">
              {t('actions.exploreServices')}
            </Button>
            <Button to={ENQUIRY_PATH}>
              {t('actions.requestTest')}
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
          </div>
          {/* The business's Google profile: a small trust note beneath the two
              actions, not a third one. It quotes a rating only when one is
              set in src/data/site.js. */}
          {GOOGLE_PROFILE_URL && (
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reviews}
            >
              <Star aria-hidden="true" size={16} className={styles.star} />
              <span className={styles.reviewsTitle}>
                {GOOGLE_RATING
                  ? t('home.hero.rating.title', { value: GOOGLE_RATING.value.toFixed(1) })
                  : t('home.hero.reviews.title')}
              </span>
              <span className={styles.reviewsText}>
                {GOOGLE_RATING
                  ? t('home.hero.rating.text', { count: GOOGLE_RATING.count })
                  : t('home.hero.reviews.text')}
                {/* A no-break space keeps the icon on the last word's line. */}
                {' '}
                <ExternalLink aria-hidden="true" size={12} className={styles.external} />
                <span className="visually-hidden"> ({t('a11y.opensInNewTab')})</span>
              </span>
            </a>
          )}
        </div>
        <div className={styles.visual}>
          <ScientificOrbit />
        </div>
      </Container>
    </div>
  )
}
