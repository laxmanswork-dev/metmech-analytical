# Hero background video

**To set or change the video, save your footage in this folder as `lab.mp4`.**
Any size is fine. Nothing else is needed.

The next time you run `npm run dev` or `npm run build`, a script
(`scripts/prepare-video.js`) notices the new file and writes two files into
the `web/` subfolder:

- `web/lab.mp4`: a compressed, silent, 1600x900 copy. This is what the site plays.
- `web/lab-poster.webp`: its first frame, shown while the video loads and
  instead of the video for visitors who prefer reduced motion.

Your `lab.mp4` is never modified. Other files in this folder are ignored.

- **To remove the video**, delete `lab.mp4` and the `web/` folder.
- **After changing the video**, check that the hero text is still readable.
  The navy layer over the footage is set for the current clip; see the note on
  `.overlay` in `src/sections/HomeHero.module.css`.

Calm, bright footage works best. The source footage is kept out of version
control because of its size; the compressed copy in `web/` is kept.
