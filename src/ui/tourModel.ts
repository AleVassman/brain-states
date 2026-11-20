/**
 * One step of the guided tour. `target` lists CSS selectors for the part it lights, in order of
 * preference: the first one laid out on this screen is used. null shows the card centred.
 */
export interface TourStep {
  id: string;
  title: string;
  text: string;
  target: string[] | null;
}

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Size {
  width: number;
  height: number;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Brain States',
    text: 'A 3D brain that plays short episodes of mental states, physical conditions and treatments, built from published research. This tour takes about a minute. Depression is loaded as an example.',
    target: null,
  },
  {
    id: 'brain',
    title: 'The brain',
    text: 'Drag to turn it; scroll or pinch to zoom. Click or tap a region to read what it does in this episode, how sure the research is, and the studies behind it.',
    target: ['#brain-area', '#stage'],
  },
  {
    id: 'colours',
    title: 'Reading the colours',
    text: 'Warm, bright regions are more active than a typical brain at rest; dim regions with a violet edge are less active. Stripes mean the evidence is mixed or debated. A pulsing line means two regions work together more; a dotted violet line, less. Brightness shows direction and rough size, not a measurement.',
    target: ['.legend'],
  },
  {
    id: 'tags',
    title: 'Name tags',
    text: 'Tags on the brain name the regions that are changing, with ▲ for more active and ▼ for less. Switch them off here for a clearer view.',
    target: ['#labels-label'],
  },
  {
    id: 'list',
    title: 'Choosing an episode',
    text: 'Mind holds psychological states and Body holds physical conditions. The search box finds any episode by name.',
    target: ['#state-list'],
  },
  {
    id: 'helps',
    title: 'What helps',
    text: 'The green number shows how many treatment episodes a condition has. Open it to see how the brain changes with treatment.',
    target: ['.helps-count'],
  },
  {
    id: 'timeline',
    title: 'Playing an episode',
    text: 'Press play or the space bar, or drag along the bar. Each step shows its real-world timescale; screen time is not real time. A dashed top edge means the order of that step was reconstructed, not measured.',
    target: ['#timeline'],
  },
  {
    id: 'caption',
    title: 'What is happening',
    text: 'This text explains each step as it plays. When a step draws no change, a note on the brain says so, and this text says why.',
    target: ['#caption'],
  },
  {
    id: 'panel',
    title: 'The details',
    text: 'The description of the episode, and links between conditions and their treatments. After clicking a region, this panel shows what is known about it, with every source.',
    target: ['#side-panel'],
  },
  {
    id: 'typical',
    title: 'Typical response',
    text: 'Where the research allows, this switches to how the same moment looks in people without the condition, for comparison.',
    target: ['#typical-label'],
  },
  {
    id: 'about',
    title: 'Learn more',
    text: 'About the science explains how the episodes were built and their limits. Nothing here is medical advice. "If you\'re struggling", at the bottom, links to helplines. Reopen this tour any time with How it works.',
    target: ['.top-buttons'],
  },
];

/** Space kept between the card, its target and the edges of the screen. */
const GAP = 12;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

/**
 * Where the tour card goes. On a phone it is a sheet along the bottom. Otherwise it sits below the
 * lit part if it fits, else above, else beside it, and always stays fully on screen.
 */
export function placeCard(target: Rect | null, card: Size, view: Size, narrow: boolean): { left: number; top: number } {
  if (narrow) return { left: 0, top: view.height - card.height };
  if (!target) return { left: (view.width - card.width) / 2, top: (view.height - card.height) / 2 };

  const maxLeft = view.width - GAP - card.width;
  const maxTop = view.height - GAP - card.height;
  const below = target.top + target.height + GAP;
  if (below <= maxTop) return { left: clamp(target.left, GAP, maxLeft), top: below };
  const above = target.top - GAP - card.height;
  if (above >= GAP) return { left: clamp(target.left, GAP, maxLeft), top: above };

  const right = target.left + target.width + GAP;
  const left = right <= maxLeft ? right : target.left - GAP - card.width;
  return { left: clamp(left, GAP, maxLeft), top: clamp(target.top, GAP, maxTop) };
}

const KEY = 'brain-states.tour-seen';

/** Whether this browser has finished or skipped the tour. Missing or blocked storage counts as not seen. */
export function tourSeen(storage: Pick<Storage, 'getItem'> | null): boolean {
  try {
    return storage?.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/** Remember that the tour was seen. Never throws: if storage is blocked the tour simply shows again next time. */
export function markTourSeen(storage: Pick<Storage, 'setItem'> | null): void {
  try {
    storage?.setItem(KEY, '1');
  } catch {
    // Storage blocked (a private window, say): nothing to remember it in.
  }
}
