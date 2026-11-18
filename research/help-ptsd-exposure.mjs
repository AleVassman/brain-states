// What helps: prolonged exposure therapy for PTSD.
//   node research/help-ptsd-exposure.mjs
import { cite, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, inWindow, phase, treatmentCaveat } from './helps.mjs';

const helpmanRacc = cite(
  'helpman2016',
  'PTSD patients exhibited pre- to post-treatment reduction in rostral anterior cingulate cortex (rACC) activation during extinction recall, and increase in functional coherence between the rACC and the ventromedial prefrontal cortex (vmPFC) and subgenual anterior cingulate cortex (sgACC).',
);
const helpmanSymptoms = cite(
  'helpman2016',
  'Reduced PTSD symptom severity from pre- to post-treatment was significantly associated with reduced subgenual ACC and parahippocampal activation during this task.',
);
const helpmanDesign = cite(
  'helpman2016',
  'The same procedures were repeated 10 weeks later, after PTSD patients had completed prolonged exposure treatment.',
);
const zhuChange = cite(
  'zhu2018',
  'Post- versus pre-treatment comparisons indicated increased rsFC of the BLA and CMA with the orbitofrontal cortex (OFC), and hippocampus-medial prefrontal cortex (mPFC) among patients with PTSD, but not among TEHC participants.',
);
const fonzoChange = cite(
  'fonzo2021',
  'The amygdala and insula displayed widespread patterns of primarily subregion-uniform intrinsic connectivity change, including increased connectivity between amygdala and insula; increased connectivity of both regions with the ventral prefrontal cortex, frontopolar, and sensory cortices; and decreased connectivity of both regions with left fronto-parietal nodes of the executive control network.',
);
const fonzoSymptoms = cite(
  'fonzo2021',
  'Larger decreases in amygdala-frontal connectivity and insula-parietal connectivity were associated with larger PTSD symptom reductions.',
);
const fonzoDesign = cite(
  'fonzo2021',
  'Individuals (N=66) with a primary PTSD diagnosis participated in a randomized clinical trial of prolonged exposure therapy (N=36) vs. treatment waiting list (N=30).',
);

const W = { before: [0, 0.2], during: [0.2, 0.32], recall: [0.32, 0.56], rest: [0.56, 0.82], same: [0.82, 1] };

const score = {
  id: 'help-ptsd-exposure',
  title: 'Exposure therapy for PTSD',
  description:
    'Prolonged exposure is a trauma-focused therapy: over about ten weeks, people revisit the memory of the trauma in a safe setting and gradually face reminders they have been avoiding, so that the fear can fade. Studies scanned people before and after therapy, while recalling that a signal had become safe, and at rest. Brightness and lines show the change since before treatment: warmer or a pulsing line means more than before, violet or a dashed line means less than before.',
  caveat: treatmentCaveat(
    'The findings come from three studies by two groups, with 16 to 66 people with PTSD; one compared therapy with a waiting list. Two measured how areas work together at rest, which is not the same as activity, and one measured activity while recalling that a signal had become safe. The left frontoparietal "executive control" areas are drawn on the left dorsolateral prefrontal cortex, which is an assumption. The sources read do not report how the brain differed before treatment, so the first part is drawn at rest.',
  ),
  durationSeconds: 38,
  phases: [
    phase('before', 'Before treatment', 'before treatment', W.before,
      'Before therapy. The comparison here starts from each person\'s own level, so the brain is drawn at rest.'),
    phase('during', 'Ten weeks of exposure', 'weeks', W.during,
      'About ten weekly sessions of revisiting the trauma memory and facing reminders. People were not scanned during this time.',
      { kind: 'timed', citations: [helpmanDesign] }),
    phase('recall', 'Remembering safety', 'after treatment', W.recall,
      'While recalling that a signal had become safe, the rostral anterior cingulate is less active than before therapy, and works more closely with the ventromedial prefrontal cortex and the subgenual cingulate.',
      { kind: 'timed', citations: [helpmanDesign] }),
    phase('rest', 'At rest', 'after treatment', W.rest,
      'At rest, the amygdala works more closely with the orbitofrontal cortex and the insula, the hippocampus with the medial prefrontal cortex, and the amygdala less closely with left frontal "control" areas. Larger decreases in some of these links went with larger improvements.',
      { kind: 'reconstructed', rationale: 'These come from separate studies scanned at rest. They are shown after the task finding only to show one measurement at a time.' }),
    phase('same', 'What stayed the same', 'summary', W.same,
      'In one study, the body\'s sweat response during recall did not change on average after therapy, though changes in it went with improvement. These are small studies and not everyone improved.',
      SUMMARY_ORDER),
  ],
  condition: {
    regions: [
      {
        region: 'pgacc',
        explanation:
          'The rostral anterior cingulate was less active while recalling that a signal had become safe, after prolonged exposure, in one study of 16 people with PTSD. It is drawn on the pregenual anterior cingulate.',
        confidence: 'mixed',
        citations: [helpmanRacc, helpmanDesign],
        keyframes: inWindow(0.32, 0.56, -0.45),
      },
    ],
    connections: [
      {
        from: 'pgacc',
        to: 'vmpfc',
        explanation: 'Worked together more closely during recall of safety after therapy, in one study.',
        confidence: 'mixed',
        citations: [helpmanRacc],
        keyframes: inWindow(0.32, 0.56, 0.45),
      },
      {
        from: 'pgacc',
        to: 'sgacc',
        explanation: 'Worked together more closely during recall of safety after therapy, in one study.',
        confidence: 'mixed',
        citations: [helpmanRacc, helpmanSymptoms],
        keyframes: inWindow(0.32, 0.56, 0.4),
      },
      {
        from: 'amygdala',
        to: 'ofc',
        explanation: 'Worked together more closely at rest after therapy, in one study; this did not happen in people without PTSD scanned twice.',
        confidence: 'mixed',
        citations: [zhuChange],
        keyframes: inWindow(0.56, 0.82, 0.45),
      },
      {
        from: 'hippocampus',
        to: 'mpfc',
        explanation: 'Worked together more closely at rest after therapy, in one study.',
        confidence: 'mixed',
        citations: [zhuChange],
        keyframes: inWindow(0.56, 0.82, 0.4),
      },
      {
        from: 'amygdala',
        to: 'insula',
        explanation: 'Worked together more closely at rest after therapy than in people on a waiting list, in one trial of 66 people.',
        confidence: 'mixed',
        citations: [fonzoChange, fonzoDesign],
        keyframes: inWindow(0.56, 0.82, 0.4),
      },
      {
        from: 'amygdala',
        to: 'dlpfc-l',
        explanation:
          'The amygdala worked together less with left frontoparietal "executive control" areas at rest after therapy, in one trial; larger decreases in amygdala-frontal links went with larger improvements. Drawn to the left dorsolateral prefrontal cortex, which is an assumption.',
        confidence: 'mixed',
        citations: [fonzoChange, fonzoSymptoms, fonzoDesign],
        keyframes: inWindow(0.56, 0.82, -0.4),
      },
    ],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Exposure therapy for PTSD',
  category: 'treatment',
  treats: 'ptsd',
  notes: [
    'Felmingham et al. 2007 (changes in anterior cingulate and amygdala after CBT for PTSD) was looked up but has no abstract available to read; not used.',
    'Fonzo et al. 2021 also report increased links with the ventral prefrontal, frontopolar and sensory cortices; only the amygdala-insula and amygdala-left frontal links are drawn, to keep the picture readable.',
    'Helpman et al. 2016: reduced subgenual ACC and parahippocampal activation went with symptom reduction (a relationship across people); described, not drawn as a group change.',
    'Read in full: Zhu et al. 2018, Fonzo et al. 2021. Read as abstract only: Helpman et al. 2016.',
  ],
});
