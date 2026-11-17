import type { Citation, Confidence, ConnectionTrack, RegionInfo, RegionTrack, Score, VariantName } from '../score/types';

export interface RegionPanelContent {
  title: string;
  body: string;
  confidence: Confidence | null;
  citations: Citation[];
  /** True when the region is drawn as a marker at published coordinates, not a shaped structure. */
  approximate: boolean;
  /** Set when the drawn shape is larger than the area it stands for. */
  extentNote: string | null;
  /** The atlas the region's shape comes from. */
  source: string;
}

export const NOT_IN_STATE = "Not part of this state's documented pattern.";
export const CONNECTION_ONLY =
  'No change in activity is documented for this region in this state, but a connection shown here ends at it.';
export const NO_STATE = 'Pick a state to see what this region does in it.';

/** Where a citation links to: its DOI, or its PubMed page when it has no DOI. */
export function citationHref(c: Citation): string {
  const doi = c.doi.trim();
  return doi ? `https://doi.org/${doi}` : `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`;
}

/** The track that drives a region: one on the region itself wins over one on its group. */
export function trackFor(region: RegionInfo, score: Score | null, variant: VariantName): RegionTrack | null {
  const tracks = (variant === 'typical' ? score?.typical : score?.condition)?.regions ?? [];
  return tracks.find((t) => t.region === region.id) ?? tracks.find((t) => t.region === region.group) ?? null;
}

/** Every connection drawn in this variant that starts or ends at the region. */
export function connectionsTouching(region: RegionInfo, score: Score | null, variant: VariantName): ConnectionTrack[] {
  const tracks = (variant === 'typical' ? score?.typical : score?.condition)?.connections ?? [];
  const names = [region.id, region.group];
  return tracks.filter((t) => names.includes(t.from) || names.includes(t.to));
}

/** Display name for a region id or a group ("amygdala" -> "Amygdala"). Falls back to the name given. */
export function regionLabel(name: string, regions: RegionInfo[]): string {
  const byId = regions.find((r) => r.id === name);
  if (byId) return byId.name;
  const inGroup = regions.find((r) => r.group === name);
  if (!inGroup) return name;
  const bare = inGroup.name.replace(/^(Left|Right) /, '');
  return bare.charAt(0).toUpperCase() + bare.slice(1);
}

/** What the side panel says about a clicked region. Pure, so it can be tested without a page. */
export function regionPanelContent(region: RegionInfo, score: Score | null, variant: VariantName): RegionPanelContent {
  const common = {
    title: region.name,
    approximate: region.approximate,
    extentNote: region.extentNote ?? null,
    source: region.source,
  };
  if (!score) return { ...common, body: NO_STATE, confidence: null, citations: [] };
  const track = trackFor(region, score, variant);
  if (!track) {
    const body = connectionsTouching(region, score, variant).length > 0 ? CONNECTION_ONLY : NOT_IN_STATE;
    return { ...common, body, confidence: null, citations: [] };
  }
  return { ...common, body: track.explanation, confidence: track.confidence, citations: track.citations };
}
