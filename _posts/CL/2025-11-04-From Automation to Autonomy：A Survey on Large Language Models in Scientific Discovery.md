---
layout: post
title: EMNLP-2025 From Automation to Autonomy：A Survey on Large Language Models in Scientific Discovery
categories: [CL]
tags: [Agent, NLP, LLM]
proceedings: EMNLP
date: 2025-11-04
lang: en
alt_url: /zh/notes/cl/From-Automation-to-Autonomy：A-Survey-on-Large-Language-Models-in-Scientific-Discovery/
permalink: /notes/cl/From-Automation-to-Autonomy：A-Survey-on-Large-Language-Models-in-Scientific-Discovery/
redirect_from:
  - "/cl/From-Automation-to-Autonomy：A-Survey-on-Large-Language-Models-in-Scientific-Discovery/"
  - "/CL/From-Automation-to-Autonomy：A-Survey-on-Large-Language-Models-in-Scientific-Discovery/"
---

> Paper: [From Automation to Autonomy：A Survey on Large Language Models in Scientific Discovery](https://aclanthology.org/2025.emnlp-main.895/)
>
> Code: <https://github.com/HKUST-KnowComp/Awesome-LLM-Scientific-Discovery>

## Awesome-LLM-Scientific-Discovery: A Survey of Agents for Scientific Discovery

### Abstract

Large language models (LLMs) are catalyzing a **paradigm shift in scientific discovery**, evolving from task-specific automation tools into increasingly **autonomous agents** and fundamentally redefining the research process and human–AI collaboration.

This survey systematically organizes the emerging field, with a core focus on the **evolving role** and **growing capabilities** of LLMs in science. Through the lens of the scientific method, the authors introduce a foundational **three-level taxonomy**—**Tool**, **Analyst**, and **Scientist**—to characterize escalating autonomy and shifting responsibilities across the research lifecycle. The paper also identifies key challenges and future research trajectories, including **robotic automation**, **self-improvement**, and **ethical governance**.

Overall, the survey offers a conceptual architecture and strategic vision to guide and shape the future of AI-driven scientific discovery, aiming to foster both **rapid innovation** and **responsible progress**.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Awesome-LLM-Scientific-Discovery/fig1.png" alt="avatar" style="zoom:50%;" /></div>

**1. Research background: converging capabilities and a paradigm shift**

Continued advances in LLMs unlock a range of **emergent abilities**, such as planning, complex reasoning, and instruction following. Integrating **agentic workflows** further enables LLM-based systems to perform high-level functions, including web navigation, tool use, code execution, and data analysis.

In scientific discovery, the fusion of advanced LLM capabilities with agentic functionality is catalyzing a major **paradigm shift**. This shift promises not only to accelerate the research lifecycle but also to fundamentally alter the **collaboration dynamics** between human researchers and AI in the pursuit of knowledge.

**2. Existing challenges and research gaps**

However, the rapid expansion of LLM applications and the shifting paradigm of scientific discovery pose significant challenges. The speed of LLM evolution and deeper integration into complex research complicate systematic evaluation, creating a need for conceptual frameworks to organize current understanding and chart future directions.

The authors note that existing surveys offer overviews of LLMs in individual scientific domains or catalog specific scientific AI techniques, but they are typically limited to:

- applications in a single discipline; or
- static snapshots of LLM capabilities.

Consequently, existing surveys often overlook the critical trend of **increasing LLM autonomy** and fail to examine LLMs’ evolving roles across the full scientific methodology, leaving their comprehensive impact and trajectory toward greater independence underexplored.

**3. Methodological framework of this work**

To systematically map this evolution and address the gaps above, the authors anchor their analysis in the established **six stages of the scientific method** (as shown in Figure 1):

1. **Observation and Problem Definition**
2. **Hypothesis Development**
3. **Experimentation and Data Collection**
4. **Data Analysis and Interpretation**
5. **Drawing Conclusions**
6. **Iteration and Refinement**

**Figure 1** illustrates these six stages and corresponding LLM applications and research themes.

**4. Core contribution: a three-level autonomy taxonomy**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Awesome-LLM-Scientific-Discovery/tab1.png" alt="avatar" style="zoom:100%;" /></div>

By examining LLM applications across these six stages, the authors reveal a clear trend: LLMs are moving from discrete, task-oriented functions within a single stage to deployment in complex, multi-stage agentic workflows.

To capture and stratify this growing capability and independence, the authors propose a foundational **three-level taxonomy** of LLM involvement in scientific discovery (see **Table 1**):

- **Level 1: LLM as Tool**: At this level, models augment human researchers as tools under direct supervision, performing specific, well-defined tasks.
- **Level 2: LLM as Analyst**: At this level, models exhibit higher autonomy, processing complex information, conducting analysis, and providing insights with reduced human intervention.
- **Level 3: LLM as Scientist**: This represents a more advanced stage in which LLM-based systems can autonomously conduct major research phases—from hypothesis generation to result interpretation—and suggest new avenues for exploration.

**Table 1** contrasts these three autonomy levels in terms of role, degree of human intervention, task scope, and workflow type.

**5. Key challenges and future trajectories**

Building on this taxonomy, the authors further identify critical gaps in the current research landscape and highlight key challenges and future trajectories for the field:

1. **Fully autonomous discovery cycles**: evolutionary scientific inquiry without human intervention.
2. **Robotic automation**: interaction with laboratory experiments in the physical world.
3. **Continuous self-improvement**: learning and adapting from past research experience.
4. **Transparency and interpretability**: of research processes driven by LLMs.
5. **Ethical governance and societal alignment**.

**6. Scope of the survey**

The authors clarify that this survey focuses on LLM-based systems in scientific discovery, especially their varying degrees of autonomy. To stay focused, they intentionally **exclude** work on general-purpose scientific LLMs or LLMs for domain-specific scientific knowledge acquisition and reasoning, as these topics are already well covered in existing surveys.

### 2 Three Levels of Autonomy

This section details the three autonomy levels for LLM-based scientific discovery. **Table 1** summarizes the three levels and associated characteristics (e.g., the LLM’s role, the human’s role, task scope, and complexity of agentic workflows).

**Level 1: LLM as Tool**

This is the most basic application tier for LLMs in scientific discovery.

- **Role and function**: At this stage, LLMs operate primarily as **tailored tools** under direct human supervision. They are designed to perform concrete, well-defined tasks within a single stage of the scientific method.
- **Augmenting human capability**: They enhance researchers by automating or accelerating discrete activities. Typical tasks include literature summarization, drafting manuscript drafts, generating code snippets for data processing, or reformatting datasets.
- **Limits on autonomy**: Autonomy is limited; systems run on explicit human prompts and instructions. Outputs typically require human verification and integration into broader research workflows.
- **Goal**: The main objective is to improve researcher efficiency and reduce the burden of routine tasks.

**Level 2: LLM as Analyst**

At Level 2, LLMs show a higher degree of autonomy beyond purely static, task-oriented applications.

- **Role and function**: LLMs act as **passive agents**, performing richer information processing, data modeling, and analytical reasoning with less human intervention at intermediate steps.
- **Task management**: While still largely operating within boundaries set by human researchers, these systems can independently manage sequences of tasks—for example, analyzing experimental datasets to identify trends, interpreting outputs of complex simulations, or even performing iterative model optimization.
- **Human interaction**: Human researchers typically define overall analytical goals, provide necessary data, and critically evaluate LLM-generated insights or interpretations.

**Level 3: LLM as Scientist**

Level 3 applications mark a substantial leap in autonomy.

- **Role and function**: LLM-based systems operate as **active agents**, orchestrating and guiding multiple stages of the scientific discovery process with considerable independence.
- **Proactivity and end-to-end coverage**: These systems can show initiative, including proposing hypotheses, planning and executing experiments, analyzing result data, drawing preliminary conclusions, and potentially proposing follow-up research questions or exploration paths.
- **Minimal human intervention**: LLM systems at this level can drive major portions of the research cycle, conducting scientific discovery with minimal human intervention.

**Research landscape (Figure 2)**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Awesome-LLM-Scientific-Discovery/fig2.png" alt="avatar" style="zoom:100%;" /></div>

In **Figure 2**, the authors present the full taxonomy and detailed categorization, aggregating concrete research work within the three autonomy levels across scientific discovery stages from literature review and hypothesis generation to experiment planning.

### 3 Level 1. LLM as Tool (Table A1)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Awesome-LLM-Scientific-Discovery/taba1.png" alt="avatar" style="zoom:100%;" /></div>

The authors provide a detailed comparison and categorization of Level 1 work in **Table A1** (page 17 of the original paper).

#### 3.1 Literature Review and Information Gathering

- **Literature review**:
  - Automated literature search and retrieval is critical for identifying research gaps. **PaperQA** (built on the LitQA benchmark) introduces a RAG (retrieval-augmented generation) agent.
  - **LitLLM** provides a comprehensive RAG toolkit for LLM-driven literature review.
  - Wang et al. (2024c) further show that LLMs can automatically write entire **survey papers**.
  - In biomedicine, Dennstädt et al. (2024) highlight the potential of LLMs for literature screening.
  - Recent “deep research” products (from OpenAI, Google, xAI, and others) substantially accelerate traditional literature research through enhanced agentic workflows.
- **Information aggregation**:
  - Research focuses on aggregating paper information into tabular summaries. **ArxivDIGESTables** explores cross-literature table generation.
  - **ArXiv2Table** provides a comprehensive benchmark.
  - Methods such as **Text-Tuple-Table** and **TKGT** improve table generation quality by introducing tuple-based structure and graph modalities.

#### 3.2 Idea Generation and Hypothesis Formulation

- **Idea generation**:
  - Benchmarks such as **IdeaBench** and **LiveIdeaBench** evaluate LLMs’ ability to generate research ideas from literature summaries.
  - Agent frameworks including **Nova**, **SciAgents**, and **KG-Col** aim to enhance idea generation through reasoning on academic knowledge graphs and iterative planning.
  - Domain-specific explorations include astronomy (adversarial prompting) and biology (knowledge extraction and graph representations).
- **Hypothesis formulation**:
  - The focus is on designing testable scientific hypotheses. Qi et al. (2023) and Yang et al. (2024) demonstrate that LLMs can propose novel and effective hypotheses under open-ended constraints.
  - **Scideator** facilitates human–LLM collaboration to generate well-grounded ideas.
  - **HypER** focuses on generating literature-grounded hypotheses with explicit provenance.
  - In chemistry, **MOOSE-Chem** provides evaluation benchmarks and a framework dedicated to hypothesis discovery.

#### 3.3 Experiment Planning and Execution

- **Planning**:
  - Li et al. (2025) discuss the effectiveness of LLMs in causal discovery experiment design.
  - **BioPlanner** introduces an automated evaluation framework for LLM performance on biology protocol planning.
  - Shi et al. (2025) propose hierarchical encapsulation representations to assist biological protocol design.
- **Execution**:
  - Work concentrates mainly on **code generation**, especially for AI research.
  - Early benchmarks such as **ARCADE** and **DS-1000** focus on data science tasks.
  - Later work including **MLE-Bench** and **SciCode** introduces more challenging real-world settings (e.g., machine learning engineering and natural science research).
  - **AIDE** proposes tree-search methods for code optimization to strengthen complex code generation.

#### 3.4 Data Analysis and Organization

At this stage, LLMs assist with automating data organization, presentation, and analysis.

- **Tabular data**:
  - **Chain-of-Table** incorporates evolving tables into reasoning chains to improve table understanding.
  - **TableBench** introduces an industrial table-based question answering benchmark.
- **Chart data**:
  - **ChartQA** examines visual Transformers for chart question answering.
  - **CharXiv** and **ChartX** expand understanding scenarios using real chart data from arXiv preprints.
  - For chart generation, **AutomaTikZ** formulates the process as text-to-TikZ code generation. **Text2Chart31** uses reinforcement learning and automatic feedback to refine Matplotlib chart generation.

#### 3.5 Conclusion and Hypothesis Validation

LLMs can provide feedback and validate claims and conclusions drawn from experiments.

- **Paper review**:
  - **ReviewerGPT** provides an initial exploration of LLMs’ ability to detect deliberately inserted errors in papers.
  - A comprehensive analysis by Du et al. (2024) reveals weaknesses of LLMs in identifying flaws.
  - **ClaimCheck** further investigates LLMs’ ability to critique research claims, finding this challenging even for advanced models (e.g., OpenAI o1).
  - Systems such as **XtraGPT** enable human–machine collaboration for controllable paper revision.
- **Hypothesis validation**:
  - Takagi et al. (2023) demonstrate LLMs’ ability to automatically generate code to validate machine learning hypotheses.
  - **SciReplicate-Bench** and **PaperBench** extend this idea to replication evaluation of real research papers.
  - Other work explores using language models to directly predict outcomes of empirical AI research.

#### 3.6 Iteration and Refinement

This area currently receives relatively less attention.

- **Explanation-Refiner** uses theorem provers to verify and refine LLM-generated hypotheses.
- **Chain-of-Idea** introduces an LLM-based agent framework that organizes literature and develops research ideas by building on or extending existing research threads.
- **MC-NEST** employs Monte Carlo Tree Search to iteratively validate and refine scientific hypotheses across multiple research domains.

### 4 Level 2: LLM as Analyst (Table A2)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Awesome-LLM-Scientific-Discovery/taba2.png" alt="avatar" style="zoom:100%;" /></div>

The authors provide a detailed comparison and categorization of Level 2 work in **Table A2** (page 18 of the original paper).

#### 4.1 Machine Learning Research

Automated machine learning (AutoML) aims to generate high-performing model configurations in a data-driven manner. With the rise of LLM-based agents, multiple studies explore their use in automating ML modeling:

- **Benchmarks**:
  - **MLAgentBench** evaluates LLMs’ ability to design and execute ML experiments, finding performance often depends on familiarity with the task.
  - **MLRC-Bench** and **RE-Bench** further probe agent limits, assessing ability to solve novel ML research challenges and comparing R&D capability to human experts.
  - **MLGym** provides valuable resources and benchmarks to advance these AI research agents.
- **Agentic frameworks**:
  - The **IMPROVE** framework emphasizes the importance of iterative optimization mechanisms.
  - **CodeScientist** combines ML modeling agents with machine-generated ideas.
  - **BudgetMLAgent** achieves strong results with low-cost models via a curated expert collaboration framework.
- **End-to-end systems and architecture design**:
  - More recent systems such as **MLR-Copilot** and the multi-agent framework **MLZero** aim for fully autonomous machine learning research and automation.
  - Some work even explores using language models to propose language model (LM) architectures directly (e.g., **Genesys** / Cheng et al.), moving beyond orchestration toward direct model creation.

#### 4.2 Data Modeling and Analysis

Automated data-driven analysis—including statistical data modeling and hypothesis validation—is a foundational application area for LLM-assisted scientific discovery.

- **Benchmarks**:
  - **InfiAgent-DABench** benchmarks LLMs’ static code generation and execution for data analysis with CSV files.
  - Subsequent benchmarks such as **BLADE**, **DiscoveryBench**, and **DSBench** improve evaluation robustness by incorporating real-world research papers and expert-curated analyses to assess gaps between agents and human experts.
  - These studies suggest that most LLMs still struggle with complex data analysis tasks even within agentic frameworks.
- **Solutions**:
  - **DS-Agent** improves LLM performance by combining case-based reasoning to enhance domain knowledge acquisition.
  - **DAgent** extends the application domain to querying relational databases and supports report generation from results obtained via decomposed subproblems.

#### 4.3 Function Discovery

Function discovery aims to identify underlying equations from observational data over variables; advances in AI-driven symbolic regression (SR) have significantly impacted this area.

- **Methodology**:
  - **LLM-SR** leverages LLMs’ prior domain knowledge and feedback from a clustered memory store to enhance the process.
  - **DrSR** proposes a dual reasoning framework that uses data and experience for scientific equation discovery.
- **Benchmarks**:
  - **LLM-SRBench** introduces a benchmark for evaluating LLMs as function-discovery agents, including function transformations to mitigate data contamination.
- **Domain-specific applications**:
  - Research also explores LLMs’ ability to discover complex models in specific domains, e.g., physics (**Gravity-Bench-v1** / Koblischke et al.), statistics (Li et al.), and automated neural scaling law discovery (**EvoSLD** / Lin et al.).

#### 4.4 Natural Science Research

Work focuses on applying LLMs within autonomous research workflows for natural science discovery.

- **Comprehensive evaluation**:
  - **Auto-Bench** evaluates LLMs on chemistry and social science tasks via causal graph discovery, revealing that LLMs are effective only when task complexity is very limited.
  - **ScienceAgentBench** provides a multidisciplinary benchmark for LLMs running in agentic frameworks (e.g., CodeAct and self-debug), emphasizing that exploratory tasks require tailored agentic workflows.
- **Biomedicine and chemistry**:
  - **BioResearcher** proposes an end-to-end biomedical research framework involving dry-lab experiments.
  - **DrugAgent** uses multi-agent collaboration to automate drug discovery.
  - In chemistry, **Coscientist** combines LLM tool use to support semi-autonomous chemical experiment design and execution.
  - **ProtAgents** advances biochemical discovery through a multi-agent framework for automated protein design.
- **Frontier progress**:
  - Recent systems such as **FutureHouse** and **AI Co-scientist** use multi-agent systems guided by predefined research objectives to formulate empirically novel research hypotheses and proposals.

#### 4.5 General Research

Beyond domain-specific applications, some benchmarks broadly evaluate diverse tasks across stages of scientific discovery.

- **Discovery World** creates a virtual environment for simplified scientific exploration by LLM agents.
- Liu et al. (2025a) comprehensively discuss application scenarios for AI agents in research and provide preliminary evaluation datasets.
- **CURIE** proposes a benchmark and agent framework for rigorous, automated scientific experimentation.
- **EAIRA** focuses on evaluating LLMs’ ability to act as real-world research assistants across varied task formats.

### 5 Level 3. LLM as Scientist (Table A3)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Awesome-LLM-Scientific-Discovery/taba3.png" alt="avatar" style="zoom:100%;" /></div>

The authors provide a detailed comparison and categorization of Level 3 work in **Table A3** (page 18 of the original paper).

**Overview**

Recently, several research efforts and commercial products have demonstrated prototypes of **fully autonomous research** within the AI domain.

- **End-to-end coverage**: These systems typically implement a comprehensive workflow—from initial literature review through iterative refinement loops that improve hypotheses or designs to draft research papers.
- **Agentic frameworks**: A common feature is the use of **agent-based** frameworks to autonomously produce research outputs.

This section focuses on comparing strategies for **idea development** and **iterative refinement**, as these aspects chiefly distinguish Level 3 agents from Level 2.

#### 5.1 Idea Development

The origin of research in Level 3 systems involves turning initial concepts into validated hypotheses; systems differ markedly in how they acquire and vet these ideas.

- **Literature review grounded in human goals**:
  - **Agent Laboratory** (Schmidgall et al., 2025) conducts literature review primarily from concrete research objectives defined by humans.
- **Higher autonomy and gap identification**:
  - Some systems pursue greater autonomy from broader human input. For example, **AI-Researcher** (Data Intelligence Lab, 2025) and **Carl** (Autoscience, 2025) start from reference papers, or **Zochi** (IntologyAI, 2025) from a general research area; subsequent steps autonomously explore literature to identify gaps and formulate novel hypotheses.
- **Generative approaches**:
  - **The AI Scientist** (v1 and v2) illustrates a more generative approach: v1 brainstorms ideas from templates and prior work, while v2 can generate diverse research proposals from abstract topic prompts.
- **Idea validation**:
  - Critically, these systems employ multiple methods to evaluate ideas before full implementation.
  - **AI Scientist-v1** uses self-assessment scores (interestingness, novelty, feasibility) supplemented by external checks via Semantic Scholar.
  - **AI Scientist-v2** integrates literature review tools early in idea formation to assess novelty.

**Trend**: Although ideas are often still human-initiated, advanced systems can autonomously explore, generate, and validate the scientific value and originality of research objectives before development.

#### 5.2 Iterative Refinement

Iterative refinement in Level 3 systems involves complex **feedback loops** that enable not only incremental improvement but also fundamental reassessment of the research trajectory. A key distinction lies in the primary source and nature of this high-level feedback.

- **Fully automated internal review**:
  - **The AI Scientist** (v1 and v2) integrates highly automated internal review and refinement. It uses AI reviewers, LLM evaluators for experiment selection, and vision-language models (VLMs) to critique figures, forming a rich internal feedback loop for iterative development.
- **Human-in-the-loop macro guidance**:
  - By contrast, **Zochi** (Intology AI, 2025) integrates macro guidance from human experts. Such feedback can trigger comprehensive reassessment of hypotheses or designs, allowing the system to act on criticism that challenges core research premises and even revert to hypothesis generation if results are unsatisfactory.

**Summary**: While automated self-correction is a shared goal, the current landscape shows a pragmatic blend: some systems emphasize **autonomous deep reflection**, while others integrate **human oversight** for robust high-level iterative refinement and strategic redirection.

#### **Table A3: Comparison of Level 3 research**

**Table A3** lists and compares major Level 3 research efforts, including:

- **Agent Laboratory**
- **The AI Scientist (v1 & v2)**
- **AI-Researcher**
- **Zochi**
- **Carl (Autoscience)**

The table categorizes work along dimensions including:

- **Scientific domain**: currently focused mainly on **artificial intelligence**.
- **Signature capabilities**: e.g., literature review, code generation, experiment execution, research paper writing, agentic tree-search with feedback, and related features.
- **Open source**: some projects such as The AI Scientist and AI-Researcher are open source, while Zochi and Carl are not currently marked as open source.

### 6 Challenges and Future Directions

After systematically reviewing the progression of LLMs from basic assistants (Level 1) to autonomous researchers (Level 3), the authors move beyond summarizing existing techniques to identify **five key challenges** that hinder further progress and outline a research roadmap.

**1. Fully autonomous research cycle**

- **Current limitations**: Present Level 3 systems (LLM as Scientist) can navigate multiple stages of the scientific method for specific inquiries, but they typically operate within a single research instance or a predefined topic.
- **Nature of science**: The scientific method is inherently **cyclical**, characterized by continuous iteration, refinement, and pursuit of evolving research questions.
- **Future direction**: The next step is to develop LLM systems that participate in **genuinely autonomous research cycles**.
  - This means more than executing a given research task from start to finish;
  - systems need **foresight** to grasp the broader implications of their findings, proactively identify promising follow-up investigations, and strategically direct their efforts to achieve practical advances built on prior work.

**2. Robotic automation**

- **Physical barrier**: A key obstacle to fully autonomous scientific discovery in the natural sciences is that LLM agents cannot conduct **physical laboratory experiments**. They excel at computational research but are limited in domains requiring physical interaction (e.g., wet-lab work).
- **Solution**: Integrating LLMs with **robotic systems** to translate planning into direct experimental action.
- **Potential domains**: Early LLM–robot integration (e.g., for chemical experiments) already highlights this potential. Such automation could substantially broaden LLM-based research, enabling end-to-end discovery in disciplines such as **chemistry** and **materials science**.

**3. Transparency and interpretability**

- **Black-box problem**: The “black-box” (opaque) nature of LLMs undermines scientific verification, trust, and uptake of AI-driven insights.
- **Beyond XAI**: Addressing this requires more than superficial explainable AI (XAI) techniques. It calls for a paradigm shift in which internal operations are designed for **verifiable reasoning** and **justifiable conclusions** from the outset.
- **Core challenge**: The challenge is not only to explain outputs but to ensure that internal AI logic aligns with scientific principles and reliably **distinguishes “asserted claims” from “verifiable truths.”** Such deep interpretability is essential for reliable and reproducible LLM-driven scientific discovery.

**4. Continuous self-improvement**

- **Need for adaptability**: The iterative, evolving nature of scientific inquiry requires systems that learn from ongoing engagement, absorb experimental outcomes, and adjust research strategies.
- **Technical pathways**: Research combining continual learning with agentic systems already shows potential to adapt to new tasks without catastrophic forgetting.
- **Outlook**: A promising direction is integrating **online reinforcement learning frameworks**, enabling scientific agents to strengthen their capabilities continuously across the discovery lifecycle and sustain autonomous exploration.

**5. Ethics and societal alignment**

- **Escalating risks**: As LLM systems gain independent reasoning and action, potential risks—from amplified societal bias to deliberate misuse (e.g., generating harmful substances or challenging human control)—become more salient and complex.
- **Ongoing alignment**: Because AI capabilities and social norms keep evolving, **alignment** must be an ongoing process requiring adaptive governance and evolving value systems.
- **Governance requirements**: This calls for embedding ethical constraints directly in the design of scientific AI, together with vigilant oversight, so that technological progress serves human welfare and the public interest.

<hr align="left" color="#987cb9" size="1">
