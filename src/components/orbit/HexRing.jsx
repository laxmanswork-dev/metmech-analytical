import styles from './HexRing.module.css'

// The machined hexagonal plate round the specimen frame, carrying the six
// categories at its corners and turning with them about the frame.
//
// Its light stays fixed, as on a real part turning under a lamp. Each lit
// surface (the chamfers, the face, the side showing below it) is a hexagon
// that turns with the ring and holds a gradient that turns back the other
// way, so the shading stays put while the edges move through it. Both are
// transform animations, so the ring turns without repainting.
//
// It turns clockwise once per orbit, the categories' own animation, so the
// plate and the categories move as one assembly.
function Surface({ className }) {
  return (
    <span className={`${styles.surface} ${className}`}>
      <span className={styles.light} />
    </span>
  )
}

// Socket head cap screws, one in the middle of each flat, between the
// categories. Each is seated in a counterbore; the counterbore and the domed
// head are lit by the fixed light (they turn back like the surfaces), while
// the hexagon socket turns with the plate.
const SCREWS = [0, 1, 2, 3, 4, 5]

export default function HexRing({ paused }) {
  return (
    <div className={styles.ring} data-paused={paused ? '' : undefined} aria-hidden="true">
      <span className={styles.shadow} />
      <span className={styles.below}>
        <Surface className={styles.side} />
      </span>
      <Surface className={styles.outerBevel} />
      <Surface className={styles.face} />
      <Surface className={styles.innerBevel} />
      <Surface className={styles.floor} />
      <span className={styles.screws}>
        {SCREWS.map((index) => (
          <span key={index} className={styles.screw} style={{ '--i': index }}>
            <span className={styles.screwLight} />
            <span className={styles.socket} />
          </span>
        ))}
      </span>
    </div>
  )
}
