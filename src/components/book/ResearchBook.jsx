import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { BOOK_PAGES } from '../../data/researchBook.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import BookPage from './BookPage.jsx'
import { castShadows, curlLeaf } from './pageTurn.js'
import usePageFlipSound from './usePageFlipSound.js'
import styles from './ResearchBook.module.css'

// The research capabilities page as one open book that turns its own pages
// (pages and their content: data/researchBook.js and BookPage.jsx).
//
// Wide screens show two-page spreads; phones and upright tablets show one
// taller page at a time, its binding on the left. Must match the media query
// in ResearchBook.module.css.
//
// Every page is in the document from the start (so the whole book is in the
// prerendered HTML); only the pages in view are shown. A turning leaf is a
// chain of hinged strips holding copies of its two pages, posed every frame
// by pageTurn.js. React renders when a turn starts and when it ends, never
// in between.
//
// Pages turn by themselves, one turn every 2.5 seconds, and from the last
// spread back to the first, round and round. They wait while the book is out
// of view or the tab is hidden, and the visitor can pause, step back and
// forward (also with the arrow keys or a swipe), jump from the contents, or
// start again; after any of those the next turn waits a full 2.5 seconds.
// With reduced motion they change in place and do not turn by themselves.

const TOTAL = BOOK_PAGES.length
const SPREAD_MEDIA = '(min-width: 56rem) and (min-aspect-ratio: 1/1)'
const STILL_MEDIA = '(prefers-reduced-motion: reduce)'

// Strips per leaf: enough for a smooth curve; more make a large spread
// heavier to draw as it turns.
const STRIPS = 8
// Milliseconds for one turn; a single page is narrower, so a little faster.
const TURN = { spread: 1100, single: 850 }
// How far, in degrees, the free edge leads the binding as a page lifts.
const BEND = 38
// Milliseconds from the start of one turn by itself to the start of the next.
const INTERVAL = 2500

const SUBSCRIPTIONS = new Map()
function subscribeTo(query) {
  if (!SUBSCRIPTIONS.has(query)) {
    SUBSCRIPTIONS.set(query, (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    })
  }
  return SUBSCRIPTIONS.get(query)
}

// The server renders the two-page view, still. A phone then shows the left
// page of that first spread on its own, which is the same first page.
function useMedia(query, onServer) {
  return useSyncExternalStore(
    subscribeTo(query),
    () => window.matchMedia(query).matches,
    () => onServer,
  )
}

const pad = (number) => String(number).padStart(2, '0')

export default function ResearchBook() {
  const { t, tm } = useLanguage()
  const isSpread = useMedia(SPREAD_MEDIA, true)
  const isStill = useMedia(STILL_MEDIA, false)
  const step = isSpread ? 2 : 1
  const lastStart = TOTAL - step

  // `page` is the first page in view; `turn` the page being turned to.
  const [view, setView] = useState({ page: 0, turn: null })
  // The visitor's choice to pause or play, once made; until then pages turn
  // by themselves unless they ask for reduced motion.
  const [playChoice, setPlayChoice] = useState(null)
  const isPlaying = playChoice ?? !isStill
  const [isActive, setIsActive] = useState(true)
  const [announcement, setAnnouncement] = useState('')

  const stageRef = useRef(null)
  const viewportRef = useRef(null)
  const stripRefs = useRef([])
  const castRefs = useRef({ left: null, right: null })
  const isManual = useRef(false)
  // Whether the last turn was one the book made by itself. The next one then
  // starts 2.5 seconds after that one started; after the visitor's own, 2.5
  // seconds after it ended.
  const wasAutomatic = useRef(false)
  // When the last turn started (performance.now()).
  const turnStarted = useRef(0)
  const playFlip = usePageFlipSound()
  // The turn (the state object, one per turn) that has had its sound, so a
  // turn re-run by a resize mid-turn is not heard twice.
  const soundedTurn = useRef(null)
  const soundedPage = useRef(0)

  const align = useCallback((page) => (isSpread ? page - (page % 2) : page), [isSpread])
  const page = align(view.page)
  // A turn started in the other layout (the screen was resized) carries on
  // to the matching page of this one.
  const turn = useMemo(() => {
    const to = view.turn ? align(view.turn.to) : page
    return to === page ? null : { to, direction: to > page ? 1 : -1 }
  }, [view.turn, page, align])

  const goTo = useCallback(
    (target, manual) => {
      isManual.current = manual
      wasAutomatic.current = !manual
      setView((current) => {
        if (current.turn) return current
        const from = align(current.page)
        const to = align(Math.max(0, Math.min(TOTAL - 1, target)))
        if (to === from) return current
        if (isStill) return { page: to, turn: null }
        return { page: from, turn: { to, direction: to > from ? 1 : -1 } }
      })
    },
    [align, isStill],
  )

  // Pages wait while the book is off screen or the tab is hidden.
  useEffect(() => {
    let isVisible = !document.hidden
    let isInView = true
    const update = () => setIsActive(isVisible && isInView)
    const onVisibility = () => {
      isVisible = !document.hidden
      update()
    }
    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              isInView = entry.intersectionRatio >= 0.35
              update()
            },
            { threshold: 0.35 },
          )
        : null
    observer?.observe(stageRef.current)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // The turn itself: a requestAnimationFrame loop, from its first frame
  // (posed before the leaf is painted) to the commit that lays the next
  // pages down.
  useLayoutEffect(() => {
    if (!turn) return undefined
    const duration = isSpread ? TURN.spread : TURN.single
    const strips = stripRefs.current.slice(0, STRIPS)
    const pose = (progress) => {
      const angle = curlLeaf(strips, turn.direction > 0 ? progress : 1 - progress, BEND)
      castShadows(castRefs.current, angle, 0.45)
    }
    let frame = 0
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      pose(progress)
      if (progress < 1) frame = requestAnimationFrame(tick)
      else setView({ page: turn.to, turn: null })
    }
    pose(0)
    turnStarted.current = start
    if (soundedTurn.current !== view.turn) {
      soundedTurn.current = view.turn
      playFlip()
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [turn, isSpread, view.turn, playFlip])

  // With reduced motion pages change in place, without a turn: each change
  // still sounds once.
  useEffect(() => {
    if (page === soundedPage.current) return
    soundedPage.current = page
    if (isStill) playFlip()
  }, [page, isStill, playFlip])

  // Between turns the next leaf lies ready on the right-hand page (see the
  // render below): lay it flat.
  useLayoutEffect(() => {
    if (turn) return
    curlLeaf(stripRefs.current.slice(0, STRIPS), 0, BEND)
    castShadows(castRefs.current, 0)
  }, [turn, page, isSpread])

  // Pages turn by themselves. One timer at a time, set when a turn has
  // landed (or the book is first shown) and cleared by anything that changes
  // the view; a hidden tab or a book out of view sets none, so coming back
  // never brings a burst of turns.
  useEffect(() => {
    if (!isPlaying || turn || !isActive) return undefined
    // Coming back after a pause or a hidden tab, the last turn is long past:
    // wait a full interval rather than turning at once.
    const sinceTurn = performance.now() - turnStarted.current
    const wait = wasAutomatic.current && sinceTurn < INTERVAL ? INTERVAL - sinceTurn : INTERVAL
    const timer = setTimeout(() => goTo(page >= lastStart ? 0 : page + step, false), wait)
    return () => clearTimeout(timer)
  }, [isPlaying, turn, isActive, page, step, lastStart, goTo])

  const counter = isSpread
    ? t('research.book.pages', { from: page + 1, to: page + 2, total: TOTAL })
    : t('research.book.page', { page: page + 1, total: TOTAL })

  // After a page the visitor chose, say where they are. Pages turning by
  // themselves are not announced, so they never talk over the reading.
  useEffect(() => {
    if (turn || !isManual.current) return
    isManual.current = false
    setAnnouncement(counter)
  }, [turn, counter])

  // Arrow keys anywhere in the book, and a sideways swipe across the pages.
  useEffect(() => {
    const stage = stageRef.current
    const viewport = viewportRef.current
    const onKey = (event) => {
      if (event.key === 'ArrowRight') goTo(page + step, true)
      else if (event.key === 'ArrowLeft') goTo(page - step, true)
      else return
      event.preventDefault()
    }
    let start = null
    const onDown = (event) => {
      if (event.pointerType === 'mouse' || event.target.closest('a, button')) return
      start = { x: event.clientX, y: event.clientY }
    }
    const onUp = (event) => {
      if (!start) return
      const dx = event.clientX - start.x
      const dy = event.clientY - start.y
      start = null
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return
      goTo(page + (dx < 0 ? step : -step), true)
    }
    const onCancel = () => {
      start = null
    }
    stage.addEventListener('keydown', onKey)
    viewport.addEventListener('pointerdown', onDown)
    viewport.addEventListener('pointerup', onUp)
    viewport.addEventListener('pointercancel', onCancel)
    return () => {
      stage.removeEventListener('keydown', onKey)
      viewport.removeEventListener('pointerdown', onDown)
      viewport.removeEventListener('pointerup', onUp)
      viewport.removeEventListener('pointercancel', onCancel)
    }
  }, [page, step, goTo])

  const jump = useCallback((index) => goTo(index, true), [goTo])
  const setStrip = useCallback((index, node) => {
    stripRefs.current[index] = node
  }, [])

  // Where each page in view lies, and which pages the turning leaf carries.
  // Turning forward, the leaf lifts the right-hand page off the next one;
  // turning back, it brings the previous right-hand page over from the left.
  //
  // Between turns the leaf for the next page already lies flat over the
  // right-hand page, which it matches, so the browser has drawn it before it
  // moves. It is inert: clicks and assistive technology reach the real page
  // beneath it.
  const slots = {}
  let leaf = null
  const isReady = !isStill && page < lastStart
  if (isSpread) {
    if (!turn) {
      slots[page] = 'left'
      slots[page + 1] = 'right'
      if (isReady) leaf = { front: page + 1, back: page + 2 }
    } else if (turn.direction > 0) {
      slots[page] = 'left'
      slots[turn.to + 1] = 'right'
      leaf = { front: page + 1, back: turn.to }
    } else {
      slots[turn.to] = 'left'
      slots[page + 1] = 'right'
      leaf = { front: turn.to + 1, back: page }
    }
  } else if (!turn) {
    slots[page] = 'single'
    if (isReady) leaf = { front: page, back: null }
  } else if (turn.direction > 0) {
    slots[turn.to] = 'single'
    leaf = { front: page, back: null }
  } else {
    slots[page] = 'single'
    leaf = { front: turn.to, back: null }
  }

  // Pictures on the pages in view and the next two views load; the rest
  // wait until they come near.
  const isNear = (index) => index >= page - step && index < page + step * 3

  const atEnd = page >= lastStart

  return (
    <section
      ref={stageRef}
      className={styles.stage}
      aria-roledescription={t('research.book.label')}
      aria-labelledby="research-book-title"
      data-layout={isSpread ? 'spread' : 'single'}
    >
      <h1 id="research-book-title" className="visually-hidden">
        {t('research.hero.title')}
      </h1>

      <div ref={viewportRef} className={styles.viewport}>
        <div
          className={styles.book}
          style={{ '--read': page / TOTAL, '--unread': (TOTAL - page - step) / TOTAL }}
        >
          <span className={styles.shadow} aria-hidden="true" />
          <span className={styles.board} data-side="left" aria-hidden="true" />
          <span className={styles.board} data-side="right" aria-hidden="true" />

          {BOOK_PAGES.map((entry, index) => (
            <article
              key={`${entry.kind}-${index}`}
              className={styles.page}
              data-slot={slots[index]}
              hidden={!slots[index]}
            >
              <BookPage
                page={entry}
                index={index}
                t={t}
                tm={tm}
                onJump={jump}
                eager={isNear(index)}
              />
            </article>
          ))}

          {['left', 'right'].map((side) => (
            <span
              key={side}
              ref={(node) => {
                castRefs.current[side] = node
              }}
              className={styles.cast}
              data-side={side}
              aria-hidden="true"
            />
          ))}

          {leaf && (
            <div className={styles.leaf} inert aria-hidden="true">
              <Strip index={0} leaf={leaf} t={t} tm={tm} onMount={setStrip} />
            </div>
          )}
        </div>
      </div>

      <fieldset className={styles.controls}>
        <legend className="visually-hidden">{t('research.book.controls')}</legend>
        <button
          type="button"
          className={styles.control}
          onClick={() => goTo(0, true)}
          disabled={page === 0}
          aria-label={t('research.book.restart')}
        >
          <RotateCcw aria-hidden="true" size={18} />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => goTo(page - step, true)}
          disabled={page === 0}
          aria-label={t('research.book.previous')}
        >
          <ChevronLeft aria-hidden="true" size={22} />
        </button>
        <p className={styles.counter}>
          <span className="visually-hidden">{counter}</span>
          <span aria-hidden="true">
            {t('research.book.pageShort')}{' '}
            <strong>{isSpread ? `${pad(page + 1)}–${pad(page + 2)}` : pad(page + 1)}</strong> /{' '}
            {TOTAL}
          </span>
        </p>
        <button
          type="button"
          className={styles.control}
          onClick={() => goTo(page + step, true)}
          disabled={atEnd}
          aria-label={t('research.book.next')}
        >
          <ChevronRight aria-hidden="true" size={22} />
        </button>
        <button
          type="button"
          className={styles.control}
          data-primary=""
          onClick={() => setPlayChoice(!isPlaying)}
          aria-label={t(isPlaying ? 'research.book.pause' : 'research.book.play')}
        >
          {isPlaying ? (
            <Pause aria-hidden="true" size={18} />
          ) : (
            <Play aria-hidden="true" size={18} />
          )}
        </button>
      </fieldset>

      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </section>
  )
}

// One hinged strip of the turning leaf, holding the next strip at its free
// edge. Each face shows its slice of a full page; a single page's back is
// blank paper.
function Strip({ index, leaf, t, tm, onMount }) {
  const face = (pageIndex) => (
    <div className={styles.leafPage}>
      {pageIndex !== null && (
        <BookPage page={BOOK_PAGES[pageIndex]} index={pageIndex} t={t} tm={tm} eager />
      )}
      <span className={styles.shade} data-shade="" />
    </div>
  )
  return (
    <div
      ref={(node) => onMount(index, node)}
      className={styles.strip}
      style={{ '--strip': index, '--strips': STRIPS }}
    >
      <div className={styles.face} data-face="front">
        <div className={styles.slice}>{face(leaf.front)}</div>
      </div>
      <div className={styles.face} data-face="back">
        <div className={styles.slice}>{face(leaf.back)}</div>
      </div>
      {index < STRIPS - 1 && (
        <Strip index={index + 1} leaf={leaf} t={t} tm={tm} onMount={onMount} />
      )}
    </div>
  )
}
