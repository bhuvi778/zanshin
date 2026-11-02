# Homepage order and review visibility — 2 November 2026

- The complete considered-pairs component (“Some feelings deserve more than one expression”) is now immediately after the flip-card section and before “Find your kind of presence”. It is rendered once. Approach and the separate custom/gift destinations retain their relative order.
- Customer reviews always render immediately after Join the Zanshin Circle and before the final promise banner.
- Empty published-review data no longer removes the entire section. The owner explicitly requested dummy content after being told the backend had no published reviews. Four SKU-specific preview reviews now display in the right-to-left strip, with a visible “Sample review” label on each card, “Demo customer” names and a preview-status line. They are design-preview content, not customer submissions or endorsements.
- Published review data automatically replaces all preview cards and removes their labels/status line. Pause and reduced-motion behavior remain.

## Verification

- Production build and existing component/authentication/commerce checks passed.
- Empty and published-review state regression checks passed; zero reviews must now render a visible section with four labelled sample cards.
- Browser checks at 360, 390, 768 and 1440 px: flip → pairs → presence order, one pair-builder instance, Circle → reviews → promise order, visible labelled sample cards, browser-only published-review fixture replacing all demo content, no horizontal page overflow and no browser errors.
- Screenshots and QA JSON: `../../design-review/reviews-order-nov2/`. Test fixture reviews were not submitted to the backend.

Preview review data lives in `client/src/sampleReviews.js`. It is not inserted into the backend, customer profiles or order records.

Changes are local; no GitHub push is included in this turn.
