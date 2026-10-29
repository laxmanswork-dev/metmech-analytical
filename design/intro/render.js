// Renders intro.html to video: 360 frames at 60 fps (exactly 6.000 s) captured
// with Playwright, the soundtrack from sound.js, encoded with ffmpeg-static.
//
//   node design/intro/render.js
//
// Writes design/intro/out/metmech-intro.mp4 (master, with sound) and the
// smaller, silent copies the home page plays (browsers only autoplay muted
// video): src/assets/intro/metmech-intro.mp4 for landscape screens and
// src/assets/intro/metmech-intro-portrait.mp4 for phones held upright, the
// same scene reframed for a tall screen (intro.html?portrait).
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
const assets = path.join(here, '..', '..', 'src', 'assets', 'intro')
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()

// Captures every frame of the scene at the given size into a new folder.
async function renderFrames(viewport, query = '') {
  const work = mkdtempSync(path.join(tmpdir(), 'metmech-intro-'))
  const page = await browser.newPage({ viewport })
  page.on('pageerror', (e) => console.error('page error:', e.message))
  await page.goto(pathToFileURL(path.join(here, 'intro.html')).href + query)
  await page.evaluate(() => window.ready)
  for (let f = 0; f < FRAMES; f++) {
    await page.evaluate((t) => window.seek(t), f / FPS)
    await page.screenshot({ path: path.join(work, `f${String(f).padStart(4, '0')}.png`) })
    if (f % 30 === 0) console.log(`${query || 'landscape'} frame ${f}/${FRAMES}`)
  }
  await page.close()
  return work
}

const video = ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-movflags', '+faststart']
const framesOf = (work) => ['-framerate', String(FPS), '-i', path.join(work, 'f%04d.png')]

// Landscape: the master with sound, the web copy, and the final frame.
const landscape = await renderFrames({ width: 1920, height: 1080 })
const wav = path.join(landscape, 'sound.wav')
execFileSync(process.execPath, [path.join(here, 'sound.js'), wav], { stdio: 'inherit' })
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...framesOf(landscape), '-i', wav, ...video, '-crf', '16',
  '-c:a', 'aac', '-b:a', '192k', '-t', '6', path.join(out, 'metmech-intro.mp4')], { stdio: 'inherit' })
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...framesOf(landscape), ...video, '-crf', '22', '-an',
  path.join(assets, 'metmech-intro.mp4')], { stdio: 'inherit' })
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', path.join(landscape, `f${String(FRAMES - 1).padStart(4, '0')}.png`),
  '-quality', '90', path.join(out, 'metmech-intro-final-frame.webp')], { stdio: 'inherit' })
rmSync(landscape, { recursive: true, force: true })

// Portrait, for phones and other screens narrower than 4:3: rendered at
// 1080 x 2400 (9:20) and encoded at 720 x 1600.
const portrait = await renderFrames({ width: 1080, height: 2400 }, '?portrait')
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...framesOf(portrait), '-vf', 'scale=720:1600:flags=lanczos',
  ...video, '-crf', '23', '-an', path.join(assets, 'metmech-intro-portrait.mp4')], { stdio: 'inherit' })
rmSync(portrait, { recursive: true, force: true })

await browser.close()
console.log(`done: ${out} and ${assets}`)
