// What helps: cognitive behavioural therapy (CBT) for chronic pain.
//   node research/help-pain-cbt.mjs
import { cite, writeScore } from './lib.mjs';
import { after, beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const semIncrease = cite(
  'seminowicz2013',
  'After treatment, patients had increased GM in bilateral dorsolateral prefrontal (DLPFC), posterior parietal (PPC), subgenual anterior cingulate (ACC)/orbitofrontal, and sensorimotor cortices, as well as hippocampus, and reduced GM in supplementary motor area.',
);
const semClusters = cite(
  'seminowicz2013',
  'The clusters included left inferior PPC, right premotor/M1/S1, right hippocampus (HC), right DLPFC, left S1, left subgenual ACC/orbitofrontal cortex (sACC/OFC), left superior PPC, left inferior temporal cortex, S2/M1, right premotor/IFG, left inferior temporal.',
);
const semNoDiff = cite('seminowicz2013', 'Patients did not differ from healthy controls in GM anywhere in the brain.');
const semSma = cite(
  'seminowicz2013',
  'It is also worth noting that the one area that had reduced GM after CBT treatment – the SMA/pre-SMA – was the only region that had significantly greater GM in patients pre-CBT compared to controls (Fig 1), and after CBT the GM level decreased to a level more similar to controls, making this region the only one that showed normalization.',
);
const semDesign = cite(
  'seminowicz2013',
  'We used voxel based morphometry (VBM) to compare anatomical MRI scans of 13 patients with mixed chronic pain types before and after an 11-week CBT treatment and to 13 healthy control participants.',
);
const semDensity = cite(
  'seminowicz2013',
  'When no modulation was performed, results are referred to as changes in GMD (all comparisons involving both pre-CBT and post-CBT scans)',
);
const semCatastrophizing = cite(
  'seminowicz2013',
  'Decreased pain catastrophizing was associated with increased GM in left DLPFC and ventrolateral prefrontal (VLPFC), right PPC, somatosensory cortex, and pregenual ACC.',
);
const semOpposite = cite('seminowicz2013', 'There were also two clusters that were positively correlated with pain catastrophizing, right HC and right DLPFC.');
const semPain = cite(
  'seminowicz2013',
  'In fact, of all the clinical measures, pain and physical health were the only ones that did not show significant reductions after treatment',
);
const semAdaptive = cite('seminowicz2013', 'the GM changes reported in the current study are likely adaptive, rather than a return to normal levels');
const semNonspecific = cite(
  'seminowicz2013',
  'It is also possible that the changes we report herein are an effect of participating in the CBT intervention and are not specific to the cognitive therapy itself',
);

const MEASURE = 'Brightness stands for the amount of grey matter (grey matter density), not activity.';

const score = {
  id: 'help-pain-cbt',
  title: 'Talking therapy (CBT) for chronic pain',
  description: `CBT for chronic pain does not aim to remove the pain itself. It teaches ways of coping: pacing activity, changing unhelpful thoughts about pain and reducing fear of it. In one study, after 11 weeks of CBT, the amount of grey matter increased in areas at the front and side of the brain linked to controlling attention and re-thinking pain, and in areas that process body sensations, while it decreased in the supplementary motor area. ${MEASURE} In the first part it shows the difference from people without pain; in "What changed" it shows the change since before treatment.`,
  caveat: treatmentCaveat(
    'All findings come from one small study of 13 people with different types of chronic pain, with no comparison group receiving another treatment; the authors say the changes may come from taking part in the programme rather than from the therapy itself. Pain intensity itself did not improve significantly, although other measures did. Most increases went above the level of people without pain, which the authors read as adaptation rather than a return to normal. Most changed areas were on one side only, as drawn. "Posterior parietal" is drawn on the inferior parietal cortex and "subgenual anterior cingulate/orbitofrontal" on the subgenual cingulate; both are approximations.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption:
      'Before treatment, grey matter did not differ from people without chronic pain in the whole-brain comparison. In a closer look at single areas, only the supplementary motor area had more grey matter than in people without pain.',
    duringName: '11 weeks of CBT',
    duringTimescale: 'weeks',
    duringCaption: 'Weekly sessions of learning ways to cope with pain. People were not scanned during this time.',
    afterCaption:
      'After CBT, there is more grey matter than before in the dorsolateral prefrontal cortex, the left posterior parietal cortex, the left subgenual cingulate, the areas that sense and move the body, and the right hippocampus, and less in the supplementary motor area, which moved closer to people without pain.',
    sameCaption:
      'Pain intensity did not improve significantly. People who catastrophised less showed more growth in the left dorsolateral prefrontal cortex, but in the right one and the right hippocampus the relationship went the other way. One small study with no comparison treatment.',
    timedBy: [semDesign],
  }),
  condition: {
    regions: [
      {
        region: 'dlpfc',
        explanation: `More grey matter after 11 weeks of CBT in one study of 13 people; the abstract describes it as on both sides, and the detailed list names the right side. Less catastrophising about pain went with more growth on the left but with less on the right. ${MEASURE}`,
        confidence: 'mixed',
        citations: [semIncrease, semClusters, semCatastrophizing, semOpposite, semDesign, semNoDiff, semDensity, semPain, semAdaptive, semNonspecific],
        keyframes: after(0.45),
      },
      {
        region: 'inferior-parietal-l',
        explanation: `The left inferior posterior parietal cortex had more grey matter after CBT, in one study. Drawn on the left inferior parietal cortex, an approximation. ${MEASURE}`,
        confidence: 'mixed',
        citations: [semIncrease, semClusters],
        keyframes: after(0.4),
      },
      {
        region: 'sgacc-l',
        explanation: `The left subgenual anterior cingulate and nearby orbitofrontal cortex had more grey matter after CBT, in one study. Drawn on the left subgenual cingulate, an approximation. ${MEASURE}`,
        confidence: 'mixed',
        citations: [semIncrease, semClusters],
        keyframes: after(0.4),
      },
      {
        region: 'somatosensory',
        explanation: `The sensory cortex had more grey matter after CBT, in one study (right and left clusters). ${MEASURE}`,
        confidence: 'mixed',
        citations: [semIncrease, semClusters],
        keyframes: after(0.35),
      },
      {
        region: 'motor-cortex-r',
        explanation: `The right premotor and primary motor cortex had more grey matter after CBT, in one study. ${MEASURE}`,
        confidence: 'mixed',
        citations: [semIncrease, semClusters],
        keyframes: after(0.3),
      },
      {
        region: 'hippocampus-r',
        explanation: `The right hippocampus had more grey matter after CBT, in one study. In this area, less catastrophising went with less growth, not more. ${MEASURE}`,
        confidence: 'mixed',
        citations: [semClusters, semOpposite],
        keyframes: after(0.35),
      },
      {
        region: 'sma',
        explanation: `The only area with more grey matter than in people without pain before treatment, in a region-level test, and the only one with less after CBT, moving closer to people without pain. The paper places it on the right in one section and the left in another, so both sides are drawn. ${MEASURE}`,
        confidence: 'mixed',
        citations: [semSma, semIncrease],
        keyframes: beforeAfter(0.3, -0.35),
      },
    ],
    connections: [],
  },
  typical: null,
};


writeScore(score, {
  indexTitle: 'Talking therapy (CBT) for chronic pain',
  category: 'treatment',
  treats: 'chronicpain',
  notes: [
    'Before-after comparisons used grey matter density (unmodulated), not volume: "When no modulation was performed, results are referred to as changes in GMD".',
    'Pain did not reduce significantly ("pain and physical health were the only ones that did not show significant reductions"); stated in the caveat and last caption.',
    'The authors call the changes "likely adaptive, rather than a return to normal levels" and possibly "not specific to the cognitive therapy itself"; both in the caveat.',
    'Read in full: Seminowicz et al. 2013.',
  ],
});
