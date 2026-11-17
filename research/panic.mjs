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
const feinsteinInhibit = cite(
  'feinstein2013',
  'the higher rate of panic attacks in the amygdala-lesion patients suggests that an intact amygdala may normally inhibit panic',
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
    'A panic attack is a sudden surge of intense fear with strong bodily sensations, often with no outside danger. The episode follows the kind of attack that can be studied: one set off in a scanner by breathing air with extra carbon dioxide, which gives a feeling of not getting enough air, in someone with panic disorder. Very little about panic is settled, and only three regions are drawn changing; the third, the hypothalamus, rests on animal work. There is no "typical response" to compare with: the one study that compared groups reported a single difference, described in the brainstem text.',
  caveat:
    'Spontaneous panic attacks are almost never caught in a scanner, so this episode is built from responses to carbon dioxide in the scanner, from reviews of scans of people with panic disorder doing other tasks, from a classic model based on fear learning in animals, and from one study of healthy volunteers being chased by a virtual predator. These were never one experiment. The role of the amygdala is unresolved: the classic model puts it at the centre, later reviews find it less consistently than predicted, and three people with no working amygdala had panic attacks when given carbon dioxide, more readily than other people, which suggests the amygdala may normally hold panic back. The brainstem is drawn as a rough outline of the whole structure because the small nuclei thought to be involved are not in the brain model. How an attack subsides has not been studied in scans.',
  durationSeconds: 34,
  phases: [
    {
      id: 'signal',
      name: 'A signal from the body',
      timescale: 'seconds',
      start: 0,
      end: 0.14,
      caption:
        'It starts inside the body: here, carbon dioxide building up in the blood. In one study the brainstem, which monitors breathing, responded more strongly in people with panic disorder than in others.',
    },
    {
      id: 'alarm',
      name: 'Alarm',
      timescale: 'seconds',
      start: 0.14,
      end: 0.42,
      caption:
        'The sensation is felt. The front of the insula, which carries the felt state of the body, becomes more active the worse the breathing feels; this was true of everyone studied, with or without panic disorder. Reviews also find the cingulate cortex behaving differently in panic disorder, without settling on how.',
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
        'The height of the fear. In healthy volunteers facing a threat that closes in, activity shifts towards the midbrain, part of the brainstem; whether the same happens in panic is not known. In animals, the hypothalamus and brainstem drive the racing heart and fast breathing of fear.',
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
          'More active in people with panic disorder than in others when they breathe air with extra carbon dioxide, in one study read as an abstract. A review also lists the brainstem in the network that behaves differently in panic disorder. In healthy volunteers, a midbrain area inside the brainstem, the periaqueductal grey, becomes active as a threat closes in, more so the greater the dread; that is not a panic finding and the area is not drawn separately.',
        confidence: 'mixed',
        citations: [goossensBrainstem, sobanskiExtended, mobbsShift, mobbsDread],
        keyframes: kf(0, 0, 0.08, 0.5, 0.3, 0.7, 0.76, 0.7, 1, 0.1),
      },
      {
        region: 'insula',
        explanation:
          'The front of the insula became more active the more uncomfortable breathing felt, in people with and without panic disorder alike: no difference between the groups was reported. Reviews include the insula in the network that behaves differently in panic disorder.',
        confidence: 'mixed',
        citations: [goossensInsula, sobanskiExtended, dreslerState],
        keyframes: kf(0, 0, 0.14, 0.2, 0.36, 0.7, 0.76, 0.7, 1, 0.1),
      },
      {
        region: 'amygdala',
        explanation:
          'Drawn at baseline, because the sources disagree on what it does. The classic model of panic puts the amygdala at the centre, by analogy with fear learning in animals, and says so as speculation. Later reviews find it less consistently than that model predicts. Three people with no working amygdala on either side had panic attacks when given carbon dioxide, and did so more readily than other people, which the authors take to suggest that the amygdala may normally hold panic back.',
        confidence: 'debated',
        citations: [gormanSpeculated, sobanskiAmygdala, dreslerState, feinsteinNotRequired, feinsteinInhibit],
        keyframes: kf(0, 0, 1, 0),
      },
      {
        region: 'hypothalamus',
        explanation:
          'Evidence mainly from animals: there, signals reaching the hypothalamus and brainstem produce the bodily signs of fear, such as a racing heart. That the same happens in a human panic attack is the classic model\'s speculation, and nothing read for this episode measured it in people.',
        confidence: 'debated',
        citations: [gormanProjections, gormanSpeculated],
        keyframes: kf(0, 0, 0.3, 0.05, 0.5, 0.45, 0.76, 0.4, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Panic attack',
  notes: [
    'No typical-response comparison. The one group comparison read (Goossens et al. 2014, abstract) reports a single difference, a larger brainstem response in panic disorder, and reports the insula finding as the same in all groups. That is not enough to draw a second brain.',
    'Not drawn, because the sources give no direction for a panic attack: the cingulate cortex (reviews say it behaves "differently") and the ventromedial prefrontal cortex (the shift away from it was measured in healthy volunteers facing an outside threat).',
    'No lines are drawn. The amygdala-to-hypothalamus pathway of the classic model is from animal fear learning, and panic can occur without the amygdala.',
    'The periaqueductal grey would be the structure to show for the threat-closing-in finding (Mobbs et al. 2007). Its atlas file still has to be downloaded by hand.',
    'The episode is the carbon-dioxide kind of panic because that is what has been scanned. Whether spontaneous attacks follow the same course is not known.',
    'Read as abstracts only: Goossens 2014, Sobanski & Wagner 2017, Gorman 2000, Dresler 2013. Read in full: Feinstein 2013, Mobbs 2007.',
  ],
});
