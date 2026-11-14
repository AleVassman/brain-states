import type { Player } from '../player/player';

export const PLACEHOLDER_BANNER = 'PLACEHOLDER DATA — NOT REAL SCIENCE';

/** The sentence under the brain describing the current phase. */
export function captionText(player: Player): string {
  const frame = player.frame();
  if (!frame) return '';
  if (player.variant === 'typical' && frame.phase.typicalCaption) return frame.phase.typicalCaption;
  return frame.phase.caption;
}

export function updateCaption(captionEl: HTMLElement, bannerEl: HTMLElement, player: Player): void {
  captionEl.textContent = captionText(player);
  bannerEl.textContent = player.score?.placeholder ? PLACEHOLDER_BANNER : '';
  bannerEl.hidden = !player.score?.placeholder;
}
