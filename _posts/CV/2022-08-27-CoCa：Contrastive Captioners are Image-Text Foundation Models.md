---
layout: post
title: NeurIPS-2022 CoCa：Contrastive Captioners are Image-Text Foundation Models
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: NeurIPS
date: 2022-08-27
---


> 论文地址：[CoCa：Contrastive Captioners are Image-Text Foundation Models](https://openreview.net/forum?id=Ee277P3AYC)
>
> 论文实现：<https://github.com/lucidrains/CoCa-pytorch>（复现）

## Coca：text端用decoder同时增加数据

### Abstract

本文提出了contrastive captioner (Coca)，使用了contrastive loss和captioning loss

### Apporach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/fig2.png" alt="avatar" style="zoom:80%;" /></div>

左边是imgae encoder，右边是text decoder拆分了两半，captioning loss就是language modeling loss。右边的text decoder从一开始就做的causal，所以只用forward一次，减少了计算量

并且模型预训练的数据非常大，有几十亿远超过去的scale，所以效果很好

#### Natural Language Supervision

##### Dual-Encoder Contrastive Learning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/frm2.png" alt="avatar" style="zoom:80%;" /></div>

##### Encoder-Decoder Captioning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/frm3.png" alt="avatar" style="zoom:80%;" /></div>

#### Contrastive Captioners Pretraining

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/frm4.png" alt="avatar" style="zoom:80%;" /></div>

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Coca/fig4-tab4.png" alt="avatar" style="zoom:100%;" /></div>

多边形的顶点是任务或数据集，同时单模态的工作也非常好

<HR align=left color=#987cb9 SIZE=1>