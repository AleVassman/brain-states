// What helps: antipsychotic medication in a first episode of psychosis.
//   node research/help-antipsychotics.mjs
import { cite, writeScore } from './lib.mjs';
import { after, treatmentCaveat, treatmentPhases } from './helps.mjs';

const sarpalIncrease = cite(
  'sarpal2015',
  'As psychosis improved, we observed an increase in functional connectivity between striatal seed regions and the anterior cingulate, dorsolateral prefrontal cortex, and limbic regions such as the hippocampus and anterior insula.',
);
const sarpalParietal = cite(
  'sarpal2015',
  'Conversely, a negative relationship was observed between reduction in psychosis and functional connectivity of striatal regions with structures within the parietal lobe.',
);
const sarpalDesign = cite('sarpal2015', 'Patients were scanned at baseline and after 12 weeks of treatment with either risperidone or aripiprazole.');
const sarpalSample = cite(
  'sarpal2015',
  'Twenty-four patients with first-episode psychosis and twenty-four healthy participants, matched for age, sex, education, and handedness.',
);
const sarpalState = cite(
  'sarpal2015',
  'Our results indicate that corticostriatal functional dysconnectivity in psychosis is a state-dependent phenomenon.',
);

const score = {
  id: 'help-antipsychotics',
  title: 'Antipsychotic medication for psychosis',
  description:
    'Antipsychotic medication is the main treatment for psychosis; all effective antipsychotics act on the striatum, deep in the brain. One study scanned people at rest during a first episode of psychosis, before and after 12 weeks of treatment. As psychosis improved, the striatum worked more closely with the front of the brain and with emotional and memory areas, and less closely with the parietal lobe. Lines show the change in how closely areas work together: pulsing means more than before, dashed means less than before.',
  caveat: treatmentCaveat(
    'All findings come from one study of 24 people in a first episode of psychosis, treated with risperidone or aripiprazole, and 24 people without psychosis scanned twice. The changes are those that went with improvement in psychosis, at rest; they show how closely areas work together, not activity. The striatum is drawn as the caudate because the source names "striatal regions" without saying which; that is an assumption. The source names the anterior cingulate and the parietal lobe without saying which parts; they are drawn on the dorsal anterior cingulate and the inferior parietal cortex.',
  ),
  durationSeconds: 32,
  phases: treatmentPhases({
    beforeCaption: 'Early in a first episode of psychosis, before most of the treatment. The comparison here starts from each person\'s own level, so the brain is drawn at rest.',
    duringName: 'Twelve weeks of medication',
    duringTimescale: 'weeks',
    duringCaption: 'Daily antipsychotic medication. People were not scanned during this time.',
    afterCaption:
      'As psychosis improved, the striatum worked more closely with the anterior cingulate, the dorsolateral prefrontal cortex, the hippocampus and the anterior insula, and less closely with the parietal lobe.',
    sameCaption:
      'The authors conclude that these connection problems depend on the state of psychosis and ease as it improves. This is one study, measuring the brain at rest; side effects and longer-term changes were not part of it.',
    timedBy: [sarpalDesign],
  }),
  condition: {
    regions: [],
    connections: [
      {
        from: 'caudate',
        to: 'dacc',
        explanation: 'Worked together more closely as psychosis improved with treatment, in one study. Striatum drawn as the caudate, anterior cingulate as its dorsal part; both are assumptions.',
        confidence: 'mixed',
        citations: [sarpalIncrease, sarpalSample, sarpalState],
        keyframes: after(0.45),
      },
      {
        from: 'caudate',
        to: 'dlpfc',
        explanation: 'Worked together more closely as psychosis improved with treatment, in one study.',
        confidence: 'mixed',
        citations: [sarpalIncrease],
        keyframes: after(0.45),
      },
      {
        from: 'caudate',
        to: 'hippocampus',
        explanation: 'Worked together more closely as psychosis improved with treatment, in one study.',
        confidence: 'mixed',
        citations: [sarpalIncrease],
        keyframes: after(0.4),
      },
      {
        from: 'caudate',
        to: 'insula',
        explanation: 'The anterior insula worked together more closely with the striatum as psychosis improved with treatment, in one study.',
        confidence: 'mixed',
        citations: [sarpalIncrease],
        keyframes: after(0.4),
      },
      {
        from: 'caudate',
        to: 'inferior-parietal',
        explanation:
          'Parietal areas worked together less with the striatum as psychosis improved with treatment, in one study. The source says "structures within the parietal lobe"; drawn to the inferior parietal cortex, which is an assumption.',
        confidence: 'mixed',
        citations: [sarpalParietal],
        keyframes: after(-0.35),
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
    'The changes are those that tracked improvement in psychosis within the treated group; the explanations say "as psychosis improved".',
    'Read in full: Sarpal et al. 2015.',
  ],
});
