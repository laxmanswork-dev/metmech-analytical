// The company owner, shown in the portrait beside "Who We Are" on the about page.
// Fill these in only from the client's own confirmation; never guess.
//
// name         Full name exactly as the client supplies it. Shown unchanged in
//              both languages. REQUIRED: still to be confirmed by the client.
//              (The company description lists "Jayaraj M & Prem Kumar P" as
//              contacts, but does not say who the owner is.)
// designation  Professional designation in each language, e.g. { en: '...', ta: '...' }.
//              Leave a language empty to show no designation in it.
// photo        The portrait. Until the client supplies one, leave it null and
//              the frame stays empty. To add it, save the photograph as a 4:5
//              portrait (e.g. 800 x 1000) in src/assets/images/, then:
//                import ownerPhoto from '../assets/images/owner.webp'
//                photo: { src: ownerPhoto, width: 800, height: 1000 },
//              A photo of another shape fills the frame and is trimmed evenly
//              from the edges; add `position: 'center top'` to keep the top.
//              The current photo is the client's passport-style portrait, its
//              scan border trimmed; it is small, so it is used at its own size.
import ownerPhoto from '../assets/images/owner.webp'

export const OWNER = {
  name: '',
  designation: { en: '', ta: '' },
  photo: { src: ownerPhoto, width: 320, height: 400 },
}
