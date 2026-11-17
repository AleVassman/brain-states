// Psychosis: dopamine in the striatum, and the brain while a voice is heard.
//   node research/psychosis.mjs
import { cite, kf, writeScore } from './lib.mjs';

const howesMeta = cite(
  'howes2012',
  'There was a highly significant elevation (P.<001) in presynaptic dopaminergic function in schizophrenia with a large effect size (Cohen d=0.79).',
);
const howesNoTransporter = cite('howes2012', 'There was no evidence of alterations in dopamine transporter availability.');
const howesProdrome = cite(
  'howes2009pro',
  'Striatal (18)F-dopa uptake was elevated in patients with prodromal symptoms of schizophrenia (effect size, 0.75) to an intermediate degree compared with that in patients with schizophrenia (effect size, 1.25). The elevation was localized in the associative striatum in both groups.',
);
const howesPredates = cite(
  'howes2009pro',
  'dopamine overactivity predates the onset of schizophrenia in individuals with prodromal psychotic symptoms, is predominantly localized in the associative striatum',
);
const howesV3 = cite(
  'howes2009v3',
  'This hypothesis seeks to be comprehensive in providing a framework that links risk factors, including pregnancy and obstetric complications, stress and trauma, drug use, and genes, to increased presynaptic striatal dopaminergic function.',
);
const kapurSalience = cite(
  'kapur2003',
  'It is proposed that a dysregulated, hyperdopaminergic state, at a "brain" level of description and analysis, leads to an aberrant assignment of salience to the elements of one\'s experience, at a "mind" level.',
);
const kapurHallucinations = cite(
  'kapur2003',
  'hallucinations reflect a direct experience of the aberrant salience of internal representations',
);
const jardriNetwork = cite(
  'jardri2011',
  "Patients experiencing AVHs demonstrated significantly increased activation likelihoods in a bilateral neural network, including the Broca's area (activation likelihood estimation=1.84×10⁻³), anterior insula (1.78×10⁻³), precentral gyrus (1.46×10⁻³), frontal operculum (1.29×10⁻³), middle and superior temporal gyri (1.59×10⁻³), inferior parietal lobule (1.33×10⁻³), and hippocampus/parahippocampal region (1.90×10⁻³).",
);
const jardriSpeech = cite(
  'jardri2011',
  'experiencing AVHs is associated with increased activity in fronto-temporal areas involved in speech generation and speech perception, but also within the medial temporal lobe, a structure notably involved in verbal memory',
);
const jardriSample = cite(
  'jardri2011',
  'A total of 68 patients with schizophrenia spectrum disorders experiencing AVHs during scanning were included.',
);

const voice = (region, explanation, citations, peak = 0.6) => ({
  region,
  explanation,
  confidence: 'mixed',
  citations,
  keyframes: kf(0, 0, 0.5, 0, 0.6, peak, 0.8, peak, 0.86, 0, 1, 0),
});

const score = {
  id: 'psychosis',
  title: 'Psychosis: dopamine and hearing a voice',
  description:
    'Psychosis is a state in which a person\'s experience loses touch with shared reality, for example hearing a voice that others do not hear. It is a core feature of schizophrenia and can also happen in other conditions. The episode follows two of the best-studied findings: a raised capacity to produce dopamine in the striatum, which is already present before psychosis begins, and the brain network that is active while a voice is heard. In the striatum, brightness stands for dopamine production measured with tracer scans, not for activity.',
  caveat:
    'The dopamine findings come from tracer scans comparing groups of people with and without psychosis, and from one small study of people with early warning signs. The voice findings come from a pooled analysis of ten studies, 68 people in all, who heard voices during scanning. These were never one experiment, and the stages are built from different groups of people, not by following individuals. The idea that too much dopamine makes ordinary things feel strangely significant is a proposed framework. People\'s experiences of psychosis vary widely.',
  durationSeconds: 40,
  phases: [
    {
      id: 'early',
      name: 'Early warning signs',
      timescale: 'months to years',
      start: 0,
      end: 0.25,
      caption:
        'Before psychosis begins, some people have milder unusual experiences. In one study of people at this stage, the capacity to produce dopamine in the associative striatum was already raised, to a level between that of healthy people and people with schizophrenia.',
    },
    {
      id: 'psychosis',
      name: 'Psychosis',
      timescale: 'weeks to months',
      start: 0.25,
      end: 0.5,
      caption:
        'In psychosis, dopamine production in the striatum is raised, one of the most consistent findings in this field. A proposed explanation is that too much dopamine gives ordinary experiences and thoughts a feeling of special significance.',
      order: {
        kind: 'reconstructed',
        rationale: 'The early-sign and psychosis findings come from different groups of people compared at one time point, not from following the same people.',
      },
    },
    {
      id: 'voice',
      name: 'Hearing a voice',
      timescale: 'seconds to minutes',
      start: 0.5,
      end: 0.86,
      caption:
        'While a voice is heard, areas that produce and perceive speech become more active: Broca\'s area, the front of the insula, the temporal cortex, the inferior parietal cortex, and the hippocampus and the cortex around it, which are involved in verbal memory.',
      order: {
        kind: 'reconstructed',
        rationale: 'The voice findings come from people already experiencing psychosis, scanned while hearing voices. Placing them after the dopamine finding is a way of presenting the two.',
      },
    },
    {
      id: 'after',
      name: 'The voice stops',
      timescale: 'seconds to minutes',
      start: 0.86,
      end: 1,
      caption: 'The voice stops and these areas settle. The raised dopamine production is a longer-lasting state, so it stays.',
      order: { kind: 'reconstructed', rationale: 'The studies compare periods with and without voices. The return to rest when a voice stops follows from that design.' },
    },
  ],
  condition: {
    regions: [
      {
        region: 'caudate',
        explanation:
          'The capacity to produce and release dopamine in the striatum is raised in schizophrenia, with a large effect, in a pooled analysis of 44 studies; dopamine transporters are not changed. In people with early warning signs it is already raised, to an intermediate degree, mainly in the associative striatum. The associative striatum is mostly the caudate, which is drawn; it also includes the front of the putamen. Brightness here stands for dopamine production, not activity.',
        confidence: 'established',
        citations: [howesMeta, howesNoTransporter, howesProdrome, howesPredates, howesV3],
        keyframes: kf(0, 0, 0.08, 0.3, 0.25, 0.35, 0.36, 0.6, 1, 0.6),
      },
      voice('vlpfc', "Broca's area and the frontal operculum, which produce speech, are active while a voice is heard, on both sides. They lie in the inferior frontal gyrus, which is drawn.", [jardriNetwork, jardriSpeech, jardriSample]),
      voice('lateral-temporal', 'The middle and upper temporal cortex, which perceive speech, are active while a voice is heard. The whole lateral temporal cortex is drawn.', [jardriNetwork, jardriSpeech], 0.65),
      voice('insula', 'The front of the insula is active while a voice is heard. The whole insula is drawn.', [jardriNetwork], 0.5),
      voice('inferior-parietal', 'The inferior parietal lobule is active while a voice is heard.', [jardriNetwork], 0.45),
      voice('hippocampus', 'The hippocampus and the cortex around it, involved in verbal memory, are active while a voice is heard.', [jardriNetwork, jardriSpeech], 0.5),
      voice('motor-cortex', 'The precentral gyrus is active while a voice is heard.', [jardriNetwork], 0.4),
    ],
    connections: [],
  },
  typical: null,
};

void kapurSalience;
void kapurHallucinations;

writeScore(score, {
  indexTitle: 'Psychosis',
  notes: [
    'In the striatum, brightness shows dopamine production capacity measured with tracer scans, not activity. Said in the description and the caudate text.',
    'The aberrant-salience idea (Kapur 2003: "a dysregulated, hyperdopaminergic state ... leads to an aberrant assignment of salience to the elements of one\'s experience") is a proposed framework and is described as such in a caption.',
    'The early-sign dopamine level is drawn below the psychosis level because Howes et al. 2009 found it elevated "to an intermediate degree"; the exact values are illustrative.',
    'The voice network is drawn on both sides: Jardri et al. 2011 report "a bilateral neural network".',
    'No typical-response comparison is drawn; every finding is already a comparison with people without psychosis or with periods without voices.',
    'Read as abstracts only: all sources (full texts could not be downloaded).',
  ],
});
