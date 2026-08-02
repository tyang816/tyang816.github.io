---
layout: post
title: arXiv-2026 BiomniBench：Process-level Evaluation of LLM Agents for Real-world Biomedical Research
categories: [BI]
tags: [protein, agent]
proceedings: arXiv
date: 2026-05-12
lang: en
alt_url: /zh/bi/BiomniBench-Process-level-Evaluation-of-LLM-Agents-for-Real-world-Biomedical-Research/
permalink: /bi/BiomniBench-Process-level-Evaluation-of-LLM-Agents-for-Real-world-Biomedical-Research/
---

> Paper: [BiomniBench：Process-level Evaluation of LLM Agents for Real-world Biomedical Research](https://www.biorxiv.org/content/10.64898/2026.05.12.724604v1)
>
> Dataset: <https://huggingface.co/datasets/phylobio/BiomniBench-DA>

## BiomniBench: A Process-Level Benchmark for Biomedical Analysis Agents

### Abstract

Large language model (LLM) agents can now carry out real biomedical research, yet rigorous evaluation remains difficult because outcome-only benchmarks suffer from two major flaws. **First**, a correct final answer may reflect memorization, reward hacking, or flawed reasoning that happens to land on the right number; **second**, valid alternative analyses are marked wrong simply because they differ from a reference standard. To address these issues, the authors introduce **BiomniBench**, a process-level evaluation framework that scores an agent’s full analysis trajectory against expert-designed, task-specific rubrics. The first release, **BiomniBench-DA**, comprises 100 data-analysis tasks spanning 17 task types, five disease areas, and a general biology category; tasks are grounded in papers from top journals such as *Nature*, *Cell*, and *Science*, and were co-developed with original authors or domain experts. The study benchmarks frontier closed-source and open-weight models under four agent harnesses and reports three core findings: (1) frontier and open foundation models cluster tightly (within a few points) and all leave substantial room for improvement; (2) **changes in the agent harness shift scores by more than the gap between consecutive model generations**; and (3) agents reliably anchor claims in real literature sources but consistently fall short on **method selection, biological interpretation, and scientific reasoning**. Overall, BiomniBench is the first process-level benchmark for LLM agents in biomedical research, offering fine-grained, dimension-level diagnostics that outcome-only scoring cannot provide.

### 1 Introduction

LLM agents are reshaping biological research. By combining language understanding with code execution, tool use, and structured database access, today’s agents can design CRISPR and gene-perturbation experiments, analyze spatial transcriptomics, plan automated chemistry workflows, support drug discovery, and interpret clinical multi-omics—work that once required hours or days of expert effort. As these capabilities mature, dedicated biomedical agents and general coding agents such as Claude Code and OpenAI Codex are being adopted seriously in academic and industrial scientific workflows, raising a central question: how do we know when an agent is actually doing good science? Most existing benchmarks answer this by scoring final answers (exact match, binary correctness, or pass/fail on held-out outcomes, e.g., HLE and BixBench). That works for questions with a single verifiable answer, but in complex biomedical research **outcome-only evaluation fails in two ways**:

1. Final-answer benchmarks invite data contamination and **reward hacking**. Published datasets often appear in training corpora, and outcome scoring rewards hitting the right answer rather than a rigorous analysis. An agent may return a clean volcano plot, a ranked gene list, and a confident interpretation while its trajectory reveals incorrect normalization, ignored batch effects, and fabricated citations.
2. Real research is open-ended: **multiple analysis paths can yield different yet equally reasonable answers**, so outcome matching penalizes rigorous alternatives that diverge from a reference. In biology the cost is especially high, because flawed analyses can propagate quietly into wet-lab work, drug-development decisions, and downstream pipelines for months before anyone notices.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/fig1.png" alt="avatar" style="zoom:100%;" /></div>

To overcome these limitations, the authors introduce **BiomniBench**, a **process-level evaluation framework** for LLM agents on biomedical research tasks. Rather than scoring only final outputs, BiomniBench uses an LLM judge to rate the agent’s **full analysis trajectory** against expert-designed, task-specific rubrics (as in Figure 1). Three design principles shape the framework:

1. **Ground tasks in real-world research**: each task derives from published work and requires multi-step reasoning, method choice, and interpretation of results.
2. **Evaluate process, not output alone**: rubrics score the quality of analytical decisions at each step, separating lucky correctness via wrong methods from rigorous methods that miss perfection by small margins.
3. **Allow multiple valid approaches**: each rubric encodes alternative analysis paths so agents are not penalized for reasonable choices that differ from the reference analysis.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/fig5.png" alt="avatar" style="zoom:100%;" /></div>

To scope the first release, the team **analyzed 32,014 user submissions on the open Biomni platform** and found that **data analysis dominates at 63.3%**, far ahead of literature research, experimental design, quick factual queries, and manuscript writing. They therefore released **BiomniBench-DA**: 100 data-analysis tasks curated from *Nature*, *Cell*, *Science*, and comparable venues, spanning 17 task types, five disease areas, and a general biology category. Each task was co-developed with original authors or domain experts with five or more years of research experience, and includes underlying public data, multi-step reference trajectories, and task-specific rubrics scored across **data handling, method selection, statistical rigor, biological interpretation, scientific reasoning, and source reliability**.

The study benchmarks frontier closed-source systems (Claude Opus 4.7, GPT-5.5, Gemini 3.1 Pro) and open-weight models (GLM-5.1, Qwen 3.6, Kimi K2.6) under four agent harnesses (Codex CLI, Terminus-2, Claude Code, Gemini CLI). Results show tight clustering between frontier and open foundation models (within a few points) and large headroom for all models; **harness choice shifts scores by more than the gap between consecutive model generations**; and dimension-level analysis shows agents reliably ground claims in real literature but consistently struggle with **method selection, biological interpretation, and scientific reasoning**. Together, these findings establish BiomniBench as the first process-level benchmark for LLM agents in real biomedical research—a shared yardstick for model developers, agent builders, and the scientific community to track progress.

### 2 BiomniBench-DA: Benchmark design

BiomniBench-DA presents biomedical research tasks to agents the way researchers encounter them in practice: published studies supply questions and reference solutions, co-developed rubrics score agent trajectories, and the **Harbor execution framework** provides a standardized environment to unify outputs across agent harnesses.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### 2.1 Expert-driven curation pipeline

The 100 BiomniBench-DA tasks are produced through a five-stage pipeline (top of **Figure 2**), from analyzing biomedical agent usage to building task-specific rubrics.

- **Analyzing Biomni user traces:** The team analyzed **32,014 user queries** on the open Biomni platform to see what scientists actually ask agents to do. Data analysis dominates, motivating BiomniBench-DA as the framework’s first release. Common biomedical domains include oncology, immunology, and neuroscience; common tasks span differential expression, pathway analysis, and a long tail of specialized analyses.
- **Paper selection:** From these patterns, source papers were chosen using four criteria: (1) analyses match common task types seen in Biomni user traces; (2) coverage spans diverse disease areas and methods across basic and translational science, keeping the benchmark relevant to academia and industry; (3) underlying data are publicly available via GEO, ArrayExpress, or supplementary materials; (4) papers appear in high-impact journals (*Nature*, *Cell*, *Science*, and sister journals) or comparable recent preprints. The final 100 tasks come from 21 such publications (full list in **Appendix Table 4**).
- **Expert curation:** For each selected paper, the team **recruits original authors or domain experts with five or more years of research experience** to pose research questions and prepare underlying datasets. The goal is not mere reproduction of the paper’s analysis but capturing varied difficulty and thematic diversity, including questions the paper did not directly address but the data can support.
- **Ground-truth generation:** Experts produce reference analysis trajectories as Jupyter notebooks or R Markdown, documenting code and reasoning, final answers, and biological interpretation beyond what the source paper reports. Each trajectory is verified on public data and reviewed over multiple rounds by independent reviewers.
- **Rubric design:** Each task includes a task-specific rubric with **5–10 criteria** anchored at key analytical decision points, tagged to one of six dimensions: **data handling, method selection, statistical rigor, biological interpretation, scientific reasoning, and source reliability**. Each criterion is graded A (fully correct), B (right intent with minor errors or partial match), or C (skipped or wholly wrong). Rubrics list multiple valid alternatives so agents on reasonable but different paths are not penalized.

#### 2.2 Evaluation protocol

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab3.png" alt="avatar" style="zoom:100%;" /></div>

- **Standardized agent execution:** All tasks are ported to the Harbor execution framework, which provides a sandbox runtime and interfaces to agent harnesses (Codex CLI, Terminus-2, Claude Code, Gemini CLI). Each task runs in a Docker container with Python 3 and R preinstalled, 2 CPUs, and a one-hour budget. Instructions require agents to output `trace.md` (analysis narrative, decisions, code, etc.) and `answer.txt` (a structured short answer to the main question) upon completion. Agents are strictly forbidden from searching for or reading the specific source paper for the task.
- **LLM judge:** An LLM judge scores agent trajectories against task rubrics. Given the rubric, `trace.md`, and `answer.txt`, it assigns the A/B/C level that best matches the agent’s work; a 0–100 score is computed programmatically from the rubric. Among five candidate LLMs, **Gemini 3.1 Pro** showed the strongest agreement with human experts (82% accuracy, linearly weighted Cohen’s $\kappa=0.70$) and was chosen as the judge for the full benchmark.

#### 2.3 Dataset statistics

BiomniBench-DA spans a broad range of biomedical data analysis: 100 tasks across five disease areas (plus a general biology category) and 17 task types, drawn from 21 high-impact publications (bottom of **Figure 2**).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab4-1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab4-2.png" alt="avatar" style="zoom:100%;" /></div>

- **Disease areas:** **Oncology** (47%), **metabolic and endocrine disease** (17%), **immunology** (14%), **general biology** (10%), **neuroscience** (8%), and **cardiovascular** (4%).
- **Analysis task types:** 17 types in total. The six most common account for 55% of the benchmark and represent core day-to-day biomedical work: **association testing (11%)**, **mutation analysis (10%)**, **multi-omic integration (10%)**, **pathway enrichment (8%)**, **differential expression (8%)**, and **clustering (8%)**. The remaining 45% is a long tail of specialized analyses such as predictive modeling, cell composition analysis, survival analysis, and single-cell network inference.

### 3 Experiments and results

The authors use controlled comparisons to isolate base model capability, harness effects, and fine-grained performance by task type and evaluation dimension.

#### 3.1 Performance of base LLMs with fixed harness

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab1.png" alt="avatar" style="zoom:100%;" /></div>

To isolate base LLM ability, nine frontier models were first evaluated under a single general coding agent framework, Terminus-2 (**Table 1**).

**Closed frontier models lead and scores cluster tightly:** Claude Opus 4.7 (63.94), GPT-5.5 (63.57), Claude Opus 4.6 (63.16), and Claude Sonnet 4.6 (62.35) differ by less than 1.6 points. Meanwhile, **strong open-weight models are competitive and cost-effective**: GLM-5.1 (60.39), Qwen 3.6 (59.47), and Kimi K2.6 (59.15) trail frontier models by only 3–5 points but cut per-task cost sharply (e.g., GLM-5.1 at $0.58 vs. Opus 4.7 at $0.87).

Even the best configuration averages below 64/100, indicating large room for improvement for all models. Notably, Gemini 3.1 Pro is an outlier: it produces the shortest trajectories (median 4.9 minutes) and fewest turns yet scores much lower (44.27). Newer generations also show higher efficiency—for example, Opus 4.7 reaches a higher score than Opus 4.6 with fewer turns and less time.

#### 3.2 Performance across base LLMs and agent harnesses

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/tab2-fig3.png" alt="avatar" style="zoom:100%;" /></div>

The study then examines joint effects of base models and harnesses, pairing closed coding agents (Claude Code, Codex CLI, Gemini CLI) with their strongest native base models at maximum reasoning load (**Table 2**, **Figure 3**).

The best configuration becomes Claude Code with Opus 4.7 (73.34), followed by Claude Code + Opus 4.6 (69.51) and Codex CLI + GPT-5.4 (68.69). A key finding: **holding the base model fixed, switching harnesses can swing scores dramatically—the “harness effect” can exceed gains from a model generation upgrade**. GPT-5.4 scores 68.69 under Codex CLI but only 55.19 under Terminus-2; the **13.5-point gap is entirely attributable to agent architecture**, far larger than the 3.8-point gap between Opus 4.7 and Opus 4.6 under the same Anthropic framework. Harness gains often come with higher cost and more turns—for example, GPT-5.4 under Codex CLI jumps from 13 to 82 turns with corresponding cost increases. A well-tuned harness can also partially compensate for base-model weaknesses: Codex CLI lifts GPT-5.4 above GPT-5.5, reversing their ranking under Terminus-2.

#### 3.3 Anatomy of agent performance

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/BiomniBench/fig4.png" alt="avatar" style="zoom:100%;" /></div>

To pinpoint where agents succeed and fail, performance is broken down by **analysis task type** (**Figure 4a**) and **evaluation dimension** (**Figure 4b**).

Task difficulty varies widely: **GWAS–eQTL analysis** and **pathway enrichment** are the hardest nuts to crack for all models (top scores 65 and 67), while **cell composition** and **mutation analysis** are relatively easier (top five configurations reach ≥80 on mutation analysis).

Harness gaps are largest on cross-cohort comparison tasks, suggesting that orchestration across multiple datasets amplifies design differences among harnesses. Across dimensions, agents show a consistent skew: they **reliably identify data sources** (source reliability 88%–98%) and **handle diverse data formats** (data handling 58%–78%), but **consistently underperform on choosing appropriate methods (method selection, 44%–67%), interpreting results in biological context (biological interpretation), and applying scientific reasoning**. Qualitative review of low-scoring trajectories summarizes recurring failure modes: wrong method choice, flawed biological interpretation, and weak scientific reasoning.

### 4 Discussion

The authors first note that **frontier LLM agents have made real progress on biomedical data analysis**: under a fixed harness, the strongest closed-source and open foundation models cluster within a few points, complete multi-step analyses end to end, and reliably ground conclusions in identifiable real literature. Yet **a large gap remains versus human experts**. Even the best configuration averages below 75/100 and shows consistent weaknesses in **choosing correct methods, interpreting results biologically, and applying scientific reasoning across multi-step procedures**. Closing this gap cannot rely on scaling base models alone—**the agent harness materially affects how reliably analyses complete**. For example, GPT-5.4’s 13.5-point split between Codex CLI and Terminus-2 far exceeds the 3.8-point generational gap between Claude Opus 4.7 and 4.6. Structured scaffolding reduces execution failures such as mishandled data and tool misuse, but reasoning failures persist across harnesses. Because the general coding agents tested are not purpose-built for biomedical research, **domain-aware agent harnesses**—built-in conventions, specialized data loaders, statistical defaults, structured biological interpretation steps—offer substantial upside.

The discussion also outlines extensions and limitations. BiomniBench is modular; future work will expand task types to experimental design, literature synthesis, and protocol optimization such as protein design and assay development, and extend toward **long-horizon, compute-intensive tasks** that require multi-turn collaboration with users, mirroring how researchers interact with agents in practice. On limitations, **rubric construction is expert-intensive** and cannot enumerate every reasonable analysis path, so correct alternatives may exist beyond the rubric. Although the LLM judge aligns well with humans overall (Cohen’s $\kappa = 0.70$), it cannot fully replace human judgment on the most subjective dimensions; high-stakes evaluation should combine automated scoring with human review. To ease the cost bottleneck, **a natural direction is agent-assisted benchmark construction**—AI drafts candidate tasks and rubrics from literature for expert review—so the framework can scale to more task types and larger pools.

<hr align="left" color="#987cb9" size="1">
