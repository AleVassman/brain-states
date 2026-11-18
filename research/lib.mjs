// Shared helpers for writing the episode scores.
//
// Each state has a file in research/ (anxiety.mjs, ...) that describes the
// episode and calls writeScore(). That produces public/scores/<id>.json and
// research/<id>-claims.md, and adds the state to public/scores/index.json.
//
// Bibliographic details live once, in sources.mjs. A citation is a source plus
// the exact sentence in it that supports the claim; tools/research/verify_quotes.mjs
// checks every quote against the saved text of the paper.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { SOURCES } from './sources.mjs';

/** Ends the caveat of every "What helps" episode. Must match src/score/treatmentNote.ts (a test checks). */
export const TREATMENT_NOTE = "These are averages across groups of people, not a picture of any one person's brain. Treatments help many people, not everyone, and in different ways. This is not medical advice: talk to a doctor or therapist about what is right for you.";

export function cite(key, quote) {
  const s = SOURCES[key];
  if (!s) throw new Error(`unknown source "${key}"`);
  return {
    authors: s.authors,
    year: s.year,
    title: s.title,
    doi: s.doi ?? '',
    pmid: s.pmid,
    kind: s.kind,
    access: s.pmcid ? 'full-text' : 'abstract-only',
    quote,
  };
}

/** kf(0, 0, 0.3, 1) -> [{t:0,v:0},{t:0.3,v:1}] */
export function kf(...pairs) {
  const out = [];
  for (let i = 0; i < pairs.length; i += 2) out.push({ t: pairs[i], v: pairs[i + 1] });
  return out;
}

const CONFIDENCE = { established: 'Well established', mixed: 'Mixed evidence', debated: 'Still debated' };

function describe(keyframes) {
  const values = keyframes.map((k) => k.v);
  const peak = values.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a), 0);
  const end = values[values.length - 1];
  const word = (v) => (v > 0.05 ? 'above baseline' : v < -0.05 ? 'below baseline' : 'at baseline');
  return `peaks ${word(peak)} (${peak}), ends ${word(end)} (${end})`;
}

function claimRows(lines, tracks, label) {
  for (const t of tracks) {
    const what = t.region ? `**${t.region}**` : `**${t.from} → ${t.to}** (connection)`;
    lines.push(`### ${what} — ${CONFIDENCE[t.confidence]}`, '', `${label}: ${t.explanation}`, '', `On screen: ${describe(t.keyframes)}.`, '');
    for (const c of t.citations) {
      lines.push(
        `- ${c.authors} (${c.year}). ${c.title} ${c.doi ? 'doi:' + c.doi : 'PMID:' + c.pmid} — ${c.kind}, ${c.access}`,
        `  > "${c.quote}"`,
      );
    }
    lines.push('');
  }
}

function claimsSheet(score, notes, review) {
  const lines = [
    `# ${score.title} — claims and sources`,
    '',
    `Review: ${review}`,
    '',
    'Generated from `research/' + score.id + '.mjs`. Every claim the episode makes is listed with the exact',
    'sentence that supports it. Activity values are qualitative: direction and rough relative size only.',
    '',
    '## What is reconstruction in this episode',
    '',
    score.caveat,
    '',
  ];
  if (notes?.length) {
    lines.push('## Notes from the research pass', '');
    for (const n of notes) lines.push(`- ${n}`);
    lines.push('');
  }
  lines.push('## Order of events', '');
  for (const [i, p] of score.phases.entries()) {
    if (i === 0) {
      lines.push(`1. **${p.name}** (${p.timescale}) — start of the episode.`);
    } else if (p.order.kind === 'timed') {
      lines.push(`${i + 1}. **${p.name}** (${p.timescale}) — order **timed**:`);
      for (const c of p.order.citations) {
        lines.push(`   - ${c.authors} (${c.year}). ${c.title} ${c.doi ? 'doi:' + c.doi : 'PMID:' + c.pmid} — ${c.kind}, ${c.access}`, `     > "${c.quote}"`);
      }
    } else {
      lines.push(`${i + 1}. **${p.name}** (${p.timescale}) — order **reconstructed**: ${p.order.rationale}`);
    }
  }
  lines.push('', '## The condition', '');
  claimRows(lines, [...score.condition.regions, ...score.condition.connections], 'Claim');
  if (score.typical) {
    lines.push('## The typical response', '');
    claimRows(lines, [...score.typical.regions, ...score.typical.connections], 'Claim');
  } else {
    lines.push('## The typical response', '', 'None: the research did not support a comparison for this state.', '');
  }
  return lines.join('\n');
}

/** `category` is the group the state is listed under: 'psychological' (default) or 'physical'. */
export function writeScore(score, { indexTitle, notes, category = 'psychological', treats } = {}) {
  if (category === 'treatment' && !treats) throw new Error(`${score.id}: a treatment needs "treats"`);
  if (category === 'treatment' && !score.caveat.endsWith(TREATMENT_NOTE)) throw new Error(`${score.id}: caveat must end with TREATMENT_NOTE`);
  writeFileSync(`public/scores/${score.id}.json`, JSON.stringify(score, null, 1) + '\n');

  const indexPath = 'public/scores/index.json';
  const index = existsSync(indexPath) ? JSON.parse(readFileSync(indexPath, 'utf8')) : [];
  const existing = index.find((e) => e.id === score.id);
  const review = existing?.reviewed ? existing.reviewNote ?? '**reviewed**' : '**not yet reviewed**';
  writeFileSync(`research/${score.id}-claims.md`, claimsSheet(score, notes, review) + '\n');
  if (existing) {
    existing.title = indexTitle ?? score.title;
    existing.category = category;
    existing.file = `${score.id}.json`;
    if (treats) existing.treats = treats;
  } else {
    index.push({ id: score.id, title: indexTitle ?? score.title, file: `${score.id}.json`, category, ...(treats ? { treats } : {}), reviewed: false });
  }
  writeFileSync(indexPath, JSON.stringify(index, null, 1) + '\n');
  console.log(`wrote ${score.id}: ${score.condition.regions.length} region tracks, ${score.condition.connections.length} connections`);
}
