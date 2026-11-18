// What helps: cognitive behavioural therapy (CBT) for depression.
//   node research/help-cbt-depression.mjs
import { cite, writeScore } from './lib.mjs';
import { BRIGHTNESS, after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const renRest = cite(
  'ren2025',
  'Our results show that in the resting state, patients with depression treated with CBT resulted in increased activation of the right and left ventral anterior cingulate cortex (vACC), left parahippocampal gyrus (PG), right subgyral, left inferior temporal gyrus (ITG), and right inferior occipital gyrus (IOG)',
);
const renTask = cite(
  'ren2025',
  'For depressive disorders, no consistent activation patterns emerged in the task state, likely due to limited studies or heterogeneity in task paradigms across included studies.',
);
const renSample = cite('ren2025', 'A total of 22 articles, encompassing 443 patients, were included in the meta-analysis.');
const koenigFindings = cite(
  'koenig2025',
  'The findings reveal (1) diminished limbic reactivity following CBT across various tasks, (2) increased striatal activity during reward processing, but decreased activity during affective processing and future thinking, and (3) alterations in cingulate and prefrontal cortex activity across tasks.',
);
const koenigHeterogeneous = cite(
  'koenig2025',
  'There are heterogenous results especially in cortical areas that might partially be due to methodological issues like differences across the studies in terms of task content, statistical evaluation, and interventions.',
);
const koenigDesign = cite(
  'koenig2025',
  'Out of 2149 results of the literature search, N = 14 studies met the inclusion criteria (e.g., diagnosis of a current depressive disorder, assessment of longitudinal task-based fMRI, and the analysis of functional changes before and after CBT).',
);

const score = {
  id: 'help-cbt-depression',
  title: 'Talking therapy (CBT) for depression',
  description: `Cognitive behavioural therapy (CBT) is a talking therapy that helps people notice and change patterns of thinking and behaviour that keep depression going. Studies scanned people with depression before and after a course of CBT. At rest, the front of the cingulate cortex, which helps regulate emotion, was more active after therapy. ${BRIGHTNESS}`,
  caveat: treatmentCaveat(
    'The resting-state changes come from a pooled analysis of 22 studies of CBT for depression and anxiety; for depression during tasks, it found no consistent pattern. A review of 14 task studies describes calmer emotional areas after CBT, but with mixed results across studies, so those are described, not drawn. The sources read do not report how the brain differed before treatment, so the first part is drawn at rest.',
  ),
  durationSeconds: 34,
  phases: treatmentPhases({
    beforeCaption: 'Before therapy. The sources read do not describe how these brains differed from people without depression, so the brain is drawn at rest and the comparison starts from each person\'s own level.',
    duringName: 'A course of therapy',
    duringTimescale: 'weeks to months',
    duringCaption: 'Weekly sessions over several weeks or months. People were not scanned during this time, so the brain is drawn at rest.',
    afterCaption:
      'At rest, the ventral anterior cingulate on both sides was more active than before therapy, along with the left parahippocampal gyrus, the left inferior temporal gyrus and part of the right visual cortex. During tasks, a review describes calmer emotional areas, but results differ between studies.',
    sameCaption: 'During tasks, the pooled analysis found no consistent pattern of change in depression. Studies used different tasks and different forms of CBT.',
    timedBy: [koenigDesign],
  }),
  condition: {
    regions: [
      {
        region: 'pgacc',
        explanation:
          'The ventral anterior cingulate, on both sides, was more active at rest after CBT for depression, in a pooled analysis. It is drawn on the pregenual anterior cingulate. The authors see it as shared by CBT for depression and for anxiety, and linked to emotion regulation.',
        confidence: 'mixed',
        citations: [renRest, renSample],
        keyframes: after(0.5),
      },
      {
        region: 'parahippocampal-l',
        explanation: 'More active at rest after CBT for depression, in a pooled analysis.',
        confidence: 'mixed',
        citations: [renRest],
        keyframes: after(0.4),
      },
      {
        region: 'lateral-temporal-l',
        explanation: 'The left inferior temporal gyrus was more active at rest after CBT for depression, in a pooled analysis. It lies at the lower edge of the lateral temporal cortex, which is drawn.',
        confidence: 'mixed',
        citations: [renRest],
        keyframes: after(0.35),
      },
      {
        region: 'visual-cortex-r',
        explanation: 'The right inferior occipital gyrus was more active at rest after CBT for depression, in a pooled analysis. It is part of the visual cortex, which is drawn.',
        confidence: 'mixed',
        citations: [renRest],
        keyframes: after(0.3),
      },
    ],
    connections: [],
  },
  typical: null,
};

void renTask;
void koenigFindings;
void koenigHeterogeneous;

writeScore(score, {
  indexTitle: 'Talking therapy (CBT) for depression',
  category: 'treatment',
  treats: 'depression',
  notes: [
    'König et al. 2025 (review, abstract) report "diminished limbic reactivity" and "increased striatal activity during reward processing" without naming regions consistently; described in captions, not drawn.',
    'Ren et al. 2025 also report a "right subgyral" cluster, which is not a named region in the brain model; not drawn.',
    'No source read reports a pre-treatment difference from healthy people, so the "before" phase is at rest.',
    'Read as abstracts only: Ren et al. 2025, König et al. 2025.',
  ],
});
