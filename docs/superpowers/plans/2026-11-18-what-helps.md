# What Helps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "What helps" group of treatment episodes. Each episode shows how the brain changes with a treatment, is linked to and from its condition, and carries kind, honest framing.

**Architecture:**
- Treatment episodes are ordinary score files.
- Index entries get `category: 'treatment'` plus `treats: '<condition id>'`. The links in both directions are worked out from `treats` in one pure function.
- The side panel shows the links as buttons that call the same pick handler as the state list.
- Research follows the existing pipeline: `research/<id>.mjs`, then `verify:quotes`, then an independent review, then `reviewed: true`.

**Tech Stack:** TypeScript, Vite, Three.js, Vitest, Node research scripts (existing).

**Spec:** `docs/2026-11-18-what-helps-design.md` (builds on `docs/2026-11-14-brain-states-design.md`).

## Global Constraints

- **Group heading** is exactly `What helps`, listed after "Psychological states" and "Physical conditions".
- **Treatment ids** are `help-<short-name>`, for example `help-dbt`. Each `treats` value must be the id of an existing non-treatment entry.
- **Caveat note.** Every treatment caveat ends with this exact text (the constant `TREATMENT_NOTE`):
  "These are averages across groups of people, not a picture of any one person's brain. Treatments help many people, not everyone, and in different ways. This is not medical advice: talk to a doctor or therapist about what is right for you."
- **Inclusion rule.** A treatment is included only if a study or pooled analysis scanned humans before and after the treatment and reports a regional change with a direction, on a region the model has. Failures are listed in the final summary with the reason.
- **Before treatment phase.** Draw only patient-versus-healthy differences reported by the treatment study itself. Otherwise draw rest, and say that the comparison starts from the person's own level.
- **Pre-to-post-only findings.** The description must say that brightness shows change since before treatment.
- **Last phase.** Each episode has a final "What stayed the same" phase caption, which mentions non-responders where the sources do.
- **Footer link.** Text `If you're struggling`, href `https://findahelpline.com`, opens in a new tab with `rel="noopener noreferrer"`.
- **Existing rules apply:** exact quotes only, pmid only when there is no DOI, confidence labels, and `reviewed: true` only after review.

## Review Focus

1. **`treats` names a missing condition or another treatment.** No broken link should be drawn, and the shipped test fails for it (Task 1, Task 3).
2. **A condition with several treatments.** All are linked, in index order (Task 1).
3. **Clicking a link while an episode plays.** The new episode loads exactly as if it had been picked from the list, and the list highlight moves to it (Task 2, checked by hand in the browser).
4. **A treatment entry with no `category`.** It must not vanish. It falls back to psychological as before, but the shipped test requires the category (Task 1, Task 3).
5. **The caveat note missing from a treatment score.** The shipped test fails (Task 3).

---

### Task 1: The "What helps" group and link resolution

**Files:**
- Modify: `src/score/load.ts` (`ScoreCategory`, `ScoreIndexEntry`)
- Modify: `src/ui/groups.ts`
- Create: `src/ui/related.ts`
- Test: `tests/ui/groups.test.ts`, `tests/ui/related.test.ts`

**Interfaces:**
- Produces:
  - `type ScoreCategory = 'psychological' | 'physical' | 'treatment'`
  - `ScoreIndexEntry.treats?: string`
  - `relatedEntries(id: string, entries: ScoreIndexEntry[]): { treatments: ScoreIndexEntry[]; condition: ScoreIndexEntry | null }`

- [ ] **Step 1: Write failing tests**
  - In `groups.test.ts`: a list with all three categories gives headings `['Psychological states', 'Physical conditions', 'What helps']`.
  - In `related.test.ts`, with entries `depression`, `help-cbt` (treats depression), `help-ect` (treats depression), `help-x` (treats `nope`) and `help-y` (treats `help-cbt`):
    - `relatedEntries('depression', …).treatments` has ids `['help-cbt', 'help-ect']`.
    - `relatedEntries('help-cbt', …).condition.id` is `'depression'`.
    - `relatedEntries('help-x', …).condition` is `null`.
    - `relatedEntries('help-cbt', …).treatments` is `[]`, because a treatment never counts as a condition of another treatment.
    - `relatedEntries('help-y', …).condition` is `null`.
    - `relatedEntries('missing', …)` gives `{ treatments: [], condition: null }`.
- [ ] **Step 2: Run the tests.** Run `npx vitest run tests/ui`. Expected: FAIL (the module is missing, and the heading has 2 entries).
- [ ] **Step 3: Implement.** Add `{ category: 'treatment', heading: 'What helps' }` last in `GROUPS`. Write `relatedEntries` in `src/ui/related.ts`. A condition is a matching entry whose category is not `'treatment'`. Treatments of X are entries with `category === 'treatment'` and `treats === X`, but only when X itself is not a treatment.
- [ ] **Step 4: Run the tests.** Run `npx vitest run tests/ui`. Expected: PASS.
- [ ] **Step 5: Commit:** `feat: What helps group and treatment links`

### Task 2: Links in the side panel, footer help link, About purpose

**Files:**
- Modify: `src/ui/sidePanel.ts` (the `state` view and the `renderSidePanel` signature)
- Modify: `src/main.ts`, `src/ui/about.ts`, `index.html`, plus the CSS file that styles `.connection` (find it with grep)
- Test: `tests/ui/sidePanel.test.ts`

**Interfaces:**
- Consumes: `relatedEntries` (Task 1).
- Produces:
  - The `PanelView` `state` variant gains `related: { treatments: ScoreIndexEntry[]; condition: ScoreIndexEntry | null }`.
  - `renderSidePanel(root, view, onPickEntry?: (entry: ScoreIndexEntry) => void)`.

- [ ] **Step 1: Write the failing test** (jsdom, following the file's existing setup). Render a `state` view with `related.treatments = [helpCbt]`.
  - There is an `h3` with the text `What helps`.
  - There is one `button.related-link` with the text `help-cbt title →`.
  - Clicking it calls `onPickEntry` with `helpCbt`.
  - With `related.condition = depression`, there is an `h3` `What this treatment is for`, and a button whose text is `← <depression title>`.
  - With both empty, neither heading appears.
- [ ] **Step 2: Run the test.** Run `npx vitest run tests/ui/sidePanel.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement.**
  - **Side panel:** the link sections go right after the description paragraph, using the button class `related-link`.
  - **`main.ts`:** pull the picker callback out into a named `pickEntry(entry)`. Pass `relatedEntries(player.score.id, entries)` into the state view and `pickEntry` into `renderSidePanel`. Picking calls `picker.setSelected` as it does now.
  - **`index.html` footer:** add `<a class="help-link" …>If you're struggling</a>` after the legend.
  - **`about.ts`:** add a first section, "Why this exists": "To help people who live with these conditions, and the people close to them, understand what happens in the brain: what is felt has a physical basis, it is studied, and it is not a character flaw. The "What helps" episodes show how the brain can change with treatment." Change the last paragraph's "it does not recommend any treatment" to "it does not recommend any treatment; the "What helps" episodes show what studies found, not what anyone should choose".
  - **CSS:** style `.related-link` (left-aligned, an accent colour) and `.help-link` (small and muted).
- [ ] **Step 4: Run the tests.** Run `npx vitest run`. Expected: all PASS.
- [ ] **Step 5: Check in the browser.** In the dev server, a fixture treatment linked to depression shows both links, and clicking either one loads the other episode and moves the list highlight. Remove the fixture afterwards.
- [ ] **Step 6: Commit:** `feat: treatment links in the side panel, help link, purpose in About`

### Task 3: Research support and the shipped checks

**Files:**
- Modify: `research/lib.mjs` (`writeScore` gains a `treats` option, plus an exported `TREATMENT_NOTE`)
- Modify: `tests/score/shipped.test.ts`

**Interfaces:**
- Produces:
  - `writeScore(score, { indexTitle, notes, category, treats })` writes `treats` into the index entry when the category is `'treatment'`.
  - `TREATMENT_NOTE: string`, the exact text from Global Constraints.

- [ ] **Step 1: Write failing tests** in `shipped.test.ts`:
  - The category is one of `['psychological', 'physical', 'treatment']`.
  - For treatment entries:
    - `entry.id` starts with `help-`.
    - `entry.treats` names an index entry whose category is not `'treatment'`.
    - `score.caveat.endsWith(TREATMENT_NOTE)`. Import it from a small shared `src/score/treatmentNote.ts` that `research/lib.mjs` mirrors, and add a test that the two strings are equal by reading `lib.mjs` text.
- [ ] **Step 2: Run the tests.** Run `npx vitest run tests/score/shipped.test.ts`. Expected: PASS for now, because no treatment entries exist yet. To see the new checks fail, temporarily add a bad treatment entry and confirm it fails, then remove it.
- [ ] **Step 3: Implement** the `writeScore` option and the constants.
- [ ] **Step 4: Commit:** `feat: research support and checks for treatment episodes`

### Task 4: Research batch A, psychological treatments

The candidates are the psychological rows of the spec's §5 table: depression (CBT and psychotherapy, antidepressants, ECT, TMS, ketamine), borderline (DBT), anxiety and panic (CBT), PTSD (trauma-focused therapy), OCD (ERP/CBT, SSRIs), psychosis (antipsychotics), addiction (treatment or abstinence) and stress (mindfulness).

For each candidate:

- [ ] **Step 1: Find sources.** Search with `node tools/research/epmc.mjs search "<treatment> <condition> fMRI OR PET pre post treatment"`. Prefer meta-analyses, then well-cited studies. Fetch the full text where possible, otherwise the abstract.
- [ ] **Step 2: Apply the inclusion rule.** If the candidate fails, write it down with the reason in `research/what-helps-excluded.md`. If it passes, add its sources to `research/sources.mjs`.
- [ ] **Step 3: Write `research/help-<name>.mjs`.** Use the phases from spec §4, with `category: 'treatment'`, `treats`, `typical: null`, and a caveat ending with `TREATMENT_NOTE`.
- [ ] **Step 4: Run it.** Run `node research/help-<name>.mjs`, then `npm run verify:quotes`. Expected: every quote verified.

After all candidates:

- [ ] **Step 5: Add the scripts.** Add every new script to the `scores` script in `package.json`. Run `npm run scores`, then `npx vitest run`. Expected: all PASS.
- [ ] **Step 6: Commit:** `feat: psychological treatment episodes (awaiting review)`

### Task 5: Research batch B, physical treatments

Same steps as Task 4, for the physical rows: chronic pain (CBT, pain programmes), Parkinson's (levodopa, DBS), stroke (rehabilitation), migraine (prevention), seizure (anti-seizure treatment, surgery), sleep deprivation (recovery sleep), and Alzheimer's, MS and concussion (whatever the search finds).

- [ ] **Commit:** `feat: physical treatment episodes (awaiting review)`

### Task 6: Independent review and corrections

- [ ] **Step 1: Run independent reviews.** Dispatch one reviewer agent per batch (model opus), with the claims sheets, scripts, sources, the spec and the inclusion rule. The reviewer checks every claim against the cached papers and checks that the direction and level of each region are supported.
- [ ] **Step 2: Correct everything.** Apply every correction, then re-run `npm run scores`, `npm run verify:quotes` and `npx vitest run`. Expected: all PASS.
- [ ] **Step 3: Mark as reviewed.** Set `reviewed: true` and a `reviewNote` on each reviewed treatment in `public/scores/index.json`, the same way the earlier batches were done.
- [ ] **Step 4: Update the README.** Add the "What helps" section and the new count.
- [ ] **Step 5: Commit:** `fix: address review of treatment episodes; mark them reviewed`

### Task 7: Final whole-branch review

- [ ] **Code review.** Run the whole-branch code review using the executing-plans final review.
- [ ] **Fix pass.** Fix any Critical or Important findings with tests.
- [ ] **Browser check.** Check the links, the footer and every treatment episode in the browser.
