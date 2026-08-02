---
permalink: /projects/protssn/
title: ProtSSN
layout: default
project: protssn
section: overview
lang: en
alt_url: /zh/projects/protssn/
author_profile: true
redirect_from:
- /pub/protssn/
- /project/protssn/
description: 'ProtSSN: semantical and geometrical protein encoding toward enhanced
  bioactivity and thermostability (eLife 2025).'
---

<header class="project-hero">
  <p class="project-kicker">eLife 2025 · Sequence–structure · Zero-shot</p>
  <h1>ProtSSN</h1>
  <p class="project-lede">
    Semantical and geometrical protein encoding toward enhanced bioactivity and thermostability.
    Fuse sequence semantics with geometric structure—no MSA required—for zero-shot mutant scoring and directed evolution.
  </p>
  <p class="project-authors">
    Yang Tan, Bingxin Zhou, Lirong Zheng, Guisheng Fan, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://elifesciences.org/articles/98033" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/ProtSSN" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/tyang816/ProtSSN" target="_blank" rel="noopener noreferrer">Models</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/protssn/leaderboard/' | relative_url }}">Leaderboard</a>
    <a class="project-btn project-btn--ghost" href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/protssn.png' | relative_url }}" alt="ProtSSN overview: sequence–structure fusion for zero-shot protein engineering">
  <figcaption>ProtSSN couples an ESM2 sequence encoder with an EGNN structural adapter for end-to-end zero-shot fitness prediction.</figcaption>
</figure>

<section class="project-section">
  <h2>Method</h2>
  <p>
    ProtSSN treats structure-aware modeling as an <strong>adapter</strong> on a pretrained protein language model.
    Residue embeddings from <strong>ESM2</strong> are refined by an <strong>EGNN</strong> that operates on a local Cα graph
    (neighborhood size <code>k</code> ∈ {10, 20, 30}), so geometry and sequence semantics are fused in one forward pass.
  </p>
  <p>
    Pretraining follows a <strong>denoising</strong> objective on CATH domains: residues are corrupted and the network
    learns to recover amino-acid identity conditioned on both sequence context and 3D neighbors.
    At inference, mutant scores come from log-likelihood ratios—no task-specific fine-tuning and <strong>no MSA</strong>.
  </p>
  <div class="project-callout">
    <p>
      Nine checkpoints span <code>k10/20/30</code> × <code>h512/768/1280</code>.
      For a single model, prefer <strong>k20_h512</strong>; ensembling all nine further improves ProteinGym correlation at modest cost.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Zero-shot usage</h2>
  <p>
    Inputs are a wild-type <strong>PDB</strong> (experimental or predicted) and a mutant table.
    Fold with AlphaFold / ESMFold or pull structures from the AlphaFold Database when wet-lab coordinates are unavailable.
  </p>
  <ul>
    <li>Download checkpoints from <a href="https://huggingface.co/tyang816/ProtSSN" target="_blank" rel="noopener noreferrer">Hugging Face</a> (e.g. <code>protssn_k20_h512.pt</code>).</li>
    <li>Run <code>zeroshot_predict.py</code> for single-model or <code>--use_ensemble</code> scoring.</li>
    <li>For proteins without assay data, build single-site saturation libraries (<code>src/build_sav.py</code>) and rank variants for directed evolution.</li>
    <li>Fine-tuning and embedding extraction scripts are included for downstream labels and representation analysis.</li>
  </ul>
  <p>
    Beyond ProteinGym DMS assays, ProtSSN was evaluated on constructed <strong>DTm</strong> and <strong>DDG</strong> stability sets,
    where structural context is especially informative.
  </p>
</section>

<section class="project-section">
  <h2>When to use ProtSSN vs ProSST / VenusREM</h2>
  <ul>
    <li><strong>ProtSSN</strong> — Best when you have (or can fold) a structure, want a compact EGNN adapter on ESM2, and prefer an MSA-free pipeline for zero-shot fitness or early directed-evolution screens.</li>
    <li><strong><a href="{{ '/projects/prosst/' | relative_url }}">ProSST</a></strong> — A full sequence–structure Transformer with quantized structure tokens and disentangled attention; use when you want a dedicated structure-conditioned PLM rather than an EGNN adapter.</li>
    <li><strong><a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a></strong> — Prefer when deep MSAs are available and you need top ProteinGym Substitution accuracy via retrieval-enhanced scoring; VenusREM later leads that board relative to ProtSSN’s 2023 ensemble result.</li>
  </ul>
</section>

<section class="project-section">
  <h2>Applications</h2>
  <p>
    ProtSSN is used in wet-lab redesign and community evaluation stacks:
  </p>
  <ul>
    <li><a href="https://www.nature.com/articles/s41586-026-10156-9" target="_blank" rel="noopener noreferrer">Zheng et al., Nature 2026 (CytoTape)</a> — guided single-site mutagenesis during monomer redesign.</li>
    <li><a href="https://doi.org/10.1016/j.apsb.2025.03.028" target="_blank" rel="noopener noreferrer">Zhang et al., Acta Pharm. Sin. B 2025 (VenusMutHub)</a> — structure-aware zero-shot mutant scoring across hundreds of small-scale assays.</li>
    <li><a href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">VenusFactory2</a> / <a href="https://venusfactory.bio/" target="_blank" rel="noopener noreferrer">web server</a> — zero-shot mutation scoring in an open engineering toolkit.</li>
  </ul>
  <p>
    See the <a href="{{ '/projects/protssn/leaderboard/' | relative_url }}">leaderboard page</a> for model variants, ProteinGym context, and the applications table.
  </p>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>
    Tan et al. Semantical and geometrical protein encoding toward enhanced bioactivity and thermostability.
    <em>eLife</em> 2025;13:RP98033. <a href="https://doi.org/10.7554/eLife.98033" target="_blank" rel="noopener noreferrer">doi:10.7554/eLife.98033</a>.
  </p>
  <div class="project-cite">
<pre><code>@article{tan2025protssn,
  article_type = {journal},
  title = {Semantical and geometrical protein encoding toward enhanced bioactivity and thermostability},
  author = {Tan, Yang and Zhou, Bingxin and Zheng, Lirong and Fan, Guisheng and Hong, Liang},
  editor = {Koo, Peter and Cui, Qiang},
  volume = 13,
  year = 2025,
  month = {may},
  pub_date = {2025-05-02},
  pages = {RP98033},
  citation = {eLife 2025;13:RP98033},
  doi = {10.7554/eLife.98033},
  url = {https://doi.org/10.7554/eLife.98033},
  journal = {eLife},
  issn = {2050-084X},
  publisher = {eLife Sciences Publications, Ltd},
}</code></pre>
  </div>
</section>
