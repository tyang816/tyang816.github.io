---
permalink: /projects/tcm/
title: TCM AI Resources
layout: default
project: tcm
section: overview
lang: en
alt_url: /zh/projects/tcm/
author_profile: true
redirect_from:
- /pub/tcm/
- /tcm-en/
- /project/tcm/
description: TCM AI — curated Traditional Chinese Medicine LLM news and open resources (Awesome-TCM-LLM).
seo_description: Curated TCM LLM news hub — papers, models, surveys, datasets, and industry updates with filters.
keywords:
- TCM LLM
- Traditional Chinese Medicine
- Awesome-TCM-LLM
- benchmark
- dataset
---

<header class="project-hero">
  <p class="project-kicker">LLM · News hub</p>
  <h1>TCM AI</h1>
  <p class="project-lede">
    A living hub of Traditional Chinese Medicine large language model news, papers, surveys, open weights, and datasets. Synced with Awesome-TCM-LLM.
  </p>
  <p class="project-authors">
    Maintained by Yang Tan · one source of truth for the GitHub README and this page
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">Suggest a resource</a>
    <a class="project-btn project-btn--ghost" href="{{ '/zh/projects/tcm/' | relative_url }}">中文</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/' | relative_url }}">Open Projects</a>
  </div>
</header>

<section class="project-section">
  <h2>What you will find</h2>
  <ul>
    <li>Selected news on products, policy, and open releases</li>
    <li>Open-weight and multimodal TCM LLM systems</li>
    <li>Benchmarks, evaluation suites, and surveys</li>
    <li>Pretraining / SFT datasets and related resources</li>
  </ul>
</section>

<section class="project-section">
  <h2>Related first-author work</h2>
  <p>
    <a href="{{ '/projects/medchatzh/' | relative_url }}">MedChatZH</a>
    is a Baichuan-7B model fine-tuned for Chinese medical / TCM consultation — a concrete model release alongside this curated hub.
  </p>
</section>

<section class="project-section tcm-catalog-section">
  {% include tcm-hub.html %}
</section>

<section class="project-section">
  <h2>Contribute</h2>
  <p>
    Suggest a resource via
    <a href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">GitHub Issue</a>.
    Star the project on
    <a href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    if you find it useful.
    Chinese UI:
    <a href="{{ '/zh/projects/tcm/' | relative_url }}">/zh/projects/tcm/</a>.
  </p>
</section>
