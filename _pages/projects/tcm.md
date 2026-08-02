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
description: TCM AI — curated Traditional Chinese Medicine LLM resources (Awesome-TCM-LLM).
  English UI.
keywords:
- TCM LLM
- Traditional Chinese Medicine
- Awesome-TCM-LLM
- benchmark
---

<header class="project-hero">
  <p class="project-kicker">LLM · Resource hub</p>
  <h1>TCM AI</h1>
  <p class="project-lede">
    A living catalog of Traditional Chinese Medicine large language models — papers, open weights, benchmarks, datasets, and industry news. Synced with Awesome-TCM-LLM.
  </p>
  <p class="project-authors">
    Maintained by Yang Tan · one source of truth for the GitHub README and this page
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">Suggest a resource</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/Awesome-TCM-LLM/tree/main/survey" target="_blank" rel="noopener noreferrer">Survey draft</a>
    <a class="project-btn project-btn--ghost" href="{{ '/zh/projects/tcm/' | relative_url }}">中文</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/' | relative_url }}">Open Projects</a>
  </div>
</header>

<section class="project-section">
  <h2>What you will find</h2>
  <ul>
    <li>Open-weight and multimodal TCM LLM systems</li>
    <li>Benchmarks and evaluation suites for TCM / Chinese medicine</li>
    <li>Pretraining / SFT datasets and knowledge graphs</li>
    <li>Selected news on products, policy, and open releases</li>
  </ul>
</section>

<section class="project-section">
  <h2>Related first-author work</h2>
  <p>
    <a href="{{ '/projects/medchatzh/' | relative_url }}">MedChatZH</a>
    is a Baichuan-7B model fine-tuned for Chinese medical / TCM consultation — a concrete model release alongside this curated resource hub.
  </p>
</section>

<section class="project-section">
  <h2 id="tcm-heading-overview">Catalog</h2>
  <p id="tcm-updated" style="margin:4px 0 12px; opacity:0.8;"></p>
  <div id="tcm-stats" style="margin-bottom:12px;"></div>

  <h3 id="tcm-heading-filter">Filter and search</h3>
  <input id="tcm-search" type="search" placeholder="Search name / org / tag…" style="min-width:220px; margin-bottom:8px;">

  <div id="tcm-filters" style="display:flex; gap:12px; align-items:center; flex-wrap:nowrap; overflow-x:auto; white-space:nowrap;">
    <label><span id="tcm-label-type">Type</span> <select id="tcm-filter-type"></select></label>
    <label><span id="tcm-label-year">Year</span> <select id="tcm-filter-year"></select></label>
    <label><span id="tcm-label-tag">Tag</span> <select id="tcm-filter-tag"></select></label>
    <label><input type="checkbox" id="tcm-hide-general" checked> <span id="tcm-hide-general-label">Hide general-medical</span></label>
  </div>

  <div id="tcm-results" style="margin-top:16px;"></div>
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

<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"></script>
<script src="{{ '/assets/js/tcm-catalog.js' | relative_url }}"></script>
<script>TcmCatalog.boot('en');</script>
