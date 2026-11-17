// Sleep deprivation: the brain after a night without sleep.
//   node research/sleep.mjs
import { cite, kf, writeScore } from './lib.mjs';

const maReduced = cite(
  'ma2015',
  'The meta-analysis revealed significantly reduced brain activation in multiple regions following sleep deprivation compared to rested wakefulness, including bilateral intraparietal sulcus, bilateral insula, right prefrontal cortex, medial frontal cortex, and right parahippocampal gyrus.',
);
const maThalamus = cite('ma2015', 'Increased activation was found only in bilateral thalamus after sleep deprivation compared to rested wakefulness.');
const maThalamusWhy = cite(
  'ma2015',
  'Increased thalamic activation after sleep deprivation may reflect a complex interaction between the de-arousing effects of sleep loss and the arousing effects of task performance on thalamic activity.',
);
const maMixed = cite(
  'ma2015',
  'Previous neuroimaging studies have used different attention paradigms and reported both increased and reduced brain activation after sleep deprivation.',
);
const maSample = cite(
  'ma2015',
  'The authors searched published articles and identified 11 sleep deprivation neuroimaging studies using different attention tasks with a total of 185 participants, equaling 81 foci for ALE analysis.',
);
const yooHippocampus = cite(
  'yoo2007',
  'a single night of sleep deprivation produces a significant deficit in hippocampal activity during episodic memory encoding, resulting in worse subsequent retention',
);

const score = {
  id: 'sleep',
  title: 'Sleep deprivation: a night without sleep',
  description:
    'Not an illness but a state everyone knows: a night without sleep. The episode follows the brain the next day while trying to pay attention and to learn something new. Areas that hold attention become less active, while the thalamus, a relay at the centre of the brain, becomes more active. The comparison is with the same kind of task after a normal night\'s sleep.',
  caveat:
    'The attention findings come from a pooled analysis of 11 studies, 185 people in all, using different tasks; individual studies had reported both increases and decreases, and the pooled result is what was consistent across them. The memory finding comes from one study. These are effects of one full night without sleep in healthy volunteers; ongoing partial sleep loss may differ. Activity is measured while doing a task, so it is not activity at rest.',
  durationSeconds: 34,
  phases: [
    {
      id: 'night',
      name: 'A night awake',
      timescale: 'one night',
      start: 0,
      end: 0.2,
      caption: 'A full night passes without sleep. The brain is not scanned during the night itself in these studies.',
    },
    {
      id: 'attention',
      name: 'Trying to pay attention',
      timescale: 'minutes',
      start: 0.2,
      end: 0.6,
      caption:
        'The next day, during an attention task, areas that hold attention are less active than after normal sleep: the parietal attention areas, the insula, the right prefrontal cortex and the medial frontal cortex. The thalamus is more active, which the authors suggest may reflect a complex interaction between sleepiness and the effort of doing the task.',
      order: { kind: 'reconstructed', rationale: 'The scans are taken after the night awake, by design; the night itself is not measured.' },
    },
    {
      id: 'learning',
      name: 'Trying to learn',
      timescale: 'minutes',
      start: 0.6,
      end: 0.9,
      caption:
        'Learning something new, the hippocampus, which forms new memories, is less active than after sleep, and less is remembered later. The attention findings are not carried over to this separate task.',
      order: { kind: 'reconstructed', rationale: 'The memory finding comes from a separate study. Placing it after the attention task is a way of presenting both.' },
    },
    {
      id: 'recovery',
      name: 'After sleep',
      timescale: 'after a night\'s sleep',
      start: 0.9,
      end: 1,
      caption: 'Recovery after sleep was not studied in the sources read; the return to normal drawn here is an assumption.',
      order: { kind: 'reconstructed', rationale: 'No source read scanned people after recovery sleep. The return to rest is assumed.' },
    },
  ],
  condition: {
    regions: [
      {
        region: 'inferior-parietal',
        explanation:
          'The intraparietal sulcus, a key attention area, was less active on both sides after a night without sleep, in a pooled analysis. It lies at the upper edge of the inferior parietal cortex, which is drawn.',
        confidence: 'mixed',
        citations: [maReduced, maSample, maMixed],
        keyframes: kf(0, 0, 0.2, 0, 0.32, -0.5, 0.6, -0.5, 0.66, 0, 1, 0),
      },
      {
        region: 'insula',
        explanation: 'Less active on both sides during attention tasks after a night without sleep, in a pooled analysis.',
        confidence: 'mixed',
        citations: [maReduced, maSample],
        keyframes: kf(0, 0, 0.2, 0, 0.32, -0.45, 0.6, -0.45, 0.66, 0, 1, 0),
      },
      {
        region: 'dlpfc-r',
        explanation:
          'The right prefrontal cortex was less active during attention tasks after a night without sleep, in a pooled analysis. The abstract does not say which part; it is drawn on the right middle frontal gyrus.',
        confidence: 'mixed',
        citations: [maReduced],
        keyframes: kf(0, 0, 0.2, 0, 0.32, -0.45, 0.6, -0.45, 0.66, 0, 1, 0),
      },
      {
        region: 'mpfc',
        explanation: 'The medial frontal cortex was less active during attention tasks after a night without sleep, in a pooled analysis.',
        confidence: 'mixed',
        citations: [maReduced],
        keyframes: kf(0, 0, 0.2, 0, 0.32, -0.4, 0.6, -0.4, 0.66, 0, 1, 0),
      },
      {
        region: 'parahippocampal-r',
        explanation: 'The right parahippocampal gyrus was less active during attention tasks after a night without sleep, in a pooled analysis.',
        confidence: 'mixed',
        citations: [maReduced],
        keyframes: kf(0, 0, 0.2, 0, 0.32, -0.35, 0.6, -0.35, 0.66, 0, 1, 0),
      },
      {
        region: 'thalamus',
        explanation:
          'The only area more active, on both sides, during attention tasks after a night without sleep, in a pooled analysis. The authors suggest it may reflect the pull between sleepiness and the effort of doing the task.',
        confidence: 'mixed',
        citations: [maThalamus, maThalamusWhy],
        keyframes: kf(0, 0, 0.2, 0, 0.32, 0.5, 0.6, 0.5, 0.66, 0, 1, 0),
      },
      {
        region: 'hippocampus',
        explanation:
          'Less active while learning new things after a night without sleep, and less was remembered later, in one study. Shown only while learning.',
        confidence: 'mixed',
        citations: [yooHippocampus],
        keyframes: kf(0, 0, 0.6, 0, 0.7, -0.5, 0.9, -0.5, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Sleep deprivation',
  category: 'physical',
  notes: [
    'Listed under "Physical conditions"; sleep deprivation is a body state, not an illness, and the description says so.',
    'All findings compare the same kind of task after a night without sleep and after rested wakefulness.',
    'The emotional effects of sleep loss (a more reactive amygdala) were not used: the study looked up had no abstract available to read.',
    'Read in full: none. Read as abstracts only: Ma et al. 2015, Yoo et al. 2007.',
  ],
});
