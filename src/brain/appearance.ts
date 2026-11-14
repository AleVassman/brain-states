export type Rgb = [number, number, number];

export interface Appearance {
  /** Linear 0..1 colour components. */
  color: Rgb;
  /** Brightness multiplier. Rises steadily with activity, so it carries the meaning without colour. */
  intensity: number;
}

const rgb = (hex: number): Rgb => [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];

const BASELINE = { color: rgb(0x3fa9ff), intensity: 0.35 };
const ABOVE = { color: rgb(0xff6a3d), intensity: 1.6 };
const BELOW = { color: rgb(0x3b1f6b), intensity: 0.08 };

/**
 * How a region looks at activity `v`: 0 is a typical brain at rest (cool blue),
 * +1 strongly above it (bright coral), -1 strongly below it (dim violet).
 */
export function activityToAppearance(v: number): Appearance {
  const clamped = Math.min(1, Math.max(-1, v));
  const end = clamped >= 0 ? ABOVE : BELOW;
  const k = Math.abs(clamped);
  const mix = (a: number, b: number) => a + (b - a) * k;
  return {
    color: [
      mix(BASELINE.color[0], end.color[0]),
      mix(BASELINE.color[1], end.color[1]),
      mix(BASELINE.color[2], end.color[2]),
    ],
    intensity: mix(BASELINE.intensity, end.intensity),
  };
}
