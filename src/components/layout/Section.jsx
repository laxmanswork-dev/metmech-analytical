import Container from './Container.jsx'
import styles from './Section.module.css'

// A vertically padded page band. `tone` sets the background: default, muted or tint.
// `spacing="compact"` gives a short section less padding and a closer heading.
// Pass `labelledBy` with the id of the section's heading so the region is named,
// and `id` to make the section a link target.
export default function Section({
  tone = 'default',
  spacing = 'default',
  narrow = false,
  labelledBy,
  id,
  children,
}) {
  const className = [styles.section, styles[tone], spacing === 'compact' && styles.compact]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={className} aria-labelledby={labelledBy}>
      <Container narrow={narrow}>{children}</Container>
    </section>
  )
}
