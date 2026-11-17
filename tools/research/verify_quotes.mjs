// Checks that every quote in every shipped score appears word for word in the
// saved text of the paper it is attributed to.
//
//   node tools/research/verify_quotes.mjs
//
// Needs the papers in tools/cache/papers (fetch them with epmc.mjs). Exits with
// an error if any quote cannot be found, or any cited paper has not been saved.
import { existsSync, readFileSync } from 'node:fs';
import { SOURCES } from '../../research/sources.mjs';

const normalise = (s) =>
  s
    .replace(/[‘’′]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const byKey = new Map(Object.values(SOURCES).map((s) => [s.doi || `pmid:${s.pmid}`, s]));
const index = JSON.parse(readFileSync('public/scores/index.json', 'utf8'));
let checked = 0;
const problems = [];

for (const entry of index) {
  const score = JSON.parse(readFileSync(`public/scores/${entry.file}`, 'utf8'));
  if (score.placeholder) continue;
  const citations = [];
  for (const variant of [score.condition, score.typical]) {
    if (!variant) continue;
    for (const t of [...variant.regions, ...variant.connections]) {
      for (const c of t.citations) citations.push([t.region ?? `${t.from}>${t.to}`, c]);
    }
  }
  for (const p of score.phases) {
    if (p.order?.kind === 'timed') for (const c of p.order.citations) citations.push([`phase ${p.id}`, c]);
  }

  for (const [where, c] of citations) {
    checked++;
    const source = byKey.get(c.doi || `pmid:${c.pmid}`);
    if (!source) {
      problems.push(`${score.id} / ${where}: ${c.doi || 'pmid ' + c.pmid} is not in research/sources.mjs`);
      continue;
    }
    const file = `tools/cache/papers/${source.pmcid ?? 'PMID' + source.pmid}.txt`;
    if (!existsSync(file)) {
      problems.push(`${score.id} / ${where}: paper not saved (${file})`);
      continue;
    }
    if ((c.access === 'full-text') !== Boolean(source.pmcid)) {
      problems.push(`${score.id} / ${where}: access "${c.access}" does not match how the paper was read`);
    }
    if (!normalise(readFileSync(file, 'utf8')).includes(normalise(c.quote))) {
      problems.push(`${score.id} / ${where}: quote not found in ${file}: "${c.quote.slice(0, 80)}..."`);
    }
  }
}

if (problems.length > 0) {
  console.log(problems.join('\n'));
  console.log(`\n${problems.length} problem(s) in ${checked} citation(s).`);
  process.exit(1);
}
console.log(`All ${checked} quotes found word for word in their sources.`);
