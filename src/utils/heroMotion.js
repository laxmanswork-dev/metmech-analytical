// The home hero has one pause control, on the orbit. Pressing it pauses the
// orbit and the background video together (WCAG 2.2.2: moving content that
// plays for more than five seconds must be possible to pause). The orbit
// announces the visitor's choice with this event; the hero listens for it.
export const HERO_MOTION_EVENT = 'metmech:hero-motion'

export function announceHeroMotion(paused) {
  window.dispatchEvent(new CustomEvent(HERO_MOTION_EVENT, { detail: { paused } }))
}
