import { describe, expect, it } from 'vitest';
import type { ScoreIndexEntry } from '../../src/score/load';
import { groupEntries } from '../../src/ui/groups';

const entry = (id: string, category?: 'psychological' | 'physical'): ScoreIndexEntry =>
  ({ id, title: id, file: `${id}.json`, reviewed: false, ...(category ? { category } : {}) }) as ScoreIndexEntry;

describe('groupEntries', () => {
  it('puts psychological states first and physical illnesses second, each with a heading', () => {
    const groups = groupEntries([entry('migraine', 'physical'), entry('anxiety', 'psychological')]);
    expect(groups.map((g) => g.heading)).toEqual(['Psychological states', 'Physical illnesses']);
    expect(groups[0].entries.map((e) => e.id)).toEqual(['anxiety']);
    expect(groups[1].entries.map((e) => e.id)).toEqual(['migraine']);
  });

  it('keeps the order of states within a group', () => {
    const groups = groupEntries([
      entry('depression', 'psychological'),
      entry('seizure', 'physical'),
      entry('anger', 'psychological'),
      entry('migraine', 'physical'),
    ]);
    expect(groups[0].entries.map((e) => e.id)).toEqual(['depression', 'anger']);
    expect(groups[1].entries.map((e) => e.id)).toEqual(['seizure', 'migraine']);
  });

  it('leaves out a group that has no states', () => {
    const groups = groupEntries([entry('anxiety', 'psychological')]);
    expect(groups).toHaveLength(1);
    expect(groups[0].heading).toBe('Psychological states');
  });

  it('treats a state with no category as psychological, so older lists still show', () => {
    const groups = groupEntries([entry('legacy')]);
    expect(groups[0].category).toBe('psychological');
    expect(groups[0].entries.map((e) => e.id)).toEqual(['legacy']);
  });

  it('returns nothing for an empty list', () => {
    expect(groupEntries([])).toEqual([]);
  });
});
