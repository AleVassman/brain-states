// Alzheimer's disease: stages over years, not an episode over minutes.
//   node research/alzheimers.mjs
import { cite, kf, writeScore } from './lib.mjs';

const schroeterEarly = cite(
  'schroeter2009',
  "The meta-analysis reveals that early Alzheimer's disease affects structurally the (trans-)entorhinal and hippocampal regions, functionally the inferior parietal lobules and precuneus.",
);
const schroeterLate = cite(
  'schroeter2009',
  "Fully developed Alzheimer's disease involved additionally a frontomedian-thalamic network.",
);
const schroeterUnspecific = cite(
  'schroeter2009',
  'changes in the posterior cingulate cortex and precuneus are unspecific',
);
const minoshimaPcc = cite(
  'minoshima1997',
  "marked metabolic reduction (21-22%) in the posterior cingulate cortex and cinguloparietal transitional area in patients with very early Alzheimer's disease",
);
const bucknerPosterior = cite(
  'buckner2005',
  'At early stages of AD progression, prominent atrophy and metabolic abnormalities emerged in these posterior cortical regions; atrophy in medial temporal regions was also observed.',
);
const bucknerAmyloid = cite(
  'buckner2005',
  'These regions were active in default states in young adults and also showed amyloid deposition in older adults with AD.',
);
const dickersonMci = cite(
  'dickerson2005',
  'Significantly greater hippocampal activation was present in the MCI group compared to controls',
);
const dickersonAd = cite(
  'dickerson2005',
  'the AD group showed hippocampal and entorhinal hypoactivation and atrophy in comparison to controls',
);
const dickersonHypothesis = cite(
  'dickerson2005',
  'The authors hypothesize that there is a phase of increased medial temporal lobe activation early in the course of prodromal Alzheimer disease followed by a subsequent decrease as the disease progresses.',
);
const jackOrder = cite(
  'jack2013',
  'the two major proteinopathies underlying AD biomarker changes, amyloid β (Aβ) and tau, might be initiated independently in sporadic AD',
);
const badhwarNetworks = cite(
  'badhwar2017',
  'Consistent alterations in connectivity were found in the default mode, salience, and limbic networks in patients with AD dementia, mild cognitive impairment, or in both groups.',
);

const score = {
  id: 'alzheimers',
  title: "Alzheimer's disease: stages over years",
  description:
    "Unlike the other states, this is not an episode that comes and goes. Alzheimer's disease changes the brain slowly, over many years, and the timeline here is in stages of the disease, not minutes. It shows where the brain's activity, measured as its use of energy and its blood flow, falls first and where the fall spreads. It does not show the build-up of the two proteins, amyloid and tau, that defines the disease, nor the loss of brain tissue; those are described in the text.",
  caveat:
    "The stages are built by comparing groups of people at different points in the disease, not by following individuals for decades, so the progression from one stage to the next is inferred. People differ in how the disease starts and how fast it moves. The brightness here stands for activity, as energy use or blood flow, while the disease is also a matter of protein build-up and of tissue loss that the brain model does not draw. How far activity falls at each stage is not given in the sources read, apart from one figure of about a fifth in the posterior cingulate in very early disease; the levels drawn are illustrative, and they are held steady through the later stages instead of being shown falling further. The early rise in hippocampus activity comes from one small study and its authors offer it as a hypothesis. How and when the two proteins begin to build up is itself described by researchers as a hypothetical model.",
  durationSeconds: 44,
  phases: [
    {
      id: 'silent',
      name: 'Before symptoms',
      timescale: 'years',
      start: 0,
      end: 0.2,
      caption:
        'For years there is nothing to notice. Two proteins, amyloid and tau, are building up; researchers think the two may start independently. In people with the disease, amyloid is found in regions at the back of the brain that are busy whenever the mind is at rest. Activity is drawn unchanged here, because the sources read do not describe it at this stage.',
    },
    {
      id: 'mci',
      name: 'Mild cognitive impairment',
      timescale: 'years',
      start: 0.2,
      end: 0.48,
      caption:
        'A stage called mild cognitive impairment, marked by difficulty forming new memories. At the back of the brain, the posterior cingulate uses noticeably less energy. In one small study the hippocampus was working harder than usual during learning, which its authors suggest may be an early phase before it declines.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The stages come from comparing different groups of people, some with mild memory problems and some with dementia, not from following the same people over years.',
      },
    },
    {
      id: 'early',
      name: 'Early dementia',
      timescale: 'years',
      start: 0.48,
      end: 0.76,
      caption:
        "Alzheimer's dementia. Activity falls in the inferior parietal cortex and the precuneus, and the hippocampus and the entorhinal cortex beside it are now less active and are shrinking.",
      order: {
        kind: 'reconstructed',
        rationale:
          'The stages come from comparing different groups of people, not from following the same people over years. The switch in the hippocampus from more active to less active is the authors\' hypothesis.',
      },
    },
    {
      id: 'established',
      name: 'Established disease',
      timescale: 'years',
      start: 0.76,
      end: 1,
      caption:
        'In fully developed disease the changes reach further, into a network in the middle of the frontal lobes and the thalamus. The source read does not say whether that is lower activity or loss of tissue, so nothing more is drawn.',
      order: {
        kind: 'reconstructed',
        rationale: 'From a pooled analysis comparing studies of early and fully developed disease, not from following the same people.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'pcc-precuneus',
        explanation:
          "Uses markedly less energy even in very early Alzheimer's disease, before a diagnosis can be made, and a pooled analysis finds reduced activity in the precuneus in early disease. These posterior regions are also where amyloid builds up. The same pooled analysis notes that changes here do not, on their own, tell apart those whose memory problems will progress.",
        confidence: 'established',
        citations: [minoshimaPcc, schroeterEarly, bucknerPosterior, bucknerAmyloid, schroeterUnspecific],
        keyframes: kf(0, 0, 0.2, 0, 0.4, -0.45, 1, -0.5),
      },
      {
        region: 'inferior-parietal',
        explanation:
          'Energy use and blood flow fall in the inferior parietal cortex in early disease, in a pooled analysis of 40 studies, and metabolic changes appear early across posterior and lateral parietal cortex.',
        confidence: 'established',
        citations: [schroeterEarly, bucknerPosterior],
        keyframes: kf(0, 0, 0.3, 0, 0.56, -0.45, 1, -0.5),
      },
      {
        region: 'hippocampus',
        explanation:
          "In one small study, the hippocampus was more active during learning in people with very mild memory problems than in people without, and less active, and smaller, in people with Alzheimer's dementia. The authors hypothesise an early phase of extra activity followed by decline. Pooled evidence for the hippocampus in early disease is for shrinkage, not for activity. Marked debated because the rise is one small study and its authors' hypothesis.",
        confidence: 'debated',
        citations: [dickersonMci, dickersonAd, dickersonHypothesis, schroeterEarly],
        keyframes: kf(0, 0, 0.2, 0, 0.36, 0.4, 0.5, 0.15, 0.64, -0.4, 1, -0.5),
      },
      {
        region: 'parahippocampal',
        explanation:
          "The entorhinal cortex, at the front of this gyrus, is one of the first places to shrink in early disease, and in one small study it was less active in people with Alzheimer's dementia. The dimming drawn is for that lower activity; the shrinkage, which is the better-established finding, is not something this brain model shows.",
        confidence: 'mixed',
        citations: [dickersonAd, schroeterEarly],
        keyframes: kf(0, 0, 0.48, 0, 0.66, -0.4, 1, -0.5),
      },
    ],
    connections: [],
  },
  typical: null,
};

void schroeterLate;
void jackOrder;
void badhwarNetworks;

writeScore(score, {
  indexTitle: "Alzheimer's disease",
  category: 'physical',
  notes: [
    'This state uses the episode player for stages of a disease over years. The timeline labels say so, and nothing here should be read as minute-by-minute change.',
    'No typical-response comparison is drawn. Every finding is already a comparison with people of similar age without the disease.',
    'Protein build-up is described in a caption and not drawn: Jack et al. 2013 ("the two major proteinopathies underlying AD biomarker changes, amyloid β (Aβ) and tau, might be initiated independently in sporadic AD"), which its authors call a hypothetical model.',
    'No lines are drawn. Badhwar et al. 2017 find "Consistent alterations in connectivity ... in the default mode, salience, and limbic networks" but the abstract gives no direction that could be shown.',
    'The medial frontal cortex and thalamus are not drawn. Schroeter et al. 2009 (abstract) says fully developed disease "involved additionally a frontomedian-thalamic network"; the analysis pooled tissue loss and reduced energy use, and the abstract does not say which applies there. It is described in a caption.',
    'Depths are capped at half-dim and held steady. The only measured figure in the sources read is a 21-22% metabolic reduction in the posterior cingulate (Minoshima et al. 1997); no source read says activity keeps falling stage by stage.',
    'The classic staging of where tau spreads (Braak) was looked up but not used: it describes protein deposits in tissue, not activity.',
    'All six sources were read as abstracts only.',
  ],
});
