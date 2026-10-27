# Client reference update — 27 October 2026

## Implemented scope

- Discovery uses four new Japanese editorial scenes, independent of the unchanged character flip-card assets and 800 ms interaction.
- The approach section has exactly four primary cards: Moment-led, 51 ml, Extrait de Parfum, Environmental Friendly. This follows the four-item image; the three ethical/formula statements in the message appear in the supporting disclaimer.
- The 51 ml card includes the supplied 5 + 1 / Rokkon explanation.
- Cruelty Free, No Synthetic Dyes and No Parabens or Preservatives remain visible below the four cards. Other supporting details are in the disclaimer; the unconfirmed phthalate-free status remains identified as unconfirmed.
- Our Story follows the attached `zanshin-brand-story-v2.html` content and seven-section sequence. Its separate navbar and footer are replaced by the shared storefront shell. Static content and embedded creatives were ported into React; the attached script is not executed. Scroll reveals are implemented in the component and respect reduced motion.
- The three photographs referenced in the HTML were downloaded successfully into local project assets so rendering does not depend on the remote image URLs.
- The sharper Ensō artwork uses the supplied reference's lower opening and rounded lower-left brush finish, with clear outer space for homepage copy.
- Supplied colored label artwork is preserved. Bottle/carton presentation uses native UI text for the approved Extrait de Parfum / 51 ml footer, leaving custom uploaded labels unchanged. Frontend product copy and seed sizes match. The exact legacy default `50 ml / 1.7 fl oz` is normalized to the approved new default; other custom sizes remain intact.

## Assets

Generated with the built-in image tool, then saved as WebP without creative post-processing:

- `client/public/assets/enso-home/discovery-focused-v3.webp`
- `client/public/assets/enso-home/discovery-energised-v3.webp`
- `client/public/assets/enso-home/discovery-connected-v3.webp`
- `client/public/assets/enso-home/discovery-magnetized-v3.webp`
- `client/public/assets/enso-home/enso-story-direction-v3.webp`

Exact generation prompts are in `docs/client-update-oct27-prompts.json`.

HTML reference creatives are under `client/public/assets/story-v2/`. No base64 payloads, navbar script or raw HTML execution are used by the page.

The story hero uses a sharper generated Magnetized bottle presentation at `client/public/assets/story-v2/magnetized-bottle-v2.webp`, derived from the embedded bottle and approved colored label. The original embedded JPEG is retained as a source reference.

## Verification

Production build and existing route/auth/data regression checks pass. Browser checks cover all four distinct discovery sources, four USP cards, the working disclaimer, 51 ml product copy, story anchor links, loaded packaging/closing creatives, one shared navbar/footer and 390px mobile layout without horizontal overflow. Screenshots are saved in the task workspace at outputs/design-review/client-update-oct27/.

Shared layout navigation now handles fragment targets after React has mounted the page, instead of sending fragment navigation back to the top. Scroll-reveal animation remains local to the story content.
