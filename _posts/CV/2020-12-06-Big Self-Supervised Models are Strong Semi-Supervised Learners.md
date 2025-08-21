---
layout: post
title: NeurIPS-2020 Big Self-Supervised Models are Strong Semi-Supervised Learners
categories: [CV]
tags: [semi-supervised learning]
proceedings: NeurIPS
date: 2020-12-06
---

> 论文地址：[Big Self-Supervised Models are Strong Semi-Supervised Learners](https://dl.acm.org/doi/abs/10.5555/3495724.3497589)
>
> 代码：<https://github.com/google-research/simclr>

## SimCLR v2+半监督学习

1. 在对SimCLR的改进上采用更大模型，加深了projection head，发现两层其实就够用了，引用了动量编码器
2. 还有半监督学习的部分，通过自监督的对比学习学一个好的模型出来，通过一小部分有标签的数据做一下有监督的微调，微调结束了就相当于有一个teacher模型，用teacher模型生成伪标签，这样可以在更多无标签的数据上做自学习，受启发于google 19年的noisy student

   2.1 noisy student是在imgaeNet上训练了一个teacher模型，然后生成伪标签，然后生成student模型

<HR align=left color=#987cb9 SIZE=1>

