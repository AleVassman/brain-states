// What helps: recovery sleep after long sleep deprivation.
//   node research/help-recovery-sleep.mjs
import { cite, writeScore } from './lib.mjs';
import { after, beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const elmDecrease = cite(
  'elmenhorst2017',
  'This decrease in A1AR was predominant in the striatum and thalamus, but also evident in other brain regions, including the orbitofrontal cortex, amygdala, occipital cortex, frontal cortex, anterior cingulate cortex, and insula, parietal, and temporal cortex (in descending order).',
);
const elmHigher = cite(
  'elmenhorst2017',
  'In comparison with a well-rested independent control group, we observed an increase in A1AR availability after 52-h sleep deprivation that was significant in the frontal, occipital, and parietal cortices.',
);
const elmRestored = cite('elmenhorst2017', 'A1AR availabilities after recovery did not differ from baseline sleep in the control group.');
const elmDesign = cite(
  'elmenhorst2017',
  'F]CPFPX positron emission tomography was used to quantify A1AR availability in 15 healthy male adults after 52 h of sleep deprivation and following 14 h of recovery sleep.',
);
const elmRange = cite(
  'elmenhorst2017',
  'Recovery from sleep deprivation was associated with a decrease in A1AR availability in several brain regions, ranging from 11% (insula) to 14% (striatum).',
);

const score = {
  id: 'help-recovery-sleep',
  title: 'Recovery sleep after sleep deprivation',
  description:
    'Adenosine builds up in the brain the longer we stay awake and is one of the signals behind sleepiness; it acts through receptors such as the A1 adenosine receptor. One study measured how many of these receptors were available in men kept awake for 52 hours, and again after 14 hours of recovery sleep. Staying awake raised receptor availability; recovery sleep brought it back to the level of well-rested people. In this episode brightness stands for A1 receptor availability, not activity. In the first part it shows the difference from well-rested people; in "What changed" it shows the change after recovery sleep.',
  caveat: treatmentCaveat(
    'All findings come from one PET study of 15 healthy young men after 52 hours awake, which is far longer than a usual night without sleep; the well-rested comparison came from a separate earlier group. "Frontal cortex" is drawn on the dorsolateral prefrontal cortex, "occipital" on the visual cortex and "parietal" on the inferior parietal cortex, which are approximations. The striatum is drawn as the caudate and putamen.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption:
      'After 52 hours awake, A1 adenosine receptor availability is higher than in well-rested people, significantly so in the frontal, occipital and parietal cortex.',
    duringName: '14 hours of recovery sleep',
    duringTimescale: 'one night and morning',
    duringCaption: 'A long recovery sleep of 14 hours. The brain is drawn at rest here.',
    afterCaption:
      'After recovery sleep, receptor availability is lower than it was after staying awake, in every region measured: most in the striatum and thalamus, by about 14%, and least in the insula and temporal cortex, by about 10 to 11%.',
    sameCaption:
      'After recovery sleep, receptor availability no longer differed from well-rested people. People whose receptors rose more during sleep loss coped better with it, which the authors found surprising.',
    timedBy: [elmDesign],
  }),
  condition: {
    regions: [
      {
        region: 'caudate',
        explanation: 'Part of the striatum, where receptor availability fell most after recovery sleep, by about 14%, in one study.',
        confidence: 'mixed',
        citations: [elmDecrease, elmRange, elmRestored],
        keyframes: after(-0.55),
      },
      {
        region: 'putamen',
        explanation: 'Part of the striatum, where receptor availability fell most after recovery sleep, by about 14%, in one study.',
        confidence: 'mixed',
        citations: [elmDecrease, elmRange, elmRestored],
        keyframes: after(-0.55),
      },
      {
        region: 'thalamus',
        explanation: 'Receptor availability fell after recovery sleep, among the largest decreases, in one study.',
        confidence: 'mixed',
        citations: [elmDecrease],
        keyframes: after(-0.5),
      },
      {
        region: 'ofc',
        explanation: 'Receptor availability fell after recovery sleep, in one study.',
        confidence: 'mixed',
        citations: [elmDecrease],
        keyframes: after(-0.45),
      },
      {
        region: 'amygdala',
        explanation: 'Receptor availability fell after recovery sleep, in one study.',
        confidence: 'mixed',
        citations: [elmDecrease],
        keyframes: after(-0.45),
      },
      {
        region: 'visual-cortex',
        explanation:
          'The occipital cortex had higher receptor availability after 52 hours awake than in well-rested people, and lower after recovery sleep than after staying awake, in one study. Drawn on the visual cortex.',
        confidence: 'mixed',
        citations: [elmHigher, elmDecrease],
        keyframes: beforeAfter(0.4, -0.4),
      },
      {
        region: 'dlpfc',
        explanation:
          'The frontal cortex had higher receptor availability after 52 hours awake than in well-rested people, and lower after recovery sleep, in one study. "Frontal cortex" is drawn on the dorsolateral prefrontal cortex, an approximation.',
        confidence: 'mixed',
        citations: [elmHigher, elmDecrease],
        keyframes: beforeAfter(0.4, -0.4),
      },
      {
        region: 'dacc',
        explanation: 'The anterior cingulate had lower receptor availability after recovery sleep, in one study. Drawn on the dorsal anterior cingulate.',
        confidence: 'mixed',
        citations: [elmDecrease],
        keyframes: after(-0.35),
      },
      {
        region: 'insula',
        explanation: 'Receptor availability fell after recovery sleep, by about 11%, one of the smallest decreases, in one study.',
        confidence: 'mixed',
        citations: [elmDecrease, elmRange],
        keyframes: after(-0.3),
      },
      {
        region: 'inferior-parietal',
        explanation:
          'The parietal cortex had higher receptor availability after 52 hours awake than in well-rested people, and lower after recovery sleep, in one study. Drawn on the inferior parietal cortex, an approximation.',
        confidence: 'mixed',
        citations: [elmHigher, elmDecrease],
        keyframes: beforeAfter(0.4, -0.3),
      },
      {
        region: 'lateral-temporal',
        explanation: 'The temporal cortex had the smallest decrease in receptor availability after recovery sleep, in one study.',
        confidence: 'mixed',
        citations: [elmDecrease],
        keyframes: after(-0.25),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Recovery sleep',
  category: 'treatment',
  treats: 'sleep',
  notes: [
    'Brightness is A1 adenosine receptor availability measured with PET; said in the description and on the regions.',
    'Linked to "Sleep deprivation", which shows one night without sleep; this study used 52 hours, and the caveat says so.',
    'Region order of decrease follows the paper ("in descending order"); levels are illustrative steps, not measured sizes.',
    'Read in full: Elmenhorst et al. 2017.',
  ],
});
