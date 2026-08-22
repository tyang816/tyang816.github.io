---
layout: post
title: PLOS Computational Biology-2024 Large scale paired antibody language models
categories: [BI]
tags: [protein, antibody, PLM]
proceedings: PLOS Computational Biology
date: 2024-12-06
lang: en
alt_url: /zh/notes/bi/Large-scale-paired-antibody-language-models/
permalink: /notes/bi/Large-scale-paired-antibody-language-models/
redirect_from:
  - "/bi/Large-scale-paired-antibody-language-models/"
  - "/BI/Large-scale-paired-antibody-language-models/"
---

> Paper: [Large scale paired antibody language models](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1012646)
>
> Code: <https://huggingface.co/Exscientia/IgBert>

## IgBert-IgT5: Continued pre-training language models for antibodies

### Abstract

Antibodies are immune proteins that recognize and neutralize antigens and are widely used therapeutically. With advances in next-generation sequencing, billions of antibody sequences have been collected; however, the scale and complexity of these data limit their use in optimizing therapeutic design. This work introduces **IgBert** and **IgT5**, two antibody-specific language models that jointly handle paired (heavy and light chain) and unpaired variable-region sequences. Training draws on more than 2 billion unpaired sequences and 2 million paired sequences from the **Observed Antibody Space (OAS)** dataset. The authors show that these models outperform existing antibody and protein language models on antibody-engineering design and regression tasks, with strong results on sequence recovery, expression-level prediction, and binding-affinity prediction.

### Introduction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgBert-IgT5/fig1.png" alt="avatar" style /></div>

Antibodies are central to the immune system, protecting the organism by recognizing and neutralizing antigens such as bacteria, viruses, and toxins. An antibody adopts a symmetric Y-shaped structure built from two light chains and two heavy chains. The **variable region** is the segment that confers antigen specificity; within it, the **complementarity-determining regions (CDRs)** are especially important, and **CDRH3** on the heavy chain plays a key role owing to its diversity and structural complexity in antigen recognition.

Next-generation sequencing (NGS) enables rapid acquisition of large antibody sequence collections and reveals antibody diversity. The sheer volume of data makes traditional bioinformatics approaches—such as sequence alignment and motif search—ill-suited for comprehensive analysis.

Protein language models (PLMs), inspired by natural language processing, learn complex patterns from large amounts of unlabeled sequence via unsupervised learning. They are typically trained with **masked language modeling (MLM)**, masking random amino-acid positions and asking the model to predict the masked residues.

Such models already perform well on many protein design tasks, including recovering missing residues, generating new sequences, predicting structure, and identifying functional properties (e.g., binding sites and thermostability).

Antibody-focused language models can learn sequence patterns more specific to antibodies—for example, training on **paired heavy- and light-chain sequences** allows the model to capture cross-chain interactions.

However, most existing antibody language models:

*   Rely only on unpaired sequences
*   Or depend on fine-tuning from general protein models (lower compute cost, but may miss antibody-specific features).

This paper develops two antibody-specific language models, **IgBert** and **IgT5**:

*   IgBert is a bidirectional encoder based on **BERT**.
*   IgT5 is a text-to-text model based on **T5**.

Key contributions:

*   Training on **more than 2 billion unpaired** and **2 million paired** sequences from Observed Antibody Space (OAS).
*   Evaluating performance on sequence recovery, binding-affinity prediction, expression-level prediction, and related tasks.

### Models

Both models use **masked language modeling (MLM)** as the training objective.

**Sequence encoding and masking**:

*   Sequences are tokenized by amino-acid type; heavy and light chains are separated by a delimiter (`[SEP]` for BERT, `</s>` for T5).
*   A fraction of residues is randomly masked; IgBert and IgT5 use the following strategies:

    *   **IgBert**:

        *   15% of residues per sequence are chosen as mask positions.
        *   Of those, 80% are replaced with a mask token, 10% with a random residue, and 10% are left unchanged.
    *   **IgT5**:

        *   Likewise 15% of residues are masked, but contiguous spans are replaced by a single sentinel token.
        *   Unlike BERT, T5 is trained to reconstruct the full sequence.

### Data preparation

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgBert-IgT5/fig2.png" alt="avatar" style /></div>

**Data sources**

*   Training data come from the **Observed Antibody Space (OAS)** database, including:

    *   **More than 2 billion unpaired sequences**: variable-region heavy- and light-chain sequences.
    *   **More than 2 million paired sequences**: paired variable regions of heavy and light chains.
*   The corpus is dominated by human antibody sequences.

**Processing pipeline**

Data preparation has two stages: **unpaired pre-training data** and **paired fine-tuning data**.

**(1) Unpaired pre-training data**

1.  **Deduplication**:

    *   Sequences are deduplicated in the database, yielding **2,097,593,973** unique sequences.
2.  **Clustering**:

    *   **Linclust** clusters sequences so that train, validation, and test splits do not share similar sequences.
    *   Clustering uses a 95% sequence-identity threshold, producing **1,456,516,479** clusters.
3.  **Splitting**:

    *   400,000 clusters are sampled at random for validation and test (200,000 each).
    *   The remaining **1,416,516,479** clusters form the training set, totaling **2,040,122,161** sequences.
    *   Validation and test each contain 200,000 representative sequences.

**(2) Paired fine-tuning data**

1.  **Deduplication and clustering**:

    *   OAS contains 2,038,528 paired sequences.
    *   Paired heavy and light chains are clustered with **MMseqs2** at the same 95% identity threshold.
    *   Clustering is performed on concatenated heavy–light sequences.
    *   Results:

        *   **1,777,722** clusters (train, validation, and test).
        *   40,000 clusters are sampled for validation and test (20,000 each).
        *   Remaining clusters are used for training, totaling **1,992,786** unique paired sequences.
    *   Validation and test each contain 20,000 representative sequences.
2.  **Input format**:

    *   Heavy and light chains are concatenated into one input, separated by `[SEP]` or `</s>`.

### Pre-training on unpaired sequences

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgBert-IgT5/tab1.png" alt="avatar" style /></div>

Training uses 32 A100 GPUs with DeepSpeed ZeRO Stage 2; each sequence is padded or truncated to length 200.

#### IgBert-unpaired

*   **Initialization**: IgBert-unpaired is initialized from **ProtBert** weights.
*   **Training set**: All sequences in unpaired OAS training clusters.
*   **Batch size**: **300** per GPU; global batch size **9600**.
*   **Steps**: **212,512** steps, one full epoch over the training set.
*   **Learning rate**: Maximum $10^{-5}$; **10,000-step** warmup.
*   **Training time**: About **66 hours**.

#### IgT5-unpaired

*   **Model size**: IgT5 is much larger than IgBert and requires more compute and memory; due to resource limits, training uses only representative sequences from training clusters.
*   **Initialization**: IgT5-unpaired is initialized from **ProtT5** weights.
*   **Training set**: Roughly **700M** representative sequences from training clusters.
*   **Batch size**: **24** per GPU; global batch size **768**.
*   **Steps**: **911,500** steps, corresponding to half an epoch.
*   **Learning rate**: Maximum $5 \times 10^{-5}$ (higher than IgBert). **30,000-step** warmup.
*   **Training time**: About **9 days**.
*   **Masking**: T5 uses single-span masking (maximum span length 1), similar to MLM but with an additional full-sequence reconstruction term.

### Fine-tuning on paired sequences

*   **Paired input**: Heavy and light chains are concatenated with a separator (`[SEP]` for IgBert, `</s>` for IgT5).
*   **Input length**: Paired inputs are fixed at length **300** to accommodate both chains; the longer context reduces per-GPU batch size to fit memory.

**Avoiding catastrophic forgetting**:

*   To preserve representations learned from unpaired data during paired fine-tuning, training uses mixed batches:

    *   Each batch contains both unpaired and paired sequences.
    *   The ratio of paired to unpaired sequences is **1:2**.
*   Unpaired examples are sampled randomly from the pre-training training set.
*   **Training settings**:
    *   Aside from input length and batch composition, optimizer and learning-rate schedule match pre-training.

#### IgBert

*   **Initialization**: Weights from **IgBert-unpaired**.
*   **Batch size** per GPU: **128** unpaired and **64** paired sequences.
*   **Steps**: **45,000** steps, about **46 epochs** over the paired data.
*   **Learning rate**: Linear warmup for **2,700** steps (~3 epochs).
*   **Objective**:

    *   Continued MLM:

        *   15% of amino-acid positions masked.
        *   Of masked positions, 80% mask token, 10% random residue, 10% unchanged.

#### IgT5

*   **Initialization**: Weights from **IgT5-unpaired**.
*   **Batch size** per GPU: **10** unpaired and **5** paired sequences.
*   **Steps**: **60,000** steps, about **5 epochs**.
*   **Learning rate**: Linear warmup for **4,000** steps.
*   **Objective**: Same as unpaired pre-training.

### Results

#### Sequence recovery

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgBert-IgT5/tab2.png" alt="avatar" style /></div>

On paired test sequences, 15% of residues are masked at random and the model predicts them. The metric is the fraction of correctly predicted residues in each region (framework and CDR).

*   IgT5 and IgBert clearly outperform prior models, especially in **CDR** regions.
*   Both models also perform strongly on framework recovery.

#### Binding affinity and expression

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgBert-IgT5/tab3.png" alt="avatar" style /></div>

Embeddings from the language models are used as features for linear regression to predict experimentally measured binding affinity and expression level.

*   Data:

    *   Binding affinity: three datasets, ~6700 measurements in total.
    *   Expression level: one dataset, 4275 measurements.

**Binding affinity prediction**:

*   **IgT5 and IgBert perform best**: IgT5 leads on some affinity datasets by a large margin, supporting the value of paired-data fine-tuning.
*   General protein LMs (e.g., ProtBert and ProtT5) are weaker.

**Expression level prediction**:

*   **ProtT5 performs best**: On expression, IgT5 and IgBert lag ProtT5, suggesting general protein models retain an advantage when broader evolutionary signal matters.

#### Perplexity

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/IgBert-IgT5/tab4.png" alt="avatar" style /></div>

Evaluated on 1000 randomly sampled paired test sequences.

<hr align="left" color="#987cb9" size="1">
