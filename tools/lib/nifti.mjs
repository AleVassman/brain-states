// Minimal NIfTI-1 reader: enough for label volumes and masks.
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

const TYPES = {
  2: { ctor: Uint8Array, read: 'getUint8', size: 1 },
  4: { ctor: Int16Array, read: 'getInt16', size: 2 },
  8: { ctor: Int32Array, read: 'getInt32', size: 4 },
  16: { ctor: Float32Array, read: 'getFloat32', size: 4 },
  64: { ctor: Float64Array, read: 'getFloat64', size: 8 },
  256: { ctor: Int8Array, read: 'getInt8', size: 1 },
  512: { ctor: Uint16Array, read: 'getUint16', size: 2 },
  768: { ctor: Uint32Array, read: 'getUint32', size: 4 },
};

/**
 * Returns { dims:[nx,ny,nz], data: Float32Array (scaled), affine: 4x4 row-major
 * voxel->mm, voxelSize:[dx,dy,dz] }.
 */
export function readNifti(path) {
  let buf = readFileSync(path);
  if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);

  let little = true;
  if (view.getInt32(0, true) !== 348) {
    if (view.getInt32(0, false) !== 348) throw new Error(`${path}: not a NIfTI-1 file`);
    little = false;
  }
  const dims = [view.getInt16(42, little), view.getInt16(44, little), view.getInt16(46, little)];
  const datatype = view.getInt16(70, little);
  const type = TYPES[datatype];
  if (!type) throw new Error(`${path}: unsupported datatype ${datatype}`);
  const pixdim = [1, 2, 3].map((i) => view.getFloat32(76 + i * 4, little));
  const voxOffset = view.getFloat32(108, little);
  let slope = view.getFloat32(112, little);
  const inter = view.getFloat32(116, little);
  if (slope === 0 || Number.isNaN(slope)) slope = 1;
  const qformCode = view.getInt16(252, little);
  const sformCode = view.getInt16(254, little);

  let affine;
  if (sformCode > 0) {
    affine = [];
    for (let r = 0; r < 3; r++) {
      affine.push([0, 1, 2, 3].map((c) => view.getFloat32(280 + r * 16 + c * 4, little)));
    }
    affine.push([0, 0, 0, 1]);
  } else if (qformCode > 0) {
    const b = view.getFloat32(256, little);
    const c = view.getFloat32(260, little);
    const d = view.getFloat32(264, little);
    const a = Math.sqrt(Math.max(0, 1 - b * b - c * c - d * d));
    const qfac = view.getFloat32(76, little) < 0 ? -1 : 1;
    const [dx, dy, dz] = pixdim;
    const off = [view.getFloat32(268, little), view.getFloat32(272, little), view.getFloat32(276, little)];
    const R = [
      [a * a + b * b - c * c - d * d, 2 * (b * c - a * d), 2 * (b * d + a * c)],
      [2 * (b * c + a * d), a * a + c * c - b * b - d * d, 2 * (c * d - a * b)],
      [2 * (b * d - a * c), 2 * (c * d + a * b), a * a + d * d - b * b - c * c],
    ];
    affine = R.map((row, r) => [row[0] * dx, row[1] * dy, row[2] * dz * qfac, off[r]]);
    affine.push([0, 0, 0, 1]);
  } else {
    throw new Error(`${path}: no sform or qform; cannot place the volume in space`);
  }

  const n = dims[0] * dims[1] * dims[2];
  const data = new Float32Array(n);
  let p = Math.round(voxOffset);
  for (let i = 0; i < n; i++, p += type.size) {
    data[i] = view[type.read](p, little) * slope + inter;
  }
  return { dims, data, affine, voxelSize: pixdim };
}

/** Voxel index (i,j,k) -> mm. */
export function voxelToMm(affine, i, j, k) {
  return [
    affine[0][0] * i + affine[0][1] * j + affine[0][2] * k + affine[0][3],
    affine[1][0] * i + affine[1][1] * j + affine[1][2] * k + affine[1][3],
    affine[2][0] * i + affine[2][1] * j + affine[2][2] * k + affine[2][3],
  ];
}
