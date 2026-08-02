---
layout: post
title: arXiv-2019 Unified Language Model Pre-training for Natural Language Understanding and Generation
categories: [CL]
tags: [LLM, NLP, transformer]
proceedings: arXiv
date: 2019-05-08
lang: en
alt_url: /zh/notes/cl/Unified-Language-Model-Pre-training-for-Natural-Language-Understanding-and-Gener/
permalink: /notes/cl/Unified-Language-Model-Pre-training-for-Natural-Language-Understanding-and-Gener/
---

> Paper: [Unified Language Model Pre-training for Natural Language Understanding and Generation](http://arxiv.org/abs/1905.03197)
>
> Code: <https://github.com/microsoft/unilm>

## UNILM: A Unified Language Model with Three Pre-training Objectives

### Abstract

This paper proposes UNILM, a new pre-trained model for both natural language understanding and generation. It is trained with three language modeling formulations: unidirectional language modeling, bidirectional language modeling, and sequence-to-sequence generation. A shared Transformer network and self-attention masks control how context conditions each objective.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/UNILM/tab1.png" alt="avatar" style="zoom:80%;" /></div>

Different training objectives and loss targets correspond to different pre-trained language models.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/UNILM/tab2.png" alt="avatar" style="zoom:80%;" /></div>

UNILM is a multi-layer Transformer network jointly optimized on large corpora under three types of unsupervised language modeling objectives.

Three benefits:

- Because the different language model types share parameters and architecture, UNILM pre-training is a single Transformer language model, avoiding separate training pipelines for multiple LMs.
- Parameter sharing yields more general text representations, since they are jointly optimized under different language modeling objectives and use context in different ways, which reduces overfitting to any one LM task.
- Beyond NLU, UNILM can act as a seq-to-seq language model and be applied to NLG tasks such as abstractive summarization and question generation.

### Unified Language Model Pre-training

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/UNILM/fig1.png" alt="avatar" style="zoom:80%;" /></div>

#### Backbone Network: Multi-Layer Transformer

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/UNILM/frm1-frm3.png" alt="avatar" style="zoom:80%;" /></div>

The output of the preceding Transformer layer is projected into query, key, and value vectors via distinct weight matrices W; the mask matrix M further determines which tokens may attend to one another.

#### Pre-training Objectives

Unidirectional LM, bidirectional LM, and sequence-to-sequence LM; for the bidirectional LM, Next Sentence Prediction is also used.

#### Pre-training Setup

The overall training objective combines the three LM losses. During training, each batch allocates one third of the time to bidirectional LM, one third to seq-to-seq LM, and left-to-right and right-to-left unidirectional LMs each at a sampling rate of one sixth.

The model uses a 24-layer Transformer with hidden size 1024, 16 attention heads, 340M parameters, vocabulary size 28996, maximum input length 512, and a 15% masking probability (same as BERT).

Adam with $\beta_1=0.9,\beta_2=0.999$, learning rate 3e-5, linear warmup for the first 40000 steps, dropout=0.1, weight_decay=0.01, batch_size=330, 770000 steps; 10000 steps take about 7 hours on eight V100 GPUs.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/UNILM/tab3-tab4.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/UNILM/tab5-tab7.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/UNILM/tab8-tab10.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/UNILM/tab11.png" alt="avatar" style="zoom:80%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
