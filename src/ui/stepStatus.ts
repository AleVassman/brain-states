import { DRAWN as VISIBLE } from '../brain/appearance';
import { frameAt } from '../score/timeline';
import type { Frame, RegionInfo, Score, VariantName } from '../score/types';

/** Shown over the brain while a step of an episode draws no change at all. */
export const REST_NOTE = 'No change is drawn in this step, so the brain is shown at rest. The text below says why.';

/** True while an episode is showing and nothing in it differs visibly from rest. */
export function nothingDrawn(frame: Frame | null): boolean {
  if (!frame) return false;
  for (const v of frame.regions.values()) if (Math.abs(v) >= VISIBLE) return false;
  for (const c of frame.connections) if (Math.abs(c.v) >= VISIBLE) return false;
  return true;
}

/** Samples per phase when judging how much of it is blank. */
const SAMPLES = 20;

/**
 * Whether to show the rest note at time t: nothing is drawn now, and nothing is drawn for most
 * of the current step. The second condition keeps the note away from the brief blank moment
 * at the start of a step whose changes are still fading in.
 */
export function showRestNote(score: Score | null, variant: VariantName, t: number, regions: RegionInfo[]): boolean {
  if (!score) return false;
  const now = frameAt(score, variant, t, regions);
  if (!nothingDrawn(now)) return false;
  const { start, end } = now.phase;
  let blank = 0;
  for (let i = 0; i < SAMPLES; i++) {
    if (nothingDrawn(frameAt(score, variant, start + ((end - start) * (i + 0.5)) / SAMPLES, regions))) blank++;
  }
  return blank / SAMPLES > 0.5;
}
