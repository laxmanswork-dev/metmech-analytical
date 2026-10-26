import styles from './FeatureList.module.css'

// Short benefits set as an editorial grid: a heading over a paragraph, with
// no cards, icons, markers or rules. `items` is [{ title, text }].
export default function FeatureList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map(({ title, text }) => (
        <li key={title}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
        </li>
      ))}
    </ul>
  )
}
