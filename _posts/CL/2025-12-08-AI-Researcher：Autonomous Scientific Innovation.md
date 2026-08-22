---
layout: post
title: NeurIPS-2025 AI-Researcher：Autonomous Scientific Innovation
categories: [CL]
tags: [Agent, NLP, LLM]
proceedings: NeurIPS
date: 2025-12-08
lang: en
alt_url: /zh/notes/cl/AI-Researcher：Autonomous-Scientific-Innovation/
permalink: /notes/cl/AI-Researcher：Autonomous-Scientific-Innovation/
redirect_from:
  - "/cl/AI-Researcher：Autonomous-Scientific-Innovation/"
  - "/CL/AI-Researcher：Autonomous-Scientific-Innovation/"
---

> Paper: [AI-Researcher：Autonomous Scientific Innovation](https://openreview.net/pdf/a1c63cdd0495de94664b1513f7d95a3aedcb483a.pdf)
>
> Code: <https://github.com/HKUDS/AI-Researcher>

## AI-Researcher: AI Systems That Produce AI Science Papers

### Abstract

Large language models (LLMs) exhibit strong reasoning in **mathematics and programming**, and their ability to automate complex tasks through agent frameworks creates an unprecedented opportunity to accelerate scientific innovation. This work introduces **AI-Researcher**, a **fully autonomous research system** aimed at transforming how AI-driven scientific discovery is conducted and evaluated.

The framework’s main features and contributions include:

- **End-to-end automated pipeline**: The framework seamlessly orchestrates the full research workflow—from **literature review and hypothesis generation to algorithm implementation and publication-ready manuscript preparation**—with minimal human intervention.
- **Scientist-Bench evaluation benchmark**: To rigorously assess autonomous research capability, the authors develop **Scientist-Bench**, a comprehensive benchmark spanning cutting-edge papers across multiple AI research areas, covering both **guided innovation** and **open-ended exploration** tasks.
- **Strong research outcomes**: Extensive experiments show that AI-Researcher achieves high algorithm implementation success rates and can produce research papers of **near-human quality**.
- **Extending human cognitive boundaries**: This work lays a new foundation for autonomous scientific innovation, complementing human researchers by systematically exploring solution spaces **beyond human cognitive limits**.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/fig1.png" alt="avatar" style="zoom:100%;" /></div>

**1. Bottlenecks in scientific discovery and the opportunity for AI**

Scientific discovery has long been constrained by human cognitive limits and the vast size of the underlying solution space. Although LLMs have shown remarkable ability in mathematical reasoning, coding, and problem solving—tasks once thought to require human experts—turning isolated capabilities into a **fully autonomous scientific research system** capable of original innovation remains an open challenge that could fundamentally change how science advances.

**2. The complexity of scientific innovation**

Scientific innovation sits at an intellectual frontier whose difficulty exceeds task automation already mastered by AI agents (e.g., scheduling or structured information retrieval) by orders of magnitude. Genuine scientific discovery requires:

- Sophisticated **conceptual reasoning** in abstract theoretical domains.
- **Transformative hypothesis generation** that spans knowledge areas.
- **Methodological innovation** beyond simple pattern recognition.
- Insights that advance the knowledge frontier while maintaining coherent understanding across thousands of papers.

Moreover, scientific exploration navigates an unbounded solution space with highly uncertain payoffs, demanding **metacognitive ability** to identify promising directions and abandon unproductive paths. Researchers must revise hypotheses in light of unexpected findings and preserve the creative spark that drives breakthroughs.

**3. Limitations of current systems**

Present limitations prevent AI systems from conducting meaningful science autonomously; AI remains confined to narrow assistive roles.

- **Lack of coordination**: Systems exist for literature analysis or experiment design, but none orchestrate the full pipeline from hypothesis generation to publication-quality reporting.
- **Lack of standard benchmarks**: There is no standardized benchmark for systematically evaluating autonomous research capability across scientific domains.

**4. The AI-Researcher framework and its core innovations**

To address these limits, the authors introduce **AI-Researcher**. As shown in **Figure 1**, the framework covers the full lifecycle from literature exploration, idea generation, algorithm implementation, and experimental validation to academic publication.

The framework introduces three key innovations:

1. **Resource Analyst Agent**: Decomposes complex research concepts into atomic components and establishes explicit bidirectional mapping between mathematical formulations and code implementations, substantially reducing hallucination risk.
2. **Implementation Framework**: Uses a human-inspired iterative refinement paradigm with structured feedback loops, simulating the “advisor–student” dynamic in academic research.
3. **Documentation Agent**: Overcomes LLM limitations on long-text coherence via hierarchical synthesis, turning research outputs into publication-quality manuscripts while preserving factual integrity.

**5. Scientist-Bench and findings**

To rigorously evaluate such systems, the authors develop **Scientist-Bench**, the first comprehensive benchmark supporting standardized evaluation under guided innovation and open-ended exploration, built from 22 benchmark papers.

- **Strong performance**: Experiments show that AI-Researcher achieves notable implementation success rates, with research contributions frequently approaching human-level quality.
- **Unexpected finding**: AI-Researcher performs **better on open-ended exploration** than on guided tasks, suggesting that autonomous research systems excel when leveraging internal knowledge synthesis rather than following specific instructions.

### 2 Scientist-Bench: Benchmarking AI Agents for Scientific Discovery

Scientific discovery demands deep expertise and systematic methodological reasoning. Developing benchmarks and metrics for evaluating novel scientific discoveries in this setting remains challenging. This work introduces **Scientist-Bench**, a comprehensive benchmark that compares research produced by LLM agents with expert human work. Unlike existing benchmarks, Scientist-Bench provides a full framework including:

- Carefully curated research instructions;
- Reference literature;
- Datasets derived from peer-reviewed papers.

The benchmark enables direct comparison between AI-generated content and human scientific contributions through multi-dimensional evaluation criteria. The authors define the scientific discovery task as follows (full benchmark details are in Appendix A.7):

**1. Task Formulation**

The benchmark evaluates the scientific research capability of agent systems.

- **Input**: Input `$\mathcal{X}=\{\mathcal{R},I,\mathcal{D}\}$` consists of:
  - **Reference papers `$\mathcal{R}$`**: 15–20 relevant works selected via LLM;
  - **Research instruction `$I$`**: An instruction capturing the core research idea; a detailed instruction is designed so researchers can implement the core methodology without reading the full target paper:
    - **Task description**: The specific task the model performs.
    - **Core techniques and algorithms**: Including concrete neural architectures, optimization methods, and data processing.
    - **Component roles**: Purpose and function of each major technical component.
    - **Implementation details**: Key hyperparameters, I/O specifications, and important constraints.
    - **System interaction description**: Step-by-step explanation of how components interact and compose a full system.
    - **Performance-critical points**: Implementation details that strongly affect model performance.
  - **Dataset `$\mathcal{D}$`**, handled collaboratively by the **Plan Agent** and **Code Agent**:
    - Derived from peer-reviewed target papers in Scientist-Bench; varies by domain, including computer vision (diffusion models), signal processing (vector quantization), graph learning (GNNs), and information retrieval (recommender systems), among others.
    - **Dataset planning**: The **Plan Agent** produces a detailed “dataset plan” covering dataset description, storage location, task definition, and a full data-loading pipeline (read, preprocess, DataLoader steps).
    - **Environment setup**: All datasets run in a controlled **Docker container** environment with dynamic dependency installation so data-processing code executes reliably.
    - **Code implementation**: The **Code Agent** must strictly follow the plan and use the specified academic datasets to validate model components.
- **Challenge levels**: Scientist-Bench defines two levels:
  - **Level-1**: Provides **explicit research instructions** extracted from the target paper `$y$`, testing **execution capability**;
  - **Level-2**: **Omits these instructions**, challenging agents to formulate novel research directions using only references and datasets.
- **Output**: Output `$\hat{\mathcal{Y}}=\{\mathcal{C},p\}$` includes:
  - **Implementation code `$\mathcal{C}$`**;
  - **Technical report `$p$`**: Detailed background, methodology, experiments, and results.
- **Evaluation**: Both code and report are evaluated against human-generated research for quality and novelty, yielding assessment along theoretical and practical dimensions.

**2. Benchmark Construction**

**Step 1: Systematic paper selection**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/tab5.png" alt="avatar" style="zoom:80%;" /></div>

The authors first systematically collect samples from papers published in 2022–2024 across **16 research areas** (e.g., computer vision, graph learning, recommender systems). The process combines **LLM keyword generation** with **arXiv citation filtering**: LLMs generate domain keywords, retrieve the top-10 cited papers per keyword, and finally select **22** representative works showcasing breakthrough AI results as the benchmark foundation. See **Table 5** for the distribution.

**Step 2: Input construction**

This step supplies initial conditions analogous to human research, along two core dimensions:

- **Reference literature survey (`$\mathcal{R}$`)**: To identify **15–20 papers** that fundamentally influenced the target work, the authors design a rigorous **five-step LLM evaluation pipeline**:
  1. **Citation pattern analysis**: Citation frequency, location, and cross-section distribution.
  2. **Contextual analysis**: Depth of influence on methodology, theory, and experimental design.
  3. **Evidence collection**: Concrete concept borrowing, improvements, and impact evidence.
  4. **Impact scoring**: Composite score from frequency (30%), location (25%), depth (25%), and direct influence (20%).
  5. **Final selection**: Rank by score with detailed justification.
- **Research requirement generation (`$I$`)**: LLMs extract core concepts, limitations, and main goals from the target paper. To preserve originality and prevent leakage, extraction **must not include** specific technical specifications, model identifiers, quantitative results, or architecture details.

**Step 3: Rigorous anonymization**

To distinguish genuine problem solving from regurgitation of memorized training data, the benchmark applies a comprehensive anonymization protocol:

- **Method name masking**: Replace specific algorithm and model names with generic identifiers to test conceptual understanding.
- **Technical detail abstraction**: Remove concrete implementation details while retaining core principles.
- **Dataset standardization**: Normalize experimental context to prevent shortcutting via familiarity with specific datasets.
- **Citation anonymization**: Remove temporal (year) and institutional markers from references.

Through this construction, Scientist-Bench separates **Level-1 (guided innovation)** and **Level-2 (open-ended exploration)**, testing execution versus independent innovation.

### 3 The AI-Researcher Framework

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/fig2.png" alt="avatar" style="zoom:100%;" /></div>

**AI-Researcher** is a systematic framework for turning scientific concepts into complete academic contributions with minimal human supervision. It builds on recent work on the potential of AI for autonomous scientific discovery and introduces a three-stage pipeline:

1. **Literature review and idea generation**.
2. **New algorithm design, implementation, and validation**.
3. **Automated scientific documentation**.

The architectural overview is shown in **Figure 2**.

#### 3.1 Multi-Agent System Overview of AI-Researcher

##### 3.1.1 Literature Review

This stage comprises the following core components:

- **Knowledge Acquisition Agent**:
  - **Autonomous exploration**: Systematically collects relevant papers and codebases from scientific databases.
  - **Low input barrier**: Users need only provide 10–15 reference papers.
  - **Core functions**:
    1. **Codebase selection**: Filters at least five high-quality GitHub repositories by recency, popularity, documentation quality, domain relevance, and citation impact.
    2. **Supplementary literature**: Automatically retrieves arXiv papers for selected repos, including full LaTeX sources, to enrich technical context.

- **Resource Analyst Agent**:
  - Deconstructs research concepts into manageable **atomic components**.
  - Via **Paper Analyst** and **Code Analyst** sub-agents, precisely extracts mathematical formulas and aligns them with code implementations for theory–practice consistency.
  - **Analysis pipeline**: Concept decomposition, mathematical formalization, implementation analysis, and knowledge integration, culminating in a detailed research report.

- **Secure Research Environment**:
  - To protect the host, all automated operations run in **Docker containers** with strong isolation, preconfigured ML stacks, and dynamic package management for autonomous dependency installation.

- **Integrated Research Analysis**:

  The **Resource Analyst** bridges abstract concepts and concrete implementations, substantially reducing hallucination risk in later development. It follows a structured analysis workflow:

  1. **Concept Decomposition**: Breaks complex research goals into fundamental, indivisible atomic academic concepts.
  2. **Mathematical Formalization**: **Paper Analyst** inspects LaTeX via a **RAG (retrieval-augmented generation)** paradigm and extracts mathematical expressions for each atomic concept.
  3. **Implementation Analysis**: **Code Analyst** analyzes codebases, locates implementations of those expressions, and identifies key files and dependencies.
  4. **Knowledge Integration**: Synthesizes paper and implementation analyses into **Concept Profiles** linking formulas and code. The loop continues until all concepts are thoroughly investigated, producing a detailed research report.

- **Plan Agent**: After the loop completes and concepts are thoroughly studied, converts findings into a comprehensive **implementation roadmap** covering training procedures, evaluation protocols, and dataset requirements—a fully executable research strategy.

##### 3.1.2 Idea Generation

The **Idea Generator** aims to move beyond established paradigms toward new scientific frontiers. After integrated analysis, it identifies unexplored research areas through knowledge synthesis, systematically seeking **conceptual gaps, contradictory findings, and emerging patterns** where discovery often arises.

Each proposal includes: **challenge analysis** (pinpointing limits of understanding), **existing methods** (surfacing innovation opportunities), **motivation** (scientific necessity), **proposed approach** (new theory or algorithms), **technical details**, and **expected outcomes**.

- **Divergent–Convergent Discovery**: Inspired by prior work, the process first enters a **divergent phase** generating five distinct research directions from orthogonal perspectives. In the **convergent phase**, concepts are scored on **scientific novelty, technical soundness, and transformative potential**; the top-scoring idea is developed into a formal proposal with a clear path forward.

#### 3.2 New Algorithm Design, Implementation and Validation

Translating novel research concepts into working code is among the hardest aspects of computational science. Unlike one-shot implementations typical of conventional code agents (which often yield errors or research drift), this framework introduces iterative refinement and collaborative feedback mirroring human research practice.

- **Multi-Stage Refinement Architecture**: Implements a cyclic development process with explicit feedback for incremental improvement. Like advisor–student collaboration, structured guidance iteratively refines implementations, leveraging test-time scaling to raise success rates.
- **Code Implementation Framework**: The **Code Agent** turns research analysis and development plans into executable code in a controlled workspace with full filesystem and execution access. It enforces strict code independence while faithfully translating academic concepts, with continuous validation and change logging against the implementation plan.
- **Expert Validation Framework**: The **Advisor Agent** bridges theory and implementation via expert feedback. It verifies fidelity by systematically comparing code against atomic research ideas from the analysis phase, using specialized navigation tools, visualization, and workspace artifacts to produce evaluation reports with concrete, actionable revision guidance.
- **Progressive Experimental Cycles**: Experiments validate code through rigorous scientific method. The Code Agent first builds a prototype and runs small-scale tests (often 1–2 epochs or small data subsets) to establish baseline feasibility. Successful implementations incorporating review feedback proceed to full-scale experiments; implementations that fail after repeated refinement are labeled **infeasible**. Throughout, the Advisor Agent supports analysis by evaluating results and recommending follow-ups (e.g., visualization, ablations), preserving scientific rigor and reproducibility.

#### 3.3 Automated Scientific Documentation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/fig3.png" alt="avatar" style="zoom:50%;" /></div>

After substantial implementation and experimental cycles, the Documentation Agent runs a complex pipeline converting technical artifacts into publication-standard academic papers. As shown on the right of **Figure 3**, this is not simple text filling but a full system from research-trajectory synthesis to hierarchical writing.

**1. Research Trajectory Synthesis**

- **Multi-dimensional integration**: Systematically integrates agent reasoning, execution logs, source code, and experimental results.
- **Preserving intellectual context**: Unlike simple documentation tools, the system captures not only final outcomes but decision paths that led to scientific progress, preserving full discovery context.
- **Academic normalization**: Organizes findings according to established conventions, turning technical detail into coherent scientific narrative.

**2. Overcoming Document-Scale Coherence Challenges**

- **Addressing LLM limits**: To mitigate logical inconsistency in long-form LLM generation, the team developed a multi-stage generation framework.
- **Mimicking human strategy**: Inspired by how human researchers draft papers, writing is decomposed into manageable components to preserve logical flow and factual integrity at scale.

**3. Three-Phase Hierarchical Documentation**

The agent follows a rigorous three-phase process to ensure manuscript quality:

- **Phase 1: Synthesize research artifacts**: Structured outlining from domain-specific templates, establishing section hierarchy and logical flow.
- **Phase 2: Template-guided structure**: Systematic elaboration of content with cross-document consistency in explanations.
- **Phase 3: Hierarchical document processing**: Systematic verification with specialized academic checklists to find and fix accuracy gaps or omissions.

This extra review pass substantially strengthens factual integrity, helping manuscripts meet publication standards and avoiding hallucinations and inconsistencies common in long LLM outputs.

### 4 Experiments

The authors evaluate **AI-Researcher** on **Scientist-Bench**. Experiments cover all 22 benchmark papers, multiple LLM evaluators, implementation success rates, and research contribution quality.

#### 4.1 Dual-Metric Evaluation Framework: Quantifying Implementation Quality (RQ1)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/fig4.png" alt="avatar" style="zoom:50%;" /></div>

To assess stability and quality of code implementation from requirements, the authors propose a **dual-metric evaluation framework** with **completeness** and **correctness**.

**1. Metric definitions and evaluation protocol**

- **Completeness**: Whether the agent produces executable code within the allocated reasoning budget. Evaluation uses explicit termination: success via `case_resolved`, failure via `case_not_resolved`.
- **Correctness**: Captures subtle implementation flaws, conceptual misalignment, or missing components even when code runs. A multi-agent pipeline applies: the **Advisor Agent** produces a detailed analysis report, then the **Judge Agent** scores on a 5-point scale. Final correctness is the mean over independent judgments.

**2. Performance analysis**

As shown in **Figure 4**, experiments use **Claude-family models** across the full benchmark:

- **High completeness**: The system reaches **93.8%** completeness, failing mainly on persistent tensor shape conflicts or dtype mismatches that resist debugging.
- **Correctness**: Mean correctness is **2.65** / 5, above the midpoint, indicating most specified requirements are implemented successfully.
- **Domain variation**: Performance varies by domain; **vector quantization (VQ)** tasks score highest (3.22), while **recommender systems (Rec)** average 2.20, reflecting greater algorithmic and data-processing complexity.

**3. Cross-model comparison**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/fig5.png" alt="avatar" style="zoom:100%;" /></div>

Controlled evaluation in **Figure 5 (left)** reveals large gaps across model families:

- **Claude vs 4o**: On the evaluation subset, Claude models reach **87.5%** completeness versus **50%** for 4o-family models.
- **Debugging gap**: The gap stems largely from debugging: 4o models often leave persistent tensor shape mismatches and training instability (e.g., NaN loss) unfixed.
- **Correctness gap**: Claude averages **2.75** correctness versus **1.0** for 4o. 4o tends toward oversimplification and conceptual omissions on hard tasks—for example, claiming a Diffusion Transformer in diffusion tasks while implementing only a standard ViT without core diffusion components.

**4. Effect of task complexity (Level-2)**

**Figure 5 (right)** compares Level-1 (adapt existing methods) vs Level-2 (generate and implement new ideas):

- **Robust completeness**: Even on harder Level-2 innovation tasks, AI-Researcher maintains **100%** completeness.
- **Modest correctness drop**: Correctness falls from 2.5 at Level-1 to **2.25** at Level-2, indicating reliable execution of self-generated ideas but occasional quality loss on novel, complex concepts—due to higher technical difficulty of agent-generated innovations or limits in perfectly realizing ambitious ideas.

#### 4.2 Evaluating Scientific Quality Through Pairwise Comparison (RQ2)

To assess scientific value of AI-Researcher outputs, the authors use a **pairwise evaluation protocol** comparing AI-generated papers with **human publications** in matched domains.

**1. Protocol and dimensions**

Dedicated reviewer agents follow **ICLR guidelines**, comparing **motivation, methodology, novelty, and experimental validation**.

**2. Overall performance**

Pairwise results show AI-Researcher papers score slightly below human work on average (mean scores between **−0.53 and −1.70** across evaluators), yet a **substantial fraction (13.64% to 81.82%)** of AI papers match human research quality.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/tab1.png" alt="avatar" style="zoom:100%;" /></div>

This is notable because human baselines are **top-tier publications** carefully selected from leading venues. As **Table 1** shows, AI-Researcher demonstrates strong end-to-end capability—from methodological innovation and rigorous experiments to coherent, well-structured manuscripts.

**Table 1: AI-Researcher vs benchmark human research** — Scores from evaluators (GPT-4o, o1-mini, Claude-3.5/3.7, etc.) across domains (Diffusion, VQ, GNN, Rec):

- **GPT-4o** is most generous: mean **−0.53**, **81.82%** comparable.
- **Claude-3.7** is strictest: mean **−1.70**, only **22.73%** comparable.

**3. Evaluator disagreement and preferences**

Experiments show significant disagreement among LLM evaluators:

- **Score spread**: GPT-4o tends highest; Claude-3.7 strictest.
- **Domain preferences**: GPT-4o and o1-mini rate all Rec papers comparable to human work; o3-mini rates them lower.
- **Evaluation bias**: Disagreement highlights **potential bias** when relying on a single LLM evaluator.

**4. Domain-specific analysis**

Performance fluctuates across domains **without a consistent pattern**:

- With GPT-4o and Claude-3.7, Diffusion comparability exceeds GNN; with o1-mini, the reverse holds.
- Evaluators conflict on VQ vs Diffusion as well.

Overall, variation reflects **evaluator preferences** more than domain difficulty, suggesting **consistent performance** across areas without catastrophic failure in any one domain.

#### 4.3 Open-Ended Autonomous Scientific Innovation Capabilities (RQ3)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/tab2.png" alt="avatar" style="zoom:100%;" /></div>

To assess innovation potential, the team tests **AI-Researcher** on **open-ended tasks** with references only—no explicit instructions—requiring independent identification of directions, hypotheses, and full research execution.

**Table 2** summarizes cross-domain pairwise results. Five representative papers across diverse areas were selected for methodological diversity and natural citation overlap. Analysis of these autonomous explorations yields key insights on creative research capability:

**1. Performance analysis**

- **Strong Level-2 performance**: A clear pattern emerges: the system performs **better in open-ended Level-2 settings** than on **instruction-guided Level-1 tasks**.
- **Metric gains**: Mean scores improve from −0.53 ~ −1.70 to **−0.23 ~ −1.22**; comparable rates rise from 13.64% ~ 81.82% to **50.00% ~ 100.00%**.
- **Challenging conventional assumptions**: Results suggest AI-Researcher excels when leveraging **internal knowledge synthesis and ideation** rather than explicit research instructions.
- **Limits of explicit instructions**: Detailed instructions may unintentionally constrain creative exploration, whereas self-directed directions allow pursuit of scientifically promising paths better matched to implementation capability.

**2. Domain-specific resource constraints and innovation quality**

- **Compute vs performance**: Cross-domain analysis links **computational demand** to autonomous research outcomes.
- **Lightweight domains**: Lower-compute areas—especially **recommender systems**—show large quality gains in open exploration, reaching **66.67% to 100%** comparability on most evaluators.
- **Compute-intensive domains**: **Diffusion** and similar domains show similar conceptual novelty but more modest metric gains.
- **Resource limits, not capability gaps**: Differences likely reflect **practical resource constraints** rather than conceptual weakness, underscoring compute as a determinant of AI research quality and room for improvement with more resources.

#### 4.4 Impact of LLM Backbones (RQ4)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/tab3.png" alt="avatar" style="zoom:100%;" /></div>

To isolate backbone effects, the authors ablate **LLM backbones** while holding architecture and protocols fixed, using seven representative research questions.

**Table 3** shows large inter-model gaps:

- **Claude-3.5 advantage**: **Claude-3.5** as the research agent backbone consistently achieves higher mean quality scores than GPT-4o across evaluators.
- **Comparability**: Except under o1-mini, Claude-3.5 achieves better comparable rates in most settings.
- **Under strict evaluation**: With o3-mini, the gap is stark: Claude-3.5 produces human-level research; GPT-4o fails to reach minimum comparability on any instance—highlighting **backbone choice** as a ceiling on automated research quality.

#### 4.5 Paper Review Agent Validation Against Human Expert Judgments (RQ5)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/tab6.png" alt="avatar" style="zoom:100%;" /></div>

To validate automated review against expert judgment, the authors evaluate on gold-standard human decisions from **ICLR**.

The experiment uses 32 curated pairs (accepted vs rejected) with the same pairwise protocol as the main study. **Table 6** reports:

- **Robust expert alignment**: Review agents show consistent discriminative validity; all models yield positive mean scores (0.31–0.99) when comparing accepted vs rejected papers.
- **High accuracy**: Alignment with human decisions reaches **65.62% to 90.62%**; five of six evaluators exceed **81%** on the 32 pairs.
- **Model reliability**: Gemini-2.0-flash is substantially less reliable and excluded from main experiments. Claude-3.7’s extended thinking does not outperform Claude-3.5 on review.

#### 4.6 Case Studies of AI-Generated Scientific Contributions (RQ6)

Qualitative analysis examines implementation quality and scholarly presentation of AI-Researcher outputs, focusing on the `rotation_vq` benchmark task.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AI-Researcher/fig6-fig9.png" alt="avatar" style="zoom:100%;" /></div>

**1. Structured software architecture with minimal scaffolding**

- **Organized architecture**: As in **Figure 6**, the Code Agent produces well-structured projects with decoupled model components, training pipelines, and evaluation modules.
- **Development from first principles**: Unlike frameworks tied to existing codebases, AI-Researcher lets agents build **from first principles** while following software engineering best practices, improving coherence. **Figures 7 and 8** show professional coding standards and logical modularity.

**2. Emergent experimental rigor without explicit instructions**

- **Autonomous experiment design**: Multi-agent collaboration yields emergent autonomous experimental design.
- **Comprehensive evaluation**: This rigor appears in final manuscripts (**Figure 9**): independent reporting of full scientific evaluation including **performance benchmarks, controlled ablations, training dynamics visualization, and latent-space embedding analysis**.
- **Beyond instruction following**: The methodology arises naturally from the multi-agent system without explicit experimental requirements, indicating scientific reasoning beyond simple instruction following.

<hr align="left" color="#987cb9" size="1">
