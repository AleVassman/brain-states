import type { Player } from '../player/player';
import type { Score } from '../score/types';
import { el } from './dom';

/** Play/pause, the phases of the episode, and a handle to scrub through them. */
export function createTimeline(root: HTMLElement, player: Player): { update(): void } {
  const play = el('button', { class: 'play', attrs: { type: 'button', 'aria-label': 'Play' } });
  const phases = el('div', { class: 'phases' });
  const handle = el('div', { class: 'handle' });
  const track = el('div', { class: 'track' }, [phases, handle]);
  const note = el('p', { class: 'timeline-note', text: 'Screen time is not real time. Dashed phases: order reconstructed, not measured.' });
  root.replaceChildren(el('div', { class: 'timeline-row' }, [play, track]), note);

  play.addEventListener('click', () => (player.playing ? player.pause() : player.play()));

  const seekFromPointer = (event: PointerEvent) => {
    const rect = track.getBoundingClientRect();
    player.seek((event.clientX - rect.left) / rect.width);
  };
  track.addEventListener('pointerdown', (event) => {
    if (!player.score) return;
    player.pause();
    track.setPointerCapture(event.pointerId);
    seekFromPointer(event);
  });
  track.addEventListener('pointermove', (event) => {
    if (track.hasPointerCapture(event.pointerId)) seekFromPointer(event);
  });

  let shown: Score | null | undefined;
  const buildPhases = (score: Score | null) => {
    phases.replaceChildren();
    if (!score) return;
    for (const phase of score.phases) {
      const reconstructed = phase.order?.kind === 'reconstructed';
      const segment = el('div', { class: `phase${reconstructed ? ' reconstructed' : ''}` }, [
        el('span', { class: 'phase-name', text: phase.name }),
        el('span', { class: 'phase-scale', text: phase.timescale }),
      ]);
      segment.style.width = `${(phase.end - phase.start) * 100}%`;
      if (phase.order?.kind === 'reconstructed') segment.title = `Order reconstructed: ${phase.order.rationale}`;
      else if (phase.order?.kind === 'timed') segment.title = 'Order supported by a time-resolved study.';
      segment.dataset.phase = phase.id;
      phases.append(segment);
    }
  };

  return {
    update() {
      const score = player.score;
      if (score !== shown) {
        shown = score;
        buildPhases(score);
      }
      root.classList.toggle('disabled', !score);
      play.disabled = !score;
      play.textContent = player.playing ? '❚❚' : '▶';
      play.setAttribute('aria-label', player.playing ? 'Pause' : 'Play');
      handle.style.left = `${player.t * 100}%`;
      const current = player.frame()?.phase.id;
      for (const segment of phases.children) {
        segment.classList.toggle('current', (segment as HTMLElement).dataset.phase === current);
      }
    },
  };
}
