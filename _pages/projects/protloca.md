---
permalink: /projects/protloca/
title: ProtLOCA
layout: default
project: protloca
section: overview
lang: en
alt_url: /zh/projects/protloca/
author_profile: true
redirect_from:
- /pub/protloca/
- /project/protloca/
description: 'ProtLOCA: structure-only local geometry alignment for protein homology
  detection (IEEE BIBM 2024).'
---

<header class="project-hero">
  <p class="project-kicker">IEEE BIBM 2024</p>
  <h1>ProtLOCA</h1>
  <p class="project-lede">
    Structure-only local geometry alignment for protein homology detection —
    asking whether amino-acid type embeddings always help, and when geometry alone is the better cue.
  </p>
  <p class="project-authors">
    Yang Tan, Lirong Zheng, Bozitao Zhong, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://doi.org/10.1109/BIBM62325.2024.10822035" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://arxiv.org/abs/2406.19755" target="_blank" rel="noopener noreferrer">arXiv</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/ProtLOCA" target="_blank" rel="noopener noreferrer">Code</a>
  </div>
</header>

<section class="project-section">
  <h2>Key idea</h2>
  <p>
    Many structure models still inject amino-acid identities by default.
    ProtLOCA shows that, for structure alignment, sequence embeddings are <strong>not always helpful</strong> — dissimilar sequences can share folds, and similar sequences can diverge structurally, so type features can dilute the geometric signal.
  </p>
  <p>
    The model therefore encodes <strong>structure-only local geometry</strong> with roto-equivariant graph networks over backbone neighborhoods, without relying on residue-type embeddings for matching.
  </p>
</section>

<section class="project-section">
  <h2>What ProtLOCA evaluates</h2>
  <ul>
    <li><strong>Global matching on CATH</strong> — binary domain-pair similarity labels from CATH; ProtLOCA matches structurally consistent domains more quickly and accurately than common sequence- and structure-based baselines on held-out CATH-aligns benchmarks.</li>
    <li><strong>Local common-structure pairing</strong> — residue-level point matching that highlights shared local folds across proteins with <em>different</em> overall structures but the <em>same</em> function (e.g. DNA-binding motifs), where global aligners such as TM-align can miss the local correspondence.</li>
  </ul>
  <div class="project-callout">
    <p>
      Together, the two settings argue for geometry-first representation when the inference goal is structural homology rather than sequence identity.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use ProtLOCA, please cite:</p>
  <div class="project-cite">
{% raw %}<pre><code>@inproceedings{tan2024protloca,
  title={Protein representation learning with sequence information embedding: Does it always lead to a better performance?},
  author={Tan, Yang and Zheng, Lirong and Zhong, Bozitao and Hong, Liang and Zhou, Bingxin},
  booktitle={2024 IEEE International Conference on Bioinformatics and Biomedicine (BIBM)},
  pages={233--239},
  year={2024},
  organization={IEEE}
}</code></pre>{% endraw %}
  </div>
</section>
