import { describe, expect, it } from 'vitest';
import { frameAt, phaseAt, sampleTrack } from '../../src/score/timeline';
import { citation, REGIONS, validScore } from '../fixtures/validScore';

describe('sampleTrack', () => {
  it('interpolates linearly between keyframes', () => {
    expect(sampleTrack([{ t: 0, v: 0 }, { t: 1, v: 1 }], 0.25)).toBeCloseTo(0.25);
  });
  it('holds the first value before the first keyframe', () => {
    expect(sampleTrack([{ t: 0.2, v: 0.5 }, { t: 0.6, v: -1 }], 0)).toBe(0.5);
  });
  it('holds the last value after the last keyframe', () => {
    expect(sampleTrack([{ t: 0.2, v: 0.5 }, { t: 0.6, v: -1 }], 1)).toBe(-1);
  });
  it('returns a single keyframe value at any time', () => {
    expect(sampleTrack([{ t: 0.4, v: 0.7 }], 0)).toBe(0.7);
    expect(sampleTrack([{ t: 0.4, v: 0.7 }], 0.9)).toBe(0.7);
  });
  it('returns the keyframe value exactly on a keyframe', () => {
    expect(sampleTrack([{ t: 0, v: 0 }, { t: 0.5, v: 0.8 }, { t: 1, v: 0 }], 0.5)).toBe(0.8);
  });
  it('never returns NaN, including outside 0..1 and with duplicate times', () => {
    const track = [{ t: 0, v: 0.1 }, { t: 0.5, v: 0.4 }, { t: 0.5, v: 0.9 }, { t: 1, v: -0.2 }];
    for (const t of [0, 1, -5, 7, 0.5]) {
      expect(Number.isNaN(sampleTrack(track, t))).toBe(false);
    }
    expect(sampleTrack(track, -5)).toBe(0.1);
    expect(sampleTrack(track, 7)).toBe(-0.2);
  });
  it('returns 0 for an empty track', () => {
    expect(sampleTrack([], 0.5)).toBe(0);
  });
});

describe('phaseAt', () => {
  it('returns the phase containing t', () => {
    expect(phaseAt(validScore(), 0.2).id).toBe('trigger');
    expect(phaseAt(validScore(), 0.7).id).toBe('alarm');
  });
  it('returns the later phase on a boundary', () => {
    expect(phaseAt(validScore(), 0.5).id).toBe('alarm');
  });
  it('returns the last phase at t = 1', () => {
    expect(phaseAt(validScore(), 1).id).toBe('alarm');
  });
  it('returns the first phase below 0', () => {
    expect(phaseAt(validScore(), -1).id).toBe('trigger');
  });
});

describe('frameAt', () => {
  it('applies a group track to both hemispheres', () => {
    const f = frameAt(validScore(), 'condition', 0.5, REGIONS);
    expect(f.regions.get('amygdala-l')).toBeCloseTo(0.5);
    expect(f.regions.get('amygdala-r')).toBeCloseTo(0.5);
  });
  it('applies an id track to that region only', () => {
    const s = validScore();
    s.condition.regions[0].region = 'amygdala-l';
    const f = frameAt(s, 'condition', 1, REGIONS);
    expect(f.regions.get('amygdala-l')).toBe(1);
    expect(f.regions.get('amygdala-r')).toBe(0);
  });
  it('gives every region without a track an activity of 0', () => {
    const f = frameAt(validScore(), 'condition', 1, REGIONS);
    expect(f.regions.get('mpfc-mid')).toBe(0);
    expect(f.regions.size).toBe(REGIONS.length);
  });
  it('lets an id track win over a group track, in either file order', () => {
    const idTrack = {
      region: 'amygdala-l', explanation: 'Left only.', confidence: 'mixed' as const,
      citations: [citation()], keyframes: [{ t: 0, v: -1 }],
    };
    const a = validScore();
    a.condition.regions.push(idTrack);
    const b = validScore();
    b.condition.regions.unshift(idTrack);
    for (const s of [a, b]) {
      const f = frameAt(s, 'condition', 1, REGIONS);
      expect(f.regions.get('amygdala-l')).toBe(-1);
      expect(f.regions.get('amygdala-r')).toBe(1);
    }
  });
  it('samples connections', () => {
    const f = frameAt(validScore(), 'condition', 1, REGIONS);
    expect(f.connections).toEqual([{ from: 'amygdala', to: 'mpfc', v: -0.5 }]);
  });
  it('uses the typical variant when asked', () => {
    const f = frameAt(validScore(), 'typical', 0.5, REGIONS);
    expect(f.variant).toBe('typical');
    expect(f.regions.get('amygdala-l')).toBe(0.5);
    expect(f.connections).toEqual([]);
  });
  it('returns baseline for the typical variant when the score has none', () => {
    const s = validScore();
    s.typical = null;
    const f = frameAt(s, 'typical', 0.5, REGIONS);
    expect([...f.regions.values()].every((v) => v === 0)).toBe(true);
    expect(f.connections).toEqual([]);
  });
  it('reports the time and phase', () => {
    const f = frameAt(validScore(), 'condition', 0.75, REGIONS);
    expect(f.t).toBe(0.75);
    expect(f.phase.id).toBe('alarm');
  });
});
