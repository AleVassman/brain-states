# Brain States

**Try it online: https://alevassman.github.io/brain-states/**

An interactive 3D brain that plays researched "episodes" of twenty-four states
in two groups — psychological states (depression, anxiety, panic, acute
stress, anger, borderline personality disorder, dissociation, PTSD,
obsessive-compulsive disorder, psychosis, addiction and craving, joy and
reward) and physical conditions (migraine, epileptic seizure, infection,
Alzheimer's disease, Parkinson's disease, stroke, chronic pain, concussion,
multiple sclerosis, Huntington's disease, low blood sugar, sleep deprivation)
— and shows
which regions and connections change, with the studies behind every claim.

A third group, **What helps**, has twenty-three treatment episodes showing how
the brain changes with treatment: antidepressants, talking therapy (CBT) for
depression, anxiety, panic and chronic pain, ECT, ketamine, DBT, exposure
therapy for PTSD and OCD, antipsychotics, mindfulness, staying off
methamphetamine, treating back pain, levodopa, deep brain stimulation, stroke
rehabilitation, a CGRP antibody for migraine, epilepsy surgery, recovery
sleep, donepezil and exercise for early memory problems, and attention training in MS. Each
links to the condition it treats and back. Treatments that were looked at but
did not meet the bar are listed with reasons in `research/what-helps-excluded.md`.

The purpose: to help people who live with these conditions, and the people
close to them, understand what happens in the brain, that it is studied, and
that it is not a character flaw.

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

To list a state under "Physical conditions", pass `category: 'physical'` to
`writeScore`; the default is the psychological group. A treatment episode
passes `category: 'treatment'` and `treats: '<condition id>'`, ends its caveat
with `TREATMENT_NOTE`, and usually builds its phases with `research/helps.mjs`.

A state shows "awaiting review" in the app until its entry in
`public/scores/index.json` has `"reviewed": true`. Set that only after its
claims have been checked against the papers. All forty-seven current episodes were
checked against their sources.

## Rebuild the brain geometry

See `tools/ATLAS.md` for the downloads, then:

```bash
npm run atlas
```

The periaqueductal grey is not built yet: its source has to be downloaded by
hand (details in `tools/ATLAS.md`).

## Credits

See `CREDITS.md`.

## Licence

GNU General Public Licence v3.0 (see `LICENSE`). The brain meshes are derived from the
AAL3 atlas, which is GPL; other assets keep their own licences, listed in `CREDITS.md`.
