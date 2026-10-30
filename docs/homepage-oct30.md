# Homepage refinements — 30 October 2026

- Collection-destination CTAs now read **Explore Zanshin** on the homepage, contact/help pages, empty favourites/bag/account states and missing-product state. Named individual-product CTAs still identify that fragrance.
- Removed footer destinations already available in the main navigation or header tools. The footer retains How to buy, Returns and Track order, along with the brand logo.
- The right hero panel uses one composed product photograph: a complete closed Japanese cedar ring, with the Focused bottle on an integrated ledge inside the opening. Label copy is Extrait de Parfum / 51 ml. The image is centered across breakpoints.
- Find your kind of presence uses four new, distinct photorealistic character scenes: a focused designer, an athlete doing a dumbbell row, three friends sharing tea, and a confident guest at a gallery opening. These are generated campaign images; they are not documentary photographs or customer endorsements. The original upper flip-card images and behavior remain intact.
- The independent Our Story redesign is included, preserving the shared storefront navigation.

## Assets and prompts

Generated using built-in imagegen, then encoded to WebP without creative post-processing. Original outputs remain in the generated-images folder. Exact prompts, the hero correction prompt and final asset paths are recorded in `docs/homepage-oct30-prompts.json`.

- `client/public/assets/enso-home/hero-focused-wooden-ring-v4.webp`
- `client/public/assets/enso-home/discovery-focused-life-v4.webp`
- `client/public/assets/enso-home/discovery-energised-life-v4.webp`
- `client/public/assets/enso-home/discovery-connected-life-v4.webp`
- `client/public/assets/enso-home/discovery-magnetized-life-v4.webp`

## Verification

- Production build and the existing page/auth/data regression checks pass.
- At 1440px, hero panel heights match at 760px; the complete wooden ring and centered bottle are visible.
- At 390px, the hero and discovery cards render without horizontal overflow; all four discovery images load successfully.
- Rendered footer destinations have zero overlap with header links. The remaining How to buy link and renamed contact-page collection CTA were checked in the browser.
- Proof screenshots: `outputs/design-review/homepage-oct30/` in the task workspace.

Local preview: http://127.0.0.1:5180/. Public deployment status must be verified separately from GitHub delivery.
