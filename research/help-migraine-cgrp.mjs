// What helps: a CGRP antibody (galcanezumab) to prevent migraine.
//   node research/help-migraine-cgrp.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const basHypothalamus = cite(
  'basedau2022',
  'We found that galcanezumab decreases hypothalamic activation in all patients and that the reduction was stronger in responders than in non-responders.',
);
const basRegions = cite(
  'basedau2022',
  'was associated with a decrease in activation in the right hypothalamus, right cerebellum, and cerebellar vermis',
);
const basDesign = cite(
  'basedau2022',
  'Using an established trigeminal nociceptive functional magnetic imaging paradigm, 26 migraine patients were subsequently scanned twice: before and 2–3 weeks after administration of galcanezumab.',
);
const basDose = cite('basedau2022', 'Following the first scan, the loading dose of galcanezumab 240 mg was administered subcutaneously');
const basHeadache = cite(
  'basedau2022',
  'Fourteen patients had headache on visit 1, whereas only 11 patients had headache on visit 2, resulting in a total of 15 patients (episodic n=6, chronic n=9) who had equal headache (n=7) or no headache (n=8) on both dates',
);
const basResponder = cite('basedau2022', 'we defined and preregistered ‘being a responder’ by showing a 30% reduction in headache frequency after 3 treatment months');
const basStimulus = cite('basedau2022', 'participants received 15 repetitive painful trigeminal stimulations by administering gaseous ammonia (mixed in a stream of air) into the left nostril');
const basDistinct = cite('basedau2022', 'Contrasting erenumab and galcanezumab showed that both antibodies activate a distinct network.');

const score = {
  id: 'help-migraine-cgrp',
  title: 'Preventing migraine: a CGRP antibody',
  description:
    'CGRP is a signalling molecule involved in migraine. Antibodies against it, given as an injection under the skin, are a newer way of preventing attacks. One study scanned people with migraine while a painful stimulus (ammonia gas puffed into one nostril) was applied, before and two to three weeks after a first injection of galcanezumab. Afterwards, the hypothalamus and parts of the cerebellum responded less on average. In this episode brightness shows the change since before treatment: violet means less than before.',
  caveat: treatmentCaveat(
    'All findings come from one study of 26 people with migraine, without a comparison group of people without migraine. Some had a headache on one or both scan days. The larger reduction in people whose migraines improved, meaning 30% fewer headache days after three months, comes from a subgroup of 15 who had the same headache state at both scans. A related antibody that blocks the CGRP receptor instead (erenumab) acted on a different network in an earlier study, so the brain effect depends on the antibody.',
  ),
  durationSeconds: 30,
  phases: treatmentPhases({
    beforeCaption: 'Before the first injection. The study had no group without migraine, so the comparison starts from each person\'s own level and the brain is drawn at rest.',
    duringName: 'One injection',
    duringTimescale: 'weeks',
    duringCaption: 'A first (loading) dose of the antibody, then two to three weeks before the second scan. The brain is drawn at rest here.',
    afterCaption:
      'During the same painful test, the hypothalamus and parts of the cerebellum respond less than before the injection, on average across all 26 people. In a subgroup, the hypothalamus reduction was larger in people whose migraines improved.',
    sameCaption: 'A related antibody that blocks the CGRP receptor instead acted on a different network. This study measured a pain test, not migraine attacks themselves.',
    timedBy: [basDesign],
  }),
  condition: {
    regions: [
      {
        region: 'hypothalamus',
        explanation:
          'Less active during a painful stimulus two to three weeks after a galcanezumab injection than before it, on average across 26 people, in one study; the finding was on the right. In a subgroup of 15, the reduction was larger in those whose migraines improved.',
        confidence: 'mixed',
        citations: [basHypothalamus, basRegions, basDesign, basResponder, basHeadache, basDistinct],
        keyframes: after(-0.5),
      },
      {
        region: 'cerebellum-mid',
        explanation: 'The right cerebellum and the cerebellar vermis were less active during the painful stimulus after the injection, on average, in one study.',
        confidence: 'mixed',
        citations: [basRegions, basDose, basStimulus],
        keyframes: after(-0.35),
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
    '"In all patients" in the abstract is the whole-group average; the text says "on average".',
    'The spinal trigeminal nucleus findings predict response; not a change and not a model region.',
    'Read in full: Basedau et al. 2022.',
  ],
});
