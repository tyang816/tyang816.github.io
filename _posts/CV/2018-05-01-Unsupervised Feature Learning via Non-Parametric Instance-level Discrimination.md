---
layout: post
title: CVPR-2018 Unsupervised Feature Learning via Non-Parametric Instance-level Discrimination
categories: [CV]
tags: [unsupervised-learning, contrastive-learning]
proceedings: CVPR
date: 2018-05-01
---

> 论文地址：[Unsupervised Feature Learning via Non-Parametric Instance-level Discrimination](http://arxiv.org/abs/1805.01978)

## InstDisc：个体判别代理任务+NCE loss对比表征学习+bank memory数据结构

1. 正样本256，负样本从Memory bank随机选取，可以是4096或更大
2. 提出了新的存储数据结构Memory bank，以及动量更新方法也影响了moco

<HR align=left color=#987cb9 SIZE=1>
