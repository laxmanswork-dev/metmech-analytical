// Instrument images taken from the client's machine documents, keyed by
// instrument slug. Width and height are the intrinsic pixel size, used to
// reserve space and avoid layout shift.
//
// Lab photographs: ta-sdt-650, universal-testing-machine,
// micro-vickers-hardness-tester, shore-d-hardness-tester, metallurgical-microscope.
// The rest are manufacturer product images supplied by the client; confirm
// usage rights or replace them with photographs of the lab's own units.
import digitalMicroscope from '../assets/images/instruments/digital-microscope.webp'
import electrochemicalWorkstation from '../assets/images/instruments/electrochemical-workstation.webp'
import impactTestingMachine from '../assets/images/instruments/impact-testing-machine.webp'
import metallurgicalMicroscope from '../assets/images/instruments/metallurgical-microscope.webp'
import microVickers from '../assets/images/instruments/micro-vickers-hardness-tester.webp'
import semEds from '../assets/images/instruments/sem-eds.webp'
import shoreD from '../assets/images/instruments/shore-d-hardness-tester.webp'
import surfaceRoughness from '../assets/images/instruments/surface-roughness-tester.webp'
import taSdt650 from '../assets/images/instruments/ta-sdt-650.webp'
import universalTestingMachine from '../assets/images/instruments/universal-testing-machine.webp'
import wearTestMachine from '../assets/images/instruments/wear-test-machine.webp'
import xrdSystem from '../assets/images/instruments/xrd-system.webp'

export const INSTRUMENT_IMAGES = {
  'sem-eds': { src: semEds, width: 399, height: 417 },
  'ta-sdt-650': { src: taSdt650, width: 704, height: 527 },
  'universal-testing-machine': { src: universalTestingMachine, width: 251, height: 545 },
  'impact-testing-machine': { src: impactTestingMachine, width: 661, height: 600 },
  'micro-vickers-hardness-tester': { src: microVickers, width: 960, height: 864 },
  'shore-d-hardness-tester': { src: shoreD, width: 293, height: 639 },
  'metallurgical-microscope': { src: metallurgicalMicroscope, width: 706, height: 530 },
  'stereo-digital-microscope': { src: digitalMicroscope, width: 444, height: 459 },
  'contact-angle-measurement-system': { src: digitalMicroscope, width: 444, height: 459 },
  'electrochemical-workstation': { src: electrochemicalWorkstation, width: 960, height: 473 },
  'surface-roughness-tester': { src: surfaceRoughness, width: 360, height: 277 },
  'wear-test-machine': { src: wearTestMachine, width: 377, height: 402 },
  'xrd-system': { src: xrdSystem, width: 251, height: 283 },
}

// Background video for the home hero. Put the footage at
// src/assets/video/lab.mp4; scripts/prepare-video.js compresses it into the
// web/ folder, and that compressed copy is what the site uses. It is looked
// up at build time, so the site builds and runs whether or not it exists:
// with no file this is null and the hero shows its plain navy background.
const heroVideos = import.meta.glob('../assets/video/web/lab.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
})
export const HERO_VIDEO = Object.values(heroVideos)[0] ?? null

// Its first frame, shown while the video loads and in its place for visitors
// who prefer reduced motion. Written by the same script.
const heroPosters = import.meta.glob('../assets/video/web/lab-poster.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})
export const HERO_POSTER = Object.values(heroPosters)[0] ?? null

// The lab photograph used for the about hero and for link previews.
export const HERO_IMAGE = INSTRUMENT_IMAGES['metallurgical-microscope']
