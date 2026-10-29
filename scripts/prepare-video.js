// Runs before `npm run dev` and `npm run build` (see package.json).
//
// The home hero plays a background video that every visitor downloads, so it
// has to be small. Camera and AI-generated footage usually arrives at 20-40 MB.
// This script makes it safe to drop any MP4 into the source folder:
//
//   source   src/assets/video/lab.mp4             yours; never modified
//   output   src/assets/video/web/lab.mp4         compressed, silent, web-sized
//            src/assets/video/web/lab-poster.webp its first frame
//
//   source   src/assets/video/lab mobile.mp4      yours; never modified
//   output   src/assets/video/web/lab-mobile.mp4         the same, for phones
//            src/assets/video/web/lab-mobile-poster.webp its first frame
//
// The phone clip is a portrait picture centred in a 1920x1080 frame. It is
// compressed at that full size, unscaled, so the picture itself keeps all of
// its roughly 600 pixels of width; the black sides cost almost nothing and
// fall outside the tall phone hero.
//
// The site only ever uses the output files. They are rebuilt whenever their
// source is newer than they are, and left alone otherwise. With no source the
// existing output is kept, so the site still builds from a fresh checkout that
// does not include the large source files. To remove a video, delete its
// output files.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, renameSync, rmSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const videoDir = path.join(root, 'src', 'assets', 'video')
const outputDir = path.join(videoDir, 'web')

const CLIPS = [
  { source: 'lab.mp4', video: 'lab.mp4', poster: 'lab-poster.webp', scale: ['-vf', 'scale=1600:-2'] },
  { source: 'lab mobile.mp4', video: 'lab-mobile.mp4', poster: 'lab-mobile-poster.webp', scale: [] },
]

const megabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
const isOlderThan = (file, source) => !existsSync(file) || statSync(file).mtimeMs < statSync(source).mtimeMs

// The bundled encoder if it is installed, otherwise one on the PATH.
async function findFfmpeg() {
  try {
    const { default: bundled } = await import('ffmpeg-static')
    if (bundled && existsSync(bundled)) return bundled
  } catch {
    // Not installed; fall through to the PATH.
  }
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' })
    return 'ffmpeg'
  } catch {
    return null
  }
}

// Encodes to a temporary file and then moves it into place, so a failed or
// interrupted encode never leaves a broken file where the site expects one.
function encode(ffmpeg, source, args, target) {
  const temporary = path.join(outputDir, `encoding-${path.basename(target)}`)
  try {
    execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, ...args, temporary], {
      stdio: 'inherit',
    })
    rmSync(target, { force: true })
    renameSync(temporary, target)
  } finally {
    rmSync(temporary, { force: true })
  }
}

let ffmpeg

for (const clip of CLIPS) {
  const source = path.join(videoDir, clip.source)
  const video = path.join(outputDir, clip.video)
  const poster = path.join(outputDir, clip.poster)
  if (!existsSync(source) || (!isOlderThan(video, source) && !isOlderThan(poster, source))) continue

  ffmpeg ??= await findFfmpeg()
  if (!ffmpeg) {
    console.warn(
      `\nprepare-video: ${clip.source} has changed but no ffmpeg was found, so the hero video was not updated. ` +
        'Run "npm install" to get the bundled encoder.\n',
    )
    continue
  }

  mkdirSync(outputDir, { recursive: true })
  encode(
    ffmpeg,
    source,
    ['-an', ...clip.scale, '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-f', 'mp4'],
    video,
  )
  encode(ffmpeg, source, ['-frames:v', '1', '-vf', 'scale=1280:-2', '-c:v', 'libwebp', '-quality', '78', '-f', 'webp'], poster)
  console.log(
    `prepare-video: ${clip.source} (${megabytes(statSync(source).size)}) → web/${clip.video} (${megabytes(statSync(video).size)}) and web/${clip.poster}`,
  )
}
