import type { ScoreIndexEntry } from '../score/load';
import { el } from './dom';
import { groupEntries } from './groups';

export interface StatePicker {
  setSelected(id: string | null): void;
}

/** The list of states on the left, in its groups. Calls `onPick` when one is chosen. */
export function createStatePicker(
  root: HTMLElement,
  entries: ScoreIndexEntry[],
  onPick: (entry: ScoreIndexEntry) => void,
): StatePicker {
  const buttons = new Map<string, HTMLButtonElement>();
  root.replaceChildren();
  for (const group of groupEntries(entries)) {
    const list = el('ul', { class: 'state-group' });
    for (const entry of group.entries) {
      const button = el('button', { class: 'state', attrs: { type: 'button' } }, [
        el('span', { text: entry.title }),
        entry.reviewed ? null : el('span', { class: 'badge', text: 'awaiting review' }),
      ]);
      button.addEventListener('click', () => onPick(entry));
      buttons.set(entry.id, button);
      list.append(el('li', {}, [button]));
    }
    root.append(el('li', {}, [el('h3', { class: 'group-heading', text: group.heading }), list]));
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
