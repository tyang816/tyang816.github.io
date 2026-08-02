---
permalink: /projects/venusrar/
title: VenusRAR
layout: default
project: venusrar
section: overview
lang: en
alt_url: /zh/projects/venusrar/
author_profile: true
redirect_from:
- /pub/venusrar/
- /project/venusrar/
description: 'VenusRAR (Rank-and-Reason): multi-agent collaboration for zero-shot
  protein mutation prediction (arXiv:2602.00197).'
---

<header class="project-hero">
  <p class="project-kicker">Agents · arXiv 2026</p>
  <h1>VenusRAR</h1>
  <p class="project-lede">
    Rank-and-Reason — a two-stage multi-agent framework that turns PLM ensembles into wet-lab-ready mutant shortlists, with biophysical chain-of-thought auditing.
  </p>
  <p class="project-authors">
    Yang Tan<sup>*</sup>, Yuanxi Yu<sup>*</sup>, Can Wu, Bozitao Zhong, Mingchen Li, Guisheng Fan, Jiankang Zhu, Yafeng Liang, Nanqing Dong, Liang Hong
    <br><span style="font-size:0.9em;">(* equal contribution)</span>
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://arxiv.org/abs/2602.00197" target="_blank" rel="noopener noreferrer">arXiv</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusRAR" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym</a>
  </div>
</header>

<section class="project-section">
  <h2>Problem</h2>
  <p>
    Zero-shot mutation predictors often return statistically confident rankings that still violate basic biophysical constraints.
    Selecting candidates for the wet lab then falls to manual expert review — slow, subjective, and hard to scale.
  </p>
</section>

<section class="project-section">
  <h2>Rank-and-Reason</h2>
  <p>VenusRAR automates that workflow in two stages:</p>
  <ul>
    <li><strong>Rank-Stage</strong> — a Computational Expert and Virtual Biologist aggregate a context-aware multi-modal ensemble of PLM signals, reaching Spearman <strong>ρ ≈ 0.551</strong> on ProteinGym (vs. 0.518 for the prior VenusREM-class baseline).</li>
    <li><strong>Reason-Stage</strong> — an agentic Expert Panel uses chain-of-thought reasoning to audit candidates against geometric and structural constraints, improving Top-5 Hit Rate by up to <strong>367%</strong> on ProteinGym-DMS99.</li>
  </ul>
  <div class="project-callout">
    <p>
      Wet-lab validation on Cas12i3 nuclease reported a <strong>46.7%</strong> positive rate (14/30), including novel mutants with <strong>4.23×</strong> and <strong>5.05×</strong> activity gains.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Relation to other Venus tools</h2>
  <p>
    VenusRAR sits above single-model scorers such as
    <a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a>,
    <a href="{{ '/projects/prosst/' | relative_url }}">ProSST</a>, and
    <a href="{{ '/projects/protssn/' | relative_url }}">ProtSSN</a>:
    it ensembles their signals, then applies LLM agents for biophysical triage.
    Deployment paths can go through
    <a href="{{ '/projects/venusfactory2/' | relative_url }}">VenusFactory2</a>.
  </p>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <div class="project-cite">
{% raw %}<pre><code>@misc{tan2026venusrar,
  title={Rank-and-Reason: Multi-Agent Collaboration Accelerates Zero-Shot Protein Mutation Prediction},
  author={Tan, Yang and Yu, Yuanxi and Wu, Can and Zhong, Bozitao and Li, Mingchen and Fan, Guisheng and Zhu, Jiankang and Liang, Yafeng and Dong, Nanqing and Hong, Liang},
  year={2026},
  eprint={2602.00197},
  archivePrefix={arXiv},
  primaryClass={q-bio.QM},
  url={https://arxiv.org/abs/2602.00197}
}</code></pre>{% endraw %}
  </div>
</section>
