---
layout: post
title: arXiv-2026 BiomniBench：Process-level Evaluation of LLM Agents for Real-world Biomedical Research
categories: [BI]
tags: [protein, agent]
proceedings: arXiv
date: 2026-05-12
---

> 论文地址：[BiomniBench：Process-level Evaluation of LLM Agents for Real-world Biomedical Research](https://www.biorxiv.org/content/10.64898/2026.05.12.724604v1)
>
> 论文实现：<https://huggingface.co/datasets/phylobio/BiomniBench-DA>

## BiomniBench：过程级生信分析智能体评测集

### Abstract

当前，大语言模型（LLM）智能体已经能够执行真实的生物医学研究，但对其进行严格评估却十分困难，因为仅关注结果的基准测试（Outcome-only benchmarks）存在两个主要缺陷 。**首先**，正确的最终答案可能源于模型记忆、奖励作弊（reward hacking），或者是碰巧得出正确数字的错误推理过程 ；**其次**，一些有效的替代分析方法仅仅因为与参考标准不同，就会被判定为错误 。为了解决这些问题，研究团队引入了 **BiomniBench**，这是一个过程级（process-level）评估框架，它会根据专家设计的、针对特定任务的评分量表（rubrics），对智能体的完整分析轨迹进行全面打分 。该框架的首个发布版本 **BiomniBench-DA** 包含了100个数据分析任务，跨越了17种任务类型、5个疾病领域以及一个通用生物学类别；这些任务均基于《Nature》、《Cell》和《Science》等顶级期刊的论文，并与原论文作者或领域专家共同开发完成 。该研究在四种智能体框架（agent harnesses）下对前沿闭源模型和开源模型进行了基准测试，并得出了三个核心发现 ：第一，前沿模型和开源基础模型的得分高度集中（差距在几分以内），且所有模型都存在巨大的进一步提升空间 ；第二，**智能体框架带来的得分变化，甚至超过了连续两代模型更迭之间的性能差距** ；第三，智能体虽然能够可靠地将论点建立在真实的文献来源之上，但在**方法选择、生物学解释和科学推理**方面却始终表现出明显的不足 。总体而言，BiomniBench 是首个针对生物医学研究中 LLM 智能体的过程级基准测试，它提供了仅靠结果评分无法实现的细粒度、维度级诊断能力 。

### 1 Introduction

大语言模型（LLM）智能体正在重塑生物学研究，通过将语言理解与代码执行、工具使用以及结构化数据库访问相结合，现今的智能体能够设计CRISPR和基因扰动实验、分析空间转录组数据、规划自动化化学工作流、支持药物发现流程并解读临床多组学数据，这些工作过去曾需要专家投入数小时乃至数天的时间 。随着这些能力的成熟，无论是专用的生物医学智能体还是诸如Claude Code和OpenAI Codex等通用编码智能体，正被严肃地引入学术界和工业界的真实科学工作流中 ，这引发了一个核心问题：我们如何知道这些智能体何时真正做出了好的科学研究 ？大多数现有的基准测试试图通过最终答案评分（如精确匹配、二元正确性或对保留结果的通过/失败判别，例如HLE和BixBench）来回答这一问题 。这对于拥有单一可验证答案的问题有效，但在复杂的生物医学研究中，**仅关注结果的评估（outcome-only evaluation）会从两方面失效** ：

1. 最终答案基准测试容易导致数据污染和**奖励作弊（reward hacking）**，已发表的数据集经常出现在训练语料库中，且结果评分奖励的是落到正确答案上而非严谨的分析过程 。智能体可能在返回干净的火山图、排序基因列表和做出自信解读的同时，其轨迹却暴露了错误的归一化、被忽略的批次效应以及捏造的引用 。
2. 真实的科研是开放式的，**多种分析路径可以产生不同但均合理解释的答案**，因此结果匹配会惩罚那些尽管分析严谨但与参考标准产生分歧的替代路径 。在生物学中，这些失效的代价尤为高昂，因为 flawed 分析会在有人注意到之前的数月里，悄然传播到湿实验、药物开发决策及下游研究流程中 。  

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/fig1.png" alt="avatar" style="zoom:100%;" /></div>

为了解决这些局限性，研究团队引入了**BiomniBench**，这是一个用于评估生物医学研究任务中LLM智能体的**过程级评估框架（process-level evaluation framework）** 。相比于仅对最终结果进行评分，BiomniBench会利用LLM裁判，对照专家设计的、针对特定任务的评分量表，对智能体的**完整分析轨迹进行评级（如原文图1所示）** 。该框架由三个设计原则塑造：

1. **将任务立足于现实世界的研究**：每个任务均衍生自已发表的研究，并需要多步推理、方法选择和结果解读 
2. **评估过程而非仅关注输出**：评分量表对每一步骤的分析决策质量进行打分，以区分出用错误方法碰巧得出正确答案与用严谨方法但因微小偏差错失完美答案的情况 ；
3. **包容多种有效方法**：每个量表都编码了替代的分析路径，确保智能体不会因选择与参考分析不同的合理方法而受到惩罚 。

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/fig5.png" alt="avatar" style="zoom:100%;" /></div>

为了确定该框架的首个发布版本，团队**分析了来自开源Biomni平台的32,014个用户提交的任务**，发现**数据分析主导了其分布，占比高达63.3%**，远超文献研究、实验设计、快速事实查询和手稿撰写 。因此，团队发布了**BiomniBench-DA**，其中包含精心挑选自《Nature》、《Cell》、《Science》及同级期刊论文的100个数据分析任务，跨越17种任务类型、5个疾病领域和一个通用生物学类别 。每个任务均与原论文作者或拥有5年以上研究经验的领域专家共同开发，包含底层公共数据集、多步参考轨迹和特定任务量表 ，量表从**数据处理、方法选择、统计严谨性、生物学解释、科学推理和来源可靠性**六个维度进行打分 。

研究在四种智能体框架（Codex CLI、Terminus-2、Claude Code、Gemini CLI）下对前沿闭源系统（Claude Opus 4.7、GPT-5.5、Gemini 3.1 Pro）和开源权重模型（GLM-5.1、Qwen 3.6、Kimi K2.6）进行了基准测试 ，结果显示：前沿模型与开源基础模型的表现高度集中（差距在几分以内），且所有模型均存在巨大的提升空间 ；**智能体框架带来的得分变化甚至超过了连续两代模型更迭之间的差距** ；维度级别的分析揭示出智能体虽然能够可靠地将论点建立在真实文献来源上，但在**方法选择、生物学解释和科学推理上却始终表现出明显的不足** 。这些结果共同将BiomniBench确立为首个针对真实生物医学研究中LLM智能的过程级基准测试，为模型开发者、智能体构建者和科学界提供了一个用于追踪能力进展的共享基准 。

### 2 BiomniBench-DA: Benchmark design

BiomniBench-DA 旨在以科研人员在现实中遇到的方式向智能体呈现生物医学研究任务：由已发表的研究提供问题和参考解决方案，由原作者共同开发的评分量表对智能体的分析轨迹进行评分，并通过 **Harbor 执行框架**提供标准化的环境以统一不同智能体框架的输出 。

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### 2.1 Expert-driven curation pipeline

BiomniBench-DA 的 100 个任务是通过一个包含五个阶段的流水线生成的（如**图 2** 顶部所示），从分析生物医学智能体的使用情况开始，到构建特定任务的评分量表结束 。

- **分析 Biomni 用户轨迹（Analyzing Biomni user traces）：** 研究团队分析了开源 Biomni 平台上的 **32,014 个用户查询**，以了解科学家实际要求智能体执行哪些操作 。数据分析在这些任务中占据主导地位，这成为了将 BiomniBench-DA 作为框架首个发布版本的动机 。最常见的生物医学领域包括肿瘤学、免疫学和神经科学，常见的任务涵盖差异表达、通路分析以及大量长尾的专业分析 。
- **论文选择（Paper selection）：** 基于上述模式，研究团队根据四个标准选择源论文 ：（1）论文的分析需匹配 Biomni 用户轨迹中观察到的常见任务类型 ；（2）覆盖多样化的疾病领域和分析方法，横跨基础科学和转化医学，以确保基准测试对学术界和工业界均有相关性 ；（3）底层数据可通过 GEO、ArrayExpress 等公共存储库或论文补充材料公开获取 ；（4）论文发表在高影响力期刊（如《Nature》、《Cell》、《Science》及其子刊）或具有同等水准的最新预印本上 。最终的 100 个任务来自 21 篇此类出版物（完整列表见**附录表 4**） 。
-  **专家策划（Expert curation）：** 对于每篇选定的论文，团队会**招募原作者或拥有 5 年以上研究经验的领域专家**，负责提出研究问题并准备底层数据集 。目标并非单纯复现论文的分析，而是捕捉不同的难度和主题多样性，甚至包括论文未直接解决但数据可以支持的问题 。
- **真实值/参考答案生成（Ground-truth generation）：** 专家需要以 Jupyter notebook 或 R Markdown 的形式生成参考分析轨迹，完整记录分析代码和推理过程、最终答案，以及超出源论文报告范围的生物学解释 。每个轨迹都在公共数据集上验证运行，并由独立审查员进行多轮审核以确保正确性 。
- **量表设计（Rubric design）：** 每个任务包含一个具有 **5-10 个评分标准的特定量表**。这些标准锚定在分析的关键决策点上，并标记为六个评估维度之一：**数据处理（data handling）、方法选择（method selection）、统计严谨性（statistical rigor）、生物学解释（biological interpretation）、科学推理（scientific reasoning）和来源可靠性（source reliability）** 。每个标准分为 A（完全正确）、B（意图正确但有小错或部分匹配）、C（跳过或完全错误）三个等级 。量表会列出适用的多种正确替代方案，以确保采取合理但不同分析路径的智能体不会被扣分 。

#### 2.2  Evaluation protocol

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab3.png" alt="avatar" style="zoom:100%;" /></div>

- **标准化的智能体执行（Standardized agent execution）：** 所有任务都被转换到 Harbor 执行框架中，该框架提供了沙盒运行时环境和各种智能体框架（Codex CLI、Terminus-2、Claude Code、Gemini CLI） 。每个任务在 Docker 容器中运行，预装 Python 3 和 R，配备 2 个 CPU 和 1 小时的执行预算 。指令明确要求智能体在完成时输出 `trace.md`（分析叙述、决策、代码等）和 `answer.txt`（对主要问题的结构化简短回答） 。此外，指令严格禁止智能体搜索或阅读任务所源自的具体文献 。  
- **LLM 裁判（LLM judge）：** 研究使用 LLM 裁判根据任务量表对智能体轨迹进行打分 。裁判在输入量表、`trace.md` 和 `answer.txt` 后，需选择最符合智能体工作表现的 A/B/C 等级，最终的 0-100 分则通过量表程序化计算得出 。在对比了五种候选 LLM 后，**Gemini 3.1 Pro** 在各项指标上表现出与人类专家最强的一致性（准确率 82%，线性加权 Cohen's $\kappa=0.70$），因此被选为整个基准测试的裁判模型 。

#### 2.3 Dataset statistics

BiomniBench-DA 涵盖了广泛的生物医学数据分析领域：100 个任务分布在 5 个疾病领域（及一个通用生物学类别）和 17 种任务类型中，从21篇高影响力发表论文里来（如**图 2** 底部所示） 。  

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab4-1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab4-2.png" alt="avatar" style="zoom:100%;" /></div>

- **疾病领域：** 包括**肿瘤学**（47%）、**代谢与内分泌疾病**（17%）、**免疫学**（14%）、**通用生物学**（10%）、**神经科学**（8%）和**心血管**（4%） 。  
- **分析任务类型：** 包含 17 种类型。最常见的前六种占基准测试的 55%，代表了日常生物医学研究中最核心的分析工作：**关联测试（Association testing，11%）**、**突变分析（Mutation analysis，10%）**、**多组学整合（Multi-omic integration，10%）**、**通路富集（Pathway enrichment，8%）**、**差异表达（Differential expression，8%）和聚类（Clustering，8%）** 。剩余 45% 是一系列长尾的专业分析，如预测建模、细胞组成分析、生存分析、单细胞网络推理等 。

### 3 Experiments and results

研究团队通过控制变量法，分别探究了基础模型本身的能力、智能体框架的影响，并对智能体在不同任务类型和评估维度的具体表现进行了深度解剖。

#### 3.1 Performance of base LLMs with fixed harness

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab1.png" alt="avatar" style="zoom:100%;" /></div>

为了孤立评估不同基础大语言模型的能力，研究团队首先将九种前沿模型统一接入同一个通用代码智能体框架 Terminus-2 中进行测试（详见**表 1**）。

结果显示，**闭源前沿模型处于领先地位且得分高度集中**：Claude Opus 4.7（63.94分）、GPT-5.5（63.57分）、Claude Opus 4.6（63.16分）和 Claude Sonnet 4.6（62.35分）彼此之间的差距不到 1.6 分。与此同时，**最强的开源权重模型表现出色且极具成本效益**，GLM-5.1（60.39分）、Qwen 3.6（59.47分）和 Kimi K2.6（59.15分）仅落后前沿模型 3 到 5 分，但单次任务成本大幅降低（例如 GLM-5.1 仅需 0.58 美元，而 Opus 4.7 需 0.87 美元）。

尽管如此，即使是最佳配置的平均得分也不到 64 分（满分 100），表明所有模型在该基准测试上均存在巨大的进步空间。值得注意的是，Gemini 3.1 Pro 呈现出离群表现，其生成轨迹耗时最短（中位数仅 4.9 分钟）且交互轮数最少，但得分显著偏低（44.27分）。此外，较新的模型代际展现出了更高的效率，例如 Opus 4.7 能够以更少的交互轮数和时间达到比 Opus 4.6 更高的分数。

#### 3.2 Performance across base LLMs and agent harnesses

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab2-fig3.png" alt="avatar" style="zoom:100%;" /></div>

随后，研究探讨了基础模型与智能体框架的联合效应，将闭源代码智能体（Claude Code、Codex CLI、Gemini CLI）与其最强的原生基础模型在最大推理负荷下进行配对（详见**表 2** 和**图 3**）。

此时的最佳配置变为了 Claude Code 结合 Opus 4.7（73.34分），紧随其后的是 Claude Code+Opus 4.6（69.51分）和 Codex CLI+GPT-5.4（68.69分）。该环节得出了一个极其关键的结论：**保持基础模型不变，更换智能体框架会带来分数的巨大波动，这种“框架效应”甚至超过了模型代际更迭的红利**。最典型的例子是 GPT-5.4，在 Codex CLI 下的得分为 68.69，而在 Terminus-2 下仅为 55.19，这 **13.5 分的巨大差距完全归因于智能体架构的设计**；这一差距远超 Anthropic 同一框架下 Opus 4.7 与 Opus 4.6 之间的代际分差（3.8 分）。然而，框架带来的分数提升往往伴随着运行成本和交互轮数的剧增。例如，在 Codex CLI 下，GPT-5.4 的交互轮数从 13 轮激增至 82 轮，成本也同步上升。研究还发现，一个经过精心调优的智能体框架能够部分弥补基础模型的弱点，Codex CLI 使得 GPT-5.4 的分数反超了 GPT-5.5，逆转了它们在 Terminus-2 框架下的排名。

#### 3.3 Anatomy of agent performance

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/fig4.png" alt="avatar" style="zoom:100%;" /></div>

为了明确智能体成功与失败的具体症结，研究团队按**分析任务类型**（详见**图 4a**）和**评估维度**（详见**图 4b**）对表现进行了拆解。

在任务类型方面，难度差异显著：**GWAS-eQTL 分析**和**通路富集（Pathway Enrichment）**对所有模型而言都是最难的“硬骨头”（最高得分分别为 65 和 67），而**细胞组成（Cell Composition）**和**突变分析（Mutation Analysis）**则相对容易（前五名配置在突变分析上均达到或超过 80 分）。

研究还指出，不同框架在跨队列比较（Cross-cohort Comparison）任务上的分差最大，表明当需要跨多个数据集进行编排时，智能体框架的设计差异会显著放大。在评估维度方面，所有智能体表现出了高度一致的“偏科”现象：它们能够非常可靠地定位数据来源（来源可靠性得分高达 88%-98%）并妥善处理各种数据格式（数据处理得分 58%-78%）；但它们**一致在选择合适的分析方法（Method selection，仅 44%-67%）、结合生物学语境解释结果（Biological interpretation）以及应用科学推理（Scientific reasoning）方面表现出明显的短板**。通过对低分轨迹的定性审查，研究将这些缺陷归纳为三种反复出现的失败模式：错误的方法选择、有缺陷的生物学解释以及糟糕的科学推理逻辑。

### 4 Discussion

研究首先指出，**当前的前沿LLM智能体在生物医学数据分析方面确实取得了进展**：在固定的智能体框架下，最强的闭源模型和开源基础模型的得分高度集中（差距仅在几分以内），它们能够端到端地完成多步分析，并可靠地将结论建立在可识别的真实文献来源上 。然而，**智能体与人类专家水平之间仍存在巨大差距** 。即使是表现最好的配置，平均得分也不到75分（满分100分），并且在**选择正确的分析方法、在生物学语境下解释结果以及在多步程序中应用科学推理方面存在一致的弱点** 。研究强调，缩小这一差距不能仅仅依靠扩大基础模型的参数规模，**智能体框架（agent harness）在决定分析完成的可靠性方面起着实质性作用** 。例如，GPT-5.4在Codex CLI和Terminus-2框架下高达13.5分的分差，远超Claude Opus 4.7与4.6之间3.8分的模型代际差距 。随着结构化脚手架（scaffolding）的引入，数据处理和工具误用等执行层面的失败会有所减少，但推理层面的失败却不受框架影响而持续存在 。由于目前测试的通用代码智能体并非专为生物医学研究设计，研究认为**开发具备生物医学领域意识的智能体框架（如内置领域惯例、专门的数据加载工具、统计默认选择和结构化的生物学解释步骤）具有极大的潜力** 。  

此外，讨论部分还指出了该框架的未来扩展方向与当前面临的局限。由于BiomniBench具有模块化特性，研究团队未来将把任务类型扩展到实验设计、文献综合以及蛋白质设计和检测开发等协议优化任务 。同时，基准测试将向需要与用户进行多轮协作的**长周期、计算密集型任务**延伸，以更真实地反映科研人员在实践中与智能体交互的模式 。在局限性方面，研究坦言**构建评分量表是一项耗费大量专家精力的工作**，且很难穷尽所有合理的分析路径，因此量表之外可能存在其他正确的替代方法 。虽然LLM裁判在整体上与人类专家高度一致（Cohen's kappa = 0.70），但它不能完全替代人类在最主观维度上的判断；对于高风险的评估，建议结合人工审查 。为了突破人工成本的瓶颈，**未来的一个自然发展方向是让智能体本身协助构建基准测试**，即让AI从文献中起草候选任务和量表供专家审核，从而使该评估框架能够扩展到更广泛的任务类型和更大的任务池中 。

<hr align="left" color="#987cb9" size="1">
