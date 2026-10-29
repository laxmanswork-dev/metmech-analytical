import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage.js'
import { ROUTES } from '../../routes/pages.js'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './CircleFrame.module.css'
import SpecimenBook from './SpecimenBook.jsx'

// The machined round frame inside the hexagonal ring, with the specimen book
// in its window, and the way to the research capabilities page. It never
// turns: only the ring around it does.
//
// The frame is drawn in CSS: an outer chamfer, a flat rim and the window's
// inner wall, lit from the upper left like the ring and the book, over the
// frame's thickness showing below it.
//
// The book starts to open once the frame has seated (its entrance animation
// has finished, which waits for the intro film on first visits).

// Wait this long after the frame has seated before opening the book.
const OPEN_AFTER = 250

export default function CircleFrame({ paused }) {
  const { t } = useLanguage()
  const frameRef = useRef(null)
  const [isSeated, setIsSeated] = useState(false)

  useEffect(() => {
    let isCurrent = true
    let timer = 0
    const entrance = frameRef.current
      ?.getAnimations()
      .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
    Promise.all((entrance ?? []).map((animation) => animation.finished))
      .catch(() => {})
      .then(() => {
        if (isCurrent) timer = setTimeout(() => setIsSeated(true), OPEN_AFTER)
      })
    return () => {
      isCurrent = false
      clearTimeout(timer)
    }
  }, [])

  return (
    <LocalizedLink
      ref={frameRef}
      to={ROUTES.research}
      className={styles.frame}
      aria-label={t('home.orbit.explore')}
    >
      <span className={styles.shadow} aria-hidden="true" />
      <span className={styles.head} aria-hidden="true">
        <span className={styles.side} />
        <span className={styles.chamfer} />
        <span className={styles.rim} />
        <span className={styles.wall} />
      </span>
      <span className={styles.window} aria-hidden="true">
        <SpecimenBook paused={paused} ready={isSeated} />
      </span>
    </LocalizedLink>
  )
}
