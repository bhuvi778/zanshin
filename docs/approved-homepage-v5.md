# Approved homepage implementation

Implements design-review/homepage-v5 with the requested philosophy refinement and generous section spacing.

- Existing glass navigation and router retained.
- Seven-second hero image slideshow with four vertical controls, pause, hover/focus pause, and reduced-motion support.
- Philosophy: framed ritual photograph, brand copy, three principles and story link.
- Four alternating intention chapters, each linking to its real fragrance route.
- Manually controlled one-product showcase. Name, description, original label, carton colour and destination update together. No homepage prices.
- Ritual, finder, journal, community and original full-logo footer.
- Responsive layout: stacked image/copy chapters, legible mobile type and large controls.

## Asset generation
Built-in image generation, using the approved v5 image as visual reference. Generated photographs were converted to WebP without visual compositing. Product showcase uses the original label assets as real images; carton presentation remains a mockup.

Shared prompt: Generate a standalone photorealistic luxury fragrance editorial photograph for a real website, based on the corresponding photograph in the approved design reference. Only photographic scene, no website headings or controls, no collage. Natural skin texture, understated warm ivory grading, professional photography.

- hero.webp: Wide 16:9 campaign photo matching the top hero: South Asian woman in cream shirt on RIGHT half applying perfume to wrist in daylight apartment, sheer curtains; LEFT 50 percent quiet ivory wall for website text. Rectangular amber perfume bottle on table, dark wood cap. No text or UI.
- focused.webp: Wide 3:2 editorial photo: South Asian woman in charcoal knit sketching in notebook at sunlit desk, thoughtful creative work, matching Focused story photograph. Center the woman and her hands.
- energised.webp: Wide 3:2 editorial photo: smiling South Asian man in navy blazer walking on sunlit tree-lined urban street with shoulder bag, spontaneous forward movement, natural confidence, matching Energised story.
- connected.webp: Wide 3:2 editorial photo: three diverse young adult friends sharing real laughter at outdoor cafe table, two women and a man, matching Connected story, relaxed authentic expressions.
- magnetized.webp: Wide 3:2 editorial photo: poised South Asian woman in black tailored jacket entering contemporary art gallery, natural quiet confidence, warm daylight, matching Magnetized story.
- ritual.webp: Wide 3:2 macro editorial photo of hands spraying amber fragrance from rectangular clear glass bottle with gold spray nozzle onto wrist, sheer curtains warm daylight behind, realistic hands, no cap on spray nozzle. Match the ritual detail photograph.

Hero refinement: apply supplied original Focused label to the bottle on the table while preserving composition, person and lighting.

## Verification
Production build with native config loader passes. Existing 23 SSR route checks and malformed-data regressions pass. Browser testing was blocked by the user's browser permission denial, so interactive and visual desktop/mobile checks remain unverified.

Local preview command: npm run dev -w client -- --configLoader native --host 127.0.0.1 --port 5178
