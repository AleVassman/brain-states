import type { ScoreIndexEntry } from '../score/load';
import { el } from './dom';
import { buildTabs, locate, searchEntries, TAB_LABEL, type ListTab } from './listModel';

export interface StatePicker {
  setSelected(id: string | null): void;
}

const TABS: ListTab[] = ['mind', 'body'];

/**
 * The episode list on the left: Mind and Body tabs, each condition with its treatments tucked
 * underneath, and a search box across everything. Calls `onPick` when an episode is chosen.
 */
export function createStatePicker(
  root: HTMLElement,
  entries: ScoreIndexEntry[],
  onPick: (entry: ScoreIndexEntry) => void,
): StatePicker {
  const tabs = buildTabs(entries);
  let tab: ListTab = 'mind';
  let query = '';
  let selectedId: string | null = null;
  const open = new Set<string>();

  const tabButtons = new Map<ListTab, HTMLButtonElement>();
  const tablist = el('div', { class: 'list-tabs', attrs: { role: 'tablist', 'aria-label': 'Episode groups' } });
  for (const t of TABS) {
    const button = el('button', {
      class: 'list-tab',
      text: TAB_LABEL[t],
      attrs: { type: 'button', role: 'tab', id: `list-tab-${t}`, 'aria-controls': 'list-panel' },
    });
    button.addEventListener('click', () => {
      tab = t;
      query = '';
      search.value = '';
      render();
    });
    // Arrow keys move between the tabs, as tab lists usually allow.
    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      tab = TABS[(TABS.indexOf(t) + 1) % TABS.length];
      query = '';
      search.value = '';
      render();
      tabButtons.get(tab)?.focus();
    });
    tabButtons.set(t, button);
    tablist.append(button);
  }

  const search = el('input', { class: 'list-search', attrs: { type: 'search', id: 'list-search', placeholder: 'Search all episodes', autocomplete: 'off' } });
  search.addEventListener('input', () => {
    query = search.value;
    renderPanel();
  });
  const searchLabel = el('label', { class: 'list-search-label', text: 'Search', attrs: { for: 'list-search' } });

  const panel = el('div', { class: 'list-panel', attrs: { id: 'list-panel', role: 'tabpanel' } });

  root.replaceChildren(tablist, searchLabel, search, panel);

  /** One pickable episode button. */
  function episodeButton(entry: ScoreIndexEntry, place?: string): HTMLButtonElement {
    const selected = entry.id === selectedId;
    const button = el('button', { class: `state${selected ? ' selected' : ''}`, attrs: { type: 'button', 'aria-pressed': String(selected), 'data-id': entry.id } }, [
      el('span', { text: entry.title }),
      place ? el('span', { class: 'state-place', text: place }) : null,
      entry.reviewed ? null : el('span', { class: 'badge', text: 'awaiting review' }),
    ]);
    button.addEventListener('click', () => onPick(entry));
    return button;
  }

  function renderPanel(): void {
    panel.replaceChildren();
    const results = query.trim() ? searchEntries(query, entries) : null;
    if (results) {
      panel.removeAttribute('aria-labelledby');
      panel.setAttribute('aria-label', 'Search results');
      if (results.length === 0) {
        panel.append(el('p', { class: 'hint', text: 'No matches' }));
        return;
      }
      panel.append(el('ul', { class: 'state-group' }, results.map(({ entry, place }) => el('li', {}, [episodeButton(entry, place)]))));
      return;
    }
    panel.removeAttribute('aria-label');
    panel.setAttribute('aria-labelledby', `list-tab-${tab}`);
    const list = el('ul', { class: 'state-group' });
    for (const row of tabs[tab]) {
      const isOpen = open.has(row.entry.id);
      const line = el('div', { class: 'state-row' }, [episodeButton(row.entry)]);
      if (row.treatments.length > 0) {
        const n = row.treatments.length;
        const toggle = el('button', {
          class: 'helps-count',
          text: `${n} ${isOpen ? '▾' : '▸'}`,
          attrs: {
            type: 'button',
            'aria-expanded': String(isOpen),
            'aria-label': `${isOpen ? 'Hide' : 'Show'} ${n} ${n === 1 ? 'treatment' : 'treatments'} for ${row.entry.title}`,
            title: `What helps: ${n} ${n === 1 ? 'treatment' : 'treatments'}`,
          },
        });
        toggle.addEventListener('click', () => {
          if (open.has(row.entry.id)) open.delete(row.entry.id);
          else open.add(row.entry.id);
          renderPanel();
          panel.querySelector<HTMLButtonElement>(`.state-row:has([data-id="${CSS.escape(row.entry.id)}"]) .helps-count`)?.focus();
        });
        line.append(toggle);
      }
      const item = el('li', {}, [line]);
      if (isOpen) {
        item.append(el('ul', { class: 'treatment-list', attrs: { 'aria-label': `What helps: ${row.entry.title}` } }, row.treatments.map((t) => el('li', {}, [episodeButton(t)]))));
      }
      list.append(item);
    }
    panel.append(list);
  }

  function render(): void {
    for (const [t, button] of tabButtons) {
      const active = t === tab && !query.trim();
      button.setAttribute('aria-selected', String(t === tab));
      button.tabIndex = t === tab ? 0 : -1;
      button.classList.toggle('active', active);
    }
    renderPanel();
  }

  render();

  return {
    setSelected(id) {
      selectedId = id;
      const place = id ? locate(id, entries) : null;
      if (place) {
        tab = place.tab;
        if (place.parentId) open.add(place.parentId);
        query = '';
        search.value = '';
      }
      render();
      if (id) panel.querySelector<HTMLElement>(`[data-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'nearest' });
    },
  };
}
