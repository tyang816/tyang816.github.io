---
layout: post
title: bioRxiv-2024 Mixture of Experts Enable Efficient and Effective Protein Understanding and Design
categories: [BI]
tags: [protein, language-model]
proceedings: bioRxiv
date: 2024-11-29
lang: en
alt_url: /zh/notes/bi/Mixture-of-Experts-Enable-Efficient-and-Effective-Protein-Understanding-and-Design/
permalink: /notes/bi/Mixture-of-Experts-Enable-Efficient-and-Effective-Protein-Understanding-and-Design/
redirect_from:
  - "/bi/Mixture-of-Experts-Enable-Efficient-and-Effective-Protein-Understanding-and-Design/"
  - "/BI/Mixture-of-Experts-Enable-Efficient-and-Effective-Protein-Understanding-and-Design/"
---

> Paper: [Mixture of Experts Enable Efficient and Effective Protein Understanding and Design](http://biorxiv.org/lookup/doi/10.1101/2024.11.29.625425)
>
> Code: <https://huggingface.co/genbio-ai/AIDO.Protein-RAG-16B-proteingym-dms-zeroshot>

## AIDO.Protein: MoE pre-trained protein language model

### Abstract

Proteins play a fundamental role in life, and understanding their language is essential for fields such as biology and medicine. Although large protein language models (PLMs) such as ESM2-15B and xTrimoPGLM-100B perform strongly, their dense Transformer architectures lead to **poor computational efficiency**. To address this, this work introduces **AIDO.Protein**, the **first mixture-of-experts (MoE) model** in the protein domain, with **16 billion parameters**. It uses a **sparse MoE architecture** with **8 experts** per Transformer block and **activates 2** for each input token, substantially improving training and inference efficiency. The model was pre-trained on **1.2 trillion amino acids** collected from UniRef90 and ColabfoldDB. AIDO.Protein achieves **state-of-the-art (SOTA) results** on most tasks in the xTrimoPGLM benchmark and, across more than 280 ProteinGym DMS analyses, reaches **nearly 99% of the best MSA-based model performance**, while clearly outperforming prior SOTA models that do not use MSAs. It also sets **new SOTA** on structure-conditioned protein sequence generation.

### 1 Introduction

Proteins are the primary executors of life and carry out most biological functions in the cell. Their roles are diverse, including serving as biological catalysts, providing structural support, transporting molecules, recognizing pathogens, and relaying signals.

To understand protein function, research follows two main directions:

1. **Sequence–structure–function**: infer function by studying the 3D structure of proteins in their active form.
2. **Sequence–function**: infer function directly from sequence, especially when structural information is scarce. Either path underscores the shared need to understand the “language” of protein sequences.

Understanding protein language is critical for advancing genetics and accelerating drug discovery. For example, it can help design enzymes that degrade plastic waste or hydrolyze environmental toxins, or enable timely vaccine development during pandemics.

**Role of artificial intelligence**:

- **Inspiration from large language models**: Recent progress in AI, especially large language models (LLMs), offers a promising route toward this goal. The success of LLMs in natural language processing (NLP) has motivated self-supervised pre-training on unlabeled protein sequences in the protein domain.
- **Protein language models (PLMs)**: These PLMs excel on tasks including structure prediction, function prediction, and sequence design. For instance, PLM-based ESMFold reaches near–AlphaFold2 accuracy at the atomic level in structure prediction, while the 100-billion-parameter xTrimoPGLM performs strongly on diverse function prediction tasks.
- **Trade-off between scale and efficiency**: Model scale is a key driver of performance, and trends suggest larger models perform better. However, as PLMs grow, computational efficiency drops because running larger models demands more compute. Prior work has focused mainly on scaling models for performance, with less emphasis on computational efficiency.

**Research question and solution**:

- **Core question**: Can PLMs maintain or improve performance while keeping training and inference efficient?
- **Potential approach**: Sparse expert models offer one possible answer.
- **Mechanism of sparse expert models**: In these models, a subset of parameters is partitioned into “experts,” each with its own weights. The model routes each input to selected experts for processing. Thus each sample interacts with only a subset of network parameters, unlike dense models. Because only a fraction of experts is used, compute can stay modest relative to total model size.
- **Mixture of experts (MoE)**: MoE is a prominent sparse expert design; when integrated into Transformers, it has become a strong alternative to dense Transformer models in NLP.

**Contributions of this work**:

- **First protein MoE model**: This work explores pre-training the first MoE model for proteins, in contrast to existing PLMs that use dense Transformer architectures.
- **AIDO.Protein**: The authors present AIDO.Protein, a 16B-parameter MoE model pre-trained on 1.2 trillion amino acid tokens from UniRef90 and ColabfoldDB.
- **Efficiency**: During training and inference, each input token is processed by 4.5B parameters—only **28%** of the total parameter count.
- **Evaluation**: The model is evaluated on broad benchmarks including xTrimoPGLM (18 tasks) and ProteinGym DMS (283 protein fitness prediction tasks).
- **Results**: Experiments show that AIDO.Protein delivers strong performance across tasks while maintaining higher computational efficiency. It is also applied to protein inverse folding and surpasses prior SOTA methods.
- **Conclusion**: These results indicate that AIDO.Protein is a powerful and efficient foundation model for protein understanding and design.

### 3 Pre-training AIDO.Protein

#### 3.1 Model architecture

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AIDO.Protein/fig1.png" alt="avatar" style="zoom:100%;" /></div>

The AIDO.Protein architecture is based on a Transformer encoder with key modifications for efficiency.

- **Core design**: The model uses a **Transformer encoder**, replacing the dense MLP (multilayer perceptron) in each Transformer block with a **sparse MoE layer**.

- **MoE layer**:

  - The design largely follows the MoE layer in the Mixtral 8×7B model.

  - The layer is applied independently to each token (amino acid) in the input sequence.

  - It contains N=8 expert networks (Ei(x)) and a gating network (Wg).

  - For each input token x, the gating network computes weights and selects the **K=2** most relevant experts via a TopK mechanism.

  - The output y is a weighted sum of the selected experts’ outputs, computed as follows:

    <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AIDO.Protein/frm1.png" alt="avatar" style="zoom:80%;" /></div>

  - **Model parameters**: In experiments, N=8, K=2, and d=2304. The model has **36 Transformer layers** and **36 attention heads**, for **16 billion** parameters in total.

  - **Computational efficiency**: Despite the large total parameter count, each input token is processed by only **4.5B parameters** during training and inference—**28%** of the full model.

  - **Training objective**: Training uses the standard **masked language modeling (MLM)** objective. The model predicts masked amino acids in the sequence, learning complex dependencies in protein sequences. MoE layers help assign different experts to different sequence patterns, capturing a broader range of sequence features.

  - **Visualization**: Figure 1 illustrates the architecture, including self-attention with RoPE (rotary position embedding) and MoE layers with a router and eight feed-forward networks (FFNs).

#### 3.2 Pre-training data

To train AIDO.Protein, the authors built a large, carefully curated protein sequence corpus.

- Data sources: The model was first pre-trained on a combination of ColabfoldDB and UniRef90.
  - **ColabfoldDB**: Emphasizes metagenomic sources such as BFD, MGnify, and various eukaryotic and viral datasets.
  - **UniRef90**: Provides clustered sequences from UniProt with broad coverage and minimal redundancy. Specifically, UniRef90/50 (data before December 2022) was used.
- **Continued training**: Given UniRef90’s effectiveness for prior PLMs and the benefit of continued training for downstream performance, the model was additionally trained on **100 billion tokens** from UniRef90.
- Model variants: Two versions were developed:
  - **AIDO.Protein-16B**: Trained on **1.2 trillion amino acids** from ColabfoldDB and UniRef90.
  - **AIDO.Protein-16B-v1**: Built on the previous version with an extra **100 billion amino acids** of continued training on UniRef90.

#### 3.3 Pre-training settings

Pre-training used specific hyperparameters and a multi-stage schedule.

- General settings:
  - Global batch size 2048, context length 2048.
  - AdamW optimizer with weight decay 0.1.
  - Cosine learning-rate schedule with warmup for 2.5% of total training steps.
  - FP16 mixed-precision training for speed.
  - Megatron-Deepspeed framework on **256 Nvidia A100-80G GPUs** for **25 days**.
- Three-stage training:
  - **Stage 1**: 1 trillion tokens from UniRef90 and ColabfoldDB for 18.5 days; learning rate decayed from 2e-4 to 2e-6.
  - **Stage 2**: 200 billion tokens from the same sources for 4 days; learning rate from 1e-5 to 1e-6.
  - **Stage 3**: A further 100 billion tokens on UniRef90 for 2.5 days; learning rate between 1e−5 and 1e-6.

### 4 Experiments

#### 4.1 AIDO.Protein achieves strong results across diverse tasks from xTrimoPGLM benchmark

To comprehensively test protein understanding, the authors evaluated on the xTrimoPGLM benchmark, which comprises 18 tasks in four categories:

- Protein structure prediction: contact map prediction, fold prediction, secondary structure prediction
- Protein function prediction: antibiotic resistance prediction, fluorescence prediction, fitness prediction, localization prediction
- Protein–protein interaction prediction: enzyme catalytic efficiency, peptide–HLA/MHC affinity, metal ion binding, TCR–pMHC affinity
- Protein engineering: solubility, stability, temperature stability, optimal temperature, optimal pH, cloning classification, material production

**Fine-tuning**: All tasks used **LoRA (Low-Rank Adaptation)** with rank 16 and alpha 16.

**Optimizer and learning rate**:

- Most tasks used Adam with peak learning rate 1e-4 and a cosine schedule (warmup ratio 0.05).
- Contact map prediction used Adam with a constant learning rate of 1e-4.

**Training epochs and selection**: Models were fine-tuned for 10, 15, or 20 epochs; the best checkpoint was chosen by validation score.

#### 4.2 AIDO.Protein demonstrates impressive performance on ProteinGym DMS benchmark

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AIDO.Protein/tab2-tab3.png" alt="avatar" style="zoom:100%;" /></div>

The benchmark includes 66 insertion/deletion (indel) analyses and 217 substitution analyses. Each analysis provides all possible mutations for a target protein and corresponding fitness scores. Metrics are **Spearman rank correlation** and **mean squared error (MSE)**.

##### 4.2.1 DMS indels supervised benchmark

**Fine-tuning setup**:

- All tasks were evaluated under 5-fold cross-validation (ProteinGym’s random split).
- For 54 small-sample tasks, **linear probing** was used: AIDO.Protein weights were frozen to reduce overfitting. The prediction head was a 2-layer MLP (hidden size 128, dropout 0.1). AdamW with peak LR 1e-3 and cosine schedule (warmup 0.05). No validation-based selection; training ran for 1000 steps and the last checkpoint was used for prediction.
- For the other **12 large-sample tasks**, **LoRA fine-tuning (rank 16, alpha 32)** with peak LR 1e-4 was used. One fold served as validation; training ran 10,000 steps with early stopping.

##### 4.2.2 DMS substitutions supervised benchmark

**Task description**: Substitution mutations replace one or more residues with others. The benchmark has 217 analyses: 69 single-site and 148 multi-site substitutions.

**Data characteristics**: As in Table 2, sequence lengths range from 37 to 3423 and sample sizes from 63 to 536,962. Small-sample tasks overfit easily; very long sequences cause out-of-memory (OOM) issues. Fine-tuning strategies therefore differ by sample size and sequence length.

**Model choice**: **AIDO.Protein-16B-v1** was evaluated because continued pre-training on UniRef90 substantially improved zero-shot substitution prediction.

**Fine-tuning setup**:

- Random 5-fold cross-validation.
- Adam optimizer with cosine learning-rate schedule.
- LoRA (rank 16, alpha 32), peak LR 1e-4, 10,000 training steps with early stopping.
- For 13 tasks with more than 20,000 samples, only one epoch per fold.
- For 4 tasks with sequence length over 2048, sequences were truncated to 2048 and LoRA rank was set to 4 with alpha 8.

#### 4.3 DMS overall supervised benchmark

After evaluating indel and substitution performance in Table 3, the authors examined **overall performance** of AIDO.Protein on the full DMS supervised benchmark, aggregating **66 indel** and **217 substitution** analyses—283 tasks in total.

#### 4.4 AIDO.Protein offers enhanced capabilities for protein design

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AIDO.Protein/tab4-fig2.png" alt="avatar" style="zoom:80%;" /></div>

Protein design is a central research and application area in biochemistry, molecular biology, and biotechnology. This section describes applying AIDO.Protein to that goal.

**Core application: protein inverse folding**

- The team focused on **protein inverse folding**, a key step in **de novo protein design**: generating sequences that fold into a specified 3D structure.
- They built a framework based on **discrete diffusion modeling**.

**Framework details**:

- **Structure encoder**: The framework uses **ProteinMPNN-CMLM** (a ProteinMPNN variant) as the structure encoder for structure-conditioned diffusion.
- **Further details**: Additional technical details appear in Appendix A.1 of the paper.

**Experiments and evaluation**:

- **Dataset**: Evaluation used the **CATH 4.2 dataset**, a standard resource for protein design benchmarks.
- Results (Table 4):
  - The framework is named **AIDO.Protein-IFdiff**.
  - It achieved **58.26% median sequence recovery**.
  - This is **substantially higher** than prior SOTA methods such as LM-Design (54.41%) and DPLM (54.54%).

**Example (Figure 2)**:

- The paper shows a concrete case (PDB ID: 2DLX, Chain: A).
- The figure compares:
  - **Left**: Sequences generated by AIDO.Protein-IFdiff and AlphaFold2-predicted 3D structures, with prediction confidence (pLDDT).
  - **Right**: Ground-truth sequence and structure from the Protein Data Bank (PDB).
- The generated sequence’s predicted structure closely matches the ground truth with high confidence, demonstrating the framework’s ability to produce viable protein sequences.

<hr align="left" color="#987cb9" size="1">

