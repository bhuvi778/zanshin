# Zanshin campaign film footage

The final Zanshin campaign films are original edits created for this project from the following free Pexels video clips. The supplied client artwork and product imagery are not used in these films.

| Zanshin film | Source footage | Creator |
| --- | --- | --- |
| Focused hero — scattered attention | [A Stressed Woman Using Laptop](https://www.pexels.com/video/a-stressed-woman-using-laptop-6189264/) | Anna Tarazevich |
| Energised hero — morning beginning | [A Woman Getting Out of Bed](https://www.pexels.com/video/a-woman-getting-out-of-bed-4049556/) | Martina Tomšič |
| Focused | [Man Typing On Laptop](https://www.pexels.com/video/man-typing-on-laptop-6337301/) | Tima Miroshnichenko |
| Energised | [A Man Running In The Beach Shoreline](https://www.pexels.com/video/a-man-running-in-the-beach-shoreline-3191933/) | Pressmaster |
| Connected | [A Tired Man Taking a Rest After Folding His Laptop](https://www.pexels.com/video/a-tired-man-taking-a-rest-after-folding-his-laptop-8939327/) | Mikhail Nilov |
| Connected | [A Couple Dating in a Restaurant](https://www.pexels.com/video/a-couple-dating-in-a-restaurant-5101161/) | Jep Gambardella |
| Magnetized | [Woman Getting Ready While Looking In The Mirror](https://www.pexels.com/video/woman-getting-ready-while-looking-in-the-mirror-7271351/) | MART PRODUCTION |
| Magnetized | [Woman Walking on the City Street at Night](https://www.pexels.com/video/woman-walking-on-the-city-street-at-night-7062425/) | PNW Production |

All source clips are marked “Free to use” on their Pexels pages. The downloadable source files are intentionally ignored by Git. Run `npm run footage:download` inside `brand-films` before re-rendering.

## Implemented free motion-photograph edition
The hero now uses four original AI-generated campaign photographs, rendered locally with gentle camera movement and a moving light layer. These are animated still-image MP4s, not live-action generative video. No paid Weave generation was run. The product depictions are AI concept interpretations, not exact approved pack photography.
Sources are tracked in brand-films/artwork. Render entry: brand-films/src/HeroFilm.jsx. Nine seconds, 24 fps, 1280x720, silent H.264. Web assets use new original-motion filenames to avoid reusing cached stock clips.

## Generated image-to-video edition
Actual image-to-video clips were successfully downloaded and verified for Focused and Energised from their original campaign images using the public Wan2.2 14B Lightning demo at https://huggingface.co/spaces/zerogpu-aoti/wan2-2-fp8da-aoti-faster . Six inference steps, 3.5 seconds requested, fixed seed 42, no audio. No paid service or credits used. Human expression, hand and fabric movement are model-generated; source labels may soften or vary during movement. These are concept campaign visuals, not verified exact product pack footage.
The generated outputs are stored as client/public/films/*-emotion-video.mp4. Reproduction script: brand-films/scripts/generate-free-emotions.mjs (run from repository root). Free demo availability and quota are not guaranteed.

Connected generation returned a result but its download failed with File not allowed. Magnetized generation returned an unspecified service error twice. Those two hero slides retain the original motion photographs until valid outputs are available.

### Eight-second edits
At the user's request, Focused and Energised now use eight-second slow-motion edits of the verified 3.5625-second generated takes (playback rate 0.4453125). The longer duration is an edit of existing motion, not additional generated action. Source composition: EmotionEdit.jsx, 192 frames at 24 fps. Connected and Magnetized remain pending by user choice. The public demo reported anonymous ZeroGPU quota exceeded; no quota workaround was attempted.
