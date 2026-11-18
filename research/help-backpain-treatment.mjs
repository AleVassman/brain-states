// What helps: effective treatment of chronic low back pain (spine surgery or joint injections).
//   node research/help-backpain-treatment.mjs
import { cite, writeScore } from './lib.mjs';
import { before, beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const semOpening = cite('seminowicz2011', 'Chronic pain is associated with reduced brain gray matter and impaired cognitive ability.');
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
const semAll14 = cite(
  'seminowicz2011',
  'When all 14 patients were included in a repeated-measures analysis comparing before versus after treatment, there were no significant differences in cortical thickness after correction for multiple comparisons.',
);
const semResponder = cite(
  'seminowicz2011',
  'We classified as a responder any subject who improved on either the SFMPQ or the ODI, regardless of the magnitude of the improvement',
);
const semStillThinner = cite(
  'seminowicz2011',
  'Compared with controls, patients following treatment still had thinner cortex in all the same clusters except the left DLPFC, which no longer showed a significant difference between groups',
);
const semPlacebo = cite('seminowicz2011', 'It is quite possible that a strong placebo effect, as is often seen in chronic pain');

const score = {
  id: 'help-backpain-treatment',
  title: 'Treating chronic back pain: partial recovery',
  description:
    'Long-lasting pain is linked with less grey matter in parts of the brain. This study asked whether that reverses when the pain is treated. People with chronic low back pain were scanned before and six months after spine surgery or joint injections. In those who improved, the left dorsolateral prefrontal cortex, which had been thinner than in people without pain, became thicker, and its activity during an attention task returned to normal. Other thinner areas stayed thinner. In this episode brightness stands for cortical thickness, not activity. In the first part it shows the difference from people without pain; in "What changed" it shows the change since before treatment.',
  caveat: treatmentCaveat(
    'This is one study: 18 patients and 16 people without pain were compared before treatment, and 14 patients were scanned again six months later. The thickening was significant only in the 11 who improved on pain or disability by any amount; across all 14 there was no significant change. Treatment was spine surgery or facet joint injections, so this shows pain relief in general, not one treatment, and the authors note a placebo effect may have contributed. Follow-up was six months.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption:
      'Before treatment, the left dorsolateral prefrontal cortex was thinner than in people without pain, as were areas including the insula and the anterior cingulate.',
    duringName: 'Treatment and six months',
    duringTimescale: 'months',
    duringCaption: 'Spine surgery or facet joint injections, then six months before the second scan. The brain is drawn at rest here.',
    afterCaption:
      'In the 11 people who improved, the left dorsolateral prefrontal cortex is thicker than before, and its activity during the attention task is back to normal. The more it thickened, the more pain and disability improved.',
    sameCaption:
      'All the other thinner areas, including the insula and the anterior cingulate, were still thinner than in people without pain after treatment. Across all 14 patients the change was not significant.',
    timedBy: [semDesign],
  }),
  condition: {
    regions: [
      {
        region: 'dlpfc-l',
        explanation:
          'Thinner than in people without pain before treatment. Six months after treatment it was thicker in the 11 of 14 people who improved; across all 14 the change was not significant. Its activity during an attention task, abnormal before, was normal after. Brightness stands for cortical thickness, not activity.',
        confidence: 'mixed',
        citations: [semThickness, semAll14, semResponder, semCorrelation, semFunction, semDesign, semOpening, semPlacebo],
        keyframes: beforeAfter(-0.4, 0.45),
      },
      {
        region: 'insula',
        explanation:
          'Thinner than in people without pain before treatment, and still thinner after it, in one study. The paper names the anterior insula on both sides and the left mid and posterior insula. Brightness stands for cortical thickness.',
        confidence: 'mixed',
        citations: [semStillThinner],
        keyframes: before(-0.3),
      },
      {
        region: 'dacc-r',
        explanation:
          'The right anterior cingulate was thinner than in people without pain before treatment, and still thinner after it, in one study. Drawn on the right dorsal anterior cingulate, an approximation.',
        confidence: 'mixed',
        citations: [semStillThinner],
        keyframes: before(-0.3),
      },
    ],
    connections: [],
  },
  typical: null,
};


writeScore(score, {
  indexTitle: 'Treating chronic back pain',
  category: 'treatment',
  treats: 'chronicpain',
  notes: [
    'The insula and right anterior cingulate are drawn only in "before" because they did not change ("still had thinner cortex in all the same clusters except the left DLPFC"). The left S1 and left medial temporal clusters are also in that list; not drawn, to keep the picture readable.',
    'The opening sentence of the description is supported by the paper\'s first sentence (cited as semOpening).',
    'Primary motor cortex and right anterior insula thickening correlated with improvement across people; not drawn as group changes.',
    'Read in full: Seminowicz et al. 2011.',
  ],
});
