import styles from './SectionHeading.module.css'

// The <h2> that opens a page section, with an optional supporting line.
// Pass the same `id` to the parent <Section labelledBy>.
export default function SectionHeading({ id, title, lead }) {
  return (
    <div className={styles.heading}>
      <h2 id={id}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  )
}
