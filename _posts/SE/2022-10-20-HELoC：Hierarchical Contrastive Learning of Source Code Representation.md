---
layout: post
title: ICPC-2022 HELoC：Hierarchical Contrastive Learning of Source Code Representation
categories: [SE]
tags: [contrastive-learning, GNN]
proceedings: ICPC
date: 2022-10-20
---

> 论文地址：[HELoC：Hierarchical Contrastive Learning of Source Code Representation](https://dl.acm.org/doi/10.1145/3524610.3527896)
>
> 论文实现：<https://github.com/Code-Rep/HELoC>

## HELoC：层级比对学习+GCN编码

### Abstract

作者提出一种多层次对比学习模型来学习代码表示，允许网络去预测AST结点层次和学习结点间的层级关系，同时设计了一种新的GNN，残差自注意力图神经网络（RSGNN），使得HELoC能够抓取全局结构信息的同时关注AST的局部嵌入信息。可以使用在很多相关的下游任务上，比如代码分类，克隆检测，代码聚类等。

### Introduction

先有的方法很难学习这种多层次的AST结构，特别是结点增加，链接变多，层数变深的情况下

作者提出的HELoC创新如下：

- 对于AST结构的对比学习：采用两个学习目标训练HELoC预测AST节点水平，学习节点之间的三种层次关系，使嵌入空间中AST水平差异较大的节点的表示向量距离更远
- 一个针对AST多层次结构的特定GNN：尽管GNN能够更好的建模AST的局部信息，但是很难有效对很深的树建模长距离依赖，所以用GCN捕捉局部信息，用self-attention捕捉全局信息

### Background and Motivation

#### AST Hierarchy

三种多层次结构：

1. 邻居：同一级结点间的拓扑关系
2. 相邻层次结构：层次差异为1和3的节点之间的拓扑关系
3. 非相邻层次结构：差异大于1的节点之间的拓扑关系

比如下图里面，ABC是邻居，AD是相邻，AE是不相邻

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/fig1.png" alt="avatar" style="zoom:60%;" /></div>

#### The Limitations of the Existing Work

1. 高度依赖标注数据
2. 对AST层次结构的学习不足：只关注邻居或相邻结点，对不相邻的拓扑结构没法学
3. 语义破碎：比如code2vec和code2seq都把AST降解了，这就导致丢失长距离依赖和破坏了全局语义信息
4. 额外的数据工作：像Corder和Contracode虽然语义不破碎，但是对比学习的负代码级样本的方法使得需要大量的程序变换操作，获得这种语义相似的样本并不容易

### Proposed Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/fig2.png" alt="avatar" style="zoom:60%;" /></div>

#### Input Representation

把一条路径的嵌入添加到相应的节点嵌入中得到增强结点表征

#### RSGNN (Residual Self-Attention GNN)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/fig3.png" alt="avatar" style="zoom:60%;" /></div>

每个RSGNN由两块组成，RSM和GCN

###  Hierarchical Contrastive Learning

假设图1中的A是锚点，假设三元组样本格式为{anc,pos,neg}，可以得到三元组样本{A,B,D}和{A,C,E}，那正样本对是<A,B>，<A,C>，负样本对是<A,D>，<A,E>。但其实<A,E>的距离应该比<A,D>的距离更大，由于最初的对比学习目标不足以学习到AST的层次结构，所以提出了两个目标函数，节点层次预测（**NEP**）：预测结点所在的AST级别；结点关系优化（**NRO**）：学习结点间的三元拓扑关系

**AST pseudo-label construction**：使用DFS算法，根节点标为0，L层结点标记为L

**Hierarchy representation learning**：对比学习预训练就用了NEP和NRO两个目标函数，前者采用交叉熵损失函数，后者使用三元损失函数，使用联合损失函数来平衡两种损失得到最终的损失函数

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/frm6-8.png" alt="avatar" style="zoom:60%;" /></div>

**具体的损失函数和公式看原文**

### Applications of The Proposed Model

- 微调，在有监督任务上微调
- 生成代码向量，作为一种特征提取器直接用作模型输入和特定的下游任务中

### Experiments

数据集

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab2.png" alt="avatar" style="zoom:50%;" /></div>

代码分类

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab3.png" alt="avatar" style="zoom:60%;" /></div>

代码克隆检测和代码聚类

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab5.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab6.png" alt="avatar" style="zoom:50%;" /></div>

消融实验

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab7.png" alt="avatar" style="zoom:60%;" /></div>



<HR align=left color=#987cb9 SIZE=1>
