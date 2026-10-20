import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { useLanguage } from '../../hooks/useLanguage.js'
import { stripLanguage } from '../../utils/paths.js'
import styles from './NavDropdown.module.css'

// A navigation item that reveals a short list of links.
//
// It is a disclosure, not an ARIA menu: a real <button> that shows and hides a
// list of ordinary links, which is what assistive technology expects for site
// navigation. `items` is [{ key, path }] with `key` under `nav.` in the
// dictionaries. `buttonClassName` lets the header style the trigger like its
// other links; `onNavigate` runs when a link is chosen.
//
// Opens on click. Closes on a second click, Escape, a click elsewhere, focus
// leaving it, or choosing a link. Arrow keys move between the links.
export default function NavDropdown({ label, items, buttonClassName, onNavigate }) {
  const { t, localize } = useLanguage()
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listId = useId()

  const page = stripLanguage(pathname)
  const isCurrent = items.some(({ path }) => page === path || page.startsWith(`${path}/`))

  useEffect(() => {
    if (!isOpen) return undefined
    const closeIfOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', closeIfOutside)
    document.addEventListener('focusin', closeIfOutside)
    return () => {
      document.removeEventListener('pointerdown', closeIfOutside)
      document.removeEventListener('focusin', closeIfOutside)
    }
  }, [isOpen])

  const links = () => [...rootRef.current.querySelectorAll('a')]

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isOpen) {
      // Stop here so an enclosing menu does not close as well.
      event.stopPropagation()
      setIsOpen(false)
      buttonRef.current?.focus()
      return
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    if (!isOpen) {
      if (event.key !== 'ArrowDown') return
      event.preventDefault()
      setIsOpen(true)
      // The list is rendered but hidden until this update paints.
      requestAnimationFrame(() => links()[0]?.focus())
      return
    }
    event.preventDefault()
    const all = links()
    const index = all.indexOf(document.activeElement)
    const next = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: all.length - 1,
    }[event.key]
    all[(next + all.length) % all.length]?.focus()
  }

  return (
    // The wrapper only relays arrow and Escape keys from the button and links
    // inside it; it is not itself a control.
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={rootRef} className={styles.dropdown} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.trigger} ${buttonClassName ?? ''}`}
        aria-expanded={isOpen}
        aria-controls={listId}
        data-current={isCurrent ? '' : undefined}
        onClick={() => setIsOpen((open) => !open)}
      >
        {label}
        <ChevronDown aria-hidden="true" className={styles.chevron} />
      </button>

      <ul id={listId} className={styles.list} hidden={!isOpen}>
        {items.map(({ key, path }) => (
          <li key={key}>
            <NavLink
              to={localize(path)}
              className={styles.link}
              onClick={() => {
                setIsOpen(false)
                onNavigate?.()
              }}
            >
              {t(`nav.${key}`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
