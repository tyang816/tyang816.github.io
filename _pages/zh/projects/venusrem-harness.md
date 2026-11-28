---
permalink: /zh/projects/venusrem-harness/
title: VenusREM-Harness
layout: default
project: venusrem-harness
section: overview
lang: zh-CN
alt_url: /projects/venusrem-harness/
author_profile: true
description: VenusREM-Harness：免训练增强任意冻结蛋白质基础模型的适应度预测（arXiv:2609.34654）。
---

<header class="project-hero">
  <p class="project-kicker">适应度预测 · arXiv 2026</p>
  <h1>VenusREM-Harness</h1>
  <p class="project-lede">
    一个与具体模型无关、无需训练的通用框架，用家族进化证据和结构上下文改进任意冻结蛋白质基础模型的突变效应分数。
  </p>
  <p class="project-authors">
    Yang Tan, Qijia Tian, Gangyu Sun, Bozitao Zhong, Mingchen Li, Yuanxi Yu, Nanqing Dong, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://arxiv.org/abs/2609.34654" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusREM-Harness" target="_blank" rel="noopener noreferrer">代码</a>
    <a class="project-btn project-btn--ghost" href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusrem-harness.png' | relative_url }}" alt="VenusREM-Harness 框架图" loading="lazy">
  <figcaption>VenusREM-Harness 将冻结模型分数与 MSA 频率融合，再做门控背景校正和基于结构的位点加权。VenusREM2 是六个 ProSST 模型经该框架后的 z-score 平均。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    蛋白质基础模型已被广泛用于适应度预测，但它们会带上训练集里的氨基酸偏好，不可靠的输入还会进一步扭曲分数。
    VenusREM-Harness（VRH）不改动模型权重。它按模型不确定性把 MSA 证据融合进冻结分数，再用结构置信度和溶剂暴露做门控背景校正与分数收缩。
  </p>
  <p>
    同一套流程可以套在序列模型、逆折叠模型和结构感知模型上。<a href="{{ '/zh/projects/venusrem/' | relative_url }}">VenusREM</a> 是这一路线上更早的检索增强打分器；VRH 把这一思路推广到任意模型。
  </p>
</section>

<section class="project-section">
  <h2>结果</h2>
  <div class="project-callout">
    <p>
      在 ProteinGym、VenusMutHub 和新整理的病毒基准 VenusViroHub 上，共 <strong>1,211</strong> 个实验、<strong>310 万</strong> 个已测突变。全部 <strong>71</strong> 种配置在三个基准上的 Spearman 相关都有提升，平均提高 <strong>0.073</strong>。
    </p>
  </div>
  <p>
    用该框架处理六个 ProSST 模型并平均 z-score 得到的 VenusREM2，是第一个在功能、物种、MSA 深度和突变深度全部分类中都排名第一的方法。ProteinGym 平均 Spearman 为 <strong>0.556</strong>，比此前最好结果高 <strong>0.038</strong>。
  </p>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>如果使用 VenusREM-Harness 或 VenusREM2，请引用：</p>
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
