# Client artwork and copy review — 31 October 2026

## Reference coverage

1. Supplied four wooden-cap bottles: extracted individual bottle artwork and used it through the shared LabelPack component. Explicit CMS product-photo uploads still take precedence.
2. Hero right panel: replaced the wooden ring scene with the supplied tea/shoji creative. Removed “The art of presence”; added “Every moment is different. Make each one yours.”, “Countless moments. Four expressions. One philosophy.” and the “Begin with the Moment” collection CTA. Preserved the left slideshow.
3. Ensō/Zanshin: used the client's central split-colour circle, removed its top caption, and placed readable HTML copy on either side. Japanese titles remain. Mobile stacks Ensō, the artwork and Zanshin. Included the supplied Ensō meaning and Seo attribution.
4–8. Fragrance card face: prominent botanical bottle imagery only inside the visual, with the four supplied headings and descriptions below it. The existing full-card turn and accessible three-view controls remain.
9. Connected and Magnetized discovery images: restored the previous `home-approved` scenes. Focused and Energised remain as approved.
10. Approach: new “NOT JUST MADE. THOUGHTFULLY CONSIDERED.” line; 51 ml explanation is always visible, without its previous disclosure control. Other disclaimer disclosure remains.
11. Circle: replaced the campaign-image carousel with the supplied blossom/Circle creative. The whole banner links to Community, including a keyboard-accessible label. No unverified social account URL was invented.
12. Stories/testimonials: retained and verified the visible creator stories and real customer-review section. An empty review collection continues to invite customer submissions.

Quiz/Find your Moment entries were removed from navigation, homepage CTA, product links, editorial links, search index and public routing. The previous URL now reaches the ordinary 404 page; the Finder implementation is no longer bundled by the app.

## Artwork quality

These assets were extracted from the supplied presentation screenshots, without AI regeneration or invented extra resolution. They are suitable for this review and can be replaced in place when the promised high-resolution originals arrive. Original source filenames and extraction rectangles are recorded in `client-feedback-asset-manifest.json`. Final assets are in `client/public/assets/client-approved/`.

## Verification

- Production build: passed (99 modules).
- Existing page rendering and commerce/authentication checks: passed; updated the hero assertion and removed the retired Finder case.
- Browser checks at 360, 390, 768 and 1440 px: 17 routes at each width; no horizontal page overflow, no broken content images, no visible quiz/Finder entry, working three card faces, add-to-bag count and mobile navigation.
- Old Finder URL: standard 404, with no quiz controls.
- Creator stories/testimonial section: visible.
- Browser page errors: zero.
- Final targeted visual review: hero, Ensō composition, card grid and header at mobile/desktop widths.
- Evidence: `../../design-review/client-feedback/qa.json` and screenshots in that directory.

No Git push or public deployment is included in this local implementation.
