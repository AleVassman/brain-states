import { describe, expect, it } from 'vitest';
import { loadScore } from '../../src/score/load';
import { REGION_NAMES, validScore } from '../fixtures/validScore';

const respond = (body: string, ok = true) =>
  (async () => ({ ok, status: ok ? 200 : 404, text: async () => body })) as unknown as typeof fetch;

describe('loadScore', () => {
  it('returns the score when the file is valid', async () => {
    const r = await loadScore('test.json', REGION_NAMES, respond(JSON.stringify(validScore())));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.score.id).toBe('test');
  });

  it('reports a network failure without throwing', async () => {
    const failing = (async () => {
      throw new Error('offline');
    }) as unknown as typeof fetch;
    const r = await loadScore('test.json', REGION_NAMES, failing);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors).toHaveLength(1);
      expect(r.errors[0]).toContain('could not load');
    }
  });

  it('reports a missing file', async () => {
    const r = await loadScore('gone.json', REGION_NAMES, respond('Not found', false));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors[0]).toContain('could not load');
  });

  it('reports a web page served in place of a missing file as not found', async () => {
    const r = await loadScore('gone.json', REGION_NAMES, respond('<!doctype html><html></html>'));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors[0]).toContain('could not load');
  });

  it('reports a file that is not valid JSON', async () => {
    const r = await loadScore('test.json', REGION_NAMES, respond('{'));
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors).toHaveLength(1);
      expect(r.errors[0]).toContain('not valid JSON');
    }
  });

  it("passes on the validator's errors for an invalid score", async () => {
    const s = validScore();
    s.condition.regions[0].citations = [];
    const r = await loadScore('test.json', REGION_NAMES, respond(JSON.stringify(s)));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.join('\n')).toContain('citation');
  });
});
