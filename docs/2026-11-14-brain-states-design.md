# Brain States — design

Date: 2026-11-14
Status: awaiting approval

Throughout this document, lines marked **(decided)** are things the owner said
or chose. Lines marked **(my call)** were filled in by the designer and can be
overruled.

## 1. Intent and why

An interactive 3D brain, in the browser, where you pick an emotional or mood
state and watch an episode of it unfold inside the brain over time.

It is a personal hobby project. The owner lives with depression and borderline
personality disorder, is curious about what is physically going on in a brain
like theirs, and loves strong visual representation of ideas. There is no
audience to satisfy and no commercial goal. Success is: the owner opens it and
finds it both beautiful and true. **(decided)**

## 2. Goals, non-goals, anti-goals

### Goals

- A glowing, rotatable 3D brain inside a wireframe head, in the style of the
  reference image (section 5). **(decided)**
- Four states in the first version: a depressive episode, an anxiety/threat
  response, anger, and a borderline emotional spike with its slow return.
  **(decided)**
- Each state plays as an episode over time, with pause and scrubbing, not as a
  static snapshot. **(decided)**
- Every scientific claim shown on screen is traceable to published research,
  with an honest confidence level. **(decided in principle; mechanism is my
  call, section 7)**
- A "typical response" comparison for each episode, so the difference from a
  brain without the condition is visible. **(my call)**

### Non-goals

- More than four states. The design must make a fifth easy to add later, but
  none is built now.
- Phones and tablets. Desktop browser with a mouse or trackpad only.
  **(my call)**
- Accounts, saving, a server, analytics. It is a static site.
- Simulating neurons. This is a data-driven visualisation of published
  findings, not a computational brain model.
- Neurotransmitter chemistry (serotonin, dopamine levels) as a visual layer.
  It can be mentioned in text where a source supports it. **(my call)**

### Anti-goals — things that make it a failure even if it runs

- **False certainty.** Presenting "anger = this region" as fact. Emotions are
  network patterns; the same regions take part in many states. The piece must
  never imply a one-region-one-emotion map.
- **Invented science.** Any region, connection or direction of change that is
  not backed by a source the researcher actually opened. The order of events
  is handled separately (section 7, "Order of events").
- **Hiding the reconstruction.** No one has a second-by-second recording of a
  depressive episode. The piece must say, inside the interface, that pacing is
  a reconstruction from group-level studies and that individual brains vary.
- **Anything diagnostic.** No self-assessment, no "is this you?", no treatment
  advice.
- **Stigmatising framing.** Conditions are described in neutral, respectful
  language: differences in regulation, not a broken brain.
- **Pretty but anatomically wrong.** Regions placed or shaped by eye.

## 3. Constraints

- Runs entirely in a modern desktop browser. No install, no backend.
- Brain geometry comes from an openly licensed research atlas (section 6).
- Hobby project built by one person with an AI assistant; favour few
  dependencies and a small, readable codebase.
- Smooth on an ordinary laptop with integrated graphics: target 60 frames per
  second, acceptable floor 30. **(my call)**

## 4. Approaches considered

1. **Web app, real-time 3D, atlas-based geometry — chosen.** Runs from a link,
   easy to iterate on, real anatomy, and the reference look (glowing wireframe,
   bloom, particles) is well within reach. Science lives in data files separate
   from the visuals. Visual ceiling slightly below a game engine.
2. **Game engine (Unity/Unreal).** Highest visual ceiling, but a download
   instead of a link, much slower to build and change, and little gain for this
   particular style.
3. **Stylised hand-made brain.** Fastest to something pretty, but regions would
   be approximate, which breaks the accuracy requirement. Rejected.
4. **Pre-rendered video.** Most beautiful, but nothing to rotate, scrub or
   click. Rejected.

The owner picked approach 1. **(decided)**

## 5. What you see

### Layout

```
+--------------------------------------------------------------------+
|  BRAIN STATES                                  [about the science] |
|                                                                    |
|  STATES            .  ·   wireframe head  ·  .      REGION / PHASE |
|  > Depression         ·  glowing brain   ·          name           |
|    Anxiety            ·  (drag: rotate,  ·          what it does   |
|    Anger              ·   wheel: zoom)   ·          in this state  |
|    Borderline spike    ·               ·            confidence     |
|                                                     sources        |
|  [typical response]                                                |
|                                                                    |
|  caption: "The amygdala flags a threat before the thinking         |
|            brain has caught up."                                   |
|  |> ||   trigger | alarm | control response | aftermath            |
|  ---o-----------------------------------------------------------   |
+--------------------------------------------------------------------+
```

### Look **(decided: reference image is the starting point)**

The reference image is saved beside this document as `reference-look.png`.

- Dark, deep background with soft, slowly drifting out-of-focus particles.
- A human head and neck drawn as a see-through wireframe of points and fine
  lines in cool blue. It is context only and never obscures the brain.
- The brain is the centrepiece: folds drawn as glowing lines and points with
  bloom.
- The outer brain is translucent so deep structures (amygdala, hippocampus,
  reward centres) are visible glowing inside. **(my call — required, because
  much of the relevant activity is deep)**

### Visual language **(my call)**

| What you see | What it means |
|---|---|
| Gentle, slow shimmer everywhere in cool blue | Resting baseline |
| Region brightens and shifts to warm orange/coral | More active than baseline |
| Region dims and shifts toward deep violet | Less active than baseline |
| Bright pulses travelling along a line between regions | Those regions are communicating more strongly |
| A line that thins and breaks into sparse dots | Weakened communication |
| Hatched or flickering outline on a region | Evidence for this region's role is mixed or debated |

Meaning is always carried by brightness and motion as well as colour, so it
does not depend on colour vision.

The baseline brain is never dark or still. A real resting brain is active;
states are departures from that, in both directions.

### How an episode plays **(decided: episode over time; details my call)**

1. The brain rests at baseline. The owner picks a state and presses play.
2. The episode moves through named phases shown on the timeline. Typical
   phases: trigger, alarm, control response, aftermath. Each state defines its
   own phases; depression in particular is a loop rather than a spike.
3. Each phase has a one- or two-sentence plain-language caption.
4. Each phase is labelled with its real-world timescale (fractions of a
   second, seconds, minutes, hours, weeks). Screen time is not proportional to
   real time, and the timeline says so.
5. Pause, scrub, and rotate at any moment. Scrubbing backwards works.
6. "Typical response" replays the same trigger in a brain without the
   condition. **(my call)** Shown as a toggle that swaps the playback; a
   side-by-side view is left to the builder if it is cheap.
7. Clicking a region opens the side panel: its name, what it is doing at this
   moment in this state, the confidence level, and the sources.
8. "About the science" explains the reconstruction caveat, how confidence
   levels are assigned, and that this is not diagnostic or medical advice.

## 6. How it is built **(my calls — the owner left the how to the designer)**

- **Stack:** TypeScript, Vite, Three.js, with a post-processing bloom pass.
  No UI framework unless the builder finds the panels need one.
- **Geometry:** region meshes from an openly licensed atlas in a standard
  coordinate space (MNI). The atlas must provide both a cortical parcellation
  and separate subcortical structures. Candidates to evaluate: Harvard-Oxford,
  Desikan-Killiany (FreeSurfer), Julich-Brain, the Open Anatomy Project brain
  atlas, BodyParts3D (also has a head). Selection criteria: licence allows
  redistribution in a public hobby project, all regions in section 7 are
  present or can be composed, mesh size is workable in a browser.
- **Head:** any openly licensed head mesh aligned by eye to the brain. It is
  decoration; accuracy requirements do not apply to it.
- **Rendering:** each region is its own object so it can be lit, dimmed and
  clicked independently. Connections are drawn as curves between region
  centres. They indicate that two regions communicate (functional
  connectivity); they are not traced nerve pathways, and the interface says so.
- **Separation of science and visuals:** the renderer knows nothing about
  depression or anger. It plays "score" files.

### Score files

One file per state, plus the shared region list. A score contains:

- title, short description, and the reconstruction caveat specific to it
- phases: name, caption, real-world timescale label, share of screen time
- region tracks: for each involved region, keyframes of activity from
  -1 (strongly below baseline) through 0 (baseline) to +1 (strongly above)
- connection tracks: pairs of regions with keyframed strength, same scale
- a second set of tracks for the typical response
- for every region track and connection track: a plain-language explanation,
  a confidence level, and at least one citation (authors, year, title, DOI)

Activity values are qualitative (direction and rough relative size), not
measured quantities, and the interface says so.

**What the values mean (my call).** Zero is the resting level of a typical
brain. The condition track and the typical track are both measured against
that same zero, so the difference between a condition and a typical response
is simply the difference between the two tracks. A condition track may
therefore start away from zero where research shows a lasting resting-state
difference (for example, resting connectivity in depression).

**The typical track is researched in its own right (my call).** Its values
come from studies of emotion processing in people without the condition, with
their own citations and confidence levels. It is never produced by inverting
or damping the condition track. For depression, the shared trigger is a
negative self-relevant thought or setback: the typical brain engages with it
briefly and disengages; the depressive brain stays in the loop. If the
research cannot support a typical track for a state, that state ships without
the comparison rather than with an invented one.

Scores are validated automatically: every track has a citation and a
confidence level, every region name exists in the atlas, keyframes are in
range and in time order. A score that fails validation does not load.

## 7. The science

### Rules for the research pass

- Prefer meta-analyses and systematic reviews; use single studies only to
  fill in detail, and mark them as such.
- A claim goes into a score only if the researcher opened the source and it
  says what the claim says. Nothing is cited from memory.
- Confidence levels: **well established** (replicated, supported by
  meta-analysis), **mixed** (supported but with notable contrary findings),
  **debated** (active disagreement, or mainly animal evidence).
- Where human evidence is thin and the picture leans on animal work, the
  caption says so.
- Findings are group averages. The piece states that an individual brain may
  not match.

### Order of events **(my call)**

Most studies say which regions differ, not what happens in what order. So the
order of events is treated as its own kind of claim. Each step from one phase
to the next carries one of two labels, stored in the score and checked by the
validator:

- **timed** — a source with time resolution (EEG/MEG, time-course imaging,
  habituation or recovery studies) supports this order; citation required.
- **reconstructed** — the regions and directions are sourced, but the order is
  an inference from how these systems are understood to work; a one-line
  rationale is required instead of a citation.

The timeline marks reconstructed steps visibly, and "about the science"
explains the difference. Reconstructed order is allowed; unlabelled order is
not.

### Who does the research, and reading rules **(my call)**

The AI assistant does the research pass; the owner reviews each score.
Full text is read wherever it is openly available. Where only the abstract
can be read, a claim may rest on it only if the abstract states that claim
explicitly, and the source is flagged "abstract only" in the interface. The
owner may supply paywalled papers but nothing depends on it.

### Regions no single atlas provides **(my call)**

Combining several published atlases is fine provided all are in the same
coordinate space. A region may also be taken from a published probabilistic
map or published coordinates; it is then drawn as a soft marker rather than a
shaped structure and labelled "approximate location" in the side panel. A
region that cannot be placed by either route is dropped from the visuals and
mentioned in text only. Nothing is placed by eye.

### Sharing **(my call)**

Built to run on the owner's machine, but with every asset licensed so that it
could be put online as a free, non-commercial project later. That means
atlases and meshes whose licences allow public non-commercial redistribution
with attribution, and a credits page listing them.

### Regions expected to be needed

Amygdala, hippocampus, hypothalamus, thalamus, nucleus accumbens / ventral
striatum, insula, anterior cingulate (dorsal and subgenual parts), medial
prefrontal cortex, dorsolateral prefrontal cortex, ventrolateral prefrontal
cortex, orbitofrontal cortex, posterior cingulate / precuneus, periaqueductal
grey. The research pass may add or drop regions.

### Starting hypotheses per state

These are directions for the research pass, drawn from the designer's general
knowledge. They are **not verified** and must not be shipped as written.

- **Depressive episode.** A self-focused rumination loop: the default mode
  network (medial prefrontal, posterior cingulate) over-engaged and tightly
  coupled with the subgenual cingulate; weaker engagement of the
  dorsolateral prefrontal control regions; blunted reward response in the
  ventral striatum. Shown as a loop that fails to exit rather than a spike.
  Timescale: minutes within an episode of weeks.
- **Anxiety / threat response.** Fast amygdala response to a possible threat,
  insula and dorsal cingulate (salience network) engagement, body-arousal
  signalling via the hypothalamus, and prefrontal regulation that is slower
  or less effective than in the typical response. Timescale: under a second
  to minutes.
- **Anger.** Amygdala and hypothalamic activation in response to provocation,
  dorsal cingulate and insula engagement, and the orbitofrontal / ventromedial
  prefrontal "brake" either holding or failing. Deep rage circuitry
  (hypothalamus, periaqueductal grey) rests largely on animal evidence and is
  likely to be marked debated. Timescale: seconds to minutes.
- **Borderline emotional spike.** Heightened amygdala and insula reactivity to
  an emotional or interpersonal trigger, reduced prefrontal regulation, and —
  the defining visual — a markedly slower return to baseline than the typical
  response. Timescale: seconds to hours.

Suggested entry points for the literature search (to be checked, not trusted):
large-scale network meta-analyses in major depression; meta-analyses of
emotional processing in anxiety disorders; meta-analyses of emotion
processing and amygdala habituation in borderline personality disorder;
imaging studies of provoked anger and reactive aggression.

## 8. Order of work **(my call)**

1. The brain: atlas chosen, regions loaded, the look matching the reference,
   rotate/zoom, baseline shimmer. Checked by eye against the reference image.
2. The player: score format, validation, timeline, scrubbing, captions, side
   panel, typical-response toggle — driven by a clearly labelled placeholder
   score.
3. Research pass and the four real scores, one state at a time. The owner
   reads each score's claims and sources before it replaces the placeholder.
4. Polish: transitions, particles, "about the science".

## 9. Testing **(my call)**

- Automated: score validation, timeline interpolation (value at any time,
  forwards and backwards), every region in every score resolves to a mesh.
- By eye: the look, performance, and each episode watched end to end.
- Scientific review: for each score, a list of every claim beside its source
  and quote, checked by the owner or a second reader.

## 10. Left to the builder

- Which atlas and head mesh, within the criteria in section 6.
- How the wireframe-and-points look is produced (shaders, geometry
  processing, bloom settings).
- Exact score file syntax, file layout, and state management.
- Toggle versus side-by-side for the typical response.
- Number and naming of phases per state, guided by what the research supports.
- Whether a small UI library is worth adding.
