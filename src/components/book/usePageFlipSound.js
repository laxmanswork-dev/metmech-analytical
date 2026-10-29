import { useCallback, useEffect, useRef } from 'react'
import flipSound from '../../assets/audio/freesound_community-flipcard-91468.mp3'

// The sound of a page turning, for the research book: the supplied recording,
// unaltered, played through Web Audio so it starts on the frame the leaf
// lifts. The file is fetched when the book mounts.
//
// Browsers only allow sound after the visitor has interacted with the page,
// so nothing touches audio until the first click, tap or key press: that
// creates the audio context and decodes the sound. Until then, pages that
// turn by themselves are silent. A new turn fades out a sound still playing
// rather than stacking a second one on it.

// The recording opens with a quarter second of near silence; starting just
// before the paper sound puts it on the first frame of the turn.
const START_AT = 0.25
// Subtle: the recording peaks at -9 dB.
const VOLUME = 0.4
const FADE = 0.06
// Milliseconds after a turn starts beyond which its sound is left out.
const LATE = 250

// Events that count as the visitor interacting, so audio may start. Listened
// for in the capture phase, ahead of the book's own keyboard handling, so the
// key press that turns a page can also be the one that allows its sound.
const UNLOCK_EVENTS = ['pointerup', 'touchend', 'keydown']

export default function usePageFlipSound() {
  const audio = useRef({ context: null, buffer: null, playing: null })

  useEffect(() => {
    const AudioContext = window.AudioContext ?? window.webkitAudioContext
    if (!AudioContext) return undefined
    const state = audio.current
    // No sound is better than a broken page: if this fails, the book turns
    // silently.
    const data = fetch(flipSound).then((response) =>
      response.ok ? response.arrayBuffer() : Promise.reject(new Error(String(response.status))),
    )
    data.catch(() => {})

    const unlock = () => {
      if (state.context) {
        if (state.context.state === 'suspended') state.context.resume().catch(() => {})
        return
      }
      const context = new AudioContext()
      state.context = context
      state.buffer = data.then((bytes) => context.decodeAudioData(bytes.slice(0)))
      state.buffer.catch(() => {})
    }
    for (const type of UNLOCK_EVENTS) {
      window.addEventListener(type, unlock, { capture: true, passive: true })
    }

    return () => {
      for (const type of UNLOCK_EVENTS) window.removeEventListener(type, unlock, { capture: true })
      state.context?.close().catch(() => {})
      state.context = null
      state.buffer = null
      state.playing = null
    }
  }, [])

  const start = useCallback((buffer) => {
    const { context, playing } = audio.current
    if (!context || context.state !== 'running') return
    const now = context.currentTime
    if (playing) {
      playing.gain.gain.setTargetAtTime(0, now, FADE / 3)
      playing.source.stop(now + FADE)
    }
    const source = context.createBufferSource()
    source.buffer = buffer
    const gain = context.createGain()
    gain.gain.value = VOLUME
    source.connect(gain).connect(context.destination)
    source.start(now, START_AT)
    const sound = { source, gain }
    audio.current.playing = sound
    source.onended = () => {
      if (audio.current.playing === sound) audio.current.playing = null
    }
  }, [])

  // Before the visitor has interacted there is no context, and the turn is
  // silent. Right after the first interaction the sound may still be
  // decoding: it plays when ready, if that is quick enough to match the turn.
  return useCallback(() => {
    const { context, buffer } = audio.current
    if (!context || !buffer) return
    const asked = performance.now()
    buffer
      .then((decoded) => {
        if (performance.now() - asked < LATE) start(decoded)
      })
      .catch(() => {})
  }, [start])
}
