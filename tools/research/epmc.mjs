// Helper for the research pass: look papers up in Europe PMC and save their text for reading.
//
//   node tools/research/epmc.mjs search "title words"      -> matching papers with metadata
//   node tools/research/epmc.mjs get PMC1234567 [...]      -> saves full text to tools/cache/papers/PMC1234567.txt
//   node tools/research/epmc.mjs abstract 12345678 [...]   -> saves the abstract to tools/cache/papers/PMID12345678.txt
//
// Metadata and abstracts come from Europe PMC's public REST API. Full text comes
// from the article's own PubMed Central page, one request at a time.
import { mkdirSync, writeFileSync } from 'node:fs';

const API = 'https://www.ebi.ac.uk/europepmc/webservices/rest';
const OUT = 'tools/cache/papers';
const [command, ...rest] = process.argv.slice(2);

function decode(text) {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

function strip(markup) {
  return decode(
    markup
      .replace(/<(title|p|sec|abstract|body|caption|td|th|tr|label|h[1-6]|li|div|section)[^>]*>/g, '\n')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n');
}

async function search(query) {
  const url = `${API}/search?query=${encodeURIComponent(query)}&format=json&resultType=core&pageSize=3`;
  const data = await (await fetch(url)).json();
  const results = data.resultList?.result ?? [];
  if (results.length === 0) console.log(`NO RESULT for ${query}`);
  for (const r of results) {
    const types = (r.pubTypeList?.pubType ?? []).filter((t) => /meta|review/i.test(t)).join(',');
    console.log(
      `${r.pubYear} | ${r.authorString} | ${r.title} | doi:${r.doi ?? '-'} | PMID:${r.pmid ?? '-'} | ${r.pmcid ?? 'noPMC'} | ${types}`,
    );
  }
}

async function get(pmcid) {
  const response = await fetch(`https://pmc.ncbi.nlm.nih.gov/articles/${pmcid}/`, {
    headers: { 'User-Agent': 'brain-states-research/0.1 (personal hobby project; reads one article at a time)' },
  });
  if (!response.ok) {
    console.log(`${pmcid}: full text not available (status ${response.status})`);
    return;
  }
  let html = await response.text();
  const start = html.indexOf('<main');
  const end = html.lastIndexOf('</main>');
  if (start >= 0 && end > start) html = html.slice(start, end);
  for (const tag of ['script', 'style', 'nav', 'figure', 'table', 'sup']) {
    html = html.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?</${tag}>`, 'g'), ' ');
  }
  mkdirSync(OUT, { recursive: true });
  const text = strip(html);
  writeFileSync(`${OUT}/${pmcid}.txt`, text);
  console.log(`${pmcid}: saved ${text.length} characters`);
  await new Promise((r) => setTimeout(r, 1200));
}

async function abstract(pmid) {
  const url = `${API}/search?query=EXT_ID:${pmid}%20AND%20SRC:MED&format=json&resultType=core`;
  const data = await (await fetch(url)).json();
  const r = data.resultList?.result?.[0];
  if (!r?.abstractText) {
    console.log(`${pmid}: no abstract found`);
    return;
  }
  mkdirSync(OUT, { recursive: true });
  const text = `${r.title}\n${r.authorString} (${r.pubYear}) doi:${r.doi}\n\n${strip(r.abstractText)}`;
  writeFileSync(`${OUT}/PMID${pmid}.txt`, text);
  console.log(`${pmid}: saved abstract, ${text.length} characters`);
}

if (command === 'search') await search(rest.join(' '));
else if (command === 'get') for (const id of rest) await get(id);
else if (command === 'abstract') for (const id of rest) await abstract(id);
else console.log('usage: epmc.mjs search|get|abstract <query|PMCIDs|PMIDs>');
