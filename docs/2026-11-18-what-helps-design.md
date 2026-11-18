# What helps — design

Date: 2026-11-18. Builds on `docs/2026-11-14-brain-states-design.md`; every rule there still applies unless changed here.

## 1. Intent and why

The project now has a purpose: **helping people who live with a condition, and the people close to them, understand what happens in the brain.** The message is "what you feel has a physical basis, it is studied, and it is not a character flaw".

Every one of the 24 episodes so far shows something going wrong. The owner chose to add **"What helps"**: episodes showing how the brain changes with treatment. This gives the project hope as well as explanation, and makes it more complete and useful. (Owner's words: "the best way to make it feel more complete and useful and also interesting".)

## 2. Goals, non-goals, anti-goals

### Goals
- A third group in the list, **"What helps"**, under "Psychological states" and "Physical conditions".
- **As many treatments as the research supports** (owner: "as many complete scientific treatments you can find"). The inclusion rule is in §5; there is no fixed number.
- **Links both ways.** Every condition with at least one treatment episode shows "What helps →" links to it, and every treatment episode links back to its condition.
- **Kind, honest framing**, as set out in §6.

### Non-goals
- Treatment advice, comparisons of which treatment is best, or dosing.
- Treatments with no before-and-after brain measurement in humans, however well they work clinically. They are not drawn. If a condition has none, nothing is made up for it.

### Anti-goals: a failure even if it runs
- Implying that a treatment works for everyone, or that a brain change is the reason someone feels better (unless a source says so).
- Stitching findings from two unrelated experiments into one "before and after".
- Making anyone feel that a brain which didn't change on a scan means they are beyond help.

## 3. Approach (decided by the owner: A)

**A, chosen:** a separate "What helps" group. Each treatment is its own episode, built only from studies of that treatment, with links to and from its condition.

**B, not chosen:** an "after treatment" version inside each existing episode. It would compare different experiments as if they were one, and it would change the episode format.

## 4. How a treatment episode plays (my calls)

### Phases
A typical episode has these phases, adapted to what the sources measured:
1. **Before treatment.** Draw the differences the treatment study itself reports between patients before treatment and healthy people, if it reports any. If it reports none, the brain is drawn at rest and the caption says the comparison starts from the person's own level.
2. **During treatment.** The timescale is weeks or months, so this phase is labelled as stages, like Alzheimer's and Huntington's.
3. **After treatment.** Draw the changes the studies report.
4. **What stayed the same.** A caption saying what did not change or was not measured, and that not everyone responded, where the sources say so.

### What brightness means
- **From the patient-versus-healthy comparison:** same as everywhere else, more or less active than in people without the condition.
- **From pre-to-post change only:** change since before treatment. The description says this in plain words, as other episodes already do for blood flow or tissue.
- **Order of phases:** the order is a fact (before comes before after). Within "during", findings are marked as reconstructed unless a study scanned partway through.

### Format
- **No change to the score format.** Treatment episodes use the existing score structure, `typical: null`, and the existing confidence labels.
- **Index entries** gain `category: 'treatment'` and `treats: '<condition id>'`. The links in both directions are worked out from `treats`, so the condition files don't change.

## 5. Which treatments get in

### Inclusion rule
A treatment gets an episode when **all** of the following hold:
- At least one study, or a pooled analysis, scanned **humans before and after** that treatment and reports at least one regional change with a **direction**.
- The change falls on regions the brain model has. A region missing from the model is mentioned in the text, not drawn.
- Every quote passes the word-for-word check, and the batch passes an independent review, as before.

Each finding gets a confidence label. A single small study is "mixed". A finding replicated in a pooled analysis can be "established". Conflicting results are "debated" or "mixed", with both sides cited.

### Candidates to search
This is where the search starts; the research decides what survives.

| Condition | Treatments to look for |
|---|---|
| Depression | CBT and psychotherapy, antidepressants, electroconvulsive therapy (ECT), transcranial magnetic stimulation (TMS), ketamine |
| Borderline | DBT, other psychotherapies |
| Anxiety, Panic | CBT |
| PTSD | Trauma-focused therapy (exposure, cognitive processing) |
| OCD | Exposure and response prevention / CBT, SSRIs |
| Psychosis | Antipsychotics |
| Craving / addiction | Treatment or abstinence studies |
| Stress | Mindfulness-based programmes |
| Chronic pain | CBT, pain programmes |
| Parkinson's | Levodopa, deep brain stimulation |
| Stroke | Rehabilitation, for example constraint-induced movement therapy |
| Migraine | Preventive treatment |
| Seizure | Anti-seizure treatment, surgery |
| Sleep deprivation | Recovery sleep |
| Alzheimer's, MS, concussion | Whatever the search finds |

Treatments that fail the rule are listed in the final summary with the reason, so the owner can see what was tried.

## 6. Framing for this purpose (my calls)

- **A note on every treatment episode,** in the caveat area:
  > "These are averages across groups of people, not a picture of any one person's brain. Treatments help many people, not everyone, and in different ways. This is not medical advice: talk to a doctor or therapist about what is right for you."
- **A footer link, "If you're struggling",** to an international directory of crisis and support lines (findahelpline.com, run by Throughline). It is a quiet link, not a banner.
- **The About dialog** gets one short paragraph stating the project's purpose.

## 7. Process (same as before)

- One `research/<id>.mjs` per treatment, with sources added to `research/sources.mjs`.
- Each batch goes through `npm run verify:quotes`, an independent review by a separate agent, and corrections.
- `reviewed: true` is set only after review.
- Work stays on `feat/what-helps` and is merged when the owner says "Merge it".

### Tests
- Grouping: `'treatment'` gets the "What helps" heading and is placed last.
- Links: the condition-to-treatment and treatment-to-condition links are worked out correctly, and a `treats` value pointing at an unknown condition is ignored.
- The shipped-scores test covers the new files, and every `treats` value must name an existing condition.

## 8. Left to the builder
- Exact wording of the captions.
- Where the links sit in the side panel.
- How the footer link is styled.
- How many research batches to split the work into.
