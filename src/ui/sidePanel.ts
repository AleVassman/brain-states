import type { Citation, Confidence, ConnectionTrack, RegionInfo, Score, VariantName } from '../score/types';
import { el } from './dom';
import type { ScoreIndexEntry } from '../score/load';
import { citationHref, connectionsTouching, regionLabel, regionPanelContent, relatedSections } from './panelContent';
import type { RelatedEntries } from './related';

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
  | { kind: 'state'; score: Score; variant: VariantName; regions: RegionInfo[]; related: RelatedEntries }
  | { kind: 'region'; region: RegionInfo; score: Score | null; variant: VariantName; regions: RegionInfo[] };

export function citationNode(c: Citation): HTMLElement {
  return el('li', { class: 'citation' }, [
    el('div', { class: 'citation-title', text: c.title }),
    el('div', { class: 'citation-meta', text: `${c.authors} (${c.year}) · ${KIND_LABEL[c.kind]}` }),
    el('blockquote', { text: `“${c.quote}”` }),
    el('div', { class: 'citation-links' }, [
      el('a', { text: c.doi.trim() ? `doi:${c.doi.trim()}` : `PubMed ${c.pmid}`, attrs: { href: citationHref(c), target: '_blank', rel: 'noopener noreferrer' } }),
      c.access === 'abstract-only' ? el('span', { class: 'badge', text: 'abstract only' }) : null,
    ]),
  ]);
}

const confidenceBadge = (confidence: Confidence) =>
  el('span', { class: `badge confidence ${confidence}`, text: CONFIDENCE_LABEL[confidence] });

const sources = (citations: Citation[]) => el('ul', { class: 'citations' }, citations.map(citationNode));

/** One connection line: what it joins, how sure the claim is, what it means, and its sources. */
function connectionNode(track: ConnectionTrack, regions: RegionInfo[]): HTMLElement {
  return el('div', { class: 'connection' }, [
    el('div', { class: 'connection-title', text: `${regionLabel(track.from, regions)} → ${regionLabel(track.to, regions)}` }),
    confidenceBadge(track.confidence),
    el('p', { text: track.explanation }),
    sources(track.citations),
  ]);
}

/** How each step of the episode is known: timed by a study, or reconstructed with a stated reason. */
function orderNodes(score: Score): HTMLElement[] {
  return score.phases.slice(1).map((phase) => {
    const order = phase.order;
    if (order?.kind === 'timed') {
      return el('div', { class: 'connection' }, [
        el('div', { class: 'connection-title', text: phase.name }),
        el('span', { class: 'badge', text: 'Order timed by a study' }),
        sources(order.citations),
      ]);
    }
    return el('div', { class: 'connection' }, [
      el('div', { class: 'connection-title', text: phase.name }),
      el('span', { class: 'badge', text: 'Order reconstructed' }),
      el('p', { text: order?.kind === 'reconstructed' ? order.rationale : '' }),
    ]);
  });
}

/** Replaces the side panel's contents with one of its four views. */
export function renderSidePanel(root: HTMLElement, view: PanelView, onPickEntry?: (entry: ScoreIndexEntry) => void): void {
  root.replaceChildren();
  root.scrollTop = 0;
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
    const variant = view.variant === 'typical' ? view.score.typical : view.score.condition;
    root.append(
      el('h2', { text: view.score.title }),
      el('p', { text: view.score.description }),
    );
    for (const section of relatedSections(view.related)) {
      root.append(
        el('h3', { text: section.heading }),
        ...section.links.map(({ entry, label }) => {
          const button = el('button', { class: 'related-link', text: label, attrs: { type: 'button' } });
          button.addEventListener('click', () => onPickEntry?.(entry));
          return button;
        }),
      );
    }
    root.append(
      el('h3', { text: 'What is reconstruction here' }),
      el('p', { class: 'caveat', text: view.score.caveat }),
      el('p', { class: 'hint', text: 'Click a glowing region to see what it is doing and the studies behind it.' }),
    );
    if (variant && variant.connections.length > 0) {
      root.append(
        el('h3', { text: 'The lines between regions' }),
        ...variant.connections.map((track) => connectionNode(track, view.regions)),
      );
    }
    root.append(el('h3', { text: 'How the order of events is known' }), ...orderNodes(view.score));
    return;
  }

  const content = regionPanelContent(view.region, view.score, view.variant);
  root.append(el('h2', { text: content.title }));
  if (content.approximate) root.append(el('span', { class: 'badge', text: 'Approximate location' }));
  if (content.extentNote) root.append(el('span', { class: 'badge', text: 'Approximate extent' }));
  if (content.confidence) root.append(confidenceBadge(content.confidence));
  root.append(el('p', { text: content.body }));
  if (content.citations.length > 0) root.append(el('h3', { text: 'Sources' }), sources(content.citations));

  const touching = connectionsTouching(view.region, view.score, view.variant);
  if (touching.length > 0) {
    root.append(
      el('h3', { text: 'Lines that end here' }),
      ...touching.map((track) => connectionNode(track, view.regions)),
    );
  }
  if (content.extentNote) root.append(el('p', { class: 'hint', text: content.extentNote }));
  root.append(el('p', { class: 'hint', text: `Shape from: ${content.source}.` }));
}
