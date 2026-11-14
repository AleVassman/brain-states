import type { Citation, Confidence, RegionInfo, RegionTrack, Score, VariantName } from '../score/types';

export interface RegionPanelContent {
  title: string;
  body: string;
  confidence: Confidence | null;
  citations: Citation[];
  /** True when the region is drawn as a marker at published coordinates, not a shaped structure. */
  approximate: boolean;
  /** The atlas the region's shape comes from. */
  source: string;
}

export const NOT_IN_STATE = "Not part of this state's documented pattern.";
export const NO_STATE = 'Pick a state to see what this region does in it.';

/** The track that drives a region: one on the region itself wins over one on its group. */
export function trackFor(region: RegionInfo, score: Score | null, variant: VariantName): RegionTrack | null {
  const tracks = (variant === 'typical' ? score?.typical : score?.condition)?.regions ?? [];
  return tracks.find((t) => t.region === region.id) ?? tracks.find((t) => t.region === region.group) ?? null;
}

/** What the side panel says about a clicked region. Pure, so it can be tested without a page. */
export function regionPanelContent(region: RegionInfo, score: Score | null, variant: VariantName): RegionPanelContent {
  const common = { title: region.name, approximate: region.approximate, source: region.source };
  if (!score) return { ...common, body: NO_STATE, confidence: null, citations: [] };
  const track = trackFor(region, score, variant);
  if (!track) return { ...common, body: NOT_IN_STATE, confidence: null, citations: [] };
  return { ...common, body: track.explanation, confidence: track.confidence, citations: track.citations };
}
