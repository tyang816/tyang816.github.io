---
layout: post
title: ICML-2020 Contrastive Multi-View Representation Learning on Graphs
categories: [ML]
tags: [contrastive-learning, GNN]
proceedings: ICML
date: 2020-06-13
---

> 论文地址：[Contrastive Multi-View Representation Learning on Graphs](https://proceedings.mlr.press/v119/hassani20a.html)

## 不同图结构视图对比学习应用于图分类任务

### Abstract

对比图的结构视图来学习节点和图级别的表示，与视觉表示不同，将视图的数量增加到两个以上或对比多尺度编码并不能提高性能，但是对比第一阶邻居和图扩散的编码能达到最好的性能

作者在8/8个结点和图分类任务中达到了SOTA，与有监督的相比4/8有提高

### Introduction

一些设计好的图神经网络可以处理大小可变且排列不变的图，并且通过不断地迭代传递、变形、聚合信息学习到低维表征，每次迭代扩大了感受野one-hop，k次迭代就获得了k-hops的相关结点对某个结点的影响

GNN往往需要依赖于特定任务的标签来学习到深层次（丰富）的表征，但是标注图很困难，因为它往往是特定领域的，不像是其他的一些常见形式如视频、图像、文本等，它需要领域知识，也更贵。所以为了解决这一问题，一些自监督的方法比如基于重构或者基于对比学习的方法与GNN结合，可以不依赖标注数据

最近的研究通过最大化结点和图表示之间的互信息来对比学习，在结点和图分类任务上取得了SOTA，但它们依赖**特定的编码器**来学习

近期在多视角视觉表征中的进展是**数据增强**，得到一个图的多种视图来对比学习取得了SOTA，在图像分类中超过了有监督学习，但这种方法**能否应用于图还不是很清楚**

因此本文提出了通过在图**不同结构视图**编码的表示之间最大化互信息来训练图编码器，作者表示这种方法**不需要特定架构**，且大大优于以前的模型

作者系统研究了这种框架的主要组成部分，发现不同于视觉对比学习的是：

1. 增加视图数量到2个以上没提升，最好是通过一阶邻居和图扩散进行对比
2. 跨视图对比编码结点和图 比图-图、多尺度编码效果更好
3. 简单的读出层比复杂绩够比如DiffPool效果更好
4. 除了提前停止，其他正则化和归一化都对性能有负面效果

用了上述的性能作者实现了SOTA

### Related Work

#### Unsupervised Representation Learning on Graphs

**Random walk**：把结点铺平成序列，随机游走

**Graph kernels**：把图分解成子图，用核函数衡量相似度

**Graph autoencoders(GAE)**：训练编码器把图变成潜矢量表示，预测第一阶结点

#### Graph Diffusion Networks

图扩散网络(GDN)协调了空间信息传递和广义图扩散，其中扩散作为一个去噪过滤器，允许信息通过高阶的邻居。有early-fusion和late-fusion两种

#### Learning by Mutul Information Maximization

InfoMax使得编码器去最大化互信息学习表示，但编码器和互信息评价器对性能影响也很大

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Contrastive Multi-View Representation Learning on Graphs/img1.png" alt="avatar" style="zoom:60%;" /></div>

主要组件：

- 数据增强机制：将采样的图转化为一相关视图，只对结构进行增强而不是初始的结点特征，接下来是一个采样器，从两个视图对相同的节点进行子采样，也就是类似于在CV的裁剪
- 两个专有的图编码器：每个视图一个，后面接了一个**共享的MLP**，即投影头，以学习两个视图的**节点表示**
- 图池化层：读出函数，后面接了共享的MLP，即投影头，以学习两种视图的图表示
- 判别器：将一个视图的节点表示与另一个视图的图表示进行对比，并对它们之间的一致性进行评分

#### Augmentations

两种增强方式：

- 特征空间增强：对初始节点特征进行操作，例如，遮蔽或添加高斯噪声
- 结构增强或破坏图结构：添加或删除连接、子采样，或使用**最短距离或扩散矩阵生成全局视图**

作者发现第一种方法很多基准没有初始化的图特征，此外遮蔽或添加噪声可能降低性能，所以选择生成一个全局视图，再**子采样**

实验表明，在大多数情况下，最好的结果是通过**将邻接矩阵转化为扩散矩阵**，并将这两个矩阵视为同一图的结构的两个一致视图。因为**邻接矩阵和扩散矩阵分别提供了图结构的局部和全局视图**，从这两种视图中学习到的表示之间最**大限度的一致性**鼓励模型**同时编码丰富的局部和全局信息**。

扩散过程

$$
S=\sum_{k=0}^{\infty}\Theta T^k\in \mathbb{R}^{n\times n}
$$

其中 $T\in \mathbb{R}^{n\times n}$ 是生成的转移矩阵，$\Theta$ 是权重系数，决定了全局和局部信息的权重

给定一个邻接矩阵 $A$ 和对角 度矩阵 $D$，泛化图扩散的两种实例：Personalized PageRank (PPR) 和 heat kernel，通过定义 $T=AD^{-1},\theta_k=\alpha (1-\alpha)^k,\theta_k=e^{-t}t^k/k!$，$\alpha$ 表示随机游走的概率，$t$ 是扩散时间。heat and PPR 扩散的封闭解分别下所示：

$$
S^{heat}=\exp (tAD^{-1})
$$

$$
S^{PPR}=\alpha (I_n-(1-\alpha)D^{-1/2}AD^{-1/2})^{-1}
$$

子采样：从一个视图中随机抽样节点及其边，并从另一个视图中选择确切的的节点和边。这个过程允许我们的方法应用于具有图数据不适合GPU内存的归纳任务，也可以通过将子样本视为独立的图来考虑transductive任务。

#### Encoders

使用GCN学习到每个视角对应的结点表示，丢入MLP，得到两个结点表示集合 $H^\alpha,H^\beta \in \mathbb{R}^{n\times d_h}$。图节点的表示由每个结点表示总和，然后将其送入单层前馈网络，使节点表示与图表示的维数大小一致，从而得到两个图级别的表示。每个表示对应一个视角，最后将表示送到共享的映射头

推断时，通过加和操作聚合每个视图的表示（节点级和图级）作为节点和图的表示应用在下游任务上

#### Training

为了以端到端的方式训练编码器，学习下游任务不可知的丰富的节点和图水平表示,利用深度InfoMax方法，通过最大化互信息，在两种视角之间对比的一个视图中节点表示和其它视图中的图表示,反之亦然。经验证明，这种方法在节点和图分类基准上的性能始终优于对比图-图或多尺度编码

（定义目标看原文吧）

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Contrastive Multi-View Representation Learning on Graphs/table1.png" alt="avatar" style="zoom:60%;" /></div>

基准如上

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Contrastive Multi-View Representation Learning on Graphs/table2.png" alt="avatar" style="zoom:60%;" /></div>

结点分类

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Contrastive Multi-View Representation Learning on Graphs/table3.png" alt="avatar" style="zoom:60%;" /></div>

聚类任务

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Contrastive Multi-View Representation Learning on Graphs/table4.png" alt="avatar" style="zoom:60%;" /></div>

图分类

**五种对比模式：**

- local-global：对比一个视角的节点编码与另一个视角的图编码；
- global-global：对比不同视角的图编码；
- multi-scale：对比来自一个视图的图编码与来自另一个视图的中间编码；使用 DiffPool 层计算中间编码；
- hybrid：使用 local-global 和 global-global 模式；
- ensemble modes：对所有视图，从相同视图对比节点和图编码

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Contrastive Multi-View Representation Learning on Graphs/table5.png" alt="avatar" style="zoom:60%;" /></div>

表5中报告的结果表明，**对比节点和图编码在不同的基准标记中始终表现得更好。**该结果还揭示了图和视觉表征学习之间的重要差异

1）在视觉表征学习中，对比全局视图能达到最佳效果，而对于图数据来说，对比节点和图编码在节点和图分类任务中都能达到更好的表现

2）对比多尺度编码有助于视觉表征学习，但对图表征学习有负面作用

<HR align=left color=#987cb9 SIZE=1>
