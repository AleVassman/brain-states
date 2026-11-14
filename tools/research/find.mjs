// Print the sentences in a saved paper that match a pattern.
//   node tools/research/find.mjs PMC1234567 "regex" [max]
import { readFileSync } from 'node:fs';
const [id, pattern, max = '6'] = process.argv.slice(2);
const text = readFileSync(`tools/cache/papers/${id}.txt`, 'utf8').replace(/\s+/g, ' ');
const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z(])/);
const re = new RegExp(pattern, 'i');
let n = 0;
for (const s of sentences) {
  if (!re.test(s) || s.length > 600) continue;
  console.log(`[${id}] ${s}`);
  if (++n >= Number(max)) break;
}
if (n === 0) console.log(`[${id}] no match for /${pattern}/`);
