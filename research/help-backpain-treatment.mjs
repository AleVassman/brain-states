// What helps: effective treatment of chronic low back pain (spine surgery or joint injections).
//   node research/help-backpain-treatment.mjs
import { cite, writeScore } from './lib.mjs';
import { beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const semThickness = cite(
  'seminowicz2011',
  'After treatment, patients had increased cortical thickness in the left dorsolateral prefrontal cortex (DLPFC), which was thinner before treatment compared with controls.',
);
const semCorrelation = cite('seminowicz2011', 'Increased DLPFC thickness correlated with the reduction of both pain and physical disability.');
const semFunction = cite(
  'seminowicz2011',
  'Left DLPFC activity during an attention-demanding cognitive task was abnormal before treatment, but normalized following treatment.',
);
const semDesign = cite(
  'seminowicz2011',
  'We acquired MRI scans from chronic low back pain (CLBP) patients before (n = 18) and 6 months after (spine surgery or facet joint injections; n = 14) treatment.',
);
const semOthers = cite(
  'seminowicz2011',
  'Additionally, increased thickness in primary motor cortex was associated specifically with reduced physical disability, and right anterior insula was associated specifically with reduced pain.',
);

const score = {
  id: 'help-backpain-treatment',
  title: 'Treating chronic back pain: the brain recovers',
  description:
    'Long-lasting pain is linked with thinner grey matter in parts of the brain. This study asked whether that reverses when the pain is treated. People with chronic low back pain were scanned before and six months after spine surgery or joint injections. After treatment, the left dorsolateral prefrontal cortex, which was thinner than in people without pain, had become thicker, and its activity during an attention task had returned to normal. In this episode brightness stands for cortical thickness, not activity. In the first part it shows the difference from people without pain; in "What changed" it shows the change since before treatment.',
  caveat: treatmentCaveat(
    'This is one study of 14 people treated with spine surgery or facet joint injections, so it shows what happens when pain is relieved, not the effect of one particular treatment. More thickening went with more pain relief, which is a relationship across people. Other areas, the primary motor cortex and the right anterior insula, thickened more in people whose disability or pain improved more; those are described, not drawn as group changes.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption:
      'Before treatment, the left dorsolateral prefrontal cortex was thinner than in people without pain, and its activity during an attention task was abnormal.',
    duringName: 'Treatment and six months',
    duringTimescale: 'months',
    duringCaption: 'Spine surgery or facet joint injections, then six months before the second scan. The brain is drawn at rest here.',
    afterCaption:
      'Six months later, the left dorsolateral prefrontal cortex is thicker than before, and its activity during the attention task has returned to normal. The more it thickened, the more pain and disability improved.',
    sameCaption:
      'The findings are about pain being relieved, by different procedures, in a small group. They suggest these brain changes can reverse, not that they always do.',
    timedBy: [semDesign],
  }),
  condition: {
    regions: [
      {
        region: 'dlpfc-l',
        explanation:
          'Thinner than in people without pain before treatment, and thicker six months after effective treatment, in one study of 14 people. Its activity during an attention task, abnormal before, was normal after. Brightness stands for cortical thickness, not activity.',
        confidence: 'mixed',
        citations: [semThickness, semCorrelation, semFunction, semDesign],
        keyframes: beforeAfter(-0.4, 0.5),
      },
    ],
    connections: [],
  },
  typical: null,
};

void semOthers;

writeScore(score, {
  indexTitle: 'Treating chronic back pain',
  category: 'treatment',
  treats: 'chronicpain',
  notes: [
    'Brightness is cortical thickness; said in the description and on the region.',
    'Primary motor cortex and right anterior insula thickening are correlations with improvement, not group changes; described in the caveat, not drawn.',
    'Read in full: Seminowicz et al. 2011.',
  ],
});
