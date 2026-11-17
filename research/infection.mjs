// Infection and fever: what the brain does while the body fights an infection.
//   node research/infection.mjs
import { cite, kf, writeScore } from './lib.mjs';

const dantzerCytokines = cite(
  'dantzer2008',
  'In response to a peripheral infection, innate immune cells produce pro-inflammatory cytokines that act on the brain to cause sickness behaviour.',
);
const saperSyndrome = cite(
  'saper2012',
  'a suite of brain-mediated responses called the sickness syndrome occurs, which includes fever, anorexia, sleepiness, hyperalgesia and elevated corticosteroid secretion',
);
const saperProstaglandins = cite(
  'saper2012',
  'Much of the sickness syndrome is mediated by prostaglandins acting on the brain and can be prevented by nonsteroidal anti-inflammatory drugs, such as aspirin or ibuprofen, that block prostaglandin synthesis.',
);
const harrisonInteroceptive = cite(
  'harrison2009sickness',
  'Performance of the Stroop task under inflammation activated brain regions encoding representations of internal bodily state.',
);
const harrisonFatigue = cite(
  'harrison2009sickness',
  'activity within interoceptive brain regions also predicted individual differences in inflammation-associated but not placebo-associated fatigue and confusion',
);
const harrisonInsulaNamed = cite(
  'harrison2009mood',
  'fatigue and psychomotor slowing were associated with corresponding changes in activity within insula (16) and substantia nigra (19)',
);
const brydonPerturbed = cite(
  'brydon2008',
  'Vaccination had no global effect on neurovascular coupling but markedly perturbed neural reactivity within substantia nigra during low-level visual stimulation.',
);
const brydonSlower = cite(
  'brydon2008',
  'Prolonged reaction times and larger interleukin-6 responses were associated with evoked neural activity within substantia nigra.',
);
const harrisonSgacc = cite(
  'harrison2009mood',
  'Inflammation-associated mood deterioration correlated with enhanced activity within subgenual anterior cingulate cortex (sACC) (a region implicated in the etiology of depression) during emotional face processing.',
);
const harrisonConnectivity = cite(
  'harrison2009mood',
  'inflammation-associated mood change reduced connectivity of sACC to amygdala, medial prefrontal cortex, nucleus accumbens, and superior temporal sulcus, which was modulated by peripheral interleukin-6',
);
const eisenbergerReward = cite(
  'eisenberger2010',
  'subjects exposed to endotoxin, compared with placebo, showed greater increases in self-reported and observer-rated depressed mood over time, as well as significant reductions in VS activity to monetary reward cues',
);
const kraynakConsistent = cite(
  'kraynak2018',
  'revealed consistent effects in the amygdala, hippocampus, hypothalamus, striatum, insula, midbrain, and brainstem, as well as prefrontal and temporal cortices',
);

const score = {
  id: 'infection',
  title: 'Infection: why being ill feels the way it does',
  description:
    'When the body fights an infection such as flu, the tiredness, slowness, low mood and loss of interest are not just side effects. They are produced by the brain in response to signals from the immune system. The episode follows what has been measured in healthy volunteers given a vaccine or a small dose of a bacterial substance that sets off a mild, safe immune response. There is no "typical response" to compare with: this is the typical response.',
  caveat:
    'These studies use a mild immune challenge in healthy volunteers and scan them about two hours later. That is a stand-in for a real infection. In the vaccine study, body temperature did not rise. Fever itself is part of the same brain-directed response, but the sources read do not name the brain region that sets body temperature, so nothing is drawn for it. Most findings come from two small groups of volunteers, sixteen men in one and thirty-nine people in the other, and several were seen only while people did a particular task in the scanner. A pooled analysis confirms that inflammation goes with changes in these regions but, in the part read, does not say in which direction. How the brain recovers as the infection clears was not studied.',
  durationSeconds: 36,
  phases: [
    {
      id: 'signal',
      name: 'The alarm is raised',
      timescale: 'the first hours',
      start: 0,
      end: 0.2,
      caption:
        'Immune cells meet the infection and release signalling molecules that act on the brain. The brain then produces the sickness response: fever, sleepiness, loss of appetite, aching. No brain region is drawn changing yet, because the sources read do not say where this first step happens in people.',
    },
    {
      id: 'ill',
      name: 'Tired and slowed',
      timescale: 'two to three hours in the studies',
      start: 0.2,
      end: 0.5,
      caption:
        'Tiredness, fogginess and slower reactions set in. Regions that represent the state of the body, including the insula, become more active, and activity changes in the substantia nigra, deep in the midbrain, go with slower reactions.',
      order: {
        kind: 'reconstructed',
        rationale:
          'Volunteers were scanned once, two hours after the injection, and their mood and tiredness were asked about at two and three hours. The split into separate steps is a way of presenting those findings, not a measured sequence.',
      },
    },
    {
      id: 'mood',
      name: 'Low mood, less pleasure',
      timescale: 'two to three hours in the studies',
      start: 0.5,
      end: 0.8,
      caption:
        'Mood drops and things feel less rewarding. The more mood fell, the more active the subgenual cingulate was, and the less it worked together with the amygdala, the medial prefrontal cortex and the nucleus accumbens. The ventral striatum responded less to the prospect of a reward.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The mood drop was significant at three hours, an hour after the scan. Placing it after the tiredness is a way of presenting the findings; the studies did not time the two against each other.',
      },
    },
    {
      id: 'recovery',
      name: 'Getting better',
      timescale: 'days (not studied)',
      start: 0.8,
      end: 1,
      caption: 'The infection clears and the sickness response fades. How the brain returns to normal was not studied in the sources read; this last part is an assumption.',
      order: {
        kind: 'reconstructed',
        rationale: 'No source read followed volunteers through recovery. The return to rest is assumed.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'insula',
        explanation:
          'Regions that represent the internal state of the body became more active under inflammation while volunteers did a demanding task, and their activity predicted how tired and foggy each person felt. The abstract of that study does not name the regions; a companion paper by the same group names the insula. A pooled analysis lists the insula among regions consistently affected by inflammation.',
        confidence: 'mixed',
        citations: [harrisonInteroceptive, harrisonFatigue, harrisonInsulaNamed, kraynakConsistent],
        keyframes: kf(0, 0, 0.2, 0, 0.4, 0.6, 0.8, 0.6, 1, 0),
      },
      {
        region: 'sgacc',
        explanation:
          'The more a volunteer\'s mood fell after vaccination, the more active this region was while they looked at emotional faces. The region is one implicated in depression, and the authors take this to suggest a shared basis for low mood in illness and in depression. From one study of sixteen men. It is drawn as a modest rise for simplicity: the study found this only as a link with how far each person\'s mood fell, not as an average change across everyone.',
        confidence: 'mixed',
        citations: [harrisonSgacc],
        keyframes: kf(0, 0, 0.45, 0, 0.64, 0.3, 0.8, 0.3, 1, 0),
      },
      {
        region: 'nucleus-accumbens',
        explanation:
          'Drawn on the nucleus accumbens, the main part of the ventral striatum. The finding is a weaker response to the prospect of a reward, not lower activity at rest. The ventral striatum responded less to signs of a coming reward in people given a mild immune challenge than in people given a placebo, and that weaker response accounted for part of their drop in mood. From one study of thirty-nine people. A pooled analysis lists the striatum among regions consistently affected by inflammation.',
        confidence: 'mixed',
        citations: [eisenbergerReward, kraynakConsistent],
        keyframes: kf(0, 0, 0.45, 0, 0.64, -0.55, 0.8, -0.55, 1, 0),
      },
    ],
    connections: [
      {
        from: 'sgacc',
        to: 'amygdala-r',
        explanation: 'The more mood fell under inflammation, the less the subgenual cingulate worked together with the amygdala; in the full paper this is the right amygdala. Found as a link with how far mood fell, not as an average change. From one study of sixteen men.',
        confidence: 'mixed',
        citations: [harrisonConnectivity],
        keyframes: kf(0, 0, 0.5, 0, 0.66, -0.6, 0.8, -0.6, 1, 0),
      },
      {
        from: 'sgacc',
        to: 'mpfc',
        explanation: 'The more mood fell under inflammation, the less the subgenual cingulate worked together with the medial prefrontal cortex. Found as a link with how far mood fell, not as an average change. From one study of sixteen men.',
        confidence: 'mixed',
        citations: [harrisonConnectivity],
        keyframes: kf(0, 0, 0.5, 0, 0.66, -0.6, 0.8, -0.6, 1, 0),
      },
      {
        from: 'sgacc',
        to: 'nucleus-accumbens',
        explanation: 'The more mood fell under inflammation, the less the subgenual cingulate worked together with the nucleus accumbens. Found as a link with how far mood fell, not as an average change. From one study of sixteen men.',
        confidence: 'mixed',
        citations: [harrisonConnectivity],
        keyframes: kf(0, 0, 0.5, 0, 0.66, -0.6, 0.8, -0.6, 1, 0),
      },
    ],
  },
  typical: null,
};

void brydonPerturbed;
void brydonSlower;
void dantzerCytokines;
void saperSyndrome;
void saperProstaglandins;

writeScore(score, {
  indexTitle: 'Infection: feeling ill',
  category: 'physical',
  notes: [
    'The substantia nigra is not drawn. Brydon et al. 2008 report its reactivity as "markedly perturbed" and its activity as "associated with" slower reactions, without a direction that could be shown. It is mentioned in a caption.',
    'The state is listed as "Infection: feeling ill", not "Infection and fever", because fever is not shown.',
    'Fever is not drawn. Saper et al. 2012 (abstract) say the sickness syndrome "includes fever, anorexia, sleepiness, hyperalgesia and elevated corticosteroid secretion" and that "Much of the sickness syndrome is mediated by prostaglandins acting on the brain", but the abstract names no brain region, and the volunteer studies used a challenge too mild to cause fever. The full text could not be downloaded.',
    'The first phase draws no region. Dantzer et al. 2008 (abstract): "innate immune cells produce pro-inflammatory cytokines that act on the brain to cause sickness behaviour", without saying where.',
    'The hypothalamus, amygdala, hippocampus and brainstem are listed by the pooled analysis (Kraynak et al. 2018) as consistently affected by inflammation, but the abstract gives no direction, so they are not drawn.',
    'No typical-response comparison: the volunteers were healthy, so this is the ordinary response. Each study compared the immune challenge with a placebo in the same or similar people.',
    'The two Harrison 2009 papers and Brydon 2008 each describe sixteen healthy men given typhoid vaccination and appear to report the same volunteers, so they are not three independent confirmations.',
    'Read in full: Harrison 2009 (mood). All others read as abstracts only.',
  ],
});
