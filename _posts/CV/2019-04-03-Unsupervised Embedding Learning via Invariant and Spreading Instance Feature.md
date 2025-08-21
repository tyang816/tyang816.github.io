---
layout: post
title: CVPR-2019 Unsupervised Embedding Learning via Invariant and Spreading Instance Feature
categories: [CV]
tags: [unsupervised-learning]
proceedings: CVPR
date: 2019-04-03
---


> 论文地址：[Unsupervised Embedding Learning via Invariant and Spreading Instance Feature](http://arxiv.org/abs/1904.03436)

## InvaSpread：个体判别代理任务+NCE loss+端到端学习

1. 同一个encoder的minibatch选择正负样本，因为没有TPU，所以是端到端的学习且不需要外部数据结构，提升了速度。但实际上在更多的负样本的情况下训练效果会更好
2. 解释了instance-wise优化任务的数学逻辑，为什么可以学习到spread-out和invariant特征性质
3. 强调通过学习更深层次的特征embedding可以获取更好的泛化效果

<HR align=left color=#987cb9 SIZE=1>
