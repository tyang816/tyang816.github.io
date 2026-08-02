---
layout: post
title: AAAI-2024 T2I-Adapter：Learning Adapters to Dig out More Controllable Ability for Text-to-Image Diffusion Models
categories: [CV]
tags: [vision-language, diffusion]
proceedings: AAAI
date: 2024-02-20
lang: en
alt_url: /zh/cv/T2I-Adapter：Learning-Adapters-to-Dig-out-More-Controllable-Ability-for-Text-to-I/
permalink: /cv/T2I-Adapter：Learning-Adapters-to-Dig-out-More-Controllable-Ability-for-Text-to-I/
---

> Paper: [T2I-Adapter：Learning Adapters to Dig out More Controllable Ability for Text-to-Image Diffusion Models](https://dl.acm.org/doi/10.1609/aaai.v38i5.28226)
>
> Code: <https://github.com/TencentARC/T2I-Adapter>

## T2I-Adapter: Lightweight control signals aligned with diffusion models

### Abstract

The paper advocates learning simple, lightweight T2I-adapters that align the internal knowledge of a text-to-image (T2I) model with external control signals while keeping the original large T2I model frozen. Under this design, different adapters are trained for different conditions to enrich controllable semantics.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/T2I-Adapter/fig1.png" alt="avatar" style="zoom:100;" /></div>

Is it possible to somehow “dig out” capabilities that T2I models have already learned implicitly—especially high-level structure and semantics—and then use them explicitly to control generation more accurately?

The authors argue that a very small model suffices for this purpose: it does not need to learn those capabilities from scratch, but rather learns the mapping from control information to internal knowledge inside the T2I model. In other words, the central issue is one of alignment—internal knowledge and external control signals should be aligned. They therefore propose T2I-Adapter, a compact model that can learn this alignment with a relatively small amount of data.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/T2I-Adapter/fig2.png" alt="avatar" style="zoom:80%;" /></div>

Advantages:

- Plug-and-play: does not change the existing text-to-image network or its generative capacity
- Simple and compact: low training cost—77M parameters, ~300M storage
- Flexible: different adapters can be trained for conditions such as sketches, semantic segmentation, and keypoints
- Composable: multiple adapters can be combined for multi-condition control
- Generalizable: applicable to other customized models

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/T2I-Adapter/fig4.png" alt="avatar" style="zoom:80%;" /></div>

#### Preliminary: Stable Diffusion

In the first stage, Stable Diffusion (SD) trains an autoencoder that maps natural images $X_0$ into a latent space and reconstructs them. In the second stage, SD trains a modified UNet denoiser to denoise directly in latent space.

At inference time, the latent $Z_T$ is sampled from a random Gaussian. Given $Z_T$, at each step $t$ the model predicts noise and subtracts it; at $Z_0$ one obtains a clean latent representation, which the decoder turns into an image.

For conditioning, SD uses a pretrained CLIP text encoder to produce $y$, which is injected into the denoising process via cross-attention layers.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/T2I-Adapter/frm1.png" alt="avatar" style="zoom:60%;" /></div>

#### Overview of T2I-Adapter

Text alone often provides weak guidance for image synthesis—not because the generator is incapable, but because text cannot supply precise control signals that fully exploit the strong generative priors learned from large-scale training data.

#### Adapter Architecture

The adapter comprises four feature-extraction blocks and three downsampling blocks to adjust feature resolution. Each block uses a convolutional layer and two residual blocks (RB) to extract structural features.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/T2I-Adapter/frm2.png" alt="avatar" style="zoom:60%;" /></div>

The output of each block is added to the intermediate encoder features of the U-Net denoiser.

Multi-condition control is also supported.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/T2I-Adapter/frm3.png" alt="avatar" style="zoom:60%;" /></div>

#### Model Optimization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/T2I-Adapter/frm4-fig5.png" alt="avatar" style="zoom:80%;" /></div>

### Experiment

#### Implementation Details

Batch size 8, 10 epochs, Adam optimizer, learning rate $1\times10^{-5}$, trained for 2 days on four V100-32G GPUs; three structural conditions: sketch maps, semantic segmentation maps, and keypoint maps.

### Applications

See the figures in the original paper for qualitative results under various conditional controls.

<HR align=left color=#987cb9 SIZE=1>

