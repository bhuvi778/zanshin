# Client corrections — 2 November 2026

- Restored the Focused bottle to the same right-hand alignment and 34% overlay width as the other cards. The laptop was repositioned within the photograph instead. The accepted 1536 × 1024 image is `client/public/assets/enso-home/discovery-focused-jp-v7.webp`; a right-aligned crop preserves the laptop at tablet widths. Exact built-in image edit prompts and generated sources are in [focused-laptop-edit.json](focused-laptop-edit.json).
- Removed the invitation panel, moving word strip, sharing CTA and decorative slogans from testimonials. Only published customer reviews render, with the simple heading “Customer reviews”. When the API has no published reviews, the section is omitted. No invented testimonials are shown.
- Changed review motion to right-to-left. Pause/resume, hover/focus pause, inert/hidden visual duplicates and reduced-motion behavior remain.
- Added a large full-width Coming Soon banner below the existing branded composition. Explore Zanshin, product-detail URLs, Community and Journal & Blogs use this presentation. Journal articles no longer render on the public journal route.
- The pending social-link dialog also uses a clear large Coming Soon heading.

## Verification

- Production build, existing page-rendering and commerce/authentication checks, canonical bottle/review checks and social-link checks passed.
- Browser QA: 360, 390, 768 and 1440 px. Seven Coming Soon routes; no catalogue/product/article panels, large announcement text, all bottle overlays right-aligned, new laptop artwork loaded, no filler review elements or horizontal overflow.
- Tested zero published reviews and three browser-only product-review fixtures. Fixture content was neither published nor saved to the backend.
- Sampled normal-motion X translation decreased from -4.66 to -14.66 px, confirming right-to-left travel. Pause and hover pause passed. Reduced-motion checks passed.
- No browser page errors. Screenshots and QA JSON: `../../design-review/client-corrections-nov2/`.

These changes are local and have not been pushed in this turn.
