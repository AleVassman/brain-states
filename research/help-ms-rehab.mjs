// What helps: computer-based attention training (cognitive rehabilitation) in multiple sclerosis.
//   node research/help-ms-rehab.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const cerResult = cite(
  'cerasa2013',
  'After CR, the experimental group, in comparison with the control group, showed a specific enhanced performance in attention abilities as assessed by the Stroop task with an effect size of 0.88, which was associated with increased activity in the posterior cerebellar lobule and in the superior parietal lobule.',
);
const cerDesign = cite(
  'cerasa2013',
  'Using a double-blind randomized controlled study, we enrolled 12 MS patients, who underwent a CR program (experimental group), and 11 age-gender-matched MS patients, who underwent a placebo intervention (control group).',
);

const score = {
  id: 'help-ms-rehab',
  title: 'Attention training in multiple sclerosis',
  description:
    'Many people with multiple sclerosis have problems with attention and concentration. Cognitive rehabilitation trains these skills with structured exercises. In one small randomised trial, people who did intensive computer-based attention training did better on an attention test than people who did a placebo programme, and this went with more activity at the back of the cerebellum and at the top of the parietal lobe. In this episode brightness shows more activity after training compared with the placebo group.',
  caveat: treatmentCaveat(
    'All findings come from one trial of 23 people with multiple sclerosis and attention problems: 12 did the training and 11 a placebo programme. Only the abstract could be read; it compares the groups after training and does not say whether the brain was scanned before training as well, nor whether the activity was a group difference or a link with how much attention improved. The posterior cerebellar lobule is drawn on the cerebellum outline, an approximation, and the superior parietal lobule is not in the brain model. Lesions were not measured in this study.',
  ),
  durationSeconds: 30,
  phases: treatmentPhases({
    beforeCaption: 'Before training. The source does not describe the brain before training, so it is drawn at rest.',
    duringName: 'Attention training',
    duringTimescale: 'weeks',
    duringCaption: 'Intensive computer-based attention exercises, or a placebo programme. People were not scanned during this time.',
    afterCaption:
      'After training, attention was better than in the placebo group, and this went with more activity at the back of the cerebellum and in the superior parietal lobule during an attention task.',
    sameCaption: 'Only some aspects of attention improved. This is one small trial, read from its abstract only.',
    timedBy: [cerDesign],
  }),
  condition: {
    regions: [
      {
        region: 'cerebellum-mid',
        explanation:
          'The posterior cerebellar lobule was more active during an attention task after intensive attention training, compared with a placebo programme, in one trial of 23 people with multiple sclerosis. The abstract does not make clear whether this is a group difference or a link with how much attention improved. Drawn on the cerebellum outline, an approximation.',
        confidence: 'mixed',
        citations: [cerResult, cerDesign],
        keyframes: after(0.4),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Attention training in MS',
  category: 'treatment',
  treats: 'ms',
  notes: [
    'The abstract does not state that fMRI was done before training; the phase order is timed only by randomisation, and the caveat says the design is unclear from the abstract.',
    'Read as abstract only: Cerasa et al. 2013.',
  ],
});
