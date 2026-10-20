import styles from './CheckList.module.css'

// Bulleted list with a small round marker. `items` is an array of strings.
export default function CheckList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  )
}
