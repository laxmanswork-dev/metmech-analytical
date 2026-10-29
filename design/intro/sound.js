// Synthesises the intro's 6.000-second soundtrack as a 48 kHz stereo WAV, timed
// to intro.html: the book opening (0.15-1.6s), a tonal shimmer as the joined
// hands appear (2.0-3.0s), a soft swell as the light fills the frame, and a
// warm finishing chord under "SINCE 2005" (4.5s). Everything is generated, so
// there are no licensed samples to track.
//
//   node design/intro/sound.js out.wav
import { writeFileSync } from 'node:fs'

const RATE = 48000
const SECONDS = 6
const N = RATE * SECONDS
const L = new Float32Array(N)
const R = new Float32Array(N)

let seed = 2005
const noise = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return (seed / 4294967296) * 2 - 1
}
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (t, a, b) => clamp((t - a) / (b - a))
const smooth = (p) => p * p * (3 - 2 * p)

function add(i, v, pan = 0) {
  if (i < 0 || i >= N) return
  L[i] += v * Math.cos(((pan + 1) * Math.PI) / 4)
  R[i] += v * Math.sin(((pan + 1) * Math.PI) / 4)
}

// State-variable band-pass, retuned per sample so sweeps are smooth.
function bandNoise(start, end, freqAt, q, gainAt, pan = 0) {
  let low = 0, band = 0
  for (let i = Math.floor(start * RATE); i < Math.min(N, end * RATE); i++) {
    const t = i / RATE
    const f = 2 * Math.sin((Math.PI * Math.min(freqAt(t), RATE / 6)) / RATE)
    const high = noise() - low - q * band
    band += f * high
    low += f * band
    add(i, band * gainAt(t), typeof pan === 'function' ? pan(t) : pan)
  }
}

function tone(start, freq, dur, gain, { attack = 0.004, partials = [[1, 1]], pan = 0, decay = dur } = {}) {
  const i0 = Math.floor(start * RATE)
  for (let k = 0; k < dur * RATE; k++) {
    const t = k / RATE
    const env = Math.min(1, t / attack) * Math.exp(-t / (decay / 4.5))
    let v = 0
    for (const [mult, amp] of partials) v += amp * Math.sin(2 * Math.PI * freq * mult * t)
    add(i0 + k, v * env * gain, pan)
  }
}

// ---- 1. The book opens --------------------------------------------------
// The cover's angular speed (derivative of the cubic ease in intro.html) drives
// the air and paper rustle, so the sound follows the motion.
const coverSpeed = (t) => {
  const p = seg(t, 0.18, 1.38)
  return p < 0.5 ? 12 * p * p : 12 * (1 - p) * (1 - p)
}
// leather and spine: a low, soft creak as the board lifts
bandNoise(0.12, 0.75, (t) => 260 + 120 * Math.sin(t * 31), 0.08,
  (t) => 0.05 * Math.sin(Math.PI * seg(t, 0.12, 0.75)) * (0.6 + 0.4 * Math.sin(t * 190)), -0.15)
// the air moved by the cover
bandNoise(0.15, 1.5, (t) => 900 + 1400 * coverSpeed(t) / 3, 0.6,
  (t) => 0.11 * coverSpeed(t) / 3, (t) => 0.3 - 0.6 * seg(t, 0.2, 1.4))
// paper rustle of the two turning pages, with a fine crackle
for (const [a, b, pan] of [[0.46, 1.42, 0.25], [0.64, 1.56, 0.1]]) {
  bandNoise(a, b, () => 4200, 0.9, (t) => {
    const p = seg(t, a, b)
    const crackle = 0.55 + 0.45 * Math.abs(Math.sin(t * 263) * Math.sin(t * 97))
    return 0.07 * Math.sin(Math.PI * p) ** 1.5 * crackle
  }, pan)
}
// the board settling on the table, then the pages
for (const [at, g] of [[1.37, 0.32], [1.42, 0.07], [1.56, 0.06]]) {
  const i0 = Math.floor(at * RATE)
  let lp = 0
  for (let k = 0; k < 0.35 * RATE; k++) {
    const t = k / RATE
    const f = 95 - 35 * Math.min(1, t / 0.12)
    lp += 0.08 * (noise() - lp)
    const v = Math.sin(2 * Math.PI * f * t) * Math.exp(-t / 0.07) + lp * 2.2 * Math.exp(-t / 0.018)
    add(i0 + k, v * g, -0.05)
  }
}

// ---- 2. The greeting: a gentle tonal shimmer ----------------------------
// D major pentatonic, rising, with a bell's inharmonic partials.
const bell = [[1, 1], [2.756, 0.28], [5.404, 0.09], [0.5, 0.12]]
const chimes = [
  [2.0, 1174.66, -0.35], [2.1, 1479.98, 0.3], [2.22, 1760.0, -0.15],
  [2.36, 2349.32, 0.2], [2.52, 1318.51, 0.05],
]
for (const [at, f, pan] of chimes) tone(at, f, 1.8, 0.045, { partials: bell, pan, decay: 1.6 })
// a soft pad beneath it
for (const [f, pan] of [[293.66, -0.3], [440, 0.3], [587.33, 0], [739.99, 0.15]]) {
  const i0 = Math.floor(2.0 * RATE)
  for (let k = 0; k < 1.6 * RATE; k++) {
    const t = k / RATE
    const env = smooth(seg(t, 0, 0.5)) * (1 - smooth(seg(t, 0.9, 1.6)))
    const v = Math.sin(2 * Math.PI * f * t + 0.6 * Math.sin(2 * Math.PI * 0.7 * t))
    add(i0 + k, v * env * 0.022, pan)
  }
}
// air as the light sweeps the hands
bandNoise(2.25, 3.05, (t) => 3000 + 5000 * seg(t, 2.25, 2.95), 0.5,
  (t) => 0.035 * Math.sin(Math.PI * seg(t, 2.25, 3.05)), (t) => -0.6 + 1.2 * seg(t, 2.25, 2.95))

// ---- 3. Light fills the frame: a soft rising swell ----------------------
bandNoise(2.45, 3.5, (t) => 500 + 2600 * smooth(seg(t, 2.45, 3.25)), 0.7,
  (t) => 0.07 * smooth(seg(t, 2.45, 3.15)) * (1 - smooth(seg(t, 3.15, 3.5))), 0)
for (const [f, pan] of [[146.83, -0.2], [220, 0.2]]) {
  const i0 = Math.floor(2.6 * RATE)
  for (let k = 0; k < 1.4 * RATE; k++) {
    const t = k / RATE
    const env = smooth(seg(t, 0, 0.6)) * (1 - smooth(seg(t, 0.6, 1.4)))
    add(i0 + k, Math.sin(2 * Math.PI * f * t) * env * 0.03, pan)
  }
}

// ---- 4. The finishing note ----------------------------------------------
// A warm, open D chord with a low bloom and a single clear bell on top.
const chord = [[73.42, 0.16, 0], [110, 0.1, -0.2], [146.83, 0.09, 0.2], [220, 0.06, -0.1],
  [293.66, 0.05, 0.1], [369.99, 0.035, -0.25], [440, 0.03, 0.25]]
for (const [f, g, pan] of chord) {
  const i0 = Math.floor(4.5 * RATE)
  for (let k = 0; k < (SECONDS - 4.5) * RATE; k++) {
    const t = k / RATE
    const env = Math.min(1, t / 0.05) * (0.55 + 0.45 * Math.exp(-t / 0.35))
    const v = Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t) + 0.08 * Math.sin(6 * Math.PI * f * t)
    add(i0 + k, v * env * g, pan)
  }
}
tone(4.5, 44, 0.8, 0.22, { attack: 0.01, decay: 0.7 })
tone(4.52, 587.33, 1.1, 0.05, { partials: bell, pan: -0.1, decay: 1.2 })
tone(4.56, 880, 1.1, 0.035, { partials: bell, pan: 0.15, decay: 1.2 })
// the glint of the light across the name
for (const [at, f, pan] of [[5.05, 2349.32, -0.4], [5.18, 2959.96, 0.1], [5.31, 3520, 0.45]]) {
  tone(at, f, 0.6, 0.014, { partials: bell, pan, decay: 0.9 })
}

// ---- Reverb (Freeverb-style) ---------------------------------------------
function reverb(input, offset) {
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((d) => ({ buf: new Float32Array(d + offset), i: 0, f: 0 }))
  const aps = [556, 441, 341, 225].map((d) => ({ buf: new Float32Array(d + offset), i: 0 }))
  const out = new Float32Array(N)
  for (let n = 0; n < N; n++) {
    const x = input[n] * 0.015
    let y = 0
    for (const c of combs) {
      const o = c.buf[c.i]
      c.f = o * 0.6 + c.f * 0.4
      c.buf[c.i] = x + c.f * 0.86
      c.i = (c.i + 1) % c.buf.length
      y += o
    }
    for (const a of aps) {
      const b = a.buf[a.i]
      a.buf[a.i] = y + b * 0.5
      y = b - y
      a.i = (a.i + 1) % a.buf.length
    }
    out[n] = y
  }
  return out
}
const wetL = reverb(L, 0)
const wetR = reverb(R, 23)

// ---- Mix, fade the last moment, normalise, write -------------------------
const outL = new Float32Array(N)
const outR = new Float32Array(N)
let peak = 0
for (let n = 0; n < N; n++) {
  const t = n / RATE
  const fade = (1 - smooth(seg(t, 5.55, 6))) * smooth(seg(t, 0, 0.02))
  outL[n] = (L[n] + wetL[n] * 1.6) * fade
  outR[n] = (R[n] + wetR[n] * 1.6) * fade
  peak = Math.max(peak, Math.abs(outL[n]), Math.abs(outR[n]))
}
const scale = 0.7 / peak // about -3 dBFS
const data = Buffer.alloc(N * 4)
for (let n = 0; n < N; n++) {
  data.writeInt16LE(Math.round(clamp(outL[n] * scale, -1, 1) * 32767), n * 4)
  data.writeInt16LE(Math.round(clamp(outR[n] * scale, -1, 1) * 32767), n * 4 + 2)
}
const header = Buffer.alloc(44)
header.write('RIFF', 0)
header.writeUInt32LE(36 + data.length, 4)
header.write('WAVEfmt ', 8)
header.writeUInt32LE(16, 16)
header.writeUInt16LE(1, 20)
header.writeUInt16LE(2, 22)
header.writeUInt32LE(RATE, 24)
header.writeUInt32LE(RATE * 4, 28)
header.writeUInt16LE(4, 32)
header.writeUInt16LE(16, 34)
header.write('data', 36)
header.writeUInt32LE(data.length, 40)
writeFileSync(process.argv[2] ?? 'intro.wav', Buffer.concat([header, data]))
