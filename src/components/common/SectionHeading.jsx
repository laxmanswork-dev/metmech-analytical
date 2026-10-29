import styles from './SectionHeading.module.css'

// The <h2> that opens a page section, with an optional supporting line. Pass
// the same `id` to the parent <Section labelledBy>. An optional `action`
// (such as a button to the full list) sits at the top right, beside the title.
export default function SectionHeading({ id, title, lead, action }) {
  const heading = (
    <div className={styles.heading}>
      <h2 id={id}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  )

  if (!action) return heading

  return (
    <div className={styles.withAction}>
      {heading}
      <div className={styles.action}>{action}</div>
    </div>
  )
}
