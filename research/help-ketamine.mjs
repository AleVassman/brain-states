// What helps: a single ketamine infusion for depression.
//   node research/help-ketamine.mjs
import { cite, kf, writeScore } from './lib.mjs';
import { before, beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const abdBaseline = cite(
  'abdallah2017',
  'MDD group showed reduced GBCr in the prefrontal cortex (PFC) but increased GBCr in the posterior cingulate, precuneus, lingual gyrus, and cerebellum.',
);
const abdPaired = cite(
  'abdallah2017',
  'Examining the changes in GBCr over the treatment period, a paired t-test revealed significant increases in the right lateral PFC and reductions in the left cerebellum',
);
const abdChange = cite('abdallah2017', 'Ketamine significantly increased GBCr in the PFC and reduced GBCr in the cerebellum.');
const abdNormalized = cite(
  'abdallah2017',
  'High GBCr values in preketamine MDD compared with HC were found in the posterior cingulate, precuneus, and occipital cortices; all of which normalized following treatment',
);
const abdDesign = cite(
  'abdallah2017',
  'MDD patients received a single infusion of ketamine and underwent repeated rs-fcMRI at 24 h posttreatment.',
);
const abdResponders = cite('abdallah2017', 'Responders showed higher delta GBCr values in the right lateral PFC and the left anterior insula');
const abdMeasure = cite(
  'abdallah2017',
  'Global brain connectivity with global signal regression (GBCr) values were computed as the average of correlations of each voxel with all other gray matter voxels in the brain.',
);
const abdCriteria = cite(
  'abdallah2017',
  'MDD patients had to have failures of two adequate antidepressant trials as determined by a standardized questionnaire, be antidepressants/antipsychotics-free for at least 1 week prior to imaging',
);
const abdResidual = cite('abdallah2017', 'Also, given the short medication-free period, we cannot rule out the presence of residual effects from prior antidepressant use on GBCr');

const score = {
  id: 'help-ketamine',
  title: 'Ketamine for depression',
  description:
    'Ketamine, given as a single slow infusion under medical supervision, can lift depression quickly, unlike most treatments that take weeks; in this study, about half the people had responded a day later. People with depression were scanned at rest before an infusion and again a day later. In this episode brightness stands for how strongly an area is in step with the rest of the brain (its "global connectivity"), not for activity. In the first part it shows the difference from people without depression; in "What changed" it shows the change since before the infusion.',
  caveat: treatmentCaveat(
    'All findings come from one study of 18 people with depression that had not improved with two earlier antidepressants, and 25 people without depression. There was no placebo infusion. People had stopped antidepressants for only a week, so earlier medication may still have had effects. The study measures how much each area moves in step with the rest of the brain at rest, which is not the same as activity. "Lateral prefrontal cortex" is drawn on the dorsolateral prefrontal cortex, an approximation. Differences between responders and non-responders were small, preliminary comparisons.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption:
      'Before the infusion, the prefrontal cortex was less in step with the rest of the brain than in people without depression, while the posterior cingulate and precuneus, part of the visual cortex and the cerebellum were more in step.',
    duringName: 'One infusion',
    duringTimescale: 'hours',
    duringCaption: 'A single infusion, then about a day before the next scan. The brain is drawn at rest here.',
    afterCaption:
      'A day later, the right lateral prefrontal cortex is more in step with the rest of the brain than before, and the left cerebellum less. Compared with people who did not respond, responders showed larger increases in the right lateral prefrontal cortex and the left anterior insula.',
    sameCaption:
      'A day later, the posterior cingulate, precuneus and visual areas no longer differed from people without depression, though they did not change significantly. How long the change lasts, and whether it explains the improvement, was not shown.',
    timedBy: [abdDesign],
  }),
  condition: {
    regions: [
      {
        region: 'dlpfc-r',
        explanation:
          'The prefrontal cortex was less in step with the rest of the brain than in people without depression before the infusion; a day after it, the right lateral prefrontal cortex was more in step, in one study. Drawn on the right dorsolateral prefrontal cortex, an approximation. Brightness stands for global connectivity, not activity.',
        confidence: 'mixed',
        citations: [abdBaseline, abdPaired, abdChange, abdResponders, abdMeasure],
        keyframes: beforeAfter(-0.4, 0.45),
      },
      {
        region: 'dlpfc-l',
        explanation: 'Part of the prefrontal cortex that was less in step with the rest of the brain than in people without depression before the infusion, in one study; no significant change on the left was reported.',
        confidence: 'mixed',
        citations: [abdBaseline],
        keyframes: before(-0.4),
      },
      {
        region: 'cerebellum-mid',
        explanation:
          'More in step with the rest of the brain than in people without depression before the infusion, and less a day after it (on the left), in one study. Brightness stands for global connectivity, not activity.',
        confidence: 'mixed',
        citations: [abdBaseline, abdPaired],
        keyframes: beforeAfter(0.35, -0.4),
      },
      {
        region: 'pcc-precuneus',
        explanation:
          'More in step with the rest of the brain than in people without depression before the infusion, and no longer different a day later, though the before-after test showed no significant change here, in one study.',
        confidence: 'mixed',
        citations: [abdBaseline, abdNormalized],
        keyframes: before(0.35),
      },
      {
        region: 'visual-cortex',
        explanation:
          'The lingual gyrus, part of the visual cortex, was more in step with the rest of the brain than in people without depression before the infusion, and no longer different a day later, though it did not change significantly, in one study.',
        confidence: 'mixed',
        citations: [abdBaseline, abdNormalized],
        keyframes: before(0.3),
      },
      {
        region: 'insula-l',
        explanation:
          'The left anterior insula became more in step with the rest of the brain in people who responded than in people who did not, in a small, preliminary comparison in one study.',
        confidence: 'mixed',
        citations: [abdResponders, abdCriteria, abdResidual],
        keyframes: kf(0, 0, 0.4, 0, 0.48, 0.3, 0.8, 0.3, 0.85, 0, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Ketamine',
  category: 'treatment',
  treats: 'depression',
  notes: [
    'Brightness is global brain connectivity, not activity.',
    'The within-person change is right lateral PFC up and left cerebellum down (paired test); the left DLPFC is drawn only before.',
    'The insula is a responder-versus-non-responder difference, said in its explanation; the caudate finding (post-treatment responders vs non-responders) is not drawn.',
    'Read in full: Abdallah et al. 2017.',
  ],
});
