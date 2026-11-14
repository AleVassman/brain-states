// A full head (face, chin, neck) for decoration, fitted around the brain.
//
// The Colin27 scan the brain atlas is drawn on stops at the upper lip, so a head
// made from it has no chin or neck. This takes a separate, openly licensed head
// scan and sizes and places it so that its skull matches the Colin27 skull as
// closely as one uniform scale and a shift allow. The fit is computed, not set
// by eye, but it is still a different person's head: it is decoration only.
import { existsSync, readFileSync } from 'node:fs';
import { simplify } from './mesh.mjs';

export const FULL_HEAD_PATH = 'tools/cache/head/LeePerrySmith.glb';

/** Scene height below which the model (shoulders) is cut away. */
const CUT_BELOW = -1.78;
const TARGET_TRIANGLES = 8000;

function readGlbMesh(path) {
  const file = readFileSync(path);
  const jsonLength = file.readUInt32LE(12);
  const json = JSON.parse(file.toString('utf8', 20, 20 + jsonLength));
  const bin = file.subarray(20 + jsonLength + 8);
  const primitive = json.meshes[0].primitives[0];
  const slice = (accessorIndex, Type, perItem) => {
    const accessor = json.accessors[accessorIndex];
    const view = json.bufferViews[accessor.bufferView];
    const start = bin.byteOffset + (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0);
    const bytes = accessor.count * perItem * Type.BYTES_PER_ELEMENT;
    return new Type(bin.buffer.slice(start, start + bytes));
  };
  const positions = slice(primitive.attributes.POSITION, Float32Array, 3);
  const indexAccessor = json.accessors[primitive.indices];
  const raw = slice(primitive.indices, indexAccessor.componentType === 5125 ? Uint32Array : Uint16Array, 1);
  return { positions, indices: Uint32Array.from(raw) };
}

/**
 * Find the scale and shift (up/down, front/back) that bring the model's skull
 * closest to the reference skull: for each reference point above the eyes, the
 * distance to the nearest model point, averaged, is made as small as possible.
 */
function fitToSkull(model, reference) {
  const ref = [];
  for (let i = 0; i < reference.length; i += 3) {
    if (reference[i + 1] > 0.3) ref.push(reference[i], reference[i + 1], reference[i + 2]);
  }
  let top = -Infinity;
  for (let i = 1; i < model.length; i += 3) top = Math.max(top, model[i]);
  const skull = [];
  for (let i = 0; i < model.length; i += 3) {
    if (model[i + 1] > top - 2.6) skull.push(model[i], model[i + 1], model[i + 2]);
  }

  const cost = (s, ty, tz) => {
    let total = 0;
    for (let r = 0; r < ref.length; r += 3) {
      let best = Infinity;
      for (let m = 0; m < skull.length; m += 3) {
        const dx = skull[m] * s - ref[r];
        const dy = skull[m + 1] * s + ty - ref[r + 1];
        const dz = skull[m + 2] * s + tz - ref[r + 2];
        const d = dx * dx + dy * dy + dz * dz;
        if (d < best) best = d;
      }
      total += Math.sqrt(best);
    }
    return total / (ref.length / 3);
  };

  let best = { s: 0.48, ty: -0.9, tz: -0.25, cost: Infinity };
  // Coarse search, then a finer one around the best coarse answer.
  for (const [ds, dt, steps] of [[0.012, 0.03, 4], [0.003, 0.008, 3]]) {
    const centre = { ...best };
    for (let a = -steps; a <= steps; a++) {
      for (let b = -steps; b <= steps; b++) {
        for (let c = -steps; c <= steps; c++) {
          const s = centre.s + a * ds;
          const ty = centre.ty + b * dt;
          const tz = centre.tz + c * dt;
          const value = cost(s, ty, tz);
          if (value < best.cost) best = { s, ty, tz, cost: value };
        }
      }
    }
  }
  return best;
}

/**
 * Returns the fitted full head as { positions, indices, fit }, or null when the
 * head model has not been downloaded (the caller then falls back to Colin27).
 */
export async function fullHead(referencePositions) {
  if (!existsSync(FULL_HEAD_PATH)) return null;
  const model = readGlbMesh(FULL_HEAD_PATH);
  const fit = fitToSkull(model.positions, referencePositions);

  const positions = new Float32Array(model.positions.length);
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = model.positions[i] * fit.s;
    positions[i + 1] = model.positions[i + 1] * fit.s + fit.ty;
    positions[i + 2] = model.positions[i + 2] * fit.s + fit.tz;
  }
  const kept = [];
  for (let i = 0; i < model.indices.length; i += 3) {
    const [a, b, c] = [model.indices[i], model.indices[i + 1], model.indices[i + 2]];
    if (Math.min(positions[a * 3 + 1], positions[b * 3 + 1], positions[c * 3 + 1]) < CUT_BELOW) continue;
    kept.push(a, b, c);
  }
  const mesh = await simplify({ positions, indices: new Uint32Array(kept) }, TARGET_TRIANGLES);
  return { ...mesh, fit };
}
