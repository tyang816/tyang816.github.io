---
layout: post
title: KDD-2023 Pre-training Antibody Language Models for Antigen-Specific Computational Antibody Design
categories: [BI]
tags: [protein, antibody, GNN, PLM]
proceedings: KDD
date: 2023-08-04
lang: en
alt_url: /zh/notes/bi/Pre-training-Antibody-Language-Models-for-Antigen-Specific-Computational-Antibody-Design/
permalink: /notes/bi/Pre-training-Antibody-Language-Models-for-Antigen-Specific-Computational-Antibody-Design/
---

> Paper: [Pre-training Antibody Language Models for Antigen-Specific Computational Antibody Design](https://dl.acm.org/doi/10.1145/3580305.3599468)
>
> Code: <https://github.com/KyGao/ABGNN>

## ABGNN: Pre-trained AbBERT + RefineGNN for antibody–antigen encoding

### Abstract

Antibodies are proteins that protect the human body effectively by binding pathogens. In recent years, deep-learning-based computational antibody design has attracted broad attention because it can automatically mine antibody patterns from data to complement human expertise. However, computational methods rely heavily on high-quality antibody structural data, which remain scarce. Moreover, the complementarity-determining regions (CDRs)—the key segments that govern antibody specificity and binding affinity—are highly variable and difficult to predict; limited availability of high-quality antibody structures further aggravates CDR generation. Fortunately, large-scale antibody sequence data are available to support CDR modeling and reduce dependence on structural data. Inspired by the success of pre-trained models in protein modeling, this work develops an **antibody pre-trained language model** and **integrates it systematically into antigen-specific antibody design**. Specifically, a novel antibody language model is pre-trained on sequence data; a **one-shot** method is proposed to generate CDR sequence and structure jointly, mitigating the high computational cost and error propagation of autoregressive approaches; and carefully designed modules leverage the pre-trained antibody model to strengthen antigen-specific antibody generation. Experiments show that the proposed method outperforms existing baselines on **sequence and structure generation**, **CDR-H3 design for antigen binding**, and **antibody optimization**.

### 1 Introduction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/fig1.png" alt="avatar" style /></div>

Antibodies are Y-shaped proteins that play a central role in the human immune system and can be used to treat infections, cancer, and other diseases. They are highly specific: most therapeutic antibodies are monoclonal, and each antibody typically binds one particular antigen. Binding specificity is largely determined by the complementarity-determining regions (CDRs), especially CDR-H3 on the heavy chain—the most critical and most variable segment. The main challenge in antibody design is therefore to identify and design new CDRs that bind a given antigen effectively and stably.

In recent years, computational methods have been explored to automatically generate CDR sequences with desired properties such as high binding affinity. Deep learning shows strong potential in antibody design, including deep generative models and graph neural networks. Early work focused mainly on CDR sequence generation; more recently, joint design of sequence and three-dimensional structure has become a more promising direction. For example, some studies use deep graph neural networks to model antibody sequence and structure simultaneously. Nevertheless, current methods still face several challenges. First, the number of antibody 3D structures in existing datasets is limited: the widely used **SAbDab** database contains only thousands of structures, and antigen–antibody complexes are even scarcer, which hampers training of deep models—especially for highly variable CDR structures. Second, most antibody design pipelines generate amino-acid types and structural coordinates autoregressively, step by step. That paradigm is inefficient (many iterative steps) and suffers from error accumulation: mistakes in early steps propagate and degrade overall generation quality.

To address these challenges, this paper proposes several strategies:

1. Although structural data are limited, antibody sequence data are abundant, and prior work shows that sequence determines structure. The authors therefore design an antibody sequence pre-training procedure to exploit large-scale sequence data, improve antibody representations, and alleviate scarcity of structural data.
2. They propose a **one-shot** method to generate CDR sequence and structure jointly. Compared with autoregressive generation, all CDR residues are predicted at once and structure is updated in one shot, avoiding error propagation. Multiple iterative refinement steps (similar to AlphaFold2) are added to further improve the output.
3. The pre-trained antibody language model is integrated systematically into the antibody design model—not merely for initialization. **Prompt tuning** is used so the pre-trained model retains its prior capabilities while supplying transferable knowledge for downstream antibody design. Intermediate representations from the pre-trained model are fused with the design model to strengthen CDR sequence and structure prediction.

These strategies are evaluated on **sequence and structure generation, antigen-binding CDR-H3 design, and antibody optimization**. Results show **state-of-the-art** performance on multiple metrics together with improved efficiency and accuracy. Main contributions:

1. An **antibody-specific pre-training** approach applied successfully to joint antibody sequence–structure design.
2. A **one-shot** generation strategy that improves efficiency and limits error accumulation.
3. Extensive experiments demonstrating effectiveness and state-of-the-art antibody design performance.

### 3 Methods

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/fig2.png" alt="avatar" style /></div>

#### 3.1 Background and Overview

An antibody consists of two symmetric halves, each with a heavy and a light chain (VH and VL). The variable region contains the **framework** and **three CDRs (CDR-H1/H2/H3)**. CDRs govern antigen binding; CDR-H3 is the most variable and accurate prediction of CDR-H3 is the core challenge in antibody design. The method builds on **deep graph neural networks (GNNs)** and **antigen–antibody complexes**. Unlike prior work, it uses **only the antigen epitope**, not the full antigen, and conditions on the **antibody framework** to improve design accuracy.

The pipeline uses sequence representations from the **AbBERT** pre-trained model, **sequence GNN (H_seq)** and **structure GNN (H_str)** for **joint sequence–structure generation**, and multi-round iterative refinement. The overall framework is shown in **Figure 2**.

#### 3.2 AbBERT: Antibody Pre-training

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/fig3.png" alt="avatar" style /></div>

Because high-quality antibody structures are scarce while sequence data are plentiful, the authors follow successful protein pre-training practice and train **AbBERT**, an **antibody language model**, to improve representations and downstream design.

**AbBERT pre-training follows a BERT-style masked language model (MLM)**, adapted to antibody sequences:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/frm1.png" alt="avatar" style /></div>

* Training uses **only the heavy chain (VH)**, which is central to antibody function.
* Pre-training covers **only the variable region (VH)**, not the constant region.
* **Masking strategy**: unlike standard BERT, AbBERT **masks only CDR tokens**; framework tokens provide context to improve CDR prediction.
* **Region embedding**: separate embeddings for **CDR-H1/H2/H3 and framework** help the model distinguish functional regions.
* **Masking ratio**: because CDRs comprise roughly 15% of the VH sequence, experiments use high mask ratios (50%, 80%, and 100%) so the model learns CDR patterns effectively.

After training, AbBERT can **predict all CDR residues in one shot**, improving efficiency and supplying strong initialization for antibody design.

#### 3.3 Antibody Sequence-structure Co-design

Antibody design is cast as a **3D graph completion task**: predict **paratope (CDR)** structure and the corresponding sequence. A **hierarchical graph neural network (GNN)** encodes and decodes sequence (H_seq) and structure (H_str). All graphs use **K-nearest neighbors (KNN)**; nodes can be atom- or residue-level.

Unlike Jin et al. [18], the model conditions on **epitope and paratope** and additionally on the **antibody framework**. **AbBERT** provides **initialization and feature fusion** to improve design.

##### 3.3.1 Encoding

Encoding is performed jointly by **H_seq and H_str** with **hierarchical processing** at **atom** and **residue** levels.

* **Atom-level encoding**
    * Captures fine-grained interactions between antibody and antigen.
    * Includes **backbone** and **side-chain** atoms.
    * **Radial basis functions (RBF)** encode inter-atomic distances for the GNN.
* **Residue-level encoding**
    * Captures **global structural** patterns of antibody–antigen binding.
    * Per-residue features: **amino-acid type**, **dihedral angles**, **polarity**, **hydropathy**.
    * **Message passing networks (MPNs)** propagate residue features.

**Framework Encoding**

Because framework regions are long, a **coarse-grained** encoder reduces cost:

* The framework is split into **residue blocks**.

* Each block embedding is the **mean over residues in the block**.

* Formulation:

    <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/frm2.png" alt="avatar" style /></div>

    Here $E(B_f^j)$ and $z(B_f^j)$ denote features and coordinates of residues in framework **block j**.

**Initialization**

CDR sequence and structure are unknown at design time, so initialization matters. Two strategies are used:

1.  **Sequence Initialization**

    * Prior work often **randomly guesses** initial sequences; here **AbBERT** supplies a **soft predictive distribution**.

    * CDR states are initialized from **AbBERT’s soft distribution**:

        <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/frm3.png" alt="avatar" style /></div>

        $P(B_p^i|\hat{B})$ is **AbBERT’s amino-acid probability distribution**; $f(k)$ is the **feature vector for amino acid k**.

2.  **Structure Initialization**
    * Prior methods use **complex distance-based initialization**; here **linear interpolation** between framework flanking residues is **simpler and efficient**.

**Atom-level Encoding**

Node features:

* In the **atom graph**, each atom is a node.
* Features are **one-hot** atom types.

Edge features:

* Edges use **RBF** on distance: $f(B_p^i, G_e^j) = \text{RBF}(\| z(B_p^i, k) - z(G_e^j, l) \|)$
* $B_p^i, G_e^j$ are antibody and antigen atoms; $z(B_p^i, k)$ and $z(G_e^j, l)$ are 3D coordinates; RBF encodes distance.
* An MPN computes **atom-level feature vectors**.

**Residue-level Encoding**

Node features:

* In the **residue graph**, each residue is a node.
* Position uses **Cα 3D coordinates**.
* Amino-acid features $f(B_p^i)$ combine **dihedral angles**, **polarity**, and **hydropathy**.

**Hierarchical Feature Fusion**:

* Atom-level information is **summed** into residue nodes:

    <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/frm4.png" alt="avatar" style /></div>

* Notes:
    * ⊕ denotes **concatenation**.
    * $f(B_p^i)$ and $f(G_e^j)$ are **initial residue features** for antibody and antigen.
    * $\sum_k h(B_p^i, k)$ is the **sum of atom-level features**.

**Edge Features**:

* Residue-graph edge features $f(B_p^i, B_p^j)$ include **Euclidean distance**, **direction**, and **rotation** between residues.
* $f(B_p^i, B_p^j)$ encodes **geometric relations** between antibody residues $B_p^i$ and $B_p^j$.

**Residue-level Message Passing**:

* Given **node** and **edge** features, an **MPN** learns residue-level representations for **epitope and paratope**.

##### **3.2.2 Decoding**

Sequence and structure prediction use **one-shot** generation instead of **autoregressive** decoding:

1.  **Limitations of autoregressive methods**:
    * **Low efficiency**: amino acids are predicted sequentially with heavy computation.
    * **Error accumulation**: early mistakes **propagate** and bias the final output.
2.  **One-shot strategy in this work**: **all CDR residues are generated together**; **structure is predicted in parallel**, limiting error propagation; **T rounds of iterative refinement** follow, as in AlphaFold2.

**Sequence Generation**

* **Multi-class cross-entropy** predicts amino acids:

    <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/frm5.png" alt="avatar" style /></div>

* For the **first T−1 refinement rounds**, **soft distributions** are used; the **final round** applies hard sampling for amino-acid types.

**Structure Decoding**

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/fig4.png" alt="avatar" style /></div>

* A **force-based** update preserves **SE(3) equivariance** instead of direct coordinate regression.
* **Forces between Cα atoms** update backbone coordinates:

    $F(i, j) = g(h(B_p^i), h(B_p^j)) \cdot (z(B_p^i) - z(B_p^j))$

    $g$ is an **FFN**; $z(B_p^i)$ is the **coordinate of CDR residue i**.

* **Update rule**:
    ```math
    z_t(B_p^i) = z_{t-1}(B_p^i) + \frac{1}{n} \sum_{j \neq i} F_t(i, j) + \frac{1}{m} \sum_k F_t(i, k)
    ```
    $n$ and $m$ count **neighboring Cα atoms** and **other atoms**, respectively.

#### 3.4 Incorporating Pre-training

CDR sequence prediction needs good initialization; random init often yields unstable generation. **AbBERT’s soft predictive distribution** initializes CDR residue features.

Beyond initialization, AbBERT is used **throughout design**, not only at the input. **Multi-layer feature fusion** injects AbBERT representations into the antibody GNN:

* Fusion:

    * During **H_seq** and **H_str**, **AbBERT intermediate representations** strengthen **CDR sequence modeling**.
    * **AbBERT contextual representations** are added as extra input:

        <div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/frm6.png" alt="avatar" style /></div>

**Prefix-tuning**:

* Standard fine-tuning can cause **catastrophic forgetting** of pre-training; **prefix-tuning** avoids updating AbBERT weights:
* **AbBERT parameters are frozen**; only **learnable prefix vectors** adapt the model to **antibody design**.
* This **preserves AbBERT knowledge** while fitting the downstream generation task.

#### 3.5 Summary and Algorithm

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/alg1.png" alt="avatar" style /></div>

1.  **Inputs**: **antigen epitope**, **antibody framework**, **initial CDR**
2.  **Initialization**: **AbBERT soft distributions** for **CDR sequence features**; **linear interpolation** for **CDR coordinates**
3.  **Sequence–structure co-design**:
    * **H_seq** predicts CDR sequence (softmax distributions).
    * **H_str** predicts CDR structure (force-driven coordinate updates).
    * **T iterative refinement steps** adjust structure toward physical stability and antigen binding.
4.  **Outputs**: **optimized CDR sequence** and **structure**

### 4 Experiments

#### 4.1 Overview Settings

(1) **Sequence and Structure Prediction**
(2) **Antigen-binding CDR-H3 Design**
(3) **Antibody Optimization for SARS-CoV-2**

##### **Baseline Models**

Baselines for fair comparison:

* **RAbD (Rosetta Antibody Design)**: physics-based sequence generation and energy minimization.
* **LSTM-based methods**: sequence only, no structure.
* **AR-GNN (Autoregressive Graph Neural Network)**: encodes the antibody and predicts amino acids autoregressively.
* **RefineGNN**: like AR-GNN but refines structure between residue steps; different resolution for CDR vs. framework to emphasize CDRs.
* **HSRN (Hierarchical Structure Refinement Network)**: **hierarchical equivariant message passing** for antigen–antibody interaction with **autoregressive decoding and iterative refinement**.
* **MEAN**: **internal** and **external** message passing for context vs. surface; models light chain, heavy chain, and antigen.

##### **Model Settings**

* Pre-trained AbBERT: **12-layer Transformer (BERT-base)**, **hidden size 768**, **12 attention heads**, **prefix-tuning with 5 soft tokens**
* GNNs (H_seq and H_str)
    * **9-nearest-neighbor** graph edges
    * **4-layer MPNs**, hidden dimension **256**
    * **Framework** compressed: **one block per 8 residues**
    * **Refinement steps T = 5**

##### **Pre-training**

* Data: Observed Antibody Space (OAS), **over one billion** antibody sequences across **immune states, organisms, and individuals**.
* Processing
    * **Heavy-chain sequences only**.
    * **Filtering and clustering (MMseqs2, minimum 70% sequence identity)** to reduce redundancy.
    * **50 million sequences** sampled for pre-training.
* Training: 16× 32GB V100 GPUs; **batch size 256 per GPU**, **gradient accumulation 4**, **learning rate 0.0003**

#### 4.2 Task 1: Sequence and Structure Prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/tab1.png" alt="avatar" style /></div>

This task evaluates **joint sequence and structure prediction** for **CDR design** on **antigen–antibody complexes**, generating full **CDR segments** with **amino-acid sequence** and **3D structure**.

* **Dataset**: SAbDab; MMseqs2 on CDR regions with **>40%** sequence identity defining clusters; random **8:1:1** train/val/test split; **765**, **1093**, and **1659** clusters for CDR-H1, CDR-H2, and CDR-H3.
* **Evaluation**: held-out **antigens** for generalization; emphasis on **CDR-H3** because of its role in **binding and function**.

#### 4.3 Task 2: Antigen-binding CDR-H3 Design

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/fig5.png" alt="avatar" style /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/tab4.png" alt="avatar" style /></div>

##### **Data**

This setting is harder than generic CDR design: the goal is **CDR-H3 tailored to a specific antigen**, so **antigen is conditional input**. Only **CDR-H3** is generated.

* **Test**: Adolf-Bryfogle et al. [1], **60 antigen types** in antibody–antigen complexes.
* **Train**: **SAbDab** **complexes only** (no antibody-only structures).
* **Processing**: Jin et al. [18] split with **2777** train and **169** validation complexes.

##### **Inference Procedure**

* **Candidate generation**: following Jin et al. [18], **10,000 CDR-H3 sequences** per antibody at inference.
* **Filtering**: top **100** by lowest **perplexity** for **AAR (amino acid recovery)** and **RMSD (root mean square deviation)**.

#### 4.4 Task 3: SARS-CoV-2 Antibody Optimization

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/tab3.png" alt="avatar" style /></div>

##### **Data**

Goal: **optimize CDR-H3** of antibodies binding **SARS-CoV-2**. Data from the **Coronavirus Antibody Database [41]**: **2411** antibodies binding **SARS-CoV-1 or SARS-CoV-2**.

* Split: CDR-H3 **8:1:1** train/val/test.
* Preprocessing: Jin et al. [19] with **CDR filtering and sequence constraints** (see original paper).
* Optimization:
    * Training follows Jin et al. [19]; **ITA (Iterative Targeted Antibody Optimization)** **fine-tunes** generated antibodies.
    * CDR generation and constraints match Jin et al. [19] for fair comparison.

##### **Results**

* **Without wet-lab validation**, evaluation uses a **neutralization predictor**.
* **Binary classification** with Jin et al. [19]’s **pre-trained model** scores **neutralization**.
* Findings:
    * The proposed method improves predicted neutralization versus prior SOTA.
    * Redesigned antibodies show higher predicted neutralization, supporting AbBERT for **optimization**.

### 5 Study

#### 5.1 Ablation Study

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/fig6.png" alt="avatar" style /></div>

#### 5.2 Effect of Decoding ways

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/tab4.png" alt="avatar" style /></div>

#### 5.3 AbBERT Incorporating Ways

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/tab5.png" alt="avatar" style /></div>

#### 5.4 Effect of Pre-training

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ABGNN/tab6.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">


