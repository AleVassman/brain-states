// What helps: donepezil in suspected prodromal (very early) Alzheimer's disease.
//   node research/help-donepezil.mjs
import { cite, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, phase, treatmentCaveat } from './helps.mjs';

const dubDesign = cite(
  'dubois2015',
  'A double-blind, randomized, placebo-controlled parallel group design using donepezil (10 mg/day) in subjects with suspected prodromal AD.',
);
const dubScans = cite('dubois2015', 'Subjects underwent two brain magnetic resonance imaging scans (baseline and final visit).');
const dubOutcome = cite(
  'dubois2015',
  'The primary efficacy outcome was the annualized percentage change (APC) of total hippocampal volume (left + right) measured by an automated segmentation method.',
);
const dubResult = cite(
  'dubois2015',
  'In the per protocol population (placebo = 92 and donepezil = 82), the donepezil group exhibited a significant reduced rate of hippocampal atrophy (APC = -1.89%) compared with the placebo group (APC = -3.47%), P < .001.',
);
const dubNoCognitive = cite('dubois2015', 'There was no significant difference in neuropsychological performance between treatment groups.');
const dubReduction = cite(
  'dubois2015',
  "A 45% reduction of rate of hippocampal atrophy was observed in prodromal AD following 1 year of treatment with donepezil compared with placebo.",
);
const cavDrugs = cite('cavedo2017', "Acetylcholinesterase inhibitors are approved drugs currently used for the treatment of Alzheimer's disease (AD) dementia.");
const cavBasal = cite('cavedo2017', 'Reduced annual BFCS rates of atrophy were found in the Donepezil group compared to the Placebo treated arm.');

const W = { start: [0, 0.18], placebo: [0.18, 0.46], drug: [0.46, 0.8], same: [0.8, 1] };

const score = {
  id: 'help-donepezil',
  title: "Donepezil in very early Alzheimer's",
  description:
    "Donepezil belongs to a group of medicines (acetylcholinesterase inhibitors) used for Alzheimer's dementia. A randomised trial tested it earlier, in people with suspected very early (prodromal) Alzheimer's disease: some took donepezil and others a placebo for a year. The hippocampus shrank in both groups, but about 45% more slowly with donepezil. In this episode brightness stands for the yearly loss of hippocampal volume, not activity: violet means volume lost.",
  caveat: treatmentCaveat(
    "This is one randomised trial: 216 people at 28 sites in France, with results reported for the 174 who kept to the trial protocol. The participants did not have dementia, and their diagnosis was suspected, not confirmed; the abstract does not say how it was established. The Alzheimer's episode shows activity, while this one shows tissue loss. The hippocampus still shrank with donepezil, only more slowly, and memory and thinking tests did not differ between the groups after a year. A second report by the same study group, apparently from the same trial, found slower shrinkage of the basal forebrain, which is not a separate area in the brain model.",
  ),
  durationSeconds: 32,
  phases: [
    phase('start', 'At the start', 'start of the trial', W.start,
      'People with suspected very early Alzheimer\'s disease are scanned, then given either donepezil or a placebo, without knowing which.'),
    phase('placebo', 'A year on placebo', 'one year', W.placebo,
      'In the placebo group, the hippocampus shrank by about 3.5% a year.',
      { kind: 'timed', citations: [dubScans] }),
    phase('drug', 'A year on donepezil', 'one year', W.drug,
      'A different group, over the same year: with donepezil, the hippocampus shrank by about 1.9% a year, 45% more slowly than with placebo.',
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
          'Shrank in people with suspected very early Alzheimer\'s disease: by about 3.5% a year with placebo and about 1.9% a year with donepezil, in a randomised trial (174 people who kept to the protocol). Memory and thinking tests did not differ. Brightness stands for the yearly loss of volume.',
        confidence: 'mixed',
        citations: [dubResult, dubReduction, dubOutcome, dubDesign, dubNoCognitive],
        keyframes: [
          { t: 0, v: 0 },
          { t: 0.18, v: 0 },
          { t: 0.24, v: -0.6 },
          { t: 0.44, v: -0.6 },
          { t: 0.46, v: 0 },
          { t: 0.48, v: 0 },
          { t: 0.52, v: -0.33 },
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

void cavDrugs;
void cavBasal;

writeScore(score, {
  indexTitle: "Donepezil (very early Alzheimer's)",
  category: 'treatment',
  treats: 'alzheimers',
  notes: [
    'Brightness is the yearly loss of hippocampal volume; the two levels are scaled to the reported 3.47% and 1.89% a year. The level returns to rest between the two groups, which ran in parallel.',
    'The description\'s drug-class sentence follows Cavedo et al. 2017: "' + "Acetylcholinesterase inhibitors are approved drugs currently used for the treatment of Alzheimer's disease (AD) dementia." + '"',
    'Cavedo et al. 2017 is inferred to be the same trial (same study group, design and dose); it reports slower basal forebrain shrinkage, not a model region.',
    'Read as abstracts only: Dubois et al. 2015, Cavedo et al. 2017.',
  ],
});
