---
permalink: /zh/projects/ses-adapter/
title: SES-Adapter
layout: default
project: ses-adapter
section: overview
lang: zh-CN
alt_url: /projects/ses-adapter/
author_profile: true
description: SES-Adapter：简洁、高效、可扩展的结构感知适配器，增强蛋白质语言模型（JCIM 2024）。
redirect_from:
- /zh/pub/ses-adapter/
- /zh/project/ses-adapter/
---

<header class="project-hero">
  <p class="project-kicker">Journal of Chemical Information and Modeling 2024</p>
  <h1>SES-Adapter</h1>
  <p class="project-lede">
    面向蛋白质语言模型的简洁、高效、可扩展结构感知适配器——序列化结构、跨模态注意力，更快微调并获得更强下游精度。
  </p>
  <p class="project-authors">
    Yang Tan, Mingchen Li, Bingxin Zhou, Bozitao Zhong, Lirong Zheng, Pan Tan, Ziyi Zhou, Huiqun Yu, Guisheng Fan, Liang Hong
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://pubs.acs.org/doi/10.1021/acs.jcim.4c00689" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/SES-Adapter" target="_blank" rel="noopener noreferrer">代码</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/ses-adapter.png' | relative_url }}" alt="SES-Adapter：结构序列化与 PLM 跨模态注意力" loading="lazy">
  <figcaption>SES-Adapter 通过跨模态注意力将序列化结构 token 注入 PLM，无需重设骨干网络。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    纯序列 PLM 迁移能力已很强，但定位、功能、溶解度、注释等标签仍常受益于<strong>三维上下文</strong>。
    完整结构感知预训练代价高；重型融合架构也难跨异构 PLM 家族扩展。
  </p>
  <p>
    SES-Adapter 将结构视为轻量<strong>适配器</strong>：保留冻结（或轻度更新）的 PLM，把几何信息序列化为并行 token 流，并在微调阶段用<strong>跨模态注意力</strong>混合结构与序列嵌入。
  </p>
  <ol>
    <li><strong>序列化</strong>局部结构上下文为离散结构 token（兼容多种结构分词器，含仓库中的 ESM3 路径）。</li>
    <li>用 PLM 得到残基嵌入。</li>
    <li>在结构 token 与 PLM 状态间做<strong>跨模态注意力</strong>，使几何引导下游头表征。</li>
  </ol>
</section>

<section class="project-section">
  <h2>结果</h2>
  <p>
    评测覆盖 <strong>9 个 PLM</strong>（含 ESM2、ProtBert、ProtT5、Ankh 等）× <strong>9 个数据集</strong> × <strong>4 类任务</strong>：定位、功能、溶解度、注释。
  </p>
  <div class="project-callout">
    <p>
      相对普通 PLM 微调，SES-Adapter 下游性能最高提升 <strong>+11%</strong>（平均 <strong>+3%</strong>），
      训练加速最高 <strong>+1034%</strong>（平均 <strong>+362%</strong>），收敛约快 <strong>2×</strong>。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>使用</h2>
  <p>
    <a href="https://github.com/tyang816/SES-Adapter" target="_blank" rel="noopener noreferrer">tyang816/SES-Adapter</a>
    提供数据集配置、训练脚本与指标（accuracy、F1、MCC、AUROC、Spearman、多标签 <code>f1_max</code>）。
    将 JSON/CSV 指向划分或 Hugging Face 数据集 id，选择骨干后运行 <code>train.py</code>。
    硬件上 <strong>24&nbsp;GB</strong> GPU（如 RTX 3090）为实用基线；显存主要随所选 PLM 规模变化。
  </p>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 SES-Adapter，请引用：</p>
  <div class="project-cite">
<pre><code>@article{tan2024ses-adapter,
  title={Simple, Efficient, and Scalable Structure-Aware Adapter Boosts Protein Language Models},
  author={Tan, Yang and Li, Mingchen and Zhou, Bingxin and Zhong, Bozitao and Zheng, Lirong and Tan, Pan and Zhou, Ziyi and Yu, Huiqun and Fan, Guisheng and Hong, Liang},
  journal={Journal of Chemical Information and Modeling},
  volume={64},
  number={16},
  pages={6338-6349},
  year={2024},
  publisher={American Chemical Society},
  doi={10.1021/acs.jcim.4c00689}
}</code></pre>
  </div>
</section>
