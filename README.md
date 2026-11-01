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

There is one enquiry form, at the end of the home page (`/#enquiry`). Every
"Start a Test" button leads to it. The "Enquire" buttons on instrument and
service pages also tell it which instrument or service the enquiry is about;
the form shows "Enquiry about: …" and includes it with the enquiry.

How the form sends depends on `VITE_ENQUIRY_API_URL`:

- **Empty (the current setting):** the form validates the input and opens
  WhatsApp (click-to-chat, `wa.me/919962034530`, the same number as the
  floating button) with the enquiry typed in as an English message. The
  visitor must press Send in WhatsApp; until they do, the business receives
  nothing, and the page says so rather than claiming it was sent. Nothing is
  sent to a server. A second press within 3 seconds is ignored.
- **`/api/enquiry`:** the form posts the enquiry to the site's own enquiry API
  (below), which sends it to the business on WhatsApp. The visitor sees the
  success message only after WhatsApp has accepted the message. If sending
  fails, the form keeps what the visitor typed and offers to send it by email
  instead.

The form posts:

```
POST /api/enquiry
Content-Type: application/json

{ "name", "company", "email", "phone",
  "requirement": ["metal", "ceramic", "polymer", "biofilm", "dental"], // at least one
  "message", "consent": true, "language": "en" | "ta",
  "about": "Salt Spray Test Chamber" | null,   // English name, or null
  "page": "/equipment/salt-spray-test-chamber", // where it was started
  "submissionId": "<uuid>" }                    // the same on a retry
```

### The enquiry API (worker/)

`worker/index.js` is the site's only server code: a Cloudflare Worker
deployed with the static site by `wrangler deploy` (see `wrangler.jsonc`). It
runs only for `/api/*`; pages are served without it. For each enquiry it:

1. accepts only a JSON `POST` from the site's own origin (32 KB at most);
2. silently drops posts that filled in the hidden honeypot field;
3. validates the fields again with the form's own rules
   (`src/utils/enquiryRules.js`) and answers `422` with the invalid fields;
4. ignores a `submissionId` it has already sent in the last day, so a retry
   or double submission does not send a second message;
5. sends the WhatsApp notification (`worker/whatsapp.js`) and answers `200`
   only once WhatsApp has accepted it, or `503` if it is not configured or
   sending failed. Responses never contain the token or error details; the
   reason is written to the Worker's logs (Cloudflare dashboard > Workers >
   metmech-analytical > Logs).

Not built in: rate limiting. Add a rate limiting rule for `/api/enquiry` in
the Cloudflare dashboard (Security > WAF > Rate limiting rules) if spam
appears.

### WhatsApp enquiry notifications

The notification goes to **919962034530** through the WhatsApp Business
Platform Cloud API (Meta). **It is not live yet**: it needs a Meta account,
a sending number, an approved template and two secrets, none of which exist
yet. Until then the form keeps using email.

Steps:

1. **Meta Business account and app.** In Meta Business Suite
   (business.facebook.com) set up the business, ideally verified. At
   developers.facebook.com create an app of type Business and add the
   WhatsApp product. This creates a WhatsApp Business Account.
2. **A sending number.** The API sends *from* a business number registered
   on the Cloud API *to* 919962034530. They must be different numbers. A
   number registered on the Cloud API generally cannot also be used in the
   ordinary WhatsApp or WhatsApp Business app (Meta's "coexistence" option
   for WhatsApp Business app numbers is the exception; check its current
   terms). So use a spare number (a new SIM, or one not on WhatsApp), not
   99620 34530. Meta's free test number can only message up to five
   registered recipients and is for trying things out only.
3. **Phone number ID.** WhatsApp Manager > API Setup shows the *Phone number
   ID* of the sending number (a long number, not the phone number).
4. **Permanent access token.** Business settings > Users > System users: add
   a system user, assign it the app and the WhatsApp Business Account, and
   generate a token with the `whatsapp_business_messaging` permission (and
   `whatsapp_business_management`). Temporary tokens from the API Setup page
   expire after a day; do not use them in production.
5. **Message template.** WhatsApp Manager > Message templates > Create:
   category *Utility*, name `website_enquiry`, language *English*, body:

   ```
   New enquiry from the Metmech website.

   Name: {{1}}
   Phone: {{2}}
   Email: {{3}}
   Company: {{4}}
   Regarding: {{5}}
   Testing requirements: {{6}}
   Message: {{7}}
   Page: {{8}}
   Received: {{9}}

   Please reply to the customer directly.
   ```

   Give sample values for each variable when submitting, and wait for
   approval. Businesses may only start a WhatsApp conversation with an
   approved template, so this is required. If you name it differently or
   choose another language code (`en_US`, say), change
   `WHATSAPP_TEMPLATE_NAME` or `WHATSAPP_TEMPLATE_LANGUAGE` in
   `wrangler.jsonc`.
6. **Billing.** Add a payment method to the WhatsApp Business Account. Meta
   charges per template message delivered.
7. **Secrets.** Set the two secrets on the Worker (or in the Cloudflare
   dashboard under the Worker's Settings > Variables and Secrets, type
   *Secret*):

   ```
   npx wrangler secret put WHATSAPP_ACCESS_TOKEN
   npx wrangler secret put WHATSAPP_PHONE_NUMBER_ID
   ```

   The recipient, template name, language and API version are in
   `wrangler.jsonc` under `vars`. Never give any of these a `VITE_` prefix:
   `VITE_` values are published in the website's JavaScript.
8. **Test before switching the form over.** After deploying, send a test
   enquiry straight to the API and check that it arrives on 99620 34530:

   ```
   curl -X POST https://metmechresearch.com/api/enquiry \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","phone":"9876543210","requirement":["metal"],"message":"Test enquiry, please ignore","consent":true,"submissionId":"test-0001"}'
   ```

   `{"ok":true}` means WhatsApp accepted the message. `503` means it is not
   configured or WhatsApp refused it; the Worker's logs give the reason.
   Repeat with a new `submissionId` for each test (a repeated id is ignored).
9. **Switch the form over.** Set `VITE_ENQUIRY_API_URL=/api/enquiry` in
   `.env.production`, build and deploy. Then send an enquiry from the site
   itself, including one from an instrument page.

The WhatsApp button on every page (below) is separate: it is a plain
`wa.me` link that opens a chat with 919962034530 and needs no setup.

### Floating call and WhatsApp buttons

`src/components/layout/FloatingContact.jsx` shows a call button
(`tel:+919962034530`) and a WhatsApp button (`wa.me/919962034530`, with a
greeting typed in, in the page's language) in the bottom-right corner of
every page. The number is `WHATSAPP_NUMBER` in `src/data/site.js`; their
labels and the greeting are under `shortcuts` in the `common` dictionaries.

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
- Rockwell hardness tester: make Saroj (from the nameplate). The nameplate also
  appears to read model RAB250 with Rockwell scales A to V; model and scales
  are shown as "Awaiting confirmation" until the client confirms them. The
  client's brief listed a "Rockwell tester" and a "Saroj hardness tester"
  separately; the photographs show one machine, so the site has one entry.
- Shore A rubber hardness tester: the brief said "Shore D rubber", but the dial
  in the photograph reads Shore A (make tse); the site says Shore A. Make,
  model and range not yet confirmed.
- Salt spray test chamber: make, model and test conditions.
- Powder metallurgy compaction press: 20 tons, 10 / 12.5 / 25 mm diameters
  and electronic load cell are as stated by the client; make and model not
  supplied. The brief also asked for a separate "vertical mechanical testing
  apparatus", but its photograph shows this press, so no separate entry was
  made.
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
  microscope, electrochemical workstation, roughness tester and impact
  tester, or photographs of the lab's own units. See `src/data/images.js`.
- Confirmation of the powder metallurgy press photograph. It shows a machine
  with a black base, handwheel and two columns, unlike the client's photo of
  the press (green frame, hydraulic jack, load cell). The Rockwell, Shore A,
  salt spray, press and wear test rig photographs are AI-edited composites of machines on a
  generated lab background, like the other instrument photographs.

- The company owner's full name, designation and a 4:5 portrait photograph for
  the about page. The company description names Jayaraj M and Prem Kumar P as
  contacts but not who the owner is. Fill in `src/data/owner.js`.

**Wording to approve**

- All Tamil text, by a Tamil-speaking subject expert.
- The privacy policy (draft; needs client and legal review).
- Which email address should receive enquiries.
