import { describe, expect, it } from 'vitest';
import { activityToAppearance, displayLevel } from '../../src/brain/appearance';

const hex = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16) / 255,
  parseInt(h.slice(3, 5), 16) / 255,
  parseInt(h.slice(5, 7), 16) / 255,
];
function expectColor(actual: [number, number, number], expected: [number, number, number]) {
  for (let i = 0; i < 3; i++) expect(actual[i]).toBeCloseTo(expected[i], 5);
}

describe('activityToAppearance', () => {
  it('shows baseline as cool blue at resting brightness', () => {
    const a = activityToAppearance(0);
    expectColor(a.color, hex('#3fa9ff'));
    expect(a.intensity).toBeCloseTo(0.35);
  });
  it('shows strong activity as bright coral', () => {
    const a = activityToAppearance(1);
    expectColor(a.color, hex('#ff6a3d'));
    expect(a.intensity).toBeCloseTo(1.6);
  });
  it('shows strongly reduced activity as dim violet', () => {
    const a = activityToAppearance(-1);
    expectColor(a.color, hex('#3b1f6b'));
    expect(a.intensity).toBeCloseTo(0.08);
  });
  it('blends halfway between baseline and full activity at 0.5', () => {
    const a = activityToAppearance(0.5);
    const base = hex('#3fa9ff');
    const hot = hex('#ff6a3d');
    expectColor(a.color, [(base[0] + hot[0]) / 2, (base[1] + hot[1]) / 2, (base[2] + hot[2]) / 2]);
    expect(a.intensity).toBeCloseTo((0.35 + 1.6) / 2);
  });
  it('treats values beyond the scale as the ends of the scale', () => {
    expect(activityToAppearance(3)).toEqual(activityToAppearance(1));
    expect(activityToAppearance(-3)).toEqual(activityToAppearance(-1));
  });
  it('gets steadily brighter as activity rises, so brightness alone orders activity', () => {
    const values = [-1, -0.5, 0, 0.5, 1].map((v) => activityToAppearance(v).intensity);
    for (let i = 1; i < values.length; i++) expect(values[i]).toBeGreaterThan(values[i - 1]);
  });
});

describe('displayLevel', () => {
  it('leaves rest and changes too small to count as drawn untouched', () => {
    expect(displayLevel(0)).toBe(0);
    expect(displayLevel(0.04)).toBeCloseTo(0.04);
    expect(displayLevel(-0.04)).toBeCloseTo(-0.04);
  });
  it('shows even a slight change clearly, in its own direction', () => {
    expect(displayLevel(0.1)).toBeGreaterThanOrEqual(0.3);
    expect(displayLevel(-0.1)).toBeLessThanOrEqual(-0.3);
  });
  it('keeps the strongest change at full strength', () => {
    expect(displayLevel(1)).toBeCloseTo(1);
    expect(displayLevel(-1)).toBeCloseTo(-1);
  });
  it('keeps bigger changes brighter than smaller ones', () => {
    const levels = [0.05, 0.1, 0.3, 0.6, 1].map(displayLevel);
    for (let i = 1; i < levels.length; i++) expect(levels[i]).toBeGreaterThan(levels[i - 1]);
  });
});
