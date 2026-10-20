import { LANGUAGE_CODES, LANGUAGE_STORAGE_KEY } from '../i18n/config.js'

// localStorage can throw (private mode, blocked site data), so every access is guarded.
export function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return LANGUAGE_CODES.includes(stored) ? stored : null
  } catch {
    return null
  }
}

export function storeLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // The choice still applies through the URL; it just is not remembered.
  }
}
