import styles from './FeatureList.module.css'
import Numeral from './Numeral.jsx'

// Short points set as editorial columns under a hairline rule, without cards
// or icons. `items` is [{ title, text }]. `numbered` makes it an ordered list
// with a Roman numeral (I, II, ...) above each title. `large` sets the points
// a step larger on desktop, for a list that has a full screen to itself.
export default function FeatureList({ items, numbered = false, large = false }) {
  const List = numbered ? 'ol' : 'ul'
  const className = [styles.list, numbered ? styles.numbered : styles.plain, large && styles.large]
    .filter(Boolean)
    .join(' ')

  return (
    <List className={className}>
      {items.map(({ title, text }, index) => (
        <li key={title} className={styles.item}>
          {numbered && <Numeral value={index + 1} className={styles.number} />}
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
        </li>
      ))}
    </List>
  )
}
