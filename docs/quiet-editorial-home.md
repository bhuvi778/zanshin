# Quiet editorial homepage — 25 September 2026

## Direction
Image-led, low-contrast ivory, sage, sea blue and dusty rose. Full-width slideshow, concise brand philosophy, mood discovery, fragrance chapters, gifting and community links. No video elements or prices on the homepage. Existing product pages and cart remain available.

Reference reviewed: https://kayali.com/en-ae (collection discovery, category navigation and fragrance quiz). No reference-site copy or photographs used.

## Generated assets
Built-in ChatGPT image generation; no paid third-party generator used. Final WebP assets: `client/public/assets/editorial/{focused,energised,connected,magnetized}.webp`. All four are 1672 × 941. AI campaign imagery illustrates moods; people are not customers or endorsers.

## Prompt set
Shared prompt: Create one premium editorial fragrance campaign photograph for Zanshin [identity]. Wide landscape 16:9 composition, subject on RIGHT HALF, LEFT 42 percent uncluttered softly lit ivory architecture for website text overlay. Real human emotion, refined luxury fashion photography, tactile film grain extremely subtle, soft natural light, low contrast, restrained colour, realistic skin, authentic anatomy. No text, no logos, no watermark, no split screen, no collage, no bottle or invented product. The photograph should feel like a quiet meaningful moment, not a stock advertisement. High photographic detail.

- Focused: A contemplative South Asian man in an ivory linen shirt seated in a serene daylight studio, writing one line in a notebook, thoughtful calm face, beautiful window shadow, pale blue-grey and warm ivory.
- Energised: A South Asian woman in pale blue linen walking along a sunlit coastal terrace, fresh sea breeze in her hair, spontaneous soft smile, understated vitality, muted sea blue and sandy cream.
- Connected: An adult South Asian couple meeting on a warm afternoon terrace, hands gently touching over a limestone table, relaxed genuine smiles and affectionate eye contact, muted sage foliage and soft cream.
- Magnetized: A poised South Asian woman in a muted dusty rose silk dress at a light-filled art gallery, quiet self-assured smile looking over her shoulder, elegant natural stance, warm blush and champagne stone.

## Verification
`npm run build -w client -- --configLoader native` passes. Native loader avoids the local sandbox directory-scan restriction affecting the default config bundler. UI visual verification was blocked by browser permission denial. Responsive CSS is implemented but requires browser review. Slideshow has manual selectors, pause, hover/focus pause and reduced-motion support.
