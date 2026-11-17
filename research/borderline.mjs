// Borderline personality disorder: an emotional spike and its slow return.
//   node research/borderline.mjs
import { cite, kf, writeScore } from './lib.mjs';

const schulzeMain = cite(
  'schulze2016',
  'BPD patients showed relatively increased activation of the left amygdala and posterior cingulate cortex, along with blunted responses of the bilateral dorsolateral prefrontal cortex',
);
const schulzeMedication = cite(
  'schulze2016',
  'Medication-free samples were characterized by limbic hyperactivity, whereas no such group differences were found in patients currently taking psychotropic medication.',
);
const ruoccoMore = cite('ruocco2013', 'BPD patients demonstrated greater activation within the insula and posterior cingulate cortex');
const ruoccoLess = cite(
  'ruocco2013',
  'they showed less activation than control subjects in a network of regions that extended from the amygdala to the subgenual anterior cingulate and dorsolateral prefrontal cortex',
);
const ruoccoHealthy = cite(
  'ruocco2013',
  'Healthy control subjects activated a well-characterized network of brain regions associated with processing negative emotions that included the anterior cingulate cortex and amygdala.',
);
const degasperiNull = cite(
  'degasperi2021',
  'No consistent pattern of alteration in brain activity for BPD was evidenced suggesting substantial heterogeneity of processes and populations studied.',
);
const degasperiAmygdala = cite(
  'degasperi2021',
  'we found significant clusters in the two amygdalae along with the anterior cingulate (ACC)/middle frontal gyrus (MFG)',
);
const degasperiInsula = cite(
  'degasperi2021',
  'showed a significant cluster in the insula/inferior frontal gyrus for the HC > BPD contrast',
);
const hazlettSlow = cite(
  'hazlett2012',
  'the BPD patients exhibited an overall amygdala BOLD response curve (averaged across all repeated-measures except Time) with a much slower return to baseline compared with the HC and SPD groups',
);
const hazlettRepeated = cite(
  'hazlett2012',
  'BPD patients showed greater amygdala activation, particularly to the repeated emotional but not neutral pictures',
);
const kamphausenNoDecrease = cite(
  'kamphausen2013',
  'BPD compared to control subjects did not show fMRI signal decrease of amygdala activity or relative ventromedial prefrontal cortex (vmPFC) activity increase over time.',
);
const koenigsbergDacc = cite(
  'koenigsberg2014',
  'Unlike healthy controls, neither borderline nor avoidant personality disorder participants showed increased activity in dorsal anterior cingulate cortex when viewing repeat versus novel pictures.',
);
const koenigsbergConnectivity = cite(
  'koenigsberg2014',
  'borderline and avoidant participants showed smaller insula-amygdala connectivity increases than healthy participants',
);
const koenigsbergHealthy = cite(
  'koenigsberg2014',
  'insula-amygdala connectivity increases in healthy individuals as they habituate to negative pictures',
);

const score = {
  id: 'borderline',
  title: 'Borderline: an emotional spike and its slow return',
  description:
    'Something emotionally upsetting happens. The episode follows the response in a brain with borderline personality disorder; the typical response shows the same moment in a brain without it. What stands out most in the research is not where the response happens but how it unfolds in time: the response is slower to come back down, and it does not fade with repetition the way it usually does.',
  caveat:
    'This is one of the least settled episodes in the app, and every region in it is marked as mixed or debated. Two pooled analyses disagree about whether the amygdala is more or less active, and the largest and most recent one found no consistent pattern across all kinds of task, though when it looked only at emotion tasks it found both amygdalae more active across studies. The slow return to baseline comes from single studies, in which people looked at upsetting pictures in a scanner for seconds to minutes. Nothing here measures the hours that an episode can last in life, and upsetting pictures are a weak stand-in for the interpersonal events that usually set an episode off. Most participants in these studies were women, and medication appears to change the findings.',
  durationSeconds: 40,
  phases: [
    {
      id: 'trigger',
      name: 'Something upsetting',
      timescale: 'a second or two',
      start: 0,
      end: 0.12,
      caption: 'Something emotionally upsetting happens. In the studies behind this episode, that is an upsetting picture.',
      typicalCaption: 'Something emotionally upsetting happens. In the studies behind this episode, that is an upsetting picture.',
    },
    {
      id: 'surge',
      name: 'Surge',
      timescale: 'seconds',
      start: 0.12,
      end: 0.4,
      caption:
        'The emotional response builds. The insula and the posterior cingulate respond more than in a typical brain, and the dorsolateral prefrontal cortex, a control region, responds less. Whether the amygdala responds more or less is disputed, so it is drawn the same as in a typical brain at this step.',
      typicalCaption:
        'The emotional response builds. The amygdala and the anterior cingulate respond, as they do to anything upsetting.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The pooled analyses compare overall response to upsetting versus neutral pictures and say nothing about what comes first. Placing the surge straight after the trigger follows the design of those tasks.',
      },
    },
    {
      id: 'holding',
      name: 'Not settling',
      timescale: 'seconds to minutes',
      start: 0.4,
      end: 0.74,
      caption:
        'Where a typical response would start to fade, this one holds. The amygdala is slower to return to its resting level, and seeing the same thing again does not dull the response.',
      typicalCaption:
        'The response starts to fade. With repetition the dorsal anterior cingulate becomes more active, the insula and amygdala work more closely together, and the amygdala settles.',
      order: { kind: 'timed', citations: [hazlettSlow] },
    },
    {
      id: 'return',
      name: 'Slow return',
      timescale: 'minutes (longer has not been measured)',
      start: 0.74,
      end: 1,
      caption:
        'The response comes down slowly. Scans have only followed this for minutes; how it continues over the hours an episode can last has not been measured.',
      typicalCaption: 'The response has largely settled, and the ventromedial prefrontal cortex has become more active.',
      order: {
        kind: 'reconstructed',
        rationale:
          'Studies show the amygdala response not decreasing over the minutes of a task. That it eventually comes down, and how, is an assumption; no study read for this episode followed it to the end.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'amygdala',
        explanation:
          'The most disputed finding. One pooled analysis found the left amygdala more active than in people without the condition, mainly in people not taking medication. Another found it less active. The largest found no consistent difference across all kinds of task, but when it looked only at emotion tasks it found both amygdalae more active. What single studies do show is a difference in timing: the response is slower to return to baseline and does not shrink when the same upsetting picture is shown again. Because the size of the response is disputed, it is drawn rising to the same height as in the typical brain; only the slower return differs.',
        confidence: 'debated',
        citations: [schulzeMain, schulzeMedication, ruoccoLess, degasperiNull, degasperiAmygdala, hazlettSlow, hazlettRepeated, kamphausenNoDecrease],
        keyframes: kf(0, 0, 0.12, 0.15, 0.3, 0.6, 0.55, 0.58, 0.74, 0.5, 1, 0.3),
      },
      {
        region: 'insula',
        explanation:
          'More active than in people without the condition when processing something upsetting, in one pooled analysis. The largest, later analysis found no consistent pattern across all tasks, and in one of its emotion-task analyses found the insula less active, not more. The direction is therefore disputed.',
        confidence: 'debated',
        citations: [ruoccoMore, degasperiNull, degasperiInsula],
        keyframes: kf(0, 0, 0.12, 0.1, 0.36, 0.7, 0.74, 0.6, 1, 0.35),
      },
      {
        region: 'pcc-precuneus',
        explanation:
          'The posterior cingulate is more active than in people without the condition in two separate pooled analyses, the most consistent of the findings here. A larger, later analysis found no consistent pattern.',
        confidence: 'mixed',
        citations: [schulzeMain, ruoccoMore, degasperiNull],
        keyframes: kf(0, 0, 0.12, 0.05, 0.38, 0.6, 0.74, 0.5, 1, 0.3),
      },
      {
        region: 'dlpfc',
        explanation:
          'A control region that responds less than in people without the condition, in two separate pooled analyses. A larger, later analysis found no consistent pattern.',
        confidence: 'mixed',
        citations: [schulzeMain, ruoccoLess, degasperiNull],
        keyframes: kf(0, 0, 0.12, 0, 0.38, -0.5, 0.74, -0.45, 1, -0.3),
      },
      {
        region: 'sgacc',
        explanation: 'Less active than in people without the condition, in one pooled analysis that was read as an abstract only.',
        confidence: 'mixed',
        citations: [ruoccoLess],
        keyframes: kf(0, 0, 0.12, 0, 0.38, -0.4, 0.74, -0.35, 1, -0.25),
      },
      {
        region: 'dacc',
        explanation:
          'In people without the condition this region becomes more active when an upsetting picture is seen again. In one study that increase did not happen in borderline personality disorder. Shown at baseline because the finding is the absence of a rise.',
        confidence: 'mixed',
        citations: [koenigsbergDacc],
        keyframes: kf(0, 0, 1, 0),
      },
      {
        region: 'vmpfc',
        explanation:
          'In people without the condition this region becomes relatively more active over time during a threat task. In one study that increase did not happen in borderline personality disorder. Shown at baseline because the finding is the absence of a rise.',
        confidence: 'mixed',
        citations: [kamphausenNoDecrease],
        keyframes: kf(0, 0, 1, 0),
      },
    ],
    connections: [
      {
        from: 'insula',
        to: 'amygdala',
        explanation:
          'In people without the condition the insula and amygdala work more closely together as a repeated upsetting picture loses its force. In one study that increase was smaller in borderline personality disorder.',
        confidence: 'mixed',
        citations: [koenigsbergConnectivity],
        keyframes: kf(0, 0, 0.4, 0, 0.7, 0.15, 1, 0.15),
      },
    ],
  },
  typical: {
    regions: [
      {
        region: 'amygdala',
        explanation:
          'Responds to something upsetting, then returns to baseline sooner and shrinks with repetition. The comparison groups in the timing studies were small.',
        confidence: 'mixed',
        citations: [ruoccoHealthy, hazlettSlow, kamphausenNoDecrease],
        keyframes: kf(0, 0, 0.12, 0.15, 0.3, 0.6, 0.55, 0.3, 0.74, 0.1, 1, 0),
      },
      {
        region: 'dacc',
        explanation:
          'Becomes more active when an upsetting picture is seen again, in the healthy comparison group of one study. The anterior cingulate is also part of the usual response to negative emotion.',
        confidence: 'mixed',
        citations: [koenigsbergDacc, ruoccoHealthy],
        keyframes: kf(0, 0, 0.12, 0.05, 0.36, 0.3, 0.6, 0.6, 1, 0.15),
      },
      {
        region: 'vmpfc',
        explanation: 'Becomes relatively more active over time during a threat task, in the healthy comparison group of one study.',
        confidence: 'mixed',
        citations: [kamphausenNoDecrease],
        keyframes: kf(0, 0, 0.4, 0, 0.8, 0.5, 1, 0.3),
      },
    ],
    connections: [
      {
        from: 'insula',
        to: 'amygdala',
        explanation: 'The insula and amygdala work more closely together as a repeated upsetting picture loses its force.',
        confidence: 'mixed',
        citations: [koenigsbergHealthy, koenigsbergConnectivity],
        keyframes: kf(0, 0, 0.4, 0, 0.7, 0.7, 1, 0.3),
      },
    ],
  },
};

writeScore(score, {
  indexTitle: 'Borderline',
  notes: [
    'Nothing in this episode could be marked "well established". The two older meta-analyses (Schulze 2016, Ruocco 2013) agree on the posterior cingulate and dorsolateral prefrontal cortex and disagree on the amygdala; the largest and newest (Degasperi 2021, full text read) found no consistent pattern.',
    'The design hypothesis "slow return to baseline over seconds to hours" is supported only for seconds to minutes (Hazlett 2012; Kamphausen 2013). The last phase is labelled accordingly and its order is marked reconstructed.',
    'Three sources were read as abstracts only: Schulze 2016, Ruocco 2013, Kamphausen 2013.',
    'The typical variant shows fewer regions than the condition because the sources mostly report differences between groups, not what the comparison group did on its own.',
  ],
});
