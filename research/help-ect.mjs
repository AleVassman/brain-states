// What helps: electroconvulsive therapy (ECT) for severe depression.
//   node research/help-ect.mjs
import { cite, writeScore } from './lib.mjs';
import { after, beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const joshiBaseline = cite('joshi2016', 'Patients showed smaller hippocampal volumes compared to controls at baseline (p<.04).');
const joshiIncrease = cite('joshi2016', 'Both hippocampal and amygdalar volumes increased with ECT (p<.001) and in relation to symptom improvement (p<.01).');
const joshiDesign = cite(
  'joshi2016',
  'Longitudinal changes in hippocampal and amygdala structure were examined in patients with major depression (N= 43, scanned thrice; prior to ECT, after the 2 ECT session, and within one week of completing the ECT treatment series) referred for ECT as part of their standard clinical care',
);
const joshiControls = cite('joshi2016', 'All structural measures remained stable across time in controls.');
const oltedalDose = cite('oltedal2018', 'The linear component of hippocampal volume change was 0.28%, 0.08 SE, per ECT session, p<0.001.');
const oltedalSample = cite(
  'oltedal2018',
  'Hippocampal volumes were extracted from structural MR images, acquired before and after patients (N=281) experiencing a major depressive episode completed an ECT treatment series using right unilateral (RUL) and bilateral (BL) stimulation.',
);
const oltedalPoorer = cite('oltedal2018', 'Individuals with greater treatment-related volume increases had poorer outcomes');
const joshiPredict = cite('joshi2016', 'Hippocampal volume at baseline predicted subsequent clinical response');
const oltedalOutcome = cite(
  'oltedal2018',
  'the high efficacy of ECT is not explained by hippocampal enlargement, which alone, might not serve as a viable biomarker for treatment outcome.',
);

const score = {
  id: 'help-ect',
  title: 'Electroconvulsive therapy (ECT) for severe depression',
  description:
    'Electroconvulsive therapy (ECT) is given under general anaesthesia, usually two or three times a week, and is used mainly for severe depression that has not improved with other treatments. Scans before and after a course of ECT show the hippocampus and amygdala growing slightly in volume. In this episode brightness stands for tissue volume, not activity. In the first part it shows how volume differed from people without depression before treatment; in "What changed" it shows the change since before treatment.',
  caveat: treatmentCaveat(
    'The volume increase comes from a combined analysis of 281 patients at 10 sites and from a study of 43 patients. The increase is small, a few percent, and grows with the number of sessions. The larger analysis found that a bigger increase did not go with a better outcome, so the growth does not explain why ECT works. Only the hippocampus and amygdala were measured in these studies.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before treatment, the hippocampus was slightly smaller than in people without depression, in one study.',
    duringName: 'A course of ECT',
    duringTimescale: 'weeks',
    duringCaption: 'A series of treatments over a few weeks, under general anaesthesia. The brain is drawn at rest here.',
    afterCaption: 'After the course, the hippocampus and the amygdala are slightly larger than before, by a few percent. Volume rose with each session.',
    sameCaption:
      'A larger increase in the hippocampus did not go with a better outcome in the largest analysis, so the change in size does not explain the benefit. In people without depression scanned twice, the measurements stayed the same.',
    timedBy: [joshiDesign, oltedalSample],
  }),
  condition: {
    regions: [
      {
        region: 'hippocampus',
        explanation:
          'Smaller than in people without depression before treatment, in one study. Larger after a course of ECT, in that study and in a combined analysis of 281 patients, by about 0.28% per session on the right. In the smaller study, the increase went with improvement and a smaller hippocampus beforehand predicted a better response; in the larger analysis, people with bigger increases had poorer outcomes, though not significantly once the number of sessions was taken into account. Brightness stands for volume, not activity.',
        confidence: 'established',
        citations: [joshiBaseline, joshiIncrease, joshiPredict, oltedalDose, oltedalSample, oltedalPoorer, oltedalOutcome],
        keyframes: beforeAfter(-0.3, 0.55),
      },
      {
        region: 'amygdala',
        explanation: 'Larger after a course of ECT, in one study of 43 patients (including 7 with bipolar depression), and the increase went with symptom improvement on some ratings in that study. Brightness stands for volume, not activity.',
        confidence: 'mixed',
        citations: [joshiIncrease, joshiDesign, joshiControls],
        keyframes: after(0.4),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Electroconvulsive therapy (ECT)',
  category: 'treatment',
  treats: 'depression',
  notes: [
    'In this episode brightness shows volume, not activity; said in the description and on each region.',
    'The two studies disagree on whether the volume change relates to outcome: Joshi et al. 2016 found a relation with improvement; the larger Oltedal et al. 2018 analysis did not find a positive one. Both are cited and the caption follows the larger analysis.',
    'Read in full: Joshi et al. 2016, Oltedal et al. 2018.',
  ],
});
