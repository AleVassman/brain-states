import type { RegionInfo } from '../score/types';

export interface ConnectionStyle {
  opacity: number;
  /** Pulses passing any point of the line per second. */
  pulseRate: number;
  dashed: boolean;
}

const BASE_OPACITY = 0.15;
const MIN_OPACITY = 0.03;
const MAX_PULSE_RATE = 3;

/**
 * How a connection of strength `v` is drawn: 0 is a faint still line, positive
 * values brighten it and send pulses along it, negative values dim it and
 * break it into dashes.
 */
export function connectionStyle(v: number): ConnectionStyle {
  const c = Math.min(1, Math.max(-1, v));
  if (c > 0) {
    return { opacity: BASE_OPACITY + (1 - BASE_OPACITY) * c, pulseRate: MAX_PULSE_RATE * c, dashed: false };
  }
  if (c < 0) {
    return { opacity: Math.max(MIN_OPACITY, BASE_OPACITY * (1 + c)), pulseRate: 0, dashed: true };
  }
  return { opacity: BASE_OPACITY, pulseRate: 0, dashed: false };
}

/**
 * Where a connection end attaches: the centre of each region in the group
 * (one per hemisphere for paired structures), or of the single region when
 * `name` is a region id. Empty for an unknown name.
 */
export function groupCentroid(name: string, regions: RegionInfo[]): [number, number, number][] {
  const byId = regions.find((r) => r.id === name);
  if (byId) return [byId.centroid];
  return regions.filter((r) => r.group === name).map((r) => r.centroid);
}
