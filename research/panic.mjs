// Panic attack: a sudden surge of fear that starts inside the body.
//   node research/panic.mjs
import { cite, kf, writeScore } from './lib.mjs';

const goossensBrainstem = cite(
  'goossens2014',
  'Patients show increased brainstem activation in response to hypercapnia compared to controls and divers.',
);
const goossensInsula = cite(
  'goossens2014',
  'Subjective feelings of breathing discomfort were positively correlated with brain activation in the anterior insula in all groups.',
);
const sobanskiExtended = cite(
  'sobanski2017',
  'recent functional studies suggest abnormal activation mainly in an extended fear network comprising brainstem, anterior and midcingulate cortex (ACC and MCC), insula, and lateral as well as medial parts of the prefrontal cortex',
);
const sobanskiAmygdala = cite(
  'sobanski2017',
  'differences in the amygdala activation were not as consistently reported as one would predict from the hypothesis of Gorman et al (2000)',
);
const gormanSpeculated = cite('gorman2000', 'It is speculated that a similar network is involved in panic disorder.');
const gormanProjections = cite(
  'gorman2000',
  'Projections from the amygdala to hypothalamic and brainstem sites explain many of the observed signs of conditioned fear responses.',
);
const dreslerState = cite(
  'dresler2013',
  'The assumption of a generally hyperactive amygdala in PD seems to apply more to state than trait characteristics of PD, and involvement of further areas in the fear circuit, such as anterior cingulate and insula, is suggested.',
);
const feinsteinNotRequired = cite(
  'feinstein2013',
  'these results indicate that the amygdala is not required for fear and panic evoked by CO2 inhalation',
);
const mobbsShift = cite(
  'mobbs2007',
  'as the virtual predator grew closer, brain activity shifted from the ventromedial prefrontal cortex to the periaqueductal gray',
);
const mobbsDread = cite(
  'mobbs2007',
  'imminence-driven periaqueductal gray activity correlated with increased subjective degree of dread and decreased confidence of escape',
);

const score = {
  id: 'panic',
  title: 'Panic attack: an alarm from inside the body',
  description:
    'A panic attack is a sudden surge of intense fear with strong bodily sensations, often with no outside danger. The episode follows the kind of attack that can be studied: one set off in a scanner by breathing air with extra carbon dioxide, which gives a feeling of not getting enough air. It shows the response in someone with panic disorder; the typical response shows the same breathing test in someone without it.',
  caveat:
    'Spontaneous panic attacks are almost never caught in a scanner, so this episode is built from attacks provoked with carbon dioxide, from scans of people with panic disorder doing other tasks, from a classic model based on fear learning in animals, and from one study of healthy volunteers being chased by a virtual predator. These were never one experiment. The role of the amygdala is disputed: the classic model puts it at the centre, later reviews find it less consistently than predicted, and three people with no working amygdala had panic attacks when given carbon dioxide. The brainstem is drawn as a rough outline of the whole structure because the small nuclei thought to be involved are not in the brain model. How an attack subsides has not been studied in scans.',
  durationSeconds: 34,
  phases: [
    {
      id: 'signal',
      name: 'A signal from the body',
      timescale: 'seconds',
      start: 0,
      end: 0.14,
      caption:
        'It starts inside the body: here, carbon dioxide building up in the blood. The brainstem, which monitors breathing, responds more strongly than in someone without panic disorder.',
      typicalCaption: 'Carbon dioxide builds up in the blood. The brainstem, which monitors breathing, responds, but less strongly.',
    },
    {
      id: 'alarm',
      name: 'Alarm',
      timescale: 'seconds',
      start: 0.14,
      end: 0.42,
      caption:
        'The sensation is felt and read as danger. The front of the insula, which carries the felt state of the body, becomes more active the worse the breathing feels, and the cingulate cortex joins in. The amygdala is shown, but its part is disputed.',
      typicalCaption: 'The front of the insula becomes more active the more uncomfortable the breathing feels. This happens in everyone.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The breathing study averaged over two minutes of carbon dioxide and did not time the regions against each other. That the brainstem signal comes before the felt alarm is an inference from the body signal being the trigger.',
      },
    },
    {
      id: 'peak',
      name: 'Peak',
      timescale: 'minutes',
      start: 0.42,
      end: 0.76,
      caption:
        'At the height of the fear, activity is thought to shift down from the front of the brain to the midbrain, as it does in healthy volunteers when a threat closes in. In animals, signals from the amygdala to the hypothalamus and brainstem drive the racing heart and fast breathing.',
      typicalCaption: 'The discomfort stays uncomfortable but does not turn into panic.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The shift towards the midbrain was measured in healthy volunteers as a virtual predator approached, not during panic. Using it for the peak of a panic attack is an analogy.',
      },
    },
    {
      id: 'subsiding',
      name: 'Subsiding',
      timescale: 'minutes (not studied in scans)',
      start: 0.76,
      end: 1,
      caption: 'The attack passes. What the brain does as it subsides has not been studied in scans; this last part is an assumption.',
      typicalCaption: 'Normal air again, and the response settles.',
      order: {
        kind: 'reconstructed',
        rationale: 'No source read for this episode followed the end of a panic attack. The return to baseline is assumed.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'brainstem',
        explanation:
          'More active in people with panic disorder than in others when they breathe air with extra carbon dioxide, in one study read as an abstract. A review also lists the brainstem in the network that behaves differently in panic disorder. In healthy volunteers, a midbrain area inside the brainstem, the periaqueductal grey, becomes active as a threat closes in and more so the greater the dread; it is not drawn separately.',
        confidence: 'mixed',
        citations: [goossensBrainstem, sobanskiExtended, mobbsShift, mobbsDread],
        keyframes: kf(0, 0, 0.08, 0.5, 0.3, 0.7, 0.55, 0.9, 0.76, 0.75, 1, 0.1),
      },
      {
        region: 'insula',
        explanation:
          'The front of the insula became more active the more uncomfortable breathing felt, in people with and without panic disorder. Reviews include the insula in the network that behaves differently in panic disorder.',
        confidence: 'mixed',
        citations: [goossensInsula, sobanskiExtended, dreslerState],
        keyframes: kf(0, 0, 0.14, 0.2, 0.36, 0.8, 0.6, 0.85, 0.76, 0.7, 1, 0.1),
      },
      {
        region: 'dacc',
        explanation:
          'Reviews of scans in panic disorder find the anterior and middle cingulate cortex behaving differently, without settling on a direction for an attack itself. Drawn more active, following its rise in other alarm states; this direction is an assumption.',
        confidence: 'debated',
        citations: [sobanskiExtended, dreslerState],
        keyframes: kf(0, 0, 0.14, 0.1, 0.38, 0.6, 0.6, 0.65, 0.76, 0.5, 1, 0.05),
      },
      {
        region: 'amygdala',
        explanation:
          'The classic model of panic puts the amygdala at the centre, by analogy with fear learning in animals, and says so as speculation. Later reviews find it less consistently than that model predicts, and more during an anxious state than as a lasting trait. Three people with no working amygdala on either side still had panic attacks when given carbon dioxide, so it is not needed for this kind of panic.',
        confidence: 'debated',
        citations: [gormanSpeculated, sobanskiAmygdala, dreslerState, feinsteinNotRequired],
        keyframes: kf(0, 0, 0.14, 0.1, 0.38, 0.5, 0.6, 0.55, 0.76, 0.4, 1, 0.05),
      },
      {
        region: 'hypothalamus',
        explanation:
          'In animals, signals from the amygdala to the hypothalamus and brainstem produce the bodily signs of fear, such as a racing heart. That the same happens in a human panic attack is the classic model\'s speculation.',
        confidence: 'debated',
        citations: [gormanProjections, gormanSpeculated],
        keyframes: kf(0, 0, 0.3, 0.05, 0.5, 0.5, 0.76, 0.4, 1, 0),
      },
      {
        region: 'vmpfc',
        explanation:
          'In healthy volunteers chased by a virtual predator, activity moved away from the ventromedial prefrontal cortex as the threat closed in. Drawn dimming at the peak by analogy; this was not measured during panic.',
        confidence: 'debated',
        citations: [mobbsShift],
        keyframes: kf(0, 0, 0.3, 0.1, 0.55, -0.45, 0.76, -0.35, 1, 0),
      },
    ],
    connections: [
      {
        from: 'amygdala',
        to: 'hypothalamus',
        explanation:
          'A pathway known from animals, in which the amygdala drives the hypothalamus to produce the bodily signs of fear. Its part in human panic is speculation, and panic can occur without the amygdala.',
        confidence: 'debated',
        citations: [gormanProjections, gormanSpeculated, feinsteinNotRequired],
        keyframes: kf(0, 0, 0.3, 0.05, 0.5, 0.6, 0.76, 0.4, 1, 0),
      },
    ],
  },
  typical: {
    regions: [
      {
        region: 'brainstem',
        explanation:
          'Responds to carbon dioxide in people without panic disorder too, but less than in people with it. The size of the difference drawn is illustrative.',
        confidence: 'mixed',
        citations: [goossensBrainstem],
        keyframes: kf(0, 0, 0.08, 0.2, 0.3, 0.3, 0.76, 0.3, 1, 0),
      },
      {
        region: 'insula',
        explanation: 'The front of the insula became more active the more uncomfortable breathing felt, in every group studied.',
        confidence: 'mixed',
        citations: [goossensInsula],
        keyframes: kf(0, 0, 0.14, 0.15, 0.36, 0.45, 0.76, 0.4, 1, 0),
      },
    ],
    connections: [],
  },
};

writeScore(score, {
  indexTitle: 'Panic attack',
  notes: [
    'The episode is the carbon-dioxide kind of panic because that is what has been scanned. Whether spontaneous attacks follow the same course is not known.',
    'The periaqueductal grey would be the right structure to light at the peak (Mobbs et al. 2007). Its atlas file still has to be downloaded by hand, so the whole brainstem outline is lit instead and the text says so.',
    'The locus coeruleus, part of the classic fear network (Sobanski & Wagner 2017), is too small to draw.',
    'The direction of the cingulate change during an attack is not stated in the sources read; it is drawn as an increase and labelled as an assumption.',
    'Read as abstracts only: Goossens 2014, Sobanski & Wagner 2017, Gorman 2000, Dresler 2013. Read in full: Feinstein 2013, Mobbs 2007.',
  ],
});
