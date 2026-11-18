// What helps: dialectical behaviour therapy (DBT) for borderline personality disorder.
//   node research/help-dbt.mjs
import { cite, writeScore } from './lib.mjs';
import { BRIGHTNESS, after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const goodmanChange = cite(
  'goodman2014',
  'fMRI results showed the predicted Group × Time interaction: compared with HCs, BPD patients exhibited decreased amygdala activation with treatment.',
);
const goodmanLeft = cite(
  'goodman2014',
  'This post-treatment amygdala reduction in BPD was observed for all three pictures types, but particularly marked in the left hemisphere and during repeated-emotional pictures.',
);
const goodmanDesign = cite(
  'goodman2014',
  'Event-related fMRI was obtained pre- and post-12-months of standard-DBT in unmedicated BPD patients.',
);
const goodmanRegulation = cite(
  'goodman2014',
  'Improved amygdala habituation to repeated-unpleasant pictures in patients was associated with improved overall emotional regulation measured by the DERS (total score and emotion regulation strategy use subscale).',
);
const iskricSummary = cite(
  'iskric2021',
  'Results indicated that there was significant deactivation of amygdala activity as well as the anterior cingulate cortex in patients with BPD after DBT treatment.',
);
const iskricIfg = cite(
  'iskric2021',
  'As well, several studies found after DBT treatment, BPD patients had a decreased activity in the inferior frontal gyrus in response to arousing stimuli and increased activity in response to inhibitory control.',
);
const iskricFew = cite('iskric2021', 'Nine studies were identified that examined neurobiological changes in BPD after the completion of DBT.');
const niedtfeldPain = cite(
  'niedtfeld2017',
  'At first measurement, patients with BPD showed amygdala deactivation in response to painful stimulation, as well as altered connectivity between left amygdala and dorsal anterior cingulate cortex. These effects were reduced after DBT, as compared with patients with treatment as usual.',
);

const score = {
  id: 'help-dbt',
  title: 'Dialectical behaviour therapy (DBT) for borderline',
  description: `Dialectical behaviour therapy (DBT) is a therapy designed for borderline personality disorder. Over many months it teaches skills for handling intense emotions, tolerating distress and getting on with other people. After DBT, the amygdala, which flags emotional events, responds less to upsetting pictures, and people report handling their emotions better. ${BRIGHTNESS}`,
  caveat: treatmentCaveat(
    'The main finding comes from one study of 11 people with borderline personality disorder and 11 without, before and after 12 months of DBT, and a review of the 9 studies that have looked at the brain after DBT. These are small studies, and the review notes that research on this is still scarce. The review names the anterior cingulate without saying which part; it is drawn on the dorsal part, which is an assumption. How the brain differed from people without the condition before treatment is not drawn, because the sources read report it only as background.',
  ),
  durationSeconds: 34,
  phases: treatmentPhases({
    beforeCaption: 'Before therapy. The comparison here starts from each person\'s own level, so the brain is drawn at rest.',
    duringName: 'A year of DBT',
    duringTimescale: 'months',
    duringCaption: 'Weekly individual therapy and skills groups, usually for about a year. People were not scanned during this time.',
    afterCaption:
      'After DBT, the amygdala responds less to emotional pictures than before, most clearly on the left and to pictures seen a second time. A review of studies also describes less activity in the anterior cingulate. People who settled faster to repeated upsetting pictures reported handling their emotions better.',
    sameCaption:
      'Only a few small studies have looked at the brain after DBT. The inferior frontal gyrus responded less to arousing pictures but more during tasks that need self-control, so it is not drawn as one change.',
    timedBy: [goodmanDesign],
  }),
  condition: {
    regions: [
      {
        region: 'amygdala-l',
        explanation:
          'Less active after 12 months of DBT, compared with the change over the same time in people without the condition, in one study of 11 patients; the reduction was most marked on the left. A review of 9 studies also describes reduced amygdala activity after DBT.',
        confidence: 'mixed',
        citations: [goodmanChange, goodmanLeft, goodmanRegulation, iskricSummary],
        keyframes: after(-0.55),
      },
      {
        region: 'amygdala-r',
        explanation: 'Less active after DBT, in one study of 11 patients and in a review of 9 studies; less marked than on the left.',
        confidence: 'mixed',
        citations: [goodmanChange, goodmanLeft, iskricSummary],
        keyframes: after(-0.35),
      },
      {
        region: 'dacc',
        explanation:
          'A review of 9 studies describes less anterior cingulate activity after DBT. The review does not say which part; it is drawn on the dorsal anterior cingulate, which is an assumption. One study found that a link between the left amygdala and the dorsal anterior cingulate during pain became weaker after DBT.',
        confidence: 'mixed',
        citations: [iskricSummary, iskricFew, niedtfeldPain],
        keyframes: after(-0.35),
      },
    ],
    connections: [],
  },
  typical: null,
};

void iskricIfg;

writeScore(score, {
  indexTitle: 'DBT for borderline',
  category: 'treatment',
  treats: 'borderline',
  notes: [
    'Niedtfeld et al. 2017 found pain-related amygdala deactivation and altered amygdala-dACC connectivity in BPD that were reduced after DBT; the direction of the connectivity difference is not given in the abstract, so no line is drawn.',
    'The inferior frontal gyrus changes in opposite directions depending on the task (Iskric & Barkley-Levenson 2021), so it is described in the last caption, not drawn.',
    'Read in full: Goodman et al. 2014, Iskric & Barkley-Levenson 2021, Niedtfeld et al. 2017.',
  ],
});
