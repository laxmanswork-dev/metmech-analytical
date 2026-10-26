import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { stripLanguage } from '../utils/paths.js'
import { useLanguage } from './useLanguage.js'

// Smooth scrolling within a page, unless the visitor prefers reduced motion.
function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

// Handles scroll position and focus after client-side navigation:
// - a link with a hash (for example /#about) scrolls to that element, smoothly
//   when it is on the page already showing; the sticky header is allowed for
//   by `scroll-padding-top` in base.css;
// - a link to the page already showing, without a hash (Home on the home
//   page), scrolls smoothly back to the top;
// - a new page scrolls to the top and moves focus to the main region, so
//   keyboard and screen-reader users start at the new content;
// - switching language on the same page keeps the current scroll position,
//   or, with a hash, returns to that element once the new language has
//   rendered (its text runs to a different length, moving the element).
export function useRouteChangeReset(mainRef) {
  const { pathname, hash, key } = useLocation()
  const page = stripLanguage(pathname)
  const { language } = useLanguage()
  const previous = useRef({ page, pathname, isFirst: true })
  const previousLanguage = useRef(language)

  useEffect(() => {
    const { isFirst } = previous.current
    const pageChanged = previous.current.page !== page
    const samePath = previous.current.pathname === pathname
    previous.current = { page, pathname, isFirst: false }

    // A language switch: the scroll is handled once the language has changed.
    if (!pageChanged && !samePath) return

    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView({ behavior: pageChanged || isFirst ? 'auto' : scrollBehavior() })
      if (pageChanged) mainRef.current?.focus({ preventScroll: true })
      return
    }

    if (pageChanged) {
      window.scrollTo(0, 0)
      mainRef.current?.focus({ preventScroll: true })
    } else if (samePath && !isFirst) {
      window.scrollTo({ top: 0, behavior: scrollBehavior() })
    }
    // `key` changes on every navigation, so repeating a click on the same link
    // scrolls again.
  }, [page, pathname, hash, key, mainRef])

  // After a language switch, return to the element the hash names.
  useEffect(() => {
    if (previousLanguage.current === language) return
    previousLanguage.current = language
    if (!hash) return
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  }, [language, hash])
}
