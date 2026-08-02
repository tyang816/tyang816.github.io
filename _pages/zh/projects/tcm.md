---
permalink: /zh/projects/tcm/
title: 中医大模型资源 | TCM AI
layout: default
project: tcm
section: overview
lang: zh-CN
alt_url: /projects/tcm/
author_profile: true
redirect_from:
- /tcm/
- /zh/tcm/
- /zh/project/tcm/
description: 中医大模型（TCM LLM）开源资源导航：论文、模型、评测基准、数据集与产业动态，与 Awesome-TCM-LLM 同源更新。
seo_description: Curated Traditional Chinese Medicine LLM resources — open models,
  benchmarks, datasets, and news. 中医大模型资源列表。
keywords:
- 中医大模型
- TCM LLM
- Traditional Chinese Medicine
- benchmark
- Awesome-TCM-LLM
---

<header class="project-hero">
  <p class="project-kicker">大语言模型 · 资源导航</p>
  <h1>中医大模型</h1>
  <p class="project-lede">
    汇总中医 / 中医药大模型相关论文、开源权重、评测基准、数据集与产业动态，便于检索与引用。数据与 Awesome-TCM-LLM 同源维护。
  </p>
  <p class="project-authors">
    维护：谭扬 · GitHub README 与本页共用同一数据源
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">提交资源</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/Awesome-TCM-LLM/tree/main/survey" target="_blank" rel="noopener noreferrer">综述草稿</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/tcm/' | relative_url }}">English</a>
    <a class="project-btn project-btn--ghost" href="{{ '/zh/projects/' | relative_url }}">开源项目</a>
  </div>
</header>

<section class="project-section">
  <h2>你能找到什么</h2>
  <ul>
    <li>开源权重与多模态中医大模型系统</li>
    <li>中医 / 中医药相关评测基准</li>
    <li>预训练 / 微调数据集与知识图谱</li>
    <li>产品、政策与开源发布相关精选动态</li>
  </ul>
</section>

<section class="project-section">
  <h2>相关一作工作</h2>
  <p>
    <a href="{{ '/zh/projects/medchatzh/' | relative_url }}">MedChatZH</a>
    是基于 Baichuan-7B、面向中文医疗 / 中医问诊的微调模型，与本资源导航互补。
  </p>
</section>

<section class="project-section">
  <h2 id="tcm-heading-overview">资源目录</h2>
  <p id="tcm-updated" style="margin:4px 0 12px; opacity:0.8;"></p>
  <div id="tcm-stats" style="margin-bottom:12px;"></div>

  <h3 id="tcm-heading-filter">筛选与搜索</h3>
  <input id="tcm-search" type="search" placeholder="搜索名称 / 机构 / 标签…" style="min-width:220px; margin-bottom:8px;">

  <div id="tcm-filters" style="display:flex; gap:12px; align-items:center; flex-wrap:nowrap; overflow-x:auto; white-space:nowrap;">
    <label><span id="tcm-label-type">类型</span> <select id="tcm-filter-type"></select></label>
    <label><span id="tcm-label-year">年份</span> <select id="tcm-filter-year"></select></label>
    <label><span id="tcm-label-tag">标签</span> <select id="tcm-filter-tag"></select></label>
    <label><input type="checkbox" id="tcm-hide-general" checked> <span id="tcm-hide-general-label">隐藏通医（非中医主线）</span></label>
  </div>

  <div id="tcm-results" style="margin-top:16px;"></div>
</section>

<section class="project-section">
  <h2>贡献</h2>
  <p>
    可通过
    <a href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">GitHub Issue</a>
    提交资源；觉得有用请在
    <a href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    点 Star。英文界面：
    <a href="{{ '/projects/tcm/' | relative_url }}">/projects/tcm/</a>。
  </p>
</section>

<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"></script>
<script src="{{ '/assets/js/tcm-catalog.js' | relative_url }}"></script>
<script>TcmCatalog.boot('zh');</script>
