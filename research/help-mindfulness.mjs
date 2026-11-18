// What helps: mindfulness training for stress.
//   node research/help-mindfulness.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const kralPositive = cite(
  'kral2018',
  'Meditation training was associated with less amygdala reactivity to positive pictures relative to controls, but there were no group differences in response to negative pictures.',
);
const kralVmpfc = cite(
  'kral2018',
  'Short-term training, compared to the control intervention, also led to increased functional connectivity between the amygdala and a region implicated in emotion regulation - ventromedial prefrontal cortex (VMPFC) - during affective pictures.',
);
const kralDesign = cite(
  'kral2018',
  'Short-term training consisted of an 8-week Mindfulness-Based Stress Reduction course (N=32, 22 female), which was compared to an active control condition (N=35, 19 female) in a randomized controlled trial.',
);
const tarenSgacc = cite(
  'taren2015',
  'Consistent with this prediction, a flexible factorial random effects analysis showed that a 3-day intensive mindfulness meditation training program reduced right amygdala-sgACC (MNI: 0, 18, −12) rsFC, compared with relaxation training without a mindfulness component (time × treatment interaction P < 0.05, k = 28, corrected for multiple comparisons) (Table 3, Figure 3).',
);
const tarenLeft = cite(
  'taren2015',
  'A parallel flexible factorial random effects analysis also tested for training related changes in left amygdala-ACC rsFC, but there were no significant differential decreases in left amygdala-ACC rsFC pre-post training (no significant time × treatment interaction).',
);
const tarenStress = cite(
  'taren2015',
  'We show in an initial discovery study that higher perceived stress over the past month is associated with greater bilateral amygdala-subgenual anterior cingulate cortex (sgACC) rsFC in a sample of community adults (n = 130).',
);
const kralRight = cite('kral2018', 'since the group differences in amygdala reactivity were limited to the right side');
const gotinkCount = cite('gotink2016', '21 fMRI studies and seven MRI studies were included (two studies performed both).');
const gotinkSummary = cite(
  'gotink2016',
  'Additionally, the amygdala showed decreased functional activity, improved functional connectivity with the prefrontal cortex, and earlier deactivation after exposure to emotional stimuli.',
);
const gotinkOthers = cite(
  'gotink2016',
  'The prefrontal cortex, the cingulate cortex, the insula and the hippocampus showed increased activity, connectivity and volume in stressed, anxious and healthy participants.',
);

const score = {
  id: 'help-mindfulness',
  title: 'Mindfulness training for stress',
  description:
    'Mindfulness training, such as the 8-week Mindfulness-Based Stress Reduction course, teaches people to pay attention to the present moment without judging it, through meditation and gentle movement. Trials compared it with other training of the same length. Afterwards, the right amygdala reacted less to positive pictures and worked more closely with an area at the front of the brain involved in regulating emotion. Brightness and lines show the change since before training: violet means less than before, a pulsing line means working together more, a dashed line less.',
  caveat: treatmentCaveat(
    'The findings come from two randomised trials, one of an 8-week course in healthy, non-clinical adults and one of a 3-day intensive course in stressed unemployed adults, and a review of 26 brain-imaging studies. The amygdala reacted less to positive pictures, but not to negative ones, after the 8-week course. The review reports increases in "activity, connectivity and volume" in several areas together, without separating them, so those are described, not drawn. These are not studies of an illness: it is linked to Acute stress, but the trials studied everyday or ongoing stress, not acute stress. The first part is drawn at rest.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before training. The comparison here starts from each person\'s own level, so the brain is drawn at rest.',
    duringName: 'Mindfulness training',
    duringTimescale: 'days to weeks',
    duringCaption: 'An 8-week course in one trial, a 3-day intensive retreat in the other. People were not scanned during this time.',
    afterCaption:
      'After training, the right amygdala reacts less to positive pictures and works more closely with the ventromedial prefrontal cortex, which helps regulate emotion. After a 3-day course, the right amygdala works less closely with the subgenual cingulate at rest, a link that is stronger in people under more stress.',
    sameCaption:
      'After the 8-week course, reactions to negative pictures did not change; the authors suggest that may need more practice. The left amygdala\'s links did not change after the 3-day course.',
    timedBy: [kralDesign, tarenSgacc],
  }),
  condition: {
    regions: [
      {
        region: 'amygdala-r',
        explanation:
          'The right amygdala reacted less to positive pictures after an 8-week mindfulness course than after a control course, in one trial; no difference for negative pictures. A review of mindfulness studies also describes decreased amygdala activity.',
        confidence: 'mixed',
        citations: [kralPositive, kralRight, kralDesign, gotinkSummary, gotinkCount, gotinkOthers],
        keyframes: after(-0.35),
      },
    ],
    connections: [
      {
        from: 'amygdala-r',
        to: 'vmpfc',
        explanation: 'The right amygdala worked together more closely while viewing emotional pictures after an 8-week mindfulness course than after a control course, in one trial.',
        confidence: 'mixed',
        citations: [kralVmpfc, kralRight, gotinkSummary],
        keyframes: after(0.45),
      },
      {
        from: 'amygdala-r',
        to: 'sgacc',
        explanation:
          'The right amygdala worked together less with the subgenual anterior cingulate at rest after a 3-day intensive mindfulness course than after relaxation training, in one trial of stressed adults. No change was found on the left.',
        confidence: 'mixed',
        citations: [tarenSgacc, tarenLeft, tarenStress],
        keyframes: after(-0.4),
      },
    ],
  },
  typical: null,
};


writeScore(score, {
  indexTitle: 'Mindfulness training',
  category: 'treatment',
  treats: 'stress',
  notes: [
    'Listed as a treatment for "Acute stress", although the trials studied stress in daily life, not acute stress in a scanner; the caveat says these are not studies of an illness.',
    'Gotink et al. 2016 report increases in "activity, connectivity and volume" of the prefrontal cortex, cingulate, insula and hippocampus without separating them; not drawn.',
    'Taren et al. 2015 also report that higher perceived stress goes with greater amygdala-sgACC connectivity across 130 adults (a relationship across people); described in the caption.',
    'Read in full: Taren et al. 2015, Kral et al. 2018. Read as abstract only: Gotink et al. 2016.',
  ],
});
