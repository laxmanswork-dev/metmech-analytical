export const DEFAULT_LANGUAGE = 'en'

// `label` is shown in the switcher, `ogLocale` is used for Open Graph metadata.
export const LANGUAGES = [
  { code: 'en', label: 'EN', ogLocale: 'en_IN' },
  { code: 'ta', label: 'தமிழ்', ogLocale: 'ta_IN' },
]

export const LANGUAGE_CODES = LANGUAGES.map((language) => language.code)

export const LANGUAGE_STORAGE_KEY = 'metmech.language'
