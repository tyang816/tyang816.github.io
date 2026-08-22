---
layout: post
title: GTC-2020 Megatron-LM：Training Multi-Billion Parameter Language Models Using Model Parallelism
categories: [OS]
tags: [model-parallelism]
proceedings: GTC
date: 2020-03-13
lang: en
alt_url: /zh/notes/os/Megatron-LM：Training-Multi-Billion-Parameter-Language-Models-Using-Model-Paralle/
permalink: /notes/os/Megatron-LM：Training-Multi-Billion-Parameter-Language-Models-Using-Model-Paralle/
redirect_from:
  - "/os/Megatron-LM：Training-Multi-Billion-Parameter-Language-Models-Using-Model-Paralle/"
  - "/OS/Megatron-LM：Training-Multi-Billion-Parameter-Language-Models-Using-Model-Paralle/"
---

> Paper: [Megatron-LM：Training Multi-Billion Parameter Language Models Using Model Parallelism](http://arxiv.org/abs/1909.08053)
>
> Code: <https://github.com/NVIDIA/Megatron-LM>
>
> The authors’ main critique of prior work is that those approaches require compilers and extra packages and are cumbersome; this method needs only small changes to PyTorch code. That convenience limits applicability mainly to Transformers rather than offering a general solution, whereas earlier methods target broader generality—so the trade-offs cut both ways.

## Megatron LM: Model (Tensor) Parallelism for Transformer Language Models

### Abstract

Transformer models are growing ever larger and are hard to train under memory limits. The authors propose an **intra-layer** **model-parallel** training scheme that needs no new compiler or external packages and is complementary and orthogonal to pipeline-based methods: one only inserts communication ops in native PyTorch.

Compared with a single-GPU peak of about 30%, they reach 76%; training focuses mainly on GPT-2 and BERT.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Megatron LM/img1.png" alt="avatar" style="zoom:60%;" /></div>

The authors report that adding GPUs yields essentially linear scaling—almost too good to be true.

Main contributions:

- A simple, effective model-parallel implementation requiring only minor modifications to existing PyTorch Transformers
- In-depth experimental analysis, reaching 76% scaling efficiency on 512 GPUs
- When scaling BERT-like models, care is needed about where layer normalization is placed
- For GPT-2 and BERT, larger models improve accuracy
- Strong results on WikiText103, LAMBADA, and RACE
- Open-source code: https://github.com/NVIDIA/Megatron-LM

### Model Parallel Transformers

For the MLP, assume a vertical split in half: replicate the input $X$ on two GPUs; each side produces half of the same $Y$, then one all-reduce completes the layer.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Megatron LM/img.1.png" alt="avatar" style="zoom:60%;" /></div>

In multi-head attention, each head is independent and has its own weights; a simple approach is to assign heads to GPUs—e.g., half the heads on one GPU and half on another—with the same pattern as above (partial results per device).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Megatron LM/img.2.png" alt="avatar" style="zoom:60%;" /></div>

Input $X$ is batch_size $\times$ seq_len; the embedding matrix is vocab_size $\times$ $K$. After embedding, activations are $B \times L \times K$. One partition splits the embedding in half, replicates $X$ on both GPUs, performs lookup, then all-reduces.

The output is $B \times L \times K$; after the vocabulary projection it becomes $B \times L \times V$, with each shard on a GPU and each row one sample. $V$ can be very large (often tens of thousands) while $K$ is typically on the order of $10^4$ or less, so each GPU computes its exponentials first, then row-wise sums are combined.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Megatron LM/img.3.png" alt="avatar" style="zoom:60%;" /></div>

This tiling requires an all-reduce after each compute step; more splits mean more overhead, and work cannot overlap asynchronously with communication—it must proceed strictly in order. Per-block traffic is fixed: after each step the tensor size is $B \times L \times K$, and all-reduce doubles the cost, so communication overhead is $O(B \times L \times K \times N)$ where $N$ is the number of partitions.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Megatron LM/img.4.png" alt="avatar" style="zoom:60%;" /></div>

Model parallelism:

- Benefit: each GPU only maintains a shard of the model
- Drawback: the GPU count must divide the number of attention heads and layers; compute and communication cannot run in parallel (no asynchrony)—steps must be sequential

### Experiments

A 1.2B-parameter model serves as the baseline and fits on a single GPU.

More GPUs increase communication cost.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Megatron LM/table1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Megatron LM/img5.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

