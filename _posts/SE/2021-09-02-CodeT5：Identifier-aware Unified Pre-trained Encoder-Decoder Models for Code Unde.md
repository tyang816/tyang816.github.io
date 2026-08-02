---
layout: post
title: EMNLP-2021 CodeT5：Identifier-aware Unified Pre-trained Encoder-Decoder Models for Code Understanding and Generation
categories: [SE]
tags: [code-understanding, transformer]
proceedings: EMNLP
date: 2021-09-02
lang: en
alt_url: /zh/se/CodeT5：Identifier-aware-Unified-Pre-trained-Encoder-Decoder-Models-for-Code-Unde/
permalink: /se/CodeT5：Identifier-aware-Unified-Pre-trained-Encoder-Decoder-Models-for-Code-Unde/
---

> Paper: [CodeT5：Identifier-aware Unified Pre-trained Encoder-Decoder Models for Code Understanding and Generation](https://aclanthology.org/2021.emnlp-main.685)
>
> Code: <https://github.com/salesforce/CodeT5>

## CodeT5: full Transformer, identifiers, and bimodal learning

### Abstract

Most existing pre-training methods use encoder-only or decoder-only architectures. This work proposes CodeT5, a unified encoder–decoder Transformer that supports both code understanding and generation, together with an identifier-aware pre-training objective.

### Introduction

Pre-trained models have succeeded widely on language tasks, yet most are either encoder-only (e.g., BERT) or decoder-only (e.g., GPT), which is suboptimal when both understanding and generation are required. For instance, CodeBERT needs an extra decoder for code summarization, and that decoder cannot leverage the pre-training stage.

Conventional NLP-style pipelines also treat source code as a token sequence much like natural language, largely overlooking the rich structured semantics of code.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeT5/fig1.png" alt="avatar" style="zoom:60%;" /></div>

CodeT5 uses denoising seq2seq pre-training, exploits developer-assigned identifiers, learns stronger natural-language–programming-language (NL–PL) alignment from code and comments, and is pre-trained on CodeSearchNet.

### CodeT5

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeT5/fig2.png" alt="avatar" style="zoom:60%;" /></div>

#### Pre-training Tasks

##### Identifier-aware Denoising Pre-training

The source sequence is first corrupted with noise functions; the decoder then reconstructs the original text—this is masked span prediction (MSP).

To incorporate more code-specific structure (identifier node types in the AST), two auxiliary tasks complement denoising pre-training: Identifier Tagging (IT) and Masked Identifier Prediction (MIP).

- **Identifier Tagging (IT)**: indicates whether a token is an identifier.
- **Masked Identifier Prediction (MIP)**: unlike masking a contiguous span, MIP masks all identifiers in a code fragment.

##### Bimodal Dual Generation

NL→PL and PL→NL generation are treated as two tasks; for each NL–PL pair, two training instances with opposite directions are constructed.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeT5/tab2-tab3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeT5/tab4-tab5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeT5/fig3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeT5/fig4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeT5/tab6.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CodeT5/tab7.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
