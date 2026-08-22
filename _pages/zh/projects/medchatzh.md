---
permalink: /zh/projects/medchatzh/
title: MedChatZH
layout: default
project: medchatzh
section: overview
lang: zh-CN
alt_url: /projects/medchatzh/
author_profile: true
description: MedChatZH：面向中医问诊的微调大语言模型（Computers in Biology and Medicine 2024）。
redirect_from:
- /zh/pub/medchatzh/
- /zh/project/medchatzh/
---

<header class="project-hero">
  <p class="project-kicker">Computers in Biology and Medicine 2024</p>
  <h1>MedChatZH</h1>
  <p class="project-lede">
    基于 Baichuan-7B、在中医典籍与医学指令对话上继续训练的中文医疗问诊大模型，面向临床问答场景中的中医式提问与表述。
  </p>
  <p class="project-authors">
    Yang Tan, Zhixing Zhang, Mingchen Li, Fei Pan, Hao Duan, Zijie Huang, Hua Deng, Zhuohang Yu, Chen Yang, Guoyang Shen, Peng Qi, Chengyuan Yue, Yuxian Liu, Liang Hong, Huiqun Yu, Guisheng Fan, Yun Tang
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://doi.org/10.1016/j.compbiomed.2024.108290" target="_blank" rel="noopener noreferrer">论文</a>
    <a class="project-btn project-btn--ghost" href="https://www.researchgate.net/profile/Yang-Tan-33/publication/378954165_MedChatZH_A_tuning_LLM_for_traditional_Chinese_medicine_consultations/links/665fddc716dcf74fcec20c20/MedChatZH-A-tuning-LLM-for-traditional-Chinese-medicine-consultations.pdf" target="_blank" rel="noopener noreferrer">PDF</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">代码</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">模型</a>
    <a class="project-btn project-btn--ghost" href="https://huggingface.co/datasets/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">数据集</a>
  </div>
</header>

<figure class="project-figure">
  <img src="{{ '/images/papers/medchatzh.png' | relative_url }}" alt="MedChatZH：中医与中文医疗问诊大模型概览" loading="lazy">
  <figcaption>MedChatZH 以 Baichuan-7B 为基座，结合中医文献与大规模医学指令数据，适配中文临床对话。</figcaption>
</figure>

<section class="project-section">
  <h2>方法</h2>
  <p>
    通用中文大模型往往难以把握<strong>中医术语</strong>、辨证式推理与面向患者的问诊语气。
    MedChatZH 从 <strong>Baichuan-7B</strong> 出发，在中医书籍语料与精选医学指令对话上继续训练，使模型能在对话场景中回答包括中医导向在内的中文医学问题。
  </p>
  <p>
    权重、推理脚本与简易网页界面随
    <a href="https://github.com/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">GitHub 仓库</a>
    一并开源；7B 检查点托管于
    <a href="https://huggingface.co/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">Hugging Face</a>。
  </p>
</section>

<section class="project-section">
  <h2>数据规模</h2>
  <p>
    从约 700 万原始对话中清洗得到两套指令数据包，发布于
    <a href="https://huggingface.co/datasets/tyang816/MedChatZH" target="_blank" rel="noopener noreferrer">Hugging Face Datasets</a>：
  </p>
  <ul>
    <li><strong>76.4 万</strong>条高质量医学指令对话</li>
    <li><strong>200 万</strong>条医学 / 通用混合对话，覆盖更广的对话能力</li>
  </ul>
  <p>
    再辅以中医典籍文本，同时提供领域知识与指令遵循能力，支撑问诊式生成。
  </p>
</section>

<section class="project-section">
  <h2>使用说明</h2>
  <ul>
    <li>快速对话：<code>scripts/dialog.sh</code>（生成参数见 <code>src/dialog.py</code>）</li>
    <li>批量 / 脚本推理：<code>scripts/inference.sh</code></li>
    <li>本地网页界面：<code>scripts/interface.sh</code></li>
  </ul>
  <div class="project-callout">
    <p>
      <strong>仅供科研使用。</strong>模型、数据及其衍生版本仅限研究用途，不得用于商业或其他有害场景。
      输出可能存在事实错误，不能替代专业医疗建议；项目对使用后果不承担责任。
    </p>
  </div>
  <p>
    相关资源目录见
    <a href="{{ '/zh/projects/tcm/' | relative_url }}">TCM AI</a>。
  </p>
</section>

<section class="project-section">
  <h2>引用</h2>
  <p>若使用 MedChatZH，请引用：</p>
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
