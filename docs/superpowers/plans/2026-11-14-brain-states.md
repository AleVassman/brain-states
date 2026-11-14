# Brain States Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A static web app showing a glowing 3D atlas-based brain that plays researched, cited "episodes" of four emotional states over a scrubbable timeline.

**Architecture:** A renderer (Three.js) that knows nothing about any condition plays "score" JSON files. Pure TypeScript modules validate scores, sample them at a time `t`, and drive a `Player`; the 3D layer and the DOM UI only consume the player's `Frame`. Brain geometry is produced once, offline, by a Python script from open atlases.

**Tech Stack:** TypeScript, Vite, Three.js (with `three/examples/jsm` OrbitControls, GLTFLoader, EffectComposer, UnrealBloomPass), Vitest. Offline tooling: Python 3.11+ with nibabel, scikit-image, trimesh. No UI framework, no backend.

**Spec:** `docs/2026-11-14-brain-states-design.md` (look reference: `docs/reference-look.png`). Read both before any task.

## Global Constraints

- Desktop browser only; mouse or trackpad. No phone/tablet work.
- Static site: no server, accounts, saving or analytics.
- Target 60 fps on integrated graphics; floor 30 fps.
- Every region mesh comes from a published atlas in MNI space, or is a soft marker at published coordinates flagged `approximate`. Nothing is placed by eye. The head mesh is exempt.
- Every atlas, mesh and font must allow public non-commercial redistribution with attribution; each is listed in `CREDITS.md`.
- No claim enters a score unless the researcher opened the source and it says so. Nothing cited from memory.
- Confidence levels are exactly `established`, `mixed`, `debated`.
- Activity scale: `-1` (strongly below) … `0` (typical brain at rest) … `+1` (strongly above), for both variants.
- The typical variant is researched independently; never derived from the condition variant. If unsupported, `typical` is `null`.
- Copy rules: no one-region-one-emotion wording, nothing diagnostic, no treatment advice, neutral language ("differences in regulation", never "broken").
- Meaning is carried by brightness and motion as well as colour.
- Use `git init` in the project root at Task 1; commit at the end of every task.

## Review Focus

1. **A score fails to load or fails validation** — the app shows the list of errors in the side panel for that state, keeps the brain at baseline, and the other states stay usable. (Task 7)
2. **State switched mid-playback** — the brain returns to baseline with no glow or pulses left over from the previous score, and the timeline resets to 0. (Task 3, Task 7)
3. **Scrubbing to exactly the start or end, or a track whose keyframes do not span 0…1** — values hold at the nearest keyframe; no `NaN`, no jump. (Task 2)
4. **Clicking a region that is not part of the current state** — the side panel names the region and says it is not part of this state's documented pattern; no empty panel, no error. (Task 7)
5. **WebGL unavailable or the graphics context is lost** — a plain message replaces the canvas; no blank page. (Task 5)

---

## File Structure

```
package.json, tsconfig.json, vite.config.ts, index.html, CREDITS.md
tools/
  build_atlas.py          offline: atlas volumes -> public/atlas/*
  ATLAS.md                atlas decision record: sources, licences, coverage
public/
  atlas/brain.glb         one named node per region id
  atlas/regions.json      RegionInfo[]
  atlas/head.glb          decorative head
  scores/index.json       [{ id, title, file }]
  scores/<id>.json        one Score per state
research/<id>-claims.md   every claim beside its source and quote
src/
  score/types.ts          Score types
  score/validate.ts       validateScore
  score/timeline.ts       sampleTrack, phaseAt, frameAt
  score/load.ts           loadScoreIndex, loadScore
  player/player.ts        Player
  brain/appearance.ts     activityToAppearance (pure)
  brain/atlas.ts          loadAtlas
  brain/scene.ts          createStage (renderer, camera, controls, bloom)
  brain/regions.ts        RegionLayer (apply activity, picking, shimmer)
  brain/connections.ts    ConnectionLayer
  brain/backdrop.ts       head wireframe + particles
  ui/timeline.ts, ui/statePicker.ts, ui/sidePanel.ts, ui/caption.ts, ui/about.ts
  main.ts                 wiring only
  style.css
tests/                    mirrors src/ for the pure modules
```

## Shared types (defined in Task 1, used everywhere)

```ts
// src/score/types.ts
export type Confidence = 'established' | 'mixed' | 'debated';
export type VariantName = 'condition' | 'typical';

export interface Citation {
  authors: string; year: number; title: string; doi: string;
  kind: 'meta-analysis' | 'review' | 'study';
  access: 'full-text' | 'abstract-only';
  quote: string;                       // the sentence that supports the claim
}
export interface Keyframe { t: number; v: number }   // t in [0,1], v in [-1,1]

interface TrackBase {
  explanation: string; confidence: Confidence;
  citations: Citation[]; keyframes: Keyframe[];
}
export interface RegionTrack extends TrackBase { region: string }       // region id or group
export interface ConnectionTrack extends TrackBase { from: string; to: string }

export type PhaseOrder =
  | { kind: 'timed'; citations: Citation[] }
  | { kind: 'reconstructed'; rationale: string };

export interface Phase {
  id: string; name: string; timescale: string;   // e.g. "under a second"
  start: number; end: number;                    // share of screen time, [0,1]
  caption: string; typicalCaption?: string;
  order?: PhaseOrder;                            // required on every phase except the first
}
export interface Variant { regions: RegionTrack[]; connections: ConnectionTrack[] }

export interface Score {
  id: string; title: string; description: string; caveat: string;
  placeholder?: boolean;
  durationSeconds: number;
  phases: Phase[];
  condition: Variant;
  typical: Variant | null;
}

export interface RegionInfo {
  id: string;            // e.g. "amygdala-l"; equals the node name in brain.glb
  group: string;         // e.g. "amygdala"
  name: string;          // display name
  hemisphere: 'l' | 'r' | 'mid';
  centroid: [number, number, number];
  kind: 'mesh' | 'marker';
  approximate: boolean;  // true for markers
  radius?: number;       // markers only, in scene units
  source: string;        // atlas name
}

export interface Frame {
  t: number; phase: Phase; variant: VariantName;
  regions: Map<string, number>;                         // RegionInfo.id -> activity
  connections: { from: string; to: string; v: number }[]; // RegionInfo.group names
}
```

Required region groups (spec section 7): `amygdala`, `hippocampus`, `hypothalamus`, `thalamus`, `nucleus-accumbens`, `insula`, `dacc`, `sgacc`, `mpfc`, `dlpfc`, `vlpfc`, `ofc`, `pcc-precuneus`, `pag`.

---

### Task 1: Project scaffold and score validation

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore`, `src/main.ts` (empty canvas page), `src/score/types.ts`, `src/score/validate.ts`
- Test: `tests/score/validate.test.ts`, `tests/fixtures/validScore.ts`

**Interfaces:**
- Produces: all types above; `validateScore(raw: unknown, regionNames: Set<string>): { ok: true; score: Score } | { ok: false; errors: string[] }`. `regionNames` holds every `RegionInfo.id` and every `group`.
- Produces: `tests/fixtures/validScore.ts` exporting `validScore(): Score` (two phases, one region track on `amygdala`, one connection `amygdala`→`mpfc`, a typical variant) and `REGION_NAMES: Set<string>`.

- [ ] **Step 1:** `git init`; `npm init -y`; `npm i three`; `npm i -D vite typescript vitest @types/three`. Scripts: `dev` = `vite`, `build` = `tsc --noEmit && vite build`, `test` = `vitest run`. `tsconfig` strict.
- [ ] **Step 2: Write failing tests** in `tests/score/validate.test.ts`. Each mutates `validScore()` and asserts `ok === false` with an error containing the quoted text:
  - valid fixture → `ok === true`
  - region track with `citations: []` → `"citation"`
  - `confidence: 'high'` → `"confidence"`
  - track `region: 'nowhere'` → `"unknown region"`; connection `to: 'nowhere'` → `"unknown region"`
  - keyframe `v: 1.5` → `"range"`; keyframe `t: -0.1` → `"range"`
  - keyframes with `t` 0.5 then 0.2 → `"order"`
  - track with `keyframes: []` → `"keyframe"`
  - second phase without `order` → `"order"`; `order.kind: 'timed'` with no citations → `"citation"`; `order.kind: 'reconstructed'` with empty `rationale` → `"rationale"`
  - phases that leave a gap or overlap, or do not span exactly 0…1 → `"phase"`
  - `typical` present but a phase lacks `typicalCaption` → `"typicalCaption"`
  - citation with empty `doi` or empty `quote` → `"citation"`
  - `raw = null` and `raw = "x"` → `ok === false`, no throw
  - two problems at once → `errors.length === 2` (all errors collected, not first only)
- [ ] **Step 3:** Run `npm test -- tests/score/validate.test.ts`. Expected: FAIL, `validateScore` not found.
- [ ] **Step 4:** Implement types and `validateScore`. Hand-written checks, no schema library. Error strings start with a path, e.g. `condition.regions[0]: missing citation`.
- [ ] **Step 5:** Run the test. Expected: PASS. Run `npm run build`. Expected: no type errors.
- [ ] **Step 6:** Commit `feat: scaffold and score validation`.

### Task 2: Timeline sampling

**Files:**
- Create: `src/score/timeline.ts`
- Test: `tests/score/timeline.test.ts`

**Interfaces:**
- Consumes: types; `validScore()`; a `RegionInfo[]` fixture with `amygdala-l`, `amygdala-r`, `mpfc-mid`.
- Produces:
  - `sampleTrack(keyframes: Keyframe[], t: number): number`
  - `phaseAt(score: Score, t: number): Phase`
  - `frameAt(score: Score, variant: VariantName, t: number, regions: RegionInfo[]): Frame`

- [ ] **Step 1: Write failing tests:**
  - `sampleTrack([{t:0,v:0},{t:1,v:1}], 0.25)` → `0.25` (linear)
  - before first keyframe and after last keyframe → holds the nearest value (`[{t:0.2,v:0.5},{t:0.6,v:-1}]` at `0` → `0.5`, at `1` → `-1`)
  - single keyframe → that value at any `t`
  - exactly on a keyframe → that keyframe's value; result is never `NaN` for `t` of `0`, `1`, `-5`, `7`
  - `phaseAt` at a boundary returns the later phase; at `t = 1` returns the last phase; `t < 0` returns the first
  - `frameAt`: a track on group `amygdala` sets both `amygdala-l` and `amygdala-r`; a track on id `amygdala-l` sets only that id; a region with no track is `0`; when both a group track and an id track cover a region, the id track wins
  - `frameAt(score, 'typical', …)` when `score.typical === null` → every region `0`, `connections` empty
- [ ] **Step 2:** Run `npm test -- tests/score/timeline.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement the three functions.
- [ ] **Step 4:** Run. Expected: PASS.
- [ ] **Step 5:** Commit `feat: timeline sampling`.

### Task 3: Player

**Files:**
- Create: `src/player/player.ts`
- Test: `tests/player/player.test.ts`

**Interfaces:**
- Consumes: `frameAt`, types.
- Produces:

```ts
export class Player {
  constructor(regions: RegionInfo[]);
  load(score: Score | null): void;      // resets t=0, paused, variant 'condition'
  play(): void; pause(): void;
  seek(t: number): void;                // clamps to [0,1]
  setVariant(v: VariantName): void;     // ignored if score.typical is null
  tick(dtSeconds: number): void;        // advances only while playing
  readonly t: number; readonly playing: boolean;
  readonly variant: VariantName; readonly score: Score | null;
  frame(): Frame | null;                // null when no score is loaded
  onChange(cb: () => void): () => void; // fires on any state change; returns unsubscribe
}
```

- [ ] **Step 1: Write failing tests:**
  - after `load` + `play` + `tick(durationSeconds / 2)` → `t` ≈ `0.5`
  - reaching the end: `t === 1`, `playing === false`; `play()` at `t === 1` restarts from `0`
  - `tick` while paused leaves `t` unchanged
  - `tick(60)` (tab was hidden) advances by at most `0.1` seconds' worth
  - `seek(2)` → `1`; `seek(-1)` → `0`; seeking backwards then `frame()` matches `frameAt` at that `t`
  - `load(other)` mid-playback → `t === 0`, `playing === false`, `variant === 'condition'`, and `frame()` contains no region key or connection from the previous score that the new score lacks
  - `load(null)` → `frame() === null`
  - `setVariant('typical')` on a score with `typical: null` → variant stays `'condition'`
  - `onChange` fires on `play`, `pause`, `seek`, `setVariant`, `load`, and on `tick` while playing; the unsubscribe stops it
- [ ] **Step 2:** Run `npm test -- tests/player/player.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement `Player`.
- [ ] **Step 4:** Run. Expected: PASS.
- [ ] **Step 5:** Commit `feat: player`.

### Task 4: Atlas decision and geometry pipeline

**Files:**
- Create: `tools/ATLAS.md`, `tools/build_atlas.py`, `tools/requirements.txt`, `public/atlas/brain.glb`, `public/atlas/regions.json`, `public/atlas/head.glb`, `CREDITS.md`
- Test: `tests/atlas/regions.test.ts`

**Interfaces:**
- Produces: `public/atlas/regions.json` as `RegionInfo[]`; `brain.glb` with exactly one node per `kind: 'mesh'` entry, node name = `id`; coordinates in MNI millimetres, converted to scene units by dividing by 100, with +Y up and +Z towards the face.

- [ ] **Step 1: Choose atlases and record the decision in `tools/ATLAS.md`.** Evaluate the spec's candidates (Harvard-Oxford, Desikan-Killiany, Julich-Brain, Open Anatomy Project, BodyParts3D) and any other published MNI-space atlas. For each one used, open its licence page and record: name, version, download URL, licence name, the licence sentence permitting public non-commercial redistribution, required attribution. Include a coverage table: each of the 14 required groups → atlas label(s) it is composed from, or "marker" with the published coordinate and its source paper (opened, DOI recorded), or "dropped" with the reason. Reject any atlas whose licence was not read.
- [ ] **Step 2: Write the failing test** `tests/atlas/regions.test.ts` (reads the files from disk):
  - `regions.json` parses and every entry has all `RegionInfo` fields with the right types
  - every group in the coverage table that is not "dropped" appears; paired structures have both `-l` and `-r`
  - every `kind: 'marker'` has `approximate === true` and a `radius`; every `kind: 'mesh'` has `approximate === false`
  - ids are unique; every `kind: 'mesh'` id is a node name in `brain.glb` and no extra nodes exist (parse the GLB JSON chunk)
  - `brain.glb` is under 15 MB
- [ ] **Step 3:** Run `npm test -- tests/atlas`. Expected: FAIL, files missing.
- [ ] **Step 4:** Write `tools/build_atlas.py`: load label volumes, extract each region with marching cubes, smooth, decimate (target: whole brain ≤ 400k triangles), write `brain.glb` and `regions.json`. Also emit a whole-cortex surface per hemisphere as nodes `cortex-l`, `cortex-r` listed in `regions.json` with group `cortex` (used for the outer wireframe; never targeted by scores).
- [ ] **Step 5:** Add an openly licensed head mesh as `public/atlas/head.glb`, scaled and positioned around the brain. Record source and licence in `ATLAS.md`.
- [ ] **Step 6:** Run the script, then `npm test -- tests/atlas`. Expected: PASS.
- [ ] **Step 7:** Write `CREDITS.md` from `ATLAS.md`. Commit `feat: atlas geometry`.

**Stop and report to the owner** if any required group ends as "dropped": the spec lets the research pass drop regions, but the owner should know before scores are written.

### Task 5: The brain on screen

**Files:**
- Create: `src/brain/appearance.ts`, `src/brain/atlas.ts`, `src/brain/scene.ts`, `src/brain/regions.ts`, `src/brain/backdrop.ts`, `src/style.css`
- Modify: `src/main.ts`, `index.html`
- Test: `tests/brain/appearance.test.ts`

**Interfaces:**
- Produces:
  - `activityToAppearance(v: number): { color: [number, number, number]; intensity: number }` — linear blend. `v = 0` → `#3fa9ff`, intensity `0.35`; `v = +1` → `#ff6a3d`, intensity `1.6`; `v = -1` → `#3b1f6b`, intensity `0.08`. Input clamped to [-1, 1].
  - `loadAtlas(): Promise<{ regions: RegionInfo[]; meshes: Map<string, THREE.Mesh> }>`
  - `createStage(canvas: HTMLCanvasElement): { scene; camera; render(dt: number): void; resize(): void; dispose(): void } | { error: string }` — returns `{ error }` when WebGL is unavailable.
  - `class RegionLayer { constructor(stage, atlas); apply(frame: Frame | null): void; setUncertain(ids: Set<string>): void; update(dt: number): void; pick(clientX: number, clientY: number): RegionInfo | null }`

- [ ] **Step 1: Write failing tests** for `activityToAppearance`: the three anchor values exactly; `v = 0.5` is the midpoint of baseline and `+1` in both colour and intensity; `v = 3` equals `v = 1`; intensity strictly increases with `v` across `-1, -0.5, 0, 0.5, 1` (brightness alone orders activity). Also `tests/brain/scene.test.ts`: `createStage` given a fake canvas whose `getContext` returns `null` returns an object with an `error` string and does not throw.
- [ ] **Step 2:** Run `npm test -- tests/brain`. Expected: FAIL. Implement. Run. Expected: PASS.
- [ ] **Step 3:** Implement `loadAtlas`, `createStage` (OrbitControls with damping, zoom limits, no pan; EffectComposer with UnrealBloomPass; background `#05070d`), and the WebGL-missing / `webglcontextlost` path: hide the canvas and show "This needs WebGL, which your browser or graphics driver has turned off."
- [ ] **Step 4:** Implement `RegionLayer`. Each region is drawn as glowing points plus fine edge lines with additive blending; cortex nodes are drawn the same way at low opacity so deep regions show through. `apply(null)` and regions absent from the frame go to `v = 0`. `update` adds the baseline shimmer: intensity × `(1 + 0.08·sin(time·0.8 + per-region phase))`. Regions in `setUncertain` get a flickering outline. Markers render as soft glowing spheres of their `radius`.
- [ ] **Step 5:** Implement `backdrop.ts`: head as cool-blue points and lines at low opacity, never occluding the brain (no depth write); a slow drifting field of out-of-focus particles.
- [ ] **Step 6:** Wire `main.ts`: load atlas, build stage, layers, `requestAnimationFrame` loop, window resize → `stage.resize()`.
- [ ] **Step 7: Verify by eye.** `npm run dev`, open the page, screenshot, compare with `docs/reference-look.png`. Pass when: dark background with drifting particles; blue see-through wireframe head; brain clearly the brightest thing; folds visible as glowing lines; amygdala and hippocampus visible through the cortex from the side view; drag rotates, wheel zooms; baseline visibly shimmering; frame time ≤ 33 ms in the browser's performance panel. Temporarily call `apply` with a hand-made frame setting `amygdala` to `+1` and `dlpfc` to `-1` to check warm/bright versus violet/dim, then remove it.
- [ ] **Step 8:** Commit `feat: brain rendering`.

**Show the owner a screenshot before Task 6.** The look is theirs to judge; adjust until they are happy.

### Task 6: Connections

**Files:**
- Create: `src/brain/connections.ts`
- Modify: `src/main.ts`
- Test: `tests/brain/connections.test.ts`

**Interfaces:**
- Consumes: `Frame.connections`, `RegionInfo.centroid`.
- Produces:
  - `connectionStyle(v: number): { opacity: number; pulseRate: number; dashed: boolean }` — `v = 0` → opacity `0.15`, `pulseRate 0`, not dashed; `v > 0` → opacity `0.15 + 0.85·v`, `pulseRate = 3·v` pulses per second, not dashed; `v < 0` → opacity `0.15·(1 + v)` floor `0.03`, `pulseRate 0`, dashed.
  - `groupCentroid(group: string, regions: RegionInfo[]): [number, number, number][]` — one centroid per hemisphere member (so `amygdala`→`mpfc` draws from both amygdalae).
  - `class ConnectionLayer { constructor(stage, regions: RegionInfo[]); apply(frame: Frame | null): void; update(dt: number): void }`

- [ ] **Step 1: Write failing tests** for `connectionStyle` (the values above at `v = 0, 1, 0.5, -0.5, -1`) and `groupCentroid` (paired group → 2 points; midline group → 1; unknown group → empty array).
- [ ] **Step 2:** Run `npm test -- tests/brain/connections.test.ts`. Expected: FAIL. Implement the two pure functions. Run. Expected: PASS.
- [ ] **Step 3:** Implement `ConnectionLayer`: a curved line per connection (quadratic curve bowed away from the brain centre), pulses as bright points travelling `from` → `to`. `apply(null)` or a connection missing from the frame removes its line and pulses immediately.
- [ ] **Step 4: Verify by eye** with a temporary hand-made frame: one connection at `+1` (fast bright pulses), one at `-1` (sparse dim dots). Remove the temporary frame.
- [ ] **Step 5:** Commit `feat: connections`.

### Task 7: Interface and wiring

**Files:**
- Create: `src/score/load.ts`, `src/ui/statePicker.ts`, `src/ui/timeline.ts`, `src/ui/caption.ts`, `src/ui/sidePanel.ts`, `src/ui/about.ts`, `public/scores/index.json`, `public/scores/placeholder.json`
- Modify: `src/main.ts`, `index.html`, `src/style.css`
- Test: `tests/score/load.test.ts`, `tests/ui/sidePanel.test.ts`

**Interfaces:**
- Consumes: `Player`, `validateScore`, `RegionLayer.pick`, `RegionLayer.setUncertain`.
- Produces:
  - `loadScoreIndex(): Promise<{ id: string; title: string; file: string; reviewed: boolean }[]>` — the picker shows "awaiting review" beside any entry with `reviewed: false`.
  - `loadScore(file: string, regionNames: Set<string>, fetchFn?: typeof fetch): Promise<{ ok: true; score: Score } | { ok: false; errors: string[] }>` — network failure and invalid JSON both return `ok: false` with one readable error; never throws.
  - `regionPanelContent(region: RegionInfo, score: Score | null, variant: VariantName): { title: string; body: string; confidence: Confidence | null; citations: Citation[]; approximate: boolean }` (pure; the DOM code only renders it).

- [ ] **Step 1: Write failing tests:**
  - `loadScore` with a `fetchFn` that rejects → `ok: false`, error contains `"could not load"`; with a body of `"{"` → error contains `"not valid JSON"`; with an invalid score → the validator's errors; with the valid fixture → `ok: true`
  - `regionPanelContent` for a region with a track → `body` is the track's `explanation`, citations passed through
  - region not in the score → `body === "Not part of this state's documented pattern."`, `confidence === null`, `citations` empty
  - `score === null` → body `"Pick a state to see what this region does in it."`
  - marker region → `approximate === true`
  - id-level track beats group-level track, as in `frameAt`
- [ ] **Step 2:** Run `npm test -- tests/score/load.test.ts tests/ui`. Expected: FAIL. Implement. Run. Expected: PASS.
- [ ] **Step 3:** Write `public/scores/placeholder.json`: `placeholder: true`, title "Placeholder — not real science", four phases, a few tracks with dummy citations whose `title` is "PLACEHOLDER". When `score.placeholder` is true the caption bar shows "PLACEHOLDER DATA — NOT REAL SCIENCE" permanently.
- [ ] **Step 4:** Build the layout from the spec's sketch (section 5): state list left, brain centre, panel right, caption and timeline bottom, "about the science" top right.
  - `statePicker`: lists `index.json`; selecting calls `loadScore` then `player.load`. On `ok: false`: `player.load(null)`, side panel shows "This state could not be loaded:" and the error list; other states remain selectable.
  - `timeline`: play/pause button; phase segments sized by `start`/`end`, each labelled with `name` and `timescale`; a phase whose `order.kind === 'reconstructed'` gets a dashed top border and a tooltip "Order reconstructed: " + rationale; draggable scrub handle calling `player.seek`; a fixed note "Screen time is not real time."
  - `caption`: current phase `caption`, or `typicalCaption` when the variant is typical.
  - "Typical response" toggle: disabled with tooltip "No comparison: the research does not support one for this state" when `score.typical === null`.
  - `sidePanel`: renders `regionPanelContent`; confidence shown as the words "Well established", "Mixed evidence", "Still debated"; each citation as authors, year, title, a `https://doi.org/` link, its `quote`, and "abstract only" where applicable; "Approximate location" badge for markers; when nothing is selected, the score's `description` and `caveat`.
  - On `player.onChange`: `regions.apply(frame)`, `connections.apply(frame)`, update UI. On score load: `regions.setUncertain(...)` with ids whose track confidence is not `established`.
  - `about`: a modal with four short sections — "A reconstruction, not a recording", "Group averages, not your brain", "How confident each claim is" (the three levels and timed/reconstructed), "Lines are communication, not wires", "Brightness shows direction, not a measurement", plus "Not a diagnostic tool or medical advice" and a link to `CREDITS.md` content.
- [ ] **Step 5: Verify by eye:** play the placeholder end to end; scrub backwards; toggle typical; click a tracked region, an untracked region and empty space; switch state mid-playback and confirm no leftover glow; rename `placeholder.json` temporarily and confirm the error panel, then restore it.
- [ ] **Step 6:** `npm test` (all) and `npm run build`. Expected: PASS, no type errors. Commit `feat: interface and playback`.

---

## Research procedure (applies to Tasks 8–11)

Each of these tasks produces `research/<id>-claims.md` and `public/scores/<id>.json`, and adds the state to `public/scores/index.json`.

1. Start from the spec's "starting hypotheses" for the state (section 7). Treat them as questions, not answers.
2. Search for meta-analyses and systematic reviews first, single studies second. Open each source. Read full text where openly available; otherwise the abstract.
3. For every candidate claim (a region's direction of change, a connection's change, a timing or order), write a row in `research/<id>-claims.md`: claim in plain words · source (authors, year, title, DOI) · kind · access · the supporting sentence quoted exactly · confidence · notes on contrary findings. An abstract-only source supports a claim only if the abstract states it explicitly.
4. Assign confidence by the spec's definitions. Mainly animal evidence → `debated`, and the track's `explanation` says so.
5. Do the same, separately, for the typical response, from studies of people without the condition. If it cannot be supported, set `typical: null` and say why at the top of the claims file.
6. Draft phases. For each step between phases decide `timed` (cite the time-resolved source) or `reconstructed` (one-line rationale).
7. Write the score. Keyframe values express direction and rough relative size only. Every track's `explanation` is one or two plain sentences following the copy rules. The score's `caveat` states what in this episode is reconstruction.
8. Run `npm test` — a test in `tests/score/shipped.test.ts` (added in Task 8) loads every file in `public/scores/index.json` through `validateScore` against the real `regions.json`.
9. Watch the episode end to end in the app, in both variants.
10. **Owner gate:** give the owner `research/<id>-claims.md` and the running episode. The state's entry in `index.json` carries `reviewed: false` until they have read the claims; then set it to `true` and record their sign-off as a line at the top of the claims file.

Drop any hypothesis the sources do not support, even if it makes the episode less dramatic.

### Task 8: Anxiety / threat response

**Files:** Create `research/anxiety-claims.md`, `public/scores/anxiety.json`, `tests/score/shipped.test.ts`; modify `public/scores/index.json`.

- [ ] **Step 1:** Write `tests/score/shipped.test.ts`: for every entry in `index.json`, the file exists and `validateScore` returns `ok: true` against names built from `public/atlas/regions.json`; every non-placeholder score has no citation whose `title` contains "PLACEHOLDER"; every `doi` matches `/^10\.\d{4,9}\/\S+$/`. Run. Expected: PASS for the placeholder.
- [ ] **Step 2:** Follow the research procedure, steps 1–7, for anxiety (id `anxiety`, timescale under a second to minutes).
- [ ] **Step 3:** Procedure steps 8–10. Commit `feat: anxiety episode`.

Anxiety goes first because its timing evidence is the strongest of the four, so it tests the score format against real research before the harder states.

### Task 9: Borderline emotional spike

**Files:** Create `research/borderline-claims.md`, `public/scores/borderline.json`; modify `index.json`.

- [ ] **Step 1:** Research procedure 1–7 (id `borderline`, seconds to hours). The slow return to baseline must rest on sources about recovery or habituation over time; if those are thin, mark that step `reconstructed` and that track `mixed` or `debated` as the evidence warrants.
- [ ] **Step 2:** Procedure 8–10. Commit `feat: borderline episode`.

### Task 10: Anger

**Files:** Create `research/anger-claims.md`, `public/scores/anger.json`; modify `index.json`.

- [ ] **Step 1:** Research procedure 1–7 (id `anger`, seconds to minutes). Hypothalamus and periaqueductal grey claims are expected to rest largely on animal work: `debated`, stated in the explanation.
- [ ] **Step 2:** Procedure 8–10. Commit `feat: anger episode`.

### Task 11: Depressive episode

**Files:** Create `research/depression-claims.md`, `public/scores/depression.json`; modify `index.json`.

- [ ] **Step 1:** Research procedure 1–7 (id `depression`). Phases form a loop (trigger → self-focused rumination → failed disengagement → back to rumination), written as repeated cycles in the keyframes. Condition tracks may start away from `0` where resting-state differences are supported. Typical variant: same trigger, brief engagement, disengagement.
- [ ] **Step 2:** Procedure 8–10. Commit `feat: depression episode`.

### Task 12: Finish

**Files:** Delete `public/scores/placeholder.json`; modify `public/scores/index.json`, `src/style.css`, `src/ui/about.ts`, `CREDITS.md`, create `README.md`.

- [ ] **Step 1:** Remove the placeholder from `index.json` and delete its file. Order states: depression, anxiety, anger, borderline. Confirm every entry has `reviewed: true`; if one does not, stop and ask the owner.
- [ ] **Step 2:** Smooth the change between states: on `player.load`, ease region activity to baseline over 0.6 s before the new score can play.
- [ ] **Step 3:** Read every caption, explanation and "about" paragraph against the copy rules in Global Constraints; fix any that imply one region equals one emotion, sound diagnostic, or stigmatise.
- [ ] **Step 4:** `README.md`: what it is, `npm install`, `npm run dev`, how to add a state (write a score, add to `index.json`, run `npm test`), how to rebuild the atlas.
- [ ] **Step 5:** `npm test` and `npm run build`. Expected: PASS. Open the built site with `npx vite preview`; play all four episodes in both variants; check frame time ≤ 33 ms.
- [ ] **Step 6:** Commit `feat: finish first version`.
