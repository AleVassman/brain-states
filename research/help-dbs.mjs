// What helps: deep brain stimulation of the subthalamic nucleus in Parkinson's disease.
//   node research/help-dbs.mjs
import { cite, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, inWindow, phase, treatmentCaveat } from './helps.mjs';

const cebLongTerm = cite('ceballos1999', 'Long-term high-frequency stimulation of the subthalamic nucleus (STN) improves akinesia in Parkinson disease.');
const cebMovement = cite(
  'ceballos1999',
  'As predicted, increases in activation of rostral supplementary motor area and premotor cortex ipsilateral to stimulation were observed when stimulation was on during contralateral movement (P<.001).',
);
const cebRest = cite('ceballos1999', 'Unpredicted observations included decreases in regional cerebral blood flow in primary motor cortex at rest induced by STN stimulation.');
const cebImproved = cite('ceballos1999', 'All patients showed improvement in reaction and movement times during scans with the stimulator on.');
const cebConclusion = cite(
  'ceballos1999',
  'Stimulation of the STN reduces the movement-related impairment of frontal motor association areas and the inappropriate motor cortex resting activity in Parkinson disease.',
);

const W = { off: [0, 0.2], on: [0.2, 0.32], moving: [0.32, 0.56], rest: [0.56, 0.82], same: [0.82, 1] };
const ONOFF = { kind: 'reconstructed', rationale: 'The study compared scans with the stimulator on and off in the same session; it does not show that "on" came after "off". The order here is a way of presenting the comparison.' };

const score = {
  id: 'help-dbs',
  title: "Deep brain stimulation for Parkinson's",
  description:
    "In deep brain stimulation, electrodes are placed in a small structure deep in the brain, the subthalamic nucleus. Long-term stimulation there improves the slowness of movement in Parkinson's disease. One study measured blood flow in the same people with the stimulator switched off and on. With it on, movement was faster, a motor planning area became more active during movement, and the motor cortex became quieter at rest. In this episode brightness stands for blood flow, used as a sign of activity, and shows the difference between stimulator on and off.",
  caveat: treatmentCaveat(
    "All findings come from one study of 8 people who already had the electrodes, scanned with the stimulator off and on, so this is a comparison of on and off, not of before and after surgery. The premotor cortex, also more active, is not a separate area in the brain model. The supplementary motor area finding is on the same side as the stimulation; the abstract does not say which side or sides were stimulated, so drawing both sides is an assumption. The subthalamic nucleus itself is not drawn.",
  ),
  durationSeconds: 34,
  phases: [
    phase('off', 'Stimulator off', 'minutes', W.off, 'With the stimulator switched off. This is the comparison point, so the brain is drawn at rest.'),
    phase('on', 'Stimulator on', 'minutes', W.on, 'The stimulator is switched on. Reaction and movement times improved in every person.', ONOFF),
    phase('moving', 'Moving, stimulator on', 'seconds', W.moving,
      'During movement, the front part of the supplementary motor area is more active with the stimulator on than off, along with the premotor cortex.', ONOFF),
    phase('rest', 'At rest, stimulator on', 'seconds', W.rest,
      'At rest, the primary motor cortex is quieter with the stimulator on than off. The authors describe its resting activity without stimulation as inappropriate.',
      { kind: 'reconstructed', rationale: 'Rest and movement scans were both part of the study; showing movement first is only a way of presenting them one at a time.' }),
    phase('same', 'What stayed the same', 'summary', W.same, 'This is one small study of the immediate effect of switching stimulation on; longer-term changes were not part of it.', SUMMARY_ORDER),
  ],
  condition: {
    regions: [
      {
        region: 'sma',
        explanation:
          'The rostral supplementary motor area was more active during movement with the stimulator on than off, on the side of the stimulation, in one study of 8 people. Drawing both sides is an assumption. Brightness stands for blood flow.',
        confidence: 'mixed',
        citations: [cebMovement, cebConclusion, cebImproved, cebLongTerm],
        keyframes: inWindow(0.32, 0.56, 0.5),
      },
      {
        region: 'motor-cortex',
        explanation: 'The primary motor cortex had less blood flow at rest with the stimulator on than off, in one study of 8 people. This was not what the researchers had predicted.',
        confidence: 'mixed',
        citations: [cebRest, cebConclusion],
        keyframes: inWindow(0.56, 0.82, -0.45),
      },
    ],
    connections: [],
  },
  typical: null,
};


writeScore(score, {
  indexTitle: 'Deep brain stimulation',
  category: 'treatment',
  treats: 'parkinsons',
  notes: [
    'Phases compare stimulator on and off within one session, marked as reconstructed order.',
    'The description\'s statement that long-term stimulation improves akinesia is from the abstract (cebLongTerm).',
    'Read as abstract only: Ceballos-Baumann et al. 1999.',
  ],
});
