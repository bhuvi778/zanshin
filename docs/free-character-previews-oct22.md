# Free character-motion generation — 22 October 2026

## Latest homepage revision

The left hero carousel now contains all four fragrance videos. Focused uses a new 8.033-second, 1088 × 608 generated take, with sustained drawing movement. Magnetized now has a new 5.9-second, 768 × 448 character take showing composed eye contact, a head turn and a restrained smile. Both were generated through the same free Lightricks demo. No paid service was used.

- Focused: `focused-character-free-v2.mp4` and matching poster.
- Energised: existing `energised-character-free-v1.mp4` workout take retained.
- Connected: existing `connected-character-free-v1.mp4` couple take retained.
- Magnetized: `magnetized-character-free-v2.mp4` and matching poster.

A landscape workout input was generated at `brand-films/artwork/energised-workout-landscape-v2.png`. Its requested 1088 × 608 motion generation and the new Connected motion request returned unspecified errors; neither produced a replacement video. Receipts are in the task workspace at `outputs/design-review/fragrance-free-oct22-hero-v2/`. Do not describe the still artwork as a generated video or upscale as recovered detail.

Playback controls now use a compact explicit play/pause button. Headline sizing and mobile framing leave more space for character movement. Each clip plays to its actual end before advancing; inactive clips pause, and the last clip returns to the first. Explicit CMS video overrides remain supported.

## Earlier preview delivery

Generated with the public Lightricks LTX Video distilled demo using the existing character references. No paid API, credits, credentials or subscription was used.

| Fragrance | File under client/public/films | Actual duration | Dimensions | Observed movement |
|---|---|---|---|---|
| Focused | focused-character-free-v1.mp4 | 8.033 s | 896 x 512 | Lowers bottle, sets it on desk, attends to sketch and pencil |
| Energised | energised-character-free-v1.mp4 | 4.033 s | 352 x 512 | Controlled kettlebell lift, exertion and breathing |
| Connected | connected-character-free-v1.mp4 | 5.9 s | 768 x 448 | Natural eye contact, smiles, head movement and hands together |
| Magnetized | Not generated | — | — | Pending: LTX and Wan both returned event: error / data: null |

Review URL: `/film-review/index.html`. Native players and individual downloads are included. The static preview is deliberately not linked into the storefront navigation while the full campaign edits remain incomplete.

## Limits and remaining work

These are genuine generated character-motion tests, not completed 15-second multi-shot campaigns. Product lettering softens in generated motion. Energised does not include a fragrance bottle in the generated take; its product reference is displayed separately on the review page. Energised is low-resolution. The final edit, sound design and separately framed mobile masters remain outstanding.

The right bottle panel and Our Story Ensō film are unchanged. The latest carousel integration is described above; the table records the earlier preview delivery.

The services gave unspecified errors; the response does not establish whether quota, transient capacity or generation failure caused them. No quota bypass was attempted. The laptop has Intel Arc integrated graphics and 15.4 GiB system memory; a CUDA-only 13B generation setup was not installed locally.

## Reproduction and evidence

`node brand-films/scripts/generate-free-character.mjs focused`

Supported single-fragrance flags: `--free-preview` requests a smaller 6-second LTX job; `--light-test` requests a 4-second LTX test; `--wan` selects the public Wan demo. Each invocation is one job, stops on failure, and saves its event ID before collecting results. Do not rerun an uncertain submission without checking its saved status.

Local generation receipts and QA frames: `outputs/design-review/fragrance-free-oct22/` in the task workspace. Frame samples were inspected at beginning, middle and end. All three MP4s were decoded in the browser, and Focused playback was verified. The earlier Magnetized attempts failed; the latest revision above succeeded.

Provider: https://huggingface.co/spaces/Lightricks/LTX-Video-distilled

Model: https://huggingface.co/Lightricks/LTX-Video
