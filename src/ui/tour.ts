import { el } from './dom';
import { phoneDock, placeCard, TOUR_STEPS, type Rect } from './tourModel';

/** The same breakpoint as the phone layout in style.css. */
const NARROW = '(max-width: 760px)';
/** Room left around the lit part. */
const PAD = 6;
/** Everything the tour sits over; made inert while it is open, so neither keyboard nor screen reader wanders off. */
const PAGE = ['#stage', '#labels', '#stage-note', '#ui'];

export interface Tour {
  /** `fromKeyboard`: focus goes back to whatever opened the tour when it closes. */
  open(fromKeyboard?: boolean): Promise<void>;
}

/**
 * The guided tour: one step at a time, the part being explained is lit, the rest of the page is
 * dimmed, and a card explains it. `prepare` sets the page up first (an example episode loaded).
 */
export function createTour(options: { prepare: () => Promise<void>; onClose?: () => void }): Tour {
  const spot = el('div', { class: 'tour-spot', attrs: { 'aria-hidden': 'true' } });
  const count = el('p', { class: 'tour-count' });
  const title = el('h2', { class: 'tour-title', attrs: { id: 'tour-title' } });
  const text = el('p', { class: 'tour-text', attrs: { id: 'tour-text' } });
  const back = el('button', { class: 'tour-back', text: 'Back', attrs: { type: 'button' } });
  const next = el('button', { class: 'tour-next', text: 'Next', attrs: { type: 'button' } });
  const skip = el('button', { class: 'tour-skip', text: 'Skip tour', attrs: { type: 'button' } });
  const card = el(
    'div',
    {
      class: 'tour-card',
      // tabindex -1: a click on the card's text keeps focus in the card rather than dropping it to the page.
      attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'tour-title', 'aria-describedby': 'tour-text', tabindex: '-1' },
    },
    // The live region makes screen readers read each new step.
    [el('div', { attrs: { 'aria-live': 'polite' } }, [count, title, text]), el('div', { class: 'tour-buttons' }, [skip, back, next])],
  );
  const root = el('div', { class: 'tour', attrs: { hidden: '' } }, [spot, card]);
  document.body.append(root);

  let index = 0;
  let isOpen = false;
  let opening = false;
  let frame = 0;
  let returnFocus: HTMLElement | null = null;

  const target = (): HTMLElement | null => {
    // The first part that exists and is laid out on this screen; with none, the card is simply centred.
    for (const selector of TOUR_STEPS[index].target ?? []) {
      const found = document.querySelector<HTMLElement>(selector);
      if (found && found.getClientRects().length > 0) return found;
    }
    return null;
  };

  /** Keeps the light and the card on the target as the page scrolls, resizes or animates. */
  const position = () => {
    if (!isOpen) return;
    const narrow = window.matchMedia(NARROW).matches;
    const t = target();
    const r = t?.getBoundingClientRect();
    const rect: Rect | null = r ? { left: r.left - PAD, top: r.top - PAD, width: r.width + 2 * PAD, height: r.height + 2 * PAD } : null;
    if (rect) {
      Object.assign(spot.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
    } else {
      // Nothing to light: a zero-size spot in the middle, so its shadow dims the whole page.
      Object.assign(spot.style, { left: '50%', top: '50%', width: '0px', height: '0px' });
    }
    const view = { width: window.innerWidth, height: window.innerHeight };
    if (narrow) {
      // A sheet along one edge, placed by CSS so it follows the real screen edge on phones.
      card.dataset.dock = phoneDock(rect, view);
      card.style.transform = '';
    } else {
      delete card.dataset.dock;
      const place = placeCard(rect, { width: card.offsetWidth, height: card.offsetHeight }, view, false);
      card.style.transform = `translate(${Math.round(place.left)}px, ${Math.round(place.top)}px)`;
    }
    frame = requestAnimationFrame(position);
  };

  const visibleButtons = () => [skip, back, next].filter((b) => !b.hidden && !b.disabled);

  const show = (i: number) => {
    index = i;
    const step = TOUR_STEPS[i];
    const last = i === TOUR_STEPS.length - 1;
    count.textContent = `${i + 1} of ${TOUR_STEPS.length}`;
    title.textContent = step.title;
    text.textContent = step.text;
    back.disabled = i === 0;
    next.textContent = last ? 'Done' : 'Next';
    skip.hidden = last;
    // A button that just became disabled or hidden would drop focus to the page.
    if (!visibleButtons().includes(document.activeElement as HTMLButtonElement)) next.focus();
    // Bring the lit part into view: on phones it may be down in the panels.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target()?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
  };

  const setPageInert = (on: boolean) => {
    for (const selector of PAGE) document.querySelector(selector)?.toggleAttribute('inert', on);
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    cancelAnimationFrame(frame);
    root.hidden = true;
    setPageInert(false);
    window.removeEventListener('keydown', onKey, true);
    // Only a keyboard user gets focus back; otherwise nothing keeps it, so the space bar plays and pauses.
    if (returnFocus) returnFocus.focus();
    else if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    options.onClose?.();
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const onButton = event.target instanceof HTMLButtonElement && card.contains(event.target);
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowRight' && index < TOUR_STEPS.length - 1) show(index + 1);
    else if (event.key === 'ArrowLeft' && index > 0) show(index - 1);
    else if (event.key === 'Tab') {
      // Keep the keyboard inside the card while the tour is open.
      const buttons = visibleButtons();
      const at = buttons.indexOf(document.activeElement as HTMLButtonElement);
      const to = event.shiftKey ? (at <= 0 ? buttons.length - 1 : at - 1) : (at + 1) % buttons.length;
      buttons[to].focus();
    } else if ((event.key === ' ' || event.key === 'Enter') && onButton) {
      return; // let the focused tour button press itself
    } else if (event.key === ' ' || event.key === 'Enter') {
      // Never let these reach the page underneath (the space bar would start the episode).
    } else return;
    event.preventDefault();
    event.stopPropagation();
  };

  next.addEventListener('click', () => (index < TOUR_STEPS.length - 1 ? show(index + 1) : close()));
  back.addEventListener('click', () => index > 0 && show(index - 1));
  skip.addEventListener('click', close);

  return {
    async open(fromKeyboard = false) {
      if (isOpen || opening) return;
      opening = true;
      returnFocus = fromKeyboard && document.activeElement instanceof HTMLElement ? document.activeElement : null;
      try {
        await options.prepare();
      } finally {
        opening = false;
      }
      isOpen = true;
      root.hidden = false;
      setPageInert(true);
      window.addEventListener('keydown', onKey, true);
      show(0);
      next.focus();
      frame = requestAnimationFrame(position);
    },
  };
}
