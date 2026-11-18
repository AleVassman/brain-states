// What helps: antidepressant medication for depression.
//   node research/help-antidepressants.mjs
import { cite, writeScore } from './lib.mjs';
import { BRIGHTNESS, after, beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const shelineBefore = cite('sheline2001', 'Depressed patients had exaggerated left amygdala activation to all faces, greater for fearful faces.');
const shelineAfter = cite(
  'sheline2001',
  'Following treatment, patients had bilateral reduced amygdala activation to masked fearful faces and bilateral reduced amygdala activation to all faces.',
);
const shelineDesign = cite(
  'sheline2001',
  'We applied the masked faces paradigm to patients with major depression (n = 11) and matched control subjects (n = 11) during fMRI to compare amygdala activation in response to masked emotional faces before and after antidepressant treatment.',
);
const delaveauChange = cite(
  'delaveau2011',
  'Following the antidepressant drug treatment, the activation of dorsolateral, dorsomedial and ventrolateral prefrontal cortices was increased whereas the activation of the amygdala, hippocampus, parahippocampal region, ventral anterior cingulate cortex, orbitofrontal cortex, and insula was decreased.',
);
const delaveauDmn = cite(
  'delaveau2011',
  'Additionally, there was a decreased activation in the anterior (BA 32) and posterior cingulate cortices, as well as in the precuneus and inferior parietal lobule, which could reflect a restored deactivation of the default mode network.',
);
const delaveauSample = cite(
  'delaveau2011',
  'A quantitative Activation Likelihood Estimation (ALE) meta-analysis was performed across 9 emotional activation fMRI and PET studies (126 patients) using the Activation Likelihood Estimation technique.',
);
const saberiNone = cite('saberi2025', 'No regional convergence was found across foci of treatment-associated alterations in functional imaging.');
const saberiDlpfc = cite(
  'saberi2025',
  'Subgroup analysis in the Treated > Untreated contrast revealed a convergent cluster in the left dorsolateral prefrontal cortex, which was associated with working memory and attention behavioral domains.',
);

const saberiBoth = cite(
  'saberi2025',
  'To assess the convergence across classic antidepressants, we performed a subgroup analysis after excluding ketamine among 14 Tr+ experiments and found clusters of convergence in the left (MNI −38, 30, 30; 95 voxels) and right DLPFC (MNI 44, 26, 24; 106 voxels)',
);
const saberiMsfg = cite(
  'saberi2025',
  'performed an ALE on Tr+ effects reported after more than 4 weeks of treatment (12 experiments) which revealed a convergent cluster in the medial superior frontal gyrus (MNI 8, 54, 30; 104 voxels)',
);
const saberiResponded = cite('saberi2025', 'Second, we studied the neuroimaging effects of antidepressant medications on patients with MDD who had received but not necessarily responded to the treatment');

const score = {
  id: 'help-antidepressants',
  title: 'Antidepressants for depression',
  description: `Antidepressant medication is one of the main treatments for depression and is usually taken for weeks before it helps. Studies scanned people with depression while they looked at emotional faces or pictures, before and after treatment. After treatment, emotional areas such as the amygdala responded less, and areas at the front of the brain that help control attention responded more. ${BRIGHTNESS}`,
  caveat: treatmentCaveat(
    'The "before" difference comes from one study of 11 people with depression and 11 without. The changes come from a pooled analysis of 9 studies of emotional tasks. A larger and newer pooled analysis of 36 studies, which only counted findings from searches of the whole brain, found no area that changed consistently across all studies; in subgroups it found the dorsolateral prefrontal cortex on both sides and the medial superior frontal gyrus. That analysis mixed resting and task scans, included ketamine, and included people who had not necessarily responded. Most of the other changes drawn here are still debated. Different medicines and tasks were pooled together.',
  ),
  durationSeconds: 34,
  phases: treatmentPhases({
    beforeCaption: 'Before treatment, the left amygdala responded more than in people without depression, even to faces shown too briefly to be seen consciously.',
    duringName: 'Taking the medication',
    duringTimescale: 'weeks',
    duringCaption: 'Weeks of daily medication. The studies did not scan people during this time, so the brain is drawn at rest.',
    afterCaption:
      'Compared with before treatment, the amygdala, hippocampus and nearby areas, the insula and the orbitofrontal cortex respond less to emotional pictures, and the outer front of the brain responds more. Only the increases in the dorsolateral prefrontal cortex, and in the medial prefrontal cortex after longer treatment, were found again in subgroups of the larger, newer analysis.',
    sameCaption:
      'In the larger analysis, most areas did not change in the same way across studies. Medicines, tasks and people differed, and the studies do not show that these brain changes are what makes people feel better.',
    timedBy: [shelineDesign],
  }),
  condition: {
    regions: [
      {
        region: 'amygdala-l',
        explanation:
          'Before treatment, the left amygdala responded more than in people without depression, in one study of 11 people. After treatment it responded less, on both sides, in that study and in a pooled analysis of 9 studies. A newer pooled analysis of 36 studies did not find a consistent change here.',
        confidence: 'debated',
        citations: [shelineBefore, shelineAfter, delaveauChange, saberiNone],
        keyframes: beforeAfter(0.45, -0.45),
      },
      {
        region: 'amygdala-r',
        explanation:
          'Did not differ from people without depression before treatment, in one study, but responded less after treatment, in that study and in a pooled analysis of 9 studies. A newer pooled analysis of 36 studies did not find a consistent change here.',
        confidence: 'debated',
        citations: [shelineBefore, shelineAfter, delaveauChange, saberiNone],
        keyframes: after(-0.45),
      },
      {
        region: 'dlpfc-l',
        explanation:
          'More active after treatment, in a pooled analysis of 9 studies of emotional tasks. A newer pooled analysis of 36 studies, mostly of the brain at rest, found it in subgroups (treated versus untreated, and excluding ketamine), but not across all studies.',
        confidence: 'mixed',
        citations: [delaveauChange, saberiDlpfc, saberiBoth, saberiNone, saberiResponded],
        keyframes: after(0.5),
      },
      {
        region: 'dlpfc-r',
        explanation: 'More active after treatment in a pooled analysis of 9 studies. The newer pooled analysis found the right side too when ketamine studies were left out, but not across all studies.',
        confidence: 'mixed',
        citations: [delaveauChange, saberiBoth, saberiNone],
        keyframes: after(0.35),
      },
      {
        region: 'mpfc',
        explanation: 'The dorsomedial prefrontal cortex was more active after treatment, in a pooled analysis of 9 studies. The newer pooled analysis found the medial superior frontal gyrus only in studies with more than 4 weeks of treatment.',
        confidence: 'mixed',
        citations: [delaveauChange, saberiMsfg, saberiNone],
        keyframes: after(0.35),
      },
      {
        region: 'vlpfc',
        explanation: 'More active after treatment, in a pooled analysis of 9 studies. Not found in the newer pooled analysis.',
        confidence: 'debated',
        citations: [delaveauChange, saberiNone],
        keyframes: after(0.35),
      },
      {
        region: 'hippocampus',
        explanation: 'Less active after treatment, in a pooled analysis of 9 studies. Not found in the newer pooled analysis.',
        confidence: 'debated',
        citations: [delaveauChange, saberiNone],
        keyframes: after(-0.35),
      },
      {
        region: 'parahippocampal',
        explanation: 'Less active after treatment, in a pooled analysis of 9 studies. Not found in the newer pooled analysis.',
        confidence: 'debated',
        citations: [delaveauChange, saberiNone],
        keyframes: after(-0.35),
      },
      {
        region: 'pgacc',
        explanation:
          'The ventral anterior cingulate was less active after treatment, in a pooled analysis of 9 studies; it is drawn on the pregenual anterior cingulate, an approximation. Not found in the newer pooled analysis.',
        confidence: 'debated',
        citations: [delaveauChange, delaveauDmn, saberiNone],
        keyframes: after(-0.35),
      },
      {
        region: 'ofc',
        explanation: 'Less active after treatment, in a pooled analysis of 9 studies. Not found in the newer pooled analysis.',
        confidence: 'debated',
        citations: [delaveauChange, saberiNone],
        keyframes: after(-0.35),
      },
      {
        region: 'insula',
        explanation: 'Less active after treatment, in a pooled analysis of 9 studies. Not found in the newer pooled analysis.',
        confidence: 'debated',
        citations: [delaveauChange, saberiNone],
        keyframes: after(-0.35),
      },
      {
        region: 'pcc-precuneus',
        explanation:
          'Less active after treatment during emotional tasks, in a pooled analysis of 9 studies. The authors suggest this could reflect the default mode network switching off again during a task, as it normally does. Not found in the newer pooled analysis.',
        confidence: 'debated',
        citations: [delaveauDmn, delaveauSample, saberiNone],
        keyframes: after(-0.3),
      },
      {
        region: 'inferior-parietal',
        explanation: 'Less active after treatment during emotional tasks, in a pooled analysis of 9 studies. Not found in the newer pooled analysis.',
        confidence: 'debated',
        citations: [delaveauDmn, saberiNone],
        keyframes: after(-0.3),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Antidepressants',
  category: 'treatment',
  treats: 'depression',
  notes: [
    'The older pooled analysis (Delaveau et al. 2011, 9 studies) and the newer one (Saberi et al. 2025, 36 studies, whole-brain searches only) disagree; they agree only on the dorsolateral prefrontal cortex, and only in Saberi subgroups, so no region is marked established.',
    'Saberi et al. 2025 found network-level convergence in a frontoparietal circuit; not drawn as a region. Its subgroup findings (both DLPFC, medial SFG) are cited on those regions.',
    'Delaveau et al. 2011 list the anterior cingulate (BA 32) among decreases; drawn on the pregenual anterior cingulate together with the ventral anterior cingulate.',
    'Read in full: Saberi et al. 2025. Read as abstracts only: Sheline et al. 2001, Delaveau et al. 2011.',
  ],
});
