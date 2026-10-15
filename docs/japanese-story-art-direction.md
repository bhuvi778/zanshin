# Japanese story and shared page direction

Updated Our Story with the personal fragrance question, everyday office example, Japanese inspiration, a dedicated Enso foundation, three interactive lessons, the Zan/Shin meaning, and a final consumer invitation. The same closing invitation appears at the bottom of Home.

## Closing artwork

Generated using the built-in image generation tool; copied into the repository as `client/public/assets/enso-home/story-promise-sunrise.webp`. Existing branded bottles are rendered by `LabelPack`; all copy and calls to action remain accessible HTML. The reference mockup bottles are not substituted for the approved bottle design.

Final prompt: Original premium Japanese fragrance closing-banner background. Open wooden shoji doorway overlooking a sunrise lake and Mount Fuji on the right, cherry blossoms above, empty dark stone shelf for four website-rendered bottles. Quiet ivory washi paper on the left for HTML copy; a delicate sumi-e Enso arc blends the two halves. Ink blue, ivory, antique gold and dusty coral. No products, people, lettering, logos or watermark. Reference-inspired original composition.

## Shared pages

`japanese-pages.css` scopes interior styling through Layout's `japanese-interior` class. The homepage keeps its existing hero, navigation and hover-card behavior. Collection, product detail, finder, contact, community, journal, shopping and support screens share the paper/ink/cedar palette. Admin studio is outside this layout.

Managed community/journal content remains driven by the backend. Legacy seeded home-approved images map to Japanese artwork; uploaded media stays intact. Original brand editorial content provides a useful fallback when there are no published entries, without invented customer testimonials.

## Verification

Production build; route SSR checks including story content, custom/gift routes and auth gates; browser public-route inspection for errors, broken loaded images and horizontal overflow; 390px responsive checks; story tabs, finder-to-product navigation and search.
