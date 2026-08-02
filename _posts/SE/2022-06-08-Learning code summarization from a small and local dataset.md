---
layout: post
title: arXiv-2022 Learning code summarization from a small and local dataset
categories: [SE]
tags: [Transformer, GNN]
proceedings: arXiv
date: 2022-06-08
lang: en
alt_url: /zh/notes/se/Learning-code-summarization-from-a-small-and-local-dataset/
permalink: /notes/se/Learning-code-summarization-from-a-small-and-local-dataset/
---

> Paper: [Learning code summarization from a small and local dataset](http://arxiv.org/abs/2206.00804)
>
> Code: https://zenodo.org/record/6529627#.YrcRDHZByUk

## GCB-hybrid: data-augmentation denoising decoder + temporal split, same-project fine-tuning

### Abstract

Models such as CodeBERT, GraphCodeBERT, and CodeT5 use billions of tokens for supervised pre-training, yet software is highly project-specific: environments differ widely across projects. Training on project-local data and testing within the same project is therefore promising, and evaluating under a temporal setup helps prevent train–test leakage.

This paper compares multiple models and training regimes—including same-project training, cross-project training, a model designed for sample efficiency under limited same-project data, and a maximalist hybrid approach—fine-tuning on many languages first and then training within a single project.

### Introduction

Data availability is constrained in several ways:

- Less popular languages (e.g., Ruby) have fewer high-quality examples.
- Projects in a given language may skew toward particular application domains (e.g., JavaScript on the web), so models trained on pooled data can be uneven.
- A distinctive issue is **project specificity**.

For developers, different projects behave differently; cross-project models often underperform project-local models on defect-related tasks. Early work also shows that application-specific, project-specific, and even file-specific factors matter.

These observations raise a question: can project-specific training data actually improve results?

- On the positive side, vocabulary and coding style are clearly project-specific, so training within one project should help.
- Challenges remain:
  - Train and test splits must be constructed carefully.
  - Project-local training must learn a strong model from relatively few samples.

It is therefore worthwhile to improve **sample efficiency** during fine-tuning of foundation models: if model A matches model B but uses less data, A is the more sample-efficient model.

The authors use the multilingual PolyGlot model (which topped the CodeXGLUE leaderboard for a period) to study whether same-project training yields gains. They ask whether even a well-tuned, broadly trained model can still improve with same-project fine-tuning—and find that it can.

Main contributions:

- Same-project training under a temporal setting: train on past data, evaluate on future data.
- Improved sample efficiency of GraphCodeBERT for code summarization, yielding **GCB-hybrid**.
- Project-specific fine-tuning of PolyGlot that outperforms CodeT5.
- Same-project settings are strongest overall; even the largest project uses less than 2.5% of the compute time of cross-project training.

### Background & Motivation

#### PMQ 1

Do samples from the same project share more identifiers than samples drawn at random across projects?

The authors take five projects with roughly 200 samples each, split into two groups, and compute similarity; same-project pairs score higher.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/tab2.png" alt="avatar" style="zoom:60%;" /></div>

#### PMQ 2

Are high-capacity pre-trained models sample-efficient?

Pre-trained models can be adapted with sample-efficient fine-tuning; such models are among the most competitive on code summarization.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/tab1.png" alt="avatar" style="zoom:60%;" /></div>

### Methodology

#### Dataset Preparation

Same-project datasets are built on CodeXGLUE with an 80:20 temporal split for train, validation, and test.

##### Assigning creation date for functions

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/fig1.png" alt="avatar" style="zoom:60%;" /></div>

They use `git blame -ignore-rev` to obtain the first commit time for each line. Scanning from the first statement of a function to the last, the earliest timestamp is taken as the function’s creation time. In Figure 1, the first line was committed in 2018, but the rest date to 2015, so the function’s initial time is set to 2015.

If every line were rewritten so no initial time could be found, the authors argue that this case does not arise in practice.

This method cannot track purely local edits that never hit the remote repository; the authors accept that limitation and still believe it yields a fair temporal split.

##### Prepared datasets for different instance ranges

When building same-project data, only the CodeXGLUE **test** split is used: the training split already appeared in pre-training and would leak information. The validation split is excluded because pre-trained models were evaluated on it and would look artificially strong.

They focus on Python and Java and bucket projects by training size: 150+, 100–150, and under 100 samples.

### Foundation Models

The proposed **GCB_hybrid** attaches a specialized decoder to GraphCodeBERT for denoising natural-language comments.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/tab4.png" alt="avatar" style="zoom:60%;" /></div>

Each sample is augmented with several noise strategies:

- **Comment permutation**: shuffle tokens in a comment at a given timestep.
- **Comment rotation**: move a randomly chosen token to the front, to model how comments often start.
- **Token deletion**: drop 15% of comment tokens, encouraging generation.
- **Token masking**: mask 15% of comment tokens for the decoder to reconstruct.
- **Token infilling**: sample span lengths from a Poisson distribution with $\lambda=3$ and replace each span with `<mask>`.

To speed training, GraphCodeBERT is initialized from CodeBERT, and CodeBERT from RoBERTa weights.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/fig2.png" alt="avatar" style="zoom:60%;" /></div>

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/tab5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/tab6.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/tab7.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/tab8.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCB-hybrid/tab9.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
