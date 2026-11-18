// What helps: donepezil in suspected prodromal (very early) Alzheimer's disease.
//   node research/help-donepezil.mjs
import { cite, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, phase, treatmentCaveat } from './helps.mjs';

const dubDesign = cite(
  'dubois2015',
  'A double-blind, randomized, placebo-controlled parallel group design using donepezil (10 mg/day) in subjects with suspected prodromal AD.',
);
const dubScans = cite('dubois2015', 'Subjects underwent two brain magnetic resonance imaging scans (baseline and final visit).');
const dubResult = cite(
  'dubois2015',
  'In the per protocol population (placebo = 92 and donepezil = 82), the donepezil group exhibited a significant reduced rate of hippocampal atrophy (APC = -1.89%) compared with the placebo group (APC = -3.47%), P < .001.',
);
const dubNoCognitive = cite('dubois2015', 'There was no significant difference in neuropsychological performance between treatment groups.');
const dubReduction = cite(
  'dubois2015',
  "A 45% reduction of rate of hippocampal atrophy was observed in prodromal AD following 1 year of treatment with donepezil compared with placebo.",
);
const cavBasal = cite('cavedo2017', 'Reduced annual BFCS rates of atrophy were found in the Donepezil group compared to the Placebo treated arm.');

const W = { start: [0, 0.18], placebo: [0.18, 0.46], drug: [0.46, 0.8], same: [0.8, 1] };

const score = {
  id: 'help-donepezil',
  title: "Donepezil in very early Alzheimer's",
  description:
    "Donepezil is a medicine that boosts the brain's acetylcholine, a chemical messenger used in memory. In a randomised trial of people with suspected very early (prodromal) Alzheimer's disease, half took donepezil and half a placebo for a year. The hippocampus shrank in both groups, but almost half as fast with donepezil. In this episode brightness stands for how much the hippocampus shrank over the year (its volume), not activity: violet means smaller than a year before.",
  caveat: treatmentCaveat(
    "This is one randomised trial of 216 people, with 174 analysed as planned, at 28 sites in France. The hippocampus still shrank with donepezil, only more slowly. Memory and thinking tests did not differ between the groups after a year, so slower shrinkage did not show up as better memory within the trial. A second report from the same trial found slower shrinkage of the basal forebrain, which is not a separate area in the brain model.",
  ),
  durationSeconds: 32,
  phases: [
    phase('start', 'At the start', 'start of the trial', W.start,
      'People with suspected very early Alzheimer\'s disease are scanned, then given either donepezil or a placebo, without knowing which.'),
    phase('placebo', 'A year on placebo', 'one year', W.placebo,
      'With placebo, the hippocampus shrank by about 3.5% over the year.',
      { kind: 'timed', citations: [dubScans] }),
    phase('drug', 'A year on donepezil', 'one year', W.drug,
      'With donepezil, it shrank by about 1.9%: 45% slower than with placebo.',
      { kind: 'reconstructed', rationale: 'The two groups were treated at the same time; showing placebo first is only a way of comparing them.' }),
    phase('same', 'What stayed the same', 'summary', W.same,
      'The hippocampus still shrank with donepezil, and memory and thinking tests did not differ between the groups after a year.',
      SUMMARY_ORDER),
  ],
  condition: {
    regions: [
      {
        region: 'hippocampus',
        explanation:
          'Shrank over a year in people with suspected very early Alzheimer\'s disease: by about 3.5% with placebo and about 1.9% with donepezil, in a randomised trial of 174 people analysed as planned. Memory and thinking tests did not differ. Brightness stands for volume lost over the year.',
        confidence: 'mixed',
        citations: [dubResult, dubReduction, dubDesign, dubNoCognitive, cavBasal],
        keyframes: [
          { t: 0, v: 0 },
          { t: 0.18, v: 0 },
          { t: 0.24, v: -0.6 },
          { t: 0.44, v: -0.6 },
          { t: 0.5, v: -0.33 },
          { t: 0.78, v: -0.33 },
          { t: 0.84, v: 0 },
          { t: 1, v: 0 },
        ],
      },
    ],
    connections: [],
  },
  typical: null,
};


writeScore(score, {
  indexTitle: "Donepezil (very early Alzheimer's)",
  category: 'treatment',
  treats: 'alzheimers',
  notes: [
    'Brightness is the yearly loss of hippocampal volume; the two levels are scaled to the reported 3.47% and 1.89%.',
    'Cavedo et al. 2017 (same trial) report slower basal forebrain shrinkage; the basal forebrain is not a model region.',
    'Read as abstracts only: Dubois et al. 2015, Cavedo et al. 2017.',
  ],
});
