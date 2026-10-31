# Wooden bottle consistency and customer stories

## Changes

- Removed the supplied shoji-room image and its caption from Our Story. Shortened the desktop origin photograph to keep that section balanced after removal.
- Applied the same approved spherical wooden-cap bottle across the shared presentation component, discovery cards, collection/product pages, pairing/gifting, final promise and Our Story closing. For the four approved SKUs, older CMS product photos cannot reintroduce the retired bottle. Other products can still use their own image.
- Replaced remaining legacy ProductPack and ProductVisual bottle rendering with the shared presentation component.
- Edited the hero tea-room photograph to use the same approved Focused bottle. Source, final path and exact built-in image-generation prompt: [wooden-hero-prompt.json](wooden-hero-prompt.json).
- Added a new customer-stories layout immediately before the final promise banner: two photo/editorial story cards, a deep green customer panel with ivory/gold typography, published-review cards with rating and optional media, and a sign-in/share action.
- The live review endpoint currently has no published reviews. The site displays the designed invitation state until approved customer submissions are available. No invented customer names or endorsements were added. The review-card state was verified with browser-only fixtures.
- Includes the preceding transparent HD artwork, exact-copy and Circle social-configuration changes in this delivery.

## Validation

- Production build and existing page, account/authentication and commerce verifiers passed.
- Canonical-bottle regression: older product-photo overrides do not replace approved bottles; published-review and empty-review states render correctly.
- Circle pending state, safe social URLs and configured destinations passed.
- Browser checks at 320, 390, 768 and 1440 px: nine routes per viewport, canonical artwork, transparent image alpha at all four discovery-card image corners, removed room image, testimonials before the final banner, submitted-review fixture display, share/account navigation and add-to-bag counter. No horizontal page overflow or browser page errors.
- Restarted the existing Vite preview to clear stale transformed modules before the final browser checks. Preview remains on port 5180.
- Evidence: `../../design-review/wooden-voices/qa.json` and desktop/mobile screenshots. Fixture reviews were neither submitted nor saved to the backend.

Generated and transparent image details are recorded separately in [hd-copy-social-review.md](hd-copy-social-review.md) and [hd-artwork-prompts.json](hd-artwork-prompts.json).
