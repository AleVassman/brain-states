import { describe, expect, it } from 'vitest';
import { markTourSeen, phoneDock, placeCard, TOUR_STEPS, tourSeen } from '../../src/ui/tourModel';

describe('TOUR_STEPS', () => {
  it('has eleven steps, each with a title, text and a unique id', () => {
    expect(TOUR_STEPS).toHaveLength(11);
    for (const step of TOUR_STEPS) {
      expect(step.title.trim()).not.toBe('');
      expect(step.text.trim()).not.toBe('');
    }
    expect(new Set(TOUR_STEPS.map((s) => s.id)).size).toBe(TOUR_STEPS.length);
  });
  it('opens with a welcome that points at nothing and ends on About', () => {
    expect(TOUR_STEPS[0]).toMatchObject({ id: 'welcome', target: null });
    expect(TOUR_STEPS[TOUR_STEPS.length - 1].id).toBe('about');
  });
  it('lights the brain area beside the panels first, and the canvas where that area is not laid out (phones)', () => {
    expect(TOUR_STEPS.find((s) => s.id === 'brain')?.target).toEqual(['#brain-area', '#stage']);
  });
  it('lights the two buttons at the top on the last step, not the whole header', () => {
    expect(TOUR_STEPS[TOUR_STEPS.length - 1].target).toEqual(['.top-buttons']);
  });
});

describe('placeCard', () => {
  const view = { width: 1366, height: 768 };
  const card = { width: 320, height: 180 };

  it('centres the card when there is nothing to point at', () => {
    expect(placeCard(null, card, view, false)).toEqual({ left: (1366 - 320) / 2, top: (768 - 180) / 2 });
  });
  it('puts the card below the target when it fits', () => {
    expect(placeCard({ left: 100, top: 100, width: 200, height: 50 }, card, view, false)).toEqual({ left: 100, top: 162 });
  });
  it('puts the card above the target when there is no room below', () => {
    expect(placeCard({ left: 100, top: 600, width: 200, height: 120 }, card, view, false)).toEqual({ left: 100, top: 600 - 12 - 180 });
  });
  it('puts the card beside a target too tall for above or below', () => {
    const pos = placeCard({ left: 50, top: 20, width: 220, height: 730 }, card, view, false);
    expect(pos.left).toBe(50 + 220 + 12);
  });
  it('keeps the card fully on screen near the right edge', () => {
    const pos = placeCard({ left: 1300, top: 100, width: 60, height: 30 }, card, view, false);
    expect(pos.left).toBe(1366 - 12 - 320);
  });
  it('docks the card at the bottom on a phone', () => {
    expect(placeCard({ left: 10, top: 10, width: 50, height: 50 }, { width: 375, height: 200 }, { width: 375, height: 812 }, true)).toEqual({ left: 0, top: 612 });
  });
});

describe('seen flag', () => {
  const memory = () => {
    const data = new Map<string, string>();
    return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, v) };
  };
  const broken = {
    getItem: (): string | null => {
      throw new Error('blocked');
    },
    setItem: (): void => {
      throw new Error('blocked');
    },
  };

  it('is unseen at first, and seen once marked', () => {
    const storage = memory();
    expect(tourSeen(storage)).toBe(false);
    markTourSeen(storage);
    expect(tourSeen(storage)).toBe(true);
  });
  it('treats missing or blocked storage as unseen, without throwing', () => {
    expect(tourSeen(null)).toBe(false);
    expect(tourSeen(broken)).toBe(false);
    expect(() => markTourSeen(broken)).not.toThrow();
    expect(() => markTourSeen(null)).not.toThrow();
  });
});

describe('phoneDock', () => {
  const view = { width: 375, height: 812 };
  it('docks the card at the bottom when the lit part is in the top half (the brain)', () => {
    expect(phoneDock({ left: 0, top: 0, width: 375, height: 390 }, view)).toBe('bottom');
  });
  it('docks the card at the top, over the brain, when the lit part is in the panels below', () => {
    expect(phoneDock({ left: 12, top: 400, width: 350, height: 300 }, view)).toBe('top');
  });
  it('docks at the bottom when nothing is lit', () => {
    expect(phoneDock(null, view)).toBe('bottom');
  });
});

describe('tour copy matches what the page does', () => {
  const text = (id: string) => TOUR_STEPS.find((s) => s.id === id)?.text ?? '';
  it('says only the regions changing most get name tags', () => {
    expect(text('tags')).toMatch(/changing most/);
  });
  it('places the helpline link by the colour key, where it is on every screen', () => {
    expect(text('about')).toMatch(/next to the colour key/);
  });
  it('says the count opens a list of treatment episodes from studies', () => {
    expect(text('helps')).toMatch(/in studies/);
  });
});
