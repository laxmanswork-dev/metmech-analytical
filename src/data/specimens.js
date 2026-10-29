// The client's standard metallographic specimen sets, from the two
// "Standard Metallographic Specimens" booklets (a 24-specimen set and a
// 12-specimen set holding specimens 1-12). Names, etchants and descriptions
// are in the dictionaries under `research.specimens.<slug>`; magnification is
// language-neutral and stays here.
//
// Micrographs are the booklets' own 640x480 microscope exports with their
// scale bars, extracted by design/metallography/extract.mjs. A two-zone
// specimen lists its `zones`; each zone has its own micrograph, and its label
// is `research.zones.<zone>`.

const PICTURES = import.meta.glob('../assets/images/metallography/*.webp', {
  eager: true,
  import: 'default',
})
const BOOK_PICTURES = import.meta.glob('../assets/images/metallography/book/*.webp', {
  eager: true,
  import: 'default',
})

const picture = (name) => ({
  src: PICTURES[`../assets/images/metallography/${name}.webp`],
  srcSmall: PICTURES[`../assets/images/metallography/${name}-400.webp`],
  width: 640,
  height: 480,
})

// The number of specimens in each set. The smaller set is specimens 1-12.
export const SPECIMEN_SETS = { full: 24, compact: 12 }

export const SPECIMEN_GROUPS = ['steels', 'castIrons', 'nonFerrous', 'joiningCoatings']

const LIST = [
  { slug: 'low-carbon-steel', group: 'steels', magnification: '200X' },
  { slug: 'medium-carbon-steel', group: 'steels', magnification: '200X' },
  { slug: 'high-carbon-steel', group: 'steels', magnification: '200X' },
  { slug: 'high-speed-steel', group: 'steels', magnification: '500X' },
  { slug: 'hardened-tempered-steel', group: 'steels', magnification: '500X' },
  { slug: 'grey-cast-iron', group: 'castIrons', magnification: '100X' },
  { slug: 'malleable-iron', group: 'castIrons', magnification: '100X' },
  { slug: 'sg-iron', group: 'castIrons', magnification: '100X' },
  { slug: 'austenitic-stainless-steel', group: 'steels', magnification: '100X' },
  { slug: 'case-carburized-steel', group: 'steels', magnification: '100X', zones: ['case', 'core'] },
  { slug: 'aluminium-alloy', group: 'nonFerrous', magnification: '100X' },
  { slug: 'muntz-metal', group: 'nonFerrous', magnification: '100X' },
  { slug: 'brass', group: 'nonFerrous', magnification: '100X' },
  { slug: 'white-cast-iron', group: 'castIrons', magnification: '100X' },
  { slug: 'titanium-alloy', group: 'nonFerrous', magnification: '100X' },
  {
    slug: 'friction-welded-steel',
    group: 'joiningCoatings',
    magnification: '100X',
    zones: ['parent', 'weld'],
  },
  { slug: 'electroplated-component', group: 'joiningCoatings', magnification: '100X' },
  {
    slug: 'fusion-welded-steel',
    group: 'joiningCoatings',
    magnification: '100X',
    zones: ['parent', 'weld'],
  },
  { slug: 'bronze', group: 'nonFerrous', magnification: '100X' },
  { slug: 'aa6061-aluminium', group: 'nonFerrous', magnification: '100X' },
  { slug: 'magnesium-alloy', group: 'nonFerrous', magnification: '100X' },
  { slug: 'powder-metallurgy', group: 'joiningCoatings', magnification: '100X' },
  { slug: 'bearing-metal', group: 'joiningCoatings', magnification: '100X' },
  { slug: 'pure-copper', group: 'nonFerrous', magnification: '200X' },
]

// `number` is the specimen's number in the booklets; `inCompactSet` says
// whether the 12-specimen set includes it.
export const SPECIMENS = LIST.map((specimen, index) => ({
  ...specimen,
  number: index + 1,
  inCompactSet: index < SPECIMEN_SETS.compact,
  pictures: (specimen.zones ?? [null]).map((zone) => ({
    zone,
    ...picture(zone ? `${specimen.slug}-${zone}` : specimen.slug),
  })),
}))

// The pages of the book inside the bolt at the centre of the home hero: one
// spread per specimen, in booklet order. A two-zone specimen shows its first
// zone. The pictures are 320px copies (design/metallography/extract.mjs).
export const BOOK_PAGES = SPECIMENS.map(({ slug, number, magnification }) => ({
  slug,
  number,
  magnification,
  src: BOOK_PICTURES[`../assets/images/metallography/book/${slug}.webp`],
  width: 320,
  height: 240,
}))
