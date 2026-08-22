---
permalink: /zh/projects/protssn/
title: ProtSSN
layout: default
project: protssn
section: overview
lang: zh-CN
alt_url: /projects/protssn/
author_profile: true
description: ProtSSN：面向生物活性与热稳定性的语义–几何蛋白质编码（eLife 2025）。
redirect_from:
- /zh/pub/protssn/
- /zh/project/protssn/
---

<header class="project-hero">
  <p class="project-kicker">eLife 2025 · 序列–结构 · 零样本</p>
  <h1>ProtSSN</h1>
  <p class="project-lede">
    语义与几何联合的蛋白质编码，提升生物活性与热稳定性预测。
    融合序列语义与几何结构——无需 MSA——用于零样本突变评分与定向进化。
  </p>
  <p class="project-authors">
    Yang Tan, Bingxin Zhou, Lirong Zheng, Guisheng Fan, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://elifesciences.org/articles/98033" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/ProtSSN" target="_blank" rel="noopener noreferrer">代码</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/tyang816/ProtSSN" target="_blank" rel="noopener noreferrer">模型</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/protssn/leaderboard/' | relative_url }}">排行榜</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/protssn.png' | relative_url }}" alt="ProtSSN：序列–结构融合的零样本蛋白质工程">
  <figcaption>ProtSSN 将 ESM2 序列编码器与 EGNN 结构适配器耦合，端到端完成零样本适应度预测。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    ProtSSN 将结构感知建模视为预训练蛋白质语言模型上的<strong>适配器</strong>：
    来自 <strong>ESM2</strong> 的残基嵌入由在局部 Cα 图上运行的 <strong>EGNN</strong> 精炼
    （邻域规模 <code>k</code> ∈ {10, 20, 30}），从而在一次前向中融合几何与序列语义。
  </p>
  <p>
    预训练在 CATH 结构域上采用<strong>去噪</strong>目标：残基被破坏后，网络在序列上下文与三维邻域条件下恢复氨基酸身份。
    推理时突变分数来自对数似然比——无需任务微调，也<strong>无需 MSA</strong>。
  </p>
  <div class="project-callout">
    <p>
      九个检查点覆盖 <code>k10/20/30</code> × <code>h512/768/1280</code>。
      单模型推荐 <strong>k20_h512</strong>；九模型集成可进一步提升 ProteinGym 相关性（集成 Spearman ρ ≈ 0.449），代价适中。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>结果与应用</h2>
  <p>
    输入为野生型 <strong>PDB</strong>（实验或预测）与突变表；无实验坐标时可使用 AlphaFold / ESMFold 或 AlphaFold Database。
    除 ProteinGym DMS 外，还在构建的 <strong>DTm</strong>、<strong>DDG</strong> 稳定性集合上评估，结构上下文尤为关键。
  </p>
  <ul>
    <li><a href="https://www.nature.com/articles/s41586-026-10156-9" target="_blank" rel="noopener noreferrer">Zheng 等，Nature 2026（CytoTape）</a>——单体重设计中的单点突变指导。</li>
    <li><a href="https://doi.org/10.1016/j.apsb.2025.03.028" target="_blank" rel="noopener noreferrer">Zhang 等，Acta Pharm. Sin. B 2025（VenusMutHub）</a>——数百个小规模实验上的结构感知零样本评分。</li>
    <li><a href="https://venusfactory.bio/" target="_blank" rel="noopener noreferrer">VenusFactory2</a>——开放工程工具链中的零样本突变评分。</li>
  </ul>
</section>

<section class="project-section">
  <h2>与 ProSST / VenusREM 的关系</h2>
  <ul>
    <li><strong>ProtSSN</strong>——有结构（或可折叠）、希望轻量 EGNN 适配 ESM2、偏好无 MSA 管线时的首选。</li>
    <li><strong><a href="{{ '/zh/projects/prosst/' | relative_url }}">ProSST</a></strong>——完整序列–结构 Transformer，带量化结构 token 与解耦注意力。</li>
    <li><strong><a href="{{ '/zh/projects/venusrem/' | relative_url }}">VenusREM</a></strong>——深度 MSA 可用、需要 ProteinGym Substitution 顶尖精度时的检索增强方案。</li>
  </ul>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>
    Tan et al. Semantical and geometrical protein encoding toward enhanced bioactivity and thermostability.
    <em>eLife</em> 2025;13:RP98033.
  </p>
  <div class="project-cite">
<pre><code>@article{tan2025protssn,
  article_type = {journal},
  title = {Semantical and geometrical protein encoding toward enhanced bioactivity and thermostability},
  author = {Tan, Yang and Zhou, Bingxin and Zheng, Lirong and Fan, Guisheng and Hong, Liang},
  editor = {Koo, Peter and Cui, Qiang},
  volume = 13,
  year = 2025,
  month = {may},
  pub_date = {2025-05-02},
  pages = {RP98033},
  citation = {eLife 2025;13:RP98033},
  doi = {10.7554/eLife.98033},
  url = {https://doi.org/10.7554/eLife.98033},
  journal = {eLife},
  issn = {2050-084X},
  publisher = {eLife Sciences Publications, Ltd},
}</code></pre>
  </div>
</section>
