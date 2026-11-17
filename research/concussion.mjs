// Concussion: a blow to the head, an energy crisis, and recovery over weeks.
//   node research/concussion.mjs
import { cite, kf, writeScore } from './lib.mjs';

const gizaCascade = cite(
  'giza2014',
  'The initial ionic flux and glutamate release result in significant energy demands and a period of metabolic crisis for the injured brain.',
);
const gizaSymptoms = cite(
  'giza2014',
  'These physiological perturbations can now be linked to clinical characteristics of concussion, including migrainous symptoms, vulnerability to repeat injury, and cognitive impairment.',
);
const gizaConcern = cite(
  'giza2014',
  'There is also increasing concern about the risk for chronic or even progressive neurobehavioral impairment after concussion/mild traumatic brain injury.',
);
const meierAnimal = cite(
  'meier2015',
  'Animal models suggest that reduced cerebral blood flow (CBF) is one of the most enduring physiological deficits following concussion.',
);
const meierRecovery = cite(
  'meier2015',
  'Imaging data suggested both cross-sectional (ie, healthy vs concussed athletes; P < .05) and longitudinal (1 day and 1 week vs 1 month postinjury; P < .001) evidence of CBF recovery in the right insular and superior temporal cortex.',
);
const meierSlow = cite(
  'meier2015',
  'CBF in the dorsal midinsular cortex was both decreased at 1 month postconcussion in slower-to-recover athletes (t11 = 3.45; P = .005) and was inversely related to the magnitude of initial psychiatric symptoms',
);
const meierSymptoms = cite(
  'meier2015',
  'The results indicated both cognitive (simple reaction time) and neuropsychiatric symptoms at 1 day postinjury that resolved at either 1 week (cognitive; P < .005) or 1 month (neuropsychiatric; P < .005) postinjury.',
);
const cookMfg = cite(
  'cook2020',
  'The results of our coordinate based meta-analysis revealed a single cluster of reduced activation within the right middle frontal gyrus (MFG) that differentiated mTBI from healthy controls.',
);
const cookSmall = cite(
  'cook2020',
  'The seven included studies recruited a total sample of 174 patients with mTBIs and 139 control participants.',
);

const score = {
  id: 'concussion',
  title: 'Concussion: a blow to the head and recovery',
  description:
    'A concussion is a mild brain injury from a blow or jolt to the head. The brain goes through an energy crisis and, for a time, works differently. The episode follows the first moments, the days after, and recovery over about a month, as seen in research on athletes and pooled studies of mild brain injury.',
  caveat:
    'The first two phases, the chemical surge and the energy crisis, are known mainly from animal studies, and no brain region is drawn for them because the injury affects the brain broadly. The blood-flow findings come from one study of 44 college football players, 17 of whom were scanned three times, and the activity finding from a pooled analysis of seven small studies. In the blood-flow regions, the dimming shows lower blood flow, not measured activity. In this study, symptoms eased within a week to a month, and some athletes were slower to recover. Reduced blood flow was already found about a day after injury, earlier than the regions are drawn changing. Whether concussions can have lasting effects is an area of active research and is not shown here.',
  durationSeconds: 36,
  phases: [
    {
      id: 'impact',
      name: 'The blow',
      timescale: 'seconds to minutes',
      start: 0,
      end: 0.16,
      caption:
        'The blow sets off a sudden flow of charged particles and a release of the chemical messenger glutamate. This affects the brain broadly, so no single region is drawn.',
    },
    {
      id: 'crisis',
      name: 'Energy crisis',
      timescale: 'hours to days',
      start: 0.16,
      end: 0.34,
      caption:
        'This creates heavy energy demands, and the injured brain goes through a period of metabolic crisis.',
      order: {
        kind: 'reconstructed',
        rationale: 'The sequence from chemical surge to energy crisis comes from animal models, summarised in a review.',
      },
    },
    {
      id: 'week',
      name: 'The first week',
      timescale: 'days to a week',
      start: 0.34,
      end: 0.66,
      caption:
        'Blood flow is lower than usual in the right insula and nearby temporal cortex. During thinking tasks, the right middle frontal gyrus, involved in attention, is less active. Slower reactions usually ease within a week.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The blood-flow study scanned athletes about a day and a week after injury; placing those findings after the energy crisis follows the animal timeline.',
      },
    },
    {
      id: 'recovery',
      name: 'Recovery',
      timescale: 'about a month',
      start: 0.66,
      end: 1,
      caption:
        'Over about a month blood flow recovers, and mood and anxiety symptoms ease. In athletes who were slower to recover, blood flow in part of the insula was still low at one month.',
      order: { kind: 'timed', citations: [meierRecovery] },
    },
  ],
  condition: {
    regions: [
      {
        region: 'insula-r',
        explanation:
          'Blood flow in the right insula was lower than in healthy athletes in the first week after concussion and recovered by about a month. In athletes who took longer to recover, blood flow in the middle of the insula was still low at one month. From one study of 44 players, 17 of them scanned three times. The dimming shows lower blood flow, not measured activity.',
        confidence: 'mixed',
        citations: [meierRecovery, meierSlow, meierAnimal],
        keyframes: kf(0, 0, 0.34, 0, 0.42, -0.5, 0.66, -0.45, 0.92, -0.05, 1, 0),
      },
      {
        region: 'lateral-temporal-r',
        explanation:
          'Blood flow in the right superior temporal cortex was lower in the first week after concussion and recovered by about a month. The whole lateral temporal cortex is drawn; the finding is for its upper part. From one study of 44 players, 17 of them scanned three times. The dimming shows lower blood flow, not measured activity.',
        confidence: 'mixed',
        citations: [meierRecovery],
        keyframes: kf(0, 0, 0.34, 0, 0.42, -0.4, 0.66, -0.35, 0.92, 0, 1, 0),
      },
      {
        region: 'dlpfc-r',
        explanation:
          'During thinking tasks in the first days and weeks after a mild brain injury, the right middle frontal gyrus, involved in attention, was less active than in healthy people. This was the only consistent finding in a pooled analysis of seven small studies. Those studies did not follow people further, so its return to normal is drawn as an assumption.',
        confidence: 'mixed',
        citations: [cookMfg, cookSmall],
        keyframes: kf(0, 0, 0.34, 0, 0.42, -0.4, 0.66, -0.4, 0.9, 0, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void gizaCascade;
void gizaSymptoms;
void gizaConcern;
void meierSymptoms;

writeScore(score, {
  indexTitle: 'Concussion',
  category: 'physical',
  notes: [
    'No typical-response comparison: the findings are already comparisons with healthy people.',
    'The first two phases draw no region. Giza & Hovda 2014 (abstract): "The initial ionic flux and glutamate release result in significant energy demands and a period of metabolic crisis for the injured brain." It is a whole-brain process known mainly from animal models.',
    'Symptoms: Meier et al. 2015 (abstract) report cognitive and neuropsychiatric symptoms at 1 day that "resolved at either 1 week (cognitive ...) or 1 month (neuropsychiatric ...)". Used in captions.',
    'Long-term risk is mentioned only in the caveat, as an area of research: Giza & Hovda 2014: "There is also increasing concern about the risk for chronic or even progressive neurobehavioral impairment after concussion/mild traumatic brain injury."',
    'The recovery phase is marked timed: Meier et al. 2015 scanned the same athletes at about 1 day, 1 week and 1 month.',
    'Read as abstracts only: all sources (the full texts could not be downloaded).',
  ],
});
