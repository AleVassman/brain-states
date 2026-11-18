// What helps: a single ketamine infusion for depression.
//   node research/help-ketamine.mjs
import { cite, writeScore } from './lib.mjs';
import { after, before, beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const abdBaseline = cite(
  'abdallah2017',
  'MDD group showed reduced GBCr in the prefrontal cortex (PFC) but increased GBCr in the posterior cingulate, precuneus, lingual gyrus, and cerebellum.',
);
const abdChange = cite('abdallah2017', 'Ketamine significantly increased GBCr in the PFC and reduced GBCr in the cerebellum.');
const abdDesign = cite(
  'abdallah2017',
  'MDD patients received a single infusion of ketamine and underwent repeated rs-fcMRI at 24 h posttreatment.',
);
const abdResponders = cite('abdallah2017', 'Responders to ketamine showed increased GBCr in the lateral PFC, caudate, and insula.');
const abdMeasure = cite(
  'abdallah2017',
  'Global brain connectivity with global signal regression (GBCr) values were computed as the average of correlations of each voxel with all other gray matter voxels in the brain.',
);
const abdRemaining = cite(
  'abdallah2017',
  'At baseline, 2174 voxels of altered GBCr were identified, but only 310 voxels significantly differed relative to controls following treatment (corrected α<0.05).',
);

const score = {
  id: 'help-ketamine',
  title: 'Ketamine for depression',
  description:
    'Ketamine, given as a single slow infusion under medical supervision, can lift depression within hours, unlike most treatments that take weeks. One study scanned people at rest before an infusion and again a day later. In this episode brightness stands for how strongly an area is in step with the rest of the brain (its "global connectivity"), not for activity. In the first part it shows the difference from people without depression; in "What changed" it shows the change since before the infusion.',
  caveat: treatmentCaveat(
    'All findings come from one study: people with depression who were not taking other medication received one infusion, and were scanned a day later. The study measures how much each area moves in step with the rest of the brain at rest, which is not the same as activity. The source names the prefrontal cortex without saying which part for the main finding; it is drawn on the dorsolateral prefrontal cortex, which is an assumption. How long these changes last was not measured here.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption:
      'Before the infusion, the prefrontal cortex was less in step with the rest of the brain than in people without depression, while the posterior cingulate and precuneus, part of the visual cortex and the cerebellum were more in step.',
    duringName: 'One infusion',
    duringTimescale: 'hours',
    duringCaption: 'A single infusion, then about a day before the next scan. The brain is drawn at rest here.',
    afterCaption:
      'A day later, the prefrontal cortex is more in step with the rest of the brain than before, and the cerebellum less. People who responded also showed increases in the lateral prefrontal cortex, the caudate and the insula.',
    sameCaption:
      'Many of the differences from people without depression were gone a day later, but some remained. How long the change lasts, and whether it explains the improvement, was not shown.',
    timedBy: [abdDesign],
  }),
  condition: {
    regions: [
      {
        region: 'dlpfc',
        explanation:
          'Less in step with the rest of the brain than in people without depression before the infusion, and more in step a day after it, in one study. The source names the prefrontal cortex; it is drawn on the dorsolateral prefrontal cortex, which is an assumption. Responders showed the increase in the lateral prefrontal cortex. Brightness stands for global connectivity, not activity.',
        confidence: 'mixed',
        citations: [abdBaseline, abdChange, abdResponders, abdMeasure],
        keyframes: beforeAfter(-0.4, 0.45),
      },
      {
        region: 'cerebellum-mid',
        explanation:
          'More in step with the rest of the brain than in people without depression before the infusion, and less a day after it, in one study. Brightness stands for global connectivity, not activity.',
        confidence: 'mixed',
        citations: [abdBaseline, abdChange],
        keyframes: beforeAfter(0.35, -0.4),
      },
      {
        region: 'pcc-precuneus',
        explanation:
          'More in step with the rest of the brain than in people without depression before the infusion, in one study. The source does not report a change here after the infusion.',
        confidence: 'mixed',
        citations: [abdBaseline],
        keyframes: before(0.35),
      },
      {
        region: 'visual-cortex',
        explanation:
          'The lingual gyrus, part of the visual cortex, was more in step with the rest of the brain than in people without depression before the infusion, in one study. The source does not report a change here after the infusion.',
        confidence: 'mixed',
        citations: [abdBaseline],
        keyframes: before(0.3),
      },
      {
        region: 'caudate',
        explanation: 'More in step with the rest of the brain after the infusion in the people who responded, in one study.',
        confidence: 'mixed',
        citations: [abdResponders],
        keyframes: after(0.3),
      },
      {
        region: 'insula',
        explanation: 'More in step with the rest of the brain after the infusion in the people who responded, in one study.',
        confidence: 'mixed',
        citations: [abdResponders],
        keyframes: after(0.3),
      },
    ],
    connections: [],
  },
  typical: null,
};

void abdRemaining;

writeScore(score, {
  indexTitle: 'Ketamine',
  category: 'treatment',
  treats: 'depression',
  notes: [
    'Brightness is global brain connectivity, not activity; said in the description and on each region.',
    'Caudate and insula increases were reported in responders only, not the whole group; the explanations say so.',
    'Abdallah et al. 2017 report that 2174 voxels differed from controls before and 310 after; summarised in the last caption.',
    'Read in full: Abdallah et al. 2017.',
  ],
});
