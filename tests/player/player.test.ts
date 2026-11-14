import { describe, expect, it } from 'vitest';
import { Player } from '../../src/player/player';
import { frameAt } from '../../src/score/timeline';
import type { RegionInfo, Score } from '../../src/score/types';
import { citation, REGIONS, validScore } from '../fixtures/validScore';

/** Advance in small steps, the way animation frames do. */
function run(player: Player, seconds: number) {
  const step = 0.05;
  for (let elapsed = 0; elapsed < seconds - 1e-9; elapsed += step) player.tick(step);
}

function loaded(): Player {
  const p = new Player(REGIONS);
  p.load(validScore());
  return p;
}

describe('Player', () => {
  it('starts with no score and no frame', () => {
    const p = new Player(REGIONS);
    expect(p.score).toBeNull();
    expect(p.frame()).toBeNull();
  });

  it('advances with time while playing', () => {
    const p = loaded();
    p.play();
    run(p, 10); // durationSeconds is 20
    expect(p.t).toBeCloseTo(0.5, 5);
    expect(p.playing).toBe(true);
  });

  it('stops at the end', () => {
    const p = loaded();
    p.play();
    run(p, 25);
    expect(p.t).toBe(1);
    expect(p.playing).toBe(false);
  });

  it('restarts from the beginning when played at the end', () => {
    const p = loaded();
    p.seek(1);
    p.play();
    expect(p.t).toBe(0);
    expect(p.playing).toBe(true);
  });

  it('does not advance while paused', () => {
    const p = loaded();
    p.seek(0.3);
    p.tick(0.05);
    expect(p.t).toBe(0.3);
  });

  it('limits one tick to a tenth of a second, so a hidden tab does not skip the episode', () => {
    const p = loaded();
    p.play();
    p.tick(60);
    expect(p.t).toBeCloseTo(0.1 / 20, 9);
  });

  it('clamps seeking to 0..1', () => {
    const p = loaded();
    p.seek(2);
    expect(p.t).toBe(1);
    p.seek(-1);
    expect(p.t).toBe(0);
  });

  it('gives the right frame after seeking backwards', () => {
    const p = loaded();
    p.seek(0.9);
    p.seek(0.25);
    const expected = frameAt(validScore(), 'condition', 0.25, REGIONS);
    expect([...p.frame()!.regions]).toEqual([...expected.regions]);
    expect(p.frame()!.connections).toEqual(expected.connections);
  });

  it('resets time, playback and variant when another score is loaded mid-playback', () => {
    const p = loaded();
    p.setVariant('typical');
    p.play();
    run(p, 5);
    p.load(validScore());
    expect(p.t).toBe(0);
    expect(p.playing).toBe(false);
    expect(p.variant).toBe('condition');
  });

  it('leaves nothing of the previous score in the frame after loading another', () => {
    const regions: RegionInfo[] = [
      ...REGIONS,
      { id: 'insula-l', group: 'insula', name: 'Left insula', hemisphere: 'l', centroid: [0, 0, 0], kind: 'mesh', approximate: false, source: 'test' },
    ];
    const other: Score = validScore();
    other.id = 'other';
    other.condition.regions = [
      { region: 'insula', explanation: 'x', confidence: 'mixed', citations: [citation()], keyframes: [{ t: 0, v: 1 }] },
    ];
    other.condition.connections = [];

    const p = new Player(regions);
    p.load(validScore());
    p.seek(1);
    expect(p.frame()!.regions.get('amygdala-l')).toBe(1);
    expect(p.frame()!.connections.length).toBe(1);

    p.load(other);
    const f = p.frame()!;
    expect(f.regions.get('amygdala-l')).toBe(0);
    expect(f.regions.get('insula-l')).toBe(1);
    expect(f.connections).toEqual([]);
  });

  it('has no frame after loading null', () => {
    const p = loaded();
    p.load(null);
    expect(p.frame()).toBeNull();
    expect(p.playing).toBe(false);
  });

  it('does not play without a score', () => {
    const p = new Player(REGIONS);
    p.play();
    expect(p.playing).toBe(false);
  });

  it('switches variant when the score has a typical response', () => {
    const p = loaded();
    p.setVariant('typical');
    expect(p.variant).toBe('typical');
    expect(p.frame()!.variant).toBe('typical');
  });

  it('ignores the typical variant when the score has none', () => {
    const s = validScore();
    s.typical = null;
    const p = new Player(REGIONS);
    p.load(s);
    p.setVariant('typical');
    expect(p.variant).toBe('condition');
  });

  it('notifies listeners of every kind of change', () => {
    const p = new Player(REGIONS);
    let calls = 0;
    p.onChange(() => calls++);
    const changed = (action: () => void) => {
      const before = calls;
      action();
      return calls > before;
    };
    expect(changed(() => p.load(validScore()))).toBe(true);
    expect(changed(() => p.play())).toBe(true);
    expect(changed(() => p.tick(0.05))).toBe(true);
    expect(changed(() => p.pause())).toBe(true);
    expect(changed(() => p.seek(0.5))).toBe(true);
    expect(changed(() => p.setVariant('typical'))).toBe(true);
  });

  it('does not notify on a tick while paused', () => {
    const p = loaded();
    let calls = 0;
    p.onChange(() => calls++);
    p.tick(0.05);
    expect(calls).toBe(0);
  });

  it('stops notifying after unsubscribe', () => {
    const p = loaded();
    let calls = 0;
    const off = p.onChange(() => calls++);
    off();
    p.seek(0.5);
    expect(calls).toBe(0);
  });
});
