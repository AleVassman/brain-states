# Credits

The brain geometry in this project is derived from published research atlases.
Details, licences and how each region is built are in `tools/ATLAS.md`.

- **AAL3** — Rolls ET, Huang CC, Lin CP, Feng J, Joliot M. Automated anatomical labelling atlas 3. NeuroImage 2020;206:116189. doi:10.1016/j.neuroimage.2019.116189. GNU General Public Licence. Used for most brain regions, the outer cortex and the cerebellum. The meshes in `public/atlas/brain.glb` derived from it are distributed under the same licence; `tools/build_atlas.mjs` is the source that produces them.
- **Hypothalamic region atlas** — Neudorfer C, Germann J, Elias GJB, Gramer R, Boutet A, Lozano AM. Scientific Data 2020;7:305. doi:10.1038/s41597-020-00644-6. CC BY 4.0. Used for the hypothalamus and the bed nucleus of the stria terminalis; converted from label volumes to surface meshes.
- **Harvard Ascending Arousal Network Atlas v2.0** — Edlow B, Kinney H (2023). Dryad. doi:10.5061/dryad.zw3r228d2. CC0. Used for the periaqueductal grey, when built.
- **Colin27** — Copyright (C) 1993–2009 Louis Collins, McConnell Brain Imaging Centre, Montreal Neurological Institute, McGill University. Holmes CJ et al., J Comput Assist Tomogr 1998;22(2):324–333. Used for the head outline and the brainstem outline.

Software: three.js (MIT), meshoptimizer (MIT).
