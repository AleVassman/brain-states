// What helps: prolonged exposure therapy for PTSD.
//   node research/help-ptsd-exposure.mjs
import { cite, kf, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, inWindow, phase, treatmentCaveat } from './helps.mjs';

const helpmanRacc = cite(
  'helpman2016',
  'PTSD patients exhibited pre- to post-treatment reduction in rostral anterior cingulate cortex (rACC) activation during extinction recall, and increase in functional coherence between the rACC and the ventromedial prefrontal cortex (vmPFC) and subgenual anterior cingulate cortex (sgACC).',
);
const helpmanDesign = cite(
  'helpman2016',
  'The same procedures were repeated 10 weeks later, after PTSD patients had completed prolonged exposure treatment.',
);
const zhuChange = cite(
  'zhu2018',
  'Post- versus pre-treatment comparisons indicated increased rsFC of the BLA and CMA with the orbitofrontal cortex (OFC), and hippocampus-medial prefrontal cortex (mPFC) among patients with PTSD, but not among TEHC participants.',
);
const zhuBaseline = cite('zhu2018', 'Additionally, to test the direction of the group effect, we conducted post hoc independent t-tests which revealed reduced rsFC in BLA-OFC');
const zhuVmpfc = cite('zhu2018', 'and for hippocampus connectivity with vmPFC');
const zhuLofc = cite(
  'zhu2018',
  'Interestingly, our findings regarding amygdala-OFC pathways involved the left lateral OFC (lOFC), demonstrating robust amygdala connectivity with lOFC among TEHCs, and reduced connectivity in patients with PTSD at baseline, which increased following PE',
);
const zhuSame = cite('zhu2018', 'We previously reported functional (Helpman, Marin, et al');
const zhuNoControl = cite('zhu2018', 'Finally, we did not compare the PE group to a PTSD control group receiving a different type of treatment or in a waiting list');
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
// Dashed before treatment (less than in trauma-exposed people without PTSD), pulsing at rest after it.
const restBeforeAfter = (b, a) => kf(0, 0, 0.04, b, 0.18, b, 0.21, 0, 0.56, 0, 0.6, a, 0.8, a, 0.84, 0, 1, 0);

const score = {
  id: 'help-ptsd-exposure',
  title: 'Exposure therapy for PTSD',
  description:
    'Prolonged exposure is a trauma-focused therapy: over about ten weeks, people revisit the memory of the trauma in a safe setting and gradually face reminders they have been avoiding, so that the fear can fade. Studies scanned people before and after therapy, while recalling that a signal had become safe, and at rest. In the first part, dashed lines show links that were weaker than in trauma-exposed people without PTSD. After that, brightness and lines show the change since before treatment: warmer or a pulsing line means more than before, violet or a dashed line means less.',
  caveat: treatmentCaveat(
    'The findings come from two research groups. One group\'s two reports (16 and 24 people with PTSD) come from the same patients, compared with trauma-exposed people without PTSD but not with untreated patients. The other was a randomised trial against a waiting list, with about 50 people rescanned. Two reports measured how areas work together at rest, which is not the same as activity, and one measured activity while recalling that a signal had become safe. The rostral anterior cingulate is drawn on the pregenual cingulate, and the left frontoparietal "executive control" areas on the left dorsolateral prefrontal cortex; both are approximations.',
  ),
  durationSeconds: 38,
  phases: [
    phase('before', 'Before treatment', 'before treatment', W.before,
      'Before therapy, the amygdala was less in step with the left orbitofrontal cortex, and the hippocampus with the ventromedial prefrontal cortex, than in trauma-exposed people without PTSD.'),
    phase('during', 'Ten weeks of exposure', 'weeks', W.during,
      'About ten weekly sessions of revisiting the trauma memory and facing reminders. People were not scanned during this time.',
      { kind: 'timed', citations: [helpmanDesign] }),
    phase('recall', 'Remembering safety', 'after treatment', W.recall,
      'While recalling that a signal had become safe, the rostral anterior cingulate is less active than before therapy, and works more closely with the ventromedial prefrontal cortex and the subgenual cingulate.',
      { kind: 'timed', citations: [helpmanDesign] }),
    phase('rest', 'At rest', 'after treatment', W.rest,
      'At rest, the weaker links are back to the level of people without PTSD, and the amygdala works more closely with the insula and less closely with left frontal "control" areas. Larger decreases in amygdala-frontal links went with larger improvements.',
      { kind: 'reconstructed', rationale: 'These come from scans at rest; they are shown after the task finding only to present one measurement at a time.' }),
    phase('same', 'What stayed the same', 'summary', W.same,
      'Most of these studies did not compare therapy with untreated patients, so changes over time cannot all be credited to the therapy. These are small studies and not everyone improved.',
      SUMMARY_ORDER),
  ],
  condition: {
    regions: [
      {
        region: 'pgacc',
        explanation:
          'The rostral anterior cingulate was less active while recalling that a signal had become safe, after prolonged exposure, in one study of 16 people with PTSD. Drawn on the pregenual anterior cingulate, an approximation.',
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
        citations: [helpmanRacc],
        keyframes: inWindow(0.32, 0.56, 0.4),
      },
      {
        from: 'amygdala',
        to: 'ofc-l',
        explanation:
          'Less in step at rest than in trauma-exposed people without PTSD before therapy, and more in step after it, in one study of 24 people; the finding involved the left lateral orbitofrontal cortex.',
        confidence: 'mixed',
        citations: [zhuBaseline, zhuLofc, zhuChange, zhuSame, zhuNoControl],
        keyframes: restBeforeAfter(-0.35, 0.45),
      },
      {
        from: 'hippocampus',
        to: 'vmpfc',
        explanation:
          'Less in step at rest than in trauma-exposed people without PTSD before therapy, and more in step after it, in one study of 24 people.',
        confidence: 'mixed',
        citations: [zhuVmpfc, zhuChange],
        keyframes: restBeforeAfter(-0.35, 0.4),
      },
      {
        from: 'amygdala',
        to: 'insula',
        explanation: 'Worked together more closely at rest after therapy than in people on a waiting list, in a randomised trial.',
        confidence: 'mixed',
        citations: [fonzoChange, fonzoDesign],
        keyframes: inWindow(0.56, 0.82, 0.4),
      },
      {
        from: 'amygdala',
        to: 'dlpfc-l',
        explanation:
          'The amygdala worked together less with left frontoparietal "executive control" areas at rest after therapy, in a randomised trial; larger decreases in amygdala-frontal links went with larger improvements. Drawn to the left dorsolateral prefrontal cortex, an approximation.',
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
    'Helpman et al. 2016 and Zhu et al. 2018 report the same patients ("We previously reported ... PE-related changes in this sample").',
    'Zhu et al. 2018 Results test hippocampus connectivity with the vmPFC (the abstract says mPFC); drawn to vmpfc.',
    'Felmingham et al. 2007 could not be read (no abstract available); not used.',
    'Read in full: Zhu et al. 2018, Fonzo et al. 2021. Read as abstract only: Helpman et al. 2016.',
  ],
});
