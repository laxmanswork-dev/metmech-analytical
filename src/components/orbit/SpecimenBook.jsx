import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BOOK_PAGES } from '../../data/specimens.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import { castShadows, curlLeaf, ease } from '../book/pageTurn.js'
import styles from './SpecimenBook.module.css'

// The specimen book inside the frame at the centre of the home hero. It opens,
// turns through one spread per specimen (number, name and magnification on
// the left, the micrograph on the right), closes and opens again. The
// etchant and description are too long for a page this size; they are on the
// research capabilities page, from the same data.
//
// Drawn with CSS 3D. A turning leaf is a chain of hinged strips, curled and
// lit by components/book/pageTurn.js.
//
// One requestAnimationFrame loop drives it, writing transforms straight to
// the strips. React renders only when the spread or the kind of turn
// changes, about once every three seconds. The loop stops while the orbit is
// paused (hovered, pinned, paused by the visitor or out of view).

// Milliseconds.
const FIRST_CLOSED = 450
const OPEN = 1300
const HOLD = 2000
const TURN = 650
const CLOSE = 1300
const CLOSED = 1200

// Strips per leaf: enough for a smooth curve at about 100px a page.
const STRIPS = 8
// How far, in degrees, the paper's free edge leads the binding as the leaf
// lifts (and trails it as the leaf lands). The cover board barely flexes.
const PAPER_BEND = 46
const BOARD_BEND = 4

const LAST = BOOK_PAGES.length - 1

// One cycle, from the cover opening to the book lying closed again. Each
// step is [mode, spread, duration].
const CYCLE = [['opening', 0, OPEN]]
for (let k = 0; k <= LAST; k += 1) {
  CYCLE.push(['spread', k, HOLD])
  if (k < LAST) CYCLE.push(['turning', k, TURN])
}
CYCLE.push(['closing', LAST, CLOSE], ['closed', 0, CLOSED])
const CYCLE_LENGTH = CYCLE.reduce((sum, [, , duration]) => sum + duration, 0)

// What the book shows `time` ms after it starts. Before 0 it lies closed.
function stepAt(time) {
  if (time < 0) return { mode: 'closed', spread: 0, progress: 0 }
  let rest = time % CYCLE_LENGTH
  for (const [mode, spread, duration] of CYCLE) {
    if (rest < duration) return { mode, spread, progress: rest / duration }
    rest -= duration
  }
  return { mode: 'closed', spread: 0, progress: 0 }
}

const STILL = { mode: 'spread', spread: 0 }

export default function SpecimenBook({ paused, ready }) {
  const { t } = useLanguage()
  // The server, and the browser until the frame has settled, show it closed.
  const [view, setView] = useState({ mode: 'closed', spread: 0 })
  const bookRef = useRef(null)
  const stripRefs = useRef([])
  const castRefs = useRef({ left: null, right: null })
  const clock = useRef(-FIRST_CLOSED)
  const viewKey = useRef('closed:0')
  const setStrip = useCallback((index, node) => {
    stripRefs.current[index] = node
  }, [])

  // Visitors who ask for reduced motion get the first spread, open and still.
  const [isStill, setIsStill] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setIsStill(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  // Fetch and decode the next two micrographs while the current spread is
  // read, so a page never turns onto an empty frame. The rest wait.
  const shownSpread = isStill ? 0 : view.spread
  useEffect(() => {
    for (const offset of [0, 1, 2]) {
      const page = BOOK_PAGES[(shownSpread + offset) % BOOK_PAGES.length]
      const image = new Image()
      image.src = page.src
      image.decode?.().catch(() => {})
    }
  }, [shownSpread])

  // A leaf that has just mounted is posed before it is painted: closing,
  // it starts on the left, not where it would lie unposed.
  useLayoutEffect(() => {
    const step = isStill ? { ...STILL, progress: 0 } : stepAt(clock.current)
    pose(step, bookRef.current, stripRefs.current, castRefs.current)
  }, [view, isStill])

  const running = ready && !paused && !isStill
  useEffect(() => {
    if (!running) return undefined
    let frame = 0
    let last = null

    const tick = (now) => {
      // A long gap (a background tab) resumes where it left off.
      if (last !== null) clock.current += Math.min(now - last, 100)
      last = now
      const step = stepAt(clock.current)
      const key = `${step.mode}:${step.spread}`
      if (key !== viewKey.current) {
        viewKey.current = key
        setView({ mode: step.mode, spread: step.spread })
      }
      pose(step, bookRef.current, stripRefs.current, castRefs.current)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [running])

  const { mode, spread } = isStill ? STILL : view
  const page = (index) => BOOK_PAGES[Math.min(index, LAST)]

  // What lies on each side, and the leaf above them. The leaf that will turn
  // next is in place for the whole spread before it moves (pose() lays it
  // flat over the right page, which it matches), so the browser has drawn it
  // before the turn starts and the turn itself only moves it. The page under
  // it is already the next one. On the last spread the leaf is the left half
  // of the book, ready to close.
  let left = null
  let right = null
  let leaf = null
  if ((mode === 'spread' || mode === 'turning') && spread < LAST) {
    left = <TextPage page={page(spread)} t={t} />
    right = <ImagePage page={page(spread + 1)} t={t} />
    leaf = {
      board: false,
      front: <ImagePage page={page(spread)} t={t} />,
      back: <TextPage page={page(spread + 1)} t={t} />,
    }
  } else if (mode === 'spread') {
    left = <TextPage page={page(LAST)} t={t} />
    right = <ImagePage page={page(LAST)} t={t} />
    leaf = {
      board: true,
      front: <Cover t={t} />,
      back: <TextPage page={page(LAST)} t={t} />,
    }
  } else {
    // The cover is the leaf. Opening, it turns over to show the first
    // specimen's text on its inside; closing, it brings the last one back.
    const inside = mode === 'closing' ? page(LAST) : page(0)
    if (mode !== 'closed') right = <ImagePage page={inside} t={t} />
    leaf = {
      board: true,
      front: <Cover t={t} />,
      back: <TextPage page={inside} t={t} />,
    }
  }

  // Leaves under each open page: the thickness of each stack.
  const turned = mode === 'turning' || mode === 'spread' ? spread : 0
  const stackLeft = Math.min(turned, 12)
  const stackRight = Math.min(LAST - turned, 12)

  return (
    <div
      ref={bookRef}
      className={styles.book}
      data-mode={mode}
      style={{ '--stack-left': stackLeft, '--stack-right': stackRight }}
      aria-hidden="true"
    >
      <span className={styles.shadow} data-side="left" />
      <span className={styles.shadow} data-side="right" />
      <div className={styles.half} data-side="left" hidden={!left}>
        <span className={styles.stack} />
        <div className={styles.paper}>{left}</div>
        <span
          ref={(node) => {
            castRefs.current.left = node
          }}
          className={styles.cast}
        />
      </div>
      <div className={styles.half} data-side="right">
        <span className={styles.stack} />
        <div className={styles.paper} hidden={!right}>
          {right}
        </div>
        <span
          ref={(node) => {
            castRefs.current.right = node
          }}
          className={styles.cast}
        />
      </div>
      {leaf && (
        <div className={styles.leaf} data-board={leaf.board ? '' : undefined}>
          <Strip index={0} leaf={leaf} onMount={setStrip} />
        </div>
      )}
    </div>
  )
}

// One hinged strip of the turning leaf, holding the next strip at its free
// edge. Each face shows its slice of a full page.
function Strip({ index, leaf, onMount }) {
  return (
    <div
      ref={(node) => {
        onMount(index, node)
      }}
      className={styles.strip}
      style={{ '--strip': index, '--strips': STRIPS }}
    >
      <div className={styles.face} data-face="front">
        <div className={styles.slice} data-side="right">
          {leaf.board ? (
            leaf.front
          ) : (
            <div className={styles.paper}>
              {leaf.front}
              <span className={styles.shade} data-shade="" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.face} data-face="back">
        <div className={styles.slice} data-side="left">
          <div className={styles.paper}>
            {leaf.back}
            <span className={styles.shade} data-shade="" />
          </div>
        </div>
      </div>
      {index < STRIPS - 1 && <Strip index={index + 1} leaf={leaf} onMount={onMount} />}
    </div>
  )
}

// Writes one frame: the leaf's curl, its shading, the shadows it casts on
// the open pages, and how far the closed book sits to the right of centre.
function pose({ mode, spread, progress }, book, strips, casts) {
  if (!book) return
  // Leaf position from 0 (lying on the right) to 1 (lying on the left).
  let turn = 0
  let bend = PAPER_BEND
  let closed = 0
  if (mode === 'turning') {
    turn = progress
  } else if (mode === 'opening') {
    turn = progress
    bend = BOARD_BEND
    closed = 1 - ease(progress)
  } else if (mode === 'closing') {
    turn = 1 - progress
    bend = BOARD_BEND
    closed = ease(progress)
  } else if (mode === 'closed') {
    closed = 1
  } else if (spread === LAST) {
    // The last spread: the left half lies ready to close.
    turn = 1
    bend = BOARD_BEND
  }
  book.style.setProperty('--closed', closed.toFixed(4))

  const angle = curlLeaf(strips.slice(0, STRIPS), turn, bend)
  // While the cover is turning, the left side is only as solid as the part
  // of it lying down there.
  const onLeft = mode === 'opening' || mode === 'closing' ? Math.max(0, (angle - 90) / 90) : 1
  book.style.setProperty('--left-shadow', mode === 'closed' ? '0' : onLeft.toFixed(3))
  castShadows(casts, angle)
}

// ---- Pages ----

// The booklets number each page by its specimen, so that is the page number.
const pad = (number) => String(number).padStart(2, '0')

const TextPage = memo(function TextPage({ page, t }) {
  return (
    <div className={styles.page} data-kind="text">
      <span className={styles.number}>{pad(page.number)}</span>
      <span className={styles.name}>{t(`research.specimens.${page.slug}.name`)}</span>
      <span className={styles.rule} />
      <span className={styles.detail}>
        <span className={styles.detailLabel}>{t('research.labels.magnification')}</span>
        {page.magnification}
      </span>
    </div>
  )
})

const ImagePage = memo(function ImagePage({ page, t }) {
  return (
    <div className={styles.page} data-kind="image">
      <span className={styles.plate}>
        <img src={page.src} width={page.width} height={page.height} alt="" decoding="async" />
      </span>
      <span className={styles.caption}>
        {t('research.labels.specimenNumber', { number: page.number })} · {page.magnification}
      </span>
    </div>
  )
})

const Cover = memo(function Cover({ t }) {
  return (
    <div className={styles.cover}>
      <span className={styles.emblem} />
      <span className={styles.shade} data-shade="" />
      <span className={styles.coverTitle}>{t('research.intro.heading')}</span>
      <span className={styles.coverSet}>{t('research.intro.sets.full.title')}</span>
    </div>
  )
})
