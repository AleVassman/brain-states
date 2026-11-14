import { describe, expect, it } from 'vitest';
import { connectionStyle, groupCentroid } from '../../src/brain/connectionStyle';
import { REGIONS } from '../fixtures/validScore';

describe('connectionStyle', () => {
  it('draws a baseline connection as a faint, still, solid line', () => {
    expect(connectionStyle(0)).toEqual({ opacity: 0.15, pulseRate: 0, dashed: false });
  });
  it('draws a fully strengthened connection bright, with three pulses a second', () => {
    const s = connectionStyle(1);
    expect(s.opacity).toBeCloseTo(1);
    expect(s.pulseRate).toBeCloseTo(3);
    expect(s.dashed).toBe(false);
  });
  it('scales brightness and pulse rate with strength', () => {
    const s = connectionStyle(0.5);
    expect(s.opacity).toBeCloseTo(0.575);
    expect(s.pulseRate).toBeCloseTo(1.5);
  });
  it('draws a weakened connection dimmer, dashed and without pulses', () => {
    const s = connectionStyle(-0.5);
    expect(s.opacity).toBeCloseTo(0.075);
    expect(s.pulseRate).toBe(0);
    expect(s.dashed).toBe(true);
  });
  it('never lets a weakened connection vanish completely', () => {
    const s = connectionStyle(-1);
    expect(s.opacity).toBeCloseTo(0.03);
    expect(s.dashed).toBe(true);
  });
  it('treats values beyond the scale as the ends of the scale', () => {
    expect(connectionStyle(4)).toEqual(connectionStyle(1));
    expect(connectionStyle(-4)).toEqual(connectionStyle(-1));
  });
});

describe('groupCentroid', () => {
  it('returns one point per hemisphere for a paired group', () => {
    expect(groupCentroid('amygdala', REGIONS)).toEqual([
      [-0.24, -0.05, 0.02],
      [0.24, -0.05, 0.02],
    ]);
  });
  it('returns one point for a midline group', () => {
    expect(groupCentroid('mpfc', REGIONS)).toEqual([[0, 0.2, 0.5]]);
  });
  it('returns that region alone when given a region id', () => {
    expect(groupCentroid('amygdala-r', REGIONS)).toEqual([[0.24, -0.05, 0.02]]);
  });
  it('returns nothing for an unknown name', () => {
    expect(groupCentroid('nowhere', REGIONS)).toEqual([]);
  });
});
