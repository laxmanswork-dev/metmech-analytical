// Runs before every build (see "prebuild" in package.json).
//
// src/data/images.js records each photograph's pixel size, which the image
// frames use to shape the photo's box. When a photo is replaced and the size
// is not updated, the new photo is shown squeezed into the old shape, small
// and surrounded by white space. This compares every recorded size with the
// file's real size, read from its header, and stops the build on a mismatch.
//
//   node scripts/check-image-sizes.js        report, and fail on a mismatch
//   node scripts/check-image-sizes.js --fix  write the real sizes into images.js
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataFile = path.join(root, 'src/data/images.js')
const fix = process.argv.includes('--fix')

// Width and height from a PNG, JPEG or WebP header.
function imageSize(bytes) {
  if (bytes.toString('ascii', 1, 4) === 'PNG') {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), format: 'PNG' }
  }
  const chunk = bytes.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') {
    return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff, format: 'WebP' }
  }
  if (chunk === 'VP8L') {
    const bits = bytes.readUInt32LE(21)
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1, format: 'WebP' }
  }
  if (chunk === 'VP8X') {
    return { width: 1 + bytes.readUIntLE(24, 3), height: 1 + bytes.readUIntLE(27, 3), format: 'WebP' }
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2
    while (offset < bytes.length) {
      const marker = bytes[offset + 1]
      const length = bytes.readUInt16BE(offset + 2)
      if (marker >= 0xc0 && marker <= 0xc3) {
        return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5), format: 'JPEG' }
      }
      offset += 2 + length
    }
  }
  return null
}

let source = await readFile(dataFile, 'utf8')
const imports = Object.fromEntries(
  [...source.matchAll(/import (\w+) from '\.\.\/(.+?)'/g)].map(([, name, file]) => [name, path.join(root, 'src', file)]),
)
const problems = []
const entries = [...source.matchAll(/'([\w-]+)': \{ src: (\w+), width: (\d+), height: (\d+)/g)]

for (const [entry, key, variable, width, height] of entries) {
  const file = imports[variable]
  if (!file) continue
  const size = imageSize(await readFile(file))
  if (!size) {
    problems.push(`${key}: could not read the size of ${path.relative(root, file)}`)
    continue
  }
  if (size.format === 'PNG' && file.endsWith('.webp')) {
    console.warn(`Note: ${path.relative(root, file)} is a PNG saved under a .webp name; convert it to WebP to keep the page light.`)
  }
  if (+width === size.width && +height === size.height) continue
  problems.push(`${key}: images.js says ${width}x${height}, the file is ${size.width}x${size.height}`)
  if (fix) {
    source = source.replace(entry, `'${key}': { src: ${variable}, width: ${size.width}, height: ${size.height}`)
  }
}

if (fix && problems.length) {
  await writeFile(dataFile, source)
  console.log(`Updated ${problems.length} image size(s) in src/data/images.js:\n  ${problems.join('\n  ')}`)
} else if (problems.length) {
  console.error(
    `\nImage sizes in src/data/images.js do not match the files:\n  ${problems.join('\n  ')}\n` +
      'Run "node scripts/check-image-sizes.js --fix" to update them.\n',
  )
  process.exit(1)
} else {
  console.log(`Image sizes: all ${entries.length} match their files.`)
}
