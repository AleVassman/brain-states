// What helps: cognitive behavioural therapy (CBT) for chronic pain.
//   node research/help-pain-cbt.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const semIncrease = cite(
  'seminowicz2013',
  'After treatment, patients had increased GM in bilateral dorsolateral prefrontal (DLPFC), posterior parietal (PPC), subgenual anterior cingulate (ACC)/orbitofrontal, and sensorimotor cortices, as well as hippocampus, and reduced GM in supplementary motor area.',
);
const semNoDiff = cite('seminowicz2013', 'Patients did not differ from healthy controls in GM anywhere in the brain.');
const semDesign = cite(
  'seminowicz2013',
  'We used voxel based morphometry (VBM) to compare anatomical MRI scans of 13 patients with mixed chronic pain types before and after an 11-week CBT treatment and to 13 healthy control participants.',
);
const semCatastrophizing = cite(
  'seminowicz2013',
  'Decreased pain catastrophizing was associated with increased GM in left DLPFC and ventrolateral prefrontal (VLPFC), right PPC, somatosensory cortex, and pregenual ACC.',
);
const semCaution = cite(
  'seminowicz2013',
  'While future studies with additional control groups will be needed to determine the specific roles of CBT on GM and brain function',
);

const score = {
  id: 'help-pain-cbt',
  title: 'Talking therapy (CBT) for chronic pain',
  description:
    'CBT for chronic pain does not aim to remove the pain itself. It teaches ways of coping: pacing activity, changing unhelpful thoughts about pain and reducing fear of it. In one study, after 11 weeks of CBT, grey matter grew in areas at the front and side of the brain linked to controlling attention and re-thinking pain, and in areas that process body sensations. In this episode brightness stands for grey matter volume, not activity, and shows the change since before treatment: warmer means more than before, violet means less.',
  caveat: treatmentCaveat(
    'All findings come from one study of 13 people with different types of chronic pain, with no control group receiving another treatment, so the authors say more studies are needed to tell which changes are due to CBT. Before treatment their grey matter did not differ from people without pain, so the first part is drawn at rest. "Posterior parietal" is drawn on the inferior parietal cortex, and "subgenual anterior cingulate/orbitofrontal" on the subgenual cingulate; both are approximations.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before treatment. In this study, grey matter did not differ from people without chronic pain anywhere in the brain, so the brain is drawn at rest.',
    duringName: '11 weeks of CBT',
    duringTimescale: 'weeks',
    duringCaption: 'Weekly sessions of learning ways to cope with pain. People were not scanned during this time.',
    afterCaption:
      'After CBT, grey matter is greater than before in the dorsolateral prefrontal cortex on both sides, the posterior parietal cortex, the subgenual cingulate, the areas that sense and move the body, and the hippocampus. It is smaller in the supplementary motor area. People who worried less about their pain showed more growth in several of these areas.',
    sameCaption:
      'This is one small study with no comparison treatment. The authors suggest the frontal and parietal growth reflects more control over pain, but that is their interpretation.',
    timedBy: [semDesign],
  }),
  condition: {
    regions: [
      {
        region: 'dlpfc',
        explanation:
          'More grey matter after 11 weeks of CBT, on both sides, in one study of 13 people. On the left, more growth went with less catastrophising about pain. Brightness stands for volume, not activity.',
        confidence: 'mixed',
        citations: [semIncrease, semCatastrophizing, semDesign],
        keyframes: after(0.5),
      },
      {
        region: 'inferior-parietal',
        explanation: 'The posterior parietal cortex had more grey matter after CBT, in one study. It is drawn on the inferior parietal cortex, an approximation.',
        confidence: 'mixed',
        citations: [semIncrease],
        keyframes: after(0.4),
      },
      {
        region: 'sgacc',
        explanation: 'The subgenual anterior cingulate and nearby orbitofrontal cortex had more grey matter after CBT, in one study.',
        confidence: 'mixed',
        citations: [semIncrease],
        keyframes: after(0.4),
      },
      {
        region: 'somatosensory',
        explanation: 'The sensorimotor cortex had more grey matter after CBT, in one study.',
        confidence: 'mixed',
        citations: [semIncrease, semCatastrophizing],
        keyframes: after(0.35),
      },
      {
        region: 'motor-cortex',
        explanation: 'The sensorimotor cortex had more grey matter after CBT, in one study; it spans the areas that sense and move the body.',
        confidence: 'mixed',
        citations: [semIncrease],
        keyframes: after(0.3),
      },
      {
        region: 'hippocampus',
        explanation: 'More grey matter after CBT, in one study.',
        confidence: 'mixed',
        citations: [semIncrease],
        keyframes: after(0.35),
      },
      {
        region: 'sma',
        explanation: 'Less grey matter after CBT, in one study.',
        confidence: 'mixed',
        citations: [semIncrease],
        keyframes: after(-0.35),
      },
    ],
    connections: [],
  },
  typical: null,
};

void semNoDiff;
void semCaution;

writeScore(score, {
  indexTitle: 'Talking therapy (CBT) for chronic pain',
  category: 'treatment',
  treats: 'chronicpain',
  notes: [
    'Brightness is grey matter volume; said in the description and on each region.',
    'Seminowicz et al. 2013 report that "In most of these areas showing GM increases, GM became significantly higher than in controls"; reflected by not describing this as a return to normal.',
    'Read in full: Seminowicz et al. 2013.',
  ],
});
