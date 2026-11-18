// What helps: constraint-induced movement therapy after stroke.
//   node research/help-cimt.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const gauIncrease = cite(
  'gauthier2008',
  'There were profuse increases in gray matter in sensory and motor areas both contralateral and ipsilateral to the affected arm that were bilaterally symmetrical, as well as bilaterally in the hippocampus.',
);
const gauComparison = cite('gauthier2008', 'In contrast, the comparison therapy group failed to show gray matter increases.');
const gauCorrelation = cite(
  'gauthier2008',
  'Importantly, the magnitude of the observed gray matter increases was significantly correlated with amount of improvement in real-world arm use.',
);
const gauDesign = cite(
  'gauthier2008',
  'Chronic stroke patients were randomly assigned to receive either constraint-induced movement therapy (n=16) or a comparison therapy (n=20).',
);
const gauAreas = cite(
  'gauthier2008',
  'The large clusters of voxels showing gray matter increases in sensory and motor areas were bilaterally symmetrical and, when cross-referenced with standard brain atlases, encompassed the hand/arm regions of primary sensory and motor cortices as well as the anterior supplementary motor area and portions of the premotor area.',
);
const tangMeta = cite(
  'tang2015',
  'This meta-analysis suggests that along with good motor recovery of stroke patients, the IHAB is up-regulated in SMC and PMC, but not significantly changed in SMA and CB.',
);

const score = {
  id: 'help-cimt',
  title: 'Rehabilitation after stroke: constraint-induced therapy',
  description:
    'Constraint-induced movement therapy is an intensive rehabilitation method for an arm weakened by stroke: the stronger arm is restrained for much of the day, so the weaker one has to be used, with hours of practice. In a randomised trial of people months or years after a stroke, those who had this therapy used their weaker arm much more in daily life, and grey matter increased in the hand and arm areas for movement and sensation on both sides of the brain, and in the hippocampus. In this episode brightness stands for grey matter volume, not activity, and shows the change since before therapy.',
  caveat: treatmentCaveat(
    'The findings come from one randomised trial: 16 people received constraint-induced therapy and 20 a comparison therapy, which showed no grey matter increases. The people had had their stroke months or years earlier. The grey matter increases covered the hand and arm regions of the motor and sensory cortex, the front of the supplementary motor area and part of the premotor area; the whole motor and sensory strips are drawn, which is larger than the areas that changed. A pooled analysis of 22 studies of recovery after stroke found that activity during movement shifts back towards the damaged side as people recover; that is a different measure, described but not drawn, because the damaged side differs between people.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before therapy, months or years after the stroke. The comparison here starts from each person\'s own level, so the brain is drawn at rest.',
    duringName: 'Intensive therapy',
    duringTimescale: 'weeks',
    duringCaption: 'Intensive daily practice with the weaker arm while the stronger one is restrained. People were not scanned during this time.',
    afterCaption:
      'After therapy, grey matter is greater than before in movement and sensation areas on both sides of the brain, and in the hippocampus on both sides. The more grey matter increased, the more people used their weaker arm in daily life.',
    sameCaption:
      'People who received the comparison therapy showed no grey matter increases. The stroke damage itself does not go away; the change is in the surrounding brain.',
    timedBy: [gauDesign],
  }),
  condition: {
    regions: [
      {
        region: 'motor-cortex',
        explanation:
          'Grey matter increased in motor areas on both sides after constraint-induced therapy, in a randomised trial; the comparison therapy showed no increase. Brightness stands for volume, not activity.',
        confidence: 'mixed',
        citations: [gauIncrease, gauAreas, gauComparison, gauCorrelation, gauDesign],
        keyframes: after(0.5),
      },
      {
        region: 'somatosensory',
        explanation: 'Grey matter increased in sensory areas on both sides after constraint-induced therapy, in a randomised trial.',
        confidence: 'mixed',
        citations: [gauIncrease, gauAreas, gauComparison],
        keyframes: after(0.45),
      },
      {
        region: 'sma',
        explanation: 'Grey matter increased in the front part of the supplementary motor area after constraint-induced therapy, in a randomised trial.',
        confidence: 'mixed',
        citations: [gauAreas, gauComparison],
        keyframes: after(0.35),
      },
      {
        region: 'hippocampus',
        explanation: 'Grey matter increased in the hippocampus on both sides after constraint-induced therapy, in a randomised trial.',
        confidence: 'mixed',
        citations: [gauIncrease, gauComparison],
        keyframes: after(0.35),
      },
    ],
    connections: [],
  },
  typical: null,
};

void tangMeta;

writeScore(score, {
  indexTitle: 'Rehabilitation after stroke',
  category: 'treatment',
  treats: 'stroke',
  notes: [
    'Tang et al. 2015 (meta-analysis, 22 trials) describe activity shifting towards the damaged hemisphere in sensorimotor and premotor cortex with good recovery; not drawn because the side of damage varies, mentioned in the caveat.',
    'Read in full: Gauthier et al. 2008. Read as abstract only: Tang et al. 2015.',
  ],
});
