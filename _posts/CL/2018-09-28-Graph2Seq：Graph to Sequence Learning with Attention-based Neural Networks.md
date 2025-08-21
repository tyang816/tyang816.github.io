---
layout: post
title: ICLR-2019 Graph2Seq：Graph to Sequence Learning with Attention-based Neural Networks
categories: [CL]
tags: [NLP, GNN]
proceedings: ICLR
date: 2018-09-28
---


> 论文地址：[Graph2Seq：Graph to Sequence Learning with Attention-based Neural Networks](https://openreview.net/forum?id=SkeXehR9t7)

## Graph2Seq：采用了双向的结点embedding聚合策略

在自然语言处理任务中，将序列与图建立关系的应用可以分为两大类：一种是序列生成图，另一种是图生成序列，本文旨在针对后一种问题。传统的方法是：首先将图通过某种方式变换为一个序列，然后再基于Seq2Seq框架来生成序列。这种方法存在的问题非常明显：**在将图变换为序列的过程中会丢失大量的结构信息。**

因此，本文提出直接由图得到序列的端到端模型，Graph2Seq

<img src="https://pic1.zhimg.com/v2-2f6adeb035a92b39c51214aac5feb2d0_b.jpg" alt="avatar" style="zoom: 80%;" />

1. 图的信息比seq更多，可以强化表达能力，减少传递中的信息损失
2. 结点embedding：由前向邻居和后向邻居concat起来输入全连接层、激活函数并不断重复该过程
3. 聚合结构：平均、池化、LSTM
4. 图embedding：

   4.1 基于池化：将结点embedding全连接后，采用max/min/average，区别不大

   4.2 基于结点：增加super node，其他结点都指向它，再用上面的计算结点embedding算法让他获取全图信息
5. 注意力机制decoder：计算加权的输入与语义空间中结点相似度

<HR align=left color=#987cb9 SIZE=1>
