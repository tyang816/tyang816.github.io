---
permalink: /zh/projects/tcm/
title: 中医大模型资源 | TCM AI
seo_title: 中医大模型：开源模型、论文、数据集与评测 | Awesome-TCM-LLM
layout: default
project: tcm
section: overview
lang: zh-CN
alt_url: /projects/tcm/
author_profile: true
image: /images/papers/tcm.png
redirect_from:
- /zh/pub/tcm/
- /zh/pub/tcm/items/
- /tcm/
- /tcm/items/
- /zh/tcm/
- /zh/tcm/items/
- /zh/project/tcm/
description: 中医大模型（TCM LLM）开源资源大全，Awesome-TCM-LLM 网页版。谭扬维护，持续收录扁鹊、华佗GPT、神农、仲景、ShizhenGPT 等中医药大语言模型、论文、综述、评测基准与数据集。
seo_description: 中医大模型（TCM LLM）开源资源大全，Awesome-TCM-LLM 网页版。收录扁鹊、华佗GPT、神农、仲景、ShizhenGPT 等中医药大语言模型，以及论文、综述、评测与数据集，持续更新。
keywords:
- 中医大模型
- 中医药大模型
- 中医大语言模型
- 开源中医大模型
- 中医AI
- TCM LLM
- Traditional Chinese Medicine
- 中医数据集
- 中医大模型评测
- Awesome-TCM-LLM
---

<header class="project-hero">
  <p class="project-kicker">Awesome-TCM-LLM · 开源资源目录</p>
  <h1>中医大模型</h1>
  <p class="project-lede">
    中医大模型（TCM LLM）开源资源大全：有哪些模型、论文、综述、评测基准与数据集，均可在此检索。
    本页是 <a href="https://github.com/tyang816/Awesome-TCM-LLM">Awesome-TCM-LLM</a> 的网页版，由谭扬维护，与 GitHub README 共用同一目录。
  </p>
  <p class="project-authors">
    维护：谭扬（上海交通大学 / 上海创智学院）· 最近更新见目录顶部
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">提交资源</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/tcm/' | relative_url }}">English</a>
    <a class="project-btn project-btn--ghost" href="{{ '/zh/projects/' | relative_url }}">开源项目</a>
  </div>
</header>

<section class="project-section">
  <h2>什么是中医大模型？</h2>
  <p>
    中医大模型（TCM LLM，Traditional Chinese Medicine Large Language Model）是指面向中医药领域训练或微调的大语言模型。
    这类模型通常在通用中文大模型（如 Qwen、ChatGLM、Baichuan、LLaMA 等）的基础上，使用中医经典古籍、名医医案、
    中药方剂、临床指南与问诊对话等专业语料进行持续预训练或指令微调，从而具备中医辨证论治、方剂推荐、
    中药知识问答、四诊（望闻问切）信息理解等能力。
  </p>
  <p>
    自 2023 年扁鹊（BianQue）、华佗GPT、神农大模型等首批中医药大模型发布以来，中医 AI 大模型快速发展，
    目前已覆盖智能问诊、辅助诊疗、中医教育、执业考试评测、知识图谱构建等场景，并出现了
    ShizhenGPT 等支持舌象、面象的多模态中医大模型。本页持续追踪该领域的模型发布、学术论文、
    评测基准与开放数据集。
  </p>
</section>

<section class="project-section">
  <h2>代表性中医大模型</h2>
  <ul>
    <li><a href="{{ '/zh/projects/tcm/items/bianque/' | relative_url }}">扁鹊 (BianQue)</a>：中文领域生活空间主动健康大模型（2023）</li>
    <li><a href="{{ '/zh/projects/tcm/items/huatuogpt/' | relative_url }}">华佗GPT</a>：中文医学语料训练的大型语言模型（2023）</li>
    <li><a href="{{ '/zh/projects/tcm/items/shennong-tcm-llm/' | relative_url }}">神农大模型 (ShenNong-TCM-LLM)</a>：中医药大规模语言模型，配套指令数据与开源权重（2023）</li>
    <li><a href="{{ '/zh/projects/tcm/items/zhongjing/' | relative_url }}">仲景 (ZhongJing)</a>：专家知识引导的中医大模型，融合垂直领域微调策略（2025）</li>
    <li><a href="{{ '/zh/projects/tcm/items/qibo/' | relative_url }}">岐伯 (Qibo)</a>：持续预训练 + SFT 提升辨证与问答能力，配套 Qibo Benchmark（2025）</li>
    <li><a href="{{ '/zh/projects/tcm/items/shizhengpt/' | relative_url }}">ShizhenGPT</a>：支持望闻问切的中医多模态大模型（2025）</li>
    <li><a href="{{ '/zh/projects/tcm/items/baize-tcm/' | relative_url }}">白泽 (Baize-TCM-LLM)</a>：中国中医科学院基于 Qwen3 的中医问答模型系列（2025）</li>
    <li><a href="{{ '/zh/projects/tcm/items/tcmchat/' | relative_url }}">TCMChat</a>：生成式中医药大模型，配套 60 万条中药知识对话数据（2025）</li>
    <li><a href="{{ '/zh/projects/tcm/items/xinghe/' | relative_url }}">杏核 (Xinghe)</a>：Xinghe-TCM 基于 Qwen3.5-9B 的内经推理模型，开源权重（2026）</li>
    <li><a href="{{ '/zh/projects/tcm/items/zhifangdantai/' | relative_url }}">知方丹台 (ZhiFangDanTai)</a>：GraphRAG + 微调的方剂生成模型，首都师大与昆士兰大学，开源权重（2025）</li>
    <li><a href="{{ '/zh/projects/tcm/items/xuanhugpt/' | relative_url }}">悬壶 (XuanHuGPT)</a>：基于参数高效微调的中医领域大模型（2025）</li>
    <li><a href="{{ '/zh/projects/medchatzh/' | relative_url }}">MedChatZH</a>：本站作者一作，基于 Baichuan-7B 的中文医疗 / 中医问诊微调模型</li>
  </ul>
  <p>完整列表见下方<a href="#tcm-heading-overview">资源目录</a>，可按类型与年份筛选。</p>
</section>

<section class="project-section">
  <h2>中医大模型评测基准与数据集</h2>
  <ul>
    <li><a href="{{ '/zh/projects/tcm/items/ds-tcmbench/' | relative_url }}">TCMBench</a>：面向中医领域的综合性大模型评测基准</li>
    <li><a href="{{ '/zh/projects/tcm/items/mtcmb/' | relative_url }}">MTCMB</a>：中医多任务评测基准，12 个子集约 7100 样本，覆盖知识 / 推理 / 方剂 / 安全</li>
    <li><a href="{{ '/zh/projects/tcm/items/ds-tcm-eval/' | relative_url }}">TCM-Eval</a>：中医大模型评测数据集</li>
    <li><a href="{{ '/zh/projects/tcm/items/ds-tcmchat-600k/' | relative_url }}">TCMChat-dataset-600k</a>：60 万条中药知识对话微调数据</li>
    <li><a href="{{ '/zh/projects/tcm/items/ds-shennong/' | relative_url }}">ShenNong_TCM_Dataset</a>：神农大模型配套中医药指令数据</li>
    <li><a href="{{ '/zh/projects/tcm/items/survey-key-tech-tcm-llm/' | relative_url }}">中医大模型关键技术综述（IJPRAI）</a>：系统综述知识组织、辅助诊断与临床决策支持关键技术</li>
  </ul>
</section>

<section class="project-section">
  <h2>按主题浏览</h2>
  <ul>
    <li><a href="{{ '/zh/projects/tcm/models/' | relative_url }}">开源中医大模型</a>：公开权重与代表性系统</li>
    <li><a href="{{ '/zh/projects/tcm/datasets/' | relative_url }}">中医大模型数据集</a>：指令数据、医案、评测集</li>
    <li><a href="{{ '/zh/projects/tcm/surveys/' | relative_url }}">中医大模型综述</a>：诊疗、多模态、智能体与评测</li>
  </ul>
</section>

<section class="project-section">
  <h2>你能找到什么</h2>
  <ul>
    <li>产业动态、政策与产品发布相关精选新闻</li>
    <li>开源权重与多模态中医大模型系统</li>
    <li>中医 / 中医药相关评测基准与综述</li>
    <li>预训练 / 微调数据集与知识资源</li>
  </ul>
</section>

<section class="project-section tcm-catalog-section">
  {% include tcm-hub.html %}
</section>

<section class="project-section">
  <h2>常见问题</h2>
  <h3>什么是中医大模型？</h3>
  <p>
    中医大模型（TCM LLM）是面向中医药领域的大语言模型，通过中医古籍、医案、方剂与临床语料的持续预训练或指令微调，
    具备辨证论治、方剂推荐、中药知识问答等能力，代表性工作包括扁鹊、华佗GPT、神农、仲景、ShizhenGPT 等。
  </p>
  <h3>目前有哪些代表性的中医大模型？</h3>
  <p>
    代表性中医大模型包括扁鹊 (BianQue)、华佗GPT、神农大模型 (ShenNong-TCM-LLM)、仲景 (ZhongJing)、岐伯 (Qibo)、
    ShizhenGPT、白泽 (Baize-TCM-LLM)、TCMChat、悬壶 (XuanHuGPT) 以及本站作者一作的 MedChatZH 等，
    完整列表见本页资源目录。
  </p>
  <h3>有哪些公开的中医大模型数据集与评测基准？</h3>
  <p>
    常用评测基准包括 TCMBench、MTCMB、TCM-Eval、Qibo Benchmark 等；开放数据集包括 TCMChat-dataset-600k、
    ShenNong_TCM_Dataset、TCM-Ancient-Books 古籍语料等，均可在本页目录中按「数据集 / 评测」类型筛选。
  </p>
  <h3>这个中医大模型资源列表多久更新一次？</h3>
  <p>
    本目录与 GitHub 开源项目 Awesome-TCM-LLM 同源维护，新发布的中医大模型、论文、评测与数据集会持续收录，
    页面顶部标注了最近更新时间。
  </p>
  <h3>开源的中医大模型有哪些？</h3>
  <p>
    已公开权重的代表性工作包括神农大模型、TCMChat、ChatTCM、杏核、知方丹台、TCMLLM/Lingdan、MedChatZH 等，
    另有扁鹊、华佗GPT、仲景、岐伯、ShizhenGPT、白泽、悬壶等论文或产品向系统。
    见<a href="{{ '/zh/projects/tcm/models/' | relative_url }}">开源中医大模型</a>专题页。
  </p>
  <h3>Awesome-TCM-LLM 是什么？</h3>
  <p>
    Awesome-TCM-LLM 是谭扬维护的中医大模型开源资源列表，GitHub 仓库与本页同源：
    模型、论文、综述、数据集和新闻统一收录，接受社区 Issue 投稿。
  </p>
  <h3>如何提交新的中医大模型资源？</h3>
  <p>
    欢迎通过
    <a href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">GitHub Issue</a>
    提交新的模型、论文、数据集或新闻，维护者审核后会同步到本页与 GitHub README。
  </p>
</section>

<section class="project-section">
  <h2>如何引用</h2>
  <p>若本目录对论文或综述有帮助，建议引用 GitHub 仓库，便于检索系统与大模型将「中医大模型」与 Awesome-TCM-LLM 对齐：</p>
  <pre class="tcm-cite"><code>Yang Tan. Awesome-TCM-LLM: curated Traditional Chinese Medicine large language models.
https://github.com/tyang816/Awesome-TCM-LLM
Web catalog: https://tyang816.github.io/zh/projects/tcm/</code></pre>
</section>

<section class="project-section">
  <h2>相关一作工作</h2>
  <p>
    <a href="{{ '/zh/projects/medchatzh/' | relative_url }}">MedChatZH</a>
    是基于 Baichuan-7B、面向中文医疗 / 中医问诊的微调模型，与本资源汇聚互补。
  </p>
</section>

<section class="project-section">
  <h2>贡献</h2>
  <p>
    可通过
    <a href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">GitHub Issue</a>
    提交资源；觉得有用请在
    <a href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    点 Star。英文界面：
    <a href="{{ '/projects/tcm/' | relative_url }}">/projects/tcm/</a>。
  </p>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "什么是中医大模型？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "中医大模型（TCM LLM）是面向中医药领域的大语言模型，通过中医古籍、医案、方剂与临床语料的持续预训练或指令微调，具备辨证论治、方剂推荐、中药知识问答等能力，代表性工作包括扁鹊、华佗GPT、神农、仲景、ShizhenGPT 等。"
      }
    },
    {
      "@type": "Question",
      "name": "目前有哪些代表性的中医大模型？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "代表性中医大模型包括扁鹊 (BianQue)、华佗GPT、神农大模型 (ShenNong-TCM-LLM)、仲景 (ZhongJing)、岐伯 (Qibo)、ShizhenGPT、白泽 (Baize-TCM-LLM)、TCMChat、悬壶 (XuanHuGPT) 以及 MedChatZH 等。"
      }
    },
    {
      "@type": "Question",
      "name": "有哪些公开的中医大模型数据集与评测基准？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "常用评测基准包括 TCMBench、MTCMB、TCM-Eval、Qibo Benchmark 等；开放数据集包括 TCMChat-dataset-600k、ShenNong_TCM_Dataset、TCM-Ancient-Books 古籍语料等。"
      }
    },
    {
      "@type": "Question",
      "name": "这个中医大模型资源列表多久更新一次？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本目录与 GitHub 开源项目 Awesome-TCM-LLM 同源维护，新发布的中医大模型、论文、评测与数据集会持续收录。"
      }
    },
    {
      "@type": "Question",
      "name": "开源的中医大模型有哪些？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "已公开权重的代表性工作包括神农大模型、TCMChat、ChatTCM、杏核、知方丹台、TCMLLM/Lingdan、MedChatZH 等，另有扁鹊、华佗GPT、仲景、岐伯、ShizhenGPT、白泽、悬壶等系统。完整列表见 Awesome-TCM-LLM 开源中医大模型专题页。"
      }
    },
    {
      "@type": "Question",
      "name": "Awesome-TCM-LLM 是什么？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Awesome-TCM-LLM 是谭扬维护的中医大模型开源资源列表，GitHub 与网页目录同源，收录模型、论文、综述、数据集和新闻。"
      }
    },
    {
      "@type": "Question",
      "name": "如何提交新的中医大模型资源？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "可通过 GitHub 仓库 Awesome-TCM-LLM 的 Issue 模板提交新的模型、论文、数据集或新闻，审核后会同步到资源目录与 README。"
      }
    }
  ]
}
</script>
