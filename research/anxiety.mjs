// Anxiety: the response to a possible threat, in an anxiety disorder and in a typical brain.
//   node research/anxiety.mjs
import { cite, kf, writeScore } from './lib.mjs';

const etkinPatients = cite(
  'etkin2007',
  'Patients with any of the three disorders consistently showed greater activity than matched comparison subjects in the amygdala and insula',
);
const etkinHealthy = cite('etkin2007', 'we also observed consistent amygdala activation during fear conditioning in healthy subjects');
const chavanneBoth = cite(
  'chavanne2021',
  'both showed increased activation in the bilateral insula (xyz=44,14,-14 and xyz=-38,20,-8;k=2102 and k=1305 respectively) and cingulate cortex/medial prefrontal cortex',
);
const chavanneAmygdala = cite(
  'chavanne2021',
  'our results for the most part did not reflect amygdala activation or deactivation, which are often reported in region-of-interest analyses only',
);
const mendezFast = cite(
  'mendez2016',
  'fast amygdala responses, beginning 74-ms post-stimulus onset, to fearful, but not neutral or happy, facial expressions',
);
const pessoaAlternative = cite(
  'pessoa2010',
  'we propose an alternative view that assigns a larger role to cortical processing of affective visual information',
);
const shackmanTimecourse = cite(
  'shackman2016',
  'the BST shows a persistent hemodynamic response during the uncertain anticipation of noxious reinforcers, such as shock or aversive images, whereas the dorsal amygdala shows more transient responses',
);
const shackmanBoth = cite(
  'shackman2016',
  'metabolic activity in both the amygdala and the BST is associated with heightened signs of fear and anxiety',
);
const averyRodent = cite(
  'avery2016',
  'Rodent studies provide compelling evidence that the BNST plays a central role in sustained threat monitoring, a form of adaptive anxiety, and in the withdrawal and relapse stages of addiction; however, little is known about the role of BNST in humans.',
);
const buhleControl = cite(
  'buhle2014',
  'the implementation of reappraisal consistently activated cognitive control regions, including dmPFC, dlPFC, vlPFC, and posterior parietal lobe',
);
const buhleAmygdala = cite(
  'buhle2014',
  'reappraisal was consistently associated with bilateral amygdala modulation, but no change was observed in other regions related to emotional responding',
);
const picoLess = cite(
  'pico2017',
  'patients with mood and anxiety disorders recruited the regulatory fronto-parietal network involved in cognitive reappraisal to a lesser extent in comparison to healthy controls',
);
const picoInsula = cite(
  'pico2017',
  'they presented increased activation in regions that may be associated with the emotional experience (i.e., insula, cerebellum, precentral and inferior occipital gyri)',
);
const kimCoupling = cite(
  'kim2011',
  'functional coupling of the amygdala and vmPFC at rest, predicts beneficial outcomes in terms of reported anxiety',
);
const kimSad = cite(
  'kim2011',
  'SAD patients had markedly reduced functional connectivity between the left amygdala and the medial orbitofrontal cortex',
);

const score = {
  id: 'anxiety',
  title: 'Anxiety: responding to a possible threat',
  description:
    'Something that might be a threat appears, and it stays uncertain for a while. The episode follows the response in a brain with an anxiety disorder; the typical response shows the same moment in a brain without one. The same regions take part in both. What the research supports is a difference in how strongly some of them respond and in how much the control regions step in. Whether the response also lasts longer in an anxiety disorder was not covered by the sources read, so the two brains follow the same time course here.',
  caveat:
    'The findings come from different kinds of study that were never run as one experiment: group comparisons of people with social anxiety, phobia, PTSD and other anxiety disorders; studies of healthy volunteers waiting for an unpredictable shock; recordings from electrodes in the amygdala; and studies where people were asked to rethink an upsetting image. Joining them into one continuous episode is a reconstruction. "Anxiety disorder" here is an average over several different diagnoses, which differ from one another. The hypothalamus and the body\'s stress hormones are left out because none of the sources read for this episode measured them in people.',
  durationSeconds: 36,
  phases: [
    {
      id: 'trigger',
      name: 'A possible threat',
      timescale: 'a fraction of a second',
      start: 0,
      end: 0.14,
      caption:
        'Something that might be a threat appears. The amygdala is among the first regions to react, possibly within a fraction of a second; how fast, and by what route, is disputed.',
      typicalCaption:
        'Something that might be a threat appears. The amygdala is among the first regions to react here too: this first response is ordinary.',
    },
    {
      id: 'alarm',
      name: 'Alarm',
      timescale: 'seconds',
      start: 0.14,
      end: 0.42,
      caption:
        'The alarm spreads. The insula, which tracks the state of the body, and the cingulate and medial frontal cortex respond strongly, and the amygdala responds more than it would in a typical brain.',
      typicalCaption:
        'The insula and the cingulate and medial frontal cortex join in. The pattern is the same as in an anxiety disorder, only smaller.',
      order: {
        kind: 'reconstructed',
        rationale:
          'Electrode recordings put the first amygdala response under a tenth of a second, while the wider response is measured with brain scans that cannot resolve events faster than seconds. That the amygdala leads is an inference; the order among the insula and cingulate is unknown.',
      },
    },
    {
      id: 'apprehension',
      name: 'Waiting, not knowing',
      timescale: 'seconds to minutes',
      start: 0.42,
      end: 0.72,
      caption:
        "The threat stays uncertain. A small structure deep in the front of the brain, the bed nucleus of the stria terminalis, holds a sustained response while the amygdala's own response fades. This is known mostly from animal studies, and no difference from the typical brain is shown at this step because none was found in the sources read.",
      typicalCaption:
        "While things stay uncertain the bed nucleus of the stria terminalis holds a sustained response, as the amygdala's own response fades. This is known mostly from animal studies.",
      order: { kind: 'timed', citations: [shackmanTimecourse] },
    },
    {
      id: 'regulation',
      name: 'Regulation',
      timescale: 'minutes',
      start: 0.72,
      end: 1,
      caption:
        'The frontal control regions that help rethink a situation are recruited less than in a typical brain, and the insula is more active while trying.',
      typicalCaption:
        'Frontal control regions engage as the situation is reappraised, and the amygdala quietens. The episode settles.',
      order: {
        kind: 'reconstructed',
        rationale:
          'Deliberate rethinking takes seconds and, in the studies that measure it, people are asked to do it after the upsetting image has appeared. Placing it last follows that design; in life, regulation can begin earlier and overlap with the alarm.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'amygdala',
        explanation:
          'Responds to the possible threat and, on average, more strongly than in people without an anxiety disorder. How fast it responds, and by what route, is disputed: electrode recordings found responses to fearful faces within about 74 milliseconds, but other researchers argue the cortex does more of this early work than the fast-route account allows. Whole-brain analyses also often fail to detect the amygdala, so its size here is uncertain. It follows the same time course as in the typical brain, only larger: the sources read do not say whether it lasts longer.',
        confidence: 'mixed',
        citations: [etkinPatients, mendezFast, pessoaAlternative, chavanneAmygdala],
        keyframes: kf(0, 0, 0.05, 0.3, 0.2, 0.9, 0.5, 0.45, 0.8, 0.22, 1, 0),
      },
      {
        region: 'insula',
        explanation:
          'More active than in people without an anxiety disorder. The insula tracks the internal state of the body, and a pooled analysis found it more active in both diagnosed anxiety and anxiety induced in healthy volunteers. It is also more active when people with anxiety or mood disorders try to rethink something upsetting.',
        confidence: 'established',
        citations: [etkinPatients, chavanneBoth, picoInsula],
        keyframes: kf(0, 0, 0.14, 0.15, 0.36, 0.9, 0.72, 0.8, 1, 0.7),
      },
      {
        region: 'dacc',
        explanation:
          'A cluster spanning the cingulate and medial frontal cortex is more active in both diagnosed and induced anxiety. The analysis does not pin the location down to this exact structure; it is drawn on the dorsal anterior cingulate as the nearest named region.',
        confidence: 'mixed',
        citations: [chavanneBoth],
        keyframes: kf(0, 0, 0.14, 0.1, 0.38, 0.7, 0.72, 0.5, 1, 0.1),
      },
      {
        region: 'bnst',
        explanation:
          'Holds a sustained response while a threat stays uncertain. The clearest evidence is from rodents, and little is known about it in people. Brain-scan studies in people do show a persistent response here during uncertain waiting, but the tidy split between a fast amygdala and a slow bed nucleus is contested: in monkeys, both are tied to sustained anxiety. It is drawn exactly as in the typical brain, because the sources read report no difference in anxiety disorders.',
        confidence: 'debated',
        citations: [shackmanTimecourse, shackmanBoth, averyRodent],
        keyframes: kf(0, 0, 0.3, 0.05, 0.55, 0.5, 0.8, 0.3, 1, 0.05),
      },
      {
        region: 'dlpfc',
        explanation:
          'Part of the frontal and parietal network that people use to rethink an upsetting situation. In people with anxiety or mood disorders this network is recruited less than in healthy volunteers. This finding pools anxiety with mood disorders and comes from a paper whose full text was not available.',
        confidence: 'mixed',
        citations: [picoLess],
        keyframes: kf(0, 0, 0.72, 0, 0.86, 0.2, 1, 0.15),
      },
      {
        region: 'vlpfc',
        explanation:
          'Part of the same control network as the dorsolateral prefrontal cortex, and likewise recruited less during rethinking in people with anxiety or mood disorders.',
        confidence: 'mixed',
        citations: [picoLess],
        keyframes: kf(0, 0, 0.72, 0, 0.86, 0.2, 1, 0.15),
      },
    ],
    connections: [
      {
        from: 'amygdala',
        to: 'vmpfc',
        explanation:
          'Communication between the amygdala and the ventromedial prefrontal cortex tends to be weaker in more anxious people. The evidence is from brains at rest, not during an episode, and the clearest patient finding is in social anxiety with the neighbouring orbitofrontal cortex.',
        confidence: 'mixed',
        citations: [kimCoupling, kimSad],
        keyframes: kf(0, -0.3, 0.42, -0.4, 0.8, -0.6, 1, -0.5),
      },
    ],
  },
  typical: {
    regions: [
      {
        region: 'amygdala',
        explanation:
          'Responds to the possible threat in healthy volunteers too, then fades: during uncertain waiting its response is transient. It quietens further when the situation is rethought.',
        confidence: 'established',
        citations: [etkinHealthy, shackmanTimecourse, buhleAmygdala],
        keyframes: kf(0, 0, 0.05, 0.2, 0.2, 0.6, 0.5, 0.3, 0.8, 0.15, 1, 0),
      },
      {
        region: 'insula',
        explanation: 'More active while healthy volunteers wait for an unpredictable threat, then settles as the threat passes.',
        confidence: 'established',
        citations: [chavanneBoth],
        keyframes: kf(0, 0, 0.14, 0.1, 0.36, 0.5, 0.72, 0.35, 1, 0.05),
      },
      {
        region: 'dacc',
        explanation:
          'A cluster spanning the cingulate and medial frontal cortex is more active while healthy volunteers wait for an unpredictable threat. Drawn on the dorsal anterior cingulate as the nearest named region.',
        confidence: 'mixed',
        citations: [chavanneBoth],
        keyframes: kf(0, 0, 0.14, 0.05, 0.38, 0.4, 0.72, 0.3, 1, 0.05),
      },
      {
        region: 'bnst',
        explanation:
          'Holds a sustained response while healthy volunteers wait in uncertainty, as the amygdala\'s response fades. Much of what is known comes from rodents.',
        confidence: 'debated',
        citations: [shackmanTimecourse, averyRodent],
        keyframes: kf(0, 0, 0.3, 0.05, 0.55, 0.5, 0.8, 0.3, 1, 0.05),
      },
      {
        region: 'dlpfc',
        explanation: 'One of the control regions that reliably become active when healthy volunteers rethink an upsetting situation.',
        confidence: 'established',
        citations: [buhleControl],
        keyframes: kf(0, 0, 0.72, 0.05, 0.86, 0.65, 1, 0.2),
      },
      {
        region: 'vlpfc',
        explanation: 'One of the control regions that reliably become active when healthy volunteers rethink an upsetting situation.',
        confidence: 'established',
        citations: [buhleControl],
        keyframes: kf(0, 0, 0.72, 0.05, 0.86, 0.65, 1, 0.2),
      },
    ],
    connections: [
      {
        from: 'amygdala',
        to: 'vmpfc',
        explanation:
          'Stronger communication between the amygdala and the ventromedial prefrontal cortex at rest goes with lower reported anxiety. Shown here at its ordinary level.',
        confidence: 'mixed',
        citations: [kimCoupling],
        keyframes: kf(0, 0, 1, 0),
      },
    ],
  },
};

writeScore(score, {
  indexTitle: 'Anxiety',
  notes: [
    'Dropped: the hypothalamus and stress-hormone response. The sources read mention them only as anatomical connections in animals, not as measurements in people.',
    'Dropped: a specific claim that fear conditioning does not reliably activate the amygdala (Fullana et al. 2016). Only the abstract was available and it does not state this.',
    'The amygdala is marked "mixed", not "well established": patients show more amygdala activity in one meta-analysis (Etkin & Wager 2007), but a later, larger whole-brain meta-analysis mostly did not detect it (Chavanne & Robinson 2021).',
    'Two sources were read as abstracts only: Méndez-Bértolo et al. 2016 and Picó-Pérez et al. 2017.',
  ],
});
