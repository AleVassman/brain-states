import type { ScoreIndexEntry } from '../score/load';

/** The two tabs of the episode list. */
export type ListTab = 'mind' | 'body';

export const TAB_LABEL: Record<ListTab, string> = { mind: 'Mind', body: 'Body' };

/** A condition in a tab, with the treatment episodes listed under it. */
export interface ConditionRow {
  entry: ScoreIndexEntry;
  treatments: ScoreIndexEntry[];
}

const isTreatment = (entry: ScoreIndexEntry) => entry.category === 'treatment';

/** Physical conditions go under Body; everything else, including a missing category, under Mind. */
const tabOfCondition = (entry: ScoreIndexEntry): ListTab => (entry.category === 'physical' ? 'body' : 'mind');

/** The condition a treatment is listed under, or null when it names none that is listed. */
function parentOf(treatment: ScoreIndexEntry, entries: ScoreIndexEntry[]): ScoreIndexEntry | null {
  return entries.find((entry) => entry.id === treatment.treats && !isTreatment(entry)) ?? null;
}

/**
 * Splits the list into the two tabs, in list order, with each treatment under its condition.
 * A treatment whose condition is not listed becomes its own row at the end of Mind, so it never vanishes.
 */
export function buildTabs(entries: ScoreIndexEntry[]): Record<ListTab, ConditionRow[]> {
  const tabs: Record<ListTab, ConditionRow[]> = { mind: [], body: [] };
  const rows = new Map<string, ConditionRow>();
  for (const entry of entries) {
    if (isTreatment(entry)) continue;
    const row = { entry, treatments: [] };
    rows.set(entry.id, row);
    tabs[tabOfCondition(entry)].push(row);
  }
  for (const entry of entries) {
    if (!isTreatment(entry)) continue;
    const parent = parentOf(entry, entries);
    if (parent) rows.get(parent.id)?.treatments.push(entry);
    else tabs.mind.push({ entry, treatments: [] });
  }
  return tabs;
}

/** Which tab an episode is in, and the condition it sits under (null for a condition or an orphan treatment). */
export function locate(id: string, entries: ScoreIndexEntry[]): { tab: ListTab; parentId: string | null } | null {
  const entry = entries.find((e) => e.id === id);
  if (!entry) return null;
  if (!isTreatment(entry)) return { tab: tabOfCondition(entry), parentId: null };
  const parent = parentOf(entry, entries);
  return parent ? { tab: tabOfCondition(parent), parentId: parent.id } : { tab: 'mind', parentId: null };
}

/** Episodes whose title contains the query (ignoring case and surrounding spaces), each with where it lives. */
export function searchEntries(query: string, entries: ScoreIndexEntry[]): { entry: ScoreIndexEntry; place: string }[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return entries
    .filter((entry) => entry.title.toLowerCase().includes(q))
    .map((entry) => {
      if (!isTreatment(entry)) return { entry, place: TAB_LABEL[tabOfCondition(entry)] };
      const parent = parentOf(entry, entries);
      return { entry, place: parent ? `What helps · ${parent.title}` : 'What helps' };
    });
}
