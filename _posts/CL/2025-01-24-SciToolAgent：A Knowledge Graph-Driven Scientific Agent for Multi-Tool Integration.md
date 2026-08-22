---
layout: post
title: Nature Computational Science-2025 SciToolAgent：A Knowledge Graph-Driven Scientific Agent for Multi-Tool Integration
categories: [CL]
tags: [Agent, LLM]
proceedings: Nature Computational Science
date: 2025-01-24
lang: en
alt_url: /zh/notes/bi/SciToolAgent：A-Knowledge-Graph-Driven-Scientific-Agent-for-Multi-Tool-Integration/
permalink: /notes/bi/SciToolAgent：A-Knowledge-Graph-Driven-Scientific-Agent-for-Multi-Tool-Integration/
redirect_from:
  - "/bi/SciToolAgent：A-Knowledge-Graph-Driven-Scientific-Agent-for-Multi-Tool-Integration/"
  - "/BI/SciToolAgent：A-Knowledge-Graph-Driven-Scientific-Agent-for-Multi-Tool-Integration/"
---

> Paper: [SciToolAgent：A Knowledge Graph-Driven Scientific Agent for Multi-Tool Integration](https://www.nature.com/articles/s43588-025-00849-y)
>
> Code: <https://github.com/hicai-zju/scitoolagent>

## SciToolAgent: LLM + Tool Graph for Scientific Agents

### Abstract

**Specialized computational tools are proliferating, yet they remain difficult to use**, and existing large language models (LLMs) struggle to integrate multiple tools to solve complex scientific problems. To address this challenge, the authors propose **SciToolAgent**, an LLM-driven agent that **automates the integration and operation of hundreds of scientific tools spanning biology, chemistry, and materials science**.

1. It leverages a **scientific tool knowledge graph** and graph-based retrieval-augmented generation to enable intelligent tool selection and execution.
2. It integrates a **comprehensive safety-check module** to ensure responsible and ethical tool use.

The abstract further summarizes the contributions: extensive evaluation on a purpose-built benchmark **shows that SciToolAgent outperforms existing methods**. Case studies in protein engineering, chemical reactivity prediction, chemical synthesis, and metal–organic framework (MOF) screening demonstrate its ability to automate complex scientific workflows, with the **ultimate goal of making cutting-edge research tools accessible to both experts and non-experts**.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Contemporary research increasingly relies on specialized computational tools that automate essential tasks from data analysis to visualization. Although these tools are critical for discovery, their growing complexity and diversity create substantial barriers for researchers, especially beginners. For example, chemists routinely use dedicated tools for molecular simulation or property prediction. Newcomers without deep technical expertise may fail to exploit these resources effectively, potentially slowing scientific progress. Using artificial intelligence to organize and orchestrate scientific tools efficiently is therefore a highly promising direction.

**Large language models (LLMs)** have shown unprecedented capability in natural language understanding, complex reasoning, and related areas. Recent work has begun coupling LLMs with domain-specific scientific tools with encouraging early results. In **chemistry**, systems such as Coscientist, ChemCrow, and CACTUS have emerged; in **bioscience**, GeneGPT and ProtAgents are representative examples; in **materials science**, LLMatDesign and ChatMOF illustrate similar trends. These systems typically combine reasoning with tool execution via in-context learning within frameworks such as ReAct.

The introduction, however, highlights **two key limitations of current approaches**:

1. **Limited tool sets**: They usually operate on only a small subset of tools (often fewer than 20), restricting broader applicability.
2. **Neglected safety and ethics**: They often overlook safety and ethical considerations that are central to scientific research.

At a deeper level, agent frameworks that rely on simple in-context learning often fail on complex scientific problems because they **cannot account for inherent dependencies among large numbers of tools**. These dependencies are largely sequential: one tool’s output becomes the next tool’s input, and operations must follow a precise order. Ignoring such relationships leads to inefficient multi-step workflows and suboptimal solutions.

To address these issues, this work presents **SciToolAgent**, an agent framework that effectively integrates large and diverse scientific tool collections with LLMs. SciToolAgent uses advanced LLMs as **Planner, Executor, and Summarizer** to autonomously plan, execute, and summarize scientific tasks.

Its **two main innovations** are:

1. **Scientific Tool Knowledge Graph (SciToolKG)**: A comprehensive knowledge graph encoding relationships among hundreds of tools in biology, chemistry, and materials science. By explicitly modeling tool dependencies, prerequisites, and compatibility, it enables informed tool selection and composition.
2. **Integrated safety module**: This module continuously monitors execution to prevent potentially harmful outcomes, addressing a critical gap in existing frameworks that largely ignore ethical risks from automated scientific discovery.

To validate performance, the authors construct **SciToolEval**, a benchmark of 531 scientific questions spanning domains and difficulty levels. Quantitative analysis shows **SciToolAgent achieves 94% overall accuracy, 10 percentage points above the strongest baseline**. Case studies in protein design, chemical reactivity prediction, chemical synthesis, and MOF screening further demonstrate SciToolAgent’s ability to autonomously coordinate complex multi-tool workflows while maintaining reliable, accurate solutions.

### 2 Results

#### Overview of SciToolAgent

SciToolAgent is an LLM-based agent designed to overcome limitations of prior systems in scientific tool integration. Whereas traditional frameworks often fail because naive in-context learning ignores inter-tool dependencies, SciToolAgent addresses this via **SciToolKG**, which mediates between the LLM and scientific tools. The integrated toolkit includes general-purpose tools such as search engines and code interpreters as well as specialized tools for biology, chemistry, and materials.

To capture complex relationships among this large tool set, the researchers **manually constructed SciToolKG** (Fig. 1b), which stores diverse metadata for each tool. The graph plays a central role in planning, enabling the LLM to make informed decisions on tool selection and combination for effective problem solving.

#### Performance on SciToolEval

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/fig2.png" alt="avatar" style="zoom:100%;" /></div>

For quantitative evaluation, the authors built **SciToolEval**, a comprehensive scientific tool evaluation dataset with 531 diverse questions spanning molecular property prediction, protein analysis, materials retrieval, and related tasks. The dataset has two levels: **Level-1** contains 152 problems solvable with a **single tool**, and **Level-2** contains 379 **multi-tool** problems requiring more complex orchestration.

- Three metrics were used:

  - **Pass rate**: the fraction of queries completed successfully;

  - **Tool planning accuracy**: agreement between the agent’s tool selection and ordering and expert-verified reference plans;

  - **Final answer accuracy**: comparison of the agent’s final solution against ground truth.

- **Comparison with baselines (Fig. 2a–c):**

  - GPT-4o-based SciToolAgent was compared with four baseline agents (ReAct, Reflexion, ChemCrow, CACTUS). **SciToolAgent outperformed all baselines on every metric and difficulty level**.

  - On Level-2 multi-tool problems, SciToolAgent’s final answer accuracy exceeded ReAct and Reflexion by roughly 20% and 10%, respectively. Relative to ReAct-based ChemCrow and CACTUS, SciToolAgent maintained a 10–12% advantage at both levels.

  - ReAct and Reflexion showed limitations in tool planning and execution when many candidate tools and complex multi-tool tasks were involved, lacking comprehensive global planning. **SciToolAgent’s use of SciToolKG substantially improves tool planning accuracy**, enabling stepwise global planning and reducing trial-and-error cost.

- **Performance across foundation models (Fig. 2d–f):**

  - Five foundation models were tested within the SciToolAgent framework. OpenAI’s **o1 model consistently outperformed the others on all metrics**. **GPT-4o** followed closely, offering strong overall performance with slightly lower accuracy and the **best accuracy–cost trade-off**, and was chosen as the default backbone.

  - The open-source Qwen2.5-72B model was competitive but slightly weaker on tool planning and final answer accuracy. The smaller Qwen2.5-7B lagged further. A **fine-tuned variant (Qwen2.5-7B-FT) trained on SciToolKG-derived data gained roughly +10%**, approaching higher-capacity models.

#### Case studies

To further assess practical utility, SciToolAgent was tested on four realistic research tasks.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/fig3.png" alt="avatar" style="zoom:100%;" /></div>

##### **1. Protein design and analysis**

Protein design is critical in drug discovery, enzyme engineering, and synthetic biology. The task is complex because it requires integrating multiple bioinformatics tools for sequence generation, folding prediction, and structural analysis. Traditional workflows demand substantial operator expertise. This case shows how SciToolAgent manages a multi-step protein design workflow.

- **Task**: For each CATH structural class (α, β, and α–β), design a 100-residue protein sequence and analyze maximum unfolding force and energy, predict 3D structure, analyze the top 10 vibrational frequencies, and report secondary structure composition.
- **SciToolAgent workflow**:
  1. Generate protein sequences with predefined secondary structure types using Chroma.
  2. Compute unfolding force and energy with ProteinForceGPT16 to assess mechanical stability.
  3. Predict structure with ESMFold.
  4. Compute vibrational frequencies via the anisotropic network model (ANM) in ProDy to assess dynamic stability.
  5. Perform secondary structure analysis with the DSSP module in BioPython to confirm structural elements.
- **Results**: The workflow shows SciToolAgent can autonomously coordinate multiple tools and produce reliable outputs.
- **Baseline comparison**: **ReAct and Reflexion failed on this task due to incorrect or missing tools**.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/fig4.png" alt="avatar" style="zoom:100%;" /></div>

##### 2. Chemical reactivity prediction

Predicting chemical reactivity is central to drug design and organic synthesis. Accurate predictions accelerate compound development and reduce labor-intensive experimentation.

In this case, SciToolAgent predicts reactivity for amide condensation reactions.

- **Task**: Use different molecular features (RDK fingerprints, Morgan fingerprints, electrical descriptors) and a machine learning algorithm (e.g., multilayer perceptron, MLP) to predict reactivity and identify the best-performing feature representation.
- **SciToolAgent workflow (step 1)**:
  1. Plan steps to generate each fingerprint and descriptor type, then train and test an MLP classifier on each feature set.
  2. **Electrical descriptors outperformed other features** for reactivity prediction.
- **Task (step 2)**: Following this finding, a follow-up query asked the agent to compare MLP, AdaBoost, and random forest classifiers using only electrical descriptors.
- **SciToolAgent workflow (step 2)**:
  1. Generate a new plan to test each algorithm on this feature set and evaluate classification accuracy.
- **Results**: **Random forest achieved the highest predictive accuracy** among the algorithms tested and was the best choice for this task.
- **Baseline comparison**: **ReAct suffered from redundant tool use, while Reflexion hallucinated** during this task.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/fig5.png" alt="avatar" style="zoom:100%;" /></div>

##### 3. Chemical synthesis and analysis

Chemical synthesis is foundational for designing and creating new compounds, especially in medicinal chemistry. Accurately predicting reaction outcomes and post-synthesis molecular properties is essential for efficient, safe drug design.

This case shows SciToolAgent automating a pipeline spanning reaction prediction, product characterization, intellectual property checks, and safety assessment.

- **Task (aspirin synthesis)**: Predict the product of the reaction between salicylic acid and acetic anhydride, provide a textual description of the product, and check whether the product is patented and whether it is explosive.
- **SciToolAgent workflow**:
  1. Predict the reaction product with RXN-for-chemistry.
  2. Convert the product SMILES to SELFIES and generate a textual description with molecular description tools.
  3. Search patents with a patent-check tool against the SureChEMBL database.
  4. For explosiveness assessment, convert SMILES to CAS numbers and retrieve safety information from PubChem.
- **Results**: The agent completed all steps and summarized product information, description, patent status, and safety.
- **Task and safety check (phenol chlorination)**: In a similar query on the reaction of phenol with chlorine, SciToolAgent’s **internal safety module flagged the product (4-chlorophenol) as harmful**. It issued a warning that the product is toxic and requires careful handling and specific precautions.
- **Baseline comparison**: Built-in safety checking is critical for early risk alerts. **ReAct and Reflexion included no safety checks during synthesis**, posing substantial risk in chemical experimentation. Although both could predict reaction outcomes, they **failed to recognize the toxic nature of the product in the phenol chlorination case**.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/fig6.png" alt="avatar" style="zoom:100%;" /></div>

##### 4. MOF materials screening

Metal–organic frameworks (MOFs) are crystalline porous materials used in gas storage, catalysis, and related applications. Identifying optimal MOFs for a scenario typically requires screening against multiple criteria such as high thermal stability and strong adsorption capacity.

This case shows SciToolAgent simplifying screening by automating MOF selection and analysis against predefined criteria.

- **Task**: Given a batch of MOF materials, find MOFs with **thermal stability above 400°C**, **CO₂ adsorption capacity above 100 mg/g**, and **price below ¥100**.
- **SciToolAgent workflow**:
  1. Evaluate thermal stability of each MOF with a machine-learning predictor (MOFSimplify).
  2. Predict CO₂ adsorption capacity with molecular simulation software (RASPA2).
  3. Retrieve price information. Because the price tool requires CAS numbers, convert MOF structural data (CIF files) to SMILES, then map SMILES to CAS numbers.
  4. Use the CAS numbers to query commercial chemical databases for market prices.
- **Results**: Through this automated pipeline, SciToolAgent **identified promising candidates meeting all criteria, e.g., TBAPy_Ti_Andres.cif**.
- **Baseline comparison**: **ReAct encountered input errors on this task, while Reflexion hallucinated**.

### Discussion

**SciToolAgent’s main strength is integrating diverse scientific tools via SciToolKG**. The graph captures complex dependencies, input/output formats, and application contexts among tools, enabling dynamic tool-chain construction tailored to each scientific task. This contrasts sharply with earlier LLM frameworks with limited tool sets and simplistic planning. Researchers can delegate repetitive or compute-intensive steps to SciToolAgent, making scientific inquiry **more efficient and accessible to experts and non-experts alike**.

The discussion also notes **two potential limitations**:

1. **Manual construction of SciToolKG**: Although SciToolKG effectively encodes tool relationships, scalability is limited by the human effort required to curate and update tool metadata. Future work could improve scalability and granularity through automation, e.g., extracting knowledge from literature or tool documentation. Standardized APIs and templates are provided to support third-party tool integration.
2. **Dependence on backbone LLM capability**: SciToolAgent’s performance hinges on the underlying LLM. Proprietary models such as GPT-4o perform strongly but may be **economically and technically inaccessible** to resource-limited researchers. Experiments on open-source models show that domain-specific fine-tuning can partially close the gap with proprietary models. Even after fine-tuning, open models (e.g., Qwen2.5-7B-FT) still trail GPT-4o on complex tool planning and multi-step reasoning.

Despite these challenges, SciToolAgent provides **a solid foundation for automating complex scientific workflows**. Future directions include automated knowledge-graph maintenance, integrating more tools, and strengthening open-source LLMs to further democratize advanced research. Overall, SciToolAgent illustrates the potential of LLM-driven agents to simplify and empower scientific discovery by making sophisticated tools usable by a broader audience.

### Methods

#### Collection of scientific tools

SciToolAgent’s tool collection was assembled through a systematic process aimed at a comprehensive, domain-specific, and functionally diverse library. The authors first identified key scientific areas that benefit most from LLM integration, including biology, chemistry, and materials science, then compiled frequently used tools in those domains.

The current toolkit contains **more than 500 tools** spanning a wide range of functions. In biology, it includes sequence alignment tools such as BLAST and structure predictors such as ESMFold. In chemistry, it features molecular dynamics, cheminformatics libraries such as RDKit, and compound databases such as PubChem. For materials science, it integrates crystal structure prediction, materials property databases, and MOF predictors such as MOFSimplify.

#### Construction of SciToolKG

SciToolKG is the backbone of SciToolAgent, providing a structured representation of relationships, dependencies, and operational details for a large array of scientific tools.

- Formally, SciToolKG is a directed graph G=(V,E), where V is the set of entities (nodes) and E is the set of relations (edges). Tool nodes represent individual scientific tools; attribute nodes represent tool properties and metadata.
- Construction proceeds in three stages: **tool characterization, schema development, and graph population**.
  - Each tool is assigned attributes including purpose, functionality, input/output formats, category, source, and safety level, primarily from tool documentation.
  - A hierarchical schema models these attributes logically.
  - Tool-specific metadata are encoded as triples to populate the graph. Relations such as shared I/O formats or sequential task dependencies are explicitly captured, yielding a richly connected graph.

#### Construction of SciToolEval

To evaluate SciToolAgent, the authors built SciToolEval, a comprehensive scientific tool evaluation dataset covering realistic tasks and, to their knowledge, the first platform for quantitatively assessing agent capability across multiple scientific domains.

- Construction steps:
  1. **Tool selection and question generation**: Include detailed tool descriptions in prompts and instruct GPT-4o to generate relevant questions.
  2. **Tool execution and answer generation**: Execute tools and generate answers using ReAct with GPT-4o.
  3. **Human review**: Three domain experts meticulously reviewed questions, tool usage, and answers for correctness and significance.
- SciToolEval ultimately contains 531 questions with required tools and reference answers, split into **Level-1** (simple single-tool information queries) and **Level-2** (sequential and parallel multi-tool use requiring planning, reasoning, and summarization).

#### Implementation of SciToolAgent

##### 1. Planner

The planner designs a solution strategy for each query. It uses an LLM to interpret the problem, query SciToolKG, and produce a tool-chain plan. Specifically, it applies SciToolKG-based retrieval-augmented generation to identify and rank required tools. The LLM queries SciToolKG from the input question, then follows these steps:

1. **Full-graph retrieval**: Retrieve the k tools most relevant to the question from the full SciToolKG by computing semantic similarity between the question and all triples involving tool functionality.

   <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/frm1.png" alt="avatar" style="zoom:50%;" /></div>

2. **Subgraph exploration**: Explore all subgraphs (d-hop neighborhoods) of the retrieved tools in SciToolKG to identify additional tools that may be needed in combination with the initial set.

   <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/frm2.png" alt="avatar" style="zoom:50%;" /></div>

3. **Tool combination and ranking**: Full-graph retrieval and subgraph exploration yield up to k² tools per query. Tools are ranked by a combination score `$S′=S(q,Ti)×S(q,Ti⊕Tj)$`, prioritizing tools that are both question-relevant and mutually complementary. The top n tools (n≤k²) are selected by this score.

   <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/frm3.png" alt="avatar" style="zoom:50%;" /></div>

4. **Chain-of-tools generation**: Given selected tools and neighborhood information from SciToolKG, the LLM is prompted to generate a tool chain outlining tools needed to solve the query, optimized for efficient ordering.

   <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/frm4.png" alt="avatar" style="zoom:50%;" /></div>

Unless otherwise noted, retrieval uses d=3, k=5, and n=10. Semantic similarity S is measured as cosine distance between embeddings from a pretrained embedding model.

##### 2. Executor

The executor implements the planned tool chain. It prepares tool inputs, manages execution, and handles errors. It also integrates a safety module to monitor and control potentially hazardous inputs or outputs. Execution comprises four steps:

1. **Input preparation**: The executor uses an LLM to extract required input parameters for the current tool in the chain, parsing the question, understanding context, and formatting inputs according to specifications recorded in SciToolKG.

2. **Tool execution**: The executor invokes tools with prepared inputs via their APIs, with active monitoring to track progress, capture outputs, and detect anomalies or errors.

3. **Error handling and retries**: Protocols detect errors during execution; when errors occur, inputs are adjusted per predefined rules or heuristics.

4. **Retrieve-based safety check module**: In parallel with execution, a retrieval-based safety module evaluates inputs and outputs at each step against predefined safety criteria to prevent generation of harmful substances or unethical tool use. The authors built a **safety assurance database** including **harmful compounds from PubChem and toxic proteins from UniProtKB**. Outputs during execution are compared against this database to assess potential hazard of generated molecules or protein sequences.

   - For a molecule x, the module computes feature similarity between x and all entries in safety database D, quantified as the average of Tanimoto, Dice, and cosine coefficients over molecular fingerprints.

     <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/frm5.png" alt="avatar" style="zoom:50%;" /></div>

   - For proteins, pairwise local alignment uses the Smith–Waterman algorithm between the given sequence and database entries.

     <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SciToolAgent/frm6.png" alt="avatar" style="zoom:50%;" /></div>

   - If similarity score `$S^(x,D)$` exceeds threshold δ=0.95, indicating proximity to known hazardous or toxic entities, the safety module flags the output as potentially dangerous. For efficiency, only tools marked high-risk in SciToolKG must pass through the safety module.

##### 3. Summarizer

After execution, the summarizer compiles and synthesizes outputs from all tools into a coherent final answer and assesses whether the problem was solved successfully, prompting the planner to refine the tool chain when needed. Key steps include:

1. **Synthesis of outputs**: Collect outputs from all executed tools, merge them, verify consistency, and structure the final answer logically.
2. **Iterative refinement**: If the initial chain yields unsatisfactory results (as judged by the summarizer), the planner is prompted to refine the plan by diagnosing failure and suggesting modifications (add, remove, reorder, or re-retrieve tools).

##### 4. Foundation models

The Planner, Executor, and Summarizer are backed by LLMs. Experiments include proprietary models (OpenAI GPT-4o) and open-source models (Qwen2.5-72B). A smaller, efficient open model, Qwen2.5-7B, was also fine-tuned with tool-learning-specific instructions.

1. **Instruction generation**: To improve Qwen2.5-7B, the authors generated scientific tool-learning instructions similarly to SciToolEval construction, using SciToolKG and GPT-4o for automated generation.
2. **Fine-tuning LLMs with instructions**: Qwen2.5-7B was fine-tuned with LoRA (low-rank adaptation) on the instruction dataset to enhance tool planning and execution. Planner, Executor, and Summarizer were fine-tuned separately with task-specific instructions. Training loss was next-token prediction loss.

<hr align="left" color="#987cb9" size="1">
