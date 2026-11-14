import { describe, expect, it } from 'vitest';
import { activityToAppearance } from '../../src/brain/appearance';

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
