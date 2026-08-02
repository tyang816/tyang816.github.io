---
layout: post
title: ICMLw-2025 ProteinCrow：A Language Model Agent That Can Design Proteins
categories: [BI]
tags: [protein, Agent]
proceedings: ICMLw
date: 2025-05-01
lang: en
alt_url: /zh/notes/bi/ProteinCrow：A-Language-Model-Agent-That-Can-Design-Proteins/
permalink: /notes/bi/ProteinCrow：A-Language-Model-Agent-That-Can-Design-Proteins/
---

> Paper: [ProteinCrow：A Language Model Agent That Can Design Proteins](https://openreview.net/forum?id=ljXgWDtqCu&referrer=%5Bthe+profile+of+Cade+W+Gordon%5D%28%2Fprofile%3Fid%3D%7ECade_W_Gordon1%29)
>
> Code: <none>

## ProteinCrow: Agent + BindCraft for Protein Design

### Abstract

**ProteinCrow** is an **LLM-based agentic assistant for protein design**. Recent breakthroughs in deep learning—tools such as AlphaFold, RFdiffusion, BindCraft, and ProteinMPNN—have transformed protein structure and sequence modeling, making it possible to design proteins with new functions. Successful computational protein engineering pipelines typically integrate multiple specialized models and iterate with biochemical knowledge.

ProteinCrow was proposed in this context. It can **integrate multimodal information**, including structural data, deep learning models, scientific literature, and biochemistry expressed in natural language. Using **36 expert-curated tools**, ProteinCrow can automate protein design tasks.

To evaluate performance, the authors tested ProteinCrow on three tasks:

- Designing binder libraries targeting specific secondary-structure motifs.
- Redesigning protein backbones to improve stability.
- Optimizing binders to remove predicted major histocompatibility complex class I (MHC class I) antigen epitopes.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinCrow/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Computational protein design has become an important tool for accelerating the creation of proteins with new functions, from engineering high-affinity therapeutic binders to optimizing enzyme activity and stability. Traditional approaches rely on physics-based models such as Rosetta to evaluate protein structures.

In recent years, deep learning methods—**AlphaFold2 (AF2), RFDiffusion, and ProteinMPNN**—have **fundamentally changed the field** by enabling accurate structure prediction and sequence optimization. However, **no single method fully captures the complex interplay among sequence, structure, and function**.

**The hypothesis of this work** is that large language models (LLMs) can unify outputs from deep learning models, biochemical data, scientific literature, and physics-based methods in natural language, serving as a framework to integrate multimodal information about proteins and to support effective protein design.

In this work, the authors present **ProteinCrow**, an **LLM agent** that integrates multiple tools to generate protein sequence libraries satisfying specific constraints from natural-language prompts. ProteinCrow also incorporates literature-based insights via **PaperQA**, an agent optimized for retrieving and summarizing scientific literature, mimicking how experts consult knowledge about particular protein families or tasks. ProteinCrow can perform subtasks currently done by humans, such as cropping large proteins into smaller regions, identifying binding “hot spot” residues, and analyzing designed sequences with in-silico metrics. By equipping the agent with the deep learning methods, database query tools, and physics-based approaches (e.g., Rosetta) used by human computational protein engineers, ProteinCrow can produce designs with optimized stability and generate protein sequence libraries for experimental validation.

Although there have been recent attempts to incorporate LLMs into protein design workflows, they differ in autonomy and scope. For example, **310.ai** provides a natural-language chat interface but is not an autonomous agent. By contrast, **ProteinForceGPT** is an autonomous LLM agent, but its scope is more specific: predicting force–separation curves from pretrained structures.

While most protein design agents are specialized or limited in scope, more general LLM agents have been explored in other domains such as chemical synthesis, materials research, and experimental design. **ProteinCrow is an LLM agent built with the Aviary framework to support general-purpose protein design**. Aviary is a framework for building and training LLM agents on complex tasks. An LLM agent is a decision-making entity that observes the environment, reasons, and executes an action. For ProteinCrow, an “action” is a **tool call** for protein structure/sequence analysis, generative design, or library design. The agent runs in a loop, deciding the next action from new observations or tool outputs until the goal is reached.

The authors evaluated ProteinCrow on three tasks:

- **Task 1: Goal-directed protein design** — Improve stability of target sequences under structural and functional constraints.
- **Task 2: Automated binder design pipeline** — Generate binder libraries with constraints on library composition, binder structure, and sequence properties.
- **Task 3: Binder optimization** — Redesign a previously designed binder to produce a sequence library that removes predicted MHC class I antigen epitopes.

### 2 Methods

#### 2.1. LLM Framework - Aviary

ProteinCrow runs within the **Aviary** framework, an extensible language-agent gymnasium. Aviary formulates the agent’s sequential decision process as a language-based partially observable Markov decision process (POMDP), enabling iterative optimization of protein sequences. Tools built for ProteinCrow can also be transferred to other agent frameworks outside Aviary.

ProteinCrow optimizes protein stability, designs binder libraries meeting specific constraints, and refines known binders by calling tools and receiving observations to inform the next action. All experiments used **Claude-3.5-Sonnet-20241022** with sampling temperature 0.1.

#### 2.2 Tools

ProteinCrow can use many tools, broadly grouped as follows:

- **Biochemical Descriptors**: Tools for biochemical analysis, including interface characterization, bond-type analysis, sequence complexity, residue hydrophobicity, and secondary-structure annotation.
- **Deep Learning Models**: Deep learning models for various protein design tasks, including binder design, inverse design, backbone generation, and protein language models.
- **Rosetta Protocols**: Tools that run Rosetta protocols, widely used for protein structure modeling and protein–protein interface analysis.
- **Task Management**: Tools for managing prompt-related tasks, such as submitting sequences to libraries and tracking task completion.
- **Sequence Informatics**: Sequence-based analysis, including residue properties, multiple sequence alignment, and identification of conserved sites.
- **Knowledge Retrieval**: Query and retrieval from databases and literature.

To address frequent version conflicts and compatibility issues among deep learning models, most tools in ProteinCrow run on API endpoints via **Modal**, allowing models such as AlphaFold, ProteinMPNN, ESM2, and BindCraft to execute in sandboxed environments.

#### 2.3 Task 1 - Goal Directed Protein Design

##### 2.3.1 Redesign Protein Backbones for Improved Stability with Structural Constraints

Goal-directed protein engineering mutates target proteins to achieve desired outcomes, such as improved stability. In this task, ProteinCrow was asked to **increase stability and the number of salt bridges** when redesigning protein backbones. ProteinCrow can bias toward specific residues by adjusting amino-acid type bias weights in ProteinMPNN. Salt bridges are counted as pairs of acidic (Asp, Glu) and basic (Arg, Lys, His) atoms within 4.0 Å after mutation.

For evaluation, the authors randomly selected 30 proteins (length 40–72 amino acids) from a large-scale stability dataset. Mutation-induced free energy changes (ΔΔG) were computed with the Rosetta `cartddG` protocol. Additional metrics were used for comprehensive assessment:

- Percentage of mutations with Rosetta ΔΔG < 0
- Amino-acid usage frequencies
- Sequence diversity
- Pseudo log-likelihood from ESM2
- pLDDT confidence scores from AlphaFold2

##### 2.3.2 Redesign Enzyme Backbones While Preserving Functional Residues

To test ProteinCrow’s ability to **enhance protein stability without compromising function**, the authors used two proteins from prior work: myoglobin and TEV protease. They compared mutation sites chosen by ProteinCrow with sites human designers preserved for function in the original studies, to assess whether ProteinCrow avoids proposing mutations at functional sites.

The evaluation added **functional site preservation**: the number of overlaps between mutation sites chosen by ProteinCrow and functional sites from the prior studies.

### 3. Task 2 - Automated Binder Design Pipeline

The text first introduces **BindCraft**, an efficient deep learning model for *de novo* protein binder design with reported experimental success rates between 10% and 100%. The BindCraft design pipeline includes multiple settings that must be tuned for different protein targets—iteration counts, design weights, and filtering criteria—choices typically made by human experts.

#### 3.1 Designing Binders for Epidermal Growth Factor Receptor (EGFR)

To evaluate ProteinCrow on a challenging real-world target, the authors chose the **epidermal growth factor receptor (EGFR)** protein (PDB ID: 6ARU). This target was used in a community-wide binder design competition hosted by AdaptyvBio. Design quality was assessed with the same metrics as the AdaptyvBio competition to compare against top experimentally validated entries.

ProteinCrow was evaluated under several constraints. Experiments included:

- **Automated end-to-end binder generation**: ProteinCrow was asked to generate a binder for EGFR, with 10 replicate runs.
- **Motif-targeted design**: Top competition binders featured prominent β-sheet elements. To test whether ProteinCrow can tune BindCraft parameters to produce specific structural motifs, the authors asked it to design a binder containing β-sheet elements.
- **Constraint-aware binder library design**: ProteinCrow was asked to generate a library of five binders satisfying **three constraints**:
  1. Each new binder must differ from known binders by at least 10 point mutations.
  2. The library should show diversity in secondary-structure composition.
  3. Designs should target different “hot spot” residues on the protein.

#### 3.2 Generalizing ProteinCrow to Distinct Protein Targets

This section summarizes that ProteinCrow can automate and execute the BindCraft design pipeline for diverse protein targets and library constraints by selecting appropriate BindCraft inputs without human intervention.

Performance of sequences in each binder library was assessed with widely used **in-silico metrics**:

- **AlphaFold scores**: pLDDT, iPAE, and iPTM from AlphaFold-Multimer to assess structural quality, alignment accuracy, and predicted transformation matrices of designed binder sequences.
- **ESM pseudo log-likelihood scores**: ESM2 protein language model to assess likelihood of generated sequences.
- **Secondary-structure composition**: Secondary-structure annotation of binders to ensure they contain structural elements required by design constraints in the prompts.

### 4. Task 3 - Optimizing a Binder to Reduce MHC Class I Epitopes

In therapeutic binder design, a key step is optimizing properties such as stability, aggregation propensity, and **immunogenicity** while maintaining target affinity.

To evaluate ProteinCrow on such optimization, the authors started from an **experimentally validated EGFR binder** (from the Adaptivbio community binder design competition). They asked ProteinCrow to generate a library of 10 variant sequences in five replicate runs, with the goal of **removing predicted MHC class I antigen epitopes**.

- **Prediction tool**: The study used **netMHCpan 4.1** to predict binding affinity of all peptides of length 8–14 to the `HLA-A*02:01` allele.
- **Evaluation metrics**: Designed sequences were ranked and compared using:
  - **ESM2 pseudo log-likelihood scores**.
  - Total count of predicted **MHC class I binding peptides** (strong and weak binders).

### 5 Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinCrow/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### 5.1 Optimizing Protein Stability While Increasing the Number of Salt Bridges

This task evaluates ProteinCrow’s ability to perform goal-directed protein design. The authors asked it to propose mutations that both **improve folding stability** (Rosetta ΔΔG < 0) and **introduce more salt bridges**. ProteinCrow combined structure-, sequence-, literature-, deep learning-, and Rosetta-based tools to analyze each target and generate designs.

- **Results**: On 30 benchmark proteins, ProteinCrow often found mutations satisfying both criteria.
- **Comparison to baseline**: By contrast, the baseline ProteinMPNN effectively generates low $\Delta\Delta G$ variants but does not increase salt-bridge counts on its own.
- **Conclusion**: These results suggest ProteinCrow can handle finer-grained design objectives that usually require expert guidance and iteration.

#### 5.2. Designing stable mutations while preserving function

This task evaluates ProteinCrow’s ability to identify functional residues and avoid mutating them.

- **Results**: Compared with a random baseline, for myoglobin and TEV protease, ProteinCrow **significantly reduced** mutations at more than 45% of important sites. An ablation study showed that **adding literature retrieval during backbone redesign further reduced** the number of functionally important sites ProteinCrow selected.
- **Discussion**: The authors note that although the agent captures some expert knowledge, it may still miss other critical residues, possibly due to limitations in interpreting functional and structural information. The modular framework nonetheless allows improvement via training or integrating more tools.

#### 5.3. Designing Binders for Epidermal Growth Factor Receptor (EGFR)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinCrow/fig7.png" alt="avatar" style="zoom:100%;" /></div>

- **Automated end-to-end binder generation**: In 10 replicate runs, ProteinCrow successfully generated binders for EGFR each time. It automatically retrieved protein structures, performed structural analysis, identified key binding hot spots, executed the BindCraft workflow, and built a candidate binder sequence library.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinCrow/fig8.png" alt="avatar" style="zoom:50%;" /></div>

- **Motif-targeted design**: When asked to design binders containing **β-sheet elements** (a motif seen in top competition binders), ProteinCrow adjusted design weights in the BindCraft pipeline and successfully designed and added a binder with a prominent β-sheet region to the library.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinCrow/fig3.png" alt="avatar" style="zoom:50%;" /></div>

- **Constraint-aware binder library design**: ProteinCrow successfully generated a library of five binders while satisfying **three complex constraints**: (1) sufficient sequence divergence from known binders; (2) diverse secondary-structure composition in the library; (3) use of different target hot spot residues.

#### 5.4. Generalizing ProteinCrow to Distinct Protein Targets

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinCrow/fig4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinCrow/fig9.png" alt="avatar" style="zoom:100%;" /></div>

ProteinCrow successfully generated libraries of five binder sequences for two very different targets—the **SARS-CoV-2 receptor-binding domain (RBD) and the β-barrel fold BBF-14**—while following all required library constraints. These results indicate that the ProteinCrow design pipeline **generalizes to a wide variety of protein targets**.

#### 5.5. Reducing MHC Class I Epitopes in a Binder

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinCrow/fig5.png" alt="avatar" style="zoom:50%;" /></div>

In this task, ProteinCrow was given access to the `netMHCpan` tool to predict MHC class I binding epitopes in a known EGFR binder.

- **Results**: Across 50 designs, **74% of proposed mutations reduced the predicted number of MHC class I binding epitopes**.
- **Additional finding**: All 50 optimized sequences had **higher ESM2 pseudo log-likelihood scores than the original binder**.

### 6. Discussion

Deep learning for structure prediction, inverse design, and protein language modeling has transformed protein engineering, enabling rapid generation of novel proteins. Human protein engineers typically combine expert knowledge with these foundational models of structure and sequence to build effective design pipelines.

**ProteinCrow integrates tools commonly used in the protein design community to build such pipelines**. It is an autonomous LLM agent for protein design, applied in this work to three common protein engineering tasks: stability optimization, binder design, and binder optimization.

The study shows that **ProteinCrow can follow complex, nonlinear workflows**. This is essential for a general-purpose agent because protein design is highly target- and task-dependent and can be achieved with many different tools. The **modular** ProteinCrow environment also makes integrating new tools straightforward.

The authors note that **this study is limited to in-silico evaluation criteria** to demonstrate that an LLM agent can complete diverse protein engineering tasks. In future work, they plan to assess ProteinCrow’s success rate in the laboratory, translate in-silico predictions into experimental validation, and explore how to integrate feedback to train and strengthen the agent.

<hr align="left" color="#987cb9" size="1">
