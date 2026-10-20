# Metmech Analytical Engineers — Website

Bilingual (English / Tamil) website for Metmech Analytical Engineers, a material
testing and analytical engineering lab in Chennai. Developed by NIVLAK Technologies.

Production domain: https://metmechresearch.com

## Stack

- React 19 + Vite 8, JavaScript (JSX)
- React Router 8 (declarative mode)
- CSS Modules with global design tokens
- Lucide React icons
- Self-hosted Inter and Noto Sans Tamil (Fontsource)
- oxlint with the React and jsx-a11y plugins

Requires Node.js 20.19+ (developed on Node 24).

## Commands

| Command           | What it does                                                       |
| ----------------- | ------------------------------------------------------------------ |
| `npm install`     | Install dependencies                                               |
| `npm run dev`     | Start the development server                                       |
| `npm run build`   | Client build, server build, then prerender every page into `dist/` |
| `npm run preview` | Serve the production build locally                                 |
| `npm run lint`    | Lint the project                                                   |

`npm run preview` serves a page's own HTML file only when the URL ends in a
slash (`/about/`). Without it, the preview server sends the home page file and
the app re-renders in the browser. Real static hosts do not have this quirk.

## Configuration

| Variable               | Where              | Purpose                                              |
| ---------------------- | ------------------ | ---------------------------------------------------- |
| `VITE_SITE_URL`        | `.env.production`  | Production origin for canonical URLs and the sitemap |
| `VITE_ENQUIRY_API_URL` | not set yet        | Public address of the enquiry API (see below)        |

`VITE_` variables are embedded in the public bundle. Never put secrets in them.

## Pages

| Page                 | Path (Tamil adds `/ta`)       |
| -------------------- | ----------------------------- |
| Home                 | `/`                           |
| About Us             | `/about`                      |
| Testing Services     | `/testing-services`           |
| Service detail (8)   | `/testing-services/<slug>`    |
| Equipment            | `/equipment`                  |
| Instrument detail (13) | `/equipment/<slug>`         |
| Industries           | `/industries`                 |
| Contact / Request a Test | `/contact`                |
| Privacy Policy       | `/privacy-policy`             |

28 pages per language, 56 in total, plus `404.html`.

## Structure

```
scripts/prerender.js      Writes static HTML per page and language, 404.html, sitemap.xml
src/
  main.jsx                Browser entry (hydrates prerendered pages)
  entry-server.jsx        Build-time entry used by the prerender script
  routes/pages.js         Paths, navigation and the full page list
  routes/AppRoutes.jsx    Registers each page once per language
  data/                   site.js (contact details), services.js, instruments.js,
                          industries.js, images.js
  i18n/translations/      en/ and ta/ dictionaries, one file per area
  pages/                  One component per page type
  sections/               Larger blocks shared between pages
  components/layout/      Header, Footer, Container, Section, Grid, SiteLayout
  components/common/      Cards, PageHero, Breadcrumbs, SpecTable, FaqList, Seo, …
  components/forms/       EnquiryForm, FormField
  hooks/ utils/ styles/   Language hook, path and form helpers, tokens and base CSS
```

### Where content lives

- **Wording** is in `src/i18n/translations/en/*.js` and `ta/*.js`. The two sets
  must keep the same keys. Components read text with `t('key')` (a string) or
  `tm('key')` (an array or object).
- **Structure** (which services exist, which instrument belongs to which
  service, specification values) is in `src/data/`.
- **Contact details** are in `src/data/site.js`; the displayed address is in
  the `contact` dictionaries so it can be shown in Tamil.

### Adding a service or instrument

1. Add an entry to `src/data/services.js` or `src/data/instruments.js`.
2. Add its text under `services.items.<slug>` or `equipment.items.<slug>` in
   **both** languages.
3. For an instrument, add its image to `src/assets/images/instruments/` and
   register it in `src/data/images.js`.

Routes, cards, the footer, prerendering and the sitemap pick it up automatically.

## Header

One sticky row (`src/components/layout/Header.jsx`):

- **Left:** logo, company name and "A Research Lab".
- **Centre:** Home · Our Services · About Us · Contact. "Our Services" is a
  dropdown (`src/components/navigation/NavDropdown.jsx`) holding Testing
  Services, Equipment and Industries. The grouping is `HEADER_NAV` in
  `src/routes/pages.js`; every page keeps its own route, and the footer
  still links all of them directly.
- **Right:** one outlined group with the language selection and "Start a
  Request", which leads to the enquiry form on the contact page.

Phone and email are not in the header; they are in the footer and on the
contact page.

- **1200px and wider:** everything sits on the bar (80px tall), in both languages.
- **768–1199px:** the links move into a menu; the right-hand group stays on the bar.
- **Below 768px:** the right-hand group moves into the menu as well.
- The header's height is the `--header-height` token in `src/styles/tokens.css`,
  which the full-screen home hero subtracts from the viewport. Change both together.

## Home hero: orbit animation and background video

The right side of the home hero is `src/components/orbit/ScientificOrbit.jsx`:
six testing categories circling a central instrument.

- **Content** comes from `src/data/orbit.js` (order and thumbnails) and
  `home.orbit` in the dictionaries (descriptions, and `labelLines`: the lines
  each service title is set on inside its circle).
- **Motion is CSS only.** One animation turns the ring; each category's
  emphasis and caption share its duration, offset by the category's position,
  so image, label and caption cannot fall out of step. Change the speed with
  `--duration` in `ScientificOrbit.module.css` (30s per revolution).
- **Interaction.** Hover or keyboard focus highlights a category; click or tap
  pins it; the pause button, a second click or Escape releases it. The orbit
  also pauses when scrolled out of view.
- **Reduced motion** shows a still composition; categories can still be selected.
- **Small screens** (under 640px) hide the names inside the circles, which
  are too small there to carry readable text, and rely on the caption below.

**Background video.** The hero plays `src/assets/video/lab.mp4`, muted and
looping, with `lab-poster.webp` as its still frame. Both are found
automatically at build time; the README in that folder explains how to
replace and compress them. One flat navy layer (74% strength) covers the whole
hero so white text and the animation stay readable; its strength is a single
value in `src/sections/HomeHero.module.css`. Visitors who prefer reduced
motion see the poster frame instead of the video. The uncompressed original is
kept in `design/video/`.

## Languages

- English is at the plain path (`/about`), Tamil under `/ta` (`/ta/about`).
  The URL decides the language, so each version is separately indexable, with
  its own title, description, canonical URL and reciprocal `hreflang` links.
- The EN / தமிழ் switcher links to the same page in the other language. The
  choice is saved in `localStorage`; a returning Tamil visitor who lands on an
  English URL is taken to the Tamil version once, on load.
- The Tamil dictionary is a separate file that is only downloaded for Tamil pages.

## Enquiry form and backend

No enquiry API exists yet, so the form does **not** pretend to submit. With
`VITE_ENQUIRY_API_URL` empty it validates the input and then opens the visitor's
email app with the enquiry filled in, addressed to the first address in
`EMAILS`. It says so on the page.

To switch to real submission, build an endpoint and set `VITE_ENQUIRY_API_URL`
to its public URL. The form then sends:

```
POST <VITE_ENQUIRY_API_URL>
Content-Type: application/json

{ "name", "company", "email", "phone", "requirement", "material",
  "message", "consent": true, "language": "en" | "ta" }
```

Any 2xx response shows the success message; anything else shows the failure
message and keeps what the visitor typed.

The API must:

- validate every field again on the server (browser checks can be bypassed);
- reject requests without `consent: true`;
- add spam protection (rate limiting, and a CAPTCHA or similar if needed);
- allow cross-origin requests from the website's domain if hosted elsewhere;
- keep email or database credentials in server-side environment variables only.

## SEO and deployment

`npm run build` prerenders every page in both languages to its own HTML file
with real content, title, description, Open Graph tags, canonical URL,
`hreflang` links and `lang` attribute. It also writes `sitemap.xml` and adds the
sitemap line to `robots.txt`. Structured data (LocalBusiness on the home and
contact pages, BreadcrumbList on inner pages) uses only supplied facts.

When hosting is chosen:

- **Static hosting.** `dist/` can be served by any static host. Unknown URLs
  should return `404.html` with a 404 status.
- **Trailing slashes.** Canonical URLs have no trailing slash. Configure the
  host to serve `/about` directly rather than redirecting to `/about/`, or
  change the canonical format to match.
- **Search Console.** Verify the domain and submit `/sitemap.xml` after launch.

## Open questions for the client

Nothing below has been guessed; each item is either omitted or marked as
awaiting confirmation on the site.

**Facts that conflict between the supplied documents**

- TA SDT 650 upper temperature: one document says 800 °C, another 1500 °C.
  Shown as "Awaiting confirmation".
- Micro Vickers hardness tester make: one document says LABTT THV-1MPE, another
  HDNS-Kelly. Make omitted.
- Electrochemical workstation model: CS310M in one document, CS350M in another.
  Model omitted.
- SEM beam current: the document gives both "4 pA to 20 nA" and, in a second
  block that appears to describe a different column, "1 pA to 400 nA". The
  first is shown.
- Impact tester: the machine document describes an Izod unit; the test list
  offers "Izod and Charpy". The service lists both; the instrument page says Izod.

**Facts not supplied**

- Which instruments are in the lab and which analyses (SEM, XRD, TEM, XPS, XRF,
  BET, Raman) are carried out with partner facilities. The site says tests are
  "available" and avoids claiming ownership.
- XRD make, model and specifications; surface roughness tester specifications.
- Business hours (the design mockup shows hours, but no document confirms them).
- Exact map location. The directions link is a Google Maps search for the
  address, not a pinned point.
- Accreditations or certifications. None are claimed.
- Prices and turnaround times. The two price lists differ, so neither is published.

**Assets needed**

- A vector or transparent version of the logo. The supplied emblem was a JPEG
  on a blue haze; it has been cut out for the header, favicon and touch icon
  (`src/assets/brand/`, `public/favicon.png`), and the original is kept in
  `design/brand/`. A file from the designer would be sharper at large sizes.
- Photographs for Welding & Processing and Sample Preparation (a labelled
  placeholder is shown on cards; the hero orbit shows an icon for Welding &
  Processing), plus industry photography if wanted.
- Real footage of the lab for the hero background. The current video is
  AI-generated and does not show Metmech's own laboratory.
- A transparent photograph of the lab's own microscope or SEM for the centre of
  the hero orbit. It currently uses the Zeiss product image from the client's
  document with its background removed.
- Permission to use the manufacturer product images for the SEM, XRD, digital
  microscope, electrochemical workstation, roughness tester, tribometer and
  impact tester, or photographs of the lab's own units. See `src/data/images.js`.

**Wording to approve**

- All Tamil text, by a Tamil-speaking subject expert.
- Vision, Mission, "Why Choose Us" and the process steps (proposed copy).
- The privacy policy (draft; needs client and legal review).
- Which email address should receive enquiries.
