// The geometry and light of a turning page, shared by the home hero's
// specimen book (components/orbit/SpecimenBook.jsx) and the research book
// (components/book/ResearchBook.jsx).
//
// A leaf is a chain of hinged strips, each turned a little further than the
// one before it, so the paper curls up from the binding and its free edge
// trails as it settles. Each strip's two faces hold a shading layer marked
// `data-shade`; its opacity is set here for the angle the face meets the
// light at.

// The light falls from the upper left and in front, as on the bolt and ring.
const LIGHT = normalize([-0.5, -0.45, 1])
const FLAT = LIGHT[2]

function normalize([x, y, z]) {
  const length = Math.hypot(x, y, z)
  return [x / length, y / length, z / length]
}

// Soft start, soft landing.
export const ease = (p) => p * p * p * (p * (p * 6 - 15) + 10)

// Poses a leaf at `turn`, from 0 (lying on the right) to 1 (lying on the
// left). `bend` is how far, in degrees, the free edge leads the binding as
// the leaf lifts (and trails it as it lands). Returns the leaf's angle at the
// binding, in degrees.
export function curlLeaf(strips, turn, bend) {
  const angle = 180 * ease(turn)
  // Positive while lifting (the edge leads), negative while landing (it
  // trails), nothing at rest.
  const curl = bend * Math.sin(Math.PI * turn) * (1 - 1.65 * turn)
  const count = strips.length
  let previous = 0
  for (let i = 0; i < count; i += 1) {
    const strip = strips[i]
    if (!strip) continue
    // Most of the curl is close to the binding.
    const share = 1 - (1 - (i + 1) / count) ** 2
    const absolute = Math.min(180, Math.max(0, angle + curl * share))
    strip.style.transform = `rotateY(${(previous - absolute).toFixed(3)}deg)`
    previous = absolute

    const radians = (absolute * Math.PI) / 180
    const facing = LIGHT[0] * -Math.sin(radians) + LIGHT[2] * Math.cos(radians)
    const [front, back] = shadesOf(strip)
    if (front) front.style.opacity = shadeFor(facing)
    if (back) back.style.opacity = shadeFor(-facing)
  }
  return angle
}

// The shadow a lifted leaf casts on the page it leaves and the page it lands
// on, most strongly where it is closest to them. `casts` holds the two
// shadow layers; each reads --reach for how far the shadow spreads.
export function castShadows(casts, angle, strength = 0.55) {
  const lift = Math.sin((angle * Math.PI) / 180)
  const reach = `${(Math.abs(Math.cos((angle * Math.PI) / 180)) * 100).toFixed(1)}%`
  const onRight = angle < 90
  for (const [side, isLit] of [
    ['right', onRight],
    ['left', !onRight],
  ]) {
    const cast = casts[side]
    if (!cast) continue
    cast.style.opacity = isLit ? (strength * lift).toFixed(3) : '0'
    cast.style.setProperty('--reach', reach)
  }
}

// A strip's two shading layers, front and back. Set directly rather than
// through an inherited property, so a frame restyles only these two
// elements, not the page beneath them.
const SHADES = new WeakMap()
function shadesOf(strip) {
  let shades = SHADES.get(strip)
  if (!shades || !shades[0]?.isConnected) {
    shades = [
      ':scope > [data-face="front"] [data-shade]',
      ':scope > [data-face="back"] [data-shade]',
    ].map((selector) => strip.querySelector(selector))
    SHADES.set(strip, shades)
  }
  return shades
}

// How much darker than a page lying flat a face is at this angle to the
// light. Paper is matt and the room is lit too, so it never goes far.
function shadeFor(facing) {
  const brightness = 0.55 + 0.45 * Math.max(0, facing)
  const flat = 0.55 + 0.45 * FLAT
  return Math.min(0.5, Math.max(0, 1 - brightness / flat)).toFixed(3)
}
