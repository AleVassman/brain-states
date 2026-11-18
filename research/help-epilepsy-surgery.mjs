// What helps: epilepsy surgery for temporal lobe epilepsy.
//   node research/help-epilepsy-surgery.mjs
import { cite, writeScore } from './lib.mjs';
import { beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const gonIncrease = cite(
  'gonzalez2020',
  'TLE patients who achieved long-term postoperative seizure freedom (10 of 15) demonstrated increases in functional connectivity between ARAS structures and fronto-parietal-insular neocortex compared to preoperative baseline',
);
const gonResemble = cite('gonzalez2020', 'with postoperative connectivity patterns resembling controls’ connectivity.');
const gonPrevious = cite(
  'gonzalez2020',
  'As previous work demonstrated functional connectivity decreases between ARAS and fronto-parietal-insular neocortex in TLE',
);
const gonPresent = cite('gonzalez2020', 'ARAS functional connectivity disturbances are present in TLE but may recover after successful epilepsy surgery.');
const gonNoVta = cite('gonzalez2020', 'Postoperative connectivity increases were observed for PPN and CSC, whereas no increase was observed for VTA');
const gonCortex = cite(
  'gonzalez2020',
  'inferior frontal gyrus pars opercularis and pars triangularis, precentral gyrus, postcentral gyrus, superior parietal lobule, and insula',
);
const gonSmall = cite('gonzalez2020', 'Examination of patients with continued postoperative seizures was limited by sample size (n = 5)');
const gonPreliminary = cite(
  'gonzalez2020',
  'This work must be considered a preliminary analysis of postoperative ARAS connectivity changes because of the small sample size and heterogeneous patient population',
);
const gonDesign = cite('gonzalez2020', 'We evaluated 15 adult TLE patients before and after');
const gonTwoThirds = cite('gonzalez2020', 'In TLE, surgery leads to seizure freedom in approximately two thirds of patients.');

const MAP =
  'The arousal centres that changed are two small nuclei in the upper brainstem, drawn as the brainstem outline. The cortex areas are mapped approximately: the inferior frontal gyrus to the ventrolateral prefrontal cortex, the precentral gyrus to the motor cortex, the postcentral gyrus to the sensory cortex. The superior parietal lobule is not in the brain model.';

const score = {
  id: 'help-epilepsy-surgery',
  title: 'Epilepsy surgery for temporal lobe seizures',
  description:
    'When temporal lobe seizures cannot be controlled with medicine, surgery to remove or destroy the area where they start (including by laser) can stop them; about two thirds of people become seizure-free. One study scanned people before and, on average, about three years after surgery. In those who became seizure-free, two of the brainstem\'s arousal centres, which keep the brain awake and alert, became more in step with the cortex, looking more like people without epilepsy. Lines show how closely areas work together: in the first part compared with people without epilepsy (dashed means less); in "What changed" compared with before surgery (pulsing means more).',
  caveat: treatmentCaveat(
    `All findings come from one study of 15 people with temporal lobe epilepsy, 10 of whom became seizure-free, and 15 people without epilepsy; the authors call it a preliminary analysis. In the 5 who still had seizures no change was detected, but that group was very small. The weaker connections before surgery rest mainly on this group's earlier work. A third arousal centre, the ventral tegmental area, did not change. ${MAP}`,
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before surgery, the brainstem arousal centres are less in step with the cortex than in people without epilepsy, as this group found in earlier work.',
    duringName: 'Surgery and recovery',
    duringTimescale: 'years',
    duringCaption: 'Surgery, then at least a year, about three on average, before the second scan. The brain is drawn at rest here.',
    afterCaption:
      'In people who became seizure-free, the arousal centres are more in step with frontal, parietal and insular cortex than before surgery, and look more like people without epilepsy.',
    sameCaption:
      'In the 5 people who still had seizures, no change was detected, though the group was very small. Structural (wiring) connections did not change. The ventral tegmental area did not change.',
    timedBy: [gonDesign],
  }),
  condition: {
    regions: [],
    connections: [
      {
        from: 'brainstem-mid',
        to: 'insula',
        explanation: `Less in step than in people without epilepsy before surgery (from earlier work), and more in step after surgery in people who became seizure-free, in one study.`,
        confidence: 'mixed',
        citations: [gonPrevious, gonPresent, gonIncrease, gonResemble, gonCortex, gonSmall, gonPreliminary, gonTwoThirds],
        keyframes: beforeAfter(-0.35, 0.45),
      },
      {
        from: 'brainstem-mid',
        to: 'vlpfc',
        explanation: `Inferior frontal gyrus: less in step before surgery, more in step after it in people who became seizure-free. Drawn on the ventrolateral prefrontal cortex, an approximation.`,
        confidence: 'mixed',
        citations: [gonPrevious, gonIncrease, gonCortex],
        keyframes: beforeAfter(-0.35, 0.4),
      },
      {
        from: 'brainstem-mid',
        to: 'motor-cortex',
        explanation: `Precentral gyrus: less in step before surgery, more in step after it in people who became seizure-free. Drawn on the motor cortex, an approximation.`,
        confidence: 'mixed',
        citations: [gonPrevious, gonIncrease, gonCortex],
        keyframes: beforeAfter(-0.3, 0.35),
      },
      {
        from: 'brainstem-mid',
        to: 'somatosensory',
        explanation: `Postcentral gyrus: less in step before surgery, more in step after it in people who became seizure-free. Drawn on the sensory cortex, an approximation.`,
        confidence: 'mixed',
        citations: [gonPrevious, gonIncrease, gonCortex, gonNoVta],
        keyframes: beforeAfter(-0.3, 0.35),
      },
    ],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Epilepsy surgery',
  category: 'treatment',
  treats: 'seizure',
  notes: [
    'No line is drawn from the ventral tegmental area: "no increase was observed for VTA".',
    'The follow-up interval is given as a mean of 3.4 years in the abstract and 33.6 months in the methods; the text says "about three years".',
    'Read in full: González et al. 2020.',
  ],
});
