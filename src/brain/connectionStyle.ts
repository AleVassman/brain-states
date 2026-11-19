import type { RegionInfo } from '../score/types';
import { activityToAppearance, type Rgb } from './appearance';

export interface ConnectionStyle {
  opacity: number;
  /** Pulses passing any point of the line per second. */
  pulseRate: number;
  dashed: boolean;
  color: Rgb;
}

/** The interface's violet: weakened connections are drawn in it so the dashes show on the dark background. */
const WEAKER: Rgb = [0x9a / 255, 0x7b / 255, 0xd8 / 255];

const BASE_OPACITY = 0.15;
const WEAKER_OPACITY = 0.35;
const MAX_WEAKER_OPACITY = 0.8;
const MAX_PULSE_RATE = 3;

/**
 * How a connection of strength `v` is drawn: 0 is a faint still line, positive
 * values brighten it and send pulses along it, negative values turn it into
 * violet dashes that stand out more the more it is weakened.
 */
export function connectionStyle(v: number): ConnectionStyle {
  const c = Math.min(1, Math.max(-1, v));
  if (c > 0) {
    return { opacity: BASE_OPACITY + (1 - BASE_OPACITY) * c, pulseRate: MAX_PULSE_RATE * c, dashed: false, color: activityToAppearance(c).color };
  }
  if (c < 0) {
    return { opacity: WEAKER_OPACITY + (MAX_WEAKER_OPACITY - WEAKER_OPACITY) * -c, pulseRate: 0, dashed: true, color: WEAKER };
  }
  return { opacity: BASE_OPACITY, pulseRate: 0, dashed: false, color: activityToAppearance(0).color };
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
