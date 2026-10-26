# Orbit thumbnails: originals and colour correction

`originals/` holds the six home-hero orbit thumbnails as they were before
colour correction (2026-10-24). The files in `src/assets/images/orbit/` are
corrected copies with the same 240px crop; copy an original back to undo.

Each image was corrected on its own, in this order, with ffmpeg:

1. White balance: per-channel gains that move the image's own neutral pixels
   to a very slightly warm grey.
2. Levels: input black and white points (and, for the white catalogue shot,
   an output white below paper white).
3. Midtone gamma and a light saturation change.
4. A very mild unsharp mask (none on the welding photo).

| Image                     | WB strength | Black | White | Out white | Gamma | Saturation | Sharpen |
| ------------------------- | ----------- | ----- | ----- | --------- | ----- | ---------- | ------- |
| mechanical-testing        | 1.3         | 20    | 236   |           | 1.00  | 1.06       | 0.25    |
| hardness-testing          | see below   |       |       |           |       |            | 0.25    |
| material-characterization | 1.6         | 6     | 242   |           | 1.02  | 1.04       | 0.25    |
| thermal-analysis          | 1.4         | 6     | 225   |           | 1.28  | 0.98       | 0.25    |
| surface-corrosion-testing | 0.5         | 10    | 255   | 243       | 0.97  | 1.00       | 0.20    |
| welding-processing        | 1.2         | 2     | 235   |           | 1.45  | 0.95       | 0       |

The welding photo keeps some blue from the arc light on purpose. A new or
replacement thumbnail should be corrected to match: neutrals close to grey,
midtones around the same brightness as its neighbours, whites not clipped.

hardness-testing was replaced on 2026-10-26 with the client's photograph of
a technician at the Micro Vickers tester, cropped square to the full height of
the photo. It was already well exposed, so it only had a small white-balance
change (channel gains 1.012, 1.018, 0.99) and the mild sharpen; its original
crop is in `originals/` like the others.
