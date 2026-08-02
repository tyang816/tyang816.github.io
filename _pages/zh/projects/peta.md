---
permalink: /zh/projects/peta/
title: PETA
layout: default
project: peta
section: overview
lang: zh-CN
alt_url: /projects/peta/
author_profile: true
description: PETA：子词分词对蛋白质迁移学习下游应用影响的系统评估（Journal of Cheminformatics 2024）。
redirect_from:
- /zh/project/peta/
---

<header class="project-hero">
  <p class="project-kicker">Journal of Cheminformatics 2024</p>
  <h1>PETA</h1>
  <p class="project-lede">
    系统研究子词分词——BPE 与 Unigram 相对逐氨基酸词表——如何塑造蛋白质预训练及其向下游应用的迁移。
  </p>
  <p class="project-authors">
    Yang Tan, Mingchen Li, Ziyi Zhou, Pan Tan, Huiqun Yu, Guisheng Fan, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://link.springer.com/article/10.1186/s13321-024-00884-3" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/mingchen-li/ProteinPretraining" target="_blank" rel="noopener noreferrer">代码</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/peta.png' | relative_url }}" alt="PETA：蛋白质迁移学习中的子词分词" loading="lazy">
  <figcaption>PETA 在匹配的预训练与微调协议下，比较逐残基与子词蛋白质分词器。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    多数蛋白质语言模型<strong>按氨基酸逐个</strong>分词。选择简单且符合生物学直觉，却忽略了 NLP 的教训：
    <strong>子词单元</strong>可压缩重复基序、改变上下文长度，并改写 Masked LM 所学表征。
  </p>
  <p>
    PETA 在架构与预训练预算大致固定时，比较不同规模的 BPE / Unigram 词表与经典逐 AA 分词器在真实下游蛋白任务上的表现。
    项目在 Hugging Face 发布系列 Masked LM 检查点（<code>AI4Protein/deep_*</code>）：
  </p>
  <ul>
    <li><strong>逐 AA 基线</strong>——<code>AI4Protein/deep_base</code>（词表 33）</li>
    <li><strong>BPE</strong>——词表 50 → 3200（<code>deep_bpe_*</code>）</li>
    <li><strong>Unigram</strong>——词表 50 → 3200（<code>deep_unigram_*</code>）</li>
  </ul>
</section>

<section class="project-section">
  <h2>结果</h2>
  <p>
    除发布预训练模型外，PETA 提供微调脚手架（<code>peta/train.py</code>）：选择数据划分、池化头、精度，以及全骨干或仅头微调。
  </p>
  <div class="project-callout">
    <p>
      结论偏评估性而非“永久最佳分词器”：子词方案改变序列压缩与归纳偏置，对迁移的影响依赖任务与词表规模——PETA 提供可控对照以度量该权衡。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 PETA，请引用：</p>
  <div class="project-cite">
<pre><code>@article{tan2024peta,
  title={PETA: evaluating the impact of protein transfer learning with sub-word tokenization on downstream applications},
  author={Tan, Yang and Li, Mingchen and Zhou, Ziyi and Tan, Pan and Yu, Huiqun and Fan, Guisheng and Hong, Liang},
  journal={Journal of Cheminformatics},
  volume={16},
  number={1},
  pages={92},
  year={2024},
  publisher={Springer},
  doi={10.1186/s13321-024-00884-3}
}</code></pre>
  </div>
</section>
