import styles from './Card.module.css'

// Non-linked card: a title and a short explanation.
export default function FeatureCard({ title, text }) {
  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  )
}
