---
layout: post
title: ICSE-2018 Deep code search
categories: [SE]
tags: [code-search]
proceedings: ICSE
date: 2018-05-27
---

> 论文地址：[Deep code search](https://dl.acm.org/doi/10.1145/3180155.3180167)

## CODEnn：代码段和自然语言嵌入表示学习

### Abstract

为了实现函数功能，开发者往往会从网上查找相似片段进行重写，现有的方法是把代码视作文本文档，使用信息检索方法查找最相关代码，基本都是基于代码和查询的自然语言之间的文本相似度的，缺乏对查询语句和源代码的深度理解，因此作者提出了CODEnn模型，将代码段和自然语言联合嵌入到向量表示，实现的深度搜索工具名为DeepCS

### Introduction

其他方法依赖于信息检索技术，但查询语言的高层次意图与代码低层次实现细节往往不匹配

所以作者提出：

- CODEnn模型，将代码段和自然语言联合嵌入到向量表示
- DeepCS作为实现包含了1820万个java代码段
- 使用了50个Stack Overflow真实查询评估

### A DEEP NEURAL NETWORK FOR CODE SEARCH

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/fig4.png" alt="avatar" style="zoom:60%;" /></div>

#### Architecture

- Code Embedding Network：将原代码嵌入为向量，分为方法名，API序列和原代码中包含的词元
- Description Embedding Network：将自然语言注释嵌入为向量
- Similarity Module：余弦相似度

#### Model Training

- training instance：三元组<C,D+,D->，代码，自然语言注释，随机选择的自然语言注释负样本
- Loss：

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/frm12.png" alt="avatar" style="zoom:60%;" /></div>

### DEEPCS: DEEP LEARNING BASED CODE SEARCH

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/fig5.png" alt="avatar" style="zoom:60%;" /></div>

### Evaluation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/fig8.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/tab2.png" alt="avatar" style="zoom:60%;" /></div>

### Discusstion

优点：

- 能够理解查询语义
- 收到不相关的噪音关键词影响更小
- 不仅根据管检测匹配，也根据语义关联度匹配

局限：

有时候部分相关结果排名高于精准匹配结果，也是因为考虑了语义的问题

<HR align=left color=#987cb9 SIZE=1>
