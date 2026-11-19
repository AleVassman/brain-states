import { describe, expect, it } from 'vitest';
import { nothingDrawn, REST_NOTE } from '../../src/ui/stepStatus';
import type { Frame } from '../../src/score/types';

const frame = (regions: [string, number][], connections: number[] = []): Frame =>
  ({
    t: 0.5,
    phase: { id: 'p', name: 'P', timescale: 's', start: 0, end: 1, caption: 'c' },
    variant: 'condition',
    regions: new Map(regions),
    connections: connections.map((v) => ({ from: 'a', to: 'b', v })),
  }) as Frame;

describe('nothingDrawn', () => {
  it('is true when every region and connection is at rest', () => {
    expect(nothingDrawn(frame([['a', 0], ['b', 0.02]], [0.01]))).toBe(true);
  });
  it('is false when a region is visibly more or less active', () => {
    expect(nothingDrawn(frame([['a', 0], ['b', -0.3]]))).toBe(false);
  });
  it('is false when only a connection is drawn', () => {
    expect(nothingDrawn(frame([['a', 0]], [0.4]))).toBe(false);
  });
  it('is false with no episode loaded', () => {
    expect(nothingDrawn(null)).toBe(false);
  });
});

it('the rest note tells the viewer the empty brain is deliberate', () => {
  expect(REST_NOTE).toMatch(/at rest/);
});

import { showRestNote } from '../../src/ui/stepStatus';
import type { RegionInfo, Score } from '../../src/score/types';

const regions = [{ id: 'amygdala-l', group: 'amygdala' }] as RegionInfo[];
const score = {
  phases: [
    { id: 'quiet', name: 'Q', timescale: 's', start: 0, end: 0.5, caption: 'c' },
    { id: 'busy', name: 'B', timescale: 's', start: 0.5, end: 1, caption: 'c' },
  ],
  // Rises from 0 at the start of "busy", so its first instant is blank too.
  condition: { regions: [{ region: 'amygdala', keyframes: [{ t: 0, v: 0 }, { t: 0.5, v: 0 }, { t: 0.6, v: 0.8 }, { t: 1, v: 0.8 }] }], connections: [] },
  typical: null,
} as unknown as Score;

describe('showRestNote', () => {
  it('shows during a step where nothing is drawn', () => {
    expect(showRestNote(score, 'condition', 0.25, regions)).toBe(true);
  });
  it('stays hidden in the blank first moment of a step that is mostly drawn', () => {
    expect(showRestNote(score, 'condition', 0.505, regions)).toBe(false);
  });
  it('stays hidden while something is drawn', () => {
    expect(showRestNote(score, 'condition', 0.8, regions)).toBe(false);
  });
  it('stays hidden with no episode', () => {
    expect(showRestNote(null, 'condition', 0, regions)).toBe(false);
  });
});
