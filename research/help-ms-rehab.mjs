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
    'Many people with multiple sclerosis have problems with attention and concentration. Cognitive rehabilitation trains these skills with structured exercises. In one small randomised trial, people who did intensive computer-based attention training improved on an attention test, and the back of the cerebellum and an area at the top of the parietal lobe became more active during an attention task. In this episode brightness shows the change since before training, compared with people who did a placebo programme.',
  caveat: treatmentCaveat(
    'All findings come from one trial of 23 people with multiple sclerosis and attention problems: 12 did the training and 11 a placebo programme. The superior parietal lobule is not a separate area in the brain model and is not drawn. The training does not change the multiple sclerosis itself. The first part is drawn at rest because the comparison starts from each person\'s own level.',
  ),
  durationSeconds: 30,
  phases: treatmentPhases({
    beforeCaption: 'Before training. The comparison here starts from each person\'s own level, so the brain is drawn at rest.',
    duringName: 'Attention training',
    duringTimescale: 'weeks',
    duringCaption: 'Intensive computer-based attention exercises. People were not scanned during this time.',
    afterCaption:
      'After training, attention improved compared with the placebo group, and the back of the cerebellum, along with the superior parietal lobule, was more active during an attention task.',
    sameCaption: 'Only some aspects of attention improved. This is one small trial, and the damage caused by multiple sclerosis is not changed by training.',
    timedBy: [cerDesign],
  }),
  condition: {
    regions: [
      {
        region: 'cerebellum-mid',
        explanation:
          'The posterior cerebellar lobule was more active during an attention task after intensive attention training than after a placebo programme, in one trial of 23 people with multiple sclerosis.',
        confidence: 'mixed',
        citations: [cerResult, cerDesign],
        keyframes: after(0.45),
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
    'The superior parietal lobule is not a region in the brain model; the inferior parietal cortex was not used as a stand-in because they are different areas.',
    'Read as abstract only: Cerasa et al. 2013.',
  ],
});
