// Low blood sugar: what the brain does when blood glucose falls.
//   node research/hypoglycemia.mjs
import { cite, kf, writeScore } from './lib.mjs';

const tevesActivation = cite(
  'teves2004',
  'Analysis of regional CBF differences identified neuronal activation during hypoglycemia in bilateral MPFC (areas 24 and 32) and bilateral thalamus.',
);
const tevesGlobal = cite('teves2004', 'Quantitative CBF fell 6-8% in the cerebrum, brainstem, and cerebellum.');
const tevesAutonomic = cite(
  'teves2004',
  'Autonomic responses during hypoglycemia were manifested by increases in neurogenic symptoms, heart rate, and plasma levels of epinephrine, norepinephrine, and pancreatic polypeptide.',
);
const tevesSample = cite(
  'teves2004',
  'We measured regional cerebral blood flow (CBF) four times each during euglycemia (5.2 +/- 0.2 mmol/liter) and hypoglycemia (3.0 +/- 0.3 mmol/liter) in nine normal human volunteers.',
);
const hwangHealthy = cite(
  'hwang2018',
  'Mild hypoglycemia in HC subjects altered activity in the caudate, insula, prefrontal cortex, and angular gyrus',
);
const hwangUnaware = cite(
  'hwang2018',
  'Most strikingly, in direct contrast to HC and T1DM-Aware subjects, T1DM-Unaware subjects failed to show any hypoglycemia-induced changes in brain activity.',
);
const hwangBlunted = cite(
  'hwang2018',
  'In T1DM, and in particular T1DM-Unaware patients, there is a progressive blunting of brain responses in cortico-striatal and fronto-parietal neurocircuits in response to mild-moderate hypoglycemia.',
);

const score = {
  id: 'hypoglycemia',
  title: 'Low blood sugar: the brain notices',
  description:
    'Low blood sugar, or hypoglycaemia, is most common in people treating diabetes with insulin. When blood sugar falls, the body sounds an alarm: a faster heart, sweating, shakiness, hunger. The episode follows what the brain does as blood sugar falls in healthy volunteers, and describes how this response can fade in some people with type 1 diabetes, which makes low blood sugar harder to notice.',
  caveat:
    'The blood-flow finding comes from one study of nine healthy volunteers whose blood sugar was lowered under careful medical control; another study of healthy volunteers found changes in more areas but, in the abstract read, without saying in which direction. Blood flow is used as a stand-in for activity. Overall blood flow to the brain fell slightly during low blood sugar while the areas drawn became relatively more active. These are mild, controlled episodes in a research setting.',
  durationSeconds: 32,
  phases: [
    {
      id: 'falling',
      name: 'Blood sugar falls',
      timescale: 'minutes',
      start: 0,
      end: 0.2,
      caption: 'Blood sugar drops below its usual level, here under careful control in a research setting.',
    },
    {
      id: 'alarm',
      name: 'The body\'s alarm',
      timescale: 'minutes',
      start: 0.2,
      end: 0.65,
      caption:
        'The body responds: heart rate and stress hormones rise. In the brain, the anterior cingulate and the thalamus on both sides become more active, while overall blood flow to the brain falls slightly.',
      order: { kind: 'reconstructed', rationale: 'Blood flow was measured during steady low and normal blood sugar, not as it fell. Placing the alarm after the fall is how the procedure was done.' },
    },
    {
      id: 'diabetes',
      name: 'When the alarm fades',
      timescale: 'with repeated low blood sugar',
      start: 0.65,
      end: 0.9,
      caption:
        'In some people with type 1 diabetes who no longer notice low blood sugar, the brain shows no response at all, and the body\'s warning signs are weaker. This is described, not drawn: the brain stays as in the healthy response above.',
      order: { kind: 'reconstructed', rationale: 'This comes from a separate group of people with diabetes, compared at one time point.' },
    },
    {
      id: 'restored',
      name: 'Blood sugar restored',
      timescale: 'minutes',
      start: 0.9,
      end: 1,
      caption: 'Blood sugar returns to normal and the brain settles. The return was not measured in the sources read; this last part is an assumption.',
      order: { kind: 'reconstructed', rationale: 'No source read measured the brain as blood sugar recovered. The return to rest is assumed.' },
    },
  ],
  condition: {
    regions: [
      {
        region: 'dacc',
        explanation:
          'More active during low blood sugar, on both sides, in one study of nine healthy volunteers. The study calls this area the medial prefrontal cortex and identifies it as Brodmann areas 24 and 32, which make up the anterior cingulate, drawn here. Blood flow is used as a stand-in for activity.',
        confidence: 'mixed',
        citations: [tevesActivation, tevesSample, tevesGlobal],
        keyframes: kf(0, 0, 0.2, 0, 0.35, 0.55, 0.9, 0.55, 1, 0),
      },
      {
        region: 'thalamus',
        explanation:
          'More active during low blood sugar, on both sides, in one study of nine healthy volunteers. Blood flow is used as a stand-in for activity.',
        confidence: 'mixed',
        citations: [tevesActivation, tevesSample],
        keyframes: kf(0, 0, 0.2, 0, 0.35, 0.45, 0.9, 0.45, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void tevesAutonomic;
void hwangHealthy;
void hwangUnaware;
void hwangBlunted;

writeScore(score, {
  indexTitle: 'Low blood sugar',
  category: 'physical',
  notes: [
    'Hwang et al. 2018 (abstract) report that mild low blood sugar "altered activity in the caudate, insula, prefrontal cortex, and angular gyrus" in healthy people, without a direction in the abstract, so those areas are not drawn.',
    'People with type 1 diabetes who no longer notice low blood sugar "failed to show any hypoglycemia-induced changes in brain activity" (Hwang et al. 2018). Described in a caption; not drawn as a separate brain, because the healthy response it is compared with has no direction for those areas in the abstract.',
    'Overall blood flow fell 6-8% (Teves et al. 2004); the regions drawn rose relative to the rest of the brain.',
    'Listed as "Low blood sugar" rather than "Diabetes": the brain findings are about a low-blood-sugar episode, not about diabetes in general.',
    'Read as abstracts only: all sources.',
  ],
});
