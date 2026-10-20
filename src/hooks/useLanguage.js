import { use } from 'react'
import { LanguageContext } from '../i18n/LanguageContext.js'

// Returns { language, t, tm, localize } for the active language.
export function useLanguage() {
  const context = use(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside <LanguageProvider>')
  }
  return context
}
