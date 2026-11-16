import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { scoreRegionNames } from '../../src/brain/atlas';
import type { ScoreIndexEntry } from '../../src/score/load';
import type { Citation, RegionInfo, Score } from '../../src/score/types';
import { validateScore } from '../../src/score/validate';

const regions: RegionInfo[] = JSON.parse(readFileSync('public/atlas/regions.json', 'utf8'));
const names = scoreRegionNames(regions);
const index: ScoreIndexEntry[] = JSON.parse(readFileSync('public/scores/index.json', 'utf8'));

function allCitations(score: Score): Citation[] {
  const out: Citation[] = [];
  for (const variant of [score.condition, score.typical]) {
    if (!variant) continue;
    for (const track of [...variant.regions, ...variant.connections]) out.push(...track.citations);
  }
  for (const phase of score.phases) {
    if (phase.order?.kind === 'timed') out.push(...phase.order.citations);
  }
  return out;
}

describe('shipped scores', () => {
  it('lists at least one state', () => {
    expect(index.length).toBeGreaterThan(0);
  });

  it('never lets a score target the context-only outlines', () => {
    expect(names.has('cortex')).toBe(false);
    expect(names.has('context')).toBe(false);
    expect(names.has('cortex-l')).toBe(false);
  });

  for (const entry of index) {
    describe(entry.id, () => {
      const path = `public/scores/${entry.file}`;

      it('exists and passes validation against the real atlas', () => {
        expect(existsSync(path)).toBe(true);
        const result = validateScore(JSON.parse(readFileSync(path, 'utf8')), names);
        expect(result.ok ? [] : result.errors).toEqual([]);
      });

      it('is listed under one of the two groups', () => {
        expect(['psychological', 'physical']).toContain(entry.category);
      });

      it('has the id its index entry says', () => {
        const score = JSON.parse(readFileSync(path, 'utf8')) as Score;
        expect(score.id).toBe(entry.id);
      });

      it('cites only well-formed DOIs', () => {
        const score = JSON.parse(readFileSync(path, 'utf8')) as Score;
        for (const c of allCitations(score)) expect(c.doi).toMatch(/^10\.\d{4,9}\/\S+$/);
      });

      it('contains no placeholder sources unless it is marked as a placeholder', () => {
        const score = JSON.parse(readFileSync(path, 'utf8')) as Score;
        if (score.placeholder) return;
        const text = JSON.stringify(score);
        expect(text).not.toContain('PLACEHOLDER');
      });

      it('has a claims sheet unless it is a placeholder', () => {
        const score = JSON.parse(readFileSync(path, 'utf8')) as Score;
        if (score.placeholder) return;
        expect(existsSync(`research/${entry.id}-claims.md`)).toBe(true);
      });
    });
  }
});
