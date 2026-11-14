export type Confidence = 'established' | 'mixed' | 'debated';
export type VariantName = 'condition' | 'typical';

export interface Citation {
  authors: string;
  year: number;
  title: string;
  doi: string;
  kind: 'meta-analysis' | 'review' | 'study';
  access: 'full-text' | 'abstract-only';
  /** The sentence in the source that supports the claim. */
  quote: string;
}

/** t in [0,1] over the episode; v in [-1,1] relative to a typical brain at rest. */
export interface Keyframe {
  t: number;
  v: number;
}

interface TrackBase {
  explanation: string;
  confidence: Confidence;
  citations: Citation[];
  keyframes: Keyframe[];
}

/** `region` is a RegionInfo id or group. */
export interface RegionTrack extends TrackBase {
  region: string;
}

export interface ConnectionTrack extends TrackBase {
  from: string;
  to: string;
}

export type PhaseOrder =
  | { kind: 'timed'; citations: Citation[] }
  | { kind: 'reconstructed'; rationale: string };

export interface Phase {
  id: string;
  name: string;
  /** Real-world timescale label, e.g. "under a second". */
  timescale: string;
  /** Share of screen time, in [0,1]. */
  start: number;
  end: number;
  caption: string;
  typicalCaption?: string;
  /** How the step into this phase is known. Required on every phase except the first. */
  order?: PhaseOrder;
}

export interface Variant {
  regions: RegionTrack[];
  connections: ConnectionTrack[];
}

export interface Score {
  id: string;
  title: string;
  description: string;
  caveat: string;
  placeholder?: boolean;
  durationSeconds: number;
  phases: Phase[];
  condition: Variant;
  typical: Variant | null;
}

export interface RegionInfo {
  /** e.g. "amygdala-l"; equals the node name in brain.glb. */
  id: string;
  /** e.g. "amygdala". */
  group: string;
  name: string;
  hemisphere: 'l' | 'r' | 'mid';
  centroid: [number, number, number];
  kind: 'mesh' | 'marker';
  approximate: boolean;
  radius?: number;
  source: string;
}

export interface Frame {
  t: number;
  phase: Phase;
  variant: VariantName;
  /** RegionInfo.id -> activity */
  regions: Map<string, number>;
  connections: { from: string; to: string; v: number }[];
}
