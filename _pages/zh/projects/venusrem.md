---
permalink: /zh/projects/venusrem/
title: VenusREM
layout: default
project: venusrem
section: overview
lang: zh-CN
alt_url: /projects/venusrem/
author_profile: true
description: VenusREM：检索增强的突变效应预测（ISMB/ECCB 2025 / Bioinformatics）。
redirect_from:
- /zh/pub/venusrem/
- /zh/project/venusrem/
---

<header class="project-hero">
  <p class="project-kicker">ISMB/ECCB 2025 · Bioinformatics</p>
  <h1>VenusREM</h1>
  <p class="project-lede">
    检索增强的适应度预测，衔接高通量突变评估与湿实验定向进化——融合结构 / 序列蛋白质语言模型信号与显式 MSA 检索。
  </p>
  <p class="project-authors">
    Yang Tan, Ruilin Wang, Banghao Wu, Liang Hong, Bingxin Zhou
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://academic.oup.com/bioinformatics/article/41/Supplement_1/i401/8199374" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/VenusREM" target="_blank" rel="noopener noreferrer">代码</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/datasets/AI4Protein/VenusREM" target="_blank" rel="noopener noreferrer">数据集</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/venusrem/leaderboard/' | relative_url }}">排行榜</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/venusrem.png' | relative_url }}" alt="VenusREM 概览图" loading="lazy">
  <figcaption>VenusREM 将 PLM logits 与检索到的 MSA 上下文融合，用于零样本适应度预测。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    VenusREM 做<strong>零样本突变评分</strong>：给定野生型序列、结构与可选替换列表，无需实验特异微调即可估计相对适应度。
    结构与序列 PLM 信号结合 <strong>MSA 检索</strong>——同源比对以 EVCouplings <code>a2m</code> 或 ColabFold <code>a3m</code> 准备，随 VenusREM 数据集发布于 Hugging Face。
  </p>
  <p>
    同一推理路径支持 ProteinGym 规模评估与单蛋白湿实验：准备序列、结构、结构 token 与比对后运行 <code>compute_fitness.py</code>。
    设置 <code>--alpha 0</code> 可恢复无 MSA 重加权的 ProSST 风格分数，便于对照。
  </p>
</section>

<section class="project-section">
  <h2>结果</h2>
  <div class="project-callout">
    <p>
      2025 年 4 月在
      <a href="https://proteingym.org/benchmarks" target="_blank" rel="noopener noreferrer">ProteinGym Substitution</a>
      排行榜位列<strong>第 1</strong>；VenusMutHub 等相关套件亦表现强劲。
      家族对比见英文
      <a href="{{ '/projects/venusrem/leaderboard/' | relative_url }}">排行榜页</a>；官方实时排名以 ProteinGym 为准。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>相关工作</h2>
  <ul>
    <li><a href="{{ '/zh/projects/protssn/' | relative_url }}">ProtSSN</a>——氨基酸坐标上的几何编码（无需 MSA）。</li>
    <li><a href="{{ '/zh/projects/prosst/' | relative_url }}">ProSST</a>——局部结构 token 与解耦序列–结构注意力。</li>
    <li><strong>VenusREM</strong>——在结构感知 PLM 评分之上叠加显式 MSA 检索。</li>
  </ul>
  <p>
    三者互补：深度、信息丰富的比对可用时检索更有利；MSA 浅或构建成本高时，坐标 / token 级结构模型往往更合适。
    VenusREM 已集成进
    <a href="{{ '/zh/projects/venusfactory2/' | relative_url }}">VenusFactory2</a>
    （<a href="https://venusfactory.bio" target="_blank" rel="noopener noreferrer">venusfactory.bio</a>）。
  </p>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 VenusREM，请引用：</p>
  <div class="project-cite">
<pre><code>@article{tan2025venusrem,
    author = {Tan, Yang and Wang, Ruilin and Wu, Banghao and Hong, Liang and Zhou, Bingxin},
    title = {From high-throughput evaluation to wet-lab studies: advancing mutation effect prediction with a retrieval-enhanced model},
    journal = {Bioinformatics},
    volume = {41},
    number = {Supplement_1},
    pages = {i401-i409},
    year = {2025},
    doi = {10.1093/bioinformatics/btaf189}
}</code></pre>
  </div>
</section>
