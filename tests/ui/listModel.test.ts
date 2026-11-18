import { describe, expect, it } from 'vitest';
import type { ScoreIndexEntry } from '../../src/score/load';
import { buildTabs, locate, searchEntries } from '../../src/ui/listModel';

const e = (id: string, title: string, category?: ScoreIndexEntry['category'], treats?: string): ScoreIndexEntry =>
  ({ id, title, file: `${id}.json`, reviewed: true, ...(category ? { category } : {}), ...(treats ? { treats } : {}) }) as ScoreIndexEntry;

const entries = [
  e('depression', 'Depression', 'psychological'),
  e('migraine', 'Migraine attack', 'physical'),
  e('help-cbt', 'Talking therapy (CBT) for depression', 'treatment', 'depression'),
  e('help-ect', 'Electroconvulsive therapy (ECT)', 'treatment', 'depression'),
  e('help-x', 'Orphan treatment', 'treatment', 'nope'),
  e('legacy', 'Legacy state'),
];

describe('buildTabs', () => {
  it('puts psychological states and orphan treatments under Mind, nesting treatments under their condition', () => {
    const tabs = buildTabs(entries);
    expect(tabs.mind.map((r) => r.entry.id)).toEqual(['depression', 'legacy', 'help-x']);
    expect(tabs.mind[0].treatments.map((t) => t.id)).toEqual(['help-cbt', 'help-ect']);
    expect(tabs.mind[2].treatments).toEqual([]);
  });

  it('puts physical conditions under Body', () => {
    expect(buildTabs(entries).body.map((r) => r.entry.id)).toEqual(['migraine']);
  });
});

describe('locate', () => {
  it('finds a treatment under its condition', () => {
    expect(locate('help-ect', entries)).toEqual({ tab: 'mind', parentId: 'depression' });
  });
  it('finds a physical condition in Body', () => {
    expect(locate('migraine', entries)).toEqual({ tab: 'body', parentId: null });
  });
  it('keeps an orphan treatment in Mind without a parent', () => {
    expect(locate('help-x', entries)).toEqual({ tab: 'mind', parentId: null });
  });
  it('returns null for an unknown id', () => {
    expect(locate('missing', entries)).toBeNull();
  });
});

describe('searchEntries', () => {
  it('matches titles ignoring case and surrounding spaces, and says where each result lives', () => {
    expect(searchEntries('  CBT ', entries)).toEqual([{ entry: entries[2], place: 'What helps · Depression' }]);
  });
  it('labels conditions with their tab', () => {
    expect(searchEntries('mig', entries)[0].place).toBe('Body');
    expect(searchEntries('depression', entries)[0].place).toBe('Mind');
  });
  it('labels an orphan treatment as What helps', () => {
    expect(searchEntries('orphan', entries)[0].place).toBe('What helps');
  });
  it('returns nothing for an empty or blank query', () => {
    expect(searchEntries('   ', entries)).toEqual([]);
    expect(searchEntries('', entries)).toEqual([]);
  });
});
