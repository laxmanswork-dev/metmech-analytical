// Extracts the photomicrographs from the client's two "Standard Metallographic
// Specimens" booklets and writes the web copies used by the site.
//
//   node design/metallography/extract.mjs "<STD- 24 nos ... .docx>" "<STD- 12 nos-1S.docx>"
//
// Specimens 1-12 come from the 12-specimen booklet, saved a day later with
// revised text and new micrographs for specimens 5 and 6. Specimens 13-24 are
// only in the 24-specimen booklet. Each embedded picture is the microscope's
// own 640x480 export with its scale bar, so the page copies keep that size
// and are only re-encoded. See README.md.
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'

const [set24, set12] = process.argv.slice(2)
if (!set24 || !set12) {
  console.error('Usage: node design/metallography/extract.mjs <24-specimen.docx> <12-specimen.docx>')
  process.exit(1)
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const outDir = path.join(root, 'src/assets/images/metallography')
const bookDir = path.join(outDir, 'book')
mkdirSync(bookDir, { recursive: true })

// [booklet, picture number in word/media, output name]. Pictures are numbered
// in document order; two-zone specimens have two pictures.
const PICTURES = [
  [set12, 1, 'low-carbon-steel'],
  [set12, 2, 'medium-carbon-steel'],
  [set12, 3, 'high-carbon-steel'],
  [set12, 4, 'high-speed-steel'],
  [set12, 5, 'hardened-tempered-steel'],
  [set12, 6, 'grey-cast-iron'],
  [set12, 7, 'malleable-iron'],
  [set12, 8, 'sg-iron'],
  [set12, 9, 'austenitic-stainless-steel'],
  [set12, 10, 'case-carburized-steel-case'],
  [set12, 11, 'case-carburized-steel-core'],
  [set12, 12, 'aluminium-alloy'],
  [set12, 13, 'muntz-metal'],
  [set24, 14, 'brass'],
  [set24, 15, 'white-cast-iron'],
  [set24, 16, 'titanium-alloy'],
  [set24, 17, 'friction-welded-steel-parent'],
  [set24, 18, 'friction-welded-steel-weld'],
  [set24, 19, 'electroplated-component'],
  [set24, 20, 'fusion-welded-steel-parent'],
  [set24, 21, 'fusion-welded-steel-weld'],
  [set24, 22, 'bronze'],
  [set24, 23, 'aa6061-aluminium'],
  [set24, 24, 'magnesium-alloy'],
  [set24, 25, 'powder-metallurgy'],
  [set24, 26, 'bearing-metal'],
  [set24, 27, 'pure-copper'],
]

// The book in the home hero's bolt has a page for every specimen, in booklet
// order. A two-zone specimen shows its first zone (case, parent metal); the
// copy is named after the specimen.
const BOOK_SECOND_ZONES = /-(core|weld)$/
const bookName = (name) => name.replace(/-(case|parent)$/, '')

const work = mkdtempSync(path.join(tmpdir(), 'metallography-'))
try {
  for (const [booklet, number, name] of PICTURES) {
    const png = path.join(work, `${name}.png`)
    writeFileSync(png, execFileSync('unzip', ['-p', booklet, `word/media/image${number}.png`]))
    // Micrographs are fine, noisy texture that WebP cannot shrink much; q74
    // keeps the grain boundaries and scale bar crisp at ~150 KB.
    const webp = (width, quality, file) =>
      execFileSync(ffmpeg, [
        '-y', '-loglevel', 'error', '-i', png,
        '-vf', `scale=${width}:-1:flags=lanczos`,
        '-c:v', 'libwebp', '-quality', String(quality), '-compression_level', '6',
        file,
      ])

    webp(640, 74, path.join(outDir, `${name}.webp`))
    webp(400, 74, path.join(outDir, `${name}-400.webp`))
    // Shown at most about 100px wide on a book page, so 320px covers 3x
    // screens at ~20 KB a page.
    if (!BOOK_SECOND_ZONES.test(name)) webp(320, 74, path.join(bookDir, `${bookName(name)}.webp`))
    console.log(name)
  }
} finally {
  rmSync(work, { recursive: true, force: true })
}
