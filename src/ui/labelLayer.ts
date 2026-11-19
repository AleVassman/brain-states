import type { Stage } from '../brain/scene';
import type { RegionInfo } from '../score/types';
import type { ActivityLabel } from './activityLabels';
import { el } from './dom';

/** Smallest vertical gap between two labels, in pixels, so they never sit on top of each other. */
const MIN_GAP = 22;

/** Horizontal distance from a dot to its tag. */
const TAG_OFFSET = 26;

/**
 * Where a tag of `width` pixels starts: to the right of its dot when it fits before `limit`,
 * otherwise to the left, and never past the left edge.
 */
export function tagLeft(dotX: number, width: number, limit: number): number {
  const right = dotX + TAG_OFFSET;
  if (right + width <= limit) return right;
  return Math.max(4, dotX - TAG_OFFSET - width);
}

interface Placed {
  label: ActivityLabel;
  x: number;
  y: number;
  textY: number;
}

/**
 * Name tags drawn over the brain, next to the structures that are changing.
 * Each has a dot on the structure, an arrow for more or less active, and the name.
 */
export function createLabelLayer(
  root: HTMLElement,
  stage: Stage,
  regions: RegionInfo[],
  /** The x position tags must end before, e.g. the edge of a panel over the brain. */
  rightLimit: () => number = () => stage.canvas.clientWidth - 8,
) {
  const byId = new Map(regions.map((r) => [r.id, r]));
  const nodes = new Map<string, { dot: HTMLElement; tag: HTMLElement; line: HTMLElement }>();
  let enabled = true;

  const nodeFor = (group: string) => {
    let node = nodes.get(group);
    if (!node) {
      node = {
        dot: el('span', { class: 'label-dot' }),
        line: el('span', { class: 'label-line' }),
        tag: el('span', { class: 'label-tag' }),
      };
      root.append(node.line, node.dot, node.tag);
      nodes.set(group, node);
    }
    return node;
  };

  return {
    setEnabled(on: boolean) {
      enabled = on;
      root.hidden = !on;
    },

    /** Call every frame with the labels to show; positions follow the camera. */
    update(labels: ActivityLabel[]) {
      if (!enabled) return;
      const placed: Placed[] = [];
      for (const label of labels) {
        // Anchor on whichever covered region is nearest the camera, so the tag sits on the visible side.
        let best: { x: number; y: number; depth: number } | null = null;
        for (const id of label.ids) {
          const region = byId.get(id);
          if (!region) continue;
          const p = stage.project(region.centroid);
          if (p.behind) continue;
          if (!best || p.depth < best.depth) best = p;
        }
        if (best) placed.push({ label, x: best.x, y: best.y, textY: best.y });
      }

      // Push tags apart vertically where they would overlap.
      placed.sort((a, b) => a.y - b.y);
      for (let i = 1; i < placed.length; i++) {
        if (placed[i].textY - placed[i - 1].textY < MIN_GAP) placed[i].textY = placed[i - 1].textY + MIN_GAP;
      }

      const shown = new Set<string>();
      const limit = rightLimit();
      for (const p of placed) {
        shown.add(p.label.group);
        const node = nodeFor(p.label.group);
        const up = p.label.v > 0;
        const direction = up ? 'up' : 'down';
        node.dot.className = `label-dot ${direction}`;
        node.tag.className = `label-tag ${direction}`;
        node.line.className = `label-line ${direction}`;
        node.tag.textContent = `${up ? '▲' : '▼'} ${p.label.name}`;
        for (const part of [node.dot, node.tag, node.line]) part.hidden = false;
        node.dot.style.transform = `translate(${p.x}px, ${p.y}px)`;
        const width = node.tag.offsetWidth;
        const tagX = tagLeft(p.x, width, limit);
        node.tag.style.transform = `translate(${tagX}px, ${p.textY}px)`;
        // The line runs to the tag's near edge, whichever side of the dot it sits on.
        const dx = (tagX >= p.x ? tagX : tagX + width) - p.x;
        const dy = p.textY - p.y;
        node.line.style.width = `${Math.hypot(dx, dy)}px`;
        node.line.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${Math.atan2(dy, dx)}rad)`;
      }
      for (const [group, node] of nodes) {
        if (!shown.has(group)) for (const part of [node.dot, node.tag, node.line]) part.hidden = true;
      }
    },
  };
}
