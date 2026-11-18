// What helps: deep brain stimulation of the subthalamic nucleus in Parkinson's disease.
//   node research/help-dbs.mjs
import { cite, writeScore } from './lib.mjs';
import { SUMMARY_ORDER, inWindow, phase, treatmentCaveat } from './helps.mjs';

const cebMovement = cite(
  'ceballos1999',
  'As predicted, increases in activation of rostral supplementary motor area and premotor cortex ipsilateral to stimulation were observed when stimulation was on during contralateral movement (P<.001).',
);
const cebRest = cite('ceballos1999', 'Unpredicted observations included decreases in regional cerebral blood flow in primary motor cortex at rest induced by STN stimulation.');
const cebImproved = cite('ceballos1999', 'All patients showed improvement in reaction and movement times during scans with the stimulator on.');
const cebDesign = cite(
  'ceballos1999',
  'Eight patients with Parkinson disease who had electrodes implanted in the STN underwent 12 measurements of regional cerebral blood flow with water O 15 positron emission tomography at rest and during performance of paced freely selected joystick movements, both with and without STN stimulation (3 scans per experimental condition).',
);
const cebConclusion = cite(
  'ceballos1999',
  'Stimulation of the STN reduces the movement-related impairment of frontal motor association areas and the inappropriate motor cortex resting activity in Parkinson disease.',
);

const W = { off: [0, 0.2], on: [0.2, 0.32], moving: [0.32, 0.56], rest: [0.56, 0.82], same: [0.82, 1] };

const score = {
  id: 'help-dbs',
  title: "Deep brain stimulation for Parkinson's",
  description:
    "In deep brain stimulation, thin electrodes are placed in a small structure deep in the brain, the subthalamic nucleus, and connected to a device like a pacemaker. It is used for Parkinson's when medication no longer controls movement well. One study measured blood flow with the stimulator switched off and on in the same people. With it on, movement was faster, a motor planning area became more active during movement, and the motor cortex became quieter at rest. In this episode brightness stands for blood flow, used as a sign of activity, and shows the change between stimulator off and on.",
  caveat: treatmentCaveat(
    "All findings come from one study of 8 people who already had the electrodes, scanned with the stimulator off and on, so \"before\" here means switched off, not before surgery. The premotor cortex, also more active, is not a separate area in the brain model. The supplementary motor area finding is on the same side as the stimulation, during movement of the hand on the other side. The subthalamic nucleus itself is not drawn.",
  ),
  durationSeconds: 34,
  phases: [
    phase('off', 'Stimulator off', 'minutes', W.off, 'With the stimulator switched off. This is the comparison point, so the brain is drawn at rest.'),
    phase('on', 'Stimulator on', 'minutes', W.on, 'The stimulator is switched on. Reaction and movement times improved in every person.', { kind: 'timed', citations: [cebDesign] }),
    phase('moving', 'Moving, stimulator on', 'seconds', W.moving,
      'During movement, the front part of the supplementary motor area is more active with the stimulator on than off, along with the premotor cortex.',
      { kind: 'timed', citations: [cebDesign] }),
    phase('rest', 'At rest, stimulator on', 'seconds', W.rest,
      'At rest, the primary motor cortex is quieter with the stimulator on than off. The authors describe its resting activity without stimulation as inappropriate.',
      { kind: 'reconstructed', rationale: 'Rest and movement scans were interleaved in the study; showing movement first is only a way of presenting them one at a time.' }),
    phase('same', 'What stayed the same', 'summary', W.same,
      "Stimulation eases movement symptoms but does not stop Parkinson's from progressing; that was not part of this study. This is one small study.",
      SUMMARY_ORDER),
  ],
  condition: {
    regions: [
      {
        region: 'sma',
        explanation:
          'The rostral supplementary motor area was more active during movement with the stimulator on than off, on the side of the stimulation, in one study of 8 people. The authors read this as stimulation reducing an impairment of motor planning areas. Brightness stands for blood flow.',
        confidence: 'mixed',
        citations: [cebMovement, cebConclusion, cebImproved],
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
    '"Before treatment" is the stimulator switched off in the same people, not before surgery; the phase names say "Stimulator off".',
    'The supplementary motor area increase was ipsilateral to stimulation; the region is drawn on both sides because patients were stimulated on different sides and the abstract gives no side breakdown.',
    'Read as abstract only: Ceballos-Baumann et al. 1999.',
  ],
});
