---
layout: post
title: ICSE-2022 Cross-Domain Deep Code Search with Few-Shot Meta Learning
categories: [SE]
tags: [code-search, meta-learning]
proceedings: ICSE
date: 2022-07-05
lang: en
alt_url: /zh/notes/se/Cross-Domain-Deep-Code-Search-with-Few-Shot-Meta-Learning/
permalink: /notes/se/Cross-Domain-Deep-Code-Search-with-Few-Shot-Meta-Learning/
redirect_from:
  - "/se/Cross-Domain-Deep-Code-Search-with-Few-Shot-Meta-Learning/"
  - "/SE/Cross-Domain-Deep-Code-Search-with-Few-Shot-Meta-Learning/"
---

> Paper: [Cross-Domain Deep Code Search with Few-Shot Meta Learning](https://dl.acm.org/doi/10.1145/3510003.3510125)
>
> Code: <https://github.com/fewshotcdcs/CDCS>

## CDCS: meta-learning with random task splits for code search and extensive experiments

### Abstract

Pre-trained models such as CodeBERT have advanced code search considerably in recent years, but fine-tuning them to align semantic distributions typically requires large corpora, which limits practicality in domain-specific settings. The authors propose CDCS: pre-train on common corpora such as Python or Java, transfer to other languages such as SQL, and use a MAML-based few-shot meta-learning algorithm to obtain a strong parameter initialization.

### Introduction

Data for domain-specific languages is scarce, so practitioners often train a large multilingual model first and then fine-tune on task-specific datasets. The challenge is how to transfer prior knowledge: languages differ in features and representations, which can yield conflicting shared representations—especially for domain-specific code search, where target-language examples are sparse in the training data.

CDCS combines CodeBERT with a meta-learning procedure to find an initialization that adapts well to new tasks with small training sets.

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDCS/fig3.png" alt="avatar" style="zoom:60%;" /></div>

#### Pre-training

Similar to CodeBERT, MLM is used for pre-training; RTD is omitted because it did not help.

Each input is a <NL, PL> pair: [CLS], w..., [SEP], c..., [EOS], with natural language first and program language second.

#### Meta Learning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDCS/alg1.png" alt="avatar" style="zoom:60%;" /></div>

Training data are split into $k$ batches $\{D_1,...,D_k\}$; each $D_i$ is treated as a local task $T_i$, further divided into support and validation sets for inner updates, followed by an outer (global) update every $M$ steps.

#### Fine-Tuning

For code-search fine-tuning, retrieval is cast as binary classification: 1 for relevant and 0 for irrelevant. [CLS] serves as the pooled sequence representation; a fully connected head predicts whether a given <NL, PL> pair is relevant.

#### Domain-Specific Code Search

Given a query Q, code segments in the database form <NL, PL> pairs with the query; the trained model scores and ranks them.

### Experiment

RQ1: How effective is CDCS for cross-domain code search?

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDCS/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDCS/tab4.png" alt="avatar" style="zoom:50%;" /></div>

RQ2: Performance under different training set sizes

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDCS/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDCS/fig5-6.png" alt="avatar" style="zoom:60%;" /></div>

RQ3: Results with other pre-trained models

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDCS/tab5.png" alt="avatar" style="zoom:60%;" /></div>

RQ4: Effect of hyperparameters

Notably, in Fig. 7a accuracy drops as batch size increases; the authors do not explain this behavior.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CDCS/fig7.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
