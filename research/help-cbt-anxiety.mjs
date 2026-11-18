// What helps: cognitive behavioural therapy (CBT) for anxiety disorders.
//   node research/help-cbt-anxiety.mjs
import { cite, kf, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, inWindow, phase, treatmentCaveat } from './helps.mjs';

const renAnxiety = cite(
  'ren2025',
  'whereas patients with anxiety disorders had increased activation of the right and left superior frontal gyrus (SFG) and decreased activation of the caudate after treatment',
);
const renTask = cite(
  'ren2025',
  'In the task state, increased activation of the right PG, right orbital frontal lobe, and right dorsal anterior cingulate cortex (dACC) was mainly observed after treatment in patients with anxiety disorders, and the left lentiform nucleus (LN), left dorsal entorhinal cortex, and right caudate activation were decreased.',
);
const renSample = cite('ren2025', 'A total of 22 articles, encompassing 443 patients, were included in the meta-analysis.');
const klumppGreater = cite(
  'klumpp2013',
  'The interaction was driven by relatively greater activity during threat processing in SAD, which significantly reduced after CBT but did not significantly predict response to CBT.',
);
const klumppRegions = cite('klumpp2013', 'Moreover, a group by time interaction was revealed in prefrontal regions (dorsomedial, medial gyrus) and insula.');
const klumppSummary = cite(
  'klumpp2013',
  'Collectively, CBT-related brain changes involved a reduction in activity in insula, prefrontal, and extrastriate regions.',
);
const klumppNoWaitlist = cite('klumpp2013', 'First, the study design lacked a wait-list control group; therefore, neural and clinical findings cannot be causally attributed to CBT');
const goldinRoi = cite('goldin2013', 'Neurally, group by time interactions occurred in a priori DMPFC and left DLPFC ROIs, which were characterized by increases following I-CBT and no change following WL');
const klumppRight = cite('klumpp2013', 'Importantly, there was a significant Group x Time interaction for right insula and prefrontal regions, specifically right medial orbitofrontal and right dorsomedial PFC');
const klumppDesign = cite(
  'klumpp2013',
  'Functional magnetic resonance imaging (fMRI) was conducted during responses to social signals of threat (fearful/angry faces) against positive signals (happy faces) in 14 patients with SAD before and after 12 weeks of CBT.',
);
const goldinReactivity = cite(
  'goldin2013',
  'During reactivity trials, compared to waitlist, Cognitive-Behavioral Therapy produced (a) greater reduction in negative emotion ratings and (b) greater blood oxygen-level dependent signal magnitude in medial prefrontal cortex.',
);
const goldinReappraisal = cite(
  'goldin2013',
  'During cognitive reappraisal trials, compared to waitlist, Cognitive-Behavioral Therapy produced (c) greater reduction in negative emotion ratings, (d) greater blood oxygen-level dependent signal magnitude in dorsolateral and dorsomedial prefrontal cortex',
);
const goldinSample = cite('goldin2013', 'Seventy-five patients with generalized social anxiety disorder randomly assigned to Cognitive-Behavioral Therapy or waitlist.');

const W = { before: [0, 0.2], during: [0.2, 0.3], pooled: [0.3, 0.5], threat: [0.5, 0.67], rethink: [0.67, 0.84], same: [0.84, 1] };

const score = {
  id: 'help-cbt-anxiety',
  title: 'Talking therapy (CBT) for anxiety',
  description:
    'Cognitive behavioural therapy (CBT) is the most studied talking therapy for anxiety disorders. It helps people test anxious predictions and face what they fear step by step. The episode shows three views of the change: pooled across anxiety disorders, while facing a social threat, and while deliberately rethinking a negative thought. In the first part, brightness shows how the brain differed from people without anxiety before treatment. After that, brightness shows the change since before treatment: warmer means more than before, violet means less than before.',
  caveat: treatmentCaveat(
    'The pooled findings come from an analysis of 22 studies of CBT for depression and anxiety disorders; the anxiety studies cover several different disorders. The two other parts come from single studies of social anxiety disorder, one of 14 people with no untreated comparison group (so the changes cannot be credited to CBT alone) and one randomised trial of 75 people of whom about 60 had usable scans, using different tasks, which is why the medial prefrontal cortex goes down in one and up in the other. The pooled analysis names the superior frontal gyrus, which is not drawn as its own area.',
  ),
  durationSeconds: 40,
  phases: [
    phase('before', 'Before treatment', 'before treatment', W.before,
      'Before treatment, people with social anxiety showed more activity than people without it in the right medial prefrontal cortex and right insula when looking at angry faces.'),
    phase('during', 'A course of CBT', 'weeks', W.during,
      'Twelve to sixteen weekly sessions. People were not scanned during this time.',
      { kind: 'timed', citations: [klumppDesign] }),
    phase('pooled', 'Across anxiety disorders', 'after treatment', W.pooled,
      'Pooled across studies, after CBT the caudate and part of the putamen were less active, and areas including the right dorsal anterior cingulate, the right orbitofrontal cortex and the right parahippocampal gyrus were more active during tasks.',
      { kind: 'reconstructed', rationale: 'This is a pooled analysis of before-and-after studies; it is shown first only to present the findings one at a time.' }),
    phase('threat', 'Facing a social threat', 'after treatment', W.threat,
      'In one study of social anxiety, the extra activity to angry faces in the right medial prefrontal cortex and right insula was reduced after CBT, as was activity in visual areas.',
      { kind: 'timed', citations: [klumppDesign] }),
    phase('rethink', 'Rethinking a negative thought', 'after treatment', W.rethink,
      'In another study, while deliberately rethinking a negative belief about themselves, the left dorsolateral and the dorsomedial prefrontal cortex increased from before to after CBT, but not in people still waiting for therapy, and people felt less negative.',
      { kind: 'reconstructed', rationale: 'This is a separate study with a different task. It is placed after the other findings only to show them one at a time.' }),
    phase('same', 'What stayed the same', 'summary', W.same,
      'The direction of change depends on the task: the medial prefrontal cortex went down while facing threat but up while rethinking. Some of the people in these studies did not improve.',
      SUMMARY_ORDER),
  ],
  condition: {
    regions: [
      {
        region: 'mpfc-r',
        explanation:
          'The right dorsomedial prefrontal cortex was more active than in people without social anxiety while viewing angry faces before treatment, and less active after CBT, in one study of 14 people. In a randomised trial (about 60 people scanned), the dorsomedial prefrontal cortex it was more active after CBT while reacting to and rethinking negative beliefs about themselves. The direction depends on the task.',
        confidence: 'debated',
        citations: [klumppGreater, klumppRight, klumppRegions, goldinReactivity, goldinReappraisal, goldinRoi],
        keyframes: kf(0, 0, 0.04, 0.4, 0.18, 0.4, 0.21, 0, 0.5, 0, 0.54, -0.4, 0.65, -0.4, 0.69, 0, 0.71, 0.4, 0.82, 0.4, 0.86, 0, 1, 0),
      },
      {
        region: 'insula-r',
        explanation:
          'The right insula was more active than in people without social anxiety while viewing angry faces before treatment, and less active after CBT, in one study of 14 people with no untreated comparison group.',
        confidence: 'mixed',
        citations: [klumppGreater, klumppRight, klumppSummary, klumppNoWaitlist],
        keyframes: kf(0, 0, 0.04, 0.4, 0.18, 0.4, 0.21, 0, 0.5, 0, 0.54, -0.4, 0.65, -0.4, 0.69, 0, 1, 0),
      },
      {
        region: 'visual-cortex',
        explanation: 'Extrastriate visual areas were less active while viewing threatening faces after CBT, in one study of social anxiety (stated in its summary). Drawn on the visual cortex, an approximation.',
        confidence: 'mixed',
        citations: [klumppSummary],
        keyframes: inWindow(0.5, 0.67, -0.3),
      },
      {
        region: 'dlpfc-l',
        explanation:
          'The left dorsolateral prefrontal cortex became more active while rethinking a negative belief about oneself from before to after CBT, with no change in people still waiting for therapy, in a randomised trial of people with social anxiety (about 60 scanned).',
        confidence: 'mixed',
        citations: [goldinReappraisal, goldinRoi, goldinSample],
        keyframes: inWindow(0.67, 0.84, 0.45),
      },
      {
        region: 'caudate',
        explanation:
          'Less active after CBT for anxiety disorders, at rest and (on the right) during tasks, in a pooled analysis.',
        confidence: 'mixed',
        citations: [renAnxiety, renTask, renSample],
        keyframes: inWindow(0.3, 0.5, -0.4),
      },
      {
        region: 'putamen-l',
        explanation: 'The left lentiform nucleus, which includes the putamen, was less active during tasks after CBT for anxiety disorders, in a pooled analysis. Drawn on the putamen, an approximation.',
        confidence: 'mixed',
        citations: [renTask],
        keyframes: inWindow(0.3, 0.5, -0.3),
      },
      {
        region: 'dacc-r',
        explanation: 'More active during tasks after CBT for anxiety disorders, in a pooled analysis.',
        confidence: 'mixed',
        citations: [renTask],
        keyframes: inWindow(0.3, 0.5, 0.35),
      },
      {
        region: 'ofc-r',
        explanation: 'More active during tasks after CBT for anxiety disorders, in a pooled analysis.',
        confidence: 'mixed',
        citations: [renTask],
        keyframes: inWindow(0.3, 0.5, 0.35),
      },
      {
        region: 'parahippocampal-r',
        explanation: 'More active during tasks after CBT for anxiety disorders, in a pooled analysis.',
        confidence: 'mixed',
        citations: [renTask],
        keyframes: inWindow(0.3, 0.5, 0.3),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Talking therapy (CBT) for anxiety',
  category: 'treatment',
  treats: 'anxiety',
  notes: [
    'Goldin et al. 2013 report "greater dorsomedial prefrontal cortex-amygdala inverse functional connectivity"; an inverse relationship is not drawn as a line, following the project rule.',
    'The medial prefrontal cortex is "debated" because the two single studies find opposite directions with different tasks; both are shown in their own phase.',
    'Ren et al. 2025 report the superior frontal gyrus (increased at rest) and the left dorsal entorhinal cortex (decreased during tasks); neither is a separate region in the brain model.',
    'The "rethinking" findings compare CBT with a waiting list, not before with after; the phase says so.',
    'Read in full: Klumpp et al. 2013, Goldin et al. 2013. Read as abstract only: Ren et al. 2025.',
  ],
});
