// The pages of the research capabilities book, in reading order. Every page
// draws its words from the `research` dictionaries and its specimens from
// specimens.js, so the book holds exactly the content the booklets give,
// nothing more. Page numbers are positions in this list, from 1.
//
// In a two-page view pages pair up as spreads (1-2, 3-4, ...), so a
// specimen's text always faces its micrograph: each specimen takes a
// spread, and a two-zone specimen takes two (one zone each), with its
// description on the second.
import { SPECIMENS } from './specimens.js'

// Contents rows per page, and where the reference table breaks (its first
// page also holds its heading).
const CONTENTS_SPLIT = 12
const REFERENCE_BREAKS = [0, 5, 11, 17, 24]

const specimenPages = (specimen) =>
  specimen.zones
    ? [
        { kind: 'specimen', slug: specimen.slug, part: 'heading' },
        { kind: 'plate', slug: specimen.slug, zone: 0 },
        { kind: 'specimen', slug: specimen.slug, part: 'description' },
        { kind: 'plate', slug: specimen.slug, zone: 1 },
      ]
    : [
        { kind: 'specimen', slug: specimen.slug, part: 'all' },
        { kind: 'plate', slug: specimen.slug, zone: 0 },
      ]

export const BOOK_PAGES = [
  { kind: 'title' },
  { kind: 'introduction' },
  { kind: 'preparation' },
  { kind: 'sets' },
  { kind: 'contents', from: 0, to: CONTENTS_SPLIT },
  { kind: 'contents', from: CONTENTS_SPLIT, to: SPECIMENS.length },
  ...SPECIMENS.flatMap(specimenPages),
  ...REFERENCE_BREAKS.slice(0, -1).map((from, index) => ({
    kind: 'reference',
    from,
    to: REFERENCE_BREAKS[index + 1],
  })),
  { kind: 'care' },
  { kind: 'enquiry' },
]

// The page (index in BOOK_PAGES) where each specimen begins, for the
// contents.
export const SPECIMEN_START = Object.fromEntries(
  SPECIMENS.map(({ slug }) => [
    slug,
    BOOK_PAGES.findIndex((page) => page.kind === 'specimen' && page.slug === slug),
  ]),
)

export const SPECIMEN_BY_SLUG = Object.fromEntries(
  SPECIMENS.map((specimen) => [specimen.slug, specimen]),
)
