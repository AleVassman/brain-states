// Chronic pain: pain that lingers, becomes long-lasting, and changes how the brain works between pains.
//   node research/chronicpain.mjs
import { cite, kf, writeScore } from './lib.mjs';

const balikiPredict = cite(
  'baliki2012',
  'Initially greater functional connectivity of nucleus accumbens with prefrontal cortex predicted pain persistence, implying that corticostriatal circuitry is causally involved in the transition from acute to chronic pain.',
);
const balikiGrey = cite(
  'baliki2012',
  'When pain persisted (SBPp, in contrast to recovering SBP and healthy controls), brain gray matter density decreased.',
);
const balikiSignatures = cite('baliki2011', "We find that different chronic pain types exhibit unique anatomical 'brain signatures'.");
const apkarianNetwork = cite(
  'apkarian2005',
  'The main components of this network are: primary and secondary somatosensory, insular, anterior cingulate, and prefrontal cortices (S1, S2, IC, ACC, PFC) and thalamus (Th).',
);
const apkarianChronic = cite(
  'apkarian2005',
  'the brain network for acute pain perception in normal subjects is at least partially distinct from that seen in chronic clinical pain conditions and that chronic pain engages brain regions critical for cognitive/emotional assessments',
);
const tanasescuSimilar = cite(
  'tanasescu2016',
  'The pattern of nociceptive brain activation was similar in CP, hyperalgesia and normalgesia in controls.',
);
const tanasescuNoDiff = cite('tanasescu2016', 'Meta-analysis of contrast maps showed no difference between CP, controls, mood conditions.');
const tanasescuFocal = cite(
  'tanasescu2016',
  'focally increased activation likelihood, but unchanged intensity, in CP when stimulated at the most painful body part',
);
const alfarajInsula = cite(
  'alfaraj2026',
  'A conjunction meta-analysis revealed robust activation in the dorsal anterior insula, mid-cingulate gyrus, and medial frontal gyrus during provoked pain across 39 within-subject experiments.',
);
const balikiDmn = cite(
  'baliki2008',
  'CBP patients, despite performing the task equally well as controls, displayed reduced deactivation in several key DMN regions',
);
const davisNotTest = cite(
  'davis2017',
  'the use of brain imaging findings to support or dispute a claim of chronic pain - effectively as a pain lie detector - is not warranted',
);

const sharedPain = (region, explanation, confidence, citations) => ({
  region,
  explanation,
  confidence,
  citations,
  keyframes: kf(0, 0, 0.5, 0, 0.6, 0.65, 0.76, 0.6, 0.82, 0, 1, 0),
});

const painNetwork = [
  sharedPain(
    'insula',
    'Part of the brain\'s response to a painful touch in everyone. In people with long-lasting pain the overall pattern of response is the same as in people without it, and a pooled analysis of 266 studies found no difference in strength. Drawn the same in both.',
    'established',
    [apkarianNetwork, alfarajInsula, tanasescuSimilar, tanasescuNoDiff],
  ),
  sharedPain(
    'dacc',
    'The anterior cingulate is part of the brain\'s response to pain in everyone. Drawn the same in both, because the pooled analysis found the same pattern with and without chronic pain. In people with chronic pain, a pooled analysis of provoked pain also finds the middle part of the cingulate active, which lies just behind the area drawn.',
    'mixed',
    [apkarianNetwork, alfarajInsula, tanasescuSimilar],
  ),
  sharedPain(
    'thalamus',
    'Relays pain signals to the cortex and is part of the brain\'s response to pain in everyone. Drawn the same in both.',
    'mixed',
    [apkarianNetwork, tanasescuSimilar],
  ),
  sharedPain(
    'somatosensory',
    'The primary body-sense cortex, which maps where on the body the pain is. Part of the response to pain in everyone. Drawn the same in both.',
    'mixed',
    [apkarianNetwork, tanasescuSimilar],
  ),
];

const score = {
  id: 'chronicpain',
  title: 'Chronic pain: when pain stays',
  description:
    'Chronic pain is pain that lasts for months or longer, such as long-term back pain. It is not imagined: it goes with real changes in the brain. The episode follows someone whose back pain did not go away, and compares them with someone whose pain did, or who never had it. One finding stands out: the brain\'s response to a painful touch looks much the same with or without chronic pain. What differs is how certain circuits work before pain becomes chronic, and how the brain behaves between pains.',
  caveat:
    'The evidence comes from separate studies: one that followed people with recent back pain for a year, pooled analyses of how the brain responds to pain, and a study of people with chronic back pain doing a simple task. Chronic pain comes in many forms, and different types leave different traces in the brain, so this is not one pattern for everyone. An international expert group warns that brain scans cannot be used as a test for whether someone has chronic pain. The gradual loss of grey matter in people whose pain persisted is a change in tissue and is described, not drawn.',
  durationSeconds: 40,
  phases: [
    {
      id: 'lingering',
      name: 'Pain that lingers',
      timescale: 'weeks to months',
      start: 0,
      end: 0.3,
      caption:
        'Back pain that has lasted a few weeks. In people whose pain went on to persist, the nucleus accumbens, part of the reward and motivation system, was already more tightly linked to the prefrontal cortex than in those who recovered.',
      typicalCaption: 'Back pain that has lasted a few weeks, in someone who goes on to recover. No unusual link is drawn.',
    },
    {
      id: 'chronic',
      name: 'Becoming chronic',
      timescale: 'about a year',
      start: 0.3,
      end: 0.5,
      caption:
        'The pain persists. Over the following year grey matter decreased in those whose pain continued. That is a change in tissue, so it is described, not drawn.',
      typicalCaption: 'The pain resolves.',
      order: {
        kind: 'timed',
        citations: [balikiGrey],
      },
    },
    {
      id: 'touch',
      name: 'A painful touch',
      timescale: 'seconds',
      start: 0.5,
      end: 0.8,
      caption:
        'A painful touch. The brain\'s pain response, in the insula, cingulate, thalamus and body-sense cortex, follows the same pattern as in someone without chronic pain.',
      typicalCaption: 'A painful touch, in someone without chronic pain. The same pain response.',
      order: {
        kind: 'reconstructed',
        rationale: 'The pain-response findings come from separate experiments. Placing them after the pain became chronic is a way of presenting the comparison.',
      },
    },
    {
      id: 'between',
      name: 'Between pains',
      timescale: 'minutes',
      start: 0.8,
      end: 1,
      caption:
        'Doing a simple task. Normally the brain\'s resting network quietens during a task; in people with chronic back pain it quietened less, even though they did the task just as well.',
      typicalCaption: 'Doing a simple task. The brain\'s resting network quietens, as it does in everyone during a task.',
      order: {
        kind: 'reconstructed',
        rationale: 'This finding comes from a separate study of people with chronic back pain at rest and during a task. It is placed last for presentation.',
      },
    },
  ],
  condition: {
    regions: [
      ...painNetwork,
      {
        region: 'pcc-precuneus',
        explanation:
          "Part of the brain's resting network, which normally quietens during a task. In people with chronic back pain, several key parts of this network quietened less. The abstract read does not name which parts; it is drawn on the posterior cingulate and precuneus, the core of the network, as an assumption. From one study.",
        confidence: 'mixed',
        citations: [balikiDmn],
        keyframes: kf(0, 0, 0.8, 0, 0.88, -0.15, 1, -0.15),
      },
      {
        region: 'mpfc',
        explanation:
          "Part of the brain's resting network, which normally quietens during a task. In people with chronic back pain, several key parts of this network quietened less. The abstract read does not name which parts; it is drawn on the medial prefrontal cortex, another core part of the network, as an assumption. From one study.",
        confidence: 'mixed',
        citations: [balikiDmn],
        keyframes: kf(0, 0, 0.8, 0, 0.88, -0.15, 1, -0.15),
      },
    ],
    connections: [
      {
        from: 'nucleus-accumbens',
        to: 'mpfc',
        explanation:
          'In people with recent back pain, a tighter link between the nucleus accumbens and the prefrontal cortex predicted that the pain would persist a year later. The authors take this to mean the circuit is involved in pain becoming chronic. The abstract says "prefrontal cortex" without saying which part; the line is drawn to the medial prefrontal cortex as an assumption. From one study.',
        confidence: 'mixed',
        citations: [balikiPredict],
        keyframes: kf(0, 0, 0.08, 0.6, 0.3, 0.6, 0.4, 0, 1, 0),
      },
    ],
  },
  typical: {
    regions: [
      ...painNetwork,
      {
        region: 'pcc-precuneus',
        explanation:
          "Part of the brain's resting network, which quietens during a task. People without chronic pain showed more of this quietening than people with it. Drawn on the posterior cingulate and precuneus as an assumption.",
        confidence: 'mixed',
        citations: [balikiDmn],
        keyframes: kf(0, 0, 0.8, 0, 0.88, -0.45, 1, -0.45),
      },
      {
        region: 'mpfc',
        explanation:
          "Part of the brain's resting network, which quietens during a task. People without chronic pain showed more of this quietening than people with it. Drawn on the medial prefrontal cortex as an assumption.",
        confidence: 'mixed',
        citations: [balikiDmn],
        keyframes: kf(0, 0, 0.8, 0, 0.88, -0.45, 1, -0.45),
      },
    ],
    connections: [],
  },
};

void balikiSignatures;
void apkarianChronic;
void tanasescuFocal;
void davisNotTest;

writeScore(score, {
  indexTitle: 'Chronic pain',
  category: 'physical',
  notes: [
    'The pain response is drawn identical in both brains. Tanasescu et al. 2016 (full text): "Meta-analysis of contrast maps showed no difference between CP, controls, mood conditions." They did find "focally increased activation likelihood, but unchanged intensity, in CP when stimulated at the most painful body part" (left putamen, left frontal gyrus, right insula); because the intensity was unchanged, that is not drawn as brighter.',
    'Apkarian et al. 2005 (abstract) report that "chronic pain engages brain regions critical for cognitive/emotional assessments". The abstract does not name them, so they are not drawn.',
    'The typical variant in the first two phases stands for people whose back pain resolved (Baliki et al. 2012 compared them with people whose pain persisted).',
    'The resting network is drawn below rest during the task (quietening) in both brains, less so with chronic pain. The size of the quietening is illustrative; Baliki et al. 2008 report "reduced deactivation" without a figure in the abstract.',
    'The secondary body-sense cortex and the mid-cingulate are named in the sources but are not separate regions in the brain model.',
    'Davis et al. 2017 (abstract): "the use of brain imaging findings to support or dispute a claim of chronic pain - effectively as a pain lie detector - is not warranted". Reflected in the caveat.',
    'Read in full: Tanasescu 2016. Read as abstracts only: Baliki 2008, 2011, 2012, Apkarian 2005, Al-Faraj 2026, Davis 2017.',
  ],
});
