import { CONTEXT_GROUPS_LIST } from '../score/contextGroups';
import type { Frame, RegionInfo } from '../score/types';

export interface ActivityLabel {
  group: string;
  /** Short display name: "Amygdala", or "Right insula" when only one side is changing. */
  name: string;
  /** The activity shown, -1..1. The strongest value among the regions the label covers. */
  v: number;
  /** The regions this label covers; the label is drawn next to one of them. */
  ids: string[];
}

/** Changes smaller than this are too faint to be worth a label. */
const THRESHOLD = 0.15;

const short = (name: string) => name.replace(/\s*\(.*\)\s*$/, '');
const capital = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

/**
 * Which structures are noticeably above or below baseline right now, strongest
 * first. One label per structure; left and right are merged when both change.
 */
export function activityLabels(frame: Frame | null, regions: RegionInfo[], max = 8, threshold = THRESHOLD): ActivityLabel[] {
  if (!frame) return [];
  const byGroup = new Map<string, RegionInfo[]>();
  for (const region of regions) {
    if (CONTEXT_GROUPS_LIST.includes(region.group)) continue;
    const value = frame.regions.get(region.id) ?? 0;
    if (Math.abs(value) < threshold) continue;
    const members = byGroup.get(region.group) ?? [];
    members.push(region);
    byGroup.set(region.group, members);
  }

  const labels: ActivityLabel[] = [];
  for (const [group, members] of byGroup) {
    const strongest = members.reduce((best, r) =>
      Math.abs(frame.regions.get(r.id) ?? 0) > Math.abs(frame.regions.get(best.id) ?? 0) ? r : best,
    );
    const name =
      members.length === 1 ? short(members[0].name) : capital(short(members[0].name).replace(/^(Left|Right) /, ''));
    labels.push({ group, name, v: frame.regions.get(strongest.id) ?? 0, ids: members.map((r) => r.id) });
  }
  labels.sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
  return labels.slice(0, max);
}
