# Atlas decision record

Where the brain geometry comes from, under what licence, and how each region
the episodes need is built. Checked on 2026-11-14.

## Sources

### AAL3 — most regions, the outer cortex, the cerebellum

- **What:** Automated Anatomical Labelling atlas 3, file `AAL3v1_1mm.nii` (1 mm, MNI space, drawn on the Colin27 single-subject brain).
- **Download:** https://www.gin.cnrs.fr/wp-content/uploads/AAL3v2_for_SPM12.tar.gz (from https://www.gin.cnrs.fr/en/tools/aal/)
- **Licence:** GNU General Public Licence. The official download page states, for the AAL 3v2 release: "Addition of the operating licence 'GNU General Public Licence' in the readme". The GPL allows redistribution, including of derived works, provided the licence and source are passed on.
  - Caveat: the archive downloaded on this date contains no separate readme file with the licence text; the statement above is from the official page. If the project is ever published, re-check the archive and the page.
- **Cite:** Rolls ET, Huang CC, Lin CP, Feng J, Joliot M. Automated anatomical labelling atlas 3. NeuroImage 2020;206:116189. doi:10.1016/j.neuroimage.2019.116189

### Neudorfer et al. 2020 — hypothalamus, bed nucleus of the stria terminalis

- **What:** "A high-resolution in vivo magnetic resonance imaging atlas of the human hypothalamic region", file `MNI152b_atlas_labels_0.5mm.nii.gz` (0.5 mm, MNI152 2009b space) and `Volumes_names-labels.csv`.
- **Download:** https://zenodo.org/records/3942115
- **Licence:** Creative Commons Attribution 4.0 International (the record's Licence field).
- **Cite:** Neudorfer C, Germann J, Elias GJB, Gramer R, Boutet A, Lozano AM. A high-resolution in vivo magnetic resonance imaging atlas of the human hypothalamic region. Scientific Data 2020;7:305. doi:10.1038/s41597-020-00644-6

### Harvard Ascending Arousal Network Atlas v2.0 — periaqueductal grey

- **What:** file `AAN_PAG_MNI152_1mm_v2p0.nii` (1 mm, MNI152 space).
- **Download:** https://datadryad.org/dataset/doi:10.5061/dryad.zw3r228d2
- **Licence:** CC0 1.0 (the Dryad record's licence field: `https://spdx.org/licenses/CC0-1.0.html`).
- **Cite:** Edlow B, Kinney H (2023). Harvard Ascending Arousal Network Atlas – Version 2.0 [Dataset]. Dryad. doi:10.5061/dryad.zw3r228d2
- **Status: NOT YET BUILT.** Dryad blocks automated downloads. Download the file by hand in a browser, save it to `tools/cache/aan/`, and re-run the build. Until then the periaqueductal grey is absent and no score may refer to it.

### Lee Perry-Smith head scan — the head (decoration only)

- **What:** `LeePerrySmith.glb`, "Infinite, 3D Head Scan" by Lee Perry-Smith.
- **Download:** https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb into `tools/cache/head/`
- **Licence:** Creative Commons Attribution 3.0 Unported (the `LeePerrySmith_License.txt` beside it; credits www.triplegangers.com and http://www.ir-ltd.net/).
- **Why:** the Colin27 scan stops at the upper lip, so a head made from it has no chin or neck.
- **How it is placed:** one uniform scale and a shift up/down and front/back, chosen by the build so that the model's skull lies as close as possible to the Colin27 skull (mean gap about 6 mm at the last build). It is a different person's head, so the fit is approximate; the design exempts the head from the accuracy rules. If the file is missing, the build falls back to the Colin27 outline.

### Colin27 — brainstem outline, and the reference the head is fitted to

- **What:** Colin27 1998 average, files `colin27_t1_tal_lin_headmask.nii` and `colin27_t1_tal_lin_mask.nii` (1 mm, same grid as AAL3).
- **Download:** http://packages.bic.mni.mcgill.ca/mni-models/colin27/mni_colin27_1998_nifti.zip (from https://www.bic.mni.mcgill.ca/ServicesAtlases/Colin27)
- **Licence:** "Copyright (C) 1993–2009 Louis Collins, McConnell Brain Imaging Centre, Montreal Neurological Institute, McGill University." Permission is granted to use, copy, modify and distribute for any purpose without fee, provided the copyright notice appears in all copies.
- **Cite:** Holmes CJ, Hoge R, Collins L, Woods R, Toga AW, Evans AC. Enhancement of MR images using registration for signal averaging. J Comput Assist Tomogr 1998;22(2):324–333.

## Coverage of the regions the design expects

| Group | Built from | Notes |
|---|---|---|
| `amygdala` | AAL3 Amygdala (45/46) | |
| `hippocampus` | AAL3 Hippocampus (41/42) | |
| `hypothalamus` | Neudorfer: all hypothalamic nuclei plus mammillary bodies (labels 9/10, 19–32, 37/38, 45–54) | |
| `thalamus` | AAL3: all thalamic nuclei (121–150) | |
| `nucleus-accumbens` | AAL3 N_Acc (157/158) | |
| `insula` | AAL3 Insula (33/34) | |
| `dacc` | AAL3 ACC_sup (155/156) | Supracallosal anterior cingulate. "Dorsal ACC" in papers sometimes also covers the front of the mid-cingulate; this is the narrower reading. |
| `sgacc` | AAL3 ACC_sub (151/152) | |
| `mpfc` | AAL3 Frontal_Sup_Medial (19/20) | A gyrus, used as the standard anatomical stand-in for the medial prefrontal cortex. |
| `dlpfc` | AAL3 Frontal_Mid_2 (5/6) | Middle frontal gyrus. The dorsolateral prefrontal cortex is a functional area with no sharp anatomical border; this gyrus is the usual stand-in and is larger than the area itself. |
| `vlpfc` | AAL3 Frontal_Inf_Oper, _Tri, _Orb_2 (7–12) | Inferior frontal gyrus. Same caveat as `dlpfc`. |
| `ofc` | AAL3 OFCmed, OFCant, OFCpost, OFClat (25–32) | |
| `pcc-precuneus` | AAL3 Cingulate_Post (39/40) + Precuneus (71/72) | |
| `pag` | Harvard AAN atlas | **Pending manual download**, see above. |

Added beyond the design's list, because the research pass is likely to want them:

| Group | Built from |
|---|---|
| `pgacc` | AAL3 ACC_pre (153/154), pregenual anterior cingulate |
| `vmpfc` | AAL3 Frontal_Med_Orb (21/22) + Rectus (23/24) |
| `vta` | AAL3 VTA (159/160) |
| `visual-cortex` | AAL3 Calcarine (47/48) + Cuneus (49/50) + Lingual (51/52) |
| `parahippocampal` | AAL3 ParaHippocampal (43/44) |
| `lateral-temporal` | AAL3 Temporal_Sup (85/86) + Temporal_Mid (89/90) + Temporal_Inf (93/94) |
| `inferior-parietal` | AAL3 Parietal_Inf (65/66) + SupraMarginal (67/68) + Angular (69/70) |
| `substantia-nigra` | AAL3 SN_pc (161/162) + SN_pr (163/164) |
| `caudate` | AAL3 Caudate (75/76) |
| `putamen` | AAL3 Putamen (77/78) |
| `bnst` | Neudorfer labels 33/34 |

Context only (drawn faintly, never the target of a score):

| Node | Built from |
|---|---|
| `cortex-l`, `cortex-r` | Union of every AAL3 cerebral cortex label, per hemisphere |
| `cerebellum` | AAL3 labels 95–120 |
| `brainstem-mid` (group `brainstem`) | Colin27 brain mask inside the box x ±14, y −50…−10, z −62…−8 mm, where AAL3 has no cortical or subcortical label. A rough outline, not an anatomical segmentation. Episodes may light it for findings about the brainstem in general; the app then shows an "Approximate extent" badge. |
| `head` (in `head.glb`) | Lee Perry-Smith head scan fitted to the Colin27 head mask (or the Colin27 mask itself if the scan is absent) |

Considered and not used: AAL3's locus coeruleus (too few voxels to mesh), the Brainnetome atlas (non-commercial terms could not be read on its own site), Harvard-Oxford (licence tied to FSL's).

## Alignment

AAL3 and Colin27 share one voxel grid. The hypothalamus atlas is in MNI152
2009b space and the AAN atlas in MNI152 space; each is placed by its own
voxel-to-millimetre transform. These MNI templates differ from Colin27 by a
millimetre or two in places, so structures from different atlases can sit
that far from where they would in a single brain. Nothing is positioned by eye.

## Rebuilding

Download the four sources into `tools/cache/{aal3,hypothalamus,aan,colin27}/`
(unpack the AAL3 and Colin27 archives in place), then:

```bash
node tools/build_atlas.mjs
```

The build is written in Node, not Python as first planned: Python packages
could not be installed in a deeply nested folder on Windows.
