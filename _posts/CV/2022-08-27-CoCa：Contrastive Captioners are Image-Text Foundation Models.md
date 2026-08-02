---
layout: post
title: NeurIPS-2022 CoCa：Contrastive Captioners are Image-Text Foundation Models
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: NeurIPS
date: 2022-08-27
lang: en
alt_url: /zh/cv/CoCa：Contrastive-Captioners-are-Image-Text-Foundation-Models/
permalink: /cv/CoCa：Contrastive-Captioners-are-Image-Text-Foundation-Models/
---


> Paper: [CoCa：Contrastive Captioners are Image-Text Foundation Models](https://openreview.net/forum?id=Ee277P3AYC)
>
> Code: <https://github.com/lucidrains/CoCa-pytorch> (reimplementation)

## CoCa: a text-side decoder with large-scale pretraining data

### Abstract

This work introduces the contrastive captioner (CoCa), trained with both contrastive loss and captioning loss.

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/fig2.png" alt="avatar" style="zoom:80%;" /></div>

The left branch is an image encoder; the right branch splits the text decoder into two parts. Captioning loss corresponds to language modeling loss. The text decoder on the right is causal from the outset, so a single forward pass suffices, which lowers compute cost.

Pretraining uses a very large corpus—on the order of billions of image–text pairs, well beyond prior scale—which contributes to strong results.

#### Natural Language Supervision

##### Dual-Encoder Contrastive Learning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/frm2.png" alt="avatar" style="zoom:80%;" /></div>

##### Encoder-Decoder Captioning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/frm3.png" alt="avatar" style="zoom:80%;" /></div>

#### Contrastive Captioners Pretraining

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/frm4.png" alt="avatar" style="zoom:80%;" /></div>

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/fig4-tab4.png" alt="avatar" style="zoom:100%;" /></div>

Each vertex of the polygon corresponds to a task or dataset; unimodal performance is also very strong.

<HR align=left color=#987cb9 SIZE=1>
