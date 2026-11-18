// What helps: a dose of levodopa in early Parkinson's disease.
//   node research/help-levodopa.mjs
import { cite, writeScore } from './lib.mjs';
import { beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const buhModel = cite(
  'buhmann2003',
  "According to the basal ganglia-thalamocortical circuit model, dopamine depletion in the nigrostriatal system leads to hypoactivation in the supplementary motor area (SMA) and the primary motor cortex (M1) in Parkinson's disease.",
);
const buhIncrease = cite(
  'buhmann2003',
  'M1 contralateral to the affected hand and SMA, predominantly of the contralateral side, showed a BOLD signal increase after L-dopa intake.',
);
const buhHypo = cite(
  'buhmann2003',
  'Furthermore, comparing BOLD responses of M1 and SMA between the patients and controls revealed that these areas were hypoactive before L-dopa treatment.',
);
const buhPerformance = cite(
  'buhmann2003',
  'Signal changes in M1 and SMA were highly correlated with motor performance, which increased after L-dopa intake.',
);
const buhDesign = cite(
  'buhmann2003',
  'Patients performed a simple, auditory-paced random finger- opposition task every 3 s before and repeatedly every 20 min after intake of 300 mg of fast-release L-dopa.',
);
const buhSample = cite(
  'buhmann2003',
  'Eight drug-naive patients with an akinetic idiopathic hemiparkinsonian syndrome (Hoehn and Yahr stage 1-1.5) and 10 healthy controls were studied.',
);
const buhPrior = cite(
  'buhmann2003',
  'This functional cortical deafferentation and its reversibility by levodopa (L-dopa) treatment has been established in previous studies for SMA but remains controversial for M1.',
);

const score = {
  id: 'help-levodopa',
  title: "Levodopa for Parkinson's",
  description:
    "Levodopa (L-dopa) is a medicine for Parkinson's disease, in which dopamine is depleted in the circuits that control movement. One study scanned people in the early stage of Parkinson's, who had never taken the medicine, while they touched their thumb to their fingers, before and after a single dose. Before the dose, the motor cortex and the supplementary motor area were less active than in people without Parkinson's; after it, both became more active and movement improved. In the first part, brightness shows the difference from people without Parkinson's; in \"What changed\" it shows the change since before the dose.",
  caveat: treatmentCaveat(
    "All findings come from one study of 8 people with early Parkinson's affecting one side of the body, and 10 people without it, scanned repeatedly every 20 minutes after a single dose. The motor cortex finding is on the side opposite the affected hand; the abstract does not say which side that was for each person, so drawing both sides is an assumption. The authors say earlier studies found the same reversal in the supplementary motor area, while the motor cortex finding has been controversial; those earlier studies were not read here.",
  ),
  durationSeconds: 30,
  phases: treatmentPhases({
    beforeCaption: "Before the dose, during a finger movement task, the motor cortex and the supplementary motor area are less active than in people without Parkinson's.",
    duringName: 'One dose of levodopa',
    duringTimescale: 'minutes',
    duringCaption: 'A single dose of levodopa, then repeated scans every 20 minutes. The brain is drawn at rest here.',
    afterCaption:
      'After the dose, the motor cortex and the supplementary motor area are more active during the same finger task, and movement is better. The two went closely together.',
    sameCaption: 'Only a single dose was studied. Long-term treatment was not part of this study.',
    timedBy: [buhDesign],
  }),
  condition: {
    regions: [
      {
        region: 'sma',
        explanation:
          "Less active than in people without Parkinson's before the dose, and more active after it, mainly on the side opposite the affected hand, in one study of 8 people. The authors say earlier studies found the same.",
        confidence: 'mixed',
        citations: [buhHypo, buhIncrease, buhPrior, buhSample, buhModel],
        keyframes: beforeAfter(-0.45, 0.5),
      },
      {
        region: 'motor-cortex',
        explanation:
          "Less active than in people without Parkinson's before the dose, and more active after it, on the side opposite the affected hand, in one study of 8 people. Drawing both sides is an assumption. The authors note this finding has been controversial.",
        confidence: 'mixed',
        citations: [buhHypo, buhIncrease, buhPerformance, buhPrior],
        keyframes: beforeAfter(-0.4, 0.45),
      },
    ],
    connections: [],
  },
  typical: null,
};


writeScore(score, {
  indexTitle: 'Levodopa',
  category: 'treatment',
  treats: 'parkinsons',
  notes: [
    'The SMA is "mixed", not "established": the authors\' statement about earlier studies could not be checked here.',
    'The description\'s first sentence follows the abstract\'s model statement (buhModel).',
    'Read as abstract only: Buhmann et al. 2003.',
  ],
});
