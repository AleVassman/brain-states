import type { ScoreIndexEntry } from '../score/load';

export interface RelatedEntries {
  /** Treatment episodes for this condition, in list order. Empty for a treatment. */
  treatments: ScoreIndexEntry[];
  /** The condition this treatment is for, or null when it is not a treatment or the condition is not listed. */
  condition: ScoreIndexEntry | null;
}

const isTreatment = (entry: ScoreIndexEntry) => entry.category === 'treatment';

/** Links between a condition and its treatment episodes, worked out from each treatment's `treats`. */
export function relatedEntries(id: string, entries: ScoreIndexEntry[]): RelatedEntries {
  const self = entries.find((entry) => entry.id === id);
  if (!self) return { treatments: [], condition: null };
  if (isTreatment(self)) {
    const condition = entries.find((entry) => entry.id === self.treats && !isTreatment(entry)) ?? null;
    return { treatments: [], condition };
  }
  return { treatments: entries.filter((entry) => isTreatment(entry) && entry.treats === id), condition: null };
}
