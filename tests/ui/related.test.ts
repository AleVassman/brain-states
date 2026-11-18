import { describe, expect, it } from 'vitest';
import type { ScoreIndexEntry } from '../../src/score/load';
import { relatedEntries } from '../../src/ui/related';

const e = (id: string, category: ScoreIndexEntry['category'], treats?: string): ScoreIndexEntry =>
  ({ id, title: id, file: `${id}.json`, reviewed: true, category, ...(treats ? { treats } : {}) }) as ScoreIndexEntry;

const entries = [
  e('depression', 'psychological'),
  e('help-cbt', 'treatment', 'depression'),
  e('help-ect', 'treatment', 'depression'),
  e('help-x', 'treatment', 'nope'),
  e('help-y', 'treatment', 'help-cbt'),
];

describe('relatedEntries', () => {
  it('lists every treatment of a condition, in index order', () => {
    expect(relatedEntries('depression', entries).treatments.map((t) => t.id)).toEqual(['help-cbt', 'help-ect']);
  });
  it('finds the condition a treatment is for', () => {
    expect(relatedEntries('help-cbt', entries).condition?.id).toBe('depression');
  });
  it('ignores a treatment that points at an unknown condition', () => {
    expect(relatedEntries('help-x', entries).condition).toBeNull();
  });
  it('never treats a treatment as the condition of another treatment', () => {
    expect(relatedEntries('help-cbt', entries).treatments).toEqual([]);
    expect(relatedEntries('help-y', entries).condition).toBeNull();
  });
  it('returns nothing for an unknown id', () => {
    expect(relatedEntries('missing', entries)).toEqual({ treatments: [], condition: null });
  });
});
