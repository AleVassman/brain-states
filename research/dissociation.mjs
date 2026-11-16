// Dissociation: feeling detached or unreal when something is overwhelming.
//   node research/dissociation.mjs
import { cite, kf, writeScore } from './lib.mjs';

const laniusHigh = cite(
  'lanius2010',
  'patients with dissociative PTSD exhibit abnormally high activation in brain regions involved in arousal modulation and emotional regulation, including the dorsal anterior cingulate cortex and the medial prefrontal cortex',
);
const laniusCorrelation = cite(
  'lanius2010',
  'dissociative response to trauma reminders is negatively correlated with right anterior insula activation and positively correlated with activation in the medial prefrontal cortex and dorsal anterior cingulate cortex',
);
const laniusAmygdala = cite(
  'lanius2010',
  'the medial prefrontal cortex cluster that was positively correlated with state dissociative symptoms was negatively correlated with amygdala activity during script-driven imagery',
);
const laniusInhibition = cite(
  'lanius2010',
  'increased activation of medial prefrontal structures is consistent with hyperinhibition of those same limbic regions in states of pathological emotional overmodulation',
);
const laniusOpposite = cite(
  'lanius2010',
  'Patients with reexperiencing/hyperaroused PTSD exhibit abnormally low activation in medial anterior brain regions that are implicated in arousal modulation and emotion regulation more generally',
);
const ludascherInsula = cite(
  'ludascher2010',
  'a positive correlation between dissociation scores and activity in the right and left insula (BA 13)',
);
const ludascherPain = cite(
  'ludascher2010',
  'Dissociative psychopathology scores were significantly higher and pain sensitivity was lower after the dissociation-inducing script was read compared with the neutral script.',
);
const ludascherLimit = cite('ludascher2010', 'The main limitation of this pilot study is the absence of a control group.');
const roydevaMarkers = cite(
  'roydeva2021',
  'The dorsomedial and dorsolateral prefrontal cortex, bilateral superior frontal regions, (anterior) cingulate, posterior association areas and basal ganglia are identified as neurofunctional biomarkers of pathological dissociation',
);
const lotfiniaNotLocal = cite(
  'lotfinia2020',
  'dissociative processing cannot be localized to a few distinctive brain regions but rather corresponds to differential neural signatures depending on the symptom constellation',
);

const score = {
  id: 'dissociation',
  title: 'Dissociation: detaching when something is overwhelming',
  description:
    'A reminder of something traumatic, or stress that is too much, and instead of a surge of feeling there is distance: feeling unreal, detached, numb. The leading account is that the brain\'s regulating regions clamp down too hard on the emotional ones. It is the opposite pattern to being flooded by emotion, where those same regulating regions do too little. There is no "typical response" to compare with, because this is one of two different responses to the same kind of trigger.',
  caveat:
    'The clamp-down account comes mainly from small studies of people with post-traumatic stress disorder listening to accounts of their own trauma, summarised in one review. It is a proposal: more activity in regulating regions alongside less in emotional ones is consistent with suppression, but that does not prove one causes the other. A later systematic review concluded that dissociation cannot be pinned to a few regions and differs with the kind of symptoms, and a pilot study in borderline personality disorder found the insula more active with dissociation, not less. How an episode ends has not been studied; the last phase is an assumption. Dissociation in borderline personality disorder may not match the pattern found in trauma studies.',
  durationSeconds: 34,
  phases: [
    {
      id: 'reminder',
      name: 'Too much',
      timescale: 'seconds',
      start: 0,
      end: 0.14,
      caption: 'A reminder of something traumatic, or stress that is overwhelming. In the studies behind this episode, people listened to an account of their own trauma.',
    },
    {
      id: 'clamp',
      name: 'Clamping down',
      timescale: 'seconds',
      start: 0.14,
      end: 0.42,
      caption:
        'Regions that regulate arousal and emotion, the medial prefrontal cortex and the dorsal anterior cingulate, become unusually active.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The studies compare whole periods of listening to a trauma account with a neutral one. That the regulating regions rise first and the emotional regions fall second is the logic of the suppression account, not something timed.',
      },
    },
    {
      id: 'detached',
      name: 'Detached',
      timescale: 'seconds to minutes',
      start: 0.42,
      end: 0.78,
      caption:
        'Feeling drops away. The more active the medial prefrontal cortex, the less active the amygdala; the stronger the detachment, the quieter the front of the right insula, which normally carries the felt state of the body. Pain is felt less.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The quieter emotional regions are measured over the same period as the more active regulating regions, as correlations. Showing them as a later step follows the suppression account.',
      },
    },
    {
      id: 'easing',
      name: 'Easing',
      timescale: 'minutes or longer (not studied)',
      start: 0.78,
      end: 1,
      caption: 'The detachment eases. How this happens in the brain, and how long it takes, has not been studied; this last part is an assumption.',
      order: {
        kind: 'reconstructed',
        rationale: 'No source read for this episode followed the end of a dissociative state. The return towards baseline is assumed.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'mpfc',
        explanation:
          'Unusually active in people with the dissociative form of post-traumatic stress disorder, and more active the stronger the dissociative response. A systematic review across diagnoses also lists the dorsomedial prefrontal cortex among the regions that mark dissociation. Another review found that dissociation cannot be tied to a few regions.',
        confidence: 'mixed',
        citations: [laniusHigh, laniusCorrelation, roydevaMarkers, lotfiniaNotLocal],
        keyframes: kf(0, 0, 0.14, 0.1, 0.36, 0.8, 0.78, 0.75, 1, 0.2),
      },
      {
        region: 'dacc',
        explanation:
          'Unusually active in people with the dissociative form of post-traumatic stress disorder, and more active the stronger the dissociative response. The anterior cingulate is also listed in a systematic review as a marker of dissociation across diagnoses.',
        confidence: 'mixed',
        citations: [laniusHigh, laniusCorrelation, roydevaMarkers],
        keyframes: kf(0, 0, 0.14, 0.1, 0.38, 0.7, 0.78, 0.65, 1, 0.15),
      },
      {
        region: 'amygdala',
        explanation:
          'In one study of people with post-traumatic stress after road accidents, the more active the dissociation-related part of the medial prefrontal cortex was, the less active the amygdala. This is read as the regulating regions suppressing the emotional ones, which is an interpretation. The opposite pattern, too little regulation, is found in people who are flooded by the memory instead.',
        confidence: 'mixed',
        citations: [laniusAmygdala, laniusInhibition, laniusOpposite],
        keyframes: kf(0, 0, 0.1, 0.3, 0.3, 0.1, 0.5, -0.55, 0.78, -0.5, 1, -0.1),
      },
      {
        region: 'insula-r',
        explanation:
          'The front of the right insula was less active the stronger the dissociative response to a trauma reminder. The evidence conflicts: a pilot study in borderline personality disorder with post-traumatic stress found the insula more active with higher dissociation scores, and that study had no comparison group.',
        confidence: 'debated',
        citations: [laniusCorrelation, ludascherInsula, ludascherLimit],
        keyframes: kf(0, 0, 0.14, 0.15, 0.32, 0, 0.52, -0.5, 0.78, -0.45, 1, -0.1),
      },
    ],
    connections: [
      {
        from: 'mpfc',
        to: 'amygdala',
        explanation:
          'An opposing link: in one study, the more active this part of the medial prefrontal cortex, the less active the amygdala. The line shows that the two move together in opposite directions; that the first is suppressing the second is the proposed explanation, not a measurement.',
        confidence: 'mixed',
        citations: [laniusAmygdala, laniusInhibition],
        keyframes: kf(0, 0, 0.14, 0.1, 0.45, 0.75, 0.78, 0.7, 1, 0.1),
      },
    ],
  },
  typical: null,
};

void ludascherPain;

writeScore(score, {
  indexTitle: 'Dissociation',
  notes: [
    'No typical-response comparison. The informative contrast in the literature is between two responses to a trauma reminder, dissociating and being flooded, not between a condition and a typical brain. The flooded pattern is described in the amygdala text and not drawn.',
    'Reduced pain sensitivity during dissociation is from Ludäscher et al. 2010 ("Dissociative psychopathology scores were significantly higher and pain sensitivity was lower after the dissociation-inducing script was read compared with the neutral script."), a pilot study in borderline personality disorder without a comparison group. It is mentioned in a caption, not drawn.',
    'Not drawn: the dorsolateral prefrontal cortex, superior frontal regions, posterior association areas and basal ganglia named by Roydeva & Reinders 2021. The abstract lists them as markers without saying whether they are more or less active, so no direction could be shown.',
    'The review of dissociation in borderline personality disorder specifically (Krause-Utz et al. 2017) could not be downloaded, so the episode does not claim the trauma-study pattern holds in borderline personality disorder.',
    'Read as abstracts only: Roydeva & Reinders 2021, Lotfinia et al. 2020.',
  ],
});
