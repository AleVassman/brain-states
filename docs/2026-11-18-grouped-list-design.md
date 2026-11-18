# Grouped episode list: short design

Date: 2026-11-18. Approved by the owner ("Design A is fine").

## Why
There are 47 episodes: 12 psychological states, 12 physical conditions and 23 treatments. Shown as three long lists one under the other in the narrow left panel (220 px), they are too many to scan. The owner asked for a better way to show them.

## Approaches
- **A. Two tabs, with treatments nested under their condition (chosen).** Tabs "Mind" and "Body", 12 rows each. Each condition shows how many treatments it has and expands to show them. Search covers everything. It keeps each condition next to what helps it, which serves the project's purpose.
- **B. Three tabs (Psychological / Physical / What helps).** Simple, but it separates treatments from their conditions, and the third tab is still 23 long.
- **C. A full-screen card picker.** Roomy, but it hides the brain, adds a click every time, and is more work.

## Design
- **Tabs.** Tabs "Mind" (psychological) and "Body" (physical) sit at the top of the left panel, with a search box under them. Mind is shown first.
- **Rows.** Each condition is a row. A condition with treatments has a small count button ("4 ▸") that opens and closes an indented list of its treatments, in index order. Several conditions can be open at once.
- **Selecting an episode.**
  - Picking any episode highlights it, from the list, from a side-panel link, or from search.
  - If it is a treatment, its condition opens.
  - The list switches to the tab the episode belongs to, and scrolls it into view.
- **Search.**
  - Typing filters by title, ignoring case, across all 47 episodes.
  - Results are a flat list, each labelled with its place: "Mind", "Body" or "What helps · <condition>".
  - An empty result says "No matches".
  - Clearing the search returns to the tabs.
- **Orphan treatments.** A treatment whose `treats` names no listed condition still appears, as a plain row at the end of the Mind tab, so nothing can vanish. The shipped tests already prevent this in practice.
- **Accessibility.**
  - Tabs use `role="tablist"`/`tab`/`tabpanel` with `aria-selected`.
  - Count buttons use `aria-expanded` and are named "4 treatments for Depression".
  - The search box has a label for screen readers (visually hidden, to save room in the narrow panel) and a placeholder.
  - The "awaiting review" badge stays as it is.
- **Scope.** Only the left list changes. Episode files, the side panel and the 3D view are untouched.

## Left to the builder
Exact styling within the existing look, and the arrow glyphs.
