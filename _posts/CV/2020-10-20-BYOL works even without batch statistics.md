---
layout: post
title: arXiv-2020 BYOL works even without batch statistics
categories: [CV]
tags: [vision-language, transformer, contrastive-learning]
proceedings: arXiv
date: 2020-10-20
---

> 论文地址：[BYOL works even without batch statistics](http://arxiv.org/abs/2010.10241)

## BYOL v2：回应 Batch Norm不只是BYOL的创新性

1. 通过大量消融实验找到特例与解释。当simCLR不用在projector和编码器中用batch norm的时候simCLR也失败了，说明当不用归一化的时候，不光BYOL，simCLR也不行，用了负样本也训练不出来，这就证明了batch norm不是提供了一个隐式的负样本。
2. 最后达成的结论是batch norm主要是帮助模型稳定的训练从而使模型不会坍塌。以及说明如果一开始模型初始化就比较好，那么离开了batch norm也没有问题

<HR align=left color=#987cb9 SIZE=1>
