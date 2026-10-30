# Japanese cast and compact homepage update

- Added eight built-in image_gen campaign assets: four Japanese lifestyle scenes and four single-scene pair photographs. Exact prompts and output paths are recorded in japanese-cast-oct30-prompts.json. These are generated campaign visuals, not customer endorsements.
- Discovery, default Circle entries and default real-life stories share the same character imagery. Only known bundled sample assets are replaced; custom studio images/videos retain their behavior. Retired sample videos do not play behind thumbnails showing a different cast.
- Pair photographs have a separate product shelf, preserving all four pair choices, product links and add-to-bag behavior.
- Approach icons sit beside their titles; card padding and section gaps are smaller. The Rokkon / 51 ml explanation is a native, initially closed disclosure.
- Floating bag shows the live quantity after an addition, persists through navigation/reload and links to the existing bag/auth flow. It is hidden on bag/login pages and while a dialog is open.

## Validation

- Production build and existing page/render/auth checks pass.
- 121 finder occasion mappings and 121 automatic selection journeys pass.
- Actual Chrome at 1440px and 390px: all four finder results, product navigation/additions, all four pair tabs, pair additions, bag count/persistence, and 51 ml disclosure pass with no page errors.
- Keyboard menu End/Home/Escape, edit space, clearing stale moment, edit moment, reveal and restart pass.
- Finder still completes with API requests blocked. No finder implementation change was needed to make the tested flow work.
- Bag quantity increase/removal tested with an isolated mocked customer session; no real account, order, payment or shipment was created.
- No page/card overflow at 320px, 390px, 768px or 1440px.
- Screenshots and browser QA report: outputs/design-review/japanese-cast-oct30 in the parent workspace. Section-only captures hide fixed navigation during capture.

Local preview: http://127.0.0.1:5180/
Not pushed or deployed as part of this update.
