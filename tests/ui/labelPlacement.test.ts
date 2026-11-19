import { describe, expect, it } from 'vitest';
import { tagLeft } from '../../src/ui/labelLayer';

describe('tagLeft', () => {
  it('puts the tag to the right of its dot when it fits', () => {
    expect(tagLeft(100, 120, 800)).toBe(126);
  });
  it('flips the tag to the left of its dot when it would run past the right limit', () => {
    expect(tagLeft(700, 200, 800)).toBe(700 - 26 - 200);
  });
  it('never starts a flipped tag off the left edge', () => {
    expect(tagLeft(150, 300, 200)).toBe(4);
  });
});
