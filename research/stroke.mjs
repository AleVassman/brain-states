// Stroke: a blocked artery, and how the movement system responds as a hand recovers.
//   node research/stroke.mjs
import { cite, kf, writeScore } from './lib.mjs';

const saverMinute = cite(
  'saver2006',
  'In each minute, 1.9 million neurons, 14 billion synapses, and 12 km (7.5 miles) of myelinated fibers are destroyed.',
);
const saverTypical = cite(
  'saver2006',
  'The typical final volume of large vessel, supratentorial ischemic stroke is 54 mL (varied in sensitivity analysis from 19 to 100 mL).',
);
const saverAverage = cite('saver2006', 'The typical patient loses 1.9 million neurons each minute in which stroke is untreated.');
const wardSpared = cite('ward2003cross', 'None of our patients had infarcts involving the hand region of the primary motor cortex.');
const carreraDistant = cite(
  'carrera2014',
  'the term \'diaschisis\' was coined by von Monakow in 1914 to describe the neurophysiological changes that occur distant to a focal brain lesion',
);
const carreraNormalise = cite(
  'carrera2014',
  'normalization of remote connectivity changes in these networks relates to a better recovery',
);
const rehmeHigher = cite(
  'rehme2012',
  'Patients showed higher activation likelihood in contralesional primary motor cortex (M1), bilateral ventral premotor cortex and supplementary motor area (SMA) relative to healthy subjects.',
);
const rehmeConsistent = cite(
  'rehme2012',
  'increased activation in contralesional M1 and bilateral premotor areas is a highly consistent finding after stroke despite high inter-study variance resulting from different fMRI tasks and motor impairment levels',
);
const rehmeOutcome = cite(
  'rehme2012',
  'a good functional outcome relies on the recruitment of the original functional network rather than on contralesional activity',
);
const rehmeBetter = cite(
  'rehme2012',
  'Better motor performance was associated with greater activation likelihood in ipsilesional M1, pre-SMA, contralesional premotor cortex and cerebellum.',
);
const rehmeOverTime = cite(
  'rehme2012',
  'Over time post-stroke, activation likelihood in bilateral premotor areas and medial M1 hand knob decreased.',
);
const wardLongitudinal = cite(
  'ward2003long',
  'consistent decreases across sessions correlating with recovery were seen across the whole patient group independent of rate of recovery or initial severity, in primary motor cortex, premotor and prefrontal cortex, supplementary motor areas, cingulate sulcus, temporal lobe, striate cortex, cerebellum, thalamus and basal ganglia',
);
const wardCross = cite(
  'ward2003cross',
  "patients with poor recovery were more likely to recruit a number of motor-related brain regions over and above those seen in the control group during the motor task, whereas patients with more complete recovery were more likely to have 'normal' task-related brain activation",
);
const wardNegative = cite(
  'ward2003cross',
  'we were able to demonstrate a negative correlation between outcome and the degree of task-related activation in regions such as the supplementary motor area, cingulate motor areas, premotor cortex, posterior parietal cortex, and cerebellum',
);

const score = {
  id: 'stroke',
  title: 'Stroke: damage and the recovery of movement',
  description:
    'In an ischaemic stroke an artery is blocked and part of the brain loses its blood supply. Where that happens varies from person to person, so the damaged area itself is not drawn. The episode follows one common situation: a stroke that weakens one hand. The studies pooled strokes on either side; it is drawn in the left half of the brain, weakening the right hand, for illustration. What is drawn is how the movement system works when the person tries to move that hand, compared with a healthy person moving theirs, from the first weeks through recovery over months.',
  caveat:
    'Brightness here is activity while the weakened hand moves, compared with healthy people moving their hand; it is not activity at rest. The pooled analysis behind it combines many small studies with different tasks and degrees of weakness. The two studies that followed recovery included only people whose primary movement area was spared. The first two phases draw nothing, because where the damage falls varies and the distant effects of a stroke on connected areas are described in the sources without a direction that could be shown. Recovery differs a great deal between people, and the pattern shown is for recovery that goes well.',
  durationSeconds: 40,
  phases: [
    {
      id: 'blockage',
      name: 'An artery is blocked',
      timescale: 'minutes to hours',
      start: 0,
      end: 0.16,
      caption:
        'An artery is blocked and part of the brain loses its blood supply. For a large stroke that goes untreated, researchers estimate an average loss of about 1.9 million nerve cells a minute, which is why stroke is treated as an emergency. Where the damage falls varies, so it is not drawn.',
    },
    {
      id: 'distant',
      name: 'Effects at a distance',
      timescale: 'after the damage (timing not studied here)',
      start: 0.16,
      end: 0.32,
      caption:
        'Areas far from the damage can also change how they work and how they connect with each other. This is called diaschisis. The sources describe it without a direction that could be drawn.',
      order: {
        kind: 'reconstructed',
        rationale:
          'Distant effects follow the damage by definition. When they appear and how long they last were not timed in the sources read.',
      },
    },
    {
      id: 'early',
      name: 'Working harder',
      timescale: 'weeks',
      start: 0.32,
      end: 0.66,
      caption:
        'When the person tries to move the weak hand, more of the movement system is active than in a healthy person: the movement cortex on the undamaged side and the supplementary motor area on both sides. The less complete the recovery, the more extra areas are recruited.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The pooled analysis combines patients scanned at different times after stroke. That the extra activity is greatest in the early weeks rests on it decreasing over time in the same analysis and in the longitudinal study.',
      },
    },
    {
      id: 'recovery',
      name: 'Recovery',
      timescale: 'weeks to months',
      start: 0.66,
      end: 1,
      caption:
        'As movement recovers, the extra activity falls back towards a healthy pattern. Good recovery goes with relying on the original movement network on the damaged side, rather than on the undamaged side.',
      order: {
        kind: 'timed',
        citations: [wardLongitudinal],
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'motor-cortex-r',
        explanation:
          'The movement cortex on the undamaged side. It is more active than in healthy people when the weakened hand moves, a highly consistent finding across studies. That this extra activity decreases as movement recovers comes from one study that followed eight patients, which reports it for the primary motor cortex without naming the side. Good recovery goes with relying less on this side. The finding also covers the premotor cortex, which lies just in front of the area drawn.',
        confidence: 'established',
        citations: [rehmeHigher, rehmeConsistent, rehmeOutcome, wardLongitudinal],
        keyframes: kf(0, 0, 0.32, 0, 0.46, 0.65, 0.66, 0.6, 0.9, 0.15, 1, 0.1),
      },
      {
        region: 'sma',
        explanation:
          'The supplementary motor area, on both sides, is more active than in healthy people when the weakened hand moves, and its activity decreases as movement recovers. People with poorer recovery tend to show more activity here.',
        confidence: 'established',
        citations: [rehmeHigher, wardLongitudinal, wardNegative],
        keyframes: kf(0, 0, 0.32, 0, 0.46, 0.55, 0.66, 0.5, 0.9, 0.15, 1, 0.1),
      },
      {
        region: 'cerebellum',
        explanation:
          'Drawn at the healthy level. Studies link the cerebellum to recovery in opposite ways: in one, people with poorer recovery showed more activity here; a pooled analysis links better movement to activity in the cerebellum. Neither finds it raised on average, and well-recovered patients show a normal pattern.',
        confidence: 'mixed',
        citations: [wardNegative, wardCross, rehmeBetter],
        keyframes: kf(0, 0, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void saverMinute;
void saverAverage;
void wardSpared;
void saverTypical;
void carreraDistant;
void carreraNormalise;
void rehmeOverTime;

writeScore(score, {
  indexTitle: 'Stroke',
  category: 'physical',
  notes: [
    'The damaged area is not drawn. Its location varies; Saver 2006 gives a typical final volume ("54 mL (varied in sensitivity analysis from 19 to 100 mL)") but no place.',
    'The stroke is described in the left hemisphere for illustration, so the undamaged side is the right; the findings are reported as "contralesional" and "ipsilesional" and apply to either side.',
    'The movement cortex on the damaged side is not drawn changing. Rehme et al. 2012 link better performance to activity there, while Ward et al. 2003 found more activity in both primary motor areas in people with poorer outcome; with no agreed direction, it is left at the healthy level, which matches the description of good recovery as a return to a normal pattern.',
    'Diaschisis (Carrera & Tononi 2014) is described, not drawn: the review says connectivity changes distant from the damage and that "normalization of remote connectivity changes in these networks relates to a better recovery", without a direction for a specific region.',
    'The premotor cortex is not a separate region in the brain model; findings about it are mentioned in the movement cortex text.',
    'The recovery phase is marked timed: Ward et al. 2003 scanned the same patients repeatedly and found activity falling as each recovered.',
    'The 1.9-million figure: Saver 2006 (abstract), "The typical patient loses 1.9 million neurons each minute in which stroke is untreated." It is an estimated average for a large untreated stroke.',
    'Read in full: Ward et al. 2003 (cross-sectional). Read as abstracts only: all other sources.'
  ],
});
