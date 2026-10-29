import styles from './ProcessSteps.module.css'

// Ordered sequence of stages as a timeline: each stage a numbered marker, then
// a heading over a short paragraph. The markers sit on a thin line, read left
// to right on desktop and top to bottom on smaller screens. The ordered list
// conveys the sequence to assistive technology, so the visible numbers are
// hidden from it to avoid reading each twice. `steps` is [{ title, text }].
export default function ProcessSteps({ steps }) {
  return (
    <ol className={styles.steps}>
      {steps.map(({ title, text }, index) => (
        <li key={title} className={styles.step}>
          <span className={styles.marker} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className={styles.body}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
