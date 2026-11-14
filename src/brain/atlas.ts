import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { RegionInfo } from '../score/types';

export interface Atlas {
  regions: RegionInfo[];
  /** Region id -> its surface mesh. Marker regions have no entry. */
  meshes: Map<string, THREE.Mesh>;
  head: THREE.Mesh | null;
}

/** Groups that are only there for context and can never be the target of a score. */
export const CONTEXT_GROUPS = ['cortex', 'context'];

/** Every name a score may use: region ids and groups, minus the context-only ones. */
export function scoreRegionNames(regions: RegionInfo[]): Set<string> {
  const names = new Set<string>();
  for (const r of regions) {
    if (CONTEXT_GROUPS.includes(r.group)) continue;
    names.add(r.id);
    names.add(r.group);
  }
  return names;
}

const base = import.meta.env?.BASE_URL ?? './';

function loadGlb(url: string): Promise<THREE.Mesh[]> {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(
      url,
      (gltf) => {
        const meshes: THREE.Mesh[] = [];
        gltf.scene.traverse((o) => {
          if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
        });
        resolve(meshes);
      },
      undefined,
      () => reject(new Error(`Could not load ${url}`)),
    );
  });
}

export async function loadAtlas(): Promise<Atlas> {
  const response = await fetch(`${base}atlas/regions.json`);
  if (!response.ok) throw new Error('Could not load the list of brain regions.');
  const regions = (await response.json()) as RegionInfo[];

  const [brain, headMeshes] = await Promise.all([
    loadGlb(`${base}atlas/brain.glb`),
    loadGlb(`${base}atlas/head.glb`).catch(() => [] as THREE.Mesh[]),
  ]);
  const meshes = new Map<string, THREE.Mesh>();
  for (const mesh of brain) {
    mesh.geometry.computeVertexNormals();
    meshes.set(mesh.name, mesh);
  }
  return { regions, meshes, head: headMeshes[0] ?? null };
}
