// What helps: cognitive behavioural therapy (CBT) for panic disorder.
//   node research/help-cbt-panic.mjs
import { cite, writeScore } from './lib.mjs';
import { BRIGHTNESS, after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const kircherIfg = cite(
  'kircher2013',
  'After CBT, patients compared to control subjects revealed reduced activation for the conditioned response (CS+ > CS-) in the left inferior frontal gyrus (IFG).',
);
const kircherSymptoms = cite('kircher2013', 'This activation reduction was correlated with reduction in agoraphobic symptoms from t1 to t2.');
const kircherConnectivity = cite(
  'kircher2013',
  'Patients compared to control subjects also demonstrated increased connectivity between the IFG and regions of the "fear network" (amygdalae, insulae, anterior cingulate cortex) across time.',
);
const kircherDesign = cite(
  'kircher2013',
  'In a randomized, controlled, multicenter clinical trial in medication-free patients with PD/A who were treated with 12 sessions of manualized CBT, functional magnetic resonance imaging (fMRI) was used during fear conditioning before and after CBT.',
);
const kircherSample = cite('kircher2013', 'Quality-controlled fMRI data from 42 patients and 42 healthy subjects were obtained.');

const score = {
  id: 'help-cbt-panic',
  title: 'Talking therapy (CBT) for panic',
  description: `Cognitive behavioural therapy (CBT) for panic disorder helps people understand panic sensations and gradually face the situations they avoid. One trial scanned people with panic disorder and agoraphobia before and after 12 sessions, during a fear-learning task, in which a neutral signal comes to predict something unpleasant. After therapy, a frontal area responded less, and it worked more closely with the brain's fear network. ${BRIGHTNESS}`,
  caveat: treatmentCaveat(
    'All findings come from one trial of 42 people with panic disorder and agoraphobia who were not taking medication, compared with 42 people without the condition scanned at the same times. The task was a fear-learning task, not a panic attack. The study names the anterior cingulate without saying which part; it is drawn on the dorsal part, which is an assumption. The changes are compared with people without panic disorder scanned at the same times, not with untreated patients, so they cannot be credited to CBT alone. The abstract read does not report a pre-treatment difference, so the first part is drawn at rest.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before therapy. The abstract read does not report how these brains differed beforehand, so the brain is drawn at rest.',
    duringName: '12 sessions of CBT',
    duringTimescale: 'weeks',
    duringCaption: 'Twelve sessions of structured therapy, including facing feared sensations and situations. People were not scanned during this time.',
    afterCaption:
      'After therapy, the left inferior frontal gyrus responds less to the warning signal, and the more it dropped, the more agoraphobia improved. It also works more closely with the amygdala, the insula and the anterior cingulate.',
    sameCaption: 'This is one trial, using a fear-learning task rather than real panic. It does not show what happens during a panic attack after therapy.',
    timedBy: [kircherDesign],
  }),
  condition: {
    regions: [
      {
        region: 'vlpfc-l',
        explanation:
          'The left inferior frontal gyrus responded less to a learned warning signal after CBT, compared with people without panic disorder scanned at the same times, in one trial of 42 patients. The drop went with fewer agoraphobia symptoms.',
        confidence: 'mixed',
        citations: [kircherIfg, kircherSymptoms, kircherSample],
        keyframes: after(-0.45),
      },
    ],
    connections: [
      {
        from: 'vlpfc-l',
        to: 'amygdala',
        explanation: 'Worked together more closely after CBT than before, compared with people without panic disorder, in one trial.',
        confidence: 'mixed',
        citations: [kircherConnectivity],
        keyframes: after(0.45),
      },
      {
        from: 'vlpfc-l',
        to: 'insula',
        explanation: 'Worked together more closely after CBT than before, compared with people without panic disorder, in one trial.',
        confidence: 'mixed',
        citations: [kircherConnectivity],
        keyframes: after(0.4),
      },
      {
        from: 'vlpfc-l',
        to: 'dacc',
        explanation:
          'Worked together more closely after CBT than before, compared with people without panic disorder, in one trial. The source says anterior cingulate; it is drawn to the dorsal anterior cingulate, which is an assumption.',
        confidence: 'mixed',
        citations: [kircherConnectivity],
        keyframes: after(0.4),
      },
    ],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Talking therapy (CBT) for panic',
  category: 'treatment',
  treats: 'panic',
  notes: [
    'Changes are group-by-time effects: patients compared with healthy people scanned at the same two times.',
    'Read as abstract only: Kircher et al. 2013.',
  ],
});
