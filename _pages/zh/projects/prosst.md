---
permalink: /zh/projects/prosst/
title: ProSST
layout: default
project: prosst
section: overview
lang: zh-CN
alt_url: /projects/prosst/
author_profile: true
description: ProSST：量化结构与解耦注意力的蛋白质语言建模（NeurIPS 2024）。
redirect_from:
- /zh/pub/prosst/
- /zh/project/prosst/
---

<header class="project-hero">
  <p class="project-kicker">NeurIPS 2024</p>
  <h1>ProSST</h1>
  <p class="project-lede">
    带量化结构与解耦注意力的蛋白质语言建模——面向表征学习与零样本突变评分的序列–结构预训练 Transformer。
  </p>
  <p class="project-authors">
    Mingchen Li<sup>*</sup>, Yang Tan<sup>*</sup>, Xinzhu Ma, Bozitao Zhong, Huiqun Yu, Ziyi Zhou, Wanli Ouyang, Bingxin Zhou, Pan Tan, Liang Hong
    <br><span style="font-size:0.9em;">（* 共同一作）</span>
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://proceedings.neurips.cc/paper_files/paper/2024/file/3ed57b293db0aab7cc30c44f45262348-Paper-Conference.pdf" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/ai4protein/ProSST" target="_blank" rel="noopener noreferrer">代码</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/AI4Protein/ProSST-2048" target="_blank" rel="noopener noreferrer">模型</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/prosst/leaderboard/' | relative_url }}">排行榜</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/prosst.png' | relative_url }}" alt="ProSST：结构量化与氨基酸–结构 token 解耦注意力">
  <figcaption>ProSST 在 Masked LM 目标下，将离散结构 token 与氨基酸序列联合建模，并采用解耦注意力。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    多数蛋白质语言模型只看见氨基酸序列；结构常在后期以连续坐标、图或手工特征注入，既难扩展也不易与序列 Transformer 融合。
    ProSST 将结构转为并行的离散 token 流，并预训练同时关注两条序列的 Masked Language Model。
  </p>
  <p>
    由 PDB（或 AlphaFold）结构出发，结构量化器把局部几何映射为离散结构 token——相当于结构“词表”。
    已发布词表规模 <strong>20 / 128 / 512 / 1024 / 2048 / 4096</strong>；每个残基对应一个与氨基酸对齐的结构 token。
    实践中推荐 <strong>ProSST-2048</strong> 作为 ProteinGym 风格零样本评分的默认检查点。
  </p>
</section>

<section class="project-section">
  <h2>解耦注意力与零样本评分</h2>
  <p>
    氨基酸与结构 token 携带相关但不同的信号。ProSST 使用<em>解耦注意力</em>，分别沿序列模态与结构模态建模内容交互，而非混入单一 token 流。
    加载 Hugging Face 检查点，将野生型序列与结构 token 一并分词，即可用对数似然比进行突变评分。
  </p>
  <div class="project-cite">
<pre><code>from transformers import AutoModelForMaskedLM, AutoTokenizer

model = AutoModelForMaskedLM.from_pretrained(
    "AI4Protein/ProSST-2048", trust_remote_code=True
)
tokenizer = AutoTokenizer.from_pretrained(
    "AI4Protein/ProSST-2048", trust_remote_code=True
)</code></pre>
  </div>
  <div class="project-callout">
    <p>
      检查点系列见
      <a href="https://huggingface.co/AI4Protein?search_models=ProSST" target="_blank" rel="noopener noreferrer">AI4Protein/ProSST-*</a>。
      后续工作
      <a href="{{ '/zh/projects/venusrem/' | relative_url }}">VenusREM</a>
      在同一结构感知基础上引入 MSA 检索，并领跑 ProteinGym Substitution；
      亦可在
      <a href="https://venusfactory.bio/" target="_blank" rel="noopener noreferrer">VenusFactory2</a>
      中直接调用。
    </p>
  </div>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 ProSST，请引用：</p>
  <div class="project-cite">
<pre><code>@inproceedings{li2024prosst,
  title={ProSST: Protein Language Modeling with Quantized Structure and Disentangled Attention},
  author={Li, Mingchen and Tan, Yang and Ma, Xinzhu and Zhong, Bozitao and Yu, Huiqun and Zhou, Ziyi and Ouyang, Wanli and Zhou, Bingxin and Tan, Pan and Hong, Liang},
  booktitle={Advances in Neural Information Processing Systems},
  year={2024}
}</code></pre>
  </div>
</section>
