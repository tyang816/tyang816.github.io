---
layout: post
title: NeurIPS-2024 Multi-Scale Representation Learning for Protein Fitness Prediction
categories: [BI]
tags: [GNN, protein, fitness-prediction]
proceedings: NeurIPS
date: 2024-09-26
lang: en
alt_url: /zh/notes/bi/Multi-Scale-Representation-Learning-for-Protein-Fitness-Prediction/
permalink: /notes/bi/Multi-Scale-Representation-Learning-for-Protein-Fitness-Prediction/
---

> Paper: [Multi-Scale Representation Learning for Protein Fitness Prediction](https://openreview.net/forum?id=kWMVzIdCEn&referrer=%5Bthe%20profile%20of%20Jian%20Tang%5D(%2Fprofile%3Fid%3D~Jian_Tang1))
>
> Code: <https://github.com/DeepGraphLearning/S3F>

## S3F: Sequence + Structure + Surface for Mutation Effect Prediction

### Abstract

This paper studies how multi-scale representation learning can improve protein fitness prediction. Designing proteins with new functions hinges on accurately modeling the fitness landscape, but because experimental labels are scarce, existing methods rely mainly on self-supervised models trained on large-scale unlabeled protein sequence or structure data. Although early protein representation learning focused on sequence or structure alone, recent hybrid architectures attempt to combine both modalities to leverage their respective strengths. However, existing sequence–structure models achieve only modest gains, indicating that efficient fusion of these modalities remains challenging. Moreover, the function of some proteins depends strongly on fine-grained surface topology, which prior models ignored. To address these issues, the authors propose **S3F (Sequence-Structure-Surface Fitness)**, a multimodal representation learning framework that integrates protein features at multiple scales. The method combines sequence representations from protein language models, backbone structure encoded by **Geometric Vector Perceptron (GVP)** networks, and a detailed description of surface topology. Experiments show state-of-the-art fitness prediction on the **ProteinGym benchmark** (217 deep mutational scanning assays) and offer insight into determinants of protein function.

### 1 Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Proteins perform diverse roles in nature, such as catalyzing chemical reactions, maintaining cell structure, transporting molecules, and relaying signals. These functions are determined by the **amino acid sequence** and **three-dimensional structure** of the protein. By optimizing sequence and structure, one can tackle key challenges in sustainability, new materials, and healthcare. The starting point for this optimization is learning the relationship between protein sequence or structure and function—the **fitness landscape**. The fitness landscape is a multivariate function describing how mutations affect protein fitness; the more accurately these landscapes are modeled, the more likely one can design proteins with desired properties.

However, the **main challenge in fitness modeling** is that experimentally measured functional labels are extremely scarce, while the space of possible protein sequences is enormous. **Self-supervised learning** has therefore become an important strategy, using vast unlabeled protein data to learn predictors of mutational effects. Early methods often learned the sequence distribution of a specific protein family via **multiple sequence alignment (MSA)**, whereas later work sought family-agnostic functional patterns, leading to **protein language models** or **family-agnostic models**. Recent hybrid approaches combine the strengths of both lines and reach state-of-the-art fitness prediction.

Although sequence-based methods can partially recover structural information, many critical protein functions and tasks **depend on finer structural and surface features**. Recent work has explored **protein structure representation learning**; for example, **inverse folding** methods learn sequence distributions given a fixed backbone and show strong performance on tasks such as stability prediction. Hybrid sequence–structure methods have also been explored—**AlphaMissense** distills structural information into a mixed model via a structure-prediction loss, highlighting the value of structural features. Yet these hybrids achieve only **limited improvements**, or do not release model weights. Existing methods also **struggle to model the protein surface**, which is central to interactions and provides richer structural information.

**This work proposes a multi-scale protein representation learning framework** for **zero-shot protein fitness prediction**. First, **S2F (Sequence-Structure Fitness)** combines a protein language model with a structure encoder based on **Geometric Vector Perceptron (GVP)** message passing over spatial neighborhoods. Building on S2F, **S3F (Sequence-Structure-Surface Fitness)** adds a **protein surface encoder** that represents the surface as a **point cloud** and performs message passing among surface points. These multi-scale encoders are pre-trained on **residue type prediction** using the **CATH** structural classification database, enabling direct zero-shot prediction of mutational effects.

**Contributions** include:

- **A general, modular framework** for learning multi-scale protein representations;
- **Two concrete models**—S2F (sequence + structure) and S3F (sequence + structure + surface)—for improved protein fitness prediction;
- **Rigorous evaluation on ProteinGym** (217 deep mutational scanning assays) with **state-of-the-art fitness prediction**, along with improved pre-training efficiency;
- **In-depth analysis by assay type**, showing consistent gains from multi-scale learning, and demonstrating that structure and surface features can correct sequence-only biases, improve accuracy on structure-related functions, and strengthen modeling of **epistasis**.

### 3 Method

This work proposes a **multi-scale protein representation learning framework** for **zero-shot protein fitness prediction**. It combines **sequence, structure, and surface** features and instantiates two models: **S2F (Sequence-Structure Fitness Model)** and **S3F (Sequence-Structure-Surface Fitness Model)**—the former fuses sequence and structure; the latter additionally integrates surface features.

#### 3.1 Preliminary

**Protein representation:**

A protein with **$n_r$** residues (amino acids) and **$n_a$** atoms can be written as a sequence–structure pair **$(S, X)$**:

- **Sequence** $S = [s_1, s_2, ..., s_{n_r}]$, where $s_i$ is the type of the $i$-th residue (one of 20 amino acids).
- **Structure** $X = [x_1, x_2, ..., x_{n_a}] \in \mathbb{R}^{n_a \times 3}$, where $x_i$ are the 3D coordinates of the $i$-th atom. For simplicity, only **backbone Cα atoms** are used; side-chain variation is ignored.

**Protein fitness landscape:**

Protein function depends on sequence and folded structure. Sequence mutations change fitness; this relationship can be measured with **deep mutational scanning (DMS)** experiments.

**Problem formulation:**

The goal is to predict mutational effects on fitness in an **unsupervised** setting. Specifically:

- Given a **wild-type protein** $(S_{wt}, X_{wt})$;
- A **mutant** $(S_{mt}, X_{mt})$ is obtained by changing the residue at site **$T$** so that $s_{mt}^t \neq s_{wt}^t$;
- **Backbone structure is assumed unchanged** ($X_{mt} = X_{wt}$);
- Design an **unsupervised model** that assigns a fitness score to the mutant, reflecting fitness change relative to wild type.

#### 3.2 Protein Language Models for Mutational Effect Prediction

Protein language models (e.g., ESM) are trained with **masked language modeling (MLM)** to learn residue co-occurrence patterns. Given a sequence $S$, mutational effects can be scored with a **log odds ratio**:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/frm1.png" alt="avatar" style="zoom:50%;" /></div>

Here, $S_{\backslash T}$ denotes the input sequence with site $T$ masked, assuming mutations are independent. In the zero-shot setting, the model is used via forward passes only, with no additional training.

#### 3.3 Sequence-Structure Model for Fitness Prediction

**Motivation:**
Protein language models omit 3D structure, which is critical for function. S2F therefore combines **protein sequence and structure** to improve fitness prediction.

**Model assumptions:**

1. **Backbone structure is unchanged after mutation** (no modeling of structural relaxation).
2. **Side chains are omitted** because they directly reveal residue identity and could leak label information.

**Geometric message passing:**

- **Radius graph:** nodes are **Cα** atoms; an edge connects two residues if their Euclidean distance is below 10 Å.

- Message passing with GVP (**Geometric Vector Perceptron**):

  - GVP mixes scalar and vector features with **SE(3)-equivariance** (rotation- and translation-equivariant message passing).

  - Initial node features are sequence embeddings from a **protein language model (ESM)**.

  - Five GVP layers update node representations:

    <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/frm2-3.png" alt="avatar" style="zoom:50%;" /></div>

#### 3.4 Sequence-Structure-Surface Model for Fitness Prediction (S3F)

**Motivation:**
Beyond sequence and structure, **surface features** matter for function—for example, hydrophilic and hydrophobic residues become solvent-exposed or buried in the core after folding. S3F therefore adds explicit surface information.

**Surface processing:**

- **dMaSIF** generates the protein surface from the backbone and represents it as a **point cloud** with roughly 6K–20K points per protein.
- Each point $i$ has **geometric features** $f_i$, including **Gaussian curvature** and **Heat Kernel Signature (HKS)**, to capture surface topology.

**Surface feature initialization:**

- Via nearest-neighbor search, each surface point is initialized by combining its features with embeddings of its **three nearest residues** (from S2F):

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/frm4.png" alt="avatar" style="zoom:50%;" /></div>

**Surface message passing:**

- Build a **surface KNN graph (k = 16)** and run GVP message passing, analogous to the structure graph in S2F:

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/frm5-6.png" alt="avatar" style="zoom:50%;" /></div>

**Residue representation aggregation:**

- Final embeddings from the structure graph (S2F) and surface graph (S3F) are fused:

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/frm7.png" alt="avatar" style="zoom:50%;" /></div>

#### 3.5 Pre-Training and Inference

Pre-training task: **masked residue type prediction**—randomly mask 15% of residues and train with **cross-entropy loss**.

Pre-training data: **CATH** (30,948 experimental structures); only GVP layers are trained while **ESM-2-650M weights are frozen**.

At inference, **AlphaFold2** predicts wild-type structure; fitness scores from S3F are used when structure quality (pLDDT) is sufficient.

### 4 Experiment

### **4.1 Setup**

##### **Evaluation datasets**

Experiments use the **ProteinGym benchmark** (MIT License), which aggregates **deep mutational scanning (DMS)** assays covering:

- **Functional categories** (e.g., stability, ligand binding, viral replication, drug resistance).
- **217 substitution assays**, including **single- and multi-point mutations**.

##### **Metrics**

Because fitness prediction is highly nonlinear, results are primarily evaluated with **Spearman’s rank correlation** between predictions and experimental measurements. The paper also reports **AUC**, **MCC (Matthews correlation coefficient)**, **NDCG (Normalized Discounted Cumulative Gain)**, and **Top 10% Recall** (ability to recover the highest-fitness mutations).

##### **Baselines**

- Methods **without MSA**:
  - **Protein language models:** ProGen2 XL, CARP, ESM-2-650M
  - **Inverse folding models:** ProteinMPNN, MIF, ESM-IF
  - **Sequence–structure hybrids:** MIF-ST, ProtSSN, SaProt
- Methods **with MSA**:
  - **Family-specific models:** DeepSequence, EVE, GEMME
  - **Hybrid (family-agnostic + MSA) models:** MSA Transformer, Tranception L, TranceptEVE

Two augmented variants fuse EVE predictions:

- **S2F-MSA** (S2F + EVE)
- **S3F-MSA** (S3F + EVE)

#### 4.2 Benchmark Result

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/tab1.png" alt="avatar" style="zoom:70%;" /></div>

Results are summarized in **Table 1**:

- **S2F matches leading methods**, outperforming most protein language models and inverse folding models, and is slightly below SaProt.
- **S3F adds surface information and is the best method without MSA**; its **Spearman correlation (0.470) exceeds TranceptEVE (0.456)**, the prior state of the art among MSA-based methods.
- **Strong performance with fewer parameters:** S3F has only **20M** trainable parameters versus SaProt (650M), with much shorter pre-training time.
- **S3F-MSA further incorporates MSA**, raising Spearman by 8.5% (**0.496**) and surpassing SaProt.

#### 4.3 Breakdown Analysis for Multi-Scale Learning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/fig2.png" alt="avatar" style="zoom:80%;" /></div>

To dissect multi-scale learning, assays are stratified; **Figure 2 (a–d)** reports Spearman correlation for **ESM-2-650M, S2F, S3F, and S3F-MSA** under different conditions.

1. **Functional category (Figure 2a)**:
   - Structure and surface help most on **binding** and **stability** tasks.
   - This aligns with intuition: these functions depend on **protein geometry**, and structural cues help identify destabilizing mutations.
2. **MSA depth (Figure 2b)**:
   - ESM performs poorly when **MSA depth is low**, suggesting underrepresentation in pre-training data.
   - **S2F and S3F mitigate this via structure**, yielding stronger predictions on low-depth proteins.
3. **Taxonomic category (Figure 2c)**:
   - On **viral proteins**, ESM-2-650M is weaker, while S3F improves Spearman substantially—**structure and surface reduce sequence-model bias**.
4. **Mutation depth (Figure 2d)**:
   - **Single mutations** are predicted more accurately than **multiple mutations**, consistent with an additive assumption.
   - **S3F gains grow with mutation depth**, indicating that structure and surface help model **epistasis**.

#### 4.4 Impact of Structure Quality

Because many proteins lack experimentally determined structures, the study uses **AlphaFold2** predictions and analyzes how quality affects performance.

1. **Stratified by structure quality (Figure 2e)**:
   - The 217 assays are split by pLDDT into **high (>90), medium (70–90), and low (<70)**.
   - **All methods correlate positively with structure quality**; S3F benefits most on high-quality structures.
2. **Different AlphaFold2 models (Figure 2f)**:
   - Inference with five AlphaFold2 structures of varying pLDDT shows:
   - **Low-quality structures hurt S2F and S3F**, confirming dependence on structural accuracy.

#### 4.5 Generalization Ability to Unseen Protein Families

Generalization to **unseen protein families** is evaluated as follows:

- **23 assays** whose sequences have **<30% similarity** to the CATH pre-training set.
- **Figure 2g** shows:
  - **All methods drop slightly, but S2F and S3F retain consistent gains**.
  - Multi-scale learning **generalizes to new families**.

#### 4.6 Case Study: Epistatic effects in the IgG-binding domain of protein G

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/S3F/fig3.png" alt="avatar" style="zoom:50%;" /></div>

To illustrate how S3F improves mutational effect prediction, the authors study mutations in the **GB1 (IgG-binding domain)**:

- The GB1 dataset measures **all single- and double mutants**, enabling analysis of **epistasis**.

- **Figure 3 (a–c)** shows Spearman correlation for mutation pairs predicted by ESM, S2F, and S3F:

  - **S2F and S3F better capture interactions between residues that are far apart in sequence but close in space**, showing that **structure and surface help model epistasis**.
  - **Figure 3 (d)** visualizes the mutational region structurally and how it relates to function.

<hr align="left" color="#987cb9" size="1">
