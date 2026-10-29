import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import introVideo from '../assets/intro/metmech-intro.mp4'
import introVideoPortrait from '../assets/intro/metmech-intro-portrait.mp4'
import { useLanguage } from '../hooks/useLanguage.js'
import styles from './HomeIntro.module.css'

// The 6-second company intro (source and renderer in design/intro/), played
// full screen over the home page once per browser tab, then faded away.
//
// An inline script in index.html sets <html data-intro="play"> before the first
// paint when this tab has not seen it, so the cover is there from the first
// frame and repeat visits never flash it. Without JavaScript the attribute is
// never set and the cover stays hidden (HomeIntro.module.css).
const STORAGE_KEY = 'metmech-intro-seen'

// On every screen, but never for visitors who ask for reduced motion. Must
// match the CSS.
const PLAY_MEDIA = '(prefers-reduced-motion: no-preference)'

// The film is 16:9 with the name across its middle, so screens narrower than
// 4:3 (phones held upright, portrait tablets) get the same scene reframed for
// a tall screen (design/intro/render.js). Chosen once, when the intro starts.
const LANDSCAPE_MEDIA = '(min-aspect-ratio: 4/3)'

// If the video stalls or autoplay is blocked without an error, give up after this.
const GIVE_UP_MS = 9000

// Whether this visit plays the intro. Fixed for the page's lifetime, so there
// is nothing to subscribe to. The server cannot know, so it renders the cover
// alone (null); the browser then switches to the video or to nothing.
const noSubscription = () => () => {}
const shouldPlay = () =>
  document.documentElement.dataset.intro === 'play' && window.matchMedia(PLAY_MEDIA).matches
const unknownOnServer = () => null

export default function HomeIntro() {
  const { t } = useLanguage()
  const videoRef = useRef(null)
  const canPlay = useSyncExternalStore(noSubscription, shouldPlay, unknownOnServer)
  // Fixed for the intro's six seconds, so turning the phone does not restart it.
  // The video only renders in the browser (canPlay is null on the server).
  const [videoSrc] = useState(() =>
    typeof window !== 'undefined' && !window.matchMedia(LANDSCAPE_MEDIA).matches
      ? introVideoPortrait
      : introVideo,
  )
  // playing · leaving · done
  const [phase, setPhase] = useState('playing')
  const isPlaying = canPlay === true && phase === 'playing'

  useEffect(() => {
    if (!isPlaying) return

    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Storage blocked: the intro may play again on the next home visit.
    }
    const root = document.documentElement
    root.style.overflow = 'hidden'
    videoRef.current?.play().catch(() => setPhase('leaving'))
    const timer = setTimeout(() => setPhase('leaving'), GIVE_UP_MS)
    return () => {
      clearTimeout(timer)
      root.style.overflow = ''
    }
  }, [isPlaying])

  if (canPlay === false || phase === 'done') return null

  const leave = () => setPhase((current) => (current === 'done' ? current : 'leaving'))

  return (
    <div
      className={`${styles.intro} ${phase === 'leaving' ? styles.leaving : ''}`}
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget || phase !== 'leaving') return
        // Only once the fade has finished: this attribute is what shows the
        // cover. Coming back to the home page in this tab does not replay it.
        document.documentElement.dataset.intro = 'seen'
        setPhase('done')
      }}
    >
      {canPlay && (
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          onEnded={leave}
          onError={leave}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      {isPlaying && (
        <button type="button" className={styles.skip} onClick={leave}>
          {t('home.intro.skip')}
        </button>
      )}
    </div>
  )
}
