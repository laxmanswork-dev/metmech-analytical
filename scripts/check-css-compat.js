// Last build step: fails the build if the CSS in dist/ has a media query that
// older browsers drop without any error.
//
// - Range syntax, "(width>=56rem)": ignored by Safari before 16.4. The minifier
//   writes it unless the target in vite.config.js is low enough.
// - An aspect ratio as a bare number, "(min-aspect-ratio:1)": ignored by Chrome
//   109 (the last version for Windows 7) and earlier. The minifier shortens
//   "1/1" to this whatever the target, so write such a query another way, such
//   as (orientation: landscape). It left the research book with no size at all.
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const assets = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/assets')
const UNSAFE_QUERY = /@media[^{]*([<>]=?|aspect-ratio:[\d.]+\))[^{]*\{/g

const files = (await readdir(assets)).filter((file) => file.endsWith('.css'))
const found = []
for (const file of files) {
  const css = await readFile(path.join(assets, file), 'utf8')
  found.push(...(css.match(UNSAFE_QUERY) ?? []).map((query) => `${file}: ${query}`))
}

if (found.length > 0) {
  console.error(`Media queries older browsers ignore, in the built CSS:\n${found.join('\n')}`)
  process.exit(1)
}
console.log(`Checked ${files.length} CSS files: no unsafe media queries`)
