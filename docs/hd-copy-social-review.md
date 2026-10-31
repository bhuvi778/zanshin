# Transparent products, exact copy and Circle social handoff

## Delivered

- Four 1024 × 1536 bottle cutouts with true alpha transparency. All four output corners are transparent; the cream label remains part of each bottle. The shared LabelPack uses the new cutouts with normal blending, including the final promise section. No white rectangular background is rendered.
- Four 1024 × 1536 botanical fragrance scenes, a 1536 × 1024 hero, a 1536 × 1024 Ensō scene and a 2048 × 768 text-free Circle background.
- These images are AI-assisted reconstructions/enhancements of the supplied small references, not recovered original high-resolution photography. Final WebP files preserve transparency where needed. Previous reference extractions remain available.
- Client wording is centralized verbatim in `client/src/clientCopy.js`: hero capitalization/CTA, Ensō definition, full Seo attribution, supplied symbols, expression line, Zanshin explanation, approach line and 51 ml explanation. Removed the additional period from the Energised fragrance description to match its reference.
- Circle heading and CTA are now sharp HTML text over the HD artwork. Copy stays readable on mobile.

## Social destination

Set `circleSocial` in `client/src/siteLinks.js` or the build variable `VITE_ZANSHIN_CIRCLE_URL` to the supplied full HTTPS social-profile URL. The CTA then opens that URL in a new tab with `noopener noreferrer`. Instagram and other HTTPS social pages are supported.

While the setting is blank, the CTA opens a small “coming soon” dialog, closes with Escape and returns focus to the button. It does not route to Community or invent a brand handle. The dialog contains no technical setup instructions.

## Generation record

Built-in `image_gen` was used in edit mode, with each existing reference as the edit target. Final prompts, original generated files, final asset paths and dimensions are saved in [hd-artwork-prompts.json](hd-artwork-prompts.json). Final assets: `client/public/assets/client-approved/*-hd.webp`.

## Validation

- Production build and existing page/authentication/commerce verifier passed.
- Circle SSR checks passed for blank setting, configured Instagram/YouTube test destinations, new-tab attributes and rejected invalid/insecure URL schemes. Test URLs are not shipped as the brand destination.
- Browser checks at 390, 768 and 1440 px: exact copy comparisons, four HD card scenes, four HD promise bottles, Circle dialog/Escape/focus restoration, no horizontal page overflow, add-to-bag counter and no page errors.
- Transparent output corners verified in both generated PNGs and final WebPs. All 11 assets have widths of at least 1024 px.
- Visual review: full generated contact sheet; desktop promise and Ensō composition; mobile/desktop Circle.
- Screenshots and browser results: `../../design-review/hd-feedback/`.

Changes are local; this turn does not include a GitHub push or public deployment.
