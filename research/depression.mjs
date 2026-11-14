// Depression: a setback, turning inward, and a loop that is hard to leave.
//   node research/depression.mjs
import { cite, kf, writeScore } from './lib.mjs';

const hamiltonSgRest = cite(
  'hamilton2015',
  'while there is reliably increased regional cerebral blood flow in sgPFC in MDD, no such abnormality has been reliably observed in nodes of the DMN',
);
const hamiltonConnectivity = cite(
  'hamilton2015',
  'depressed individuals are characterized by reliably increased connectivity of the sgPFC and the MDT with the DMN, where levels of connectivity between the sgPFC and DMN in MDD often predict levels of rumination in depression',
);
const drevetsPhase = cite(
  'drevets2008',
  'researchers consistently show that the sgACC metabolism is elevated in the depressed phase relative to the remitted phase of the same MDD subjects',
);
const kaiserDefault = cite(
  'kaiser2015',
  'MDD was also associated with hyperconnectivity within the default network (DN), a network believed to support internally-oriented and self-referential thought',
);
const kaiserControl = cite(
  'kaiser2015',
  'MDD was characterized by hypoconnectivity within the frontoparietal network (FN), a set of regions involved in cognitive control of attention and emotion regulation',
);
const yanReduced = cite(
  'yan2019',
  'we found decreased default mode network functional connectivity in depressed patients, driven by patients with recurrent depression, and associated with current medication treatment but not with disease duration',
);
const hamiltonNegative = cite(
  'hamilton2012',
  'The analysis of neural response studies using negative stimuli showed greater response in the amygdala, insula, and dorsal anterior cingulate cortex and lower response in the dorsal striatum and dorsolateral prefrontal cortex in individuals with major depressive disorder than in healthy subjects.',
);
const mullerNull = cite(
  'muller2017',
  'Overall analyses across cognitive processing experiments (P > .29) and across emotional processing experiments (P > .47) revealed no significant results.',
);
const kerenReward = cite(
  'keren2018',
  'Analysis of fMRI studies revealed significantly reduced striatal activation in depressed compared with healthy individuals during reward feedback.',
);
const zhouRumination = cite(
  'zhou2020',
  'Results confirm the suspected association between rumination and DMN activation, specifically implicating the DMN core regions and the dorsal medial prefrontal cortex subsystem.',
);
const ruoccoHealthy = cite(
  'ruocco2013',
  'Healthy control subjects activated a well-characterized network of brain regions associated with processing negative emotions that included the anterior cingulate cortex and amygdala.',
);

const score = {
  id: 'depression',
  title: 'Depression: a setback and the loop that follows',
  description:
    'During a depressive episode, something goes wrong: a setback, or a painful thought about oneself. The episode follows what happens next: a stronger response to the bad news, a turn inward into going over it again and again, and difficulty leaving that loop. The typical response shows the same setback in a brain that is not depressed. Unlike the other states, this one does not start from a neutral baseline: some differences are already there at rest.',
  caveat:
    'Depression is not a spike but a state lasting weeks or months, and no scan has followed a ruminating brain through a loop over minutes or hours. What the research gives is separate snapshots: how the depressed brain differs at rest, how it responds to negative pictures and to rewards, and which regions are active when healthy volunteers are asked to ruminate. Stitching these into "setback, then turning inward, then staying stuck" is a reconstruction, and the order of every step is inferred. The picture is also contested: one large pooled analysis found no consistent differences in brain activity at all, and the largest study of resting connectivity found the default mode network less connected in depression, not more, mainly in people with recurrent depression and those on medication. Depression also varies widely between people.',
  durationSeconds: 44,
  phases: [
    {
      id: 'rest',
      name: 'At rest',
      timescale: 'the background state, over weeks',
      start: 0,
      end: 0.12,
      caption:
        'Before anything happens, there are already differences. The subgenual cingulate, deep in the front of the brain, is more active at rest, and it is more tightly linked to the network the brain uses for self-focused thought.',
      typicalCaption: 'Before anything happens: an ordinary resting brain, active but in balance.',
    },
    {
      id: 'setback',
      name: 'A setback',
      timescale: 'seconds',
      start: 0.12,
      end: 0.32,
      caption:
        'Something goes wrong. The amygdala, insula and dorsal anterior cingulate respond more strongly to the bad news than in a brain that is not depressed, and the dorsolateral prefrontal cortex, a control region, responds less.',
      typicalCaption: 'Something goes wrong. The amygdala and anterior cingulate respond, as they do to anything negative.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The studies compare the response to negative pictures with the response to neutral ones. Using that as "the moment of a setback" in a continuous episode is an inference.',
      },
    },
    {
      id: 'inward',
      name: 'Turning inward',
      timescale: 'minutes',
      start: 0.32,
      end: 0.64,
      caption:
        'Attention turns inward, to going over what happened and what it says about oneself. The default mode network, the regions active in self-focused thought, comes forward, working closely with the subgenual cingulate.',
      typicalCaption: 'A few moments of going over what happened. The same self-focused network is active here too; rumination is something every brain does.',
      order: {
        kind: 'reconstructed',
        rationale:
          'That rumination follows a negative event is how rumination is defined, not something measured in a scanner. The regions come from studies in which healthy volunteers were asked to ruminate.',
      },
    },
    {
      id: 'stuck',
      name: 'Staying there',
      timescale: 'minutes to hours, recurring over weeks',
      start: 0.64,
      end: 1,
      caption:
        'The loop is hard to leave, and comes round again. Meanwhile good things land more faintly: the striatum, part of the reward system, responds less when something goes well.',
      typicalCaption: 'Attention returns to the outside world and the brain settles back to rest.',
      order: {
        kind: 'reconstructed',
        rationale:
          'That rumination lasts longer and recurs in depression is a clinical observation. No brain scan has followed a loop over hours, so its persistence here is assumed from behaviour, and the blunted reward response comes from separate studies of winning and losing.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'sgacc',
        explanation:
          'More active at rest during depression than in people who are not depressed, and more active in the depressed phase than after recovery in the same people. This is among the most consistent findings in depression research.',
        confidence: 'established',
        citations: [hamiltonSgRest, drevetsPhase],
        keyframes: kf(0, 0.45, 0.32, 0.5, 0.5, 0.7, 0.64, 0.6, 0.8, 0.7, 1, 0.5),
      },
      {
        region: 'amygdala',
        explanation:
          'Responds more strongly to negative material than in people who are not depressed, in one pooled analysis. A later, larger pooled analysis found no consistent differences in brain activity in depression at all.',
        confidence: 'mixed',
        citations: [hamiltonNegative, mullerNull],
        keyframes: kf(0, 0, 0.12, 0.05, 0.24, 0.75, 0.45, 0.45, 0.7, 0.35, 1, 0.25),
      },
      {
        region: 'insula',
        explanation:
          'Responds more strongly to negative material than in people who are not depressed, in one pooled analysis. A later, larger pooled analysis found no consistent differences.',
        confidence: 'mixed',
        citations: [hamiltonNegative, mullerNull],
        keyframes: kf(0, 0, 0.12, 0.05, 0.26, 0.65, 0.5, 0.4, 1, 0.25),
      },
      {
        region: 'dacc',
        explanation:
          'Responds more strongly to negative material than in people who are not depressed, in one pooled analysis. A later, larger pooled analysis found no consistent differences.',
        confidence: 'mixed',
        citations: [hamiltonNegative, mullerNull],
        keyframes: kf(0, 0, 0.12, 0.05, 0.26, 0.6, 0.5, 0.35, 1, 0.2),
      },
      {
        region: 'dlpfc',
        explanation:
          'A control region that responds less to negative material than in people who are not depressed. At rest, the wider control network it belongs to is also less tightly connected. A later, larger pooled analysis of activity found no consistent differences.',
        confidence: 'mixed',
        citations: [hamiltonNegative, kaiserControl, mullerNull],
        keyframes: kf(0, -0.15, 0.12, -0.15, 0.28, -0.55, 0.64, -0.45, 1, -0.35),
      },
      {
        region: 'mpfc',
        explanation:
          'Part of the default mode network, active during rumination in studies of healthy volunteers. In depression this network is not reliably more active at rest; what differs is how it is connected. Its staying active for longer here is assumed from how long rumination lasts in depression, not measured.',
        confidence: 'mixed',
        citations: [zhouRumination, hamiltonSgRest],
        keyframes: kf(0, 0, 0.32, 0.1, 0.44, 0.7, 0.54, 0.5, 0.64, 0.75, 0.74, 0.5, 0.86, 0.7, 1, 0.55),
      },
      {
        region: 'pcc-precuneus',
        explanation:
          'A core part of the default mode network, active during rumination in studies of healthy volunteers. Its staying active for longer here is assumed from how long rumination lasts in depression, not measured.',
        confidence: 'mixed',
        citations: [zhouRumination, hamiltonSgRest],
        keyframes: kf(0, 0, 0.32, 0.1, 0.46, 0.65, 0.56, 0.45, 0.66, 0.7, 0.76, 0.45, 0.88, 0.65, 1, 0.5),
      },
      {
        region: 'nucleus-accumbens',
        explanation:
          'The striatum, part of the reward system, responds less in depression when something good happens, in a pooled analysis of reward studies. It is drawn here on the nucleus accumbens, the striatum\'s lower front part; the finding is for the striatum more broadly. A separate pooled analysis found no consistent differences for positive material.',
        confidence: 'mixed',
        citations: [kerenReward, mullerNull],
        keyframes: kf(0, -0.2, 0.64, -0.25, 0.8, -0.6, 1, -0.4),
      },
    ],
    connections: [
      {
        from: 'sgacc',
        to: 'mpfc',
        explanation:
          'The subgenual cingulate is more tightly linked to the default mode network in depression, and the tighter the link, the more a person tends to ruminate. The largest study of resting connectivity found the opposite within the default mode network: less connection, mainly in recurrent depression and with medication.',
        confidence: 'mixed',
        citations: [hamiltonConnectivity, yanReduced],
        keyframes: kf(0, 0.4, 0.32, 0.45, 0.5, 0.85, 0.64, 0.7, 0.82, 0.85, 1, 0.6),
      },
      {
        from: 'sgacc',
        to: 'pcc-precuneus',
        explanation:
          'The subgenual cingulate is more tightly linked to the default mode network in depression, and the tighter the link, the more a person tends to ruminate. The largest study of resting connectivity found less connection within the default mode network, not more.',
        confidence: 'mixed',
        citations: [hamiltonConnectivity, yanReduced],
        keyframes: kf(0, 0.4, 0.32, 0.45, 0.5, 0.85, 0.64, 0.7, 0.82, 0.85, 1, 0.6),
      },
      {
        from: 'mpfc',
        to: 'pcc-precuneus',
        explanation:
          'A pooled analysis found the default mode network more tightly connected within itself in depression. The largest single study since found it less connected, mainly in people with recurrent depression and those taking medication. Both are shown in the sources; the line is drawn for the earlier, pooled finding.',
        confidence: 'debated',
        citations: [kaiserDefault, yanReduced],
        keyframes: kf(0, 0.3, 0.32, 0.35, 0.5, 0.6, 1, 0.45),
      },
    ],
  },
  typical: {
    regions: [
      {
        region: 'amygdala',
        explanation: 'Responds to something negative, as part of the ordinary response, and settles.',
        confidence: 'established',
        citations: [ruoccoHealthy],
        keyframes: kf(0, 0, 0.12, 0.05, 0.24, 0.45, 0.45, 0.15, 0.7, 0, 1, 0),
      },
      {
        region: 'dacc',
        explanation: 'The anterior cingulate responds to something negative, as part of the ordinary response, and settles.',
        confidence: 'established',
        citations: [ruoccoHealthy],
        keyframes: kf(0, 0, 0.12, 0.05, 0.26, 0.4, 0.5, 0.15, 0.7, 0, 1, 0),
      },
      {
        region: 'mpfc',
        explanation:
          'Active when healthy volunteers are asked to ruminate. That the activity ends sooner than in depression is assumed from behaviour, not measured.',
        confidence: 'mixed',
        citations: [zhouRumination],
        keyframes: kf(0, 0, 0.32, 0.1, 0.44, 0.55, 0.6, 0.25, 0.75, 0.05, 1, 0),
      },
      {
        region: 'pcc-precuneus',
        explanation:
          'Active when healthy volunteers are asked to ruminate. That the activity ends sooner than in depression is assumed from behaviour, not measured.',
        confidence: 'mixed',
        citations: [zhouRumination],
        keyframes: kf(0, 0, 0.32, 0.1, 0.46, 0.5, 0.62, 0.2, 0.76, 0.05, 1, 0),
      },
    ],
    connections: [],
  },
};

writeScore(score, {
  indexTitle: 'Depression',
  notes: [
    'The design hypothesis "default mode network over-engaged" is only half supported. Hamilton et al. (2015) report that the default mode network is not reliably more active at rest in depression; the reliable differences are the subgenual cingulate\'s activity and its connectivity with that network. The episode follows that.',
    'Contrary evidence is cited on the tracks it bears on: Müller et al. (2017) found no convergent activity differences across 99 experiments; Yan et al. (2019, 1,300 patients) found reduced, not increased, default mode connectivity.',
    'The "loop that fails to exit" is the least supported part. No source measured rumination persisting in the scanner; it is marked reconstructed in the timeline and stated as an assumption in the affected regions.',
    'The reward finding is for "striatal activation" (Keren et al. 2018). The atlas build has no caudate or putamen, so it is drawn on the nucleus accumbens and the text says so.',
    'The typical variant has few regions: the sources report differences between groups, and only the ordinary response to negative material and rumination in healthy volunteers could be cited directly.',
    'Read as abstract only: Zhou 2020 (and Ruocco 2013, used for the typical response).',
  ],
});
