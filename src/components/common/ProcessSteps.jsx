import styles from './ProcessSteps.module.css'

// Ordered sequence of stages, each a heading over a short paragraph, read
// left to right on desktop and top to bottom on smaller screens. There are no
// visible numbers; the ordered list conveys the sequence to assistive
// technology. `steps` is [{ title, text }].
export default function ProcessSteps({ steps }) {
  return (
    <ol className={styles.steps}>
      {steps.map(({ title, text }) => (
        <li key={title} className={styles.step}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
        </li>
      ))}
    </ol>
  )
}
