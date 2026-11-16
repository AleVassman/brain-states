// Epileptic seizure: a temporal lobe seizure in which awareness is lost.
//   node research/seizure.mjs
import { cite, kf, writeScore } from './lib.mjs';

const bartolomeiMesial = cite(
  'bartolomei2008',
  'In the majority of patients, highest EI values were computed from signals recorded in mesial structures.',
);
const bartolomeiEarly = cite(
  'bartolomei2008',
  'Statistically high EI values corresponded to structures involved early in the ictal process and producing rapid discharges at seizure onset.',
);
const bartolomeiSeveral = cite(
  'bartolomei2008',
  'In all patients, these high values were obtained in more than one structure of the temporal lobe region.',
);
const bertramBeyond = cite(
  'bertram2009',
  'the seizure focus extends, at least in some cases, beyond the hippocampus and amygdala, which are usually removed at the time of surgery',
);
const englotSpread = cite(
  'englot2010',
  'propagation of unilateral mesial temporal fast seizure activity to the bilateral temporal lobes was significantly greater in complex-partial than in simple-partial seizures',
);
const englotSlow = cite(
  'englot2010',
  'We observed significantly increased delta-range 1-2 Hz slow wave activity in the bilateral frontal and parietal neocortices during complex-partial compared with simple-partial seizures.',
);
const englotHypothesis = cite(
  'englot2010',
  'We hypothesize that bilateral temporal lobe seizures may exert a powerful inhibitory effect on subcortical arousal systems.',
);
const blumenfeldSequence = cite(
  'blumenfeld2004',
  'temporal lobe seizures associated with loss of consciousness produced CBF increases in the temporal lobe, followed by increases in bilateral midline subcortical structures',
);
const blumenfeldDecreases = cite(
  'blumenfeld2004',
  'These changes were accompanied by marked bilateral CBF decreases in the frontal and parietal association cortex.',
);
const blumenfeldCorrelated = cite(
  'blumenfeld2004',
  'The CBF decreases in frontal and parietal association cortex were strongly correlated with increases in midline structures such as the mediodorsal thalamus.',
);
const blumenfeldSpared = cite(
  'blumenfeld2004',
  'temporal lobe seizures in which consciousness was spared were not accompanied by these widespread CBF changes',
);
const blumenfeldPostictal = cite(
  'blumenfeld2012',
  'characterized by relatively spared function towards the beginning of seizures, followed by decreased responsiveness which may persists for several minutes into the postictal period',
);

const score = {
  id: 'seizure',
  title: 'Epileptic seizure: a temporal lobe seizure',
  description:
    'There are many kinds of seizure. This episode shows one of the most common in adults: a seizure that begins deep in one temporal lobe and, as it spreads, takes awareness away for a minute or two. The person may stare, fumble or not respond, and often does not remember it. It is drawn starting on the left; in life it can start on either side. A seizure is abnormally intense, synchronised activity, so "more active" here does not mean working better.',
  caveat:
    'This is unusually well-timed evidence for this project, because seizures are recorded directly with electrodes placed in the brain before epilepsy surgery, and with blood-flow scans injected during a seizure. But those recordings come from people whose epilepsy has not responded to medication, so they may not represent everyone. Where a seizure starts differs between people, and the starting zone can reach beyond the hippocampus and amygdala. The idea that the seizure switches off the brain\'s arousal systems, which in turn quietens the frontal and parietal cortex, is the researchers\' hypothesis for why awareness is lost. What the brain does after the seizure ends is drawn as an assumption: the sources read describe the person\'s reduced responsiveness lasting several minutes, not the brain activity behind it.',
  durationSeconds: 36,
  phases: [
    {
      id: 'onset',
      name: 'Onset',
      timescale: 'seconds',
      start: 0,
      end: 0.16,
      caption:
        'Fast, synchronised firing begins deep in one temporal lobe, in the hippocampus, the amygdala and the cortex around them. The person may still be aware at this point.',
    },
    {
      id: 'spread',
      name: 'Spread',
      timescale: 'seconds to tens of seconds',
      start: 0.16,
      end: 0.4,
      caption:
        'The seizure activity spreads through the temporal lobe and across to the other side. Spread to both temporal lobes is greater in seizures where awareness is lost.',
      order: { kind: 'timed', citations: [bartolomeiEarly, englotSpread] },
    },
    {
      id: 'awareness',
      name: 'Awareness fades',
      timescale: 'tens of seconds to a minute or two',
      start: 0.4,
      end: 0.76,
      caption:
        'Deep midline structures such as the thalamus become more active, and large areas of frontal and parietal cortex on both sides slow down, as in deep sleep. The seizure has not spread there; those areas have been quietened. This is when the person stops responding.',
      order: { kind: 'timed', citations: [blumenfeldSequence] },
    },
    {
      id: 'after',
      name: 'Afterwards',
      timescale: 'minutes',
      start: 0.76,
      end: 1,
      caption:
        'The seizure stops. The person can stay confused or unresponsive for several minutes. What the brain is doing during that recovery is drawn here as a gradual return, which is an assumption.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The sources read describe behaviour after the seizure, reduced responsiveness for several minutes, not brain activity. The gradual return to rest is assumed.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'hippocampus-l',
        explanation:
          'One of the deep temporal lobe structures where these seizures most often begin, according to electrode recordings in seventeen people before surgery. In every one of them more than one structure was involved at the start, and a review argues that the starting zone can extend beyond the hippocampus and amygdala.',
        confidence: 'mixed',
        citations: [bartolomeiMesial, bartolomeiEarly, bartolomeiSeveral, bertramBeyond],
        keyframes: kf(0, 0, 0.04, 0.9, 0.76, 1, 0.82, 0, 1, 0),
      },
      {
        region: 'amygdala-l',
        explanation:
          'One of the deep temporal lobe structures involved early in these seizures. It is usually removed together with the hippocampus in epilepsy surgery, though a review argues that the starting zone can extend beyond both.',
        confidence: 'mixed',
        citations: [bartolomeiMesial, bartolomeiSeveral, bertramBeyond],
        keyframes: kf(0, 0, 0.06, 0.8, 0.76, 1, 0.82, 0, 1, 0),
      },
      {
        region: 'parahippocampal-l',
        explanation:
          'The cortex around the hippocampus, part of the deep temporal lobe structures involved early in these seizures. The source speaks of deep ("mesial") temporal structures as a group and does not single this one out.',
        confidence: 'mixed',
        citations: [bartolomeiMesial, bartolomeiSeveral],
        keyframes: kf(0, 0, 0.08, 0.7, 0.76, 0.9, 0.82, 0, 1, 0),
      },
      {
        region: 'lateral-temporal-l',
        explanation:
          'Blood flow rises in the temporal lobe during these seizures as the fast activity spreads out from the deep structures. In electrode recordings the outer temporal cortex is usually involved later and less strongly than the deep structures.',
        confidence: 'mixed',
        citations: [blumenfeldSequence, bartolomeiMesial],
        keyframes: kf(0, 0, 0.16, 0.1, 0.32, 0.75, 0.76, 0.8, 0.82, 0, 1, 0),
      },
      {
        region: 'hippocampus-r',
        explanation:
          'The seizure activity spreads from one deep temporal lobe to both. That spread is greater in seizures where awareness is lost than in those where it is kept.',
        confidence: 'mixed',
        citations: [englotSpread],
        keyframes: kf(0, 0, 0.22, 0, 0.4, 0.7, 0.76, 0.8, 0.82, 0, 1, 0),
      },
      {
        region: 'lateral-temporal-r',
        explanation:
          'The seizure activity spreads to the temporal lobe on the other side. That spread is greater in seizures where awareness is lost.',
        confidence: 'mixed',
        citations: [englotSpread],
        keyframes: kf(0, 0, 0.26, 0, 0.44, 0.6, 0.76, 0.7, 0.82, 0, 1, 0),
      },
      {
        region: 'thalamus',
        explanation:
          'Blood flow rises in deep midline structures on both sides, including the thalamus, after it has risen in the temporal lobe. This was seen in seizures with loss of awareness and not in those where awareness was kept.',
        confidence: 'mixed',
        citations: [blumenfeldSequence, blumenfeldSpared],
        keyframes: kf(0, 0, 0.36, 0, 0.52, 0.7, 0.76, 0.75, 0.84, 0, 1, 0),
      },
      {
        region: 'dlpfc',
        explanation:
          'Frontal association cortex on both sides. Blood flow there drops sharply, and electrodes record slow waves like those of deep sleep, during seizures in which awareness is lost. The seizure itself has not spread here. The researchers propose that the seizure disrupts the brain\'s arousal systems, which then stop keeping this cortex awake; that explanation is a hypothesis. Drawn on the middle frontal gyrus; the finding is for frontal association cortex generally.',
        confidence: 'mixed',
        citations: [blumenfeldDecreases, englotSlow, englotHypothesis, blumenfeldSpared, blumenfeldPostictal],
        keyframes: kf(0, 0, 0.4, 0, 0.54, -0.7, 0.76, -0.75, 1, 0),
      },
      {
        region: 'inferior-parietal',
        explanation:
          'Parietal association cortex on both sides. Blood flow there drops sharply, and electrodes record slow waves like those of deep sleep, during seizures in which awareness is lost. The seizure itself has not spread here.',
        confidence: 'mixed',
        citations: [blumenfeldDecreases, englotSlow, blumenfeldSpared],
        keyframes: kf(0, 0, 0.4, 0, 0.54, -0.7, 0.76, -0.75, 1, 0),
      },
    ],
    connections: [
      {
        from: 'thalamus',
        to: 'dlpfc',
        explanation:
          'Moving in opposite directions: the more blood flow rose in midline structures such as the thalamus, the more it fell in frontal and parietal association cortex. The line marks that opposing relationship, from one study, not closer cooperation.',
        confidence: 'mixed',
        citations: [blumenfeldCorrelated],
        keyframes: kf(0, 0, 0.4, 0, 0.56, 0.7, 0.76, 0.7, 0.84, 0, 1, 0),
      },
    ],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Epileptic seizure',
  category: 'physical',
  notes: [
    'No typical-response comparison: there is no "same event in a brain without epilepsy". The informative comparison in the sources is between seizures where awareness is lost and those where it is kept, described in the text.',
    'The seizure is drawn starting on the left for clarity. It can start on either side; Englot et al. 2010 found seizures with loss of awareness "somewhat more common" with onset in the language-dominant temporal lobe.',
    'Seizure activity is drawn stopping abruptly, and the frontal and parietal cortex recovering gradually. Blumenfeld 2012 (read in full) says reduced responsiveness "may persists for several minutes into the postictal period" [sic]; the brain activity behind that recovery was not covered for temporal lobe seizures in the sources read.',
    'All evidence is from people with epilepsy that had not responded to medication and who were being assessed for surgery.',
    'No source here is a pooled analysis, so nothing is marked "well established" although several findings come from two independent methods (electrodes and blood-flow scans).',
    'Read as abstracts only: Englot 2010, Blumenfeld 2004, Bartolomei 2008, Bertram 2009. Read in full: Blumenfeld 2012.',
  ],
});
