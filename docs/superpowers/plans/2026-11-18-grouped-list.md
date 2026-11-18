# Grouped Episode List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three long lists in the left panel with Mind/Body tabs, treatments nested under their condition, and a search box.

**Architecture:** A pure module, `src/ui/listModel.ts`, works out the tabs, the nesting, where a selected episode sits, and the search results. It is fully unit-tested. `src/ui/statePicker.ts` renders that model and keeps its public API (`createStatePicker(root, entries, onPick)` returning `{ setSelected(id) }`), so `main.ts` does not change.

**Tech Stack:** TypeScript, Vitest (node environment, no DOM library).

**Spec:** `docs/2026-11-18-grouped-list-design.md`

## Global Constraints
- Tab labels are exactly `Mind` and `Body`. Mind is shown first.
- The search empty state is exactly `No matches`.
- A search result's place label is `Mind`, `Body`, or `What helps · <condition title>`.
- A treatment with no listed condition appears at the end of the Mind tab.
- Episode files, the side panel and `main.ts` are unchanged.

## Review Focus
1. **A pick from the side panel while the other tab is showing.** The tab should switch, the condition should open, and the row should be highlighted (Task 2, checked in the browser).
2. **A search that is active when a link is clicked.** The search should clear so the highlighted row is visible (Task 2).
3. **A search of whitespace only.** It should be treated as empty (Task 1 test).
4. **A treatment pointing at an unknown condition.** It should still be listed (Task 1 test).
5. **Keyboard.** Tabs and count buttons should be reachable and announce their state (Task 2, by hand).

---

### Task 1: The list model

**Files:** Create `src/ui/listModel.ts`. Test: `tests/ui/listModel.test.ts`.

**Interfaces (produces):**
- `type ListTab = 'mind' | 'body'`
- `interface ConditionRow { entry: ScoreIndexEntry; treatments: ScoreIndexEntry[] }`
- `buildTabs(entries): Record<ListTab, ConditionRow[]>`. Orphan treatments become rows with `treatments: []` at the end of `mind`.
- `locate(id, entries): { tab: ListTab; parentId: string | null } | null`
- `searchEntries(query, entries): { entry: ScoreIndexEntry; place: string }[]`

- [ ] **Step 1: Write the failing tests.** Use entries depression (psychological), migraine (physical), help-cbt (treats depression), help-ect (treats depression), help-x (treats `nope`) and legacy (no category). The tests assert:
  - `buildTabs(...).mind` lists depression, then legacy, then help-x; depression's treatments are `['help-cbt', 'help-ect']`.
  - `body` is `['migraine']`.
  - `locate('help-ect')` is `{ tab: 'mind', parentId: 'depression' }`.
  - `locate('migraine')` is `{ tab: 'body', parentId: null }`.
  - `locate('help-x')` is `{ tab: 'mind', parentId: null }`.
  - `locate('missing')` is `null`.
  - `searchEntries('  CBT ')` gives one result, with place `'What helps · Depression'`.
  - `searchEntries('   ')` gives `[]`.
  - `searchEntries('mig')[0].place` is `'Body'`.
- [ ] **Step 2: Run the tests.** `npx vitest run tests/ui/listModel.test.ts`. Expected: FAIL, because the module is missing.
- [ ] **Step 3: Implement** using the category rules from `groups.ts`: a missing category counts as psychological.
- [ ] **Step 4: Run the tests again.** Expected: PASS.
- [ ] **Step 5: Commit** with the message `feat: list model for tabs, nesting and search`.

### Task 2: Render the grouped list

**Files:** Modify `src/ui/statePicker.ts`, `index.html` (the `ul#state-list` becomes `div#state-list`) and `src/style.css`. `groups.ts` stays, because its tests still describe the categories.

- [ ] **Step 1: Implement the picker.**
  - The tablist has two buttons with `role="tab"` and `aria-selected`.
  - The search is a labelled `<input type="search">`.
  - The panel shows the rows of the current tab: a condition button, and a count button with `aria-expanded` and an `aria-label` of the form "Show N treatments for X", followed by the nested treatment buttons when open.
  - While a search query is set, a flat results list replaces the panel.
  - `setSelected(id)` clears the search, switches to `locate(id).tab`, opens the parent, re-renders, marks the selection with `.selected` and `aria-pressed`, and calls `scrollIntoView({ block: 'nearest' })`.
- [ ] **Step 2: Style it.** Compact tabs, an indented treatment list, and a count chip, using the existing tokens (`--cool`, `--line`, `--ink-dim`). Keep the panel scrollable.
- [ ] **Step 3: Check in the browser.**
  - Both tabs.
  - Expanding a condition.
  - Searching "cbt".
  - Clicking a side-panel "What helps →" link from the Body tab; the list should switch to Mind and highlight the treatment.
  - No errors in the console.
- [ ] **Step 4: Run the full suite and type check.** `npx vitest run` and `npx tsc --noEmit -p .` should both pass.
- [ ] **Step 5: Commit** with the message `feat: Mind/Body tabs with treatments under their condition, and search`.
