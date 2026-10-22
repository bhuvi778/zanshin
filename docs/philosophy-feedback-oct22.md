# Philosophy and homepage film update — 22 October 2026

## Scope agreed in chat

Keep the approved Japanese/Ensō artwork direction. No new PPT content was requested after clarification. Explore Zanshin and product-page client deliverables remain separate.

## Implemented

- Philosophy / Our Story now opens with an Ensō Effect hero film followed by the existing story, foundation, interactive lessons, Ensō-to-Zanshin meaning, everyday ritual and final promise.
- Four chapter links connect the long page. The foundation and lesson illustrations use the approved v4 artwork, with a distinct illustration for each lesson.
- Homepage opens with a Zanshin brand film. The supplied Media1 clip was found to contain ISSHUN branding and is no longer the active homepage film. The original file remains available in the repository.
- Both films are original, silent motion graphics made with Remotion using existing approved artwork, animated type, a drawing accent and gentle camera movement. They are not live-action productions or a newly supplied client-approved reel.
- Each film has a dedicated landscape (1280 x 720) and portrait (720 x 1280) render, approximately 14 seconds at 24 fps.
- Native play/pause/replay controls, muted inline playback, reduced-motion handling, poster fallback and retry are included. The homepage carousel advances on video completion rather than a timer while the film plays.

## Assets and reproduction

Files under `client/public/films/`:

- `enso-effect-v1.mp4`, `enso-effect-portrait-v1.mp4`, `enso-effect-v1-poster.jpg`
- `zanshin-brand-v1.mp4`, `zanshin-brand-portrait-v1.mp4`, `zanshin-brand-v1-poster.jpg`

Editable source: `brand-films/src/EnsoFilm.jsx` and composition registrations in `brand-films/src/Root.jsx`.

Rebuild from the repository root: `node brand-films/scripts/render-enso.mjs`.

## Verification

- Production build and existing route/authentication/data regression script pass.
- Browser: landscape film decodes at 1280 x 720, plays muted, and stops at completion. Homepage exits the film slide after its ended event.
- Browser at 390 x 844: portrait film selected and decoded at 720 x 1280; no horizontal page overflow.
- Interactive lesson buttons select the matching approved Japanese illustrations and content.
- Film loading uses an explicit responsive src; nested media-source selection was replaced after a real browser loading failure.

Screenshots are saved in the task workspace at `outputs/design-review/philosophy-oct22/`.
