---
layout: post
title: arxiv-2020 Neural Subgraph Matching
categories: [ML]
tags: [GNN]
proceedings: NeurIPS
date: 2020-07-03
---

> 论文地址：[Neural Subgraph Matching](http://arxiv.org/abs/2007.03092)
>
> 论文实现：<https://github.com/snap-stanford/neural-subgraph-learning-GNN>
> 

## NeuroMatch：图分解做子图匹配

### Abstract

NeuroMatch是一种用于有效子图匹配的图神经网络（GNN）架构。给定一个大的目标图和一个小的查询图，NeuroMatch将包含查询图的目标图的邻域识别为子图。NeuroMatch使用GNN在顺序嵌入空间中学习图嵌入，该空间反映了子图关系属性的结构（传递性、反对称性和非平凡交集），促进了以前不可能的规模上的实时近似子图匹配：它可以在500k大小的目标图中匹配100个节点的查询图。实验表明，NeuroMatch比现有的组合方法快100倍，比现有的近似子图匹配方法精确18%

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/fig1.png" alt="avatar" style="zoom:100%;" /></div>

子图同构匹配有很多应用

- 在社会科学中，子图分析在分析社会网络中的网络效应方面发挥了重要作用
- 信息检索系统使用知识图中的子图结构进行语义概括、类比推理和关系预测。
- 在化学中，子图匹配是确定化合物之间相似性的一种稳健而准确的方法。
- 在生物学中，子图匹配在蛋白质-蛋白质相互作用网络的分析中至关重要，其中识别和预测功能基序是理解生物学机制的主要工具，如潜在的疾病、衰老和医学。

将目标GT和查询GQ分解为许多小的重叠图，并使用图神经网络（GNN）嵌入单个图，这样我们就可以快速确定一个图是否是另一个图的子图

两个阶段，一个嵌入阶段和查询阶段。在嵌入阶段，我们将目标图GT分解为多个子网络Gu：对于每个节点u，我们提取u周围的子网络Gu，并使用GNN得到u的嵌入，得到u的邻域结构。在查询阶段，我们基于q的邻域计算每个节点q在查询图Gq中的嵌入。然后我们比较所有节点q和u的嵌入，以确定GQ是否是GT的子图

### NeuroMatch Architecture

#### Problem Setup

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/alg1.png" alt="avatar" style="zoom:100%;" /></div>

##### Problem 1. Matching query to datasets

给定一个目标图GT和一个查询GQ，预测GQ是否与GT的一个子图同构

##### Problem 2. Matching neighborhoods

给定节点u周围的一个邻域Gu，并对锚定在节点q处的查询GQ，对Gq是否为Gu的一个子图进行二值预测，其中节点q对应于u

#### Overview of NeuroMatch

##### Embedding stage

嵌入阶段，把GT分解为一堆子图，用u的邻域的嵌入表示u

##### Query stage

设计了一个子图预测函数，判断GQ的子图Gq是否是GT的子图Gu的子图

##### Practical considerations and design choices

层数k需要考虑到查询图的大小，这个k至少是图的直径

实验采用GIN的一种变体结合跳跃层对查询图和邻域进行编码

#### Subgraph Predition Function f(Z_q,Z_u)

给定目标图节点嵌入zu和中心节点q∈GQ，子图预测函数决定u∈GT是否有一个与GQ中q同构的∈跳邻域。关键是子图预测函数仅基于节点q和u的嵌入zq和zu来做出决策

##### Subgraph prediction function

如果Gq是Gu的子图，那么q的emebdding应该在u的左下方

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/frm1.png" alt="avatar" style="zoom:60%;" /></div>

使用max margin loss，P指正样本对，N指负样本对

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/frm2-frm3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/frm4.png" alt="avatar" style="zoom:60%;" /></div>

#### Training NeuroMatch

##### Training data

正样本：从GT里采样Gu，Gu里采样出Gq，这样的（Gq和Gu）是正样本对

负样本：从GT里采样不同的u和q，这样是负样本；或者把query扰动，使得他不再是原本图的子图

##### Test data

用了三种不同的策略生成test queries，BFS，random walk和degree-weighted sampling strategy

##### Curriculum

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/fig2.png" alt="avatar" style="zoom:100%;" /></div>

先在简单的查询上训练，再增加更复杂的query和batch size

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/tab2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/fig3.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>