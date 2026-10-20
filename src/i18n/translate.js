import { DEFAULT_LANGUAGE } from './config.js'
import { translations } from './translations/index.js'

function lookup(dictionary, key) {
  return key.split('.').reduce((node, part) => node?.[part], dictionary)
}

// Returns the raw dictionary entry for a dotted key such as "home.process.steps":
// a string, an array or an object. Falls back to the default language.
export function getMessage(language, key) {
  const value = lookup(translations[language], key) ?? lookup(translations[DEFAULT_LANGUAGE], key)

  if (value === undefined && import.meta.env.DEV) {
    console.warn(`Missing translation: "${key}" (${language})`)
  }
  return value
}

// Resolves a key to a string. `{name}` placeholders are replaced from `variables`.
// A missing key returns the key itself so the gap is visible.
export function translate(language, key, variables) {
  const value = getMessage(language, key)
  if (typeof value !== 'string') return key
  if (!variables) return value
  return value.replace(/\{(\w+)\}/g, (match, name) => variables[name] ?? match)
}
