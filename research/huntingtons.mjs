// Huntington's disease: stages over decades, not an episode over minutes.
//   node research/huntingtons.mjs
import { cite, kf, writeScore } from './lib.mjs';

const batesCause = cite(
  'bates2015',
  'The disease is caused by an expanded CAG trinucleotide repeat (of variable length) in HTT, the gene that encodes the protein huntingtin.',
);
const batesDeath = cite(
  'bates2015',
  'In mutation carriers, huntingtin is produced with abnormally long polyglutamine sequences that confer toxic gains of function and predispose the protein to fragmentation, resulting in neuronal dysfunction and death.',
);
const batesCourse = cite(
  'bates2015',
  'Huntington disease is devastating to patients and their families - with autosomal dominant inheritance, onset typically in the prime of adult life, progressive course, and a combination of motor, cognitive and behavioural features.',
);
const scahillPutamen = cite(
  'scahill2020',
  'The preHD cohort had slightly smaller putamen volumes (FDR=0·03), but this did not appear to be closely related to predicted years to onset (FDR=0·54).',
);
const scahillNormal = cite(
  'scahill2020',
  'We report normal brain function yet a rise in sensitive measures of neurodegeneration in a preHD cohort approximately 24 years from predicted clinical onset.',
);
const tabriziPredict = cite(
  'tabrizi2013',
  'Of these, grey-matter volume and inter-tap interval were particularly sensitive (p=0·013 and 0·002, respectively).',
);
const tabriziCloser = cite(
  'tabrizi2013',
  'In the preHD-B group, several quantitative motor and cognitive tasks showed significantly increased rates of decline at 36 months, compared with controls, whereas few had at 24 months.',
);
const broomStriatal = cite(
  'broom2026',
  'HD-YAS showed SER predicts striatal atrophy over multi-year intervals, but its short-term sensitivity remains uncertain.',
);
const broomMri = cite('broom2026', 'Structural MRI remains the most sensitive imaging marker of progression');

const score = {
  id: 'huntingtons',
  title: "Huntington's disease: stages over decades",
  description:
    "Huntington's disease is inherited and caused by a change in a single gene. It develops over decades, so this timeline is in stages, not minutes. The striatum, made up of the caudate and putamen, is where loss is tracked most closely on brain scans. In this state the dimming stands for loss of brain tissue, measured as a smaller volume, not for lower activity.",
  caveat:
    'The stages are built from people at different points before and after symptoms begin, compared with people without the gene change; they are not one person followed through the whole disease. The far-from-onset finding comes from one study of 64 young adults with the gene change, who on average were about 24 years from expected symptoms and whose thinking and mood were normal. How much tissue is lost at each stage is not given in the sources read, so the levels drawn are illustrative. The caudate is drawn on the basis of a review that speaks of the striatum as a whole.',
  durationSeconds: 40,
  phases: [
    {
      id: 'far',
      name: 'Decades before symptoms',
      timescale: 'decades',
      start: 0,
      end: 0.3,
      caption:
        'Young adults who carry the gene change, on average about 24 years before expected symptoms. Their thinking and mood are normal, and their brain works normally, but the putamen is slightly smaller than in people without the gene change.',
    },
    {
      id: 'closer',
      name: 'Approaching symptoms',
      timescale: 'years',
      start: 0.3,
      end: 0.6,
      caption:
        'Closer to expected onset, small changes in movement and thinking begin to show on careful tests, and grey matter volume helps predict who will soon be diagnosed. The striatum continues to shrink.',
      order: { kind: 'reconstructed', rationale: 'The stages come from comparing groups at different distances from expected onset, not from following one group all the way.' },
    },
    {
      id: 'onset',
      name: 'Symptoms begin',
      timescale: 'years',
      start: 0.6,
      end: 0.85,
      caption:
        'Movement, thinking and behaviour change. Nerve cells in the striatum stop working properly and die; structural scans of the striatum are the most sensitive way to track this.',
      order: { kind: 'reconstructed', rationale: 'From group comparisons and a review of how the disease is tracked, not from following one person.' },
    },
    {
      id: 'progression',
      name: 'Progression',
      timescale: 'years',
      start: 0.85,
      end: 1,
      caption: 'The disease continues to progress. How far the loss goes at each stage is not given in the sources read; the dimming drawn is illustrative.',
      order: { kind: 'reconstructed', rationale: 'The disease is described as progressive; the later stages are not measured in the sources read.' },
    },
  ],
  condition: {
    regions: [
      {
        region: 'putamen',
        explanation:
          'Slightly smaller in young adults with the gene change about 24 years before expected symptoms, in one study, though how much smaller was not clearly related to how far away symptoms were. Later, the striatum as a whole shrinks over the years. The dimming stands for smaller volume, not lower activity.',
        confidence: 'mixed',
        citations: [scahillPutamen, scahillNormal, broomStriatal, broomMri],
        keyframes: kf(0, 0, 0.1, -0.15, 0.3, -0.15, 0.55, -0.35, 0.8, -0.55, 1, -0.6),
      },
      {
        region: 'caudate',
        explanation:
          'Part of the striatum, which shrinks over the years. The sources read speak of the striatum as a whole and do not single out the caudate. Unlike the putamen, it was not found smaller far from onset, so it is drawn starting to dim later. The dimming stands for smaller volume, not lower activity.',
        confidence: 'mixed',
        citations: [broomStriatal, broomMri, batesDeath],
        keyframes: kf(0, 0, 0.35, 0, 0.55, -0.3, 0.8, -0.5, 1, -0.55),
      },
    ],
    connections: [],
  },
  typical: null,
};

void batesCause;
void batesCourse;
void tabriziPredict;
void tabriziCloser;

writeScore(score, {
  indexTitle: "Huntington's disease",
  category: 'physical',
  notes: [
    'In this state the dimming shows smaller tissue volume, not activity; said in the description and on each region.',
    'Scahill et al. 2020 found "no group differences in other brain imaging measures" far from onset, which is why only the putamen dims in the first stage.',
    'The classic finding that the caudate is affected early was not drawn because no source for it could be retrieved and read.',
    'Tabrizi et al. 2013 (abstract) report that grey-matter volume was "particularly sensitive" in predicting diagnosis; this is mentioned in a caption, not drawn as a separate region.',
    'No typical-response comparison is drawn; the findings are already comparisons with people without the gene change.',
    'Read as abstracts only: all sources.',
  ],
});
