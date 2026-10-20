import { ChevronRight } from 'lucide-react'
import styles from './FaqList.module.css'

// Questions and answers as native disclosure elements, which are keyboard
// accessible and searchable without JavaScript. `items` is [{ q, a }].
export default function FaqList({ items }) {
  return (
    <div className={styles.list}>
      {items.map(({ q, a }) => (
        <details key={q} className={styles.item}>
          <summary className={styles.question}>
            <ChevronRight aria-hidden="true" size={18} className={styles.chevron} />
            {q}
          </summary>
          <p className={styles.answer}>{a}</p>
        </details>
      ))}
    </div>
  )
}
