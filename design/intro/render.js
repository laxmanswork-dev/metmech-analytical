// Renders intro.html to video: 360 frames at 60 fps (exactly 6.000 s) captured
// with Playwright, the soundtrack from sound.js, encoded with ffmpeg-static.
//
//   node design/intro/render.js
//
// Writes design/intro/out/metmech-intro.mp4 (master, with sound) and the
// smaller, silent copy the home page plays, src/assets/intro/metmech-intro.mp4
// (browsers only autoplay muted video).
// Playwright is not a project dependency; it resolves from the home folder's
// node_modules on this machine.
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ffmpeg from 'ffmpeg-static'
import { chromium } from 'playwright'

const FPS = 60
const FRAMES = 360
const here = path.dirname(fileURLToPath(import.meta.url))
const out = path.join(here, 'out')
const work = mkdtempSync(path.join(tmpdir(), 'metmech-intro-'))
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
page.on('pageerror', (e) => console.error('page error:', e.message))
await page.goto(pathToFileURL(path.join(here, 'intro.html')).href)
await page.evaluate(() => window.ready)
for (let f = 0; f < FRAMES; f++) {
  await page.evaluate((t) => window.seek(t), f / FPS)
  await page.screenshot({ path: path.join(work, `f${String(f).padStart(4, '0')}.png`) })
  if (f % 30 === 0) console.log(`frame ${f}/${FRAMES}`)
}
await browser.close()

const wav = path.join(work, 'sound.wav')
execFileSync(process.execPath, [path.join(here, 'sound.js'), wav], { stdio: 'inherit' })

const frames = ['-framerate', String(FPS), '-i', path.join(work, 'f%04d.png')]
const video = ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-movflags', '+faststart']
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...frames, '-i', wav, ...video, '-crf', '16',
  '-c:a', 'aac', '-b:a', '192k', '-t', '6', path.join(out, 'metmech-intro.mp4')], { stdio: 'inherit' })
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...frames, ...video, '-crf', '22', '-an',
  path.join(here, '..', '..', 'src', 'assets', 'intro', 'metmech-intro.mp4')], { stdio: 'inherit' })
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', path.join(work, `f${String(FRAMES - 1).padStart(4, '0')}.png`),
  '-quality', '90', path.join(out, 'metmech-intro-final-frame.webp')], { stdio: 'inherit' })

rmSync(work, { recursive: true, force: true })
console.log(`done: ${out}`)
