# Brain States

An interactive 3D brain that plays researched "episodes" of sixteen states in
two groups — psychological states (depression, anxiety, panic, acute stress,
anger, borderline personality disorder, dissociation, joy and reward) and
physical illnesses (migraine, epileptic seizure, infection, Alzheimer's
disease, Parkinson's disease, stroke, chronic pain, concussion) — and shows
which regions and connections change, with the studies behind every claim.

It is a personal hobby project. It is a reconstruction from published
group-level research, not a recording of any brain, and it is not a diagnostic
tool or medical advice. The "About the science" button in the app explains what
that means.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints. Drag to rotate, scroll to zoom, pick a state,
press play (or the space bar), and click a region to read about it.

## Check it

```bash
npm test
```

```bash
npm run verify:quotes
```

`verify:quotes` checks that every quoted sentence in every episode appears word
for word in the saved text of the paper it is attributed to. It needs the
papers in `tools/cache/papers`, which is not committed; fetch them with
`node tools/research/epmc.mjs get <PMCID>` or `abstract <PMID>` (the ids are
in `research/sources.mjs`).

## Where things are

| Path | What |
|---|---|
| `research/<state>.mjs` | The episode: phases, regions, connections, and the quote behind each claim |
| `research/sources.mjs` | Every paper cited, typed once |
| `research/<state>-claims.md` | Generated sheet of every claim beside its source and quote, for review |
| `public/scores/` | Generated episode files the app plays |
| `public/atlas/` | Brain and head geometry, built from published atlases |
| `tools/ATLAS.md` | Where the geometry comes from, licences, and how each region is built |
| `src/` | The app: `score/` (file format, checks, timing), `player/`, `brain/` (3D), `ui/` |
| `docs/` | The design and the build plan |

## Change or add a state

1. Edit `research/<state>.mjs`, or copy one to start a new state. Add any new
   paper to `research/sources.mjs`, copying its details from Europe PMC
   (`node tools/research/epmc.mjs search "title"`).
2. Save the paper's text (`epmc.mjs get` or `abstract`) and quote it exactly.
   Only claim what the sentence says.
3. Regenerate and check:

```bash
npm run scores
```

```bash
npm run verify:quotes
```

```bash
npm test
```

To list a state under "Physical illnesses", pass `category: 'physical'` to
`writeScore`; the default is the psychological group.

A state shows "awaiting review" in the app until its entry in
`public/scores/index.json` has `"reviewed": true`. Set that only after its
claims have been checked against the papers. All sixteen current states were
checked on 2026-11-17.

## Rebuild the brain geometry

See `tools/ATLAS.md` for the downloads, then:

```bash
npm run atlas
```

The periaqueductal grey is not built yet: its source has to be downloaded by
hand (details in `tools/ATLAS.md`).

## Credits

See `CREDITS.md`.
