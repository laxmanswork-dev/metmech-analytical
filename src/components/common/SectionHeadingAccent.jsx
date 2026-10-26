import styles from './SectionHeadingAccent.module.css'

// The small mark under a section heading: a strip of the Metmech logo's
// honeycomb. Six regular flat-topped hexagons tile in two offset rows, as the
// logo's tiles do, each shrunk slightly so a thin seam runs between them.
// Geometry: side 3.85, so a column step of 1.5 x side (5.775) and a row offset
// of half the hexagon's height (3.334), drawn at side 3.45 to open the seams.
// The brand cyan with one navy tile, and the last tile fainter so the strip
// tapers off. Colours come from --color-accent and --heading-accent-secondary,
// so a dark section can lighten it (see WhatWeOffer.module.css). Decorative
// only, so hidden from assistive technology.
export default function SectionHeadingAccent() {
  return (
    <svg
      className={styles.accent}
      viewBox="0 0 36.6 10"
      width="37"
      height="10"
      aria-hidden="true"
      focusable="false"
    >
      <polygon
        className={styles.primary}
        points="0.4,3.33 2.13,0.35 5.58,0.35 7.3,3.33 5.58,6.32 2.13,6.32"
      />
      <polygon
        className={styles.primary}
        points="6.18,6.67 7.9,3.68 11.35,3.68 13.08,6.67 11.35,9.66 7.9,9.66"
      />
      <polygon
        className={styles.secondary}
        points="11.95,3.33 13.68,0.35 17.13,0.35 18.85,3.33 17.13,6.32 13.68,6.32"
      />
      <polygon
        className={styles.primary}
        points="17.73,6.67 19.45,3.68 22.9,3.68 24.63,6.67 22.9,9.66 19.45,9.66"
      />
      <polygon
        className={styles.primary}
        points="23.5,3.33 25.23,0.35 28.68,0.35 30.4,3.33 28.68,6.32 25.23,6.32"
      />
      <polygon
        className={styles.faint}
        points="29.28,6.67 31,3.68 34.45,3.68 36.18,6.67 34.45,9.66 31,9.66"
      />
    </svg>
  )
}
