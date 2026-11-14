import type { Frame, Keyframe, Phase, RegionInfo, Score, VariantName } from './types';

/**
 * Value of a keyframe track at time t. Linear between keyframes; holds the
 * nearest keyframe's value outside the span the keyframes cover.
 */
export function sampleTrack(keyframes: Keyframe[], t: number): number {
  if (keyframes.length === 0) return 0;
  const first = keyframes[0];
  if (t <= first.t) return first.v;
  const last = keyframes[keyframes.length - 1];
  if (t >= last.t) return last.v;

  let i = 0;
  while (i < keyframes.length - 1 && keyframes[i + 1].t <= t) i++;
  const a = keyframes[i];
  const b = keyframes[i + 1];
  const span = b.t - a.t;
  if (span <= 0) return b.v;
  return a.v + ((b.v - a.v) * (t - a.t)) / span;
}

/** The phase playing at time t. A boundary belongs to the later phase. */
export function phaseAt(score: Score, t: number): Phase {
  const phases = score.phases;
  for (let i = phases.length - 1; i >= 0; i--) {
    if (t >= phases[i].start) return phases[i];
  }
  return phases[0];
}

/**
 * Everything the renderer needs at time t: activity for every region (0 when
 * no track covers it) and the strength of every connection.
 */
export function frameAt(score: Score, variant: VariantName, t: number, regions: RegionInfo[]): Frame {
  const activity = new Map<string, number>();
  for (const r of regions) activity.set(r.id, 0);

  const tracks = variant === 'typical' ? score.typical : score.condition;
  const connections: Frame['connections'] = [];

  if (tracks) {
    // Group tracks first, then id tracks, so a specific region overrides its group.
    for (const track of tracks.regions) {
      if (activity.has(track.region)) continue;
      const v = sampleTrack(track.keyframes, t);
      for (const r of regions) if (r.group === track.region) activity.set(r.id, v);
    }
    for (const track of tracks.regions) {
      if (activity.has(track.region)) activity.set(track.region, sampleTrack(track.keyframes, t));
    }
    for (const c of tracks.connections) {
      connections.push({ from: c.from, to: c.to, v: sampleTrack(c.keyframes, t) });
    }
  }

  return { t, phase: phaseAt(score, t), variant, regions: activity, connections };
}
