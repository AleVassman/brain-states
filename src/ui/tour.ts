import { el } from './dom';
import { placeCard, TOUR_STEPS, type Rect } from './tourModel';

/** The same breakpoint as the phone layout in style.css. */
const NARROW = '(max-width: 760px)';
/** Room left around the lit part. */
const PAD = 6;

export interface Tour {
  open(): Promise<void>;
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
    { class: 'tour-card', attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'tour-title', 'aria-describedby': 'tour-text' } },
    [count, title, text, el('div', { class: 'tour-buttons' }, [skip, back, next])],
  );
  const root = el('div', { class: 'tour', attrs: { hidden: '' } }, [spot, card]);
  document.body.append(root);

  let index = 0;
  let isOpen = false;
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
    const place = placeCard(rect, { width: card.offsetWidth, height: card.offsetHeight }, view, narrow);
    card.style.transform = `translate(${Math.round(place.left)}px, ${Math.round(place.top)}px)`;
    if (isOpen) frame = requestAnimationFrame(position);
  };

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
    // On a phone the panels scroll beneath the brain; bring the lit part into view above the card.
    target()?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    cancelAnimationFrame(frame);
    root.hidden = true;
    window.removeEventListener('keydown', onKey, true);
    returnFocus?.focus();
    options.onClose?.();
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowRight' && index < TOUR_STEPS.length - 1) show(index + 1);
    else if (event.key === 'ArrowLeft' && index > 0) show(index - 1);
    else if (event.key === 'Tab') {
      // Keep the keyboard inside the card while the tour is open.
      const buttons = [skip, back, next].filter((b) => !b.hidden && !b.disabled);
      const at = buttons.indexOf(document.activeElement as HTMLButtonElement);
      const to = event.shiftKey ? (at <= 0 ? buttons.length - 1 : at - 1) : (at + 1) % buttons.length;
      buttons[to].focus();
    } else return;
    event.preventDefault();
    event.stopPropagation();
  };

  next.addEventListener('click', () => (index < TOUR_STEPS.length - 1 ? show(index + 1) : close()));
  back.addEventListener('click', () => index > 0 && show(index - 1));
  skip.addEventListener('click', close);

  return {
    async open() {
      if (isOpen) return;
      returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      await options.prepare();
      isOpen = true;
      root.hidden = false;
      window.addEventListener('keydown', onKey, true);
      show(0);
      next.focus();
      frame = requestAnimationFrame(position);
    },
  };
}
