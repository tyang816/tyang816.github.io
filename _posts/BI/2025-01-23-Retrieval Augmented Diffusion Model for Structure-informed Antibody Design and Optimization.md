---
layout: post
title: ICLR-2025 Retrieval Augmented Diffusion Model for Structure-informed Antibody Design and Optimization
categories: [BI]
tags: [GNN, antibody]
proceedings: ICLR
date: 2025-01-23
lang: en
alt_url: /zh/notes/bi/Retrieval-Augmented-Diffusion-Model-for-Structure-informed-Antibody-Design-and-Optimization/
permalink: /notes/bi/Retrieval-Augmented-Diffusion-Model-for-Structure-informed-Antibody-Design-and-Optimization/
redirect_from:
  - "/bi/Retrieval-Augmented-Diffusion-Model-for-Structure-informed-Antibody-Design-and-Optimization/"
  - "/BI/Retrieval-Augmented-Diffusion-Model-for-Structure-informed-Antibody-Design-and-Optimization/"
---

> Paper: [Retrieval Augmented Diffusion Model for Structure-informed Antibody Design and Optimization](https://openreview.net/forum?id=a6U41REOa5)
>
> Code: <https://github.com/GENTEL-lab/RADAb>

## RADAb: DiffAb + structural retrieval for sequence design

### Abstract

This work proposes a **Retrieval-Augmented Diffusion Model (RADM)** for **structure-informed antibody design and optimization**. RADM combines retrieval with diffusion modeling to improve the quality of generated antibody sequences while preserving structural stability and enabling functional optimization.

The method draws on a large database of known antibody sequences and structures, retrieves the most relevant sequences during generation, and incorporates that information into the diffusion denoising process. By leveraging high-quality existing antibodies, the model improves the viability and functionality of generated sequences. Experiments show that RADM outperforms prior methods on multiple antibody design tasks, including sequence diversity, structural fidelity, and functional optimization.

### 1 Introduction

Antibodies are **Y-shaped proteins central to the immune system**, responsible for recognizing and neutralizing specific antigens. Specificity largely arises from the **complementarity-determining regions (CDRs)**, which play a critical role in antigen-binding affinity. **Designing effective CDRs is therefore central to developing therapeutic antibodies**. Today, antibody development still relies heavily on **labor-intensive experimental workflows** such as animal immunization and library screening, which are costly and inefficient.

Recently, **deep learning and generative models** have advanced protein design, with **geometric learning and generative modeling** capturing higher-order interactions among amino acid residues directly from data. Despite strong generative capacity, **current models still face challenges in antibody design**, including:

1. **Missing structural constraints**: Many models struggle to produce antibodies consistent with physicochemical principles, yielding **sequences that do not follow natural antibody structural rules**.
2. **Limited training diversity**: Most work relies on SAbDab (Dunbar et al., 2014), which contains **fewer than 10,000 antigen–antibody complex structures**, making it hard to capture rich antigen–antibody interactions and increasing **overfitting risk**.
3. **Lack of template guidance**: Most methods perform **de novo sequence generation** without effectively exploiting existing antibody templates, requiring **large data and long training** before practical performance is acceptable.

**This work**

Inspired by **template-driven** and **fragment-driven antibody design**, we propose **Retrieval-Augmented Diffusion Antibody Design (RADAb)**. The model jointly uses:

- a **protein structure database** to retrieve the most relevant CDR fragments;
- an **effective fusion mechanism for structural and evolutionary signals** to mitigate overfitting;
- a **semi-parametric generative neural network** to reduce training demand and improve deployability.

Concretely, RADM adopts the following strategy:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/fig1.png" alt="avatar" style="zoom:60%;" /></div>

1. **Build a CDR fragment database**: Extract CDR fragments from the **non-redundant Protein Data Bank (PDB)** (Berman et al., 2000). Fragments need not come only from antibodies; they may be **any PDB segments matching CDR structural characteristics**.
2. **Retrieve the most relevant CDR fragments**: For a target antibody sequence, RADM uses **structural retrieval** to find CDR fragments with **similar backbones**, assuming **evolutionary similarity that can improve generalization**.
3. **Fuse multiple structurally homologous fragments for sequence optimization**: Unlike methods that refine using **a single CDR fragment**, RADM uses **a set of structurally homologous CDR fragments** together with the target backbone for **iterative optimization**.

**Main contributions**

1. **First retrieval-augmented generative framework** for antibody design, guided by **a set of CDR fragments** so sequences fit the target backbone and satisfy required biochemical properties.
2. **Novel retrieval mechanism** on the input antibody backbone, with a **dual-branch denoising module** integrating structural and evolutionary information. A **coupled conditional diffusion module** iteratively refines generation using **global and local information**, capturing more functional signal than classical antibody **inverse folding**.
3. **Experiments show** RADM **surpasses existing SOTA** on multiple antibody inverse-folding tasks, e.g.:
   - **+8.08% amino acid recovery (AAR)** on long CDR-H3 inverse folding;
   - **+7 cal/mol absolute ∆∆G** on functional optimization.

### 3 Preliminaries and Notations

#### 3.1 Notations

An antibody comprises **two heavy chains (H) and two light chains (L)**. Each chain terminus carries a complementary binding site that **binds specifically to an epitope on the antigen**. That site is largely formed by **six complementarity-determining regions (CDRs)**:

- **Heavy-chain CDRs**: CDR-H1, CDR-H2, CDR-H3
- **Light-chain CDRs**: CDR-L1, CDR-L2, CDR-L3

CDRs govern binding specificity; **optimizing CDR sequences is the core antibody design task**.

Each amino acid **residue** is represented by:

1. **Residue type**
   - Denoted $s_i$, from the **20 natural amino acids**: $s_i \in \{ A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y \}$
2. **Coordinates**
   - $x_i \in \mathbb{R}^3$, the 3D position of the residue.
3. **Orientation**
   - $O_i \in SO(3)$, the 3D rotation of the residue.

Given a CDR segment of length $m$ starting at position $a$, the sequence is $R = \{s_j \mid j \in \{a+1, \dots, a+m\}\}$, where $R$ is the CDR sequence to optimize.

The full antibody has length $M$. The **antibody framework** is everything outside the CDR: $C_{ab} = \{ (s_i, x_j, O_j) \mid i \in \{1, \dots, M\} \setminus \{a+1, \dots, a+m\}, j \in \{1, \dots, M\} \}$

where:

- **Framework sequence**: $S_{ab} = \{ s_i \mid i \in \{1, ..., M\} \setminus \{a+1, ..., a+m\} \}$

- **Antigen**: $C_{ag} = \{ (s_i, x_i, O_i) \mid i \in \{M+1, ..., N\} \}$

  Antigen indices run from $M+1$ to $N$.

- **Retrieved CDR-like fragments**: $A = \{ A_i \mid i \in \{1, ..., k\} \}$

  where $k$ is the number of retrieved fragments.

**Model objectives**:

1. **Extract CDR structure from the antibody framework complex $C_{ab}$**;
2. **Query the retrieval module with CDR structure to obtain similar fragments $A$**;
3. **Predict the distribution of target CDR $R$ given antigen $C_{ag}$, framework $C_{ab}$, and retrieved fragments $A$.**

#### 3.2 Diffusion Model for Antibody Design

Because diffusion models (DMs) offer **strong performance and controllability in generation**, diffusion-based protein and antibody work has progressed rapidly (Luo et al., 2022; Villegas-Morcillo et al., 2023; Kulytė et al., 2024).

This work focuses on **sequence generation**. The forward process perturbs amino-acid sequence data as in Hoogeboom et al. (2021):

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/frm1.png" alt="avatar" style="zoom:60%;" /></div>

1. Notes:
   - $\beta^t$ is the noise schedule; as $t \to T$, $\beta^t \to 1$ and the distribution approaches uniform noise.
   - $\mathbf{1}$ is a 20-dimensional all-ones vector, i.e. the **uniform distribution over 20 amino acids**.

**Denoising process**

To **reverse the forward process** and **recover the antibody CDR sequence**, a network $F(\cdot)$ predicts denoised residue distributions from antibody–antigen context:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/frm2.png" alt="avatar" style="zoom:60%;" /></div>

where:

- $\mathcal{R}^t$ is the CDR at timestep $t$.
- $C_{ab}$ is the framework.
- $C_{ag}$ is the antigen.
- $F(\cdot)$ is the denoising network.

**DiffAb** (Luo et al., 2022) serves as the generative backbone, extended with retrieval augmentation.

### 4 Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/fig2.png" alt="avatar" style="zoom:100%;" /></div>

We propose **RADAb** (Figure 2), a **structure-informed retrieval-augmented diffusion framework** for antibody sequence design and optimization. A **structural retrieval algorithm** finds homologous antibody structures; their sequences condition the diffusion model with **homologous patterns** and **evolutionary information**.

#### 4.1 Structural Retrieval of CDR Fragments

Structure is determined by sequence, and sequences that fold to similar structures often share properties. **Structurally similar segments therefore carry evolutionary signal**. We search **PDB** for **segments structurally similar and homologous to the target CDR**, expecting **similar function**.

**Retrieval: MASTER**

For quality–speed balance we use **MASTER** (Zhou & Grigoryan, 2015).
 MASTER scores similarity with **backbone RMSD** and efficiently matches query structures in PDB.

MASTER properties:

- Queries can consist of one or more **non-contiguous** structural segments.
- Returns all matches within an **RMSD threshold**.
- Uses **backbone information only**, **without exposing sequence** in the search.

**Retrieval procedure**

Algorithm 1 summarizes retrieval; details are in **Appendix A.3**.

1. **RMSD scoring and ranking**
   - Compute **RMSD** between retrieved and ground-truth CDR segments and sort.
   - **Filter out** the original CDR so training does not over-rely on the exact template.
2. **CDR fragment database**
   - We build a **CDR-like fragment database** (Appendix A.4).
3. **Training vs. generation**
   - **Training**: remove identical CDR hits to learn richer evolutionary signal and reduce overfitting.
   - **Generation**: no identical filtering, to improve output quality.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/alg1.png" alt="avatar" style="zoom:60%;" /></div>

#### 4.2 Model Architectures

RADAb denoises antibody CDR sequences stepwise using **structural and sequential context** of the antigen–antibody complex plus retrieved **CDR-like sequences** as conditions. Two branches:

1. **Global Geometry Context Information Branch**
   - Learns global context of the antigen–antibody complex.
2. **Local CDR-Focused Information Branch**
   - Learns local homology from CDR-like fragments, capturing functional similarity and evolution among structurally similar residues.

Their outputs are combined to produce the final CDR sequence.

##### 4.2.1 Global Geometry Context Information Branch

**(1) Context Encoder**

Proteins are chains of residues. Features include:

- **Single residue**: type, backbone atom coordinates, backbone dihedral angles
- **Pairwise**: residue pair types, sequential relative position, spatial distance, pairwise backbone dihedrals

Features are concatenated and passed through two **MLPs** yielding **$z_i$** (single-residue) and **$y_{ij}$** (pairwise).

**(2) Evolutionary Encoder**

Structure-aware **protein language models (PLMs)** provide strong sequence embeddings and evolutionary signal (Zheng et al., 2023; Shanker et al., 2024). We use **ESM2** as the antibody sequence encoder.

At timestep $t$, the antibody sequence (including the CDR) is encoded as $e^t = E(S_{ab} \cup R^t)$

- $S_{ab}$: framework sequence
- $R^t$: noisy CDR at $t$

**(3) Structure-Informed Network**

Encodings condition **current CDR sequence and structure** through **Invariant Point Attention (IPA) layers** (Jumper et al., 2021): $h_i = \text{IPA} (z_i, y_{ij}, e^t)$
 Hidden states **$h_i$** pass through an **MLP** to CDR-site **amino-acid probabilities**: $r_{\text{global}} = \text{MLP}(h_i)$
 Global outputs feed the **local CDR-focused branch**.

##### 4.2.2 Local CDR-Focused Information Branch

**(1) CDR-like fragment preprocessing**

- **Remove the CDR** and keep framework sequence only.
- **Pad CDR-like fragments** into the framework to form matrix **$E$**.

**(2) CDR-Focused Axial Attention**

**Axial attention layers** form **CDR-Focused Axial Attention**:

- CDR-like structures match the true CDR closely, enabling **tied row attention** from **MSA-Transformer** (Rao et al., 2021).
- In **standard axial attention** (Ho et al., 2019), rows and columns are independent;
- In **MSA**, sequences are structurally aligned; our CDR-like matrix shares this property, so:
  - When computing attention for one row, **other rows are considered jointly**, improving use of structural similarity while lowering memory.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/frm3-4.png" alt="avatar" style="zoom:60%;" /></div>

Matrix **$P$** for CDR-Focused Axial Attention (Equation 3):

where:

- **Row 1**: framework + noisy CDR $R^t$ (sampled from global distribution $r_{\text{global}}$).
- **Rows 2–k**: retrieved **CDR-like matrix $E$** (top 15 similar fragments).

**CDR-Focused Axial Attention** yields **homology embeddings** and local CDR probabilities:

- **Column self-attention**: CDR residues vs. retrieved fragments.
- **Row self-attention**: intra antibody–antigen sequence relations.

**(3) Skip Connection for Information Fusion**

The global branch may **lose antigen–antibody context** during forward propagation (Equation 4):

- **Global $r_{\text{global}}$** and **local $r_{\text{local}}$** are fused via a **skip connection**
- **Softmax** yields final CDR amino-acid probabilities.

#### 4.3 Model Training and Inference

**(1) The overall training objective**

Training matches the predicted per-timestep distribution to the true posterior.

Loss: **Kullback–Leibler divergence**:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/frm5.png" alt="avatar" style="zoom:60%;" /></div>

Timesteps are sampled uniformly over the diffusion horizon:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/frm6.png" alt="avatar" style="zoom:60%;" /></div>

**(2) Conditional reverse diffusion process**

From timestep **T**, CDR positions start as uniform noise.

**$E(\cdot)$** (ESM2), global **$F(\cdot)[j]$**, and local **$G(\cdot)[j]$** predict noise distributions and denoise each step:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/frm7-8.png" alt="avatar" style="zoom:60%;" /></div>

At sampling time, the CDR is removed, filled with random noise, and **retrieved CDR fragments guide** stepwise denoising to produce the full CDR sequence.

### 5 Experiments

We evaluate generation on two tasks:

1. **Antibody CDR Sequence Inverse Folding** (§5.1): given framework structure, generate the CDR sequence.
2. **Antibody Optimization Based on Sequence Design** (§5.2): improve affinity or stability via sequence design.

Ablations (§5.3) validate retrieval augmentation.

**Data and preprocessing**

- Training uses **SAbDab** plus our CDR-like fragment set.
- Following **Luo et al., 2022**:
  - Drop structures worse than 4 Å resolution.
  - Exclude antibodies targeting non-protein antigens.
  - Number residues with **ANARCI** (Dunbar & Deane, 2016) (**Chothia & Lesk, 1987**).
  - Cluster at **50% CDR-H3 sequence identity**; **50 PDB entries (63 antigen–antibody complexes)** for testing.
  - Remove training structures in the same cluster as test cases.

#### 5.1 Antibody CDR Sequence Inverse Folding

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/tab1-3.png" alt="avatar" style="zoom:90%;" /></div>

**Table 1**:

- RADAb beats prior SOTA on **all metrics and all CDR regions**.
- On **CDR-H3** (most variable and specific), gains over **Diffab-fix and AbMPNN** on **AAR** are largest.
- **Retrieval augmentation** with **structurally similar homologs** improves **accuracy, consistency, and plausibility**.

CDR-H3 is **long and structurally diverse**, so **long CDR-H3 generation is hard** for deep models (Luo et al., 2022; Høie et al., 2024). We therefore evaluate a **test subset with CDR-H3 length > 14** (**Table 2**):

**All methods degrade**, but RADAb stays **more consistent** with **larger relative gains**.

#### 5.2 Antibody Functionality Optimization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/fig3.png" alt="avatar" style="zoom:100%;" /></div>

We study **sequence evolution** and whether folded structures show **better function** (stronger antigen binding).

1. **Fold designed CDR-H3 sequences**:
   - **ABodyBuilder2** merges generated **CDR-H3** with framework and predicts full structure.
   - **Native sequences** are folded as controls.
2. **Energy optimization and scoring**:
   - **PyRosetta** (Alford et al., 2017) **FastRelax** and **InterfaceAnalyzer**:
     - **FastRelax**: relax the antigen–antibody complex.
     - **InterfaceAnalyzer**: **binding energy (∆G)** for binding strength.

**Table 3**:

- RADAb designs show **lower binding energy** after folding and relaxation—more stable than baselines.
- **37.3%** of designs beat the native folded ∆G, showing partial success at improving binding.

**Case study**:

- One test complex: neutralizing antibody against SARS-CoV-2 RBD (PDB: 7d6i).
- **50 CDR-H3 sequences** generated; folded ∆G computed.
- **68%** beat the native complex ∆G—stronger predicted binding.

**Figure 3**:

- Two representative samples:
  - Not highest **AAR**, but **much better binding affinity** than native.
  - Optimized sequences may **mutate away from native sequence** while **improving binding-compatible structure**.

#### 5.3 Analysis

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RADAb/tab4.png" alt="avatar" style="zoom:80%;" /></div>

**Table 4**

- Ground-truth CDR input validates the retrieval module.
- Ablations **remove retrieval** or **evolutionary embeddings** separately.
- **Findings**:
  - Each component alone helps.
  - **Together they perform best**.
  - **Retrieval and evolutionary embeddings are complementary** for sequence quality.

**Figure 4**

- Small **k** (e.g. 1 or 2) hurts performance.
  - Likely **too few retrievals → overfitting**.
- **Performance rises with k** as fragments add useful signal.
- **Best at k = 15**.
- **k > 15** declines—**noisy excess retrievals** hurt generalization.

<hr align="left" color="#987cb9" size="1">
