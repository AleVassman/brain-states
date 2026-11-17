import { describe, expect, it } from 'vitest';
import type { Frame, RegionInfo } from '../../src/score/types';
import { activityLabels } from '../../src/ui/activityLabels';

const region = (id: string, group: string, name: string, hemisphere: 'l' | 'r' | 'mid'): RegionInfo => ({
  id, group, name, hemisphere, centroid: [0, 0, 0], kind: 'mesh', approximate: false, source: 'test',
});

const REGIONS: RegionInfo[] = [
  region('amygdala-l', 'amygdala', 'Left amygdala', 'l'),
  region('amygdala-r', 'amygdala', 'Right amygdala', 'r'),
  region('dlpfc-l', 'dlpfc', 'Left dorsolateral prefrontal cortex (middle frontal gyrus)', 'l'),
  region('dlpfc-r', 'dlpfc', 'Right dorsolateral prefrontal cortex (middle frontal gyrus)', 'r'),
  region('insula-l', 'insula', 'Left insula', 'l'),
  region('insula-r', 'insula', 'Right insula', 'r'),
  region('cortex-l', 'cortex', 'Left cerebral cortex', 'l'),
  region('brainstem-mid', 'brainstem', 'Brainstem (rough outline)', 'mid'),
];

function frame(values: Record<string, number>): Frame {
  const regions = new Map<string, number>();
  for (const r of REGIONS) regions.set(r.id, values[r.id] ?? 0);
  return { t: 0.5, phase: { id: 'p', name: 'P', timescale: '', start: 0, end: 1, caption: '' }, variant: 'condition', regions, connections: [] };
}

describe('activityLabels', () => {
  it('gives one label per structure when both sides change, without left or right', () => {
    const labels = activityLabels(frame({ 'amygdala-l': 0.8, 'amygdala-r': 0.8 }), REGIONS);
    expect(labels).toHaveLength(1);
    expect(labels[0].name).toBe('Amygdala');
    expect(labels[0].v).toBe(0.8);
    expect(labels[0].ids).toEqual(['amygdala-l', 'amygdala-r']);
  });

  it('names the side when only one side changes', () => {
    const labels = activityLabels(frame({ 'insula-r': -0.5 }), REGIONS);
    expect(labels).toHaveLength(1);
    expect(labels[0].name).toBe('Right insula');
    expect(labels[0].v).toBe(-0.5);
    expect(labels[0].ids).toEqual(['insula-r']);
  });

  it('drops the gyrus detail in brackets to keep labels short', () => {
    const labels = activityLabels(frame({ 'dlpfc-l': -0.6, 'dlpfc-r': -0.6 }), REGIONS);
    expect(labels[0].name).toBe('Dorsolateral prefrontal cortex');
  });

  it('leaves out regions that are at or near baseline', () => {
    expect(activityLabels(frame({ 'amygdala-l': 0.1, 'amygdala-r': 0.05 }), REGIONS)).toEqual([]);
  });

  it('puts the strongest changes first, whether up or down', () => {
    const labels = activityLabels(frame({ 'amygdala-l': 0.4, 'amygdala-r': 0.4, 'dlpfc-l': -0.9, 'dlpfc-r': -0.9, 'insula-l': 0.6, 'insula-r': 0.6 }), REGIONS);
    expect(labels.map((l) => l.group)).toEqual(['dlpfc', 'insula', 'amygdala']);
  });

  it('keeps at most the requested number of labels', () => {
    const labels = activityLabels(frame({ 'amygdala-l': 0.4, 'dlpfc-l': -0.9, 'insula-l': 0.6, 'brainstem-mid': 0.7 }), REGIONS, 2);
    expect(labels.map((l) => l.group)).toEqual(['dlpfc', 'brainstem']);
  });

  it('never labels the context-only outlines', () => {
    expect(activityLabels(frame({ 'cortex-l': 1 }), REGIONS)).toEqual([]);
  });

  it('returns nothing when no state is playing', () => {
    expect(activityLabels(null, REGIONS)).toEqual([]);
  });
});
