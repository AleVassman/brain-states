// Migraine attack: warning signs, aura, headache, and after.
//   node research/migraine.mjs
import { cite, kf, writeScore } from './lib.mjs';

const dodickPhases = cite(
  'dodick2018',
  'Migraine is a common, disabling neurological disorder characterized by multiple phases: premonitory, aura, headache, postdrome, and interictal.',
);
const dodickPremonitory = cite(
  'dodick2018',
  'The premonitory phase begins as early as 3 days before the headache phase, and involves a complex interplay between various cortical and subcortical brain regions, including the hypothalamus and brainstem nuclei that modulate nociceptive signaling.',
);
const dodickAura = cite(
  'dodick2018',
  'In one-third of patients, an aura phase may occur during some attacks and likely correlates with a cortical spreading depression-like event',
);
const maniyarActivations = cite(
  'maniyar2014',
  'We found activations in the posterolateral hypothalamus, midbrain tegmental area, periaqueductal grey, dorsal pons and various cortical areas including occipital, temporal and prefrontal cortex.',
);
const schulteHypothalamus = cite(
  'schulte2016',
  'hypothalamic activity as a response to trigeminal nociceptive stimulation is altered during the 24 h prior to pain onset, i.e. increases towards the next migraine attack',
);
const schulteCoupling = cite(
  'schulte2016',
  'the hypothalamus shows altered functional coupling with the spinal trigeminal nuclei and the region of the migraine generator, i.e. the dorsal rostral pons during the preictal day and the pain phase of native human migraine attacks',
);
const hadjikhaniRise = cite(
  'hadjikhani2001',
  'Initially, a focal increase in BOLD signal (possibly reflecting vasodilation), developed within extrastriate cortex (area V3A). This BOLD change progressed contiguously and slowly (3.5 +/- 1.1 mm/min) over occipital cortex, congruent with the retinotopy of the visual percept.',
);
const hadjikhaniFall = cite(
  'hadjikhani2001',
  'Following the same retinotopic progression, the BOLD signal then diminished (possibly reflecting vasoconstriction after the initial vasodilation), as did the BOLD response to visual activation.',
);
const weillerAttack = cite(
  'weiller1995',
  'During the attacks, increased blood flow was found in the cerebral hemispheres in cingulate, auditory and visual association cortices and in the brain stem.',
);
const weillerPersisted = cite(
  'weiller1995',
  'only the brain stem activation persisted after the injection of sumatriptan had induced complete relief from headache and phono- and photophobia',
);
const goadsbyResolution = cite(
  'goadsby2017',
  'brain stem and diencephalic systems modulating afferent signals, light-photophobia or sound-phonophobia, begin to dysfunction and eventually to evolve to the pain phase and with time the resolution or postdromal phase',
);

const score = {
  id: 'migraine',
  title: 'Migraine attack: warning signs, aura, headache',
  description:
    'A migraine attack is far more than a headache. It unfolds in phases over hours to days: early warning signs such as tiredness and yawning, in some people a visual aura, then the headache with its sensitivity to light and sound, and a washed-out period afterwards. The episode follows the brain through those phases in someone who has migraine. Many attacks have no aura, and not everyone has every phase.',
  caveat:
    'Each phase here comes from a different small study: eight people whose attacks were set off with a drug, three people scanned during a visual aura, a small group scanned during spontaneous attacks, and one person scanned every morning for a month. They were never one experiment, and the order of the phases is the clinical one, not something timed in a single brain. An aura occurs in only about a third of people with migraine. The brainstem is drawn as a rough outline of the whole structure: the findings are for small areas inside it. The headache itself is carried by nerve pathways from the coverings of the brain and its blood vessels, which are not part of the brain model. The pain-free finding in the last phase comes from attacks stopped with medication, and what the brain does in the day or two after an untreated attack was not covered by the sources read.',
  durationSeconds: 44,
  phases: [
    {
      id: 'premonitory',
      name: 'Warning signs',
      timescale: 'hours to days before the pain',
      start: 0,
      end: 0.26,
      caption:
        'Before any pain: tiredness, yawning, food cravings. The hypothalamus, which regulates sleep, appetite and body rhythms, becomes more active, along with parts of the brainstem and the visual cortex.',
    },
    {
      id: 'aura',
      name: 'Aura',
      timescale: 'minutes (in about a third of people)',
      start: 0.26,
      end: 0.5,
      caption:
        'In about a third of people with migraine, some attacks bring an aura: shimmering zigzags that drift across vision. A wave of activity creeps across the visual cortex at a few millimetres a minute, leaving quieter cortex behind it.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The sequence of phases is the clinical one given in reviews. The aura study recorded the wave across the visual cortex minute by minute, but no study read here followed one person from warning signs through aura to headache.',
      },
    },
    {
      id: 'headache',
      name: 'Headache',
      timescale: 'hours',
      start: 0.5,
      end: 0.82,
      caption:
        'The headache, with light and sound hard to bear. Blood flow rises in the brainstem and in visual and hearing areas of the cortex, and the hypothalamus and brainstem change how they work together.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The sequence of phases is the clinical one given in reviews. The scans of the headache phase were not taken in the same people as the scans of the earlier phases.',
      },
    },
    {
      id: 'after',
      name: 'After the pain',
      timescale: 'hours to a day or more',
      start: 0.82,
      end: 1,
      caption:
        'The pain lifts. In attacks stopped with medication, the brainstem was still active after the headache and the sensitivity to light and sound had gone. What happens in the washed-out day after an untreated attack was not covered by the sources read.',
      order: {
        kind: 'reconstructed',
        rationale:
          'The only brain finding here is from attacks ended by a drug. The gradual return to rest that is drawn is an assumption.',
      },
    },
  ],
  condition: {
    regions: [
      {
        region: 'hypothalamus',
        explanation:
          'More active in the warning phase, before any pain, in eight people whose attacks were set off with a drug. In one person scanned daily for a month, its response grew over the day before each attack. It is held at the same level through the later phases because the sources read do not say what its activity does then; its working relationship with the brainstem is reported as altered during the pain.',
        confidence: 'mixed',
        citations: [maniyarActivations, schulteHypothalamus, schulteCoupling, dodickPremonitory],
        keyframes: kf(0, 0, 0.08, 0.3, 0.22, 0.65, 0.82, 0.65, 1, 0.1),
      },
      {
        region: 'brainstem',
        explanation:
          'Parts of the brainstem are more active in the warning phase and during the headache. During spontaneous attacks blood flow in the brainstem was raised, and it stayed raised after medication had removed the pain, which is why the brainstem has been called a possible generator of attacks; that idea is disputed. The findings are for small areas inside the brainstem, not all of it.',
        confidence: 'mixed',
        citations: [maniyarActivations, weillerAttack, weillerPersisted, schulteCoupling],
        keyframes: kf(0, 0, 0.1, 0.3, 0.24, 0.5, 0.5, 0.55, 0.62, 0.8, 0.82, 0.75, 0.92, 0.6, 1, 0.1),
      },
      {
        region: 'visual-cortex',
        explanation:
          'Active in the warning phase, in one small study. During a visual aura, recorded almost continuously in three people, activity rose in one visual area, spread slowly across the visual cortex in step with what the person saw, and then fell below its starting level. During the headache, blood flow was raised in visual association cortex. The whole visual cortex is drawn rising and falling together; the real change is a wave moving across it, which this brain model cannot show.',
        confidence: 'mixed',
        citations: [maniyarActivations, hadjikhaniRise, hadjikhaniFall, dodickAura, weillerAttack],
        keyframes: kf(0, 0, 0.12, 0.25, 0.26, 0.3, 0.33, 0.8, 0.42, -0.4, 0.5, -0.3, 0.6, 0.4, 0.82, 0.4, 1, 0),
      },
    ],
    connections: [],
  },
  typical: null,
};

void dodickPhases;
void goadsbyResolution;

writeScore(score, {
  indexTitle: 'Migraine attack',
  category: 'physical',
  notes: [
    'No typical-response comparison: the studies scan people with migraine at different points of an attack, not against people without migraine going through the same thing.',
    'The clinical order of phases is from Dodick 2018 ("characterized by multiple phases: premonitory, aura, headache, postdrome, and interictal") and Goadsby et al. 2017 ("eventually to evolve to the pain phase and with time the resolution or postdromal phase").',
    'No line is drawn between the hypothalamus and brainstem. Schulte & May 2016 report their coupling as "altered" without a direction that could be shown.',
    'Not drawn: the cingulate and hearing areas of the cortex reported by Weiller et al. 1995 (the abstract does not say which part of the cingulate, and the brain model has no separate hearing area), and the temporal and prefrontal areas reported by Maniyar et al. 2014 without further detail.',
    'Not drawn: the trigeminal pain pathway. It runs outside the regions in the brain model.',
    'All six sources were read as abstracts only: the paper site limited full-text downloads. Sample sizes are small (1, 3 and 8 people where the abstracts state them).',
  ],
});
