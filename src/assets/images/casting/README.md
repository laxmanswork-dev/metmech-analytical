# Casting page hero photograph

`casting-hero.webp` is the photograph at the right of the casting page's
hero (`/casting-services`): a 1200 x 900 (4:3) WebP. The full-size file the
client supplied is kept in `design/casting-originals/`.

To replace it, save a 4:3 photograph here under the same name as a real WebP
(or as `casting-hero.jpg`), about 1200 x 900 pixels, and update its
description in `casting.hero.imageAlt` in `src/i18n/translations/en/casting.js`
and `ta/casting.js`.

The lookup is `CASTING_HERO_IMAGE` in `src/data/images.js`.
