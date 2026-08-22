---
permalink: /zh/projects/venusfactory2/
title: VenusFactory2
layout: default
project: venusfactory2
section: overview
lang: zh-CN
alt_url: /projects/venusfactory2/
author_profile: true
description: VenusFactory2——面向蛋白质工程的智能体就绪 Web 平台（arXiv:2603.27303）。
redirect_from:
- /zh/pub/venusfactory2/
- /zh/project/venusfactory2/
---

<header class="project-hero">
  <p class="project-kicker">平台 · arXiv 2026</p>
  <h1>VenusFactory2</h1>
  <p class="project-lede">
    面向蛋白质发现与定向进化的自进化 AI 智能体——免费 Web 平台，在浏览器中编排数据、工具与 Venus / Prot* 模型。
  </p>
  <p class="project-authors">
    Yang Tan, Lingrong Zhang, Mingchen Li, Yuanxi Yu, Bozitao Zhong, Bingxin Zhou, Nanqing Dong, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">演示</a>
    <a class="project-btn project-btn--ghost" href="https://arxiv.org/abs/2603.27303" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusFactory2" target="_blank" rel="noopener noreferrer">代码</a>
  </div>
</header>

<section class="project-section">
  <h2>方法</h2>
  <p>
    原版
    <a href="{{ '/zh/projects/venusfactory/' | relative_url }}">VenusFactory</a>
    （ACL Demo 2025）将数据检索与 PLM 微调打包为开源工具链。
    VenusFactory2 将其升级为<strong>免费 Web 产品</strong>，提供 playground、API 与面向智能体的接口——湿实验与计算用户无需搭建本地环境即可评分突变、跑基准并调用模型。
  </p>
  <ul>
    <li>浏览器访问 <a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">venusfactory.bio</a></li>
    <li>适应度 / 工程任务的交互 playground</li>
    <li>集成 VenusX、VenusREM、ProSST、ProtSSN 及相关检查点</li>
    <li>技术报告：<a href="https://arxiv.org/abs/2603.27303" target="_blank" rel="noopener noreferrer">arXiv:2603.27303</a></li>
  </ul>
</section>

<section class="project-section">
  <h2>集成方法</h2>
  <p>平台接入的模型与基准包括：</p>
  <ul>
    <li><a href="{{ '/zh/projects/venusx/' | relative_url }}">VenusX</a>——细粒度功能基准</li>
    <li><a href="{{ '/zh/projects/venusrem/' | relative_url }}">VenusREM</a>——检索增强突变评分</li>
    <li><a href="{{ '/zh/projects/prosst/' | relative_url }}">ProSST</a> / <a href="{{ '/zh/projects/protssn/' | relative_url }}">ProtSSN</a>——序列–结构 PLM</li>
    <li><a href="{{ '/zh/projects/venusrar/' | relative_url }}">VenusRAR</a>——智能体 Rank-and-Reason 筛选（同线工作）</li>
  </ul>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 VenusFactory2，请引用技术报告：</p>
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
    ACL Demo 工具链论文见
    <a href="{{ '/zh/projects/venusfactory/' | relative_url }}">VenusFactory</a>。
  </p>
</section>
