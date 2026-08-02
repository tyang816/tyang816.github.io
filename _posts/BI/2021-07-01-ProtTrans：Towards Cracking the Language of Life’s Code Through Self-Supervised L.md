---
layout: post
title: IEEE Transactions on Pattern Analysis and Machine Intelligence-2021 ProtTrans：Towards Cracking the Language of Life’s Code Through Self-Supervised Learning
categories: [BI]
tags: [protein, PLM, transformer, self-supervised]
proceedings: IEEE Transactions on Pattern Analysis and Machine Intelligence
date: 2021-07-01
lang: en
alt_url: /zh/notes/bi/ProtTrans：Towards-Cracking-the-Language-of-Life’s-Code-Through-Self-Supervised-L/
permalink: /notes/bi/ProtTrans：Towards-Cracking-the-Language-of-Life’s-Code-Through-Self-Supervised-L/
---

> Paper: [ProtTrans：Towards Cracking the Language of Life’s Code Through Self-Supervised Learning](https://ieeexplore.ieee.org/document/9477085/)
>
> Code: https://github.com/agemagician/ProtTrans

## ProtTrans: Diverse protein models based on transformers

### Abstract

The authors trained two autoregressive models (Transformer XL, XLNet) and four autoencoder models (BERT, Albert, Electra, T5) on UniRef and BFD data, comprising up to 393 billion amino acids. The language models were trained on the Summit supercomputer using 5,616 GPUs and TPU Pods with up to 1,024 cores. Effectiveness was validated on downstream tasks using embeddings as the sole input: per-residue prediction of protein secondary structure (three-state accuracy Q3 = 81%–87%) and per-protein prediction of subcellular localization (ten-state accuracy Q10 = 81%) and membrane versus soluble classification (two-state accuracy Q2 = 91%). For residue-level prediction, using embeddings (ProtT5) surpassed state of the art for the first time without evolutionary information, thereby avoiding costly database searches.

### Introduction

The strongest predictors in computational biology combine machine learning (ML) with evolutionary information (EI).

- First, related protein families are searched and summarized as multiple sequence alignments (MSAs), from which evolutionary information is extracted.
- Second, EI is fed into ML to learn implicit structural or functional constraints via supervised learning.

Using EI also has drawbacks:

- When predicting entire proteomes, compiling EI for all proteins is computationally expensive.
- Not all proteins have EI.
- Gains are largest when EI diversity is high.
- Predictions that rely on EI are family-centric and may fail to distinguish different proteins within the same family.
- AlphaFold2 represents an advanced combination of EI and ML; although it predicts protein 3D structure with unprecedented accuracy, the computational cost of the AlphaFold2 model exceeds that of creating EI by many orders of magnitude.

The work first explores large-scale language models trained on proteins and the limitations of protein sequence databases used for training.

Second, it compares the impact of autoregressive versus autoencoder pre-training on the success of subsequent supervised training, with and without evolutionary information (EI).

### Methods

#### Data for protein Language Models (LMs)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/tab1.png" alt="avatar" style="zoom:80%;" /></div>

The BFD dataset is the largest, but UniRef100 is 1.6× longer than BFD.

#### Embeddings for supervised training

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Embeddings are used for supervised transfer learning.

##### Per-residue prediction/single tokens

In addition to other public test sets—CB513, TS115, and CASP12—the authors note limitations (CASP12: too small; CB513 and TS115: redundant and outdated). They therefore added a new test set comprising only proteins released after NetSurfP-2.0 (after 1 January 2019), including PDB structures at ≤ 2.5 Å resolution with ≥ 20 residues. MMSeqs2 at the highest sensitivity (−7.5) removed proteins with >20% pairwise identity (PIDE) to the training set or to themselves. On top of that, PISCES removed any proteins its procedure deemed to have >20% PIDE. These filters reduced the number of new proteins (chains) from 18k to 364 (denoted set NEW364).

##### Per-protein prediction/embedding pooling

Prediction of protein properties is analogous to sentence classification in NLP, using the DeepLoc dataset.

#### Data for unsupervised evaluation of embeddings

Information captured by embeddings extracted from protein models was assessed by projecting high-dimensional representations to two dimensions (2D) via t-SNE.

#### Step 1: Protein LMs extract embeddings

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/tab2.png" alt="avatar" style="zoom:100%;" /></div>

ProtAlbert uses 64 attention heads.

#### Step 2: Transfer learning of supervised models

##### per-residue prediction

Embeddings are passed into a two-layer CNN: the first layer uses a window size of 7 to compress embeddings to 32 dimensions; the compressed representation feeds two CNNs (window size 7), one predicting three-state secondary structure and one predicting eight-state structure, via multi-task learning.

##### per-protein prediction

Embeddings are pooled first; different pooling strategies are listed in Table 10. Mean pooling was chosen for all experiments. The result is fed into a layer with 32 units that jointly predicts subcellular localization and discrimination between membrane-bound and soluble proteins (multi-task learning).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/tab10.png" alt="avatar" style="zoom:80%;" /></div>

#### Software

NVIDIA APEX was used for mixed precision with PyTorch support; NV-LINK reduced training time by 60% for ProtTXL and 72% for ProtBert.

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/fig4.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/fig5.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/fig6-fig7.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/fig8.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/tab4.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProtTrans/fig9.png" alt="avatar" style="zoom:50%;" /></div>

### Discussion

#### Have protein LMs reached a ceiling?

(1) Corpora with lower noise and redundancy (e.g., UniRef50) outperform noisier but more redundant corpora such as BFD.

(2) From the perspective of limited resources, using those resources for sufficiently long training matters most, because the number of samples seen during pre-training correlates with downstream predictive performance. This ultimately reflects a trade-off between adequate model size and sample throughput.

(3) Bidirectional models outperform unidirectional models. However, given progress in protein LMs during the course of this work, there is not yet evidence that protein LMs have hit a ceiling.

Many questions remain open:

(1) Are auxiliary tasks such as next-sentence or sentence-order prediction, as in BERT or Albert, appropriate for protein sequences? One suggestion is to use structural information or evolutionary relationships.

(2) Can training efficiency of transformer protein LMs be improved via sparse transformers or attention optimized with locality-sensitive hashing (LSH), as in the Reformer model [99] or recent linear transformer work?

(3) Which dataset preprocessing, reduction, and training batch sampling strategies should be used for best results?

(4) How much would task-specific customization of supervised training pipelines help? Secondary structure and localization prediction are treated here mainly as proxies to demonstrate protein LM success rather than as standalone endpoints.

(5) Will the combination of EI and AI yield the best future protein predictors, or will the advantages of single-protein prediction (speed, accuracy) prevail? Single-protein predictors also offer finer precision because they do not impose implicit family-level averages.


<HR align=left color=#987cb9 SIZE=1>
