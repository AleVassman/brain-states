import { existsSync, readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { RegionInfo } from '../../src/score/types';

const ATLAS_DIR = 'public/atlas';

/** Region groups the design says the episodes are expected to need. */
const REQUIRED_GROUPS = [
  'amygdala', 'hippocampus', 'hypothalamus', 'thalamus', 'nucleus-accumbens', 'insula',
  'dacc', 'sgacc', 'mpfc', 'dlpfc', 'vlpfc', 'ofc', 'pcc-precuneus', 'pag',
];
/** Structures that sit on the midline and so have one mesh, not a left/right pair. */
const MIDLINE_GROUPS = ['pag', 'brainstem'];

function regions(): RegionInfo[] {
  return JSON.parse(readFileSync(`${ATLAS_DIR}/regions.json`, 'utf8'));
}
/** Groups the decision record (tools/atlas-coverage.json) marks as not available, with the reason. */
function unavailable(): Record<string, string> {
  return JSON.parse(readFileSync('tools/atlas-coverage.json', 'utf8')).unavailable;
}
function glbNodeNames(path: string): string[] {
  const buf = readFileSync(path);
  expect(buf.toString('ascii', 0, 4)).toBe('glTF');
  const jsonLength = buf.readUInt32LE(12);
  const json = JSON.parse(buf.toString('utf8', 20, 20 + jsonLength));
  return json.nodes.map((n: { name: string }) => n.name);
}

describe('atlas files', () => {
  it('has a regions.json whose entries all have the RegionInfo fields', () => {
    const list = regions();
    expect(list.length).toBeGreaterThan(0);
    for (const r of list) {
      expect(typeof r.id).toBe('string');
      expect(typeof r.group).toBe('string');
      expect(typeof r.name).toBe('string');
      expect(['l', 'r', 'mid']).toContain(r.hemisphere);
      expect(r.centroid).toHaveLength(3);
      expect(r.centroid.every((n) => Number.isFinite(n))).toBe(true);
      expect(['mesh', 'marker']).toContain(r.kind);
      expect(typeof r.approximate).toBe('boolean');
      expect(typeof r.source).toBe('string');
      expect(r.source.length).toBeGreaterThan(0);
    }
  });

  it('includes every required group, or records why it is unavailable', () => {
    const groups = new Set(regions().map((r) => r.group));
    const missing = unavailable();
    for (const g of REQUIRED_GROUPS) {
      if (groups.has(g)) continue;
      expect(missing[g], `group "${g}" is absent and has no recorded reason`).toBeTruthy();
    }
  });

  it('has both hemispheres for every paired structure', () => {
    const list = regions();
    const groups = new Set(list.map((r) => r.group));
    for (const g of groups) {
      if (MIDLINE_GROUPS.includes(g) || g === 'context') continue;
      const ids = list.filter((r) => r.group === g).map((r) => r.id);
      expect(ids, `group ${g}`).toContain(`${g}-l`);
      expect(ids, `group ${g}`).toContain(`${g}-r`);
    }
  });

  it('puts left structures on the +X side of the scene and right structures on -X', () => {
    for (const r of regions()) {
      if (r.hemisphere === 'l') expect(r.centroid[0], r.id).toBeGreaterThan(0);
      if (r.hemisphere === 'r') expect(r.centroid[0], r.id).toBeLessThan(0);
    }
  });

  it('flags markers as approximate with a radius, and meshes as exact', () => {
    for (const r of regions()) {
      if (r.kind === 'marker') {
        expect(r.approximate).toBe(true);
        expect(typeof r.radius).toBe('number');
      } else {
        expect(r.approximate).toBe(false);
      }
    }
  });

  it('has unique ids', () => {
    const ids = regions().map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has exactly one brain.glb node per mesh region', () => {
    const meshIds = regions().filter((r) => r.kind === 'mesh').map((r) => r.id).sort();
    expect(glbNodeNames(`${ATLAS_DIR}/brain.glb`).sort()).toEqual(meshIds);
  });

  it('keeps brain.glb under 15 MB', () => {
    expect(statSync(`${ATLAS_DIR}/brain.glb`).size).toBeLessThan(15 * 1024 * 1024);
  });

  it('has a head mesh', () => {
    expect(existsSync(`${ATLAS_DIR}/head.glb`)).toBe(true);
    expect(glbNodeNames(`${ATLAS_DIR}/head.glb`)).toEqual(['head']);
  });
});
