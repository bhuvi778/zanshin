# Approved fragrance pages and moment finder

Implements the four reviewed fragrance detail directions as React pages with original label assets, individual colours, bottle/carton concepts, story sections, occasion guidance, ritual, related products, quantity, saved state and add-to-bag feedback. Prices remain labelled samples; live payments/shipping are not connected.

Find your moment is a separate route with Space, Moment, Review and Reveal screens. The custom category menu supports keyboard navigation and Escape. Back/Edit preserve valid choices; changing a category clears an incompatible occasion. Screen transitions respect reduced-motion preferences, and headings receive focus on step changes.

Discovery uses the same recommendations.json that seeds the server. No duplicate mapping snapshot and no runtime API dependency for category selection or reveal. This resolves the prior unavailable occasion-search path without implying backend checkout availability. Changes to the source map require a rebuild/deploy.

Validation: production build with --configLoader native; 23 SSR route and malformed-data regression checks; all 121 full recommendation journeys, four expected fragrance matches, required selections, invalid pairs, edits and reset checks. Browser interaction/visual testing remains unverified because earlier browser permission/URL policy blocked local preview access.

Commands:
- npm run build -w client -- --configLoader native
- node client/scripts/verify-pages.mjs
- node client/scripts/verify-moment-flow.mjs

Local preview: http://127.0.0.1:5178/find-your-moment
