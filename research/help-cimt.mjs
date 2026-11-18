// What helps: constraint-induced movement therapy after stroke.
//   node research/help-cimt.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const gauIncrease = cite(
  'gauthier2008',
  'There were profuse increases in gray matter in sensory and motor areas both contralateral and ipsilateral to the affected arm that were bilaterally symmetrical, as well as bilaterally in the hippocampus.',
);
const gauAreas = cite(
  'gauthier2008',
  'The large clusters of voxels showing gray matter increases in sensory and motor areas were bilaterally symmetrical and, when cross-referenced with standard brain atlases, encompassed the hand/arm regions of primary sensory and motor cortices as well as the anterior supplementary motor area and portions of the premotor area.',
);
const gauComparison = cite('gauthier2008', 'In contrast, the comparison therapy group failed to show gray matter increases.');
const gauBetween = cite(
  'gauthier2008',
  'showed that the increase in gray matter from pretreatment to posttreatment differed significantly between groups for the ipsilateral sensorimotor cluster (P=0.041) and the hippocampus (P=0.006) and was marginally significant for the contralateral cluster (P=0.087)',
);
const gauCorrelation = cite(
  'gauthier2008',
  'Importantly, the magnitude of the observed gray matter increases was significantly correlated with amount of improvement in real-world arm use.',
);
const gauDesign = cite(
  'gauthier2008',
  'Longitudinal voxel-based morphometry was performed on structural MRI scans obtained immediately before and after patients received therapy.',
);
const gauGroups = cite(
  'gauthier2008',
  'Chronic stroke patients were randomly assigned to receive either constraint-induced movement therapy (n=16) or a comparison therapy (n=20).',
);
const gauTransfer = cite(
  'gauthier2008',
  'whereas others received a comparison therapy that had all the components of CI therapy except for the transfer package',
);
const gauDose = cite('gauthier2008', 'received intensive in-laboratory training of the more impaired arm on functional tasks for 3 hours daily for 10 consecutive weekdays');
const gauExcluded = cite(
  'gauthier2008',
  'Eleven subjects had relatively large infarctions (49±35 cm ) in the sensory and motor cortices contralateral to their motor deficit and were thus excluded',
);
const gauRetained = cite('gauthier2008', 'Furthermore, it still remains to be determined whether these structural changes are retained over time');
const gauBothImproved = cite('gauthier2008', 'although the comparison group also made a clinically significant improvement on the MAL');

const score = {
  id: 'help-cimt',
  title: 'Rehabilitation after stroke: constraint-induced therapy',
  description:
    'Constraint-induced movement therapy is an intensive rehabilitation method for an arm weakened by stroke: hours of daily practice with the weaker arm while the stronger one is restrained, plus a "transfer package" of techniques to carry the use of the weaker arm into daily life. In a randomised trial of people months or years after a stroke, those who had the full therapy used their weaker arm much more in daily life, and grey matter increased in the hand and arm areas for movement and sensation on both sides of the brain, and in the hippocampus. In this episode brightness stands for grey matter, not activity, and shows the change since before therapy.',
  caveat: treatmentCaveat(
    'The findings come from one randomised trial: 16 people received the full therapy and 20 the same therapy without the transfer package; the comparison group also improved, but showed no grey matter increases. The difference between groups was clear on one side and in the hippocampus, and only marginal on the other side. Eleven people with large strokes in the movement areas were left out of the movement-area analysis. The increases covered the hand and arm regions, the front of the supplementary motor area and part of the premotor area; the whole motor and sensory strips are drawn, which is larger than the areas that changed. Whether the changes last was not known.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before therapy, months or years after the stroke. The comparison here starts from each person\'s own level, so the brain is drawn at rest.',
    duringName: 'Intensive therapy',
    duringTimescale: 'two weeks',
    duringCaption: 'Three hours a day of practice with the weaker arm on ten weekdays, the stronger arm restrained, and the transfer package. People were not scanned during this time.',
    afterCaption:
      'After therapy, grey matter is greater than before in movement and sensation areas on both sides of the brain, and in the hippocampus on both sides. The more grey matter increased, the more people used their weaker arm in daily life.',
    sameCaption:
      'People who received the same therapy without the transfer package also improved, but showed no grey matter increases. Whether these changes last was not yet known.',
    timedBy: [gauDesign],
  }),
  condition: {
    regions: [
      {
        region: 'motor-cortex',
        explanation:
          'Grey matter increased in the hand and arm area of the motor cortex on both sides after the full therapy, in a randomised trial. Compared with the group without the transfer package, the difference was significant on one side and marginal on the other. Brightness stands for grey matter, not activity.',
        confidence: 'mixed',
        citations: [gauIncrease, gauAreas, gauComparison, gauBetween, gauCorrelation, gauExcluded, gauGroups, gauTransfer, gauDose, gauRetained, gauBothImproved],
        keyframes: after(0.5),
      },
      {
        region: 'somatosensory',
        explanation: 'Grey matter increased in the hand and arm area of the sensory cortex on both sides after the full therapy, in a randomised trial.',
        confidence: 'mixed',
        citations: [gauIncrease, gauAreas, gauBetween],
        keyframes: after(0.45),
      },
      {
        region: 'sma',
        explanation: 'Grey matter increased in the front part of the supplementary motor area after the full therapy, in a randomised trial.',
        confidence: 'mixed',
        citations: [gauAreas, gauComparison],
        keyframes: after(0.35),
      },
      {
        region: 'hippocampus',
        explanation: 'Grey matter increased in the hippocampus on both sides after the full therapy, significantly more than in the comparison group, in a randomised trial.',
        confidence: 'mixed',
        citations: [gauIncrease, gauBetween],
        keyframes: after(0.35),
      },
    ],
    connections: [],
  },
  typical: null,
};


writeScore(score, {
  indexTitle: 'Rehabilitation after stroke',
  category: 'treatment',
  treats: 'stroke',
  notes: [
    'The comparison group received "all the components of CI therapy except for the transfer package"; the description and caveat say so.',
    'Tang et al. 2015 (meta-analysis, 22 trials) describe activity shifting towards the damaged hemisphere with good recovery; not drawn because the side of damage varies.',
    'Read in full: Gauthier et al. 2008.',
  ],
});
