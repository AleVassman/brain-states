// What helps: antipsychotic medication in a first episode of psychosis.
//   node research/help-antipsychotics.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const sarpalPaired = cite(
  'sarpal2015',
  'Our FEP group showed only one significant, masked, finding between baseline and follow-up scans in paired comparisons: the right VSS showed increased connectivity with the thalamus on the left side',
);
const sarpalIncrease = cite(
  'sarpal2015',
  'As psychosis improved, we observed an increase in functional connectivity between striatal seed regions and the anterior cingulate, dorsolateral prefrontal cortex, and limbic regions such as the hippocampus and anterior insula.',
);
const sarpalParietal = cite(
  'sarpal2015',
  'Conversely, a negative relationship was observed between reduction in psychosis and functional connectivity of striatal regions with structures within the parietal lobe.',
);
const sarpalRegression = cite(
  'sarpal2015',
  'This image -- representing the change in correlation at each voxel -- was then taken into a group level multiple regression analysis with reduction in PSx (baseline PSx - follow-up PSx) as a regressor',
);
const sarpalNoBaseline = cite(
  'sarpal2015',
  'Interestingly we did not observe significant baseline differences in functional connectivity of the striatum between healthy individuals and our patients with psychosis',
);
const sarpalDesign = cite('sarpal2015', 'Patients were scanned at baseline and after 12 weeks of treatment with either risperidone or aripiprazole.');
const sarpalSample = cite(
  'sarpal2015',
  'Twenty-four patients with first-episode psychosis and twenty-four healthy participants, matched for age, sex, education, and handedness.',
);
const sarpalState = cite('sarpal2015', 'Our results indicate that corticostriatal functional dysconnectivity in psychosis is a state-dependent phenomenon.');

const score = {
  id: 'help-antipsychotics',
  title: 'Antipsychotic medication for psychosis',
  description:
    'Antipsychotic medication is the main treatment for psychosis, and the striatum, deep in the brain, is its main target. One study scanned people at rest during a first episode of psychosis, before and after 12 weeks of treatment. Across the group, one link strengthened: between the right ventral striatum and the left thalamus. The people whose psychosis improved most also showed the largest strengthening of links between the striatum and the front of the brain, the hippocampus and the insula; that is a relationship across people and is described, not drawn. The line shows the change in how closely two areas work together since before treatment: pulsing means more.',
  caveat: treatmentCaveat(
    'All findings come from one study of 24 people in a first episode of psychosis, treated with risperidone or aripiprazole, and 24 people without psychosis scanned twice. Only one link changed across the whole group; the other findings link the size of the change in each person to how much their psychosis improved. Before treatment, the striatum\'s links did not differ significantly from people without psychosis. The right ventral striatum is drawn as the right caudate, an approximation.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Early in a first episode of psychosis. In this study the striatum\'s links did not differ from people without psychosis, so the brain is drawn at rest.',
    duringName: 'Twelve weeks of medication',
    duringTimescale: 'weeks',
    duringCaption: 'Daily antipsychotic medication. People were not scanned during this time.',
    afterCaption:
      'After twelve weeks, the right ventral striatum works more closely with the left thalamus. In the people whose psychosis improved most, the striatum also came to work more closely with the anterior cingulate, the dorsolateral prefrontal cortex, the hippocampus and the anterior insula, and less closely with parietal areas.',
    sameCaption:
      'Most of the striatum\'s links did not change across the group as a whole; the changes tracked how much each person improved. Side effects and longer-term changes were not part of this study.',
    timedBy: [sarpalDesign],
  }),
  condition: {
    regions: [],
    connections: [
      {
        from: 'caudate-r',
        to: 'thalamus-l',
        explanation:
          'The right ventral striatum worked more closely with the left thalamus after 12 weeks of antipsychotic treatment, the only link that changed across the whole group, in one study of 24 people. Drawn from the right caudate, an approximation. The other striatal links changed in proportion to how much psychosis improved, a relationship across people that is described but not drawn.',
        confidence: 'mixed',
        citations: [sarpalPaired, sarpalSample, sarpalIncrease, sarpalParietal, sarpalRegression, sarpalNoBaseline, sarpalState],
        keyframes: after(0.45),
      },
    ],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Antipsychotic medication',
  category: 'treatment',
  treats: 'psychosis',
  notes: [
    'Only the paired before-after change (right ventral striatum to left thalamus) is drawn; the relationships with symptom improvement come from a regression across people and are captions only.',
    'The negative relationship with parietal links is an inverse relationship across people; not drawn.',
    'Read in full: Sarpal et al. 2015.',
  ],
});
