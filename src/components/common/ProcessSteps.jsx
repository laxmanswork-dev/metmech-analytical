import { toRoman } from '../../utils/roman.js'
import styles from './ProcessSteps.module.css'

// Ordered sequence of stages, numbered I, II, III... `steps` is [{ title, text }].
// `connected` draws a line from each stage to the next: one column on smaller
// screens, one row on desktop.
export default function ProcessSteps({ steps, connected = false }) {
  return (
    <ol className={connected ? `${styles.steps} ${styles.connected}` : styles.steps}>
      {steps.map(({ title, text }, index) => (
        <li key={title} className={styles.step}>
          <span className={styles.number} aria-hidden="true">
            {toRoman(index + 1)}
          </span>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
