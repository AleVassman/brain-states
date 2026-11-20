# Guided tour: short design

Date: 2026-11-20. Approved by the owner ("go ahead with this plan").

## Why
The page has many parts (episode tabs and search, treatment counts, timeline, caption, legend, name tags,
the typical-response switch, the details panel, clicking regions, About). A first-time visitor, often someone
living with one of these conditions or close to someone who does, needs to be shown how to read it. It must
work on desktop and on phones.

## Approaches
- **A. A spotlight tour over the real page (chosen).** One step at a time, the part being explained is lit and
  the rest dimmed, with a card (Back, Next, Skip). Teaches the real interface where it actually is.
- **B. A slideshow of screenshots in a dialog.** Simple, but goes stale whenever the interface changes and
  shows a phone user desktop pictures.
- **C. Tooltips that appear on first hover.** Unobtrusive, but there is no hover on phones and no order.

## Design
- About 11 steps in plain language: welcome; the brain (drag, zoom, click a region); what the colours and
  lines mean; name tags; choosing an episode (Mind/Body, search); treatments under a condition; playing and
  the timeline; the caption and the at-rest note; the details panel (confidence, sources, What helps links);
  the typical-response switch; About, the helpline link and how to reopen the tour.
- The tour loads Depression and moves to a step where much is lit, so what is explained is visible.
- Starts by itself on the first visit; Skip ends it at any time; it is remembered (browser storage, which
  can fail, so failure means "show it", never a crash). A "How it works" button next to About reopens it.
- Desktop: the card sits beside the lit part, kept on screen. Phone (≤ 760 px): the card is a sheet at the
  bottom; the page scrolls each part into view first.
- Keyboard: Next/Back buttons, arrow keys, Escape to close; focus moves to the card and returns afterwards.

## Left to the builder
Exact wording, styling within the existing look, and which part each step lights.
