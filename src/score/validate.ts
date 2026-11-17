import type { Score } from './types';

export type ValidationResult = { ok: true; score: Score } | { ok: false; errors: string[] };

type Obj = Record<string, unknown>;

const CONFIDENCES = ['established', 'mixed', 'debated'];
const CITATION_KINDS = ['meta-analysis', 'review', 'study'];
const CITATION_ACCESS = ['full-text', 'abstract-only'];
const EPSILON = 1e-9;

function isObj(x: unknown): x is Obj {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}
function isText(x: unknown): x is string {
  return typeof x === 'string' && x.trim().length > 0;
}
function isNum(x: unknown): x is number {
  return typeof x === 'number' && Number.isFinite(x);
}

/**
 * Checks a parsed score file. `regionNames` holds every region id and group a
 * track may refer to. Collects every problem instead of stopping at the first,
 * and never throws.
 */
export function validateScore(raw: unknown, regionNames: Set<string>): ValidationResult {
  const errors: string[] = [];
  const err = (path: string, message: string) => errors.push(`${path}: ${message}`);

  if (!isObj(raw)) {
    return { ok: false, errors: ['score: not an object'] };
  }

  for (const key of ['id', 'title', 'description', 'caveat']) {
    if (!isText(raw[key])) err(key, 'missing text');
  }
  if (!isNum(raw.durationSeconds) || raw.durationSeconds <= 0) {
    err('durationSeconds', 'must be a positive number');
  }

  const hasTypical = raw.typical !== null && raw.typical !== undefined;

  const checkCitations = (path: string, value: unknown) => {
    if (!Array.isArray(value) || value.length === 0) {
      err(path, 'missing citation');
      return;
    }
    value.forEach((c, i) => {
      const p = `${path}.citations[${i}]`;
      if (!isObj(c)) {
        err(p, 'citation is not an object');
        return;
      }
      const missing = ['authors', 'title', 'quote'].filter((k) => !isText(c[k]));
      if (!isText(c.doi) && !isText(c.pmid)) missing.push('doi or pmid');
      if (missing.length > 0) err(p, `citation is missing ${missing.join(', ')}`);
      if (!isNum(c.year)) err(p, 'citation is missing year');
      if (!CITATION_KINDS.includes(c.kind as string)) err(p, 'citation has an unknown kind');
      if (!CITATION_ACCESS.includes(c.access as string)) err(p, 'citation has an unknown access');
    });
  };

  const checkKeyframes = (path: string, value: unknown) => {
    if (!Array.isArray(value) || value.length === 0) {
      err(path, 'needs at least one keyframe');
      return;
    }
    let previous = -Infinity;
    let rangeReported = false;
    let orderReported = false;
    for (const k of value) {
      if (!isObj(k) || !isNum(k.t) || !isNum(k.v)) {
        err(path, 'keyframe needs numeric t and v');
        return;
      }
      if (!rangeReported && (k.t < 0 || k.t > 1 || k.v < -1 || k.v > 1)) {
        err(path, 'keyframe out of range (t must be 0..1, v must be -1..1)');
        rangeReported = true;
      }
      if (!orderReported && k.t < previous) {
        err(path, 'keyframes are not in time order');
        orderReported = true;
      }
      previous = k.t;
    }
  };

  const checkTrack = (path: string, track: unknown, regionKeys: string[]) => {
    if (!isObj(track)) {
      err(path, 'track is not an object');
      return;
    }
    for (const key of regionKeys) {
      const name = track[key];
      if (!isText(name) || !regionNames.has(name)) {
        err(path, `unknown region "${String(name)}" in ${key}`);
      }
    }
    if (!isText(track.explanation)) err(path, 'missing explanation');
    if (!CONFIDENCES.includes(track.confidence as string)) {
      err(path, `unknown confidence "${String(track.confidence)}"`);
    }
    checkCitations(path, track.citations);
    checkKeyframes(path, track.keyframes);
  };

  const checkVariant = (path: string, variant: unknown) => {
    if (!isObj(variant)) {
      err(path, 'variant is not an object');
      return;
    }
    if (!Array.isArray(variant.regions)) {
      err(`${path}.regions`, 'must be a list');
    } else {
      variant.regions.forEach((t, i) => checkTrack(`${path}.regions[${i}]`, t, ['region']));
    }
    if (!Array.isArray(variant.connections)) {
      err(`${path}.connections`, 'must be a list');
    } else {
      variant.connections.forEach((t, i) => checkTrack(`${path}.connections[${i}]`, t, ['from', 'to']));
    }
  };

  const checkPhases = (value: unknown) => {
    if (!Array.isArray(value) || value.length === 0) {
      err('phases', 'needs at least one phase');
      return;
    }
    let expectedStart = 0;
    let spanBroken = false;
    value.forEach((phase, i) => {
      const p = `phases[${i}]`;
      if (!isObj(phase)) {
        err(p, 'phase is not an object');
        spanBroken = true;
        return;
      }
      for (const key of ['id', 'name', 'timescale', 'caption']) {
        if (!isText(phase[key])) err(p, `missing ${key}`);
      }
      if (hasTypical && !isText(phase.typicalCaption)) {
        err(p, 'missing typicalCaption (required when a typical variant exists)');
      }
      if (!isNum(phase.start) || !isNum(phase.end) || phase.end <= phase.start) {
        err(p, 'phase needs start < end');
        spanBroken = true;
      } else {
        if (Math.abs(phase.start - expectedStart) > EPSILON) {
          err(p, `phase must start at ${expectedStart} (no gaps or overlaps)`);
        }
        expectedStart = phase.end;
      }
      if (i > 0) {
        const order = phase.order;
        if (!isObj(order)) {
          err(p, 'missing order (timed or reconstructed)');
        } else if (order.kind === 'timed') {
          checkCitations(`${p}.order`, order.citations);
        } else if (order.kind === 'reconstructed') {
          if (!isText(order.rationale)) err(`${p}.order`, 'reconstructed order needs a rationale');
        } else {
          err(p, 'order kind must be timed or reconstructed');
        }
      }
    });
    if (!spanBroken && Math.abs(expectedStart - 1) > EPSILON) {
      err('phases', 'the last phase must end at 1');
    }
  };

  checkPhases(raw.phases);
  checkVariant('condition', raw.condition);
  if (hasTypical) checkVariant('typical', raw.typical);

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, score: raw as unknown as Score };
}
