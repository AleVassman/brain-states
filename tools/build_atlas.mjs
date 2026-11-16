// Builds public/atlas/{brain.glb,regions.json,head.glb} and tools/atlas-coverage.json
// from the atlas volumes in tools/cache. See tools/ATLAS.md for sources and licences.
//
//   node tools/build_atlas.mjs
//
// Scene coordinates: MNI millimetres / 100, with +Y up and +Z towards the face.
// MNI is (x right, y front, z up), so scene = (-x, z, y) / 100. The sign flip on x
// keeps the brain un-mirrored: the brain's left ends up on scene +X.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { readNifti, voxelToMm } from './lib/nifti.mjs';
import { blur, simplify, surfaceNets, toGlb } from './lib/mesh.mjs';
import { fullHead, FULL_HEAD_PATH } from './lib/head.mjs';

const CACHE = 'tools/cache';
const OUT = 'public/atlas';
const AAL = 'Automated Anatomical Labelling atlas 3 (AAL3v1, 1 mm)';
const NEUDORFER = 'Neudorfer et al. 2020 hypothalamic region atlas (MNI152b, 0.5 mm)';
const AAN = 'Harvard Ascending Arousal Network Atlas v2.0 (MNI152, 1 mm)';
const COLIN = 'Colin27 average brain (McConnell BIC, 1998)';

const GYRUS_NOTE =
  'Shown as the whole gyrus that brain atlases use to stand in for this area. The area itself is smaller and has no sharp anatomical border.';
const STRIATUM_NOTE =
  'The reward findings cited for this region are for the striatum as a whole, of which this is the lower front part.';

const BRAINSTEM_NOTE =
  'A rough outline of the whole brainstem, cut from a brain scan with a simple box. Findings shown on it are for the brainstem in general, or for small nuclei inside it that are not drawn separately.';

const range = (from, to, step = 1) => {
  const out = [];
  for (let i = from; i <= to; i += step) out.push(i);
  return out;
};

// In AAL3 odd labels are left, even are right. `labels` lists the LEFT labels;
// the right side is each label + 1.
const AAL_REGIONS = [
  { group: 'amygdala', name: 'amygdala', labels: [45], tris: 2500 },
  { group: 'hippocampus', name: 'hippocampus', labels: [41], tris: 3000 },
  { group: 'thalamus', name: 'thalamus', labels: range(121, 149, 2), tris: 3000 },
  { group: 'nucleus-accumbens', note: STRIATUM_NOTE, name: 'nucleus accumbens', labels: [157], tris: 1200 },
  { group: 'insula', name: 'insula', labels: [33], tris: 4000 },
  { group: 'sgacc', name: 'subgenual anterior cingulate', labels: [151], tris: 1500 },
  { group: 'pgacc', name: 'pregenual anterior cingulate', labels: [153], tris: 2000 },
  { group: 'dacc', note: GYRUS_NOTE, name: 'dorsal anterior cingulate (supracallosal)', labels: [155], tris: 2500 },
  { group: 'mpfc', note: GYRUS_NOTE, name: 'medial prefrontal cortex (medial superior frontal gyrus)', labels: [19], tris: 5000 },
  { group: 'vmpfc', note: GYRUS_NOTE, name: 'ventromedial prefrontal cortex (medial orbital gyrus and gyrus rectus)', labels: [21, 23], tris: 3000 },
  { group: 'dlpfc', note: GYRUS_NOTE, name: 'dorsolateral prefrontal cortex (middle frontal gyrus)', labels: [5], tris: 6000 },
  { group: 'vlpfc', note: GYRUS_NOTE, name: 'ventrolateral prefrontal cortex (inferior frontal gyrus)', labels: [7, 9, 11], tris: 6000 },
  { group: 'ofc', name: 'orbitofrontal cortex', labels: [25, 27, 29, 31], tris: 4000 },
  { group: 'pcc-precuneus', name: 'posterior cingulate and precuneus', labels: [39, 71], tris: 6000 },
  { group: 'vta', name: 'ventral tegmental area', labels: [159], tris: 600 },
  { group: 'caudate', name: 'caudate nucleus (dorsal striatum)', labels: [75], tris: 2500 },
  { group: 'putamen', name: 'putamen (dorsal striatum)', labels: [77], tris: 2500 },
];

// Everything AAL3 labels as cerebral cortex (left labels), for the see-through outer brain.
const CORTEX_LEFT = [...range(1, 39, 2), 43, ...range(47, 73, 2), ...range(83, 93, 2)];
const CEREBELLUM = range(95, 120);

// Neudorfer atlas: odd labels are RIGHT, even are LEFT. Lists give the RIGHT labels.
const HYPOTHALAMUS_RIGHT = [9, 19, 21, 23, 25, 27, 29, 31, 37, 45, 47, 49, 51, 53];
const BNST_RIGHT = [33];

function toScene([x, y, z]) {
  return [-x / 100, z / 100, y / 100];
}

/**
 * Mesh of every voxel for which `inside(value, i, j, k)` is true.
 * Returns null when nothing matches.
 */
async function meshFrom(volume, inside, targetTriangles) {
  const [nx, ny] = volume.dims;
  const lo = [Infinity, Infinity, Infinity];
  const hi = [-Infinity, -Infinity, -Infinity];
  const sum = [0, 0, 0];
  let count = 0;
  for (let i = 0; i < volume.data.length; i++) {
    const x = i % nx;
    const y = Math.floor(i / nx) % ny;
    const z = Math.floor(i / (nx * ny));
    if (!inside(volume.data[i], x, y, z)) continue;
    const p = [x, y, z];
    for (let a = 0; a < 3; a++) {
      lo[a] = Math.min(lo[a], p[a]);
      hi[a] = Math.max(hi[a], p[a]);
      sum[a] += p[a];
    }
    count++;
  }
  if (count === 0) return null;

  const pad = 4;
  const dims = [0, 1, 2].map((a) => hi[a] - lo[a] + 1 + pad * 2);
  let grid = new Float32Array(dims[0] * dims[1] * dims[2]);
  for (let z = lo[2]; z <= hi[2]; z++) {
    for (let y = lo[1]; y <= hi[1]; y++) {
      for (let x = lo[0]; x <= hi[0]; x++) {
        if (!inside(volume.data[x + nx * (y + ny * z)], x, y, z)) continue;
        grid[x - lo[0] + pad + dims[0] * (y - lo[1] + pad + dims[1] * (z - lo[2] + pad))] = 1;
      }
    }
  }
  grid = blur(grid, dims, 2);
  const raw = surfaceNets(grid, dims, 0.5);
  if (raw.indices.length === 0) return null;
  const mesh = await simplify(raw, targetTriangles);

  for (let p = 0; p < mesh.positions.length; p += 3) {
    const mm = voxelToMm(
      volume.affine,
      mesh.positions[p] + lo[0] - pad,
      mesh.positions[p + 1] + lo[1] - pad,
      mesh.positions[p + 2] + lo[2] - pad,
    );
    const s = toScene(mm);
    mesh.positions[p] = s[0];
    mesh.positions[p + 1] = s[1];
    mesh.positions[p + 2] = s[2];
  }
  const centroid = toScene(voxelToMm(volume.affine, sum[0] / count, sum[1] / count, sum[2] / count));
  return { ...mesh, centroid: centroid.map((n) => Math.round(n * 1e4) / 1e4), voxels: count };
}

const meshes = [];
const regions = [];
const unavailable = {};

function add(id, group, name, hemisphere, source, mesh) {
  meshes.push({ name: id, positions: mesh.positions, indices: mesh.indices });
  regions.push({ id, group, name, hemisphere, centroid: mesh.centroid, kind: 'mesh', approximate: false, source });
  console.log(`${id.padEnd(22)} ${String(mesh.voxels).padStart(8)} voxels ${String(mesh.indices.length / 3).padStart(7)} triangles`);
}
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// ---- AAL3: most regions, the outer cortex and the cerebellum -------------------------------
const aal = readNifti(`${CACHE}/aal3/AAL3/AAL3v1_1mm.nii`);
for (const r of AAL_REGIONS) {
  for (const [side, shift] of [['l', 0], ['r', 1]]) {
    const set = new Set(r.labels.map((l) => l + shift));
    const mesh = await meshFrom(aal, (v) => set.has(v), r.tris);
    if (!mesh) throw new Error(`AAL3 has no voxels for ${r.group}-${side}`);
    add(`${r.group}-${side}`, r.group, `${side === 'l' ? 'Left' : 'Right'} ${r.name}`, side, AAL, mesh);
    if (r.note) regions[regions.length - 1].extentNote = r.note;
  }
}
for (const [side, shift] of [['l', 0], ['r', 1]]) {
  const set = new Set(CORTEX_LEFT.map((l) => l + shift));
  const mesh = await meshFrom(aal, (v) => set.has(v), 70000);
  add(`cortex-${side}`, 'cortex', `${side === 'l' ? 'Left' : 'Right'} cerebral cortex`, side, AAL, mesh);
}
{
  const set = new Set(CEREBELLUM);
  const mesh = await meshFrom(aal, (v) => set.has(v), 16000);
  add('cerebellum', 'context', 'Cerebellum', 'mid', AAL, mesh);
}

// ---- Brainstem outline, for context only -----------------------------------------------------
// Colin27 brain mask, restricted to the brainstem's bounding box in MNI space and to voxels
// AAL3 leaves unlabelled. It is a see-through outline, never a target for a score.
{
  const mask = readNifti(`${CACHE}/colin27/colin27_t1_tal_lin_mask.nii`);
  const [nx, ny] = aal.dims;
  const inside = (v, x, y, z) => {
    if (v < 0.5) return false;
    const [mx, my, mz] = voxelToMm(mask.affine, x, y, z);
    if (Math.abs(mx) > 14 || my < -50 || my > -10 || mz < -62 || mz > -8) return false;
    const label = aal.data[x + nx * (y + ny * z)];
    return label === 0 || label >= 159;
  };
  const mesh = await meshFrom(mask, inside, 5000);
  add('brainstem-mid', 'brainstem', 'Brainstem (rough outline)', 'mid', COLIN, mesh);
  regions[regions.length - 1].extentNote = BRAINSTEM_NOTE;
}

// ---- Hypothalamus and BNST ---------------------------------------------------------------------
{
  const hyp = readNifti(`${CACHE}/hypothalamus/MNI152b_atlas_labels_0.5mm.nii.gz`);
  for (const [group, name, right, tris] of [
    ['hypothalamus', 'hypothalamus', HYPOTHALAMUS_RIGHT, 2000],
    ['bnst', 'bed nucleus of the stria terminalis', BNST_RIGHT, 500],
  ]) {
    for (const [side, shift] of [['r', 0], ['l', 1]]) {
      const set = new Set(right.map((l) => l + shift));
      const mesh = await meshFrom(hyp, (v) => set.has(Math.round(v)), tris);
      if (!mesh) throw new Error(`hypothalamus atlas has no voxels for ${group}-${side}`);
      add(`${group}-${side}`, group, `${side === 'l' ? 'Left' : 'Right'} ${name}`, side, NEUDORFER, mesh);
    }
  }
}

// ---- Periaqueductal grey -------------------------------------------------------------------------
{
  const path = `${CACHE}/aan/AAN_PAG_MNI152_1mm_v2p0.nii`;
  let pag = null;
  if (existsSync(path)) {
    const head = readFileSync(path).subarray(0, 4);
    const looksLikeNifti = head.readInt32LE(0) === 348 || head.readInt32BE(0) === 348 || (head[0] === 0x1f && head[1] === 0x8b);
    if (looksLikeNifti) pag = readNifti(path);
  }
  if (pag) {
    const mesh = await meshFrom(pag, (v) => v > 0.5, 800);
    add('pag-mid', 'pag', 'Periaqueductal grey', 'mid', AAN, mesh);
  } else {
    unavailable.pag =
      'Source chosen (Harvard AAN atlas v2.0, CC0) but its host blocks automated downloads. ' +
      `Download AAN_PAG_MNI152_1mm_v2p0.nii by hand into ${CACHE}/aan/ and re-run this script.`;
    console.log('pag: NOT BUILT - ' + unavailable.pag);
  }
}

// ---- Head (decoration) ---------------------------------------------------------------------------
const headMask = readNifti(`${CACHE}/colin27/colin27_t1_tal_lin_headmask.nii`);
const head = await meshFrom(headMask, (v) => v > 0.5, 6000);
// Colin27 stops at the upper lip. Where the full head scan has been downloaded, use it instead,
// fitted to the Colin27 skull, so the face, chin and neck are there.
const full = await fullHead(head.positions);
const headMesh = full ?? head;
if (full) {
  console.log(
    `head: full head scan, fitted to the Colin27 skull (scale ${full.fit.s.toFixed(3)}, up ${full.fit.ty.toFixed(3)}, ` +
      `forward ${full.fit.tz.toFixed(3)}, mean gap ${(full.fit.cost * 100).toFixed(1)} mm), ${full.indices.length / 3} triangles`,
  );
} else {
  console.log(`head: Colin27 outline only (${FULL_HEAD_PATH} not found), ${head.indices.length / 3} triangles`);
}

mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}/brain.glb`, toGlb(meshes));
writeFileSync(`${OUT}/head.glb`, toGlb([{ name: 'head', positions: headMesh.positions, indices: headMesh.indices }]));
writeFileSync(`${OUT}/regions.json`, JSON.stringify(regions.map((r) => ({ ...r, name: cap(r.name) })), null, 1) + '\n');
writeFileSync('tools/atlas-coverage.json', JSON.stringify({ unavailable }, null, 2) + '\n');

const triangles = meshes.reduce((n, m) => n + m.indices.length / 3, 0);
console.log(`\n${meshes.length} meshes, ${triangles} triangles -> ${OUT}/brain.glb`);
