// The six testing categories that circle the central instrument in the home
// hero, in the order they reach the highlighted position. `slug` matches a
// service in services.js; the label is that service's title and the
// description is `home.orbit.items.<slug>` in the dictionaries.
//
// Thumbnails are 240px square crops of the client's equipment photographs.
// `image: null` means no suitable photograph has been supplied yet, and an
// icon is shown instead.
import hardness from '../assets/images/orbit/hardness-testing.webp'
import characterization from '../assets/images/orbit/material-characterization.webp'
import mechanical from '../assets/images/orbit/mechanical-testing.webp'
import semCutout from '../assets/images/orbit/sem-cutout.webp'
import surface from '../assets/images/orbit/surface-corrosion-testing.webp'
import thermal from '../assets/images/orbit/thermal-analysis.webp'

export const ORBIT_ITEMS = [
  { slug: 'mechanical-testing', image: mechanical },
  { slug: 'hardness-testing', image: hardness },
  { slug: 'material-characterization', image: characterization },
  { slug: 'thermal-analysis', image: thermal },
  { slug: 'surface-corrosion-testing', image: surface },
  { slug: 'welding-processing', image: null },
]

export const ORBIT_THUMBNAIL_SIZE = 240

// Zeiss Sigma SEM with its white background removed, so it sits directly on the hero.
export const ORBIT_CENTRE_IMAGE = { src: semCutout, width: 399, height: 417 }
