import { Link } from 'react-router'
import { useLanguage } from '../../hooks/useLanguage.js'

// Internal link that keeps the visitor in the active language.
// `to` is a language-neutral path such as "/about".
export default function LocalizedLink({ to, ...props }) {
  const { localize } = useLanguage()
  return <Link to={localize(to)} {...props} />
}
