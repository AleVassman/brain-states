// Helper for the research pass: look papers up in Europe PMC and save their text for reading.
//
//   node tools/research/epmc.mjs search "title words"      -> matching papers with metadata
//   node tools/research/epmc.mjs get PMC1234567            -> saves full text to tools/cache/papers/PMC1234567.txt
//   node tools/research/epmc.mjs abstract 12345678         -> saves the abstract to tools/cache/papers/PMID12345678.txt
//
// Europe PMC's REST API is public and meant for programmatic use. Full text is
// only available for open-access papers; for the rest, only the abstract.
import { mkdirSync, writeFileSync } from 'node:fs';

const API = 'https://www.ebi.ac.uk/europepmc/webservices/rest';
const OUT = 'tools/cache/papers';
const [command, ...rest] = process.argv.slice(2);
const arg = rest.join(' ');

function strip(xml) {
  return xml
    .replace(/<xref[^>]*>[\s\S]*?<\/xref>/g, '')
    .replace(/<(title|p|sec|abstract|body|caption|td|th|tr|label)[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x[0-9a-fA-F]+;|&#\d+;/g, (m) => String.fromCodePoint(m[2] === 'x' ? parseInt(m.slice(3, -1), 16) : parseInt(m.slice(2, -1), 10)))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n');
}

async function search(query) {
  const url = `${API}/search?query=${encodeURIComponent(query)}&format=json&resultType=core&pageSize=4`;
  const data = await (await fetch(url)).json();
  for (const r of data.resultList?.result ?? []) {
    console.log(
      [
        `TITLE: ${r.title}`,
        `AUTHORS: ${r.authorString}`,
        `YEAR: ${r.pubYear}  JOURNAL: ${r.journalInfo?.journal?.title ?? ''}`,
        `DOI: ${r.doi ?? '-'}  PMID: ${r.pmid ?? '-'}  PMCID: ${r.pmcid ?? '-'}  OPEN: ${r.isOpenAccess}  INEPMC: ${r.inEPMC}`,
        `TYPES: ${(r.pubTypeList?.pubType ?? []).join('; ')}`,
        '',
      ].join('\n'),
    );
  }
}

async function get(pmcid) {
  const response = await fetch(`${API}/${pmcid}/fullTextXML`);
  if (!response.ok) {
    console.log(`${pmcid}: full text not available (status ${response.status})`);
    return;
  }
  mkdirSync(OUT, { recursive: true });
  const text = strip(await response.text());
  writeFileSync(`${OUT}/${pmcid}.txt`, text);
  console.log(`${pmcid}: saved ${text.length} characters`);
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

if (command === 'search') await search(arg);
else if (command === 'get') await get(arg);
else if (command === 'abstract') await abstract(arg);
else console.log('usage: epmc.mjs search|get|abstract <query|PMCID|PMID>');
