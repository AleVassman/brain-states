import type { Citation, RegionInfo, Score } from '../../src/score/types';

export const REGION_NAMES = new Set(['amygdala', 'amygdala-l', 'amygdala-r', 'mpfc', 'mpfc-mid']);

export const REGIONS: RegionInfo[] = [
  { id: 'amygdala-l', group: 'amygdala', name: 'Left amygdala', hemisphere: 'l', centroid: [-0.24, -0.05, 0.02], kind: 'mesh', approximate: false, source: 'test' },
  { id: 'amygdala-r', group: 'amygdala', name: 'Right amygdala', hemisphere: 'r', centroid: [0.24, -0.05, 0.02], kind: 'mesh', approximate: false, source: 'test' },
  { id: 'mpfc-mid', group: 'mpfc', name: 'Medial prefrontal cortex', hemisphere: 'mid', centroid: [0, 0.2, 0.5], kind: 'mesh', approximate: false, source: 'test' },
];

export function citation(): Citation {
  return {
    authors: 'Tester A, Tester B',
    year: 2020,
    title: 'A test source',
    doi: '10.1000/test.1',
    kind: 'meta-analysis',
    access: 'full-text',
    quote: 'The amygdala responded.',
  };
}

/** A fresh, valid score every call, so tests can mutate it freely. */
export function validScore(): Score {
  return {
    id: 'test',
    title: 'Test state',
    description: 'A state used in tests.',
    caveat: 'Pacing is a reconstruction.',
    durationSeconds: 20,
    phases: [
      {
        id: 'trigger', name: 'Trigger', timescale: 'under a second', start: 0, end: 0.5,
        caption: 'Something happens.', typicalCaption: 'Something happens (typical).',
      },
      {
        id: 'alarm', name: 'Alarm', timescale: 'seconds', start: 0.5, end: 1,
        caption: 'The alarm rises.', typicalCaption: 'The alarm rises and settles.',
        order: { kind: 'reconstructed', rationale: 'Detection precedes response.' },
      },
    ],
    condition: {
      regions: [
        {
          region: 'amygdala', explanation: 'Flags the event as important.', confidence: 'established',
          citations: [citation()], keyframes: [{ t: 0, v: 0 }, { t: 1, v: 1 }],
        },
      ],
      connections: [
        {
          from: 'amygdala', to: 'mpfc', explanation: 'Regulation weakens.', confidence: 'mixed',
          citations: [citation()], keyframes: [{ t: 0, v: 0 }, { t: 1, v: -0.5 }],
        },
      ],
    },
    typical: {
      regions: [
        {
          region: 'amygdala', explanation: 'Responds briefly.', confidence: 'established',
          citations: [citation()], keyframes: [{ t: 0, v: 0 }, { t: 0.5, v: 0.5 }, { t: 1, v: 0 }],
        },
      ],
      connections: [],
    },
  };
}
