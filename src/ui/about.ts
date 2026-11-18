import { el } from './dom';

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: 'Why this exists',
    paragraphs: [
      'To help people who live with these conditions, and the people close to them, understand what happens in the brain: what is felt has a physical basis, it is studied, and it is not a character flaw. The "What helps" episodes show how the brain can change with treatment.',
    ],
  },
  {
    heading: 'A reconstruction, not a recording',
    paragraphs: [
      'Almost none of these episodes has been recorded from start to finish inside a living brain; seizures, recorded with electrodes, come closest. Each episode here is assembled from published studies: which regions tend to be more or less active, and which connections tend to be stronger or weaker.',
      'The pacing on screen is chosen so you can follow it. Each phase is labelled with its rough real-world timescale, and screen time is not proportional to real time.',
    ],
  },
  {
    heading: 'Group averages, not your brain',
    paragraphs: [
      'Almost every finding shown is an average across a group of people. Individual brains vary a great deal, and no single person is expected to match the picture exactly.',
      'No state belongs to one region and no region belongs to one state. The same areas take part in many different states; what differs is the pattern across them and how it changes over time.',
    ],
  },
  {
    heading: 'How confident each claim is',
    paragraphs: [
      'Well established: replicated and supported by meta-analysis. Mixed evidence: supported, but with notable findings pointing the other way. Still debated: active disagreement among researchers, or evidence that comes mainly from animals. Regions with mixed or debated evidence are drawn with diagonal hatching.',
      'The order of events is rated separately. A step marked as timed is supported by a study that can resolve time. A step marked as reconstructed (dashed on the timeline) is an inference from how these systems are understood to work.',
      'Where only the abstract of a paper could be read, the source is flagged "abstract only".',
    ],
  },
  {
    heading: 'Lines are communication, not wires',
    paragraphs: [
      'A line between two regions means their activity tends to rise and fall together more, or less, than usual. It is not a traced nerve pathway, and its curve is drawn for clarity.',
    ],
  },
  {
    heading: 'Brightness shows direction, not a measurement',
    paragraphs: [
      'Brighter and warmer means more active than a typical brain at rest; dimmer and more violet means less active. The amounts show direction and rough relative size only. They are not measured quantities.',
      'A resting brain is never dark or still, which is why everything shimmers gently before an episode starts.',
    ],
  },
  {
    heading: 'Where the shapes come from',
    paragraphs: [
      'Region shapes and positions come from published brain atlases, not from drawing, with one exception: the brainstem is a rough outline cut from a brain scan. Some areas named in research, such as the dorsolateral prefrontal cortex, are functional areas without a sharp anatomical border; they are shown using the gyrus that atlases use to stand in for them, which is larger than the area itself. Regions marked "approximate location" are placed from published coordinates.',
    ],
  },
  {
    heading: 'Not a diagnostic tool or medical advice',
    paragraphs: [
      'This is a visualisation of research made out of curiosity. It cannot tell you anything about your own brain, it is not a way to assess yourself or anyone else, and it does not recommend any treatment; the "What helps" episodes show what studies found, not what anyone should choose.',
    ],
  },
];

/** Fills the "About the science" dialog and wires the buttons that open and close it. */
export function setupAbout(dialog: HTMLDialogElement, openButton: HTMLElement, credits: string): void {
  const close = el('button', { class: 'close', text: 'Close', attrs: { type: 'button' } });
  dialog.replaceChildren(
    el('h2', { text: 'About the science' }),
    ...SECTIONS.flatMap((section) => [
      el('h3', { text: section.heading }),
      ...section.paragraphs.map((text) => el('p', { text })),
    ]),
    el('h3', { text: 'Credits' }),
    el('pre', { class: 'credits', text: credits }),
    close,
  );
  openButton.addEventListener('click', () => dialog.showModal());
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
