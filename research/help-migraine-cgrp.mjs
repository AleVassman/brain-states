// What helps: a CGRP antibody (galcanezumab) to prevent migraine.
//   node research/help-migraine-cgrp.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const basHypothalamus = cite(
  'basedau2022',
  'We found that galcanezumab decreases hypothalamic activation in all patients and that the reduction was stronger in responders than in non-responders.',
);
const basDesign = cite(
  'basedau2022',
  'Using an established trigeminal nociceptive functional magnetic imaging paradigm, 26 migraine patients were subsequently scanned twice: before and 2–3 weeks after administration of galcanezumab.',
);
const basDistinct = cite('basedau2022', 'Contrasting erenumab and galcanezumab showed that both antibodies activate a distinct network.');

const score = {
  id: 'help-migraine-cgrp',
  title: 'Preventing migraine: a CGRP antibody',
  description:
    'CGRP is a signalling molecule released during migraine attacks. Antibodies against it, given as a monthly injection, are a newer way of preventing attacks. One study scanned people with migraine while a painful stimulus was applied to the face, before and two to three weeks after an injection of galcanezumab. Afterwards, the hypothalamus, which is active in the early stages of an attack, responded less, more so in people whose migraines improved. In this episode brightness shows the change since before treatment: violet means less than before.',
  caveat: treatmentCaveat(
    'All findings come from one study of 26 people with migraine, scanned between attacks during a test with a painful stimulus to the face, not during a migraine attack. A related antibody that blocks the CGRP receptor instead (erenumab) produced a different pattern in an earlier study, so the brain effect depends on the antibody. The source reports no difference from people without migraine, so the first part is drawn at rest.',
  ),
  durationSeconds: 30,
  phases: treatmentPhases({
    beforeCaption: 'Before the injection, between attacks. The comparison here starts from each person\'s own level, so the brain is drawn at rest.',
    duringName: 'One injection',
    duringTimescale: 'weeks',
    duringCaption: 'A single injection of the antibody, then two to three weeks before the second scan. The brain is drawn at rest here.',
    afterCaption:
      'During the same painful test, the hypothalamus responds less than before the injection, in everyone, and more so in people whose migraines improved.',
    sameCaption:
      'A related antibody that blocks the CGRP receptor instead acted on a different network. This study looked at a pain test between attacks, not at the attacks themselves.',
    timedBy: [basDesign],
  }),
  condition: {
    regions: [
      {
        region: 'hypothalamus',
        explanation:
          'Less active during a painful stimulus to the face two to three weeks after a galcanezumab injection than before it, in all 26 people in one study; the reduction was larger in those whose migraines improved.',
        confidence: 'mixed',
        citations: [basHypothalamus, basDesign, basDistinct],
        keyframes: after(-0.5),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Preventing migraine (CGRP antibody)',
  category: 'treatment',
  treats: 'migraine',
  notes: [
    'The spinal trigeminal nucleus findings in Basedau et al. 2022 predict response; they are not a change and are not drawn, and the nucleus is not a region in the brain model.',
    'Read in full: Basedau et al. 2022.',
  ],
});
