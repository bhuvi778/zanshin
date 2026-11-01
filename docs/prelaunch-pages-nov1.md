# Coming Soon and homepage refinements — 1 November 2026

- Explore Zanshin (`/collection`) and its four product detail URLs now render a shared Japanese Coming Soon screen. Catalogue and purchase panels are not rendered on those routes. Original catalogue/product implementations remain available in source for launch.
- Community (`/community`) renders its own Coming Soon variant with blossom artwork. Journal and Our Story remain available.
- All four considered-pair images use `object-fit: contain`. Desktop displays the entire scene in a paper-coloured frame with a separate caption; mobile uses the image's natural ratio.
- Focused discovery-card bottle is placed at the lower left, clearing the laptop on the right. Existing photograph is unchanged.
- Circle headline is centered horizontally and vertically within the central circle area; CTA remains centered below it. Social destination configuration is preserved.
- Customer reviews now run continuously from left to right in a looping strip. Pause/play, hover/focus pause and reduced-motion/manual-scroll behavior are included. Duplicate visual entries are inert and hidden from assistive technology.
- The review endpoint currently has no published entries. The live empty state invites a real submission and uses a moving editorial word strip. No fake customer names, ratings or reviews were introduced. Published review cards were tested with browser-only fixtures.
- Previous requested removal of the two creator/photo cards and formula-disclaimer dropdown is retained.

## Verification

- Production build and existing rendering/authentication/commerce component checks passed. Canonical bottle and customer-review state checks passed.
- Browser QA at 360, 390, 768 and 1440 px: all six Coming Soon routes hide catalogue, product and community-list content; no horizontal overflow or page errors; all four pairing selections show uncropped images; Focused bottle clears the laptop; Circle copy is horizontally centered.
- Review fixtures: three original accessible reviews, hidden/inert duplicated entries, reduced-motion state, pause control and hover pause checked. Normal-motion transform increased from -1438 to -1428 px during the sample, confirming left-to-right travel.
- Visual inspection: mobile Coming Soon and pair composition; desktop Focused card, pair composition, Circle and review fixture.
- Evidence: `../../design-review/prelaunch-nov1/qa.json` and screenshots alongside it. No fixture content was submitted to the backend.

This local change does not publish or push the website.
