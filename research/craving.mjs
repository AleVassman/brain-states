// Addiction and craving: a reminder of the substance and the craving it sets off.
//   node research/craving.mjs
import { cite, kf, writeScore } from './lib.mjs';

const chaseCue = cite(
  'chase2011',
  'Cue-related activation was observed in the ventral striatum (across both subgroups), amygdala (in the treatment-seeking subgroup and overall), and orbitofrontal cortex (in the nontreatment-seeking subgroup and overall) but not insula cortex.',
);
const chaseCraving = cite('chase2011', 'right amygdala and left middle frontal gyrus activity were positively associated with craving');
const kuhnOverlap = cite('kuhn2011', 'We found direct overlap between nicotine, alcohol and cocaine cue reactivity in the ventral striatum.');
const kuhnAcc = cite(
  'kuhn2011',
  'In addition, regions of close proximity were observed in the anterior cingulate cortex (ACC; nicotine and cocaine) and amygdala (alcohol, nicotine and cocaine).',
);
const kuhnCore = cite(
  'kuhn2011',
  'The ACC, right pallidum and ventral striatum were related to drug cue reactivity as well as self-reported craving, suggesting that this set of brain regions constitutes the core circuit of drug craving in nicotine and alcohol addiction.',
);
const koobStages = cite(
  'koob2010',
  "Drug addiction has been conceptualized as a disorder that involves elements of both impulsivity and compulsivity that yield a composite addiction cycle composed of three stages: 'binge/intoxication', 'withdrawal/negative affect', and 'preoccupation/anticipation' (craving).",
);
const koobControl = cite(
  'koob2010',
  'the cingulate gyrus, dorsolateral prefrontal, and inferior frontal cortices in disrupted inhibitory control',
);

const score = {
  id: 'craving',
  title: 'Addiction: a reminder and the craving it brings',
  description:
    'In addiction, things linked to a substance, such as seeing a lighter, a bottle or a place, can set off a strong craving. The episode follows that moment, as studied by showing people who use nicotine, alcohol or cocaine pictures related to it. The same core regions respond across these different substances.',
  caveat:
    'The findings come from two pooled analyses of studies in which people were shown cues related to the substance they use, compared with neutral cues. They average over the viewing period, so the order of events is reconstructed. Which regions respond depends partly on whether people were seeking treatment. The effort to resist a craving involves frontal control regions in the leading model of addiction, but the sources read give no direction for them during a craving, so they are described rather than drawn. People\'s experiences differ.',
  durationSeconds: 34,
  phases: [
    {
      id: 'cue',
      name: 'A reminder',
      timescale: 'seconds',
      start: 0,
      end: 0.18,
      caption: 'Something linked to the substance comes into view: a picture, an object, a place.',
    },
    {
      id: 'reactivity',
      name: 'The brain responds',
      timescale: 'seconds',
      start: 0.18,
      end: 0.5,
      caption:
        'The ventral striatum, part of the reward system, responds to the reminder, and does so across nicotine, alcohol and cocaine. The amygdala, the orbitofrontal cortex and the anterior cingulate respond too.',
      order: { kind: 'reconstructed', rationale: 'The studies compare viewing reminders with viewing neutral pictures. That the response follows the reminder is how the task is built.' },
    },
    {
      id: 'craving',
      name: 'Craving',
      timescale: 'seconds to minutes',
      start: 0.5,
      end: 0.8,
      caption:
        'The urge to use. The anterior cingulate and the ventral striatum respond both to reminders and in step with how strong the craving feels. In the leading model, frontal control regions help or fail to hold the urge back; the sources read give no direction for them here.',
      order: { kind: 'reconstructed', rationale: 'Craving was rated by participants during or after the same viewing periods. Showing it as a later step is a way of presenting it.' },
    },
    {
      id: 'after',
      name: 'Afterwards',
      timescale: 'minutes',
      start: 0.8,
      end: 1,
      caption: 'The reminder goes and the craving eases. What the brain does at this point was not studied in the sources read; this last part is an assumption.',
      order: { kind: 'reconstructed', rationale: 'No source read followed the end of a craving episode. The return to rest is assumed.' },
    },
  ],
  condition: {
    regions: [
      {
        region: 'nucleus-accumbens',
        explanation:
          'The ventral striatum responds to reminders of the substance, across nicotine, alcohol and cocaine, in two pooled analyses, and its response also rises with how strong the craving feels. Drawn on the nucleus accumbens, the main part of the ventral striatum.',
        confidence: 'established',
        citations: [chaseCue, kuhnOverlap, kuhnCore],
        keyframes: kf(0, 0, 0.18, 0.2, 0.36, 0.75, 0.8, 0.7, 1, 0),
      },
      {
        region: 'amygdala',
        explanation:
          'Responds to reminders of the substance in two pooled analyses. In one, activity in the right amygdala also rose with how strong the craving felt.',
        confidence: 'established',
        citations: [chaseCue, kuhnAcc, chaseCraving],
        keyframes: kf(0, 0, 0.18, 0.2, 0.36, 0.6, 0.8, 0.55, 1, 0),
      },
      {
        region: 'ofc',
        explanation: 'Responds to reminders of the substance in one pooled analysis, overall and in people not seeking treatment.',
        confidence: 'mixed',
        citations: [chaseCue],
        keyframes: kf(0, 0, 0.2, 0.15, 0.38, 0.5, 0.8, 0.45, 1, 0),
      },
      {
        region: 'dacc',
        explanation:
          'The anterior cingulate responded to reminders of nicotine and cocaine, and in alcohol and nicotine studies its response also rose with craving, in one pooled analysis.',
        confidence: 'mixed',
        citations: [kuhnAcc, kuhnCore],
        keyframes: kf(0, 0, 0.2, 0.15, 0.4, 0.5, 0.8, 0.5, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void koobStages;
void koobControl;

writeScore(score, {
  indexTitle: 'Addiction and craving',
  notes: [
    'The insula is not drawn. Chase et al. 2011 found cue-related activation "but not insula cortex"; the Koob & Volkow model includes the insula in craving, so the evidence is mixed.',
    'The left middle frontal gyrus rose with craving in Chase et al. 2011, but it was a correlation with craving strength, not an average response, so it is not drawn.',
    'Frontal control regions are described, not drawn: Koob & Volkow 2010 place "the cingulate gyrus, dorsolateral prefrontal, and inferior frontal cortices in disrupted inhibitory control" but give no direction for a craving episode.',
    'The right pallidum (Kühn & Gallinat 2011, alcohol) is not in the brain model.',
    'No typical-response comparison is drawn: the studies compare reminders with neutral pictures in people who use the substance.',
    'Read as abstracts only: all sources.',
  ],
});
