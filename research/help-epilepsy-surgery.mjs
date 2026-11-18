// What helps: epilepsy surgery for temporal lobe epilepsy.
//   node research/help-epilepsy-surgery.mjs
import { cite, writeScore } from './lib.mjs';
import { beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const gonIncrease = cite(
  'gonzalez2020',
  'TLE patients who achieved long-term postoperative seizure freedom (10 of 15) demonstrated increases in functional connectivity between ARAS structures and fronto-parietal-insular neocortex compared to preoperative baseline',
);
const gonResemble = cite('gonzalez2020', 'with postoperative connectivity patterns resembling controls’ connectivity.');
const gonPresent = cite('gonzalez2020', 'ARAS functional connectivity disturbances are present in TLE but may recover after successful epilepsy surgery.');
const gonPersistent = cite('gonzalez2020', 'No functional connectivity changes were detected in 5 patients with persistent seizures after surgery');
const gonDesign = cite('gonzalez2020', 'We evaluated 15 adult TLE patients before and after');
const gonTwoThirds = cite('gonzalez2020', 'In TLE, surgery leads to seizure freedom in approximately two thirds of patients.');

const ARAS =
  'The arousal centres studied are small nuclei in the upper brainstem and the ventral tegmental area; they are drawn as the brainstem outline, and "frontal" neocortex is drawn on the dorsolateral prefrontal cortex, which are approximations.';

const score = {
  id: 'help-epilepsy-surgery',
  title: 'Epilepsy surgery for temporal lobe seizures',
  description:
    'When temporal lobe seizures cannot be controlled with medicine, surgery to remove or disconnect the area where they start can stop them; about two thirds of people become seizure-free. One study scanned people before and, on average, more than three years after surgery. In those who became seizure-free, the brainstem\'s arousal centres, which keep the brain awake and alert, became more in step again with the cortex. Lines show how closely areas work together: in the first part compared with people without epilepsy (dashed means less); in "What changed" compared with before surgery (pulsing means more).',
  caveat: treatmentCaveat(
    `All findings come from one study of 15 people with temporal lobe epilepsy, 10 of whom became seizure-free after surgery, and 15 people without epilepsy. In the 5 who still had seizures, nothing changed. The surgery itself, removing part of the temporal lobe, is not drawn. ${ARAS}`,
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before surgery, the brainstem arousal centres are less in step with the cortex than in people without epilepsy.',
    duringName: 'Surgery and recovery',
    duringTimescale: 'years',
    duringCaption: 'Surgery, then at least a year (on average more than three) before the second scan. The brain is drawn at rest here.',
    afterCaption:
      'In people who became seizure-free, the arousal centres are more in step with frontal, parietal and insular cortex than before surgery, and look more like people without epilepsy.',
    sameCaption:
      'In people who still had seizures after surgery, these connections did not change. Structural (wiring) connections did not change either.',
    timedBy: [gonDesign],
  }),
  condition: {
    regions: [],
    connections: [
      {
        from: 'brainstem-mid',
        to: 'insula',
        explanation: `Less in step than in people without epilepsy before surgery; more in step after surgery in people who became seizure-free, in one study. ${ARAS}`,
        confidence: 'mixed',
        citations: [gonPresent, gonIncrease, gonResemble, gonPersistent],
        keyframes: beforeAfter(-0.35, 0.45),
      },
      {
        from: 'brainstem-mid',
        to: 'inferior-parietal',
        explanation: 'Parietal cortex: less in step before surgery, more in step after surgery in people who became seizure-free, in one study. Drawn on the inferior parietal cortex.',
        confidence: 'mixed',
        citations: [gonPresent, gonIncrease, gonResemble],
        keyframes: beforeAfter(-0.35, 0.4),
      },
      {
        from: 'brainstem-mid',
        to: 'dlpfc',
        explanation: 'Frontal cortex: less in step before surgery, more in step after surgery in people who became seizure-free, in one study. Drawn on the dorsolateral prefrontal cortex, an approximation.',
        confidence: 'mixed',
        citations: [gonPresent, gonIncrease, gonResemble],
        keyframes: beforeAfter(-0.35, 0.4),
      },
      {
        from: 'vta',
        to: 'insula',
        explanation: 'The ventral tegmental area is one of the arousal centres studied; it became more in step with the cortex after surgery in people who became seizure-free, in one study.',
        confidence: 'mixed',
        citations: [gonIncrease, gonPersistent],
        keyframes: beforeAfter(-0.3, 0.35),
      },
    ],
  },
  typical: null,
};

void gonTwoThirds;

writeScore(score, {
  indexTitle: 'Epilepsy surgery',
  category: 'treatment',
  treats: 'seizure',
  notes: [
    'The "before" difference from controls is supported by the paper\'s own conclusion that "ARAS functional connectivity disturbances are present in TLE"; levels are illustrative.',
    'The vta-insula line is one of several possible ARAS-to-cortex lines; the paper reports ARAS structures together with fronto-parietal-insular neocortex.',
    'Read in full: González et al. 2020.',
  ],
});
