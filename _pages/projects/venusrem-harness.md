---
permalink: /projects/venusrem-harness/
title: VenusREM-Harness
layout: default
project: venusrem-harness
section: overview
lang: en
alt_url: /zh/projects/venusrem-harness/
author_profile: true
description: 'VenusREM-Harness: a training-free harness that improves fitness prediction for any frozen protein foundation model (arXiv:2609.34654).'
---

<header class="project-hero">
  <p class="project-kicker">Fitness · arXiv 2026</p>
  <h1>VenusREM-Harness</h1>
  <p class="project-lede">
    A general, model-agnostic, training-free harness that improves mutation-effect scores from any frozen protein foundation model, using family-specific evolutionary evidence and structural context.
  </p>
  <p class="project-authors">
    Yang Tan, Qijia Tian, Gangyu Sun, Bozitao Zhong, Mingchen Li, Yuanxi Yu, Nanqing Dong, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://arxiv.org/abs/2609.34654" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusREM-Harness" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusrem-harness.png' | relative_url }}" alt="VenusREM-Harness framework" loading="lazy">
  <figcaption>VenusREM-Harness fuses frozen model scores with MSA frequencies, then applies gated background correction and structure-based site weighting. VenusREM2 is an ensemble of six ProSST models passed through the harness.</figcaption>
</figure>

<section class="project-section">
  <h2>What the harness does</h2>
  <p>
    Protein foundation models (PFMs) are widely used for fitness prediction, but they share amino-acid preferences inherited from their training corpora, and unreliable inputs can further distort scores.
    VenusREM-Harness (VRH) leaves the PFM frozen. It is <strong>model-agnostic and training-free</strong>: MSA evidence is mixed in according to model uncertainty, then gated background correction and score shrinkage use structural confidence and solvent exposure as additional constraints.
  </p>
  <p>
    The same procedure applies to sequence models, inverse-folding models, and structure-aware models. <a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a> is the earlier retrieval-enhanced scorer this line builds on; VRH generalizes that idea beyond one model.
  </p>
</section>

<section class="project-section">
  <h2>Results</h2>
  <div class="project-callout">
    <p>
      Across <strong>1,211 assays</strong> and <strong>3.1 million</strong> measured variants from ProteinGym, VenusMutHub, and the new viral benchmark VenusViroHub, all <strong>71</strong> tested configurations improve Spearman correlation on all three benchmarks, by <strong>0.073</strong> on average.
    </p>
  </div>
  <p>
    VenusREM2, built by passing six ProSST models through the harness and averaging z-scored outputs, is the first method to rank first in every function, taxon, MSA-depth, and mutation-depth category on ProteinGym, with Average Spearman <strong>0.556</strong> — <strong>0.038</strong> above the previous best.
  </p>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use VenusREM-Harness or VenusREM2, please cite:</p>
  <div class="project-cite">
{% raw %}<pre><code>@misc{tan2026venusremharness,
  title={A General Harness for Protein Foundation Model Fitness Prediction},
  author={Tan, Yang and Tian, Qijia and Sun, Gangyu and Zhong, Bozitao and Li, Mingchen and Yu, Yuanxi and Dong, Nanqing and Hong, Liang},
  year={2026},
  eprint={2609.34654},
  archivePrefix={arXiv},
  primaryClass={q-bio.QM},
  url={https://arxiv.org/abs/2609.34654}
}</code></pre>{% endraw %}
  </div>
</section>
