# Zanshin Sakura teaser

Source for the single film in the homepage's left hero panel. 18 seconds, 1920 × 1080, 30 fps, H.264, silent. Original background artwork plus animated petals, mist, sunlight and typography.

```sh
cd brand-films/teaser
npm ci
npm run dev
```

To reproduce the deployed files, run from this folder:

```sh
npx remotion render Zanshin-Brand-Teaser ../../client/public/films/zanshin-brand-teaser.mp4 --codec=h264 --crf=20 --pixel-format=yuv420p --concurrency=2
npx remotion still Zanshin-Brand-Teaser ../../client/public/films/zanshin-brand-teaser-poster.jpg --frame=300 --image-format=jpeg
```

The homepage uses one looping, muted, inline video without a playback controls bar or picture-in-picture button. Reduced-motion preferences pause automatic playback and preserve the poster. All text is baked into the video, with a matching accessible description. The complete frame is preserved using `object-fit: contain`.

The artwork and local font required to reproduce the composition are included in `public/`. No Pinterest footage is redistributed.
