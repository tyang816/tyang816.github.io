---
layout: post
title: ACL-2020 Contrastive Code Representation Learning
categories: [SE]
tags: [code-understanding, contrastive-learning]
proceedings: ACL
date: 2020-07-25
lang: en
alt_url: /zh/notes/se/Contrastive-Code-Representation-Learning/
permalink: /notes/se/Contrastive-Code-Representation-Learning/
---

> Paper: [Contrastive Code Representation Learning](http://arxiv.org/abs/2007.04973)
>
> Code: <https://github.com/parasj/contracode>

## ContraCode: MoCo-based contrastive learning for code

### Abstract

The authors observe that RoBERTa is overly sensitive to edits of source code even when those edits preserve semantics. They propose ContraCode, a pretraining method that learns to recognize semantically similar variants.

### Introduction

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img1.png" alt="avatar" style="zoom:60%;" /></div>

Under semantics-preserving adversarial modifications, RoBERTa performs worse than random classification.

The authors apply source-to-source, compiler-based transformation techniques—for example, deleting “dead” code by removing operations that do not change the program’s output.

### Model

Code transformation techniques fall into three categories:

- Code minimization: alter syntactic structure and apply corrective constructive transforms, such as precomputing constant expressions
- Identifier renaming: randomly substitute method and variable names
- Normalization transforms: improve generalization by reducing trivial positive pairs with high textual overlap

A transformation discard algorithm enforces diversity, mainly to ensure that transformed code is actually modified. After 20 random sequential transformations, the authors find that 89% of methods yield more than one distinct alternative.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img2.png" alt="avatar" style="zoom:60%;" /></div>

Contrastive pretraining:

- Extends MoCo by forming positive pairs from the same program and negative pairs from different programs
- Uses a queue to store negative samples, as in MoCo
- A large negative set of more than 100k examples

ContraCode is agnostic to the encoder architecture; the authors evaluate a two-layer bidirectional LSTM and a six-layer Transformer.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img3.png" alt="avatar" style="zoom:60%;" /></div>

### Evaluation

Experiments cover three settings: zero-shot clone detection, fine-tuned type inference, and extreme code summarization.

#### zero-shot Code Clone Detection

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img4.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img5.png" alt="avatar" style="zoom:60%;" /></div>

#### Fine-tuning for Type Inference

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img6.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img7.png" alt="avatar" style="zoom:60%;" /></div>

#### Extreme Code Summarization

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img8.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ContraCode/ContraCode-img9.png" alt="avatar" style="zoom:60%;" /></div>

#### Understanding augmentation importance

For sequence-to-sequence summarization, the following augmentation techniques are used:

- Line subsampling (LS): randomly sample a subset of lines from a method (P=0.9); this does not preserve semantics and acts as a regularizer
- Subword regularization (SW): tokenize text into varying forms—whole words or subtokens
- Variable renaming (VR), identifier mangling (IM): rename variables and identifiers
- Dead-code insertion (DCI): insert no-op or log statements

For type inference, LS and SW are used.

Additional code augmentation techniques:

- Dead-code elimination (DCE): remove useless code
- Type upconversion (T): e.g., replace `&` with `and` or `true` with `1`
- Constant folding (CF): precompute expressions, e.g., replace `(2+3) * 4` with `20`

<HR align=left color=#987cb9 SIZE=1>

