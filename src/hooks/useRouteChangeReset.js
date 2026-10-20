import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { stripLanguage } from '../utils/paths.js'

// Handles scroll position and focus after client-side navigation:
// - a link with a hash (for example /contact#enquiry) scrolls to that element;
// - a new page scrolls to the top and moves focus to the main region, so
//   keyboard and screen-reader users start at the new content;
// - switching language on the same page keeps the current scroll position.
export function useRouteChangeReset(mainRef) {
  const { pathname, hash, key } = useLocation()
  const page = stripLanguage(pathname)
  const previousPage = useRef(page)

  useEffect(() => {
    const pageChanged = previousPage.current !== page
    previousPage.current = page

    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView()
      if (pageChanged) mainRef.current?.focus({ preventScroll: true })
      return
    }

    if (pageChanged) {
      window.scrollTo(0, 0)
      mainRef.current?.focus({ preventScroll: true })
    }
    // `key` changes on every navigation, so repeating a click on the same hash
    // link scrolls again.
  }, [page, hash, key, mainRef])
}
