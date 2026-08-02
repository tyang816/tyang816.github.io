---
permalink: /projects/venusfactory/
title: VenusFactory
layout: default
project: venusfactory
section: overview
lang: en
alt_url: /zh/projects/venusfactory/
author_profile: true
redirect_from:
- /pub/venusfactory/
- /project/venusfactory/
description: VenusFactory — integrated protein engineering system (ACL Demo 2025)
  and VenusFactory2 web release.
---

<header class="project-hero">
  <p class="project-kicker">ACL Demo 2025</p>
  <h1>VenusFactory</h1>
  <p class="project-lede">
    An integrated system for protein engineering — biological data retrieval, standardized task benchmarking, and modular language-model fine-tuning in one open toolkit, now extended by VenusFactory2 on the web.
  </p>
  <p class="project-authors">
    Yang Tan, Chen Liu, Jingyuan Gao, Banghao Wu, Mingchen Li, Ruilin Wang, Lingrong Zhang, Huiqun Yu, Guisheng Fan, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://aclanthology.org/2025.acl-demo.23/" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">Demo</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusFactory" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">VF2</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusfactory.png' | relative_url }}" alt="VenusFactory: integrated protein engineering with data retrieval and PLM fine-tuning" loading="lazy">
  <figcaption>VenusFactory unifies data retrieval, benchmarking, and modular PLM fine-tuning for protein engineering workflows.</figcaption>
</figure>

<section class="project-section">
  <h2>What VenusFactory does</h2>
  <p>
    Protein language models (PLMs) have transformed computational protein science, yet interdisciplinary adoption often stalls on data collection, task setup, and application plumbing.
    VenusFactory is a versatile engine that closes that gap: it brings biological data retrieval, standardized task benchmarking, and modular fine-tuning into a single open stack for both CS and biology users.
  </p>
  <ul>
    <li><strong>Command-line and no-code</strong> — scripted execution plus a Gradio interface for interactive work.</li>
    <li><strong>Broad coverage</strong> — 40+ protein-related datasets and 40+ popular PLMs under one roof.</li>
    <li><strong>Engineering workflows</strong> — integrates first-author models such as VenusX, VenusREM, ProSST, and ProtSSN for end-to-end mutation, function, and design pipelines.</li>
  </ul>
</section>

<section class="project-section">
  <h2>Data retrieval &amp; fine-tuning</h2>
  <p>
    VenusFactory treats data and training as first-class parts of the engineering loop rather than afterthoughts:
  </p>
  <ul>
    <li><strong>Data retrieval</strong> — pull and organize protein datasets for common engineering and benchmarking tasks without ad-hoc scraping scripts.</li>
    <li><strong>Standardized benchmarking</strong> — run comparable evaluations across models and tasks with shared conventions.</li>
    <li><strong>Modular fine-tuning</strong> — adapt PLMs to downstream objectives through reusable training modules instead of one-off notebooks.</li>
  </ul>
  <p>
    The ACL Demo release focuses on this integrated path from data to fine-tuned models; open-source code lives at
    <a href="https://github.com/ai4protein/VenusFactory" target="_blank" rel="noopener noreferrer">ai4protein/VenusFactory</a>.
  </p>
</section>

<section class="project-section">
  <h2>VenusFactory2 — free web release</h2>
  <p>
    <a href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">VenusFactory2</a> extends the toolkit into a free web product for browser-based protein engineering.
    Use the site at <a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">venusfactory.bio</a>, and read the technical report on
    <a href="https://arxiv.org/abs/2603.27303" target="_blank" rel="noopener noreferrer">arXiv:2603.27303</a>.
  </p>
  <div class="project-callout">
    <p>
      VF2 packages the same research line — including VenusX, VenusREM, ProSST, ProtSSN, and related tools — into a public web stack so wet-lab and ML users can run engineering workflows without local GPU setup.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Related first-author models</h2>
  <p>
    VenusFactory and VenusFactory2 integrate complementary models from the same research line:
  </p>
  <ul>
    <li><a href="{{ '/projects/venusrem/' | relative_url }}">VenusREM</a> — retrieval-enhanced zero-shot mutation effect prediction.</li>
    <li><a href="{{ '/projects/prosst/' | relative_url }}">ProSST</a> — structure-token protein language modeling with disentangled attention.</li>
    <li><a href="{{ '/projects/protssn/' | relative_url }}">ProtSSN</a> — structure–sequence graph networks for fitness scoring.</li>
    <li><a href="{{ '/projects/venusx/' | relative_url }}">VenusX</a> — fine-grained functional understanding at residue, fragment, and domain levels.</li>
  </ul>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use VenusFactory, please cite the ACL Demo paper:</p>
  <div class="project-cite">
{% raw %}<pre><code>@inproceedings{tan-etal-2025-venusfactory,
    title = "{V}enus{F}actory: An Integrated System for Protein Engineering with Data Retrieval and Language Model Fine-Tuning",
    author = "Tan, Yang  and
      Liu, Chen  and
      Gao, Jingyuan  and
      Wu, Banghao  and
      Li, Mingchen  and
      Wang, Ruilin  and
      Zhang, Lingrong  and
      Yu, Huiqun  and
      Fan, Guisheng  and
      Hong, Liang  and
      Zhou, Bingxin",
    booktitle = "Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 3: System Demonstrations)",
    month = jul,
    year = "2025",
    address = "Vienna, Austria",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2025.acl-demo.23/",
    doi = "10.18653/v1/2025.acl-demo.23",
    pages = "230--241"
}</code></pre>{% endraw %}
  </div>
</section>
