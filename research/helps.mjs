// Shared shape for the "What helps" treatment episodes.
//
// Every treatment episode has four phases on the same clock, so the two kinds of brightness
// never blend into each other:
//   before   0.00-0.25  differences from people without the condition, reported by the treatment
//                       study itself (or the brain at rest when it reports none)
//   during   0.25-0.40  the treatment itself; the brain is drawn at rest
//   after    0.40-0.80  what changed: brightness is the change since before treatment
//   same     0.80-1.00  what did not change, and who did not respond; back to rest
import { TREATMENT_NOTE, kf } from './lib.mjs';

export const PHASE = { before: [0, 0.25], during: [0.25, 0.4], after: [0.4, 0.8], same: [0.8, 1] };

/** A level shown only in the "before" phase (difference from people without the condition). */
export const before = (v) => kf(0, 0, 0.05, v, 0.22, v, 0.26, 0, 1, 0);

/** A change shown only in the "after" phase (change since before treatment). */
export const after = (v) => kf(0, 0, 0.4, 0, 0.48, v, 0.8, v, 0.85, 0, 1, 0);

/** A level held only between times a and b (for episodes that split "What changed" into parts). */
export const inWindow = (a, b, v) => kf(0, 0, a, 0, a + 0.04, v, b - 0.02, v, b + 0.02, 0, 1, 0);

/** Phase helper for episodes with their own phase list: one phase object. */
export const phase = (id, name, timescale, [start, end], caption, order) => ({ id, name, timescale, start, end, caption, ...(order ? { order } : {}) });

/** The order note for a phase that shows a summary rather than a later time. */
export const SUMMARY_ORDER = { kind: 'reconstructed', rationale: 'This last part is a summary of what the studies did not find or did not measure, not a later point in time.' };

/** A region with a "before" difference and an "after" change. */
export const beforeAfter = (b, a) => kf(0, 0, 0.05, b, 0.22, b, 0.26, 0, 0.4, 0, 0.48, a, 0.8, a, 0.85, 0, 1, 0);

/**
 * The four phases. `timedBy` is the citation that shows people were scanned before and after
 * treatment, which is what puts "after" after "before".
 */
export function treatmentPhases({ beforeCaption, duringName, duringTimescale, duringCaption, afterCaption, sameCaption, timedBy }) {
  return [
    { id: 'before', name: 'Before treatment', timescale: 'before treatment', start: PHASE.before[0], end: PHASE.before[1], caption: beforeCaption },
    {
      id: 'during',
      name: duringName,
      timescale: duringTimescale,
      start: PHASE.during[0],
      end: PHASE.during[1],
      caption: duringCaption,
      order: { kind: 'timed', citations: timedBy },
    },
    {
      id: 'after',
      name: 'What changed',
      timescale: 'after treatment',
      start: PHASE.after[0],
      end: PHASE.after[1],
      caption: afterCaption,
      order: { kind: 'timed', citations: timedBy },
    },
    {
      id: 'same',
      name: 'What stayed the same',
      timescale: 'summary',
      start: PHASE.same[0],
      end: PHASE.same[1],
      caption: sameCaption,
      order: { kind: 'reconstructed', rationale: 'This last part is a summary of what the studies did not find or did not measure, not a later point in time.' },
    },
  ];
}

/** The caveat of a treatment episode: its own text followed by the shared note. */
export const treatmentCaveat = (text) => `${text} ${TREATMENT_NOTE}`;

/** The sentence every description uses to explain the two kinds of brightness. */
export const BRIGHTNESS =
  'In the first part, brightness shows how the brain differed from people without the condition before treatment. In "What changed", brightness shows the change since before treatment: warmer means more than before, violet means less than before.';
