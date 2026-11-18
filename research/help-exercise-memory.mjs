// What helps: aerobic exercise in mild cognitive impairment (early memory problems).
//   node research/help-exercise-memory.mjs
import { cite, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, inWindow, phase, treatmentCaveat } from './helps.mjs';
import { kf } from './lib.mjs';

const tbVolume = cite('tenbrinke2015', 'Compared with the BAT group, AT significantly improved left, right, and total hippocampal volumes');
const tbMemory = cite(
  'tenbrinke2015',
  'After accounting for baseline cognitive function and experimental group, increased left hippocampal volume was independently associated with reduced verbal memory and learning performance as indexed by loss after interference',
);
const alfInsula = cite('alfini2019', 'exhibited significantly elevated perfusion in the left insula.');
const alfReversed = cite('alfini2019', 'Twelve weeks of aerobic exercise reversed this discrepancy.');
const alfFluency = cite('alfini2019', 'Among those with MCI, decreased CBF in the left insula and anterior cingulate cortex was associated with improved verbal fluency.');
const alfDesign = cite(
  'alfini2019',
  'Before and after a 12-week exercise intervention, 18 CN and 17 MCI participants (aged 61–88) underwent aerobic fitness testing, neuropsychological assessment, and an MRI scan.',
);

const W = { before: [0, 0.2], during: [0.2, 0.32], volume: [0.32, 0.56], flow: [0.56, 0.82], same: [0.82, 1] };

const score = {
  id: 'help-exercise-memory',
  title: 'Exercise for early memory problems',
  description:
    'Mild cognitive impairment means memory or thinking problems that are noticeable but do not yet interfere much with daily life; it raises the risk of Alzheimer\'s disease, but not everyone with it goes on to develop dementia. Two trials looked at regular aerobic exercise, such as brisk walking. In one, the hippocampus grew slightly in volume. In the other, blood flow in the left insula, raised in people with memory problems, came back in line with people without them. Brightness stands for volume in one part and blood flow in the other, as each phase says.',
  caveat: treatmentCaveat(
    'These are studies of mild cognitive impairment, not of Alzheimer\'s disease itself, and they do not show that exercise prevents or slows Alzheimer\'s. The volume finding comes from a trial of 86 women aged 70 to 80, of whom only 29 had brain scans both before and after, compared with balance and toning exercises; in that trial a larger increase in the left hippocampus went, unexpectedly, with worse performance on one memory measure. The blood-flow finding comes from a study of 17 people with mild cognitive impairment and 18 without.',
  ),
  durationSeconds: 36,
  phases: [
    phase('before', 'Before exercise', 'before', W.before,
      'Before the programme, people with mild cognitive impairment had more blood flow in the left insula than people without memory problems. Brightness here is blood flow compared with people without memory problems.'),
    phase('during', 'Months of exercise', 'months', W.during,
      'Twice-weekly aerobic training for six months in one trial; twelve weeks in the other. People were not scanned during this time.',
      { kind: 'timed', citations: [alfDesign] }),
    phase('volume', 'Hippocampus volume', 'after training', W.volume,
      'After six months of aerobic training, the hippocampus on both sides was larger than after balance and toning exercises. Brightness here is volume.',
      { kind: 'timed', citations: [alfDesign] }),
    phase('flow', 'Blood flow', 'after training', W.flow,
      'After twelve weeks of aerobic exercise, blood flow in the left insula had come back in line with people without memory problems. Brightness here is the change in blood flow since before exercise.',
      { kind: 'reconstructed', rationale: 'The volume and blood-flow findings come from two separate trials; they are shown one after the other only to present them one at a time.' }),
    phase('same', 'What stayed the same', 'summary', W.same,
      'A bigger hippocampus did not mean better memory in the volume trial. Neither study shows that exercise prevents Alzheimer\'s disease.',
      SUMMARY_ORDER),
  ],
  condition: {
    regions: [
      {
        region: 'hippocampus',
        explanation:
          'Larger on both sides after six months of aerobic training than after balance and toning exercises, in a trial of older women with mild cognitive impairment. A larger increase on the left went with worse performance on one memory measure. Brightness stands for volume.',
        confidence: 'mixed',
        citations: [tbVolume, tbMemory],
        keyframes: inWindow(0.32, 0.56, 0.45),
      },
      {
        region: 'insula-l',
        explanation:
          'Blood flow was higher than in people without memory problems before exercise, and came back in line after twelve weeks of aerobic exercise, in one study. Brightness stands for blood flow.',
        confidence: 'mixed',
        citations: [alfInsula, alfReversed, alfFluency, alfDesign],
        keyframes: kf(0, 0, 0.04, 0.4, 0.18, 0.4, 0.21, 0, 0.56, 0, 0.6, -0.4, 0.8, -0.4, 0.84, 0, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Exercise for early memory problems',
  category: 'treatment',
  treats: 'alzheimers',
  notes: [
    'Linked to "Alzheimer\'s disease" because mild cognitive impairment is a risk state for it; the description and caveat say these are not studies of Alzheimer\'s disease.',
    'The anterior cingulate blood-flow decrease in Alfini et al. 2019 is a relationship with improvement across people, not a group change; not drawn.',
    'Read in full: ten Brinke et al. 2015, Alfini et al. 2019.',
  ],
});
