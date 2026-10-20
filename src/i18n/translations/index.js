import en from './en/index.js'

// Dictionaries that are loaded and ready to use. English is always present
// because it is the default language and the fallback for missing keys.
export const translations = { en }

// Other languages are separate chunks, fetched only when a visitor needs them.
const loaders = {
  ta: () => import('./ta/index.js'),
}

export const isLanguageLoaded = (code) => code in translations

// Makes a language's dictionary available. Safe to call more than once.
export async function loadLanguage(code) {
  if (isLanguageLoaded(code) || !loaders[code]) return
  translations[code] = (await loaders[code]()).default
}
