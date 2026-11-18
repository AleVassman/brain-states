// What helps: staying off methamphetamine (protracted abstinence).
//   node research/help-abstinence.mjs
import { cite, writeScore } from './lib.mjs';
import { beforeAfter, treatmentCaveat, treatmentPhases } from './helps.mjs';

const volkowRecovery = cite(
  'volkow2001',
  'Brain DA transporters in five methamphetamine abusers evaluated during short abstinence (<6 months) and then retested during protracted abstinence (12–17 months) showed significant increases with protracted abstinence (caudate, +19%; putamen, +16%).',
);
const volkowLoss = cite(
  'volkow2001',
  'Although the DAT loss reported in METH abusers (24–30%) is smaller than that reported in Parkinson\'s disease (36 and 71%) (Frost et al., 1993; Innis et al., 1993), it is nonetheless associated with reduced motor speed and impaired verbal learning (Volkow et al., 2001).',
);
const volkowFunction = cite(
  'volkow2001',
  'Because neuropsychological tests did not improve to the same extent, this suggests that the increase of the DA transporters was not sufficient for complete function recovery.',
);
const volkowMeaning = cite(
  'volkow2001',
  'These findings have treatment implications because they suggest that protracted abstinence may reverse some of methamphetamine-induced alterations in brain DA terminals.',
);
const volkowDesign = cite(
  'volkow2001',
  'Five METH abusers (three females, two males; 29 ± 3 years of age) were evaluated twice: during early (mean ± SD, 3 ± 1.6 months of abstinence) and then at least 9 months later during protracted abstinence (mean ± SD, 14 ± 2 months).',
);

const score = {
  id: 'help-abstinence',
  title: 'Staying off methamphetamine: recovery over a year',
  description:
    'Heavy methamphetamine use reduces the dopamine transporters in the striatum, a marker of the dopamine nerve endings that carry reward signals. One study scanned people early in recovery and again after more than a year without the drug. The transporters had partly come back. In this episode brightness stands for the amount of dopamine transporter, not activity. In the first part it shows the loss compared with people who do not use drugs; in "What changed" it shows the change since early recovery.',
  caveat: treatmentCaveat(
    'This is one small study: five people, all in a court-supervised rehabilitation programme, who stayed off the drug for over a year, scanned twice with PET. The loss shown in the first part is the 24-30% loss the same group reported earlier. Recovery of the transporters did not bring equal recovery in memory and movement tests. It is about methamphetamine only, and about staying off it, not a specific treatment.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'In early recovery, the dopamine transporters in the striatum are about a quarter lower than in people who do not use drugs.',
    duringName: 'More than a year drug-free',
    duringTimescale: 'about a year',
    duringCaption: 'Staying off the drug, with regular drug testing. The brain is drawn at rest here.',
    afterCaption: 'After more than a year without the drug, the transporters have increased: by about 19% in the caudate and 16% in the putamen.',
    sameCaption:
      'Memory and movement tests did not improve to the same extent, so the recovery was not complete. The authors conclude that staying off the drug may reverse some of the changes, not all of them.',
    timedBy: [volkowDesign],
  }),
  condition: {
    regions: [
      {
        region: 'caudate',
        explanation:
          'Dopamine transporters were about a quarter lower than in people who do not use drugs early in recovery, and rose by 19% after more than a year without the drug, in one study of five people. Brightness stands for the amount of transporter, not activity.',
        confidence: 'mixed',
        citations: [volkowLoss, volkowRecovery, volkowDesign, volkowFunction],
        keyframes: beforeAfter(-0.45, 0.4),
      },
      {
        region: 'putamen',
        explanation:
          'Dopamine transporters were about a quarter lower than in people who do not use drugs early in recovery, and rose by 16% after more than a year without the drug, in one study of five people. Brightness stands for the amount of transporter, not activity.',
        confidence: 'mixed',
        citations: [volkowLoss, volkowRecovery, volkowMeaning],
        keyframes: beforeAfter(-0.45, 0.35),
      },
    ],
    connections: [],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Staying off methamphetamine',
  category: 'treatment',
  treats: 'craving',
  notes: [
    'Not a specific therapy: the "treatment" is protracted abstinence within a supervised programme; the caveat says so.',
    'The pre-treatment loss (24-30%) is quoted from this paper\'s report of the group\'s earlier study of the same people.',
    'Linked to "Addiction and craving"; the craving episode is not specific to methamphetamine, and the caveat says this one is.',
    'Read in full: Volkow et al. 2001.',
  ],
});
