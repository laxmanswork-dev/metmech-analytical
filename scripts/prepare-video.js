// Runs before `npm run dev` and `npm run build` (see package.json).
//
// The home hero plays a background video that every visitor downloads, so it
// has to be small. Camera and AI-generated footage usually arrives at 20-40 MB.
// This script makes it safe to drop any MP4 into the source folder:
//
//   source   src/assets/video/lab.mp4        yours; never modified
//   output   src/assets/video/web/lab.mp4    compressed, silent, web-sized
//            src/assets/video/web/lab-poster.webp   its first frame
//
// The site only ever uses the output files. They are rebuilt whenever the
// source is newer than they are, and left alone otherwise. With no source the
// existing output is kept, so the site still builds from a fresh checkout that
// does not include the large source file. To remove the video, delete the
// web/ folder.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, renameSync, rmSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const videoDir = path.join(root, 'src', 'assets', 'video')
const source = path.join(videoDir, 'lab.mp4')
const outputDir = path.join(videoDir, 'web')
const video = path.join(outputDir, 'lab.mp4')
const poster = path.join(outputDir, 'lab-poster.webp')

const megabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
const isOlderThanSource = (file) => !existsSync(file) || statSync(file).mtimeMs < statSync(source).mtimeMs

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
function encode(ffmpeg, args, target) {
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

if (existsSync(source) && (isOlderThanSource(video) || isOlderThanSource(poster))) {
  const ffmpeg = await findFfmpeg()

  if (!ffmpeg) {
    console.warn(
      '\nprepare-video: lab.mp4 has changed but no ffmpeg was found, so the hero video was not updated. ' +
        'Run "npm install" to get the bundled encoder.\n',
    )
  } else {
    mkdirSync(outputDir, { recursive: true })
    encode(
      ffmpeg,
      ['-an', '-vf', 'scale=1600:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-f', 'mp4'],
      video,
    )
    encode(ffmpeg, ['-frames:v', '1', '-vf', 'scale=1280:-2', '-c:v', 'libwebp', '-quality', '78', '-f', 'webp'], poster)
    console.log(
      `prepare-video: lab.mp4 (${megabytes(statSync(source).size)}) → web/lab.mp4 (${megabytes(statSync(video).size)}) and web/lab-poster.webp`,
    )
  }
}
