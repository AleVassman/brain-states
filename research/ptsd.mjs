// PTSD: a reminder of a trauma and the re-living that follows.
//   node research/ptsd.mjs
import { cite, kf, writeScore } from './lib.mjs';

const hayesHyper = cite(
  'hayes2012',
  'the regions most consistently hyperactivated in PTSD patients included mid- and dorsal anterior cingulate cortex, and when ROI studies were included, bilateral amygdala',
);
const hayesHypo = cite(
  'hayes2012',
  'widespread hypoactivity was observed in PTSD including the ventromedial prefrontal cortex and the inferior frontal gyrus',
);
const hayesCoupling = cite('hayes2012', 'decreased ventromedial prefrontal cortex activity was associated with increased amygdala activity');
const etkinPtsdHypo = cite(
  'etkin2007',
  'only patients with PTSD showed hypoactivation in the dorsal and rostral anterior cingulate cortices and the ventromedial prefrontal cortex-structures linked to the experience and regulation of emotion',
);
const etkinPatients = cite(
  'etkin2007',
  'Patients with any of the three disorders consistently showed greater activity than matched comparison subjects in the amygdala and insula',
);
const etkinLessInPtsd = cite(
  'etkin2007',
  'Hyperactivation in the amygdala and insula were, of interest, more frequently observed in social anxiety disorder and specific phobia than in PTSD.',
);
const rauchModel = cite(
  'rauch2006',
  'we have proposed that PTSD is characterized by exaggerated amygdala responses (subserving exaggerated acquisition of fear associations and expression of fear responses) and deficient frontal cortical function (mediating deficits in extinction and the capacity to suppress attention/response to trauma-related stimuli), as well as deficient hippocampal function (mediating deficits in appreciation of safe contexts and explicit learning/memory)',
);
const laniusOpposite = cite(
  'lanius2010',
  'Patients with reexperiencing/hyperaroused PTSD exhibit abnormally low activation in medial anterior brain regions that are implicated in arousal modulation and emotion regulation more generally',
);

const score = {
  id: 'ptsd',
  title: 'PTSD: a reminder and the re-living',
  description:
    'In post-traumatic stress disorder, a reminder of a past trauma can bring it back as if it were happening now. The episode follows that re-living response: alarm regions respond more than usual, and frontal regions that help put a memory in context respond less. Some people respond to reminders in a different way, by detaching; that pattern is shown in the Dissociation state.',
  caveat:
    'The findings come from pooled analyses of brain scans of people with PTSD listening to or seeing reminders of their trauma, or doing emotional tasks, compared with people without PTSD. These were averaged over minutes, not followed moment by moment, so the order shown is reconstructed. The two pooled analyses read do not fully agree: one finds the cingulate more active in PTSD, the other less active. The role of the hippocampus comes from a proposed model built partly on animal fear learning, and is described rather than drawn. Trauma reactions differ greatly from person to person.',
  durationSeconds: 36,
  phases: [
    {
      id: 'reminder',
      name: 'A reminder',
      timescale: 'seconds',
      start: 0,
      end: 0.16,
      caption: 'Something brings the trauma to mind: a sound, a place, a smell, or a thought.',
    },
    {
      id: 'reliving',
      name: 'Re-living',
      timescale: 'seconds to minutes',
      start: 0.16,
      end: 0.52,
      caption:
        'The memory comes back with the force of the original event. The amygdala and the middle and dorsal cingulate respond more than in people without PTSD.',
      order: {
        kind: 'reconstructed',
        rationale: 'The studies compare whole periods of hearing a trauma reminder with neutral periods. That the alarm rises after the reminder is how the task is built, not a timed measurement.',
      },
    },
    {
      id: 'context',
      name: 'Losing the present',
      timescale: 'seconds to minutes',
      start: 0.52,
      end: 0.8,
      caption:
        'The ventromedial prefrontal cortex and inferior frontal gyrus, which help regulate emotion and place a memory in the present, respond less. The less active the ventromedial prefrontal cortex, the more active the amygdala.',
      order: {
        kind: 'reconstructed',
        rationale: 'The lower frontal activity is measured over the same periods as the higher alarm activity. Showing it as a later step is a way of presenting the regulation side of the finding.',
      },
    },
    {
      id: 'after',
      name: 'Afterwards',
      timescale: 'minutes to hours',
      start: 0.8,
      end: 1,
      caption: 'The re-living fades. How the brain returns to rest after a flashback was not studied in the sources read; this last part is an assumption.',
      order: { kind: 'reconstructed', rationale: 'No source read followed the end of a re-living episode. The return to rest is assumed.' },
    },
  ],
  condition: {
    regions: [
      {
        region: 'amygdala',
        explanation:
          'More active in PTSD, on both sides, in a pooled analysis when studies that measured it directly were included. Another pooled analysis found greater amygdala activity across PTSD, social anxiety and phobia, but less often in PTSD than in the other two.',
        confidence: 'mixed',
        citations: [hayesHyper, etkinPatients, etkinLessInPtsd],
        keyframes: kf(0, 0, 0.16, 0.2, 0.34, 0.75, 0.8, 0.65, 1, 0),
      },
      {
        region: 'dacc',
        explanation:
          'The middle and dorsal cingulate were the regions most consistently more active in PTSD in one pooled analysis. An earlier pooled analysis found the dorsal and front cingulate less active in PTSD. The direction is disputed. Drawn on the dorsal anterior cingulate; the finding also covers the middle cingulate just behind it.',
        confidence: 'debated',
        citations: [hayesHyper, etkinPtsdHypo],
        keyframes: kf(0, 0, 0.16, 0.1, 0.36, 0.55, 0.8, 0.45, 1, 0),
      },
      {
        region: 'vmpfc',
        explanation:
          'Less active in PTSD in two separate pooled analyses. This region helps regulate emotion, and lower activity here went with higher amygdala activity.',
        confidence: 'established',
        citations: [hayesHypo, etkinPtsdHypo, hayesCoupling, laniusOpposite],
        keyframes: kf(0, 0, 0.4, 0, 0.6, -0.6, 0.8, -0.55, 1, 0),
      },
      {
        region: 'vlpfc',
        explanation: 'The inferior frontal gyrus was less active in PTSD in a pooled analysis.',
        confidence: 'mixed',
        citations: [hayesHypo],
        keyframes: kf(0, 0, 0.4, 0, 0.6, -0.45, 0.8, -0.4, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void rauchModel;

writeScore(score, {
  indexTitle: 'PTSD flashback',
  notes: [
    'No line is drawn between the ventromedial prefrontal cortex and the amygdala. Hayes et al. 2012 report that "decreased ventromedial prefrontal cortex activity was associated with increased amygdala activity", an opposing relationship that a bright line would show as cooperation. It is in the text instead.',
    'The hippocampus is not drawn. Rauch et al. 2006 propose "deficient hippocampal function" as part of a model drawn partly from rodent fear conditioning, and say imaging had not yet directly tested it.',
    'The re-experiencing pattern shown here is the opposite of the dissociative pattern (Lanius et al. 2010), which is its own state in the app.',
    'No typical-response comparison is drawn; every finding is already a comparison with people without PTSD.',
    'Read in full: Etkin & Wager 2007, Lanius et al. 2010. Read as abstracts only: Hayes et al. 2012, Rauch et al. 2006.',
  ],
});
