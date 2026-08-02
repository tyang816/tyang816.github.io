---
layout: post
title: OpenAI-2018 Improving Language Understanding by Generative Pre-Training
categories: [CL]
tags: [LLM, NLP]
proceedings: OpenAI
date: 2018-11-21
lang: en
alt_url: /zh/cl/Improving-Language-Understanding-by-Generative-Pre-Training/
permalink: /cl/Improving-Language-Understanding-by-Generative-Pre-Training/
---

> Paper: [Improving Language Understanding by Generative Pre-Training](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)
>
> The GPT line comes from OpenAI. Its relatively low citation count is often attributed to the team’s focus on strong AI and larger problems, which led to very large models that few groups could reproduce—not because the approach was weaker than Google’s BERT family.
>
> Transformer and BERT both aimed at technical advances: one targeted end-to-end machine translation, the other brought the CV-style pre-train-and-fine-tune recipe to NLP. Those kinds of improvements are easier to replicate.

## GPT: one of the early NLP pre-training lines

### Abstract

Labeled data are scarce, so purely supervised training is hard; unlabeled text is abundant, so pre-training may work better. In NLP, each task traditionally had its own model architecture. The authors propose changing only the input format while keeping the same model (GPT predates BERT, which makes the design choice more distinctive at the time).

### Introduction

1. At the time, the strongest use of unlabeled text was still word embedding models.
2. Two difficulties when learning from unlabeled text:

   - What objective should we optimize?
   - How do we transfer the learned representations to downstream tasks?
3. The authors propose a semi-supervised approach: pre-train a large language model on unlabeled data with a Transformer backbone. They argue that this architecture provides structured memory, handles longer contexts, and yields better sentence- and document-level semantics; transfer learning then adapts task-specific representations.

### Model

Maximize the likelihood below, where $u$ denotes tokens and $\Phi$ the model parameters:

$$
L_1(U)=\sum_i \log P(u_i|u_{i-k},...,u_i-1;\Phi)
$$

They use the **Transformer decoder**. In the encoder, when extracting features for position $i$, the model can attend to the full sequence; in the decoder, masking restricts position $i$ to the current and preceding tokens because the task is forward prediction—so the encoder cannot be used as-is.

The model defines a token distribution: embeddings plus positional encodings pass through Transformer blocks, then a softmax over the vocabulary:

$$
h_0=UW_e+W_p
$$

$$
h_l=transormerBlock(h_{l-1})\forall i\in [1,n]
$$

$$
P(u)=softmax(h_nW_e^T)
$$

**Comparison with BERT**: BERT is not a standard causal language model; it is masked language modeling (fill-in-the-blank), so it can see both left and right context and can use the encoder. Another major difference is the objective: BERT predicts masked tokens; GPT predicts the future. Open-ended next-token prediction is harder and may partly explain weaker results on some benchmarks—hence the authors’ emphasis on scaling model size, where the ceiling may be higher.

**Fine-tuning**: take the final-layer representation and multiply by a task-specific output layer:

$$
P(y|x^1,...,x^m)=softmax(h_l^mW_y)
$$

Then optimize the standard classification objective:

$$
L_2 (C)=\sum_{(x,y)}\log P(y|x^1,...,x^m)
$$

The authors find that jointly training next-token prediction ($L_1$) and label prediction ($L_2$) during fine-tuning works best:

$$
L_3 (C)=L_2 (C)+\lambda * L_1 (C)
$$

**How diverse NLP tasks are cast as a sequence plus a label**:

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT-img1.png" alt="avatar" style="zoom:60%;" /></div>

Regardless of input or output format, the core Transformer stack stays fixed.

### Experiment

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT-img2.png" alt="avatar" style="zoom:50%;" /></div>

They use a 12-layer Transformer decoder with hidden size 768.

<HR align=left color=#987cb9 SIZE=1>

