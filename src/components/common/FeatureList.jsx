import styles from './FeatureList.module.css'

// Short benefits as numbered cards: a small "01", "02"... label on a hairline
// rule, then a heading over a paragraph. It is an ordered list, so the
// numbering is read out; the visible labels are hidden from assistive
// technology to avoid saying each number twice. `items` is [{ title, text }].
export default function FeatureList({ items }) {
  return (
    <ol className={styles.list}>
      {items.map(({ title, text }, index) => (
        <li key={title} className={styles.card}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
        </li>
      ))}
    </ol>
  )
}
