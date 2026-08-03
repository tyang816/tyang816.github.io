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
description: 中医大模型（TCM LLM）新闻与开源资源汇聚：论文、模型、评测基准、数据集与产业动态，与 Awesome-TCM-LLM 同源更新。
seo_description: 中医大模型新闻汇聚与开源资源导航——论文、模型、综述、数据集与产业动态，支持类型/年份筛选。
keywords:
- 中医大模型
- TCM LLM
- Traditional Chinese Medicine
- 中医数据集
- Awesome-TCM-LLM
---

<header class="project-hero">
  <p class="project-kicker">大语言模型 · 新闻汇聚</p>
  <h1>中医大模型</h1>
  <p class="project-lede">
    汇聚中医 / 中医药大模型相关新闻、论文、综述、开源权重与数据集，支持筛选与检索。数据与 Awesome-TCM-LLM 同源维护。
  </p>
  <p class="project-authors">
    维护：谭扬 · GitHub README 与本页共用同一数据源
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">提交资源</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/tcm/' | relative_url }}">English</a>
    <a class="project-btn project-btn--ghost" href="{{ '/zh/projects/' | relative_url }}">开源项目</a>
  </div>
</header>

<section class="project-section">
  <h2>你能找到什么</h2>
  <ul>
    <li>产业动态、政策与产品发布相关精选新闻</li>
    <li>开源权重与多模态中医大模型系统</li>
    <li>中医 / 中医药相关评测基准与综述</li>
    <li>预训练 / 微调数据集与知识资源</li>
  </ul>
</section>

<section class="project-section">
  <h2>相关一作工作</h2>
  <p>
    <a href="{{ '/zh/projects/medchatzh/' | relative_url }}">MedChatZH</a>
    是基于 Baichuan-7B、面向中文医疗 / 中医问诊的微调模型，与本资源汇聚互补。
  </p>
</section>

<section class="project-section tcm-catalog-section">
  {% include tcm-hub.html %}
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
