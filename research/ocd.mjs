// Obsessive-compulsive disorder: a trigger, the urge, and the effort to resist it.
//   node research/ocd.mjs
import { cite, kf, writeScore } from './lib.mjs';

const rotgeLoops = cite(
  'rotge2008',
  'We found significant likelihoods of activation in cortical and subcortical regions of the orbitofrontal and anterior cingulate loops.',
);
const rotgeDorsal = cite(
  'rotge2008',
  'The left dorsal frontoparietal network, including the dorsolateral prefrontal cortex and precuneus, and the left superior temporal gyrus also demonstrated significant likelihoods of activation.',
);
const rotgeResist = cite(
  'rotge2008',
  "we suggest that activations within the dorsal frontoparietal network might be related to patients' efforts to resist the obsessive processes induced by the provocation task",
);
const rotgeInconsistent = cite(
  'rotge2008',
  'an increased activity within numerous other regions of the brain has inconsistently been reported across studies',
);
const menziesCircuits = cite(
  'menzies2008',
  'we performed a quantitative, voxel-level meta-analysis of functional MRI findings, which revealed consistent abnormalities in orbitofronto-striatal and other additional areas in OCD',
);
const menziesNotCongruent = cite(
  'menzies2008',
  'results from these studies have not been entirely congruent with each other',
);
const shephardProfiles = cite(
  'shephard2021',
  'we link variations in these clinical profiles to underlying neurocircuit dysfunctions, drawing on findings from neuropsychological and neuroimaging studies in OCD',
);

const score = {
  id: 'ocd',
  title: 'Obsessive-compulsive: the urge and the effort to resist',
  description:
    'In obsessive-compulsive disorder, a trigger, such as touching something that might be dirty, brings an intrusive thought and a strong urge to do something about it, such as washing or checking. The episode follows that moment, as studied by showing people with OCD things that bring on their symptoms.',
  caveat:
    'The findings come from a pooled analysis of studies that deliberately provoked symptoms in a scanner, comparing provocation with neutral periods within people with OCD rather than comparing them with people without OCD, and a second pooled analysis that found consistent differences in the same circuits without, in the part read, giving a direction. The order of events is reconstructed: the scans average over the provocation period. That the frontal and parietal activity reflects effort to resist the urge is the authors\' suggestion, not something measured. OCD takes different forms in different people, and researchers link those forms to partly different circuits.',
  durationSeconds: 36,
  phases: [
    {
      id: 'trigger',
      name: 'A trigger',
      timescale: 'seconds',
      start: 0,
      end: 0.16,
      caption: 'Something sets off the intrusive thought, for example a reminder of contamination or of something left unchecked.',
    },
    {
      id: 'urge',
      name: 'The urge',
      timescale: 'seconds to minutes',
      start: 0.16,
      end: 0.5,
      caption:
        'The circuits running from the orbitofrontal cortex and the anterior cingulate through the striatum become active. This is the most consistent finding when symptoms are provoked.',
      order: {
        kind: 'reconstructed',
        rationale: 'The studies compare whole provocation periods with neutral ones. That the urge follows the trigger is how the task is built.',
      },
    },
    {
      id: 'resisting',
      name: 'Trying to resist',
      timescale: 'seconds to minutes',
      start: 0.5,
      end: 0.8,
      caption:
        'A network on the left, including the dorsolateral prefrontal cortex and the precuneus, is also active. The researchers suggest this may reflect the effort to resist the urge.',
      order: {
        kind: 'reconstructed',
        rationale:
          'This network was active during the same provocation periods. Placing it after the urge follows the authors\' suggestion that it reflects resisting, which was not measured as a separate step.',
      },
    },
    {
      id: 'after',
      name: 'Afterwards',
      timescale: 'minutes',
      start: 0.8,
      end: 1,
      caption: 'The urge eases, whether or not it was acted on. What the brain does at this point was not studied in the sources read; this last part is an assumption.',
      order: { kind: 'reconstructed', rationale: 'No source read followed the end of a provoked episode. The return to rest is assumed.' },
    },
  ],
  condition: {
    regions: [
      {
        region: 'ofc',
        explanation:
          'Part of the circuit most consistently active when OCD symptoms are provoked, in a pooled analysis. A second pooled analysis found consistent differences in the circuit linking the orbitofrontal cortex and the striatum, without a direction in the abstract, and notes that results have not been entirely consistent.',
        confidence: 'mixed',
        citations: [rotgeLoops, menziesCircuits, menziesNotCongruent],
        keyframes: kf(0, 0, 0.16, 0.15, 0.34, 0.65, 0.8, 0.65, 1, 0),
      },
      {
        region: 'dacc',
        explanation: 'Part of the circuit most consistently active when OCD symptoms are provoked, in a pooled analysis. The source says anterior cingulate; it is drawn on the dorsal anterior cingulate.',
        confidence: 'mixed',
        citations: [rotgeLoops],
        keyframes: kf(0, 0, 0.16, 0.15, 0.34, 0.65, 0.8, 0.55, 1, 0),
      },
      {
        region: 'caudate',
        explanation:
          'The circuits that run from the orbitofrontal and anterior cingulate cortex pass through the striatum, and their subcortical parts were active when symptoms were provoked. The abstract read does not name the caudate; it is drawn as the part of the striatum these circuits run through, which is an assumption.',
        confidence: 'mixed',
        citations: [rotgeLoops, menziesCircuits],
        keyframes: kf(0, 0, 0.18, 0.1, 0.36, 0.55, 0.8, 0.5, 1, 0),
      },
      {
        region: 'dlpfc-l',
        explanation:
          'Active on the left during symptom provocation. The researchers suggest it may reflect the effort to resist the obsession; that is their interpretation.',
        confidence: 'mixed',
        citations: [rotgeDorsal, rotgeResist],
        keyframes: kf(0, 0, 0.5, 0, 0.62, 0.55, 0.8, 0.5, 1, 0),
      },
      {
        region: 'pcc-precuneus-l',
        explanation:
          'The precuneus, on the left, was active during symptom provocation, as part of the same network as the dorsolateral prefrontal cortex. The posterior cingulate and precuneus are drawn together, on the left only; the finding is for the left precuneus.',
        confidence: 'mixed',
        citations: [rotgeDorsal, rotgeResist],
        keyframes: kf(0, 0, 0.5, 0, 0.62, 0.4, 0.8, 0.35, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void rotgeInconsistent;
void shephardProfiles;

writeScore(score, {
  indexTitle: 'Obsessive-compulsive',
  notes: [
    'Rotge et al. 2008 has no DOI; it is linked by its PubMed id.',
    'Also reported by Rotge et al. 2008: the left superior temporal gyrus. Not drawn, to keep to the circuits the authors interpret.',
    'Menzies et al. 2008 (abstract) find "consistent abnormalities in orbitofronto-striatal and other additional areas" and note results "have not been entirely congruent with each other"; no direction is given in the abstract.',
    'Shephard et al. 2021 (abstract) link different clinical profiles to different circuit dysfunctions; reflected in the caveat.',
    'No typical-response comparison is drawn; the provocation findings are within people with OCD.',
    'Read in full: Shephard et al. 2021. Read as abstracts only: Rotge et al. 2008, Menzies et al. 2008.',
  ],
});
