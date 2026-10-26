import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/common/Button.jsx'
import Container from '../components/layout/Container.jsx'
import ScientificOrbit from '../components/orbit/ScientificOrbit.jsx'
import { HERO_POSTER, HERO_VIDEO } from '../data/images.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ENQUIRY_PATH, ROUTES } from '../routes/pages.js'
import styles from './HomeHero.module.css'

// How long before its end the video starts dissolving into the poster. The
// fade itself takes 0.5s (HomeHero.module.css); browsers report playback time
// only about four times a second, so the rest is headroom to be sure the fade
// has finished before the clip restarts.
const LOOP_FADE_SECONDS = 1.1

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

  return (
    <div className={styles.hero}>
      {/* Decorative background video (see src/assets/video/README.md). Layers, back to
          front: the poster frame, the video, then an overlay that darkens only
          the areas behind the text and the animation. */}
      {HERO_VIDEO && (
        <>
          {HERO_POSTER && (
            <div className={styles.poster} style={{ backgroundImage: `url(${HERO_POSTER})` }} />
          )}
          <video
            className={`${styles.video} ${isEndingLoop ? styles.videoEnding : ''}`}
            onTimeUpdate={HERO_POSTER ? handleTimeUpdate : undefined}
            src={HERO_VIDEO}
            poster={HERO_POSTER ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          />
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
        </div>
        <div className={styles.visual}>
          <ScientificOrbit />
        </div>
      </Container>
    </div>
  )
}
