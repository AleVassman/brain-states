// What helps: aerobic exercise in mild cognitive impairment (early memory problems).
// Two separate trials, each shown with its own before and after.
//   node research/help-exercise-memory.mjs
import { cite, kf, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, inWindow, phase, treatmentCaveat } from './helps.mjs';

const tbVolume = cite('tenbrinke2015', 'Compared with the BAT group, AT significantly improved left, right, and total hippocampal volumes');
const tbMaintenance = cite(
  'tenbrinke2015',
  'Single-sample t-tests indicated that mean change in hippocampal volume (left, right, and total) within the AT group were not significantly different from zero',
);
const tbMaintenance2 = cite('tenbrinke2015', 'indicating hippocampal volume maintenance rather than increase over the six-month');
const tbMemory = cite(
  'tenbrinke2015',
  'After accounting for baseline cognitive function and experimental group, increased left hippocampal volume was independently associated with reduced verbal memory and learning performance as indexed by loss after interference',
);
const tbDesign = cite('tenbrinke2015', 'At baseline and trial completion, participants performed a 3T magnetic resonance imaging scan to determine hippocampal volume');
const tbScanned = cite('tenbrinke2015', 'At trial completion, 10 of the 39 MRI participants dropped out, and 29 participants completed a second MRI scan.');
const alfInsula = cite('alfini2019', 'exhibited significantly elevated perfusion in the left insula.');
const alfReversed = cite('alfini2019', 'Twelve weeks of aerobic exercise reversed this discrepancy.');
const alfNotAfter = cite(
  'alfini2019',
  'In the present study, individuals with MCI demonstrated significantly elevated CBF in the L insula at baseline, but not immediately after 12 weeks of aerobic exercise.',
);
const alfAcc = cite('alfini2019', 'exercise training decreased CBF among those with MCI in the L ACC, F(1, 14) = 6.8, p = 0.021 and the R IFG');
const alfDesign = cite(
  'alfini2019',
  'Before and after a 12-week exercise intervention, 18 CN and 17 MCI participants (aged 61–88) underwent aerobic fitness testing, neuropsychological assessment, and an MRI scan.',
);
const alfUsable = cite('alfini2019', 'Sufficient perfusion data were available for 32 participants at baseline (15 MCI and 17 CN)');
const alfProgramme = cite('alfini2019', 'The 12-week exercise intervention included four 30-min sessions of moderate-intensity treadmill walking per week');
const alfNoControl = cite('alfini2019', 'Finally, the lack of a non-exercise control group is a limitation of this study');

const W = { trial1: [0, 0.38], flowBefore: [0.38, 0.54], flowAfter: [0.54, 0.84], same: [0.84, 1] };

const score = {
  id: 'help-exercise-memory',
  title: 'Exercise for early memory problems',
  description:
    'Mild cognitive impairment means memory or thinking problems that are noticeable but do not yet interfere much with daily life; it raises the risk of Alzheimer\'s disease, but not everyone with it goes on to develop dementia. Two separate trials looked at regular aerobic exercise, shown one after the other. In the first, the hippocampus kept its volume better over six months than with balance and toning exercises. In the second, raised blood flow in the left insula was no longer different from people without memory problems after twelve weeks of treadmill walking, and blood flow in two frontal areas fell. Each phase says what brightness means.',
  caveat: treatmentCaveat(
    'These are studies of mild cognitive impairment, not of Alzheimer\'s disease itself, and they do not show that exercise prevents or slows Alzheimer\'s. The first trial included 86 women aged 70 to 80, of whom only 29 had brain scans both before and after; in the exercise group the hippocampus did not grow, it was maintained, and a larger left hippocampus went, unexpectedly, with worse performance on one memory measure. The second study had blood-flow data for 15 people with mild cognitive impairment and 17 without, and no group that did not exercise. The left anterior cingulate is drawn on the pregenual cingulate and the right inferior frontal gyrus on the ventrolateral prefrontal cortex, both approximations.',
  ),
  durationSeconds: 38,
  phases: [
    phase('trial1', 'Hippocampus: six months of training', 'months', W.trial1,
      'First trial: twice-weekly aerobic training for six months, compared with balance and toning exercises. Afterwards, the hippocampus was larger in the aerobic group than in the comparison group, because it held its size rather than grew. Brightness here is the difference from the comparison group.'),
    phase('flowBefore', 'Blood flow: before exercise', 'before treatment', W.flowBefore,
      'Second study: before exercise, people with mild cognitive impairment had more blood flow in the left insula than people without memory problems. Brightness here is blood flow compared with people without memory problems.',
      { kind: 'reconstructed', rationale: 'This is a separate study from the first phase; it is shown afterwards only to present the two trials one at a time.' }),
    phase('flowAfter', 'Blood flow: after twelve weeks', 'after treatment', W.flowAfter,
      'After twelve weeks of treadmill walking four times a week, the insula difference was no longer present, and blood flow in the left anterior cingulate and the right inferior frontal gyrus had fallen. Brightness here is the change since before exercise.',
      { kind: 'timed', citations: [alfDesign] }),
    phase('same', 'What stayed the same', 'summary', W.same,
      'The hippocampus was maintained, not enlarged, and a bigger one did not mean better memory. The blood-flow study had no group that did not exercise. Neither study shows that exercise prevents Alzheimer\'s disease.',
      SUMMARY_ORDER),
  ],
  condition: {
    regions: [
      {
        region: 'hippocampus',
        explanation:
          'Larger on both sides after six months of aerobic training than after balance and toning exercises, in a trial of older women with mild cognitive impairment; within the aerobic group it did not grow, it was maintained. A larger left hippocampus went with worse performance on one memory measure. Brightness stands for the volume difference from the comparison group.',
        confidence: 'mixed',
        citations: [tbVolume, tbMaintenance, tbMaintenance2, tbMemory, tbDesign, tbScanned],
        keyframes: kf(0, 0, 0.06, 0.4, 0.34, 0.4, 0.38, 0, 1, 0),
      },
      {
        region: 'insula-l',
        explanation:
          'Blood flow was higher than in people without memory problems before exercise, and no longer different after twelve weeks of aerobic exercise, in one study. Drawn only before, because the study does not report a fall within the group here. Brightness stands for blood flow.',
        confidence: 'mixed',
        citations: [alfInsula, alfReversed, alfNotAfter, alfUsable],
        keyframes: inWindow(0.38, 0.54, 0.4),
      },
      {
        region: 'pgacc-l',
        explanation: 'Blood flow in the left anterior cingulate fell after twelve weeks of exercise in people with mild cognitive impairment, in one study. Drawn on the left pregenual cingulate, an approximation.',
        confidence: 'mixed',
        citations: [alfAcc, alfProgramme, alfNoControl],
        keyframes: inWindow(0.54, 0.84, -0.4),
      },
      {
        region: 'vlpfc-r',
        explanation: 'Blood flow in the right inferior frontal gyrus fell after twelve weeks of exercise in people with mild cognitive impairment, in one study. Drawn on the right ventrolateral prefrontal cortex, an approximation.',
        confidence: 'mixed',
        citations: [alfAcc, alfNoControl],
        keyframes: inWindow(0.54, 0.84, -0.35),
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
    'Two separate trials are shown in separate phases, each with its own comparison; they are not stitched into one before and after.',
    'Hippocampus: ten Brinke et al. 2015 call it "maintenance rather than increase"; drawn as the difference from the comparison group, and the text says so.',
    'Insula: the difference from people without memory problems disappeared; no within-group fall is reported, so none is drawn.',
    'Read in full: ten Brinke et al. 2015, Alfini et al. 2019.',
  ],
});
