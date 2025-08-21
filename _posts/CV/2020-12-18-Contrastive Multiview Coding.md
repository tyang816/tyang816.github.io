---
layout: post
title: ECCV-2020 CMC：Contrastive Multiview Coding
categories: [CV]
tags: [contrastive-learning]
proceedings: ECCV
date: 2020-12-18
---

> 论文地址：[Contrastive Multiview Coding](https://www.ecva.net/papers/eccv_2020/papers_ECCV/papers/123560749.pdf)

## CMC：增大视角间的互信息，代理任务是多视角（多模态）

1. 摘要写得很精彩：无论是看到了狗，还是听到了狗叫，都能判断出狗，引出要学习视角的不变性
2. 正样本：虽然输入来自不同传感器（模态），对应的其实仍然是一个图片，特征空间应该接近；

   负样本：从其他图片来的视角；
3. 多视角下输入的不同可能需要多个编码器，可能几个视角需要几个编码器，计算代价变高，transformer可能可以同时处理多模态，不需要做特有的改进

Comment: Code: http://github.com/HobbitLong/CMC/

<HR align=left color=#987cb9 SIZE=1>

