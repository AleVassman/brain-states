import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { RegionInfo, Score } from '../../src/score/types';

const regions: RegionInfo[] = JSON.parse(readFileSync('public/atlas/regions.json', 'utf8'));
const glb = readFileSync('public/atlas/brain.glb');
const gltf = JSON.parse(glb.subarray(20, 20 + glb.readUInt32LE(12)).toString('utf8'));
const meshNodes = new Set<string>((gltf.nodes ?? []).map((n: { name?: string }) => n.name));
const drawable = (r: RegionInfo) => r.kind === 'marker' || meshNodes.has(r.id);
const index: { id: string; file: string }[] = JSON.parse(readFileSync('public/scores/index.json', 'utf8'));

describe('everything an episode lights up can be drawn', () => {
  it('every mesh region in the atlas list has a mesh in brain.glb', () => {
    expect(regions.filter((r) => !drawable(r)).map((r) => r.id)).toEqual([]);
  });

  it.each(index)('$id: every region track and connection end lights a drawable region', ({ file }) => {
    const score: Score = JSON.parse(readFileSync(`public/scores/${file}`, 'utf8'));
    const names = new Set<string>();
    for (const variant of [score.condition, score.typical]) {
      if (!variant) continue;
      for (const t of variant.regions) names.add(t.region);
      for (const c of variant.connections) names.add(c.from).add(c.to);
    }
    const undrawable = [...names].filter((n) => !regions.some((r) => (r.id === n || r.group === n) && drawable(r)));
    expect(undrawable).toEqual([]);
  });
});
