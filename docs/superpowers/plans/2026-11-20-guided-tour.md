# Guided Tour Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A step-by-step spotlight tour of the page that works on desktop and phones.

**Architecture:** `src/ui/tourModel.ts` is pure and unit-tested: the steps, card placement, and the
"seen" flag. `src/ui/tour.ts` renders the overlay and card and is checked in the browser. `main.ts`
starts it on first visit and from a "How it works" button.

**Tech Stack:** TypeScript, Vitest (node environment, no DOM library).

**Spec:** `docs/2026-11-20-guided-tour-design.md`

## Global Constraints
- Phone layout means `max-width: 760px`, the same breakpoint as the existing phone layout.
- Storage key `brain-states.tour-seen`; every storage access is wrapped so a failure never throws.
- Button labels exactly `Back`, `Next`, `Skip tour`, and `Done` on the last step; reopen button `How it works`.

## Review Focus
1. **Storage blocked** (private window): the tour shows and nothing throws (Task 1 test).
2. **A target missing** (e.g. no treatment count): the step shows as a centred card instead of breaking (Task 1 test for placement with no rect; Task 2 by hand).
3. **Card near the screen edge** on desktop: stays fully on screen (Task 1 test).
4. **Phone:** the lit part is scrolled into view and the card does not cover it (Task 2, checked at 375×812).
5. **Opening the tour while an episode is playing or a search is typed:** it pauses, clears the search and shows the example (Task 2 by hand).

---

### Task 1: Tour model
**Files:** Create `src/ui/tourModel.ts`; test `tests/ui/tourModel.test.ts`.

**Produces:**
- `interface TourStep { id: string; title: string; text: string; target: string | null }` (`target` is a CSS selector; null = centred).
- `TOUR_STEPS: TourStep[]` (11 steps, first `welcome` with null target, last `about`).
- `placeCard(target: Rect | null, card: {width:number;height:number}, view: {width:number;height:number}, narrow: boolean): {left:number; top:number}` with `Rect = {left,top,width,height}`. Narrow: bottom sheet (`left` 0, `top = view.height - card.height`). Null target: centred. Otherwise below the target if it fits, else above, else beside; always clamped 12 px inside the view.
- `tourSeen(storage: Pick<Storage,'getItem'> | null): boolean`, `markTourSeen(storage: Pick<Storage,'setItem'> | null): void`.

- [ ] Tests: every step has non-empty title and text and a unique id; first is `welcome` with null target; placement below / above / clamped / centred / narrow; `tourSeen` false for null or throwing storage, true after `markTourSeen`; `markTourSeen` with throwing storage does not throw.
- [ ] Run, watch fail; implement; run, pass; commit `feat: tour steps, card placement and seen flag`.

### Task 2: Tour overlay and wiring
**Files:** Create `src/ui/tour.ts`; modify `src/main.ts`, `index.html`, `src/style.css`.

**Consumes:** Task 1.
**Produces:** `createTour(options: { prepare: () => Promise<void>; onClose?: () => void }): { open(): Promise<void> }`.

- [ ] `open()` awaits `prepare` (main: pause, clear search, pick Depression, seek to the middle of its "inward" phase), then shows step 1. Spotlight = fixed box over the target rect with a large dimming shadow; card `role="dialog"` with `aria-labelledby`, step count "3 of 11", Back/Next/Skip. Position updated every animation frame while open (targets move with scrolling and resizing). Phone: `scrollIntoView({block:'center'})` on the target before placing.
- [ ] Keys: ArrowRight/ArrowLeft/Escape. Focus to Next on open; back to the opener on close. `markTourSeen` on close or finish.
- [ ] `index.html`: `How it works` button beside About. `main.ts`: auto-open when `!tourSeen(localStorage)` (guard access).
- [ ] Browser check at 1366×768 and 375×812: every step's target lit and the card readable; no console errors.
- [ ] `npx vitest run` and `npx tsc --noEmit -p .` pass; commit `feat: guided tour of the page, on desktop and phones`.
