// Turning a 3D mask into a triangle mesh, and writing meshes to a .glb file.
import { MeshoptSimplifier } from 'meshoptimizer';

/** Blur a scalar grid in place-ish with a small separable kernel, `passes` times per axis. */
export function blur(grid, dims, passes = 2) {
  const [nx, ny, nz] = dims;
  let src = grid;
  let dst = new Float32Array(grid.length);
  const strides = [1, nx, nx * ny];
  const sizes = [nx, ny, nz];
  for (let pass = 0; pass < passes; pass++) {
    for (let axis = 0; axis < 3; axis++) {
      const s = strides[axis];
      const n = sizes[axis];
      for (let z = 0; z < nz; z++) {
        for (let y = 0; y < ny; y++) {
          for (let x = 0; x < nx; x++) {
            const i = x + nx * (y + ny * z);
            const p = axis === 0 ? x : axis === 1 ? y : z;
            const a = p > 0 ? src[i - s] : src[i];
            const b = p < n - 1 ? src[i + s] : src[i];
            dst[i] = 0.25 * a + 0.5 * src[i] + 0.25 * b;
          }
        }
      }
      [src, dst] = [dst, src];
    }
  }
  return src;
}

/**
 * Naive surface nets: one vertex per grid cell the surface passes through,
 * joined into quads across every grid edge that crosses the surface.
 * Returns positions in grid coordinates and triangle indices.
 */
export function surfaceNets(grid, dims, iso = 0.5) {
  const [nx, ny, nz] = dims;
  const cx = nx - 1;
  const cy = ny - 1;
  const cz = nz - 1;
  const cellVertex = new Int32Array(cx * cy * cz).fill(-1);
  const positions = [];
  const at = (x, y, z) => grid[x + nx * (y + ny * z)];

  const corner = new Float32Array(8);
  for (let z = 0; z < cz; z++) {
    for (let y = 0; y < cy; y++) {
      for (let x = 0; x < cx; x++) {
        let mask = 0;
        for (let c = 0; c < 8; c++) {
          const v = at(x + (c & 1), y + ((c >> 1) & 1), z + ((c >> 2) & 1));
          corner[c] = v;
          if (v >= iso) mask |= 1 << c;
        }
        if (mask === 0 || mask === 255) continue;
        let sx = 0, sy = 0, sz = 0, count = 0;
        for (let c = 0; c < 8; c++) {
          for (let axis = 0; axis < 3; axis++) {
            const bit = 1 << axis;
            if (c & bit) continue;
            const d = c | bit;
            const a = corner[c];
            const b = corner[d];
            if ((a >= iso) === (b >= iso)) continue;
            const t = (iso - a) / (b - a);
            sx += (c & 1) + (axis === 0 ? t : 0);
            sy += ((c >> 1) & 1) + (axis === 1 ? t : 0);
            sz += ((c >> 2) & 1) + (axis === 2 ? t : 0);
            count++;
          }
        }
        cellVertex[x + cx * (y + cy * z)] = positions.length / 3;
        positions.push(x + sx / count, y + sy / count, z + sz / count);
      }
    }
  }

  const indices = [];
  const cell = (x, y, z) => cellVertex[x + cx * (y + cy * z)];
  for (let z = 0; z < nz; z++) {
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const here = at(x, y, z) >= iso;
        // Edge along +x
        if (x < nx - 1 && y > 0 && z > 0 && y < ny - 1 && z < nz - 1 && here !== at(x + 1, y, z) >= iso) {
          quad(indices, cell(x, y, z), cell(x, y - 1, z), cell(x, y - 1, z - 1), cell(x, y, z - 1), here);
        }
        // Edge along +y
        if (y < ny - 1 && x > 0 && z > 0 && x < nx - 1 && z < nz - 1 && here !== at(x, y + 1, z) >= iso) {
          quad(indices, cell(x, y, z), cell(x, y, z - 1), cell(x - 1, y, z - 1), cell(x - 1, y, z), here);
        }
        // Edge along +z
        if (z < nz - 1 && x > 0 && y > 0 && x < nx - 1 && y < ny - 1 && here !== at(x, y, z + 1) >= iso) {
          quad(indices, cell(x, y, z), cell(x - 1, y, z), cell(x - 1, y - 1, z), cell(x, y - 1, z), here);
        }
      }
    }
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
}

function quad(out, a, b, c, d, flip) {
  if (a < 0 || b < 0 || c < 0 || d < 0) return;
  if (flip) out.push(a, b, c, a, c, d);
  else out.push(a, c, b, a, d, c);
}

/** Reduce a mesh to about `targetTriangles`, then drop vertices no triangle uses. */
export async function simplify(mesh, targetTriangles) {
  await MeshoptSimplifier.ready;
  let indices = mesh.indices;
  if (indices.length / 3 > targetTriangles) {
    const [reduced] = MeshoptSimplifier.simplify(indices, mesh.positions, 3, targetTriangles * 3, 0.02, []);
    indices = reduced;
  }
  const remap = new Int32Array(mesh.positions.length / 3).fill(-1);
  const positions = [];
  const out = new Uint32Array(indices.length);
  for (let i = 0; i < indices.length; i++) {
    const v = indices[i];
    if (remap[v] < 0) {
      remap[v] = positions.length / 3;
      positions.push(mesh.positions[v * 3], mesh.positions[v * 3 + 1], mesh.positions[v * 3 + 2]);
    }
    out[i] = remap[v];
  }
  return { positions: new Float32Array(positions), indices: out };
}

/** Write named meshes ({ name, positions, indices }) as one binary glTF file. */
export function toGlb(meshes) {
  const chunks = [];
  let offset = 0;
  const push = (typed) => {
    const bytes = Buffer.from(typed.buffer, typed.byteOffset, typed.byteLength);
    const view = { byteOffset: offset, byteLength: bytes.length };
    chunks.push(bytes);
    offset += bytes.length;
    const pad = (4 - (offset % 4)) % 4;
    if (pad) {
      chunks.push(Buffer.alloc(pad));
      offset += pad;
    }
    return view;
  };

  const json = {
    asset: { version: '2.0', generator: 'brain-states build_atlas' },
    scene: 0,
    scenes: [{ nodes: meshes.map((_, i) => i) }],
    nodes: [],
    meshes: [],
    accessors: [],
    bufferViews: [],
    buffers: [],
  };

  meshes.forEach((m, i) => {
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let p = 0; p < m.positions.length; p += 3) {
      for (let a = 0; a < 3; a++) {
        min[a] = Math.min(min[a], m.positions[p + a]);
        max[a] = Math.max(max[a], m.positions[p + a]);
      }
    }
    const posView = push(m.positions);
    const idxView = push(m.indices);
    json.bufferViews.push({ buffer: 0, ...posView, target: 34962 }, { buffer: 0, ...idxView, target: 34963 });
    json.accessors.push(
      { bufferView: i * 2, componentType: 5126, count: m.positions.length / 3, type: 'VEC3', min, max },
      { bufferView: i * 2 + 1, componentType: 5125, count: m.indices.length, type: 'SCALAR' },
    );
    json.meshes.push({ primitives: [{ attributes: { POSITION: i * 2 }, indices: i * 2 + 1 }] });
    json.nodes.push({ name: m.name, mesh: i });
  });

  const bin = Buffer.concat(chunks);
  json.buffers.push({ byteLength: bin.length });
  let jsonBytes = Buffer.from(JSON.stringify(json), 'utf8');
  const jsonPad = (4 - (jsonBytes.length % 4)) % 4;
  if (jsonPad) jsonBytes = Buffer.concat([jsonBytes, Buffer.alloc(jsonPad, 0x20)]);

  const header = Buffer.alloc(12);
  header.write('glTF', 0, 'ascii');
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonBytes.length + 8 + bin.length, 8);
  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(jsonBytes.length, 0);
  jsonHeader.write('JSON', 4, 'ascii');
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(bin.length, 0);
  binHeader.write('BIN\0', 4, 'ascii');
  return Buffer.concat([header, jsonHeader, jsonBytes, binHeader, bin]);
}
