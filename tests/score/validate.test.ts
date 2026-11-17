import { describe, expect, it } from 'vitest';
import { validateScore } from '../../src/score/validate';
import type { Score } from '../../src/score/types';
import { REGION_NAMES, validScore } from '../fixtures/validScore';

function errorsFor(mutate: (s: Score) => void): string[] {
  const s = validScore();
  mutate(s);
  const r = validateScore(s, REGION_NAMES);
  return r.ok ? [] : r.errors;
}
function expectError(mutate: (s: Score) => void, text: string) {
  expect(errorsFor(mutate).join('\n')).toContain(text);
}

describe('validateScore', () => {
  it('accepts the valid fixture', () => {
    expect(validateScore(validScore(), REGION_NAMES).ok).toBe(true);
  });

  it('rejects a region track without citations', () => {
    expectError((s) => { s.condition.regions[0].citations = []; }, 'citation');
  });
  it('rejects an unknown confidence level', () => {
    expectError((s) => { (s.condition.regions[0] as { confidence: string }).confidence = 'high'; }, 'confidence');
  });
  it('rejects a track on an unknown region', () => {
    expectError((s) => { s.condition.regions[0].region = 'nowhere'; }, 'unknown region');
  });
  it('rejects a connection to an unknown region', () => {
    expectError((s) => { s.condition.connections[0].to = 'nowhere'; }, 'unknown region');
  });
  it('rejects a keyframe value outside -1..1', () => {
    expectError((s) => { s.condition.regions[0].keyframes[1].v = 1.5; }, 'range');
  });
  it('rejects a keyframe time outside 0..1', () => {
    expectError((s) => { s.condition.regions[0].keyframes[0].t = -0.1; }, 'range');
  });
  it('rejects keyframes out of time order', () => {
    expectError((s) => { s.condition.regions[0].keyframes = [{ t: 0.5, v: 0 }, { t: 0.2, v: 0 }]; }, 'order');
  });
  it('rejects a track with no keyframes', () => {
    expectError((s) => { s.condition.regions[0].keyframes = []; }, 'keyframe');
  });
  it('rejects a later phase without an order', () => {
    expectError((s) => { delete s.phases[1].order; }, 'order');
  });
  it('rejects a timed order without citations', () => {
    expectError((s) => { s.phases[1].order = { kind: 'timed', citations: [] }; }, 'citation');
  });
  it('rejects a reconstructed order without a rationale', () => {
    expectError((s) => { s.phases[1].order = { kind: 'reconstructed', rationale: '' }; }, 'rationale');
  });
  it('rejects phases with a gap', () => {
    expectError((s) => { s.phases[1].start = 0.6; }, 'phase');
  });
  it('rejects phases that overlap', () => {
    expectError((s) => { s.phases[1].start = 0.4; }, 'phase');
  });
  it('rejects phases that do not end at 1', () => {
    expectError((s) => { s.phases[1].end = 0.9; }, 'phase');
  });
  it('rejects phases that do not start at 0', () => {
    expectError((s) => { s.phases[0].start = 0.1; }, 'phase');
  });
  it('rejects a missing typicalCaption when a typical variant exists', () => {
    expectError((s) => { delete s.phases[0].typicalCaption; }, 'typicalCaption');
  });
  it('allows missing typicalCaption when typical is null', () => {
    const s = validScore();
    s.typical = null;
    delete s.phases[0].typicalCaption;
    delete s.phases[1].typicalCaption;
    expect(validateScore(s, REGION_NAMES).ok).toBe(true);
  });
  it('rejects a citation with neither a doi nor a pmid', () => {
    expectError((s) => { s.condition.regions[0].citations[0].doi = ''; }, 'citation');
  });
  it('accepts a citation with a pmid and no doi', () => {
    const s = validScore();
    s.condition.regions[0].citations[0].doi = '';
    s.condition.regions[0].citations[0].pmid = '18787662';
    expect(validateScore(s, REGION_NAMES).ok).toBe(true);
  });
  it('rejects a citation with an empty quote', () => {
    expectError((s) => { s.condition.regions[0].citations[0].quote = ''; }, 'citation');
  });
  it('checks the typical variant too', () => {
    expectError((s) => { s.typical!.regions[0].region = 'nowhere'; }, 'typical.regions[0]');
  });
  it('returns errors instead of throwing on null', () => {
    expect(validateScore(null, REGION_NAMES).ok).toBe(false);
  });
  it('returns errors instead of throwing on a string', () => {
    expect(validateScore('x', REGION_NAMES).ok).toBe(false);
  });
  it('returns errors instead of throwing on malformed nested data', () => {
    const r = validateScore({ id: 'x', phases: 'no', condition: { regions: [null] } }, REGION_NAMES);
    expect(r.ok).toBe(false);
  });
  it('collects every problem, not only the first', () => {
    const errors = errorsFor((s) => {
      s.condition.regions[0].citations = [];
      s.condition.connections[0].to = 'nowhere';
    });
    expect(errors.length).toBe(2);
  });
  it('prefixes errors with the path to the problem', () => {
    const errors = errorsFor((s) => { s.condition.regions[0].citations = []; });
    expect(errors[0].startsWith('condition.regions[0]')).toBe(true);
  });
});

describe('validateScore pmid', () => {
  it('rejects a pmid that is not a number when there is no doi', () => {
    const s = validScore();
    s.condition.regions[0].citations[0].doi = '';
    s.condition.regions[0].citations[0].pmid = 'abc';
    const r = validateScore(s, REGION_NAMES);
    expect(r.ok).toBe(false);
  });
});
