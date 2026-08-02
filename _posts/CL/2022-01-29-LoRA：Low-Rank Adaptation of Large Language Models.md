---
layout: post
title: ICLR-2022 LoRA：Low-Rank Adaptation of Large Language Models
categories: [CL]
tags: [LLM, NLP]
proceedings: ICLR
date: 2022-01-29
lang: en
alt_url: /zh/notes/cl/LoRA：Low-Rank-Adaptation-of-Large-Language-Models/
permalink: /notes/cl/LoRA：Low-Rank-Adaptation-of-Large-Language-Models/
---

> Paper: [LoRA：Low-Rank Adaptation of Large Language Models](https://openreview.net/forum?id=nZeVKeeFYf9)
>
> Code: <https://github.com/microsoft/LoRA>
> 

## LoRA: Low-cost fine-tuning with rank-decomposed matrices

### Abstract

A dominant paradigm in natural language processing is large-scale pretraining on general-domain data followed by adaptation to specific tasks or domains. This paper proposes Low-Rank Adaptation, or LoRA, which freezes pretrained model parameters and injects trainable rank-decomposed matrices. Compared to fine-tuning GPT-3 175B with Adam, LoRA can reduce the number of trainable parameters by 10,000× and GPU memory requirements by 3×. LoRA matches or exceeds the performance of full fine-tuning on RoBERTa, DeBERTa, GPT-2, and GPT-3, despite having far fewer trainable parameters, higher training throughput, and—unlike adapters—no additional inference latency.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/fig1.png" alt="avatar" style="zoom:60%;" /></div>

Full fine-tuning requires updating all model parameters, which is costly and inconvenient.

Existing approaches adapt to new tasks using extra parameters or extension modules, but they often add inference latency by deepening the model, reduce usable sequence length, and more generally embody a trade-off between performance and efficiency.

Prior work shows that over-parameterized models learned during fine-tuning effectively lie in a low intrinsic dimension; we therefore hypothesize that changes to model weights during adaptation have low “intrinsic rank.” LoRA lets us indirectly train some dense layers in a neural network by optimizing rank-decomposed matrices of the changes to dense layers during adaptation while keeping pretrained weights frozen, as in Figure 1. On GPT-3 175B, even when the full rank (i.e., $d$) is as large as 12,288, a very low rank (i.e., $r$ in Figure 1 can be 1 or 2) suffices, which makes LoRA efficient in both storage and computation.

LoRA’s main contributions are:

- A pretrained model can be shared and reused to build many small LoRA modules for different tasks. By replacing matrices $A$ and $B$ in Figure 1, we can freeze the shared model and switch tasks efficiently, greatly reducing storage and task-switching overhead.
- Efficiency: lower hardware requirements.
- A simple linear design allows merging learnable matrices with frozen weights at inference deployment time.
- Orthogonal combination with other existing methods.

**Terminologies and Conventions**

The Transformer input and output dimension is $d_{model}$; $W_q, W_k, \ldots$ are projection matrices for query, key, and so on; $W_0$ and $\Delta W$ denote the pretrained weight matrix and the accumulated gradient update, respectively; $r$ denotes the rank of a LoRA module.

### Problem Statement

For full fine-tuning of models such as GPT, the objective is as follows:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/frm1.png" alt="avatar" style="zoom:60%;" /></div>

With LoRA, trainable parameters are less than 0.01% of the original count.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/frm2.png" alt="avatar" style="zoom:60%;" /></div>

### Aren't Existing Solutions Good Enough?

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/tab1.png" alt="avatar" style="zoom:100%;" /></div>

Taking language modeling as an example, two prominent strategies for effective adaptation are adding adapter layers or optimizing some form of input-layer activations.

- **Adapter Layers Introduce Inference Latency**
- **Directly Optimizing the Prompt is Hard**

### Our Method

#### Low-Rank-Parameterized Update Matrices

Assume that weight updates during adaptation also have a low “intrinsic rank.” For a pretrained weight matrix $W_0 \in \mathbb{R}^{d\times k}$, we constrain the update as $W_0 + \Delta W = W_0 + BA$, where $B \in \mathbb{R}^{d\times r}, A \in \mathbb{R}^{r\times k}$, rank $r \ll \min(d,k)$, and $W_0$ is frozen and does not receive gradient updates.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/frm3.png" alt="avatar" style="zoom:60%;" /></div>

$A$ is initialized with a Gaussian distribution and $B$ with zeros. $\Delta Wx$ is scaled by $\frac{\alpha}{r}$; when optimizing with Adam, tuning $\alpha$ is roughly equivalent to tuning the learning rate.

**A Generalization of Full Fine-tuning**

LoRA does not require the updated weight matrix to be full rank during adaptation.

**No Additional Inference Latency**

When switching downstream tasks, only a new $BA$ matrix needs to be merged.

#### Applying LoRA to Transformer

For simplicity and parameter efficiency, the study restricts adaptation to attention weights on downstream tasks and freezes MLP modules.

**Practical Benefits and Limitations**

The main benefit is reduced computation and memory overhead.

### Empirical Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/tab2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/tab3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/fig2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/tab5.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LoRA/tab6.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
