import PhotoBackdrop from '../common/PhotoBackdrop.jsx'
import Container from './Container.jsx'
import styles from './Section.module.css'

// A vertically padded page band. `tone` sets the background: default, muted or tint.
// `spacing="compact"` gives a short section less padding and a closer heading.
// `fill` makes the section a full screen on desktop, like the home hero, with
// its content centred in it.
// Pass `labelledBy` with the id of the section's heading so the region is named,
// and `id` to make the section a link target. `className` adds the caller's
// own styles, such as a background image.
//
// `background` (from src/data/backgrounds.js) puts a photograph under a navy
// veil behind the band, in place of the tone. Then either:
// - the section's content is white cards: the section heading, its lead and
//   any link below the cards turn light, and the cards stay as they are; or
// - `panel` is set: the content sits on one white panel in a thin glass
//   frame, unchanged inside, for text, lists, forms and FAQs.
export default function Section({
  tone = 'default',
  spacing = 'default',
  narrow = false,
  fill = false,
  background,
  panel = false,
  labelledBy,
  id,
  className: extraClassName,
  children,
}) {
  const className = [
    styles.section,
    background ? styles.photo : styles[tone],
    background && !panel && styles.onPhoto,
    spacing === 'compact' && styles.compact,
    fill && styles.fill,
    extraClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={className} aria-labelledby={labelledBy}>
      {background && <PhotoBackdrop image={background} />}
      <Container narrow={narrow}>
        {background && panel ? <div className={styles.panel}>{children}</div> : children}
      </Container>
    </section>
  )
}
