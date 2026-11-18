// What helps: a dose of levodopa in early Parkinson's disease.
//   node research/help-levodopa.mjs
import { cite, writeScore } from './lib.mjs';
import { beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

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
    "Levodopa is the main medicine for Parkinson's disease: the brain turns it into dopamine, replacing what is lost. One study scanned people in the early stage of Parkinson's, who had never taken the medicine, while they tapped their fingers, before and after a single dose. Before the dose, the motor cortex and the supplementary motor area were less active than in people without Parkinson's; after it, both became more active and movement improved. In the first part, brightness shows the difference from people without Parkinson's; in \"What changed\" it shows the change since before the dose.",
  caveat: treatmentCaveat(
    "All findings come from one study of 8 people with early Parkinson's affecting one side of the body, and 10 people without it. The effect of a single dose was measured over the following hour or so, not long-term treatment. The motor cortex finding is on the side opposite the affected hand; which side that is differed between people, so both sides are drawn. The authors note the supplementary motor area finding agrees with earlier studies, while the motor cortex finding has been controversial.",
  ),
  durationSeconds: 30,
  phases: treatmentPhases({
    beforeCaption: "Before the dose, while tapping fingers, the motor cortex and the supplementary motor area are less active than in people without Parkinson's.",
    duringName: 'One dose of levodopa',
    duringTimescale: 'minutes',
    duringCaption: 'A single dose of levodopa, then repeated scans every 20 minutes. The brain is drawn at rest here.',
    afterCaption:
      'After the dose, the motor cortex and the supplementary motor area are more active during the same finger task, and movement is better. The two went closely together.',
    sameCaption:
      "This shows a single dose in early Parkinson's. Over years, Parkinson's continues to progress, and the medicine's effect wears off between doses; that was not part of this study.",
    timedBy: [buhDesign],
  }),
  condition: {
    regions: [
      {
        region: 'sma',
        explanation:
          "Less active than in people without Parkinson's before the dose, and more active after it, mainly on the side opposite the affected hand, in one study of 8 people. The authors note that this reversal was already established by earlier studies.",
        confidence: 'established',
        citations: [buhHypo, buhIncrease, buhPrior, buhSample],
        keyframes: beforeAfter(-0.45, 0.5),
      },
      {
        region: 'motor-cortex',
        explanation:
          "Less active than in people without Parkinson's before the dose, and more active after it, on the side opposite the affected hand, in one study of 8 people. Both sides are drawn because the affected side differed between people. The authors note this finding has been controversial.",
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
    'The supplementary motor area is "established" because the authors state its levodopa reversibility "has been established in previous studies"; those earlier studies were not read here.',
    'Read as abstract only: Buhmann et al. 2003.',
  ],
});
