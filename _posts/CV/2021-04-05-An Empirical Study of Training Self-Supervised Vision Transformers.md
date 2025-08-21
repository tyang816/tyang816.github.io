---
layout: post
title: ICCV-2021 An Empirical Study of Training Self-Supervised Vision Transformers
categories: [CV]
tags: [vision-language]
proceedings: ICCV
date: 2021-04-05
---

> 论文地址：[An Empirical Study of Training Self-Supervised Vision Transformers](http://arxiv.org/abs/2104.02057)
>
> 代码：<https://github.com/facebookresearch/moco-v3>

## MoCo v3：冻住patch projection在训练时更加平滑

1. 自监督训练的ViT不稳定，在大batch的情况下应该会更好，但是训练中发现更差，于是观察每一层梯度回传的情况。发现当训练产生较大loss的时候梯度会有波峰，波峰发生在第一层，即patch projection
2. 在不想修改transformer本身的情况下，只能修改开头或结尾。于是意识到第一步，即tokenization阶段的重要性，

<HR align=left color=#987cb9 SIZE=1>

