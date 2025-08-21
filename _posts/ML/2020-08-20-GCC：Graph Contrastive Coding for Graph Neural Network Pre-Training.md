---
layout: post
title: KDD-2020 GCC：Graph Contrastive Coding for Graph Neural Network Pre-Training
categories: [ML]
tags: [contrastive-learning, GNN]
proceedings: KDD
date: 2020-08-20
---

> 论文地址：[GCC：Graph Contrastive Coding for Graph Neural Network Pre-Training](https://dl.acm.org/doi/10.1145/3394486.3403168)

## GCC：子图个体判别对比学习

### Abstract

图神经网络在很多下游任务表现良好且适用于真实世界问题，但先前的工作主要为某个数据集，设计精致的模型来解决领域问题，对于跳出领域的问题没有转移性，所以作者提出了GCC图对比编码，预训练任务为子图个体判别。在三个图学习任务和10个图数据集上做了实验，效果具有竞争力或者比task-specific的方法更好，这表示预训练微调这种方法还有很大潜力

### Introduction

本文旨在设计一种在GNN上的自监督预训练模型，然后再不同的图任务或不同的图上进行微调，使用到了对比学习技术，采用子图个体判别为代理任务

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/fig1.png" alt="avatar" style="zoom:60%;" /></div>

对于一个顶点从其多跳网络中采样出子图作为实例个体，目的是区别从一个顶点采样出来的子图与其他顶点采样出来的子图

### Graph Contrastive Coding (GCC)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/fig2.png" alt="avatar" style="zoom:60%;" /></div>

#### The GNN Pre-Training Problem

GNN预训练的问题就是学习将结点映射到低维特征向量表示，有以下两个特征：

- 结构相似性：将局部拓扑结构相似的结点映射到相近的空间
- 可迁移性：能兼容训练过程中没见过的结点

#### GCC Pre-Training

从查字典的角度来讲，给一个编码器过的查询q，一个编码过的字典K+1的值串{k_0, ..., k_K}，对比学习查找q在字典中匹配的单个键(用k+表示)，采用InfoNCE

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/frm1.png" alt="avatar" style="zoom:60%;" /></div>

三个问题：

- 怎么定义图里面的子图实例
- 怎么定义相似的实例对
- 什么才是正确的图编码器

##### Q1: Design (subgraph) instances in graphs

单个结点作为实例是不行的，因为训练前是纯粹的结构表示，没有额外的特征或属性输入

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/fig3.png" alt="avatar" style="zoom:60%;" /></div>

图3左两个就是2-ego子图，GCC将每个r-ego网络视为它自己的一个不同的类，让模型将相似的实例与不同的实例区分开来

##### Q2: Define (dis)similar instances

CV领域有旋转，裁剪这类增强作为正样本，对r-ego做增强主要以下三步：

- Random walk with restart：
- 从自我顶点v开始在G上随机游走。游走以与边权重成比例的概率迭代地移动到其邻域。此外，在每一步中，游走以一个正的概率返回到起始顶点
- Subgraph induction：重新再来随机游走，得到的样本就视为增强的版本
- Anonymization：以任意顺序将采样图重新标记

重复上述过程就得到正样本对，如果是从不同的r-ego中得到的增强就是负样本对，通过DGL库可以实现

在带重启的随机游走采样中，重启概率控制着自我网络的半径(即r)，使用0.8作为重启概率

匿名化步骤旨在保持底层的结构模式，并隐藏精确的顶点索引。这种设计避免了学习子图实例鉴别的一个简单的解决方案，即简单地检查两个子图的顶点索引是否匹配。此外，它有助于在不同的图之间传递学习模型，因为这样的模型与特定的顶点集没有关联

##### Q3: Define graph encoders

GCC对编码器不敏感，作者使用GIN，但多数GNN的编码器都需要顶点特征，所以用每个采样子图的图结构来初始化顶点特征，使用了广义位置嵌入

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/tab3.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/tab4.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

