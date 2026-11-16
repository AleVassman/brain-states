// Acute stress: being put under pressure, and the body's hormone response.
//   node research/stress.mjs
import { cite, kf, writeScore } from './lib.mjs';

const koglerCommon = cite(
  'kogler2015',
  'The inferior frontal gyrus (IFG) and the anterior insula (AI) were the only regions that demonstrated overlapping activation for both stressors.',
);
const koglerInconsistent = cite(
  'kogler2015',
  'inconsistent results regarding activation and deactivation have been reported, particularly in brain regions such as the hippocampus/amygdala, the anterior cingulate cortex (ACC) and prefrontal areas',
);
const koglerStriatum = cite(
  'kogler2015',
  'analysis across psychosocial stress revealed consistent activation of the right superior temporal gyrus and deactivation of the striatum',
);
const koglerVentral = cite(
  'kogler2015',
  'deactivation during psychosocial stress compared to activation during physiological stress showed significantly more convergence in the ventral part of the striatum',
);
const berretzClusters = cite(
  'berretz2021',
  'The analysis revealed bilateral activation clusters comprising the claustrum, insula and inferior frontal gyrus.',
);
const hermansShift = cite(
  'hermans2014',
  'exposure to acute stress prompts a reallocation of resources to a salience network, promoting fear and vigilance, at the cost of an executive control network',
);
const hermansReverse = cite('hermans2014', 'After stress subsides, resource allocation to these two networks reverses');
const arnstenLoss = cite(
  'arnsten2009',
  'Even quite mild acute uncontrollable stress can cause a rapid and dramatic loss of prefrontal cognitive abilities',
);
const pruessnerDeactivation = cite(
  'pruessner2008',
  'We observed a profound deactivation of limbic system components including hippocampus, hypothalamus, medio-orbitofrontal cortex and anterior cingulate cortex in subjects who reacted to the stressor with a significant increase of the endocrine stress marker cortisol.',
);
const pruessnerCortisol = cite(
  'pruessner2008',
  'the degree of deactivation in the hippocampus was correlated with the release of cortisol in response to the stress task',
);
const ulrichCircuits = cite(
  'ulrichlai2009',
  'These collective stress responses are mediated by largely overlapping circuits in the limbic forebrain, the hypothalamus and the brainstem',
);
const dedovicAxis = cite(
  'dedovic2009',
  'The hypothalamic-pituitary-adrenal (HPA) axis is the major endocrine stress axis of the human organism.',
);

const score = {
  id: 'stress',
  title: 'Acute stress: under pressure',
  description:
    'Being put on the spot: timed, judged, expected to perform. The episode follows the first alert, the shift of resources towards vigilance, the hormone response that follows, and the return to balance. Acute stress is an ordinary response that every brain has, not a condition, so there is no "typical response" to compare it with. This is short-lived stress; long-lasting stress is a different matter and is not shown.',
  caveat:
    'The first step, activity in the insula and the inferior frontal gyrus, is found by two pooled analyses and is the firm part. The rest is less settled. The shift from a control network to a vigilance network and back is a framework its authors propose, built partly on animal work. The hormone step rests on one study, and its finding runs against intuition: in people whose stress hormone rose, the hippocampus, hypothalamus and other regions became less active on the scan, although the hypothalamus is the structure that starts the hormone response. A scan signal going down does not mean every cell in a region is quieter, and the authors propose that the drop is part of how the stress response starts. Scanner stress tasks, such as timed arithmetic with critical feedback, are also a mild stand-in for real pressure.',
  durationSeconds: 36,
  phases: [
    {
      id: 'pressure',
      name: 'Pressure',
      timescale: 'seconds',
      start: 0,
      end: 0.12,
      caption: 'The pressure starts: a task against the clock, with someone judging.',
    },
    {
      id: 'alert',
      name: 'On alert',
      timescale: 'seconds to minutes',
      start: 0.12,
      end: 0.45,
      caption:
        'The front of the insula and the inferior frontal gyrus become active, the finding the two pooled analyses read here agree on, and the ventral striatum, part of the reward system, becomes less active under social pressure. A proposed framework adds that resources shift towards vigilance and away from control regions; that shift is not drawn because the sources read did not measure it.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The pooled analyses average over whole stress tasks lasting minutes and do not say what comes first. Placing these changes at the start follows the proposed framework in which vigilance rises as soon as stress begins.',
      },
    },
    {
      id: 'hormones',
      name: 'Hormone response',
      timescale: 'minutes',
      start: 0.45,
      end: 0.78,
      caption:
        'The stress-hormone system responds. In people whose cortisol rose, one study found the hippocampus, hypothalamus and medial orbitofrontal cortex becoming less active on the scan, the hippocampus most of all in those with the largest hormone rise.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The drop in these regions was measured across the stress task as a whole and related to the hormone rise afterwards. Showing it as a second step, after the first alert, is an inference from the fact that the hormone response is slower than the first reaction.',
      },
    },
    {
      id: 'recovery',
      name: 'Settling',
      timescale: 'tens of minutes to hours',
      start: 0.78,
      end: 1,
      caption:
        'The pressure is over and activity returns towards rest. A proposed framework says the balance between vigilance and control swings back at this point; that has not been timed in people.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The reversal after stress is part of a proposed framework. No source read for this episode timed it in people.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'insula',
        explanation:
          'The front of the insula is active under stress in two separate pooled analyses. One of them found it for both social pressure and physical stressors such as pain; the other covered social pressure only.',
        confidence: 'established',
        citations: [koglerCommon, berretzClusters],
        keyframes: kf(0, 0, 0.12, 0.2, 0.32, 0.8, 0.78, 0.65, 1, 0.1),
      },
      {
        region: 'vlpfc',
        explanation:
          'The inferior frontal gyrus is active under stress in two separate pooled analyses. One of them found it for both social pressure and physical stressors; the other covered social pressure only.',
        confidence: 'established',
        citations: [koglerCommon, berretzClusters],
        keyframes: kf(0, 0, 0.12, 0.2, 0.34, 0.75, 0.78, 0.6, 1, 0.1),
      },
      {
        region: 'nucleus-accumbens',
        explanation:
          'The striatum becomes less active during social stress, and the drop is concentrated in its ventral part, which is drawn here. Physical stressors do the opposite in the dorsal striatum.',
        confidence: 'mixed',
        citations: [koglerStriatum, koglerVentral],
        keyframes: kf(0, 0, 0.12, 0, 0.36, -0.55, 0.78, -0.45, 1, 0),
      },
      {
        region: 'hippocampus',
        explanation:
          'Became less active during social stress in people whose stress hormone rose, and the bigger the hormone rise, the bigger the drop. From one study, read as an abstract, whose authors propose that this reduction is essential for starting the stress response. A pooled analysis notes that findings for the hippocampus under stress have been inconsistent.',
        confidence: 'mixed',
        citations: [pruessnerDeactivation, pruessnerCortisol, koglerInconsistent],
        keyframes: kf(0, 0, 0.3, 0, 0.55, -0.5, 0.78, -0.45, 1, 0),
      },
      {
        region: 'hypothalamus',
        explanation:
          'The starting point of the body\'s main stress-hormone system. The one human study read here found it less active on the scan in people whose stress hormone rose, which is the opposite of what its role would suggest. It is drawn dimmer, following that measurement; a scan signal going down does not show what the hormone-releasing cells themselves are doing.',
        confidence: 'debated',
        citations: [dedovicAxis, ulrichCircuits, pruessnerDeactivation],
        keyframes: kf(0, 0, 0.3, 0, 0.55, -0.5, 0.78, -0.45, 1, 0),
      },
      {
        region: 'vmpfc',
        explanation:
          'The medial orbitofrontal cortex became less active during social stress in people whose stress hormone rose. From one study, read as an abstract, which reported the same for the anterior cingulate. A pooled analysis notes that findings for prefrontal areas under stress have been inconsistent. The three regions from this study are drawn dimming equally; the study does not rank them.',
        confidence: 'mixed',
        citations: [pruessnerDeactivation, koglerInconsistent],
        keyframes: kf(0, 0, 0.3, 0, 0.55, -0.5, 0.78, -0.45, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void hermansShift;
void hermansReverse;
void arnstenLoss;

writeScore(score, {
  indexTitle: 'Acute stress',
  notes: [
    'No typical-response comparison: acute stress is an ordinary response, not a condition.',
    'The recovery phase rests on Hermans et al. 2014 ("After stress subsides, resource allocation to these two networks reverses"), a proposed framework read as an abstract. It is marked reconstructed.',
    'The control regions are not drawn dimming. The proposed shift away from them (Hermans et al. 2014: "at the cost of an executive control network") and the known loss of prefrontal abilities under stress (Arnsten 2009) are described in a caption, but no source read measured the regions themselves becoming less active.',
    'The amygdala is not drawn. The pooled analyses read here did not report it as a consistent finding under stress, although the vigilance-network framework includes it.',
    'The hypothalamus paradox is real in the literature and is left visible: the region that starts the hormone response showed a lower scan signal in the one human study read (Pruessner et al. 2008).',
    'No lines are drawn: none of the sources read reports a specific connection changing under stress.',
    'Read as abstracts only: Berretz 2021, Hermans 2014, Pruessner 2008, Dedovic 2009, Arnsten 2009, Ulrich-Lai & Herman 2009. Read in full: Kogler 2015.',
  ],
});
