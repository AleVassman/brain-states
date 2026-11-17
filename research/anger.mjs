// Anger: being provoked, feeling angry, and what follows.
//   node research/anger.mjs
import { cite, kf, writeScore } from './lib.mjs';

const sorellaExperience = cite(
  'sorella2021',
  'Anger experience analysis resulted in the bilateral activations of the insula and the ventrolateral prefrontal cortex',
);
const sorellaPerception = cite('sorella2021', 'Anger perception analysis resulted in significant activation in the amygdala');
const densonAnger = cite(
  'denson2009',
  'Activity in the dorsal anterior cingulate cortex was positively related to self-reported feelings of anger and individual differences in general aggression.',
);
const densonRumination = cite(
  'denson2009',
  'Activity in the medial prefrontal cortex was related to self-reported rumination and individual differences in displaced aggression.',
);
const densonPredict = cite(
  'denson2009',
  'Increased activation in the hippocampus, insula, and cingulate cortex following the provocation predicted subsequent self-reported rumination.',
);
const blairSystem = cite(
  'blair2012',
  'neural systems implicated in reactive aggression (amygdala, hypothalamus and periaqueductal gray; the basic threat system) are critically implicated in anger',
);
const blairAnimal = cite(
  'blair2012',
  'Animal work indicates that this progressive response to threat is mediated by a basic threat system that runs from medial amygdaloidal areas downward, largely via the stria terminalis to the medial hypothalamus, and from there to the dorsal half of the periaqueductal gray',
);
const blairHumans = cite(
  'blair2012',
  'This neural system, amygdala-hypothalamus-periaqueductal gray is thought to mediate reactive aggression in humans also',
);
const blairFrontal = cite(
  'blair2012',
  'There are frontal systems that are important for the regulation of the basic response to threat; i.e., orbital, medial and ventrolateral frontal cortex',
);
const coccaroReactivity = cite(
  'coccaro2007',
  'Relative to controls, individuals with IED exhibited exaggerated amygdala reactivity and diminished OFC activation to faces expressing anger.',
);
const coccaroCoupling = cite(
  'coccaro2007',
  'Unlike controls, aggressive subjects failed to demonstrate amygdala-OFC coupling during responses to angry faces.',
);

const score = {
  id: 'anger',
  title: 'Anger: being provoked',
  description:
    'Someone is insulted or treated unfairly. The episode follows anger as it is experienced by people in general: the first reaction to the provocation, the feeling itself, and then either dwelling on it or reining it in. Anger is an ordinary emotion, not a condition, so there is no "typical response" to compare it with.',
  caveat:
    'Researchers describe the brain basis of anger as still a matter of debate. The deep "threat system" shown early in the episode is known mainly from animal experiments and is assumed, not shown, to work the same way in people; its third part, the periaqueductal grey, is not drawn because its shape could not be obtained for this project. The findings about feeling angry and about dwelling on it come partly from a single study in which volunteers were insulted in a scanner. Dwelling and regulating are shown together at the end, but a person may do one, the other, or both. All four sources except one review were read as abstracts only.',
  durationSeconds: 36,
  phases: [
    {
      id: 'provocation',
      name: 'Provocation',
      timescale: 'a second or two',
      start: 0,
      end: 0.12,
      caption: 'An insult, or being treated unfairly. The amygdala responds to the hostile signal, as it does to an angry face.',
    },
    {
      id: 'threat',
      name: 'Threat response',
      timescale: 'seconds',
      start: 0.12,
      end: 0.4,
      caption:
        'A deep threat system engages, running from the amygdala to the hypothalamus. In animals this is the system that drives defensive attack; it is thought to do the same in people.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The sequence from amygdala to hypothalamus is traced in animals, where it escalates as a threat gets closer. Placing it before the conscious feeling of anger is an inference from that work.',
      },
    },
    {
      id: 'feeling',
      name: 'Feeling angry',
      timescale: 'seconds to minutes',
      start: 0.4,
      end: 0.72,
      caption:
        'The feeling of anger itself. The insula, on both sides, and the ventrolateral prefrontal cortex are the main findings of the one pooled analysis of feeling angry; activity in the dorsal anterior cingulate rises with how angry people say they feel.',
      order: {
        kind: 'reconstructed',
        rationale:
          'Brain scans of anger cannot separate events closer than a few seconds, so the feeling is placed after the first reaction by inference, not by measurement.',
      },
    },
    {
      id: 'aftermath',
      name: 'Dwelling or reining in',
      timescale: 'minutes',
      start: 0.72,
      end: 1,
      caption:
        'What happens next varies. Going over the insult again engages the medial prefrontal cortex. Reining the anger in draws on frontal regions, including the orbitofrontal cortex, that regulate the threat system.',
      order: {
        kind: 'reconstructed',
        rationale:
          'In the study this rests on, volunteers were insulted first and prompted to dwell on it afterwards. The order follows that design.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'amygdala',
        explanation:
          'Responds when people perceive anger in others, such as an angry face, and is treated as the first stage of the threat system behind reactive aggression. A pooled analysis of studies of feeling angry, as opposed to seeing anger, did not find the amygdala. In one small study of people with a history of impulsive aggression, the amygdala reacted more strongly to angry faces.',
        confidence: 'mixed',
        citations: [sorellaPerception, blairSystem, coccaroReactivity],
        keyframes: kf(0, 0, 0.1, 0.4, 0.3, 0.65, 0.5, 0.5, 0.72, 0.35, 1, 0.2),
      },
      {
        region: 'hypothalamus',
        explanation:
          'The middle stage of the threat system that produces defensive attack in animals. The pathway was mapped in animals; that it does the same in human anger is assumed. Its onward target, the periaqueductal grey, is not drawn.',
        confidence: 'debated',
        citations: [blairAnimal, blairHumans],
        keyframes: kf(0, 0, 0.12, 0.05, 0.34, 0.55, 0.6, 0.4, 1, 0.15),
      },
      {
        region: 'insula',
        explanation:
          'Active on both sides when people feel angry: the main finding of a pooled analysis of studies of the experience of anger, read as an abstract only. The insula tracks the internal state of the body. In one study, its activity after a provocation also predicted how much people went on to dwell on it. Marked mixed because it rests on one pooled analysis in a field its authors describe as still debated.',
        confidence: 'mixed',
        citations: [sorellaExperience, densonPredict],
        keyframes: kf(0, 0, 0.12, 0.05, 0.4, 0.35, 0.58, 0.85, 0.72, 0.75, 1, 0.5),
      },
      {
        region: 'vlpfc',
        explanation:
          'Active on both sides when people feel angry. Its role is less clear than the insula\'s: it may reflect making sense of the situation, and it is also one of the frontal regions that regulate the threat system.',
        confidence: 'mixed',
        citations: [sorellaExperience, blairFrontal],
        keyframes: kf(0, 0, 0.3, 0.05, 0.6, 0.65, 0.85, 0.7, 1, 0.5),
      },
      {
        region: 'dacc',
        explanation:
          'In one study of volunteers who were insulted, activity here rose with how angry they said they felt.',
        confidence: 'mixed',
        citations: [densonAnger],
        keyframes: kf(0, 0, 0.3, 0.1, 0.58, 0.7, 0.72, 0.6, 1, 0.35),
      },
      {
        region: 'hippocampus',
        explanation:
          'In one study, more activity here after a provocation predicted how much people went on to dwell on it.',
        confidence: 'mixed',
        citations: [densonPredict],
        keyframes: kf(0, 0, 0.3, 0.05, 0.55, 0.45, 0.8, 0.4, 1, 0.25),
      },
      {
        region: 'mpfc',
        explanation: 'In one study, activity here went with how much people said they dwelt on the insult afterwards.',
        confidence: 'mixed',
        citations: [densonRumination],
        keyframes: kf(0, 0, 0.6, 0, 0.84, 0.65, 1, 0.6),
      },
      {
        region: 'ofc',
        explanation:
          'One of the frontal regions that regulate the threat system. In one small study of people with a history of impulsive aggression, it responded less to angry faces than in the comparison group.',
        confidence: 'mixed',
        citations: [blairFrontal, coccaroReactivity],
        keyframes: kf(0, 0, 0.5, 0.05, 0.84, 0.5, 1, 0.4),
      },
    ],
    connections: [
      {
        from: 'amygdala',
        to: 'hypothalamus',
        explanation:
          'The route the threat signal takes in animals, from the amygdala down to the hypothalamus. A known anatomical pathway in animals; assumed in people.',
        confidence: 'debated',
        citations: [blairAnimal],
        keyframes: kf(0, 0, 0.12, 0.1, 0.32, 0.7, 0.6, 0.4, 1, 0.15),
      },
      {
        from: 'ofc',
        to: 'amygdala',
        explanation:
          'In a small study, the amygdala and orbitofrontal cortex worked together when the comparison group looked at angry faces. That link was missing in people with a history of impulsive aggression.',
        confidence: 'mixed',
        citations: [coccaroCoupling],
        keyframes: kf(0, 0, 0.6, 0.05, 0.86, 0.55, 1, 0.45),
      },
    ],
  },
  typical: null,
};

writeScore(score, {
  indexTitle: 'Anger',
  notes: [
    'No typical-response comparison. Anger is an emotion, not a condition. The nearest comparison in the literature, people with a history of impulsive aggression (Coccaro et al. 2007), rests on ten patients and ten controls looking at angry faces; it is described in the text of the relevant regions instead of being drawn as a separate brain.',
    'The meta-analysis this episode leans on opens with: "The neural bases of anger are still a matter of debate." (Sorella et al. 2021, abstract).',
    'The periaqueductal grey is part of the threat system described by Blair (2012) but is not drawn: its atlas file could not be downloaded automatically. If it is added later, it belongs after the hypothalamus, marked "debated".',
    'Read as abstracts only: Sorella 2021, Denson 2009, Coccaro 2007. Read in full: Blair 2012.',
  ],
});
