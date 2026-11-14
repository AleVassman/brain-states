import type { ScoreIndexEntry } from '../score/load';
import { el } from './dom';

export interface StatePicker {
  setSelected(id: string | null): void;
}

/** The list of states on the left. Calls `onPick` when one is chosen. */
export function createStatePicker(
  root: HTMLElement,
  entries: ScoreIndexEntry[],
  onPick: (entry: ScoreIndexEntry) => void,
): StatePicker {
  const buttons = new Map<string, HTMLButtonElement>();
  root.replaceChildren();
  for (const entry of entries) {
    const button = el('button', { class: 'state', attrs: { type: 'button' } }, [
      el('span', { text: entry.title }),
      entry.reviewed ? null : el('span', { class: 'badge', text: 'awaiting review' }),
    ]);
    button.addEventListener('click', () => onPick(entry));
    buttons.set(entry.id, button);
    root.append(el('li', {}, [button]));
  }
  return {
    setSelected(id) {
      for (const [key, button] of buttons) {
        button.classList.toggle('selected', key === id);
        button.setAttribute('aria-pressed', String(key === id));
      }
    },
  };
}
