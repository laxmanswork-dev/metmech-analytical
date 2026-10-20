import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getLanguageFromPath, localizePath, stripLanguage } from '../utils/paths.js'
import { readStoredLanguage } from '../utils/storage.js'
import { DEFAULT_LANGUAGE } from './config.js'
import { LanguageContext } from './LanguageContext.js'
import { getMessage, translate } from './translate.js'
import { isLanguageLoaded, loadLanguage } from './translations/index.js'

// The URL is the source of truth for the active language, so every language
// version has its own indexable address. localStorage only remembers the
// visitor's last explicit choice.
export default function LanguageProvider({ children }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const urlLanguage = getLanguageFromPath(pathname)
  const hasCheckedPreference = useRef(false)

  // A language's dictionary is a separate chunk. main.jsx loads the one for the
  // first page before rendering; after an in-app switch, the page keeps showing
  // the previous language for the moment it takes the new chunk to arrive.
  const [language, setLanguage] = useState(() =>
    isLanguageLoaded(urlLanguage) ? urlLanguage : DEFAULT_LANGUAGE,
  )

  useEffect(() => {
    let isCurrent = true
    loadLanguage(urlLanguage).then(() => {
      if (isCurrent) setLanguage(urlLanguage)
    })
    return () => {
      isCurrent = false
    }
  }, [urlLanguage])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  // On first load only: a returning visitor who chose Tamil and lands on a
  // default-language URL is taken to the Tamil version of the same page.
  useEffect(() => {
    if (hasCheckedPreference.current) return
    hasCheckedPreference.current = true

    const stored = readStoredLanguage()
    if (stored && stored !== DEFAULT_LANGUAGE && urlLanguage === DEFAULT_LANGUAGE) {
      navigate(localizePath(stripLanguage(pathname), stored) + search + hash, { replace: true })
    }
  }, [urlLanguage, pathname, search, hash, navigate])

  const value = useMemo(
    () => ({
      language,
      // t() returns a string; tm() returns the raw entry (array or object).
      t: (key, variables) => translate(language, key, variables),
      tm: (key) => getMessage(language, key),
      localize: (path) => localizePath(path, language),
    }),
    [language],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}
