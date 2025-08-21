---
layout: post
title: AAAI-2022 Hierarchical Heterogeneous Graph Attention Network for Syntax-Aware Summarization
categories: [SE]
tags: [code-summarization, GNN]
proceedings: AAAI
date: 2022-06-28
---

> 论文地址：[Hierarchical Heterogeneous Graph Attention Network for Syntax-Aware Summarization](https://www.aaai.org/AAAI22Papers/AAAI-6812.SongZ.pdf)

## SynapSum：句法图注意力网络

### Abstract

提出了一种新的基于选区的解析树上的层次异构图注意网络，用于语法感知的摘要，该方法反映了心理学上的发现，即人类将确定特定的选择模式来分层构建总结。实验表明对不同领域的6个基准数据集上的抽象和提取摘要任务都是有效的

### Introduction

现有的基于图的方法的输出摘要往往与输入文本存在语义偏差，因为这些模型中构建的图大多是在统计层面上，经常忽视了高层次语义信息

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/fig1.png" alt="avatar" style="zoom:60%;" /></div>

先前的研究表明，句法结构有利于生成压缩但信息丰富的摘要，因为其层次结构有利于去除不重要的部分，并注意更显著的部分，这也模仿了人类生成摘要的方式：通过逐级提取最重要的信息来融合语义意义。此外，句法图通常比语义图更容易获得，从而缓解了以往基于构造的复杂语义图的方法中的计算问题

选择选区解析树的原因：

- 词元间的句法依赖关系显示反应路径
- 选取树提取子短句很容易

主要贡献：

- 提出了基于选区树的语法感知摘要的异构图注意网络
- 6个数据集SOTA
- 应用到代码摘要任务中，用抽象语法树替换图

### Methodology

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/fig2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/fig3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/fig4.png" alt="avatar" style="zoom:50%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab5-tab6.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab7-tab8.png" alt="avatar" style="zoom:50%;" /></div>


<HR align=left color=#987cb9 SIZE=1>

