import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from '../i18n/config.js'

// "/about/" -> "/about", "" -> "/"
export function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

// "/ta/about" -> "ta", "/about" -> default language
export function getLanguageFromPath(pathname) {
  const firstSegment = pathname.split('/')[1]
  return firstSegment !== DEFAULT_LANGUAGE && LANGUAGE_CODES.includes(firstSegment)
    ? firstSegment
    : DEFAULT_LANGUAGE
}

// "/ta/about" -> "/about", "/ta" -> "/", "/about" -> "/about"
export function stripLanguage(pathname) {
  const path = normalizePath(pathname)
  const language = getLanguageFromPath(path)
  if (language === DEFAULT_LANGUAGE) return path
  return normalizePath(path.slice(language.length + 1))
}

// ("/about", "ta") -> "/ta/about", ("/", "ta") -> "/ta", ("/about", "en") -> "/about"
export function localizePath(path, language) {
  const normalized = normalizePath(path)
  if (language === DEFAULT_LANGUAGE) return normalized
  return normalized === '/' ? `/${language}` : `/${language}${normalized}`
}
