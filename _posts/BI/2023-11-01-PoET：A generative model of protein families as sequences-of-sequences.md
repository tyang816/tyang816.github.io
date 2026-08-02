---
layout: post
title: NeurIPS-2023 PoET：A generative model of protein families as sequences-of-sequences
categories: [BI]
tags: [protein, PLM, fitness-prediction]
proceedings: NeurIPS
date: 2023-11-01
lang: en
alt_url: /zh/notes/bi/PoET：A-generative-model-of-protein-families-as-sequences-of-sequences/
permalink: /notes/bi/PoET：A-generative-model-of-protein-families-as-sequences-of-sequences/
---

> Paper: [PoET：A generative model of protein families as sequences-of-sequences](https://proceedings.neurips.cc/paper_files/paper/2023/file/f4366126eba252699b280e8f93c0ab2f-Paper-Conference.pdf)
>
> Code: <https://github.com/OpenProteinAI/PoET>

## PoET: two-tier causal attention over homologous sequences for mutation prediction

### Abstract

Most protein language models are trained from MSAs, which leads to poor transferability. The authors propose PoET, an autoregressive model over entire protein families—a retrieval-augmented language model that can infer from short context lengths and generalizes well to small families. By modeling order within sequences and order invariance across sequences, it scales to context lengths beyond those seen in training.

### Introduction

Generative models trained on large-scale protein corpora can sample realistic sequences and improve variant design by predicting the relative fitness of protein variants.

Family-based models typically learn evolutionary signal from MSAs or homologous sequences, but this fails for proteins with few family members and does not transfer to other proteins. MSA-based approaches assume alignments are accurate and cannot model insertions and deletions.

The authors propose PoET, which learns to generate related protein sequences across tens of millions of natural protein sequence clusters, summarizing evolution across protein families while avoiding issues tied to conditioning on MSAs. The approach uses transformer layers with order dependence within sequences and order independence across sequences.

Main features:

- A retrieval-augmented protein language model that can condition on a protein family of interest and apply to new proteins without retraining
- An autoregressive generative model that does not require MSAs, avoiding insertion and alignment issues
- Strong generalization to small protein families even with relatively short context
- Scoring of arbitrary sequences

### PoET

PoET is an autoregressive model of the protein-family distribution, $P=(X=x)$ where $x=s_1,s_2,...,s_n$ are $n$ sequences from the same family. The example below has three sequences of lengths 4, 6, and 5.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/img1.png" alt="avatar" style="zoom:100%;" /></div>

PoET factorizes the probability of each token as follows:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/frm1.png" alt="avatar" style="zoom:60%;" /></div>

#### Model Architecture

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Two attention modules: a within-sequence module and a between-sequence module.

##### Input Embedding

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/frm2.png" alt="avatar" style="zoom:60%;" /></div>

AA denotes the 20 standard amino acids; $d$ is the embedding dimension.

##### Tiered Transformer Decoder Layers

$N$ TieredTransformerDecoderLayer blocks are stacked.

A new positional encoding scheme is used: for example, the relative position between $f_{1,1}$ and $f_{2,1}$ is 0, as in Fig. 1b. This has two benefits:

- Positions that align across homologous proteins should share more similar distributions
- The maximum relative position is capped at one sequence length rather than spanning the full concatenated sequences-of-sequences, improving generalization to longer contexts

##### Decoded Probabilities

The final output is projected through a linear head to obtain classification logits.

#### Training Data

Training uses 29M homologous-sequence sets; clusters with fewer than 10 homologs are removed. To avoid overfitting large clusters, sampling is inversely proportional to cluster size.

### Protein Variant Fitness Prediction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/fig2.png" alt="avatar" style="zoom:100%;" /></div>

**Benchmarking using deep mutational scans**

Evaluation on ProteinGym covers 87 substitution assays and 7 indel assays.

**Fitness Prediction with PoET**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/frm3.png" alt="avatar" style="zoom:60%;" /></div>

Set $S$ is retrieved from UniRef100.

Based on validation performance, the best pipeline is chosen along three axes:

- Retrieving homologous sequences
- Sampling and filtering homologs to obtain a reasonable context length
- Ensembling conditional log-likelihoods from different downsampled homolog sets

Ensembling is defined as:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/frm4.png" alt="avatar" style="zoom:60%;" /></div>

Subsets $S_j$ vary over sequence-similarity thresholds {1.0, 0.95, 0.90, 0.70, 0.50}, context lengths {6144, 12288, 24576}, and $N_{\mathrm{ensemble}}=15$.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/fig3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PoET/fig4.png" alt="avatar" style="zoom:100%;" /></div>

Standard transformer architectures do not generalize beyond their training context length.

<HR align=left color=#987cb9 SIZE=1>
