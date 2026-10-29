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
import mechanicalTesting from '../assets/images/services/mechanical-testing.webp'
import samplePreparation from '../assets/images/services/sample-preparation.webp'
// From the 240px orbit thumbnail, the only welding photograph supplied; a
// larger original would be sharper.
import weldingProcessing from '../assets/images/services/welding-processing.webp'
import semEds from '../assets/images/instruments/sem-eds.webp'
import shoreD from '../assets/images/instruments/shore-d-hardness-tester.webp'
import surfaceRoughness from '../assets/images/instruments/surface-roughness-tester.webp'
import taSdt650 from '../assets/images/instruments/ta-sdt-650.webp'
import universalTestingMachine from '../assets/images/instruments/universal-testing-machine.webp'
import wearTestMachine from '../assets/images/instruments/wear-test-machine.webp'
import xrdSystem from '../assets/images/instruments/xrd-system.webp'

export const INSTRUMENT_IMAGES = {
  'sem-eds': { src: semEds, width: 960, height: 720 },
  'ta-sdt-650': { src: taSdt650, width: 960, height: 720 },
  'universal-testing-machine': { src: universalTestingMachine, width: 960, height: 720 },
  'impact-testing-machine': { src: impactTestingMachine, width: 960, height: 720 },
  'micro-vickers-hardness-tester': { src: microVickers, width: 960, height: 720 },
  'shore-d-hardness-tester': { src: shoreD, width: 960, height: 720 },
  'metallurgical-microscope': { src: metallurgicalMicroscope, width: 960, height: 720 },
  'stereo-digital-microscope': { src: digitalMicroscope, width: 960, height: 720 },
  'contact-angle-measurement-system': { src: digitalMicroscope, width: 960, height: 720 },
  'electrochemical-workstation': { src: electrochemicalWorkstation, width: 960, height: 720 },
  'surface-roughness-tester': { src: surfaceRoughness, width: 960, height: 720 },
  'wear-test-machine': { src: wearTestMachine, width: 960, height: 720 },
  'xrd-system': { src: xrdSystem, width: 960, height: 720 },
}

// Photographs for services with no instrument photograph of their own, keyed by
// service slug. Their alt text is `services.items.<slug>.imageAlt`.
export const SERVICE_IMAGES = {
  'mechanical-testing': { src: mechanicalTesting, width: 960, height: 640 },
  'sample-preparation': { src: samplePreparation, width: 960, height: 640 },
  'welding-processing': { src: weldingProcessing, width: 480, height: 360 },
}

// The photograph for a service card or page, with its alt text: the service's
// instrument photograph if it has one, else its own photograph, else null.
export function getServiceImage(service, t) {
  if (service.image) {
    return {
      image: INSTRUMENT_IMAGES[service.image],
      alt: t(`equipment.items.${service.image}.imageAlt`),
    }
  }
  const image = SERVICE_IMAGES[service.slug] ?? null
  return { image, alt: image ? t(`services.items.${service.slug}.imageAlt`) : '' }
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

// The phone version of the clip and its first frame, made by the same script
// from src/assets/video/lab mobile.mp4. Null without that file; phones then
// get the desktop video.
const heroMobileVideos = import.meta.glob('../assets/video/web/lab-mobile.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
})
export const HERO_VIDEO_MOBILE = Object.values(heroMobileVideos)[0] ?? null

const heroMobilePosters = import.meta.glob('../assets/video/web/lab-mobile-poster.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})
export const HERO_POSTER_MOBILE = Object.values(heroMobilePosters)[0] ?? null

// The lab photograph used for link previews.
export const HERO_IMAGE = INSTRUMENT_IMAGES['metallurgical-microscope']
