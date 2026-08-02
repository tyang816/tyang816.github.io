---
permalink: /projects/medchatzh/
title: MedChatZH
layout: default
project: medchatzh
section: overview
lang: en
alt_url: /zh/projects/medchatzh/
author_profile: true
redirect_from:
- /pub/medchatzh/
- /project/medchatzh/
description: 'MedChatZH: a tuning LLM for traditional Chinese medicine consultations
  (Computers in Biology and Medicine 2024).'
---

<header class="project-hero">
  <p class="project-kicker">Computers in Biology and Medicine 2024</p>
  <h1>MedChatZH</h1>
  <p class="project-lede">
    A Chinese medical consultation LLM fine-tuned from Baichuan-7B on traditional Chinese medicine (TCM) books and medical instruction dialogues — built to understand TCM-style questions in clinical Q&amp;A.
  </p>
  <p class="project-authors">
    Yang Tan, Zhixing Zhang, Mingchen Li, Fei Pan, Hao Duan, Zijie Huang, Hua Deng, Zhuohang Yu, Chen Yang, Guoyang Shen, Peng Qi, Chengyuan Yue, Yuxian Liu, Liang Hong, Huiqun Yu, Guisheng Fan, Yun Tang
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://doi.org/10.1016/j.compbiomed.2024.108290" target="_blank" rel="noopener noreferrer">Paper</a>
    <a class="project-btn project-btn--ghost" href="https://www.researchgate.net/profile/Yang-Tan-33/publication/378954165_MedChatZH_A_tuning_LLM_for_traditional_Chinese_medicine_consultations/links/665fddc716dcf74fcec20c20/MedChatZH-A-tuning-LLM-for-traditional-Chinese-medicine-consultations.pdf" target="_blank" rel="noopener noreferrer">PDF</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">Code</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">Model</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/datasets/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">Dataset</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/medchatzh.png' | relative_url }}" alt="MedChatZH overview: Chinese medical and TCM consultation LLM" loading="lazy">
  <figcaption>MedChatZH adapts Baichuan-7B with TCM literature and large-scale medical instruction data for Chinese clinical dialogue.</figcaption>
</figure>

<section class="project-section">
  <h2>What MedChatZH is</h2>
  <p>
    General-purpose Chinese LLMs often struggle with <strong>traditional Chinese medicine</strong> terminology, syndrome-style reasoning, and patient-facing consultation tone.
    MedChatZH starts from <strong>Baichuan-7B</strong> and continues training on TCM book corpora plus curated medical instruction dialogues so the model can answer Chinese medical questions — including TCM-oriented ones — in a conversational setting.
  </p>
  <p>
    Weights, inference scripts, and a simple web interface are released with the
    <a href="https://github.com/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">GitHub repo</a>;
    the 7B checkpoint lives on
    <a href="https://huggingface.co/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">Hugging Face</a>.
  </p>
</section>

<section class="project-section">
  <h2>Data scale</h2>
  <p>
    From roughly 7M raw dialogues, the release keeps two cleaned instruction packs on
    <a href="https://huggingface.co/datasets/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">Hugging Face Datasets</a>:
  </p>
  <ul>
    <li><strong>764k</strong> high-quality medical instruction dialogues</li>
    <li><strong>2M</strong> mixed medical / general dialogues for broader conversational coverage</li>
  </ul>
  <p>
    Together with TCM book text, these corpora supply both domain knowledge and instruction-following behavior for consultation-style generation.
  </p>
</section>

<section class="project-section">
  <h2>Example dialogue</h2>
  <p>A short interactive exchange (from the project README):</p>
  <div class="project-cite">
<pre><code>User: 你好
MedChatZH: 你好，有什么我可以帮助你的吗？

User: 请问孩子肚子疼怎么办
MedChatZH: 如果孩子的疼痛不是很严重的话，您可以先观察一下他的症状。
如果他只是轻微的腹痛和腹泻，那么您可以给他喝些温水或者淡盐水来缓解不适感。
但是如果孩子的疼痛非常剧烈或持续时间较长，建议及时就医以确定病因并进行治疗。
同时，注意给孩子提供清淡易消化的食物，避免食用过于油腻、辛辣等刺激性食品。</code></pre>
  </div>
  <p>
    The paper and README also report longer TCM-themed Q&amp;A examples (alopecia, cerebral atrophy, adjunctive TCM for late-stage lung cancer, acne with constipation), illustrating how the model mixes lifestyle advice, classical formula names, and “see a clinician” caveats.
  </p>
</section>

<section class="project-section">
  <h2>Usage</h2>
  <ul>
    <li>Quick chat: <code>scripts/dialog.sh</code> (edit generation settings in <code>src/dialog.py</code>)</li>
    <li>Batch / scripted inference: <code>scripts/inference.sh</code></li>
    <li>Local web UI: <code>scripts/interface.sh</code></li>
  </ul>
  <div class="project-callout">
    <p>
      <strong>Research-only license.</strong> The model, dataset, and derivatives are released for research purposes only — not for commercial use or other socially harmful applications.
      Outputs may be factually wrong, may fail to filter harmful instructions, and are not a substitute for professional medical advice. The project accepts no liability arising from use of the model or data.
    </p>
  </div>
</section>

<section class="project-section">
  <h2>Citation</h2>
  <p>If you use MedChatZH, please cite:</p>
  <div class="project-cite">
<pre><code>@article{tan2024medchatzh,
  title={MedChatZH: A tuning LLM for traditional Chinese medicine consultations},
  author={Tan, Yang and Zhang, Zhixing and Li, Mingchen and Pan, Fei and Duan, Hao and Huang, Zijie and Deng, Hua and Yu, Zhuohang and Yang, Chen and Shen, Guoyang and Qi, Peng and Yue, Chengyuan and Liu, Yuxian and Hong, Liang and Yu, Huiqun and Fan, Guisheng and Tang, Yun},
  journal={Computers in Biology and Medicine},
  volume={172},
  pages={108290},
  year={2024},
  publisher={Elsevier},
  doi={10.1016/j.compbiomed.2024.108290}
}</code></pre>
  </div>
</section>
