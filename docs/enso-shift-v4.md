# Ensō Shift artwork v4

Generated with the built-in image_gen tool on 2026-10-19. Four standalone Japanese illustrations replace the bookmark mockup crops. Native eager-loaded images remain mounted before hover, with a landscape fallback on load errors.

## Assets and final prompts

### focused

Saved asset: client/public/assets/enso-home/enso-shift-focused-v4.webp (1024 × 1536).

Use case: illustration-story. Asset: an original premium Zanshin fragrance Ensō Shift card illustration, full-bleed portrait 2:3. Use the supplied bookmark only as a reference for Japanese landscape subject, ink-circle motif and colour identity. Produce a NEW complete high-resolution standalone artwork, NOT a photo of a bookmark, NOT a mockup, NOT two panels. A striking freely brushed deep teal Ensō circle frames the REALISTIC ink-painted Japanese Ryōan-ji Zen garden: dark sculptural stones, crisply raked white gravel flowing around them, elegant pine branches, misty blue mountains and temple wall. Meaning: Lock in. Stillness and clarity. Clear strong foreground detail and contrast. Japanese woodblock print blended with premium sumi-e illustration, fine tactile paper grain, expressive brushwork, balanced refined composition. Art must occupy ALL of the canvas, with the main landscape and circle large, crisp and clearly visible; no empty beige space and no cast shadow of a paper object. No text, no lettering, no logo, no borders, no bottles, no humans, no watermark. Keep the complete main subject and arc in frame with a little breathing room.

### energised

Saved asset: client/public/assets/enso-home/enso-shift-energised-v4.webp (1024 × 1536).

Use case: illustration-story. Asset: an original premium Zanshin fragrance Ensō Shift card illustration, full-bleed portrait 2:3. Use the supplied bookmark only as a reference for Japanese landscape subject, ink-circle motif and colour identity. Produce a NEW complete high-resolution standalone artwork, NOT a photo of a bookmark, NOT a mockup, NOT two panels. A bold cobalt-blue Ensō brush arc curves around a vivid beautiful Mount Fuji, snow cap, vibrant coral-red rising sun, energetic blue mountain layers and Japanese pine trees, powerful upward diagonals and sharp detailed textures. Meaning: Unleash. Momentum and energy. Visibly blue and coral, never a blank beige field. Japanese woodblock print blended with premium sumi-e illustration, fine tactile paper grain, expressive brushwork, balanced refined composition. Art must occupy ALL of the canvas, with the main landscape and circle large, crisp and clearly visible; no empty beige space and no cast shadow of a paper object. No text, no lettering, no logo, no borders, no bottles, no humans, no watermark. Keep the complete main subject and arc in frame with a little breathing room.

### connected

Saved asset: client/public/assets/enso-home/enso-shift-connected-v4.webp (1024 × 1536).

Use case: illustration-story. Asset: an original premium Zanshin fragrance Ensō Shift card illustration, full-bleed portrait 2:3. Use the supplied bookmark only as a reference for Japanese landscape subject, ink-circle motif and colour identity. Produce a NEW complete high-resolution standalone artwork, NOT a photo of a bookmark, NOT a mockup, NOT two panels. A rich moss-green Ensō brush circle embraces lush Arashiyama bamboo, a beautifully detailed wooden footbridge crossing a still jade river, layered Japanese mountain garden, intimate light filtering between bamboo stems. Meaning: Aura. Connection and belonging. Rich green and soft ivory, strong visible detail throughout. Japanese woodblock print blended with premium sumi-e illustration, fine tactile paper grain, expressive brushwork, balanced refined composition. Art must occupy ALL of the canvas, with the main landscape and circle large, crisp and clearly visible; no empty beige space and no cast shadow of a paper object. No text, no lettering, no logo, no borders, no bottles, no humans, no watermark. Keep the complete main subject and arc in frame with a little breathing room.

### magnetized

Saved asset: client/public/assets/enso-home/enso-shift-magnetized-v4.webp (1024 × 1536).

Use case: illustration-story. Asset: an original premium Zanshin fragrance Ensō Shift card illustration, full-bleed portrait 2:3. Use the supplied bookmark only as a reference for Japanese landscape subject, ink-circle motif and colour identity. Produce a NEW complete high-resolution standalone artwork, NOT a photo of a bookmark, NOT a mockup, NOT two panels. A powerful burgundy-black and vermilion Ensō brush arc frames a beautiful Fushimi Inari shrine path of repeating vivid red torii gates receding into a Japanese forest, red maple leaves and stone steps lit by warm golden light. Meaning: Chemistry. Magnetic presence. Striking vivid red gates and high visual contrast. Japanese woodblock print blended with premium sumi-e illustration, fine tactile paper grain, expressive brushwork, balanced refined composition. Art must occupy ALL of the canvas, with the main landscape and circle large, crisp and clearly visible; no empty beige space and no cast shadow of a paper object. No text, no lettering, no logo, no borders, no bottles, no humans, no watermark. Keep the complete main subject and arc in frame with a little breathing room.

## Verification

- Production Vite build passed.
- Existing page, authentication-gate and malformed-response checks passed via `node client/scripts/verify-pages.mjs`.
- All four native artwork images decoded to 1024 x 1536 before selecting a final face; no fallback was used.
- All four final faces were selected in the browser and showed nonzero image dimensions with the correct captions.
- Hover sequence verified: Your Moment -> Fragrance -> Enso Shift -> Your Moment. Existing 800 ms turn interval and 720 ms whole-card animation retained.
- 390 x 844 mobile check: Energised final artwork rendered at about 302 x 408 px, no horizontal page overflow.
- Desktop and mobile screenshots saved under outputs/design-review/enso-shift-v4-*.png in the task workspace.
