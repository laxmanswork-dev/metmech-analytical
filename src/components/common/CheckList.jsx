import styles from './CheckList.module.css'

// Bulleted list with a small round marker. `items` is an array of strings.
// `variant="ruled"` sets the items apart with hairline rules and an outlined
// marker, for longer entries such as the questions on the Industries page.
export default function CheckList({ items, variant }) {
  return (
    <ul className={`${styles.list} ${variant === 'ruled' ? styles.ruled : ''}`}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  )
}
