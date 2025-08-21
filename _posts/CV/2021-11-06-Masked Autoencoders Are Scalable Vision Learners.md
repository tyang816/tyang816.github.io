---
layout: post
title: CVPR-2021 Masked Autoencoders Are Scalable Vision Learners
categories: [CV]
tags: [vision-language, Transformer]
proceedings: CVPR
date: 2021-11-06
---

> 论文地址：[Masked Autoencoders Are Scalable Vision Learners](http://arxiv.org/abs/2111.06377)

## 利用ViT来做跟BERT一样的自监督学习，生成式任务

1. 需要遮住更多的块，使得剩下的块与块之间冗余度没那么高，使任务变得复杂，迫使模型去学习一些更健壮的特征
2. 编码时只处理没遮住的，加速了训练，使用Transformer架构的解码器，直接还原像素的原始信息，使得流程更简单
3. 加上ViT工作之后的各种技术使训练更加鲁棒

<HR align=left color=#987cb9 SIZE=1>
