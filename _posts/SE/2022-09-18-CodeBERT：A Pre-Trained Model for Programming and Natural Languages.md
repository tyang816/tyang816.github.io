---
layout: post
title: EMNLP-2020 CodeBERT：A Pre-Trained Model for Programming and Natural Languages
categories: [SE]
tags: [code-understanding, transformer]
proceedings: EMNLP
date: 2022-09-18
lang: en
alt_url: /zh/notes/se/CodeBERT：A-Pre-Trained-Model-for-Programming-and-Natural-Languages/
permalink: /notes/se/CodeBERT：A-Pre-Trained-Model-for-Programming-and-Natural-Languages/
redirect_from:
  - "/se/CodeBERT：A-Pre-Trained-Model-for-Programming-and-Natural-Languages/"
  - "/SE/CodeBERT：A-Pre-Trained-Model-for-Programming-and-Natural-Languages/"
---

> Paper: [CodeBERT: A Pre-Trained Model for Programming and Natural Languages](http://arxiv.org/abs/2002.08155)
>
> Code: <https://github.com/microsoft/CodeBERT>
>
> Further reading: <https://zhuanlan.zhihu.com/p/476950957>

## CodeBERT: A Pre-Trained Model for Programming Languages

### Abstract

The authors propose CodeBERT, a bimodal pre-trained model for programming languages (PL) and natural language (NL) that learns general-purpose representations for downstream tasks.

It achieves state-of-the-art results on code search and code documentation generation, though the primary focus remains code search.

They also collect an NL–PL probing dataset.

### Introduction

Large-scale pre-trained models such as ELMo, GPT, BERT, XLNet, and RoBERTa have substantially improved nearly all NLP tasks, and have motivated many bimodal approaches—e.g., ViLBERT and VideoBERT—for self-supervised learning from images/video and text.

Two pre-training objectives are used:

- Standard masked language modeling (MLM):
  - The BERT objective: predict tokens after masking.
  - Pre-training uses NL–PL paired data.
- Replaced token detection (RTD):
  - A generator first predicts tokens masked in the sentence; predicted tokens then replace the [MASK] positions, and a discriminator decides whether each token is original or replaced.
  - Unimodal code data train a stronger generator for the RTD task.

Main contributions:

- The first large-scale NL–PL pre-trained model covering multiple programming languages.
- Empirical evidence that CodeBERT is effective on code search and comment generation.
- A dataset for studying what knowledge code-based pre-trained models acquire.

### Model

#### Model Architecture

CodeBERT is a multi-layer bidirectional Transformer with 12 layers and 12 attention heads per layer, closely aligned with RoBERTa (~125M parameters).

#### Input/Output Representations

Natural language and a code snippet are concatenated with special tokens, e.g. $[CLS],w_1,w_2,\cdots,w_n,[SEP],c_1,c_2,\cdots,c_m,[EOS]$

Outputs comprise contextual vectors for each token and a [CLS] representation for classification.

#### Pre-Training Data

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeBERT/img1.png" alt="avatar" style="zoom:60%;" /></div>

A data example is shown above. The authors apply several filters: (1) each project is used by at least one other project; (2) each document is truncated to a single segment; (3) documents with fewer than three tokens are removed; (4) code with fewer than three lines is removed; (5) functions whose names contain the substring “test” are removed.

#### Pre-Training CodeBERT

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeBERT/img2.png" alt="avatar" style="zoom:60%;" /></div>

Two pre-training tasks are used:

- MLM (BERT-style masked language modeling): randomly mask tokens and predict them; this task uses NL–PL pairs.
  - 15% of tokens are selected; of those, 80% are replaced with [MASK], 10% with random tokens, and 10% are left unchanged; the corrupted sequence is fed to BERT to predict the masked positions.
- RTD uses unimodal PL and NL data.
  - From the ICLR 2020 paper [ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators](https://link.zhihu.com/?target=https%3A//openreview.net/pdf%3Fid%3Dr1xMH1BtvB): standard MLM in BERT trains on only 15% of tokens, which is computationally inefficient, and [MASK] does not appear at inference, causing a train–test mismatch.
  - **A generator first predicts masked tokens; those predictions replace [MASK]; a discriminator then labels each token as original or replaced.**

#### Fine-Tuning CodeBERT

Fine-tuning is evaluated on natural-language–code search and code-to-text generation. For search, the [CLS] embedding scores semantic relevance between an NL query and code. For generation, an encoder–decoder setup is used with CodeBERT initializing the encoder.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeBERT/table1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeBERT/table2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeBERT/table4.png" alt="avatar" style="zoom:60%;" /></div>

Beyond the two fine-tuning tasks, the authors probe what types of knowledge CodeBERT learns. Given an NL–PL pair, probing asks the model to pick the correct masked token among distractors via cloze-style items: one token is replaced with [MASK], and distractors are chosen using domain knowledge.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeBERT/img3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeBERT/table3.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
