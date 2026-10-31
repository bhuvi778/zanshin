# Storefront refinement — 31 October 2026

## Implemented

- Paused Find your Moment in the main navigation, retaining its commented navigation entry and functional route. Hero discovery now links to Explore Zanshin.
- Kept the approved Find your kind of presence photographs unchanged.
- Rebalanced considered pairs: four choices above the composition, a full-height lifestyle photograph on the left, copy and actual product bottles on the right. Mobile stacks the panels; selected options retain readable contrast on hover.
- Centered the footer brand and added customer-care and policy navigation.
- Added complete How to Buy, Returns & exchanges, Privacy Policy and Terms & Conditions pages with section anchors, shared typography and contact links.
- Added enquiry categories to Contact Us, including return and privacy deep links. The existing contact endpoint receives the category as a message prefix.
- Replaced Community, Contact and Journal seed illustrations with four generated photographic Japanese scenes using the existing cast as references. Uploaded CMS images remain respected.

## Policy assumptions and research

The owner has not yet supplied a registered entity/address or fixed return window. Copy uses Zanshin and the existing Contact Us form. It does not invent an address, delivery SLA, refund period or payment capability. The current workflow submits order requests; availability, final pricing, payment and delivery are confirmed separately. These pages should be updated when the operating business details and final fulfilment rules are established; this is not a certification of legal compliance.

Primary references consulted:

- [Consumer Protection (E-Commerce) Rules, 2020](https://consumeraffairs.nic.in/sites/default/files/E%20commerce%20rules_0.pdf): search-indexed official guidance on disclosure and consumer remedies. PDF retrieval timed out; no claim of a full PDF review.
- [Digital Personal Data Protection Rules, 2025 — official Gazette](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf): notice clarity, purposes, rights and phased commencement. The page does not assert that all provisions are already in force.
- [PIB explanation of the DPDP Rules](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655&lang=1&reg=3): transparency and phased implementation background.

Privacy copy follows the actual account, session, local bag/favourites, order, contact and moderated-review features. No online card collection or automatic refund is promised. Contact form testing used a mocked endpoint; no customer enquiry was created during QA.

## Assets

Generated with built-in image generation. Exact prompts and source/final paths are recorded in [oct31-editorial-prompts.json](oct31-editorial-prompts.json). Four WebP assets are under `client/public/assets/enso-home/`: community-studio-jp-v1, contact-conversation-jp-v1, journal-morning-jp-v1 and journal-enso-studio-jp-v1. These are campaign illustrations in photographic style, not customer endorsements.

## Verification

- Production build: passed.
- Existing page verifier: passed.
- Browser QA at 1440 px and 390 px: eight routes, four pair selections, equal desktop pair panels, selected-tab hover contrast, pair add-to-bag count, centered footer, policy anchors, contact category/submission state, retained Finder route, unchanged Presence assets, no broken page images or horizontal overflow.
- Browser page errors: zero.
- Visual inspection: pair desktop/mobile, centered footer, Community hero, Contact mobile form and policy hero.
- Screenshots and machine-readable results: `../../design-review/oct31-storefront/`.

Local preview: http://127.0.0.1:5180/. These changes have not been pushed or deployed as part of this refinement.
