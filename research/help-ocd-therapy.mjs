// What helps: exposure and response prevention (behaviour therapy) for OCD.
//   node research/help-ocd-therapy.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const baxterCaudate = cite(
  'baxter1992',
  'After treatment, LCMRG1c in the head of the right caudate nucleus, divided by that in the ipsilateral hemisphere (Cd/hem), was decreased significantly compared with pretreatment values in responders to both drug and behavior therapy.',
);
const baxterNonresponders = cite(
  'baxter1992',
  'These decreases in responders were also significantly greater than right Cd/hem changes in nonresponders and normal controls, in both of whom values did not change from baseline.',
);
const baxterDesign = cite(
  'baxter1992',
  'We used positron emission tomography to investigate local cerebral metabolic rates for glucose (LCMRG1c) in patients with obsessive-compulsive disorder before and after treatment with either fluoxetine hydrochloride or behavior therapy.',
);
const schwartzBilateral = cite(
  'schwartz1996',
  'Behavior therapy responders had significant (P < .05) bilateral decreases in caudate glucose metabolic rates that were greater than those seen in poor responders to treatment.',
);
const schwartzCircuit = cite(
  'schwartz1996',
  'Before treatment, there were significant correlations of brain activity between the orbital gyri and the head of the caudate nucleus and the orbital gyri and the thalamus on the right. These correlations decreased significantly after effective treatment.',
);
const schwartzDesign = cite(
  'schwartz1996',
  'Nine patients with obsessive-compulsive disorder were studied with positron emission tomography before and after 10 weeks of structured exposure and response prevention behavioral and cognitive treatment.',
);

const score = {
  id: 'help-ocd-therapy',
  title: 'Exposure therapy for OCD',
  description:
    'Exposure and response prevention is a behaviour therapy for obsessive-compulsive disorder: people gradually face what triggers their obsessions while resisting the urge to carry out the compulsion, until the anxiety fades on its own. Two studies by the same group measured the brain\'s energy use before and after treatment. In people who improved, the caudate, part of the striatum, used less energy afterwards. The same was found with the medicine fluoxetine. In this episode brightness stands for energy use (glucose metabolism) relative to the rest of the brain. It shows the change since before treatment: violet means less than before.',
  caveat: treatmentCaveat(
    'These are two small, older studies by one research group, with 9 people in each behaviour therapy sample, using PET scans of glucose use rather than fMRI. The decrease was found in people who responded to treatment; in those who did not, and in people without OCD, it did not change. The sources read do not report how the brain differed from people without OCD before treatment, so the first part is drawn at rest.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Before treatment. The comparison here starts from each person\'s own level, so the brain is drawn at rest.',
    duringName: 'Ten weeks of therapy',
    duringTimescale: 'weeks',
    duringCaption: 'About ten weeks of facing triggers without carrying out the compulsion. People were not scanned during this time.',
    afterCaption:
      'In people who improved, the caudate uses less energy than before, on both sides in the second study. Before treatment, activity in the orbitofrontal cortex rose and fell together with the caudate and thalamus across people; after successful treatment, it did so much less.',
    sameCaption:
      'In people who did not improve, and in people without OCD scanned twice, the caudate did not change. The same change was seen with the medicine fluoxetine, so it may reflect getting better rather than the therapy itself.',
    timedBy: [baxterDesign, schwartzDesign],
  }),
  condition: {
    regions: [
      {
        region: 'caudate',
        explanation:
          'Used less energy after treatment in people who responded, on the right in one study and on both sides in a second study by the same group. In non-responders and people without OCD it did not change. Brightness stands for glucose use relative to the rest of the brain, not activity measured by fMRI.',
        confidence: 'mixed',
        citations: [baxterCaudate, baxterNonresponders, schwartzBilateral, schwartzDesign],
        keyframes: after(-0.5),
      },
    ],
    connections: [],
  },
  typical: null,
};

void schwartzCircuit;

writeScore(score, {
  indexTitle: 'Exposure therapy for OCD',
  category: 'treatment',
  treats: 'ocd',
  notes: [
    'The orbitofrontal-caudate and orbitofrontal-thalamus correlations are correlations across people, not connectivity within one person; described in the caption, not drawn as lines.',
    'Baxter et al. 1992 found the same caudate decrease with fluoxetine; said in the description and last caption rather than making a separate episode.',
    'Read as abstracts only: Baxter et al. 1992, Schwartz et al. 1996.',
  ],
});
