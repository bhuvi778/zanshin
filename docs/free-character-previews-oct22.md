# Free character-motion generation — 22 October 2026

## Delivered previews

Generated with the public Lightricks LTX Video distilled demo using the existing character references. No paid API, credits, credentials or subscription was used.

| Fragrance | File under client/public/films | Actual duration | Dimensions | Observed movement |
|---|---|---|---|---|
| Focused | focused-character-free-v1.mp4 | 8.033 s | 896 x 512 | Lowers bottle, sets it on desk, attends to sketch and pencil |
| Energised | energised-character-free-v1.mp4 | 4.033 s | 352 x 512 | Controlled kettlebell lift, exertion and breathing |
| Connected | connected-character-free-v1.mp4 | 5.9 s | 768 x 448 | Natural eye contact, smiles, head movement and hands together |
| Magnetized | Not generated | — | — | Pending: LTX and Wan both returned event: error / data: null |

Review URL: `/film-review/index.html`. Native players and individual downloads are included. The static preview is deliberately not linked into the storefront navigation while the fourth film and full campaign edits remain incomplete.

## Limits and remaining work

These are genuine generated character-motion tests, not completed 15-second multi-shot campaigns. Product lettering softens in generated motion. Energised does not include a fragrance bottle in the generated take; its product reference is displayed separately on the review page. Energised is low-resolution. The final edit, sound design, separately framed mobile masters and the fourth clip remain outstanding.

Following the requested placement correction, the three available clips now play in the homepage left hero carousel on their matching fragrance slides. Each video advances only after playback ends; inactive videos pause. Magnetized retains its existing image slide until its new clip is available. The right bottle panel and Our Story Ensō film are unchanged. Explicit videos uploaded through the hero CMS take precedence over these default clips.

The services gave unspecified errors; the response does not establish whether quota, transient capacity or generation failure caused them. No quota bypass was attempted. The laptop has Intel Arc integrated graphics and 15.4 GiB system memory; a CUDA-only 13B generation setup was not installed locally.

## Reproduction and evidence

`node brand-films/scripts/generate-free-character.mjs focused`

Supported single-fragrance flags: `--free-preview` requests a smaller 6-second LTX job; `--light-test` requests a 4-second LTX test; `--wan` selects the public Wan demo. Each invocation is one job, stops on failure, and saves its event ID before collecting results. Do not rerun an uncertain submission without checking its saved status.

Local generation receipts and QA frames: `outputs/design-review/fragrance-free-oct22/` in the task workspace. Frame samples were inspected at beginning, middle and end. All three MP4s were decoded in the browser, and Focused playback was verified. No new video was returned by any Magnetized attempt.

Provider: https://huggingface.co/spaces/Lightricks/LTX-Video-distilled

Model: https://huggingface.co/Lightricks/LTX-Video
