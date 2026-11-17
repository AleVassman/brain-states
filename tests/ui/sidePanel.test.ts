import { describe, expect, it } from 'vitest';
import { regionPanelContent } from '../../src/ui/panelContent';
import type { RegionInfo } from '../../src/score/types';
import { citation, REGIONS, validScore } from '../fixtures/validScore';

const amygdalaL = REGIONS[0];
const mpfc = REGIONS[2];

describe('regionPanelContent', () => {
  it("shows the track's explanation, confidence and sources for a region in the score", () => {
    const c = regionPanelContent(amygdalaL, validScore(), 'condition');
    expect(c.title).toBe('Left amygdala');
    expect(c.body).toBe('Flags the event as important.');
    expect(c.confidence).toBe('established');
    expect(c.citations).toHaveLength(1);
    expect(c.citations[0].doi).toBe('10.1000/test.1');
  });

  it('uses the typical variant when that is what is playing', () => {
    const c = regionPanelContent(amygdalaL, validScore(), 'typical');
    expect(c.body).toBe('Responds briefly.');
  });

  it('says so when the region is not part of the state, instead of showing an empty panel', () => {
    const s = validScore();
    s.condition.connections = [];
    const c = regionPanelContent(mpfc, s, 'condition');
    expect(c.title).toBe('Medial prefrontal cortex');
    expect(c.body).toBe("Not part of this state's documented pattern.");
    expect(c.confidence).toBeNull();
    expect(c.citations).toEqual([]);
  });

  it('treats a region as not part of the typical response when the score has none', () => {
    const s = validScore();
    s.typical = null;
    const c = regionPanelContent(amygdalaL, s, 'typical');
    expect(c.body).toBe("Not part of this state's documented pattern.");
  });

  it('prompts to pick a state when none is loaded', () => {
    const c = regionPanelContent(amygdalaL, null, 'condition');
    expect(c.body).toBe('Pick a state to see what this region does in it.');
    expect(c.confidence).toBeNull();
  });

  it('flags a marker region as an approximate location', () => {
    const marker: RegionInfo = {
      id: 'pag-mid', group: 'pag', name: 'Periaqueductal grey', hemisphere: 'mid',
      centroid: [0, 0, 0], kind: 'marker', approximate: true, radius: 0.03, source: 'test',
    };
    expect(regionPanelContent(marker, validScore(), 'condition').approximate).toBe(true);
    expect(regionPanelContent(amygdalaL, validScore(), 'condition').approximate).toBe(false);
  });

  it('prefers a track on the region itself over a track on its group', () => {
    const s = validScore();
    s.condition.regions.unshift({
      region: 'amygdala-l', explanation: 'Left side only.', confidence: 'debated',
      citations: [citation()], keyframes: [{ t: 0, v: 0.5 }],
    });
    expect(regionPanelContent(amygdalaL, s, 'condition').body).toBe('Left side only.');
    expect(regionPanelContent(REGIONS[1], s, 'condition').body).toBe('Flags the event as important.');
  });

  it('names where the geometry comes from', () => {
    expect(regionPanelContent(amygdalaL, validScore(), 'condition').source).toBe('test');
  });
});

describe('connections in the side panel', () => {
  it('lists the connections that end at a region, by region id or group', async () => {
    const { connectionsTouching } = await import('../../src/ui/panelContent');
    const touching = connectionsTouching(mpfc, validScore(), 'condition');
    expect(touching).toHaveLength(1);
    expect(touching[0].explanation).toBe('Regulation weakens.');
    expect(connectionsTouching(amygdalaL, validScore(), 'condition')).toHaveLength(1);
  });

  it('lists none for the typical variant when it has no connections', async () => {
    const { connectionsTouching } = await import('../../src/ui/panelContent');
    expect(connectionsTouching(mpfc, validScore(), 'typical')).toEqual([]);
  });

  it('does not call a region "not part of the pattern" when a drawn connection ends at it', () => {
    const c = regionPanelContent(mpfc, validScore(), 'condition');
    expect(c.body).toBe('No change in activity is documented for this region in this state, but a connection shown here ends at it.');
  });

  it('names a connection end by its structure, without left or right', async () => {
    const { regionLabel } = await import('../../src/ui/panelContent');
    expect(regionLabel('amygdala', REGIONS)).toBe('Amygdala');
    expect(regionLabel('amygdala-r', REGIONS)).toBe('Right amygdala');
    expect(regionLabel('nowhere', REGIONS)).toBe('nowhere');
  });

  it('passes on a note about a region drawn larger than the area it stands for', () => {
    const standIn: RegionInfo = { ...mpfc, extentNote: 'Shown as the whole gyrus.' };
    expect(regionPanelContent(standIn, validScore(), 'condition').extentNote).toBe('Shown as the whole gyrus.');
    expect(regionPanelContent(amygdalaL, validScore(), 'condition').extentNote).toBeNull();
  });
});

describe('citation links', () => {
  it('links to the DOI when there is one, and to PubMed otherwise', async () => {
    const { citationHref } = await import('../../src/ui/panelContent');
    expect(citationHref({ ...citation(), doi: '10.1000/x', pmid: '1' })).toBe('https://doi.org/10.1000/x');
    expect(citationHref({ ...citation(), doi: '', pmid: '18787662' })).toBe('https://pubmed.ncbi.nlm.nih.gov/18787662/');
  });
});

describe('citation links with an unusual doi', () => {
  it('treats a doi of only spaces as missing and links to PubMed', async () => {
    const { citationHref } = await import('../../src/ui/panelContent');
    expect(citationHref({ ...citation(), doi: '  ', pmid: '18787662' })).toBe('https://pubmed.ncbi.nlm.nih.gov/18787662/');
  });
});
