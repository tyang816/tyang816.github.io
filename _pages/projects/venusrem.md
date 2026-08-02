---
permalink: /projects/venusrem/
title: VenusREM
layout: default
project: venusrem
section: overview
lang: en
alt_url: /zh/projects/venusrem/
author_profile: true
redirect_from:
- /pub/venusrem/
- /project/venusrem/
description: 'VenusREM: retrieval-enhanced mutation effect prediction (ISMB/ECCB 2025
  / Bioinformatics).'
---

<header class="project-hero">
  <p class="project-kicker">ISMB/ECCB 2025 · Bioinformatics</p>
  <h1>VenusREM</h1>
  <p class="project-lede">
    Retrieval-enhanced fitness prediction that bridges high-throughput mutation evaluation and wet-lab directed evolution — combining structure/sequence protein language model signals with explicit MSA retrieval.
  </p>
  <p class="project-authors">
    Yang Tan, Ruilin Wang, Banghao Wu, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://academic.oup.com/bioinformatics/article/41/Supplement_1/i401/8199374" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusREM" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/datasets/AI4Protein/VenusREM" target="_blank" rel="noopener noreferrer">Dataset</a>
    <a class="project-btn project-btn--ghost" href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/venusrem/leaderboard/' | relative_url }}">Leaderboard</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusrem.png' | relative_url }}" alt="VenusREM overview figure" loading="lazy">
  <figcaption>VenusREM scores mutants by fusing PLM logits with retrieved MSA context for zero-shot fitness prediction.</figcaption>
</figure>

<section class="project-section">
  <h2>What the model does</h2>
  <p>
    VenusREM performs <strong>zero-shot mutant scoring</strong>: given a wild-type sequence, structure, and optional substitution list, it estimates relative fitness without assay-specific fine-tuning.
    Structure and sequence protein language model (PLM) signals are combined with <strong>MSA retrieval</strong> — homology alignments prepared as EVCouplings <code>a2m</code> or ColabFold <code>a3m</code> files, released with the VenusREM dataset on Hugging Face.
  </p>
  <p>
    The same inference path supports ProteinGym-scale evaluation and single-protein wet-lab campaigns: prepare sequences, structures, structure tokens, and alignments, then run <code>compute_fitness.py</code>.
  </p>
</section>

<section class="project-section">
  <h2>Why retrieval helps</h2>
  <p>
    VenusREM sits in a family of zero-shot predictors from the same line of work, each emphasizing a different structural or evolutionary cue:
  </p>
  <ul>
    <li><a href="{{ '/projects/protssn/' | relative_url }}">ProtSSN</a> — geometrical encoding over amino-acid coordinates (no MSA required).</li>
    <li><a href="{{ '/projects/prosst/' | relative_url }}">ProSST</a> — local structure tokens with disentangled sequence–structure attention.</li>
    <li><strong>VenusREM</strong> — explicit MSA retrieval layered on structure-aware PLM scoring.</li>
  </ul>
  <p>
    In practice the three are complementary: retrieval helps when deep, informative alignments are available; coordinate- or token-level structure models can be preferable when MSAs are shallow or costly to build.
    Setting <code>--alpha 0</code> in VenusREM’s fitness script recovers a ProSST-style score without MSA reweighting, easing head-to-head comparison.
  </p>
</section>

<section class="project-section">
  <h2>Results highlight</h2>
  <div class="project-callout">
    <p>
      Ranked <strong>1st</strong> on the <a href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym Substitution</a> leaderboard (April 2025), with strong standing also reported on VenusMutHub and related mutation-effect suites. See the <a href="{{ '/projects/venusrem/leaderboard/' | relative_url }}">leaderboard page</a> for a compact family comparison; official live rankings remain on ProteinGym.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Wet-lab oriented workflow</h2>
  <p>
    For a custom protein, the README pipeline mirrors a typical directed-evolution prep:
  </p>
  <ol>
    <li><strong>Homology search</strong> — JackHMMER / EVCouplings against UniRef100; select an <code>a2m</code> (or supply ColabFold <code>a3m</code>).</li>
    <li><strong>Structure</strong> — high-quality PDB from AlphaFold DB/Server, ESMFold, or experiment.</li>
    <li><strong>Structure sequence</strong> — <code>get_struc_seq.py</code> over the PDB directory.</li>
    <li><strong>Mutant table</strong> — assay CSV or all single-site variants via <code>get_sav.py</code>.</li>
    <li><strong>Score</strong> — <code>compute_fitness.py --base_dir … --out_scores_dir …</code>.</li>
  </ol>
  <p>
    Preprocessed ProteinGym v1 bundles (alignments, PDBs, structure sequences, substitutions) are available from the <a href="https://huggingface.co/datasets/AI4Protein/VenusREM" target="_blank" rel="noopener noreferrer">VenusREM dataset</a>.
  </p>
</section>

<section class="project-section">
  <h2>Integration</h2>
  <p>
    VenusREM is integrated into <a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">VenusFactory2</a>
    (<a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">venusfactory.bio</a>);
    open-source stack on GitHub:
    <a href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">ai4protein/VenusFactory2</a>.
  </p>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use VenusREM, please cite:</p>
  <div class="project-cite">
<pre><code>@article{tan2025venusrem,
    author = {Tan, Yang and Wang, Ruilin and Wu, Banghao and Hong, Liang and Zhou, Bingxin},
    title = {From high-throughput evaluation to wet-lab studies: advancing mutation effect prediction with a retrieval-enhanced model},
    journal = {Bioinformatics},
    volume = {41},
    number = {Supplement_1},
    pages = {i401-i409},
    year = {2025},
    doi = {10.1093/bioinformatics/btaf189}
}</code></pre>
  </div>
</section>
