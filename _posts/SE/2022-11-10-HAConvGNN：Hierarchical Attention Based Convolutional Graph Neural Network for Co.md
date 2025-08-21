---
layout: post
title: EMNLP-2021 HAConvGNN：Hierarchical Attention Based Convolutional Graph Neural Network for Code Documentation Generation in Jupyter Notebooks
categories: [SE]
tags: [code-documentation, GNN]
proceedings: EMNLP
date: 2022-11-10
---

> 论文地址：[HAConvGNN:Hierarchical Attention Based Convolutional Graph Neural Network for Code Documentation Generation in Jupyter Notebooks](https://aclanthology.org/2021.findings-emnlp.381/)

## HAConvGNN：多层次的注意力卷积图神经网络

### 1. 总结

1. 发现github上约25%的note都没有注释，同时这类数据较少，于是创建了[新的 jupyter note 的数据集](https://ibm.biz/Bdfpk6)，特点是一个注释可能对应至多4个代码块（实际上代码与markdown注释比为2.2195）。代码注释有三类①处理（Process and Headline）；②结果（result）；③推断和教育（Reson and Education）
2. 提供了注释其实可以为人类和AI共同完成的想法
3. 新的基于图的高层次注意力架构和人工评估有效性

### 2. 模型架构

#### 2.1 输入

1. tokenized code sequence
2. tokennized documentation sequence
3. 从 code sequence 生成的 AST 图的节点
4. 从 code sequence 生成的 AST 图的边（拓扑）

#### 2.2 Embeddings

三个嵌入层，code embedding，document embedding，Code AST embedding

#### 2.3 Encoder

一个编码器编码原代码序列，附加四个编码器去编码至多4个 code cells 的 AST 图，以及使用一个高层次的 GRU 编码器层来对上述4个 AST 图生成一个更高层次的输出

#### 2.4 HAConvGNN

低层次注意力+高层次注意力

![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HAConvNN/HAConvNN-img1.png)

### 3. 人工评估

1. 评估指标信息性、可读性、正确性
2. 每次选三十对代码和文档，每对给5个参与人员，从4种候选结果中选择，其中一种是 groundtruth。

![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HAConvNN/HAConvNN-img2.png)

<HR align=left color=#987cb9 SIZE=1>
