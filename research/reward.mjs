// Joy and reward: expecting something good, getting it, and enjoying it.
//   node research/reward.mjs
import { cite, kf, writeScore } from './lib.mjs';

const oldhamAnticipation = cite(
  'oldham2018',
  'The result of reward anticipation (contrast RA) revealed a large cluster of brain regions around the striatal‐thalamic regions of the brain, encompassing the ventral, including the nucleus accumbens (NAcc), and the dorsal striatum, extending to the bilateral amygdala',
);
const oldhamOutcome = cite(
  'oldham2018',
  'the contrast of reward outcome (contrast RO) showed a large cluster in the ventral striatum which extended into the subcallosal, followed by another large cluster in the OFC/vmPFC, and a smaller clusters in the dorsal PCC and amygdala cortex',
);
const oldhamWaitVsOutcome = cite(
  'oldham2018',
  'for (i) reward anticipation versus reward receipt (contrast RA‐RO), activity of the caudate/dorsal striatum, supplementary motor area, thalamus and right anterior insula',
);
const berridgeActivated = cite('berridge2015', 'mesolimbic dopamine systems that are activated by many reward-related stimuli');
const oldhamNoVmpfc = cite(
  'oldham2018',
  'The anticipation of an outcome did not recruit the OFC/vmPFC area in our study, which contrasts previous results',
);
const oldhamLoss = cite(
  'oldham2018',
  'loss anticipation (contrast LA) also showed a cluster of increased likelihood of activation in striatal‐thalamic‐amygdala regions',
);
const bartraValue = cite(
  'bartra2013',
  'In a second set of areas, including ventromedial prefrontal cortex and anterior ventral striatum, positive effects predominate.',
);
const bartraPcc = cite(
  'bartra2013',
  'SV effects in VMPFC and PCC appear predominantly positive, whereas DMPFC and bilateral anterior insula showed a mixture of positive and negative effects.',
);
const sescousseCommon = cite(
  'sescousse2013',
  'Those three rewards robustly engaged a common brain network including the ventromedial prefrontal cortex, ventral striatum, amygdala, anterior insula and mediodorsal thalamus',
);
const lindquistGeneral = cite(
  'lindquist2016',
  'valence is flexibly implemented across instances by a set of valence-general limbic and paralimbic brain regions',
);
const berridgeDopamine = cite(
  'berridge2015',
  'dopamine is not actually needed for the hedonic impact of food pleasure, but rather only for their incentive motivation value',
);
const berridgeMesolimbic = cite(
  'berridge2015',
  'The mesolimbic system contains dopamine neurons originating in or near the ventral tegmental area (VTA) of the midbrain, which chiefly ascend to the NAc or ventral striatum, as well as to amygdala, prefrontal cortex and neostriatum.',
);
const berridgeAnimals = cite(
  'berridge2015',
  'Subcortically, there is evidence from other animals that such selective hedonic changes also may be tracked by activity in nucleus accumbens and ventral pallidum',
);
const berridgeOfc = cite(
  'berridge2015',
  'Activation of the human orbitofrontal cortex to a liquid food stimulus is correlated with its subjective pleasantness.',
);

const score = {
  id: 'reward',
  title: 'Joy and reward: expecting something good and getting it',
  description:
    'A sign that something good is coming, the wait, the moment it arrives, and the enjoyment of it. This is the best-mapped positive state in brain research, mostly because it can be produced in a scanner by letting people win small amounts of money. It is an ordinary state, not a condition, so there is no "typical response" to compare it with.',
  caveat:
    'Most of this comes from one kind of experiment: people in a scanner see a cue, wait, and then win or do not win money, food or other rewards. That is a narrow slice of what people mean by joy. The split into wanting and enjoying comes from researchers who argue that the two rely on different brain mechanisms; the evidence for where enjoyment itself is generated is mainly from animals. None of the regions shown is a "pleasure centre": the same striatal, thalamic and amygdala regions also respond when people expect a loss, and a large pooled analysis of positive and negative feeling found that the same limbic regions serve both.',
  durationSeconds: 32,
  phases: [
    {
      id: 'cue',
      name: 'A promise',
      timescale: 'a second or two',
      start: 0,
      end: 0.12,
      caption: 'A sign that something good may be on its way. Dopamine neurons in the midbrain respond to reward-related signals and send their output up to the striatum; this first step is known mainly from animals.',
    },
    {
      id: 'anticipation',
      name: 'Looking forward',
      timescale: 'seconds',
      start: 0.12,
      end: 0.45,
      caption:
        'The wait. A group of deep regions is active together: the striatum, including the nucleus accumbens, the thalamus and the amygdala, along with the front of the insula. This is wanting, not yet enjoying.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The scanner task does not separate the cue from the wait, and the midbrain step rests on anatomy and animal work. Showing the cue first is an inference.',
      },
    },
    {
      id: 'outcome',
      name: 'It arrives',
      timescale: 'seconds',
      start: 0.45,
      end: 0.72,
      caption:
        'The good thing happens. The ventral striatum responds again, now joined by the orbitofrontal and ventromedial prefrontal cortex, which track how much something is worth, and the posterior cingulate.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The wait comes before the outcome because the task is built that way, and the pooled analysis reports the two parts separately. No source timed the regions against each other.',
      },
    },
    {
      id: 'enjoyment',
      name: 'Enjoying it',
      timescale: 'seconds to minutes',
      start: 0.72,
      end: 1,
      caption:
        'The pleasure itself. In people, activity in the orbitofrontal cortex goes with how pleasant something feels. Where pleasure is generated is known mainly from animals, and it is not the dopamine system: dopamine drives wanting more than enjoying.',
      order: {
        kind: 'reconstructed',
        rationale:
          'Scanner studies separate the wait from the outcome but not the outcome from the enjoyment that follows. Showing enjoyment as its own later step is an inference from the argument that wanting and enjoying are different processes.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'vta',
        explanation:
          'The midbrain source of the dopamine neurons that run up to the nucleus accumbens. This system is activated by reward-related signals. Evidence for what it does comes mainly from animals; it is too small to measure reliably in most human scans, and its rise at the cue is drawn on that basis. It was long described as the brain\'s pleasure system, but the researchers cited here argue that dopamine is needed for wanting a reward, not for enjoying it.',
        confidence: 'debated',
        citations: [berridgeMesolimbic, berridgeActivated, berridgeDopamine],
        keyframes: kf(0, 0, 0.06, 0.6, 0.3, 0.5, 0.5, 0.5, 0.75, 0.2, 1, 0),
      },
      {
        region: 'nucleus-accumbens',
        explanation:
          'The ventral striatum, active both while people wait for a reward and when it arrives. This is the most consistent finding in reward research. It is not specific to good things: a similar cluster responds when people expect a loss. In other animals, activity here may also track how much a taste is liked.',
        confidence: 'established',
        citations: [oldhamAnticipation, oldhamOutcome, sescousseCommon, oldhamLoss, berridgeAnimals],
        keyframes: kf(0, 0, 0.1, 0.3, 0.3, 0.85, 0.45, 0.7, 0.55, 0.9, 0.75, 0.5, 1, 0.1),
      },
      {
        region: 'caudate',
        explanation:
          'The dorsal striatum is active together with the ventral striatum while people wait for a reward, and more during the wait than at the outcome. From one pooled analysis, which names the caudate; the putamen, the other part of the dorsal striatum, is not named separately and is not drawn.',
        confidence: 'mixed',
        citations: [oldhamAnticipation, oldhamWaitVsOutcome],
        keyframes: kf(0, 0, 0.12, 0.2, 0.32, 0.65, 0.5, 0.4, 0.75, 0.1, 1, 0),
      },
      {
        region: 'thalamus',
        explanation:
          'Part of the deep cluster active while people wait for a reward, and part of the network that responds when money, food or erotic rewards arrive. It responds to expected losses too.',
        confidence: 'established',
        citations: [oldhamAnticipation, oldhamWaitVsOutcome, sescousseCommon, oldhamLoss],
        keyframes: kf(0, 0, 0.12, 0.2, 0.32, 0.6, 0.55, 0.4, 0.75, 0.15, 1, 0),
      },
      {
        region: 'amygdala',
        explanation:
          'Active while people wait for a reward and when it arrives. The amygdala is often thought of as a fear region, but it responds to things that matter, good or bad: the same cluster appears when people expect a loss.',
        confidence: 'established',
        citations: [oldhamAnticipation, oldhamOutcome, sescousseCommon, oldhamLoss, lindquistGeneral],
        keyframes: kf(0, 0, 0.12, 0.2, 0.32, 0.55, 0.5, 0.4, 0.6, 0.55, 0.8, 0.15, 1, 0),
      },
      {
        region: 'vmpfc',
        explanation:
          'Active when a reward arrives, and across many studies its activity rises with how much something is worth to the person. One pooled analysis found it only at the outcome and not during the wait, against earlier results, so it is drawn rising at the outcome.',
        confidence: 'established',
        citations: [oldhamOutcome, bartraValue, sescousseCommon, oldhamNoVmpfc],
        keyframes: kf(0, 0, 0.45, 0.05, 0.56, 0.8, 0.75, 0.6, 1, 0.15),
      },
      {
        region: 'ofc',
        explanation:
          'Active when a reward arrives. In people, activity here goes with how pleasant something is reported to feel. Whether it generates the pleasure or reads it out is not settled.',
        confidence: 'mixed',
        citations: [oldhamOutcome, berridgeOfc],
        keyframes: kf(0, 0, 0.45, 0.05, 0.58, 0.7, 0.8, 0.7, 1, 0.25),
      },
      {
        region: 'pcc-precuneus',
        explanation:
          'A smaller cluster in the posterior cingulate is active when a reward arrives, and its activity rises with how much something is worth. Drawn on the posterior cingulate and precuneus together, which is larger than the finding.',
        confidence: 'established',
        citations: [oldhamOutcome, bartraPcc],
        keyframes: kf(0, 0, 0.45, 0, 0.58, 0.45, 0.8, 0.3, 1, 0),
      },
      {
        region: 'insula',
        explanation:
          'The front of the insula is more active during the wait than at the outcome, on the right side, and is also part of the network that responds when rewards arrive. It is not specific to good things: its activity shows a mixture of positive and negative effects of value.',
        confidence: 'mixed',
        citations: [oldhamWaitVsOutcome, sescousseCommon, bartraPcc, lindquistGeneral],
        keyframes: kf(0, 0, 0.12, 0.15, 0.32, 0.55, 0.55, 0.4, 0.85, 0.25, 1, 0.05),
      },
    ],
    connections: [
      {
        from: 'vta',
        to: 'nucleus-accumbens',
        explanation:
          'The mesolimbic dopamine pathway, running from the midbrain up to the nucleus accumbens. This is a real nerve pathway, known from anatomy; its strength over the episode is drawn to follow the wanting phase, on evidence mainly from animals, and is not a measurement.',
        confidence: 'debated',
        citations: [berridgeMesolimbic, berridgeDopamine],
        keyframes: kf(0, 0, 0.06, 0.5, 0.3, 0.8, 0.5, 0.6, 0.75, 0.2, 1, 0),
      },
    ],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Joy and reward',
  notes: [
    'No typical-response comparison: this is an ordinary state, not a condition.',
    'The episode covers reward as studied in scanners (cue, wait, outcome). Joy in the wider sense, such as contentment or shared happiness, is not well mapped and is not claimed here.',
    'The claim that pleasure itself is generated in small "hotspots" in the nucleus accumbens and ventral pallidum rests on animal work (Berridge & Kringelbach 2015: "there is evidence from other animals that such selective hedonic changes also may be tracked by activity in nucleus accumbens and ventral pallidum"). It is mentioned in the text and not drawn as a separate region; the ventral pallidum is not in the brain model.',
    'The connection from the ventral tegmental area to the nucleus accumbens is an anatomical pathway, unlike the other lines in the app, which stand for correlated activity.',
    'Read as abstract only: Sescousse et al. 2013.',
  ],
});
