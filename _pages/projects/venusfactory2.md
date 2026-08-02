---
permalink: /projects/venusfactory2/
title: VenusFactory2
layout: default
project: venusfactory2
section: overview
lang: en
alt_url: /zh/projects/venusfactory2/
author_profile: true
redirect_from:
- /pub/venusfactory2/
- /project/venusfactory2/
description: VenusFactory2 — agent-ready web platform for protein engineering (arXiv:2603.27303).
---

<header class="project-hero">
  <p class="project-kicker">Platform · arXiv 2026</p>
  <h1>VenusFactory2</h1>
  <p class="project-lede">
    Self-evolving AI agents for protein discovery and directed evolution — a free web platform that orchestrates data, tools, and Venus / Prot* models in the browser.
  </p>
  <p class="project-authors">
    Yang Tan, Lingrong Zhang, Mingchen Li, Yuanxi Yu, Bozitao Zhong, Bingxin Zhou, Nanqing Dong, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">Web demo</a>
    <a class="project-btn project-btn--ghost" href="https://arxiv.org/abs/2603.27303" target="_blank" rel="noopener noreferrer">Tech report</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">Code</a>
  </div>
</header>

<section class="project-section">
  <h2>What VenusFactory2 adds</h2>
  <p>
    The original <a href="{{ '/projects/venusfactory/' | relative_url }}">VenusFactory</a> (ACL Demo 2025) packaged data retrieval and PLM fine-tuning as an open toolkit.
    VenusFactory2 turns that stack into a <strong>free web product</strong> with playgrounds, APIs, and agent-oriented interfaces — so wet-lab and computational users can score mutants, run benchmarks, and call models without assembling local environments.
  </p>
  <ul>
    <li>Browser access at <a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">venusfactory.bio</a></li>
    <li>Interactive playground for fitness / engineering tasks</li>
    <li>Integration of VenusX, VenusREM, ProSST, ProtSSN and related checkpoints</li>
    <li>Technical report: <a href="https://arxiv.org/abs/2603.27303" target="_blank" rel="noopener noreferrer">arXiv:2603.27303</a></li>
  </ul>
</section>

<section class="project-section">
  <h2>Integrated methods</h2>
  <p>Models and benchmarks wired into the platform include:</p>
  <ul>
    <li><a href="{{ '/projects/venusx/' | relative_url }}">VenusX</a> — fine-grained functional benchmark</li>
    <li><a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a> — retrieval-enhanced mutation scoring</li>
    <li><a href="{{ '/projects/prosst/' | relative_url }}">ProSST</a> / <a href="{{ '/projects/protssn/' | relative_url }}">ProtSSN</a> — sequence–structure PLMs</li>
    <li><a href="{{ '/projects/venusrar/' | relative_url }}">VenusRAR</a> — agentic rank-and-reason selection (companion line)</li>
  </ul>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use VenusFactory2, please cite the technical report:</p>
  <div class="project-cite">
{% raw %}<pre><code>@misc{tan2026venusfactory2,
  title={Self-evolving AI agents for protein discovery and directed evolution},
  author={Tan, Yang and Zhang, Lingrong and Li, Mingchen and Yu, Yuanxi and Zhong, Bozitao and Zhou, Bingxin and Dong, Nanqing and Hong, Liang},
  year={2026},
  eprint={2603.27303},
  archivePrefix={arXiv},
  primaryClass={q-bio.QM},
  url={https://arxiv.org/abs/2603.27303}
}</code></pre>{% endraw %}
  </div>
  <p>
    For the ACL Demo toolkit paper, see the
    <a href="{{ '/projects/venusfactory/' | relative_url }}">VenusFactory</a> page.
  </p>
</section>
