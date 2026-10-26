import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './Button.module.css'

// Renders an internal link when `to` is given, otherwise a <button>.
// `variant` is "primary", "secondary", "inverse" (for dark backgrounds) or
// "ghost" (translucent, for footage and imagery). `shape="cylinder"` gives the
// machined-rod form used by the site's main calls to action.
export default function Button({ to, variant = 'primary', shape, children, ...props }) {
  const className = `${styles.button} ${styles[variant]} ${shape ? styles[shape] : ''}`

  if (to) {
    return (
      <LocalizedLink to={to} className={className} {...props}>
        {children}
      </LocalizedLink>
    )
  }

  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  )
}
