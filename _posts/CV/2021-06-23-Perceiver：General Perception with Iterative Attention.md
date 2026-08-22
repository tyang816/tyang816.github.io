---
layout: post
title: ICML-2021 Perceiver：General Perception with Iterative Attention
categories: [CV]
tags: [vision-language]
proceedings: ICML
date: 2021-06-23
lang: en
alt_url: /zh/notes/cv/Perceiver：General-Perception-with-Iterative-Attention/
permalink: /notes/cv/Perceiver：General-Perception-with-Iterative-Attention/
redirect_from:
  - "/cv/Perceiver：General-Perception-with-Iterative-Attention/"
  - "/CV/Perceiver：General-Perception-with-Iterative-Attention/"
---

> Paper: [Perceiver: General Perception with Iterative Attention](https://proceedings.mlr.press/v139/jaegle21a.html)
>
> Code: <https://github.com/lucidrains/perceiver-pytorch>

## Perceiver: asymmetric-attention multimodal distillation and compression

### Abstract

The model uses an asymmetric attention mechanism to iteratively compress inputs into a compact latent bottleneck, enabling it to scale to very large inputs. This architecture achieves strong performance on classification across modalities—images, point clouds, audio, video, and video+audio—competitive with specialized models.

### Introduction

Inductive biases such as spatial locality in early computer vision have been helpful for performance, but as datasets grow, is it still right to bake such biases into models—or should we let the data speak for itself?

Frameworks built on strong priors are conspicuously modality-specific: a 2D architecture works for a single image, but for stereo pairs how should pixels from multiple sensors be fused—concatenation or summation? For audio, 2D networks no longer apply; 1D convolutions or LSTMs may be required.

The core idea is to introduce a set of latent units that form an attention bottleneck through which all inputs must pass.

### Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Perceiver/fig1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Perceiver/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### The Perceiver architecture

If weights are shared across every block of the Transformer, the model resembles an RNN.

#### Taming quadratic complexity with cross-attention

Let Q have shape (N, D), where N is the number of tokens in the current sequence and D is the hidden size; K and V have shapes (M, D) and (M, C), respectively. The product of Q and K yields a matrix of size (N, M) from (N, D) × (D, M), and multiplying on the right by (M, C) gives an (N, C) matrix.

When N ≪ M, complexity can be approximated as O(M), reducing the quadratic O(M×M) cost to linear.

- **Asymmetric attention mechanism**: N and M differ greatly in size.
- **Distill inputs**: queries perform local retrieval over the byte array, compressing input information into a small matrix.
- **Tight latent bottleneck**: repeated cross-attention exchanges information to produce a new low-dimensional representation—a sufficiently small latent bottleneck that encodes complex inputs.

#### Uncoupling depth with a latent Transformer

Uses a GPT-2-style architecture.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Perceiver/fig3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Perceiver/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Perceiver/tab2.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Perceiver/tab3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Perceiver/tab4.png" alt="avatar" style="zoom:70%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
