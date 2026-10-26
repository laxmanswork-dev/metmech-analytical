import Container from './Container.jsx'
import styles from './Section.module.css'

// A vertically padded page band. `tone` sets the background: default, muted or tint.
// `spacing="compact"` gives a short section less padding and a closer heading.
// `fill` makes the section a full screen on desktop, like the home hero, with
// its content centred in it.
// Pass `labelledBy` with the id of the section's heading so the region is named,
// and `id` to make the section a link target. `className` adds the caller's
// own styles.
export default function Section({
  tone = 'default',
  spacing = 'default',
  narrow = false,
  fill = false,
  labelledBy,
  id,
  className: extraClassName,
  children,
}) {
  const className = [
    styles.section,
    styles[tone],
    spacing === 'compact' && styles.compact,
    fill && styles.fill,
    extraClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={className} aria-labelledby={labelledBy}>
      <Container narrow={narrow}>{children}</Container>
    </section>
  )
}
