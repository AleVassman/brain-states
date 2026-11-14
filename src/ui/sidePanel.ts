import type { Citation, Confidence, RegionInfo, Score, VariantName } from '../score/types';
import { el } from './dom';
import { regionPanelContent } from './panelContent';

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  established: 'Well established',
  mixed: 'Mixed evidence',
  debated: 'Still debated',
};

const KIND_LABEL: Record<Citation['kind'], string> = {
  'meta-analysis': 'Meta-analysis',
  review: 'Review',
  study: 'Single study',
};

export type PanelView =
  | { kind: 'empty' }
  | { kind: 'errors'; title: string; errors: string[] }
  | { kind: 'state'; score: Score }
  | { kind: 'region'; region: RegionInfo; score: Score | null; variant: VariantName };

export function citationNode(c: Citation): HTMLElement {
  return el('li', { class: 'citation' }, [
    el('div', { class: 'citation-title', text: c.title }),
    el('div', { class: 'citation-meta', text: `${c.authors} (${c.year}) · ${KIND_LABEL[c.kind]}` }),
    el('blockquote', { text: `“${c.quote}”` }),
    el('div', { class: 'citation-links' }, [
      el('a', { text: `doi:${c.doi}`, attrs: { href: `https://doi.org/${c.doi}`, target: '_blank', rel: 'noopener noreferrer' } }),
      c.access === 'abstract-only' ? el('span', { class: 'badge', text: 'abstract only' }) : null,
    ]),
  ]);
}

/** Replaces the side panel's contents with one of its four views. */
export function renderSidePanel(root: HTMLElement, view: PanelView): void {
  root.replaceChildren();
  if (view.kind === 'empty') {
    root.append(
      el('h2', { text: 'Pick a state' }),
      el('p', { text: 'Choose a state on the left and press play. Drag to rotate the brain, scroll to zoom, and click a region to read about it.' }),
    );
    return;
  }
  if (view.kind === 'errors') {
    root.append(
      el('h2', { text: view.title }),
      el('p', { text: 'This state could not be loaded:' }),
      el('ul', { class: 'errors' }, view.errors.map((e) => el('li', { text: e }))),
    );
    return;
  }
  if (view.kind === 'state') {
    root.append(
      el('h2', { text: view.score.title }),
      el('p', { text: view.score.description }),
      el('h3', { text: 'What is reconstruction here' }),
      el('p', { class: 'caveat', text: view.score.caveat }),
      el('p', { class: 'hint', text: 'Click a glowing region to see what it is doing and the studies behind it.' }),
    );
    return;
  }
  const content = regionPanelContent(view.region, view.score, view.variant);
  root.append(
    el('h2', { text: content.title }),
    content.approximate ? el('span', { class: 'badge', text: 'Approximate location' }) : '',
    content.confidence
      ? el('span', { class: `badge confidence ${content.confidence}`, text: CONFIDENCE_LABEL[content.confidence] })
      : '',
    el('p', { text: content.body }),
  );
  if (content.citations.length > 0) {
    root.append(el('h3', { text: 'Sources' }), el('ul', { class: 'citations' }, content.citations.map(citationNode)));
  }
  root.append(el('p', { class: 'hint', text: `Shape from: ${content.source}.` }));
}
