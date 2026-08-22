---
layout: post
title: CVPR-2019 基于不变性与分散性实例特征的无监督嵌入学习
categories: [CV]
tags: [unsupervised-learning]
proceedings: CVPR
date: 2019-04-03
lang: zh-CN
alt_url: /notes/cv/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/
permalink: /zh/notes/cv/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/
redirect_from:
  - "/2019/04/03/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/"
  - "/zh/cv/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/"
  - "/zh/CV/Unsupervised-Embedding-Learning-via-Invariant-and-Spreading-Instance-Feature/"
---


> 论文地址：[Unsupervised Embedding Learning via Invariant and Spreading Instance Feature](http://arxiv.org/abs/1904.03436)

## InvaSpread：个体判别代理任务+NCE loss+端到端学习

1. 同一个encoder的minibatch选择正负样本，因为没有TPU，所以是端到端的学习且不需要外部数据结构，提升了速度。但实际上在更多的负样本的情况下训练效果会更好
2. 解释了instance-wise优化任务的数学逻辑，为什么可以学习到spread-out和invariant特征性质
3. 强调通过学习更深层次的特征embedding可以获取更好的泛化效果

<HR align=left color=#987cb9 SIZE=1>
