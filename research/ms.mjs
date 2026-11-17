// Multiple sclerosis: damage to the brain's wiring, and the extra work the cortex does to keep a hand moving.
//   node research/ms.mjs
import { cite, kf, writeScore } from './lib.mjs';

const filippiDiffuse = cite(
  'filippi2009',
  'Our current understanding of the pathophysiology of MS is that this is not only a disease of the white matter, characterized by focal inflammatory lesions, but also a disease involving more subtle and diffuse damage throughout the white and gray matter.',
);
const filippiAdaptive = cite(
  'filippi2009',
  'functional MRI can provide new insights into the role of cortical adaptive changes in limiting the clinical consequences of MS-related irreversible structural damage',
);
const roccaIncreased = cite(
  'rocca2002',
  'Compared with control subjects, patients with MS showed increased activation of brain regions within both traditional motor planning and execution regions (including the supplementary motor area and the cingulate motor area), the insula (a region implicated in sensory processing), and several multimodal cortical regions in the temporal, parietal, and occipital lobes.',
);
const roccaLesions = cite(
  'rocca2002',
  'In patients, the extent of the fMRI activations was strongly correlated with MR lesion burden (r ranging from 0.70 to 0.86, p < 0.001).',
);
const roccaAdaptive = cite(
  'rocca2002',
  'It also suggests that adaptive cortical reorganization might be one of the mechanisms limiting the clinical impact of MS in the progressive phases of the disease.',
);
const roccaSample = cite(
  'rocca2002',
  'fMRI was used to assess patterns of brain activations associated with 3 different motor tasks in 30 right-handed patients with primary progressive MS (PPMS) and variable degrees of motor impairment, which were compared with those from 15 right-handed, sex- and age-matched control subjects.',
);
const quMixed = cite(
  'qu2026',
  'whereas hypoconnectivity was observed in left posterior cingulate gyrus (DMN), right supplementary motor region and left precentral gyrus (SMN), right insula (SN), and left superior parietal gyrus (VN)',
);
const thompsonOverview = cite(
  'thompson2018',
  'Multiple sclerosis continues to be a challenging and disabling condition but there is now greater understanding of the underlying genetic and environmental factors that drive the condition',
);

const score = {
  id: 'ms',
  title: 'Multiple sclerosis: damaged wiring, extra work',
  description:
    'In multiple sclerosis the immune system damages the insulation of nerve fibres, and over time the fibres and grey matter themselves. The episode follows what is seen when a person with MS moves a hand: more of the cortex is active than in someone without MS, and the more damage there is, the more widespread that activity. Researchers think this extra activity may help limit the effect of the damage.',
  caveat:
    'The damage itself, in the white matter and grey matter, is spread through the brain and is described, not drawn. The activity findings come from one study of 30 people with the primary progressive form of MS, which is less common than the relapsing form, so they may not apply to everyone with MS. That the extra activity is helpful is the researchers\' suggestion. A large pooled analysis of brain activity at rest found both stronger and weaker links in these same areas, so the picture depends on what is measured.',
  durationSeconds: 34,
  phases: [
    {
      id: 'damage',
      name: 'Damage to the wiring',
      timescale: 'years',
      start: 0,
      end: 0.3,
      caption:
        'Patches of inflammation damage the insulation of nerve fibres, and more subtle damage spreads through the white and grey matter. This is spread widely, so it is described, not drawn.',
    },
    {
      id: 'moving',
      name: 'Moving a hand',
      timescale: 'seconds',
      start: 0.3,
      end: 0.7,
      caption:
        'When the person moves their hand, more of the brain is active than in someone without MS: the supplementary motor area, the insula, and areas in the temporal, parietal and occipital lobes that combine information from different senses.',
      order: { kind: 'reconstructed', rationale: 'The movement findings compare people with MS and healthy people at one time point. Placing them after the damage is an inference from the activity being related to the amount of damage.' },
    },
    {
      id: 'extent',
      name: 'More damage, more spread',
      timescale: 'across people',
      start: 0.7,
      end: 0.9,
      caption:
        'The more damage visible on scans, the more widespread this extra activity. Researchers suggest the brain may be recruiting extra areas to limit the effect of the damage.',
      order: { kind: 'reconstructed', rationale: 'This is a relationship across people with different amounts of damage, not a change over time in one person.' },
    },
    {
      id: 'rest',
      name: 'At rest',
      timescale: 'seconds',
      start: 0.9,
      end: 1,
      caption: 'The hand is still and the extra activity is no longer drawn.',
      order: { kind: 'reconstructed', rationale: 'The movement findings apply while moving; returning to rest follows from that.' },
    },
  ],
  condition: {
    regions: [
      {
        region: 'sma',
        explanation:
          'More active than in people without MS while moving a hand, in one study of 30 people with primary progressive MS. A pooled analysis of the brain at rest found the right supplementary motor area less connected, so findings differ between activity during movement and connections at rest.',
        confidence: 'mixed',
        citations: [roccaIncreased, roccaSample, quMixed],
        keyframes: kf(0, 0, 0.3, 0, 0.42, 0.6, 0.9, 0.6, 0.96, 0, 1, 0),
      },
      {
        region: 'insula',
        explanation:
          'More active than in people without MS while moving a hand, in one study of 30 people with primary progressive MS. A pooled analysis of the brain at rest found the right insula less connected.',
        confidence: 'mixed',
        citations: [roccaIncreased, roccaSample, quMixed],
        keyframes: kf(0, 0, 0.3, 0, 0.44, 0.45, 0.9, 0.45, 0.96, 0, 1, 0),
      },
      {
        region: 'lateral-temporal',
        explanation:
          'Areas in the temporal lobe that combine information from different senses were more active while moving a hand, in one study. The abstract does not name the exact areas; the lateral temporal cortex is drawn. Shown only modestly.',
        confidence: 'mixed',
        citations: [roccaIncreased],
        keyframes: kf(0, 0, 0.3, 0, 0.46, 0.3, 0.7, 0.3, 0.8, 0.45, 0.9, 0.45, 0.96, 0, 1, 0),
      },
      {
        region: 'inferior-parietal',
        explanation:
          'Areas in the parietal lobe that combine information from different senses were more active while moving a hand, in one study. The abstract does not name the exact areas; the inferior parietal cortex is drawn. The more damage, the more widespread the activity.',
        confidence: 'mixed',
        citations: [roccaIncreased, roccaLesions],
        keyframes: kf(0, 0, 0.3, 0, 0.46, 0.3, 0.7, 0.3, 0.8, 0.45, 0.9, 0.45, 0.96, 0, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void filippiDiffuse;
void filippiAdaptive;
void roccaAdaptive;
void thompsonOverview;

writeScore(score, {
  indexTitle: 'Multiple sclerosis',
  category: 'physical',
  notes: [
    'The "more damage, more spread" phase shows the correlation across people (Rocca et al. 2002: "the extent of the fMRI activations was strongly correlated with MR lesion burden") as a modest further rise in the temporal and parietal areas; that is an illustration of a relationship across people, not a change measured in one person.',
    'The cingulate motor area is reported by Rocca et al. 2002 but is not a separate region in the brain model.',
    'All movement findings are from primary progressive MS (30 patients, 15 controls).',
    'No typical-response comparison is drawn; the findings are already comparisons with healthy people.',
    'Read as abstracts only: all sources.',
  ],
});
