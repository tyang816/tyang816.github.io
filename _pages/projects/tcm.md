---
permalink: /projects/tcm/
title: TCM AI Resources
seo_title: "TCM LLMs: Open Models, Papers, Datasets & Benchmarks | Awesome-TCM-LLM"
layout: default
project: tcm
section: overview
lang: en
alt_url: /zh/projects/tcm/
author_profile: true
image: /images/papers/tcm.png
redirect_from:
- /pub/tcm/
- /tcm-en/
- /tcm-en/items/
- /project/tcm/
description: TCM LLM hub — the Awesome-TCM-LLM web catalog of Traditional Chinese Medicine large language models, covering BianQue, ZhongJing, HuaTuoGPT, ShenNong and more, with papers, surveys, benchmarks, and open datasets.
seo_description: "TCM LLM hub (Awesome-TCM-LLM web edition): Traditional Chinese Medicine large language models including BianQue, HuaTuoGPT, ShenNong, ZhongJing, and ShizhenGPT, plus papers, surveys, benchmarks, and datasets."
keywords:
- TCM LLM
- Traditional Chinese Medicine large language model
- Traditional Chinese Medicine
- TCM AI
- Awesome-TCM-LLM
- benchmark
- dataset
---

<header class="project-hero">
  <p class="project-kicker">Awesome-TCM-LLM · Catalog</p>
  <h1>TCM LLMs</h1>
  <p class="project-lede">
    A living catalog of Traditional Chinese Medicine large language models (TCM LLMs): which models exist, plus papers, surveys, benchmarks, and datasets.
    This page is the web edition of <a href="https://github.com/tyang816/Awesome-TCM-LLM">Awesome-TCM-LLM</a>, maintained by Yang Tan and synced with the GitHub README.
  </p>
  <p class="project-authors">
    Maintained by Yang Tan (SJTU / SII) · last updated date is shown on the catalog
  </p>
  <div class="project-cta">
    <a class="project-btn project-btn--primary" href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a class="project-btn project-btn--ghost" href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">Suggest a resource</a>
    <a class="project-btn project-btn--ghost" href="{{ '/zh/projects/tcm/' | relative_url }}">中文</a>
    <a class="project-btn project-btn--ghost" href="{{ '/projects/' | relative_url }}">Open Projects</a>
  </div>
</header>

<section class="project-section">
  <h2>What is a TCM LLM?</h2>
  <p>
    A TCM LLM (Traditional Chinese Medicine large language model) is a large language model trained or fine-tuned
    for the domain of Traditional Chinese Medicine. These models are typically built on general-purpose Chinese
    foundation models (such as Qwen, ChatGLM, Baichuan, or LLaMA) and further adapted with domain corpora —
    classical TCM canons, renowned physicians' case records, herbal formula knowledge, clinical guidelines, and
    consultation dialogues — acquiring capabilities such as syndrome differentiation (辨证论治), herbal formula
    recommendation, TCM knowledge question answering, and understanding of the four diagnostic methods
    (inspection, listening/smelling, inquiry, and palpation).
  </p>
  <p>
    Since the first wave of TCM LLMs in 2023 — BianQue, HuaTuoGPT, and ShenNong-TCM-LLM — the field has grown
    rapidly, now spanning intelligent consultation, clinical decision support, TCM education, licensing-exam
    evaluation, and knowledge-graph construction, including multimodal systems such as ShizhenGPT that handle
    tongue and facial imagery. This page tracks model releases, academic papers, benchmarks, and open datasets
    in the TCM LLM space.
  </p>
</section>

<section class="project-section">
  <h2>Representative TCM LLMs</h2>
  <ul>
    <li><a href="{{ '/projects/tcm/items/bianque/' | relative_url }}">BianQue (扁鹊)</a>: proactive-health large language model for Chinese living spaces (2023)</li>
    <li><a href="{{ '/projects/tcm/items/huatuogpt/' | relative_url }}">HuaTuoGPT</a>: large language model trained on Chinese medical corpora (2023)</li>
    <li><a href="{{ '/projects/tcm/items/shennong-tcm-llm/' | relative_url }}">ShenNong-TCM-LLM (神农)</a>: large-scale TCM language model with instruction data and open weights (2023)</li>
    <li><a href="{{ '/projects/tcm/items/zhongjing/' | relative_url }}">ZhongJing (仲景)</a>: expert-knowledge-guided TCM LLM with vertical-domain fine-tuning (2025)</li>
    <li><a href="{{ '/projects/tcm/items/qibo/' | relative_url }}">Qibo (岐伯)</a>: continued pretraining + SFT for syndrome differentiation and QA, with the Qibo Benchmark (2025)</li>
    <li><a href="{{ '/projects/tcm/items/shizhengpt/' | relative_url }}">ShizhenGPT</a>: multimodal TCM LLM supporting the four diagnostic methods (2025)</li>
    <li><a href="{{ '/projects/tcm/items/baize-tcm/' | relative_url }}">Baize-TCM-LLM (白泽)</a>: Qwen3-based TCM QA model series from the Institute of Chinese Materia Medica, CACMS (2025)</li>
    <li><a href="{{ '/projects/tcm/items/tcmchat/' | relative_url }}">TCMChat</a>: generative TCM LLM with a 600k-sample herbal-knowledge dialogue dataset (2025)</li>
    <li><a href="{{ '/projects/tcm/items/xinghe/' | relative_url }}">Xinghe (杏核)</a>: Xinghe-TCM Neijing reasoning model on Qwen3.5-9B with open weights (2026)</li>
    <li><a href="{{ '/projects/tcm/items/zhifangdantai/' | relative_url }}">ZhiFangDanTai (知方丹台)</a>: GraphRAG + fine-tuning formula model from Capital Normal University and UQ, with open weights (2025)</li>
    <li><a href="{{ '/projects/tcm/items/xuanhugpt/' | relative_url }}">XuanHuGPT (悬壶)</a>: parameter-efficient fine-tuned TCM domain LLM (2025)</li>
    <li><a href="{{ '/projects/medchatzh/' | relative_url }}">MedChatZH</a>: first-author work — a Baichuan-7B model fine-tuned for Chinese medical / TCM consultation</li>
  </ul>
  <p>See the full <a href="#tcm-heading-overview">catalog</a> below — filterable by type and year.</p>
</section>

<section class="project-section">
  <h2>TCM LLM benchmarks &amp; datasets</h2>
  <ul>
    <li><a href="{{ '/projects/tcm/items/ds-tcmbench/' | relative_url }}">TCMBench</a>: comprehensive benchmark for evaluating LLMs in the TCM domain</li>
    <li><a href="{{ '/projects/tcm/items/mtcmb/' | relative_url }}">MTCMB</a>: multi-task TCM benchmark — 12 subsets, ~7,100 samples covering knowledge, reasoning, formulas, and safety</li>
    <li><a href="{{ '/projects/tcm/items/ds-tcm-eval/' | relative_url }}">TCM-Eval</a>: evaluation dataset for TCM LLMs</li>
    <li><a href="{{ '/projects/tcm/items/ds-tcmchat-600k/' | relative_url }}">TCMChat-dataset-600k</a>: 600k herbal-knowledge dialogue samples for fine-tuning</li>
    <li><a href="{{ '/projects/tcm/items/ds-shennong/' | relative_url }}">ShenNong_TCM_Dataset</a>: instruction data released with the ShenNong model</li>
    <li><a href="{{ '/projects/tcm/items/survey-key-tech-tcm-llm/' | relative_url }}">Survey of key technologies for TCM LLMs (IJPRAI)</a>: systematic review of knowledge organization, assisted diagnosis, and clinical decision support</li>
  </ul>
</section>

<section class="project-section">
  <h2>Browse by topic</h2>
  <ul>
    <li><a href="{{ '/projects/tcm/models/' | relative_url }}">Open TCM LLMs</a>: public weights and representative systems</li>
    <li><a href="{{ '/projects/tcm/datasets/' | relative_url }}">TCM LLM datasets</a>: instruction data, cases, benchmarks</li>
    <li><a href="{{ '/projects/tcm/surveys/' | relative_url }}">TCM LLM surveys</a>: diagnosis, multimodal, agents, evaluation</li>
  </ul>
</section>

<section class="project-section">
  <h2>What you will find</h2>
  <ul>
    <li>Selected news on products, policy, and open releases</li>
    <li>Open-weight and multimodal TCM LLM systems</li>
    <li>Benchmarks, evaluation suites, and surveys</li>
    <li>Pretraining / SFT datasets and related resources</li>
  </ul>
</section>

<section class="project-section tcm-catalog-section">
  {% include tcm-hub.html %}
</section>

<section class="project-section">
  <h2>FAQ</h2>
  <h3>What is a TCM LLM?</h3>
  <p>
    A TCM LLM is a large language model adapted to Traditional Chinese Medicine through continued pretraining or
    instruction tuning on TCM canons, case records, herbal formulas, and clinical corpora. It can perform syndrome
    differentiation, formula recommendation, and TCM knowledge QA. Representative systems include BianQue, HuaTuoGPT,
    ShenNong, ZhongJing, and ShizhenGPT.
  </p>
  <h3>What are the representative TCM LLMs?</h3>
  <p>
    Representative TCM LLMs include BianQue, HuaTuoGPT, ShenNong-TCM-LLM, ZhongJing, Qibo, ShizhenGPT,
    Baize-TCM-LLM, TCMChat, XuanHuGPT, and MedChatZH (first-author work on this site). See the catalog above for
    the full list.
  </p>
  <h3>What public TCM LLM datasets and benchmarks are available?</h3>
  <p>
    Widely used benchmarks include TCMBench, MTCMB, TCM-Eval, and the Qibo Benchmark; open datasets include
    TCMChat-dataset-600k, ShenNong_TCM_Dataset, and the TCM-Ancient-Books corpus. Filter by "dataset" or
    "benchmark" in the catalog.
  </p>
  <h3>How often is this TCM LLM list updated?</h3>
  <p>
    The catalog is maintained in sync with the open-source GitHub project Awesome-TCM-LLM; newly released TCM
    models, papers, benchmarks, and datasets are added continuously. The last-updated date is shown at the top of
    the catalog.
  </p>
  <h3>Which TCM LLMs are open-weight?</h3>
  <p>
    Public checkpoints include ShenNong-TCM-LLM, TCMChat, ChatTCM, Xinghe, ZhiFangDanTai, TCMLLM/Lingdan, and MedChatZH, alongside paper- or product-only systems such as BianQue, HuaTuoGPT, ZhongJing, Qibo, ShizhenGPT, Baize-TCM-LLM, and XuanHuGPT.
    See the <a href="{{ '/projects/tcm/models/' | relative_url }}">open TCM LLMs</a> page.
  </p>
  <h3>What is Awesome-TCM-LLM?</h3>
  <p>
    Awesome-TCM-LLM is a curated catalog of Traditional Chinese Medicine large language models maintained by Yang Tan.
    The GitHub repository and this page share the same source of truth for models, papers, surveys, datasets, and news.
  </p>
  <h3>How can I submit a new TCM LLM resource?</h3>
  <p>
    Suggest models, papers, datasets, or news via a
    <a href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">GitHub Issue</a>;
    accepted submissions are synced to this page and the README.
  </p>
</section>

<section class="project-section">
  <h2>Cite this catalog</h2>
  <p>If the list is useful in a paper or survey, please cite the GitHub repository so search engines and LLM assistants can align “TCM LLM” with Awesome-TCM-LLM:</p>
  <pre class="tcm-cite"><code>Yang Tan. Awesome-TCM-LLM: curated Traditional Chinese Medicine large language models.
https://github.com/tyang816/Awesome-TCM-LLM
Web catalog: https://tyang816.github.io/projects/tcm/</code></pre>
</section>

<section class="project-section">
  <h2>Related first-author work</h2>
  <p>
    <a href="{{ '/projects/medchatzh/' | relative_url }}">MedChatZH</a>
    is a Baichuan-7B model fine-tuned for Chinese medical / TCM consultation — a concrete model release alongside this curated hub.
  </p>
</section>

<section class="project-section">
  <h2>Contribute</h2>
  <p>
    Suggest a resource via
    <a href="https://github.com/tyang816/Awesome-TCM-LLM/issues/new?template=resource.yml" target="_blank" rel="noopener noreferrer">GitHub Issue</a>.
    Star the project on
    <a href="https://github.com/tyang816/Awesome-TCM-LLM" target="_blank" rel="noopener noreferrer">GitHub</a>
    if you find it useful.
    Chinese UI:
    <a href="{{ '/zh/projects/tcm/' | relative_url }}">/zh/projects/tcm/</a>.
  </p>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a TCM LLM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A TCM LLM is a large language model adapted to Traditional Chinese Medicine through continued pretraining or instruction tuning on TCM canons, case records, herbal formulas, and clinical corpora. It can perform syndrome differentiation, formula recommendation, and TCM knowledge QA. Representative systems include BianQue, HuaTuoGPT, ShenNong, ZhongJing, and ShizhenGPT."
      }
    },
    {
      "@type": "Question",
      "name": "What are the representative TCM LLMs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Representative TCM LLMs include BianQue, HuaTuoGPT, ShenNong-TCM-LLM, ZhongJing, Qibo, ShizhenGPT, Baize-TCM-LLM, TCMChat, XuanHuGPT, and MedChatZH."
      }
    },
    {
      "@type": "Question",
      "name": "What public TCM LLM datasets and benchmarks are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Widely used benchmarks include TCMBench, MTCMB, TCM-Eval, and the Qibo Benchmark; open datasets include TCMChat-dataset-600k, ShenNong_TCM_Dataset, and the TCM-Ancient-Books corpus."
      }
    },
    {
      "@type": "Question",
      "name": "How often is this TCM LLM list updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The catalog is maintained in sync with the open-source GitHub project Awesome-TCM-LLM; newly released TCM models, papers, benchmarks, and datasets are added continuously."
      }
    },
    {
      "@type": "Question",
      "name": "Which TCM LLMs are open-weight?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Public checkpoints include ShenNong-TCM-LLM, TCMChat, ChatTCM, Xinghe, ZhiFangDanTai, TCMLLM/Lingdan, and MedChatZH, alongside paper- or product-only systems such as BianQue, HuaTuoGPT, ZhongJing, Qibo, ShizhenGPT, Baize-TCM-LLM, and XuanHuGPT."
      }
    },
    {
      "@type": "Question",
      "name": "What is Awesome-TCM-LLM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Awesome-TCM-LLM is a curated catalog of Traditional Chinese Medicine large language models maintained by Yang Tan. The GitHub repository and this web catalog share the same source of truth."
      }
    },
    {
      "@type": "Question",
      "name": "How can I submit a new TCM LLM resource?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Suggest models, papers, datasets, or news via a GitHub Issue on the Awesome-TCM-LLM repository; accepted submissions are synced to the catalog and README."
      }
    }
  ]
}
</script>
