import { useCallback, useEffect, useRef } from 'react'
import flipSound from '../../assets/audio/freesound_community-flipcard-91468.mp3'

// The sound of a page turning, for the research book: the supplied recording,
// unaltered, played through Web Audio so it starts on the frame the leaf
// lifts.
//
// The file is fetched and decoded as soon as the book mounts, in an offline
// context (which browsers allow without any interaction), so the sound is
// ready before the first turn and plays synchronously, in the same frame the
// turn starts.
//
// Browsers only allow sound after the visitor has interacted with the page,
// so the audio context that plays it is created (or resumed) on the first
// click, tap or key press. Until then, pages that turn by themselves are
// silent. A new turn fades out a sound still playing rather than stacking a
// second one on it.

// The recording opens with 0.28 s of silence (measured: below -60 dB until
// then); starting there puts the paper sound on the first frame of the turn.
const START_AT = 0.28
// Subtle: the recording peaks at -9 dB.
const VOLUME = 0.4
const FADE = 0.06
// The recording's own rate, so decoding does not resample it.
const SAMPLE_RATE = 44100
// Milliseconds after an interaction during which a context still starting up
// counts as about to run: a sound scheduled on it plays as soon as it does.
const LATE = 250

// Events that count as the visitor interacting, so audio may start. Listened
// for in the capture phase, ahead of the book's own handlers, so the press
// that turns a page can also be the one that allows its sound.
const UNLOCK_EVENTS = ['pointerdown', 'pointerup', 'touchend', 'keydown']

export default function usePageFlipSound() {
  const audio = useRef({ context: null, buffer: null, playing: null, unlocked: 0 })

  useEffect(() => {
    const AudioContext = window.AudioContext ?? window.webkitAudioContext
    const OfflineAudioContext = window.OfflineAudioContext ?? window.webkitOfflineAudioContext
    if (!AudioContext || !OfflineAudioContext) return undefined
    const state = audio.current
    let isMounted = true
    // No sound is better than a broken page: if this fails, the book turns
    // silently.
    fetch(flipSound)
      .then((response) =>
        response.ok ? response.arrayBuffer() : Promise.reject(new Error(String(response.status))),
      )
      .then((bytes) => new OfflineAudioContext(1, 1, SAMPLE_RATE).decodeAudioData(bytes))
      .then((decoded) => {
        if (isMounted) state.buffer = decoded
      })
      .catch(() => {})

    const unlock = () => {
      if (!state.context) {
        try {
          state.context = new AudioContext({ latencyHint: 'interactive' })
        } catch {
          return
        }
      }
      if (state.context.state !== 'running') {
        state.unlocked = performance.now()
        state.context.resume().catch(() => {})
      }
    }
    for (const type of UNLOCK_EVENTS) {
      window.addEventListener(type, unlock, { capture: true, passive: true })
    }

    return () => {
      isMounted = false
      for (const type of UNLOCK_EVENTS) window.removeEventListener(type, unlock, { capture: true })
      state.context?.close().catch(() => {})
      state.context = null
      state.buffer = null
      state.playing = null
    }
  }, [])

  // Before the visitor has interacted there is no context, and the turn is
  // silent. A context the interaction is still starting (Safari resumes
  // asynchronously) takes the sound and plays it the moment it runs.
  return useCallback(() => {
    const { context, buffer, playing, unlocked } = audio.current
    if (!context || !buffer) return
    const isStarting = context.state === 'suspended' && performance.now() - unlocked < LATE
    if (context.state !== 'running' && !isStarting) return
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
}
