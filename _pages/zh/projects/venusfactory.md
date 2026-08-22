---
permalink: /zh/projects/venusfactory/
title: VenusFactory
layout: default
project: venusfactory
section: overview
lang: zh-CN
alt_url: /projects/venusfactory/
author_profile: true
description: VenusFactory——一体化蛋白质工程系统（ACL Demo 2025），并由 VenusFactory2 扩展至 Web。
redirect_from:
- /zh/pub/venusfactory/
- /zh/project/venusfactory/
---

<header class="project-hero">
  <p class="project-kicker">ACL Demo 2025</p>
  <h1>VenusFactory</h1>
  <p class="project-lede">
    一体化蛋白质工程系统——生物数据检索、标准化任务评测与模块化语言模型微调集于同一开源工具链，现由 VenusFactory2 扩展至 Web。
  </p>
  <p class="project-authors">
    Yang Tan, Chen Liu, Jingyuan Gao, Banghao Wu, Mingchen Li, Ruilin Wang, Lingrong Zhang, Huiqun Yu, Guisheng Fan, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://aclanthology.org/2025.acl-demo.23/" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">演示</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusFactory" target="_blank" rel="noopener noreferrer">代码</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">VF2</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusfactory.png' | relative_url }}" alt="VenusFactory：数据检索与 PLM 微调的一体化蛋白质工程" loading="lazy">
  <figcaption>VenusFactory 统一数据检索、基准评测与模块化 PLM 微调，服务蛋白质工程工作流。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    蛋白质语言模型已改变计算蛋白科学，但跨学科落地常卡在数据收集、任务搭建与应用对接。
    VenusFactory 将生物数据检索、标准化评测与模块化微调纳入同一开源栈，同时面向 CS 与生物学用户。
  </p>
  <ul>
    <li><strong>命令行与无代码</strong>——脚本执行 + Gradio 交互界面。</li>
    <li><strong>覆盖面广</strong>——40+ 蛋白相关数据集与 40+ 主流 PLM。</li>
    <li><strong>工程工作流</strong>——集成 VenusX、VenusREM、ProSST、ProtSSN 等一作模型，贯通突变、功能与设计管线。</li>
  </ul>
</section>

<section class="project-section">
  <h2>VenusFactory2 Web 发布</h2>
  <p>
    <a href="{{ '/zh/projects/venusfactory2/' | relative_url }}">VenusFactory2</a>
    将工具链扩展为免费 Web 产品：访问
    <a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">venusfactory.bio</a>
    进行交互评分，技术报告见
    <a href="https://arxiv.org/abs/2603.27303" target="_blank" rel="noopener noreferrer">arXiv:2603.27303</a>。
  </p>
  <div class="project-callout">
    <p>
      VF2 将同一研究线——含 VenusX、VenusREM、ProSST、ProtSSN 及相关工具——封装为公共服务，湿实验与 ML 用户无需本地 GPU 即可运行工程工作流。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>相关一作模型</h2>
  <ul>
    <li><a href="{{ '/zh/projects/venusrem/' | relative_url }}">VenusREM</a>——检索增强零样本突变效应预测。</li>
    <li><a href="{{ '/zh/projects/prosst/' | relative_url }}">ProSST</a>——结构 token 蛋白质语言建模与解耦注意力。</li>
    <li><a href="{{ '/zh/projects/protssn/' | relative_url }}">ProtSSN</a>——结构–序列图网络适应度评分。</li>
    <li><a href="{{ '/zh/projects/venusx/' | relative_url }}">VenusX</a>——残基 / 片段 / 结构域细粒度功能理解。</li>
  </ul>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 VenusFactory，请引用 ACL Demo 论文：</p>
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
