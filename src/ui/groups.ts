import type { ScoreCategory, ScoreIndexEntry } from '../score/load';

export interface EntryGroup {
  category: ScoreCategory;
  heading: string;
  entries: ScoreIndexEntry[];
}

/** The order the groups appear in, and what each is called on screen. */
const GROUPS: { category: ScoreCategory; heading: string }[] = [
  { category: 'psychological', heading: 'Psychological states' },
  { category: 'physical', heading: 'Physical illnesses' },
];

/**
 * Splits the list of states into its groups, keeping the order within each.
 * A state with no category counts as psychological. Empty groups are left out.
 */
export function groupEntries(entries: ScoreIndexEntry[]): EntryGroup[] {
  return GROUPS.map((group) => ({
    ...group,
    entries: entries.filter((entry) => (entry.category ?? 'psychological') === group.category),
  })).filter((group) => group.entries.length > 0);
}
