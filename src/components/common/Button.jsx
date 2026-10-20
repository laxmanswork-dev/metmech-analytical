import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './Button.module.css'

// Renders an internal link when `to` is given, otherwise a <button>.
// `variant` is "primary", "secondary" or "inverse" (for dark backgrounds).
export default function Button({ to, variant = 'primary', children, ...props }) {
  const className = `${styles.button} ${styles[variant]}`

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
