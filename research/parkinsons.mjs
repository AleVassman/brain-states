// Parkinson's disease: stages over years, not an episode over minutes.
//   node research/parkinsons.mjs
import { cite, kf, writeScore } from './lib.mjs';

const poeweHallmarks = cite(
  'poewe2017',
  'Neuronal loss in the substantia nigra, which causes striatal dopamine deficiency, and intracellular inclusions containing aggregates of α-synuclein are the neuropathological hallmarks of Parkinson disease.',
);
const poeweBeyond = cite(
  'poewe2017',
  'Multiple other cell types throughout the central and peripheral autonomic nervous system are also involved, probably from early disease onwards.',
);
const poeweNonMotor = cite(
  'poewe2017',
  'Parkinson disease is associated with many non-motor symptoms that add to overall disability',
);
const braakStart = cite(
  'braak2003',
  'lesions initially occur in the dorsal motor nucleus of the glossopharyngeal and vagal nerves and anterior olfactory nucleus',
);
const braakAscending = cite(
  'braak2003',
  'The disease process in the brain stem pursues an ascending course with little interindividual variation.',
);
const braakCortex = cite(
  'braak2003',
  'Cortical involvement ensues, beginning with the anteromedial temporal mesocortex. From there, the neocortex succumbs, commencing with high order sensory association and prefrontal areas.',
);
const kongPutamen = cite(
  'kong2020',
  'In PET studies, the posterior putamen is the most severely affected region in the striatum while the caudate nucleus is relatively spared.',
);
const kongCaudate = cite(
  'kong2020',
  'patients with PD showed significantly reduced F‐FP‐CIT uptake in three brain regions [caudate nucleus: standardized mean difference (SMD) = −1.71, Z = −3.31, P = 0.0009; anterior putamen: SMD = −3.71, Z = −6.26, P < 0.0001; and posterior putamen: SMD = −5.49, Z = −5.97, P < 0.0001]',
);
const guReduced = cite(
  'gu2022',
  'PD patients showed reduced amplitude of low frequency fluctuations (ALFF) in the left superior temporal gyrus (STG), the left superior frontal gyrus (SFG), the left medial frontal gyrus (MFG), the left precuneus (PCUN), and the right lentiform nucleus, compared to HC.',
);
const guThalamus = cite(
  'gu2022',
  'PD patients showed reduced regional homogeneity (ReHo) in the right declive, the right MFG, the left culmen, and the left thalamus, compared to HC.',
);
const guInconsistent = cite(
  'gu2022',
  'prior rs-fMRI studies reported inconsistent results for comparison between Parkinson\'s disease (PD) and healthy controls (HC)',
);
const albinModel = cite(
  'albin1989',
  "Hypokinetic disorders, such as Parkinson's disease, are hypothesized to result from a complex series of changes in the activity of striatal projection neuron subpopulations resulting in an increase in basal ganglia output.",
);
const liCerebellum = cite(
  'li2023',
  'growing evidence suggests that pathological changes extend beyond the basal ganglia into other parts of the brain, including the cerebellum',
);

const score = {
  id: 'parkinsons',
  title: "Parkinson's disease: stages over years",
  description:
    "Parkinson's disease develops over many years, so this timeline is in stages of the disease, not minutes. Its core is the loss of dopamine-producing cells in a small midbrain structure, the substantia nigra, which leaves the striatum, part of the movement system, short of dopamine. Unlike most other states in the app, the dimming in the substantia nigra and striatum here stands for that loss of dopamine cells and their nerve endings, as seen on tracer scans, not for lower activity. The disease also affects many other parts of the nervous system.",
  caveat:
    "The stages are assembled from separate kinds of evidence: post-mortem studies of where the disease's protein deposits are found, tracer scans that measure dopamine nerve endings, and brain scans of activity at rest. These were never one experiment, and the stages are built from people at different points of the disease, not by following individuals. The earliest changes, in the lower brainstem and the smell pathway, come from post-mortem staging of protein deposits; they are described here but not drawn, because they are deposits, not a measured change in activity. Pooled analyses of activity at rest describe the results of earlier studies as inconsistent. How fast the disease moves, and which symptoms come first, varies a great deal between people.",
  durationSeconds: 44,
  phases: [
    {
      id: 'early',
      name: 'Before movement symptoms',
      timescale: 'years',
      start: 0,
      end: 0.22,
      caption:
        "In post-mortem studies the disease's protein deposits are first found low in the brainstem and in the smell pathway, and climb upward from there. This stage is described, not drawn: those are deposits seen under the microscope, not activity.",
    },
    {
      id: 'dopamine',
      name: 'Dopamine cells are lost',
      timescale: 'years',
      start: 0.22,
      end: 0.55,
      caption:
        'Dopamine-producing cells in the substantia nigra are lost, and the striatum runs short of dopamine. Tracer scans show the loss is greatest at the back of the putamen, with the caudate relatively spared. Movement becomes slower.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The post-mortem staging places the midbrain after the lower brainstem. That this precedes the movement symptoms in each person is not measured in the sources read; the order follows the staging.',
      },
    },
    {
      id: 'circuits',
      name: 'Movement circuits change',
      timescale: 'years',
      start: 0.55,
      end: 0.8,
      caption:
        'The circuits the striatum belongs to are also found working differently at rest. In pooled scans, local activity in the left thalamus was less coordinated than in people without the disease. (The putamen stays dimmed for dopamine loss; changes in its activity are not drawn.)',
      order: {
        kind: 'reconstructed',
        rationale:
          'The resting-state findings come from people at varied stages and are compared with healthy people, not followed over time. Placing them after the dopamine loss is an inference.',
      },
    },
    {
      id: 'widening',
      name: 'Changes widen',
      timescale: 'years',
      start: 0.8,
      end: 1,
      caption:
        "Later, the protein deposits reach the cortex, starting in the temporal lobe and then frontal and association areas. Many symptoms beyond movement are part of the disease, probably from early on. Researchers also link the cerebellum to the disease. These are described, not drawn, because the sources read give no direction of activity for them.",
      order: {
        kind: 'reconstructed',
        rationale: 'From post-mortem staging of protein deposits, not from activity measured over time.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'substantia-nigra',
        explanation:
          "Loss of the dopamine-producing cells here is one of the defining features of Parkinson's disease. The dimming stands for that cell loss, not for measured activity. How much is lost before symptoms appear is not given in the sources read, so the level drawn is illustrative.",
        confidence: 'established',
        citations: [poeweHallmarks],
        keyframes: kf(0, 0, 0.22, 0, 0.45, -0.6, 1, -0.7),
      },
      {
        region: 'putamen',
        explanation:
          "Dopamine nerve endings are markedly reduced here in people with Parkinson's disease, in a pooled analysis of tracer scans, and the back of the putamen is the most affected part of the striatum. The dimming stands for that loss, not for activity. The whole putamen is drawn; the loss is greatest towards the back.",
        confidence: 'established',
        citations: [kongPutamen, kongCaudate, poeweHallmarks],
        keyframes: kf(0, 0, 0.25, 0, 0.5, -0.7, 1, -0.75),
      },
      {
        region: 'caudate',
        explanation:
          'Dopamine nerve endings are also reduced here, but less than in the putamen: the caudate is relatively spared. The dimming stands for that loss, not for activity.',
        confidence: 'established',
        citations: [kongCaudate, kongPutamen],
        keyframes: kf(0, 0, 0.3, 0, 0.55, -0.35, 1, -0.45),
      },
      {
        region: 'thalamus-l',
        explanation:
          "In a pooled analysis of brain scans at rest, the left thalamus showed less coordinated local activity than in people without the disease. That analysis notes that earlier studies were inconsistent. The dimming here stands for reduced local coordination, a different measure from the amount of activity.",
        confidence: 'mixed',
        citations: [guThalamus, guInconsistent],
        keyframes: kf(0, 0, 0.55, 0, 0.7, -0.3, 1, -0.3),
      },
    ],
    connections: [],
  },
  typical: null,
};

void poeweBeyond;
void poeweNonMotor;
void braakStart;
void braakAscending;
void braakCortex;
void guReduced;
void liCerebellum;
void albinModel;

writeScore(score, {
  indexTitle: "Parkinson's disease",
  category: 'physical',
  notes: [
    'This state uses the episode player for stages over years; the timeline says so.',
    'The substantia nigra, putamen and caudate are dimmed to show the loss of dopamine cells and nerve endings, measured with tracer scans, not activity. The description and each explanation say this.',
    'The earliest stage (Braak et al. 2003: "lesions initially occur in the dorsal motor nucleus of the glossopharyngeal and vagal nerves and anterior olfactory nucleus") and the later spread to the cortex are described in captions, not drawn: they are protein deposits found after death.',
    'The resting-activity pooled analysis (Gu et al. 2022, abstract) also reports reduced activity in the right "lentiform nucleus" (which includes the putamen) and in several cortical areas, and increases in others. Only the left thalamus is drawn from it (its regional homogeneity finding), to avoid mixing activity with the dopamine-loss dimming already shown on the putamen.',
    'The cerebellum is not drawn. Li et al. 2023 (abstract) report a link with the disease without a direction of change.',
    'The classic model of basal ganglia circuits (Albin et al. 1989) predicts "an increase in basal ganglia output" in Parkinson\'s disease; it is a model from animal and post-mortem data and is not used for any track.',
    'Read in full: Kong 2020. Read as abstracts only: Poewe 2017, Braak 2003, Gu 2022, Albin 1989, Li 2023.',
  ],
});
