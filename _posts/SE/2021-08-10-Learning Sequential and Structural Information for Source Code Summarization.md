---
layout: post
title: ACL-2021 Learning Sequential and Structural Information for Source Code Summarization
categories: [SE]
tags: [Transformer, GNN]
proceedings: ACL
date: 2021-08-10
---

> 论文地址：[Learning Sequential and Structural Information for Source Code Summarization](https://aclanthology.org/2021.findings-acl.251)

## mAST+GCN编码结构信息，Transformer编码序列信息

### Abstract

用mAST+GCN编码结构信息，然后将序列的AST节点经过Transformer编码

### Introduction

为了更好地表示结构信息，提出了修改AST，同层次间添加了兄弟边来表示相邻的块

### Model

#### Representing Code as mAST

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img1.png" alt="avatar" style="zoom:50%;" /></div>

对于 Java 代码是添加同层次相邻边

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img2.png" alt="avatar" style="zoom:50%;" />


对于 Python 代码作者发现函数名太重要了，就增加了“函数名”节点，然后加边

#### Proposed Model

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img3.png" alt="avatar" style="zoom:50%;" />


作者指出 mAST 能够捕捉相邻块信息， GCN 能够将结构相邻节点的表示生成得在语义空间中比较相近，transformer 能够捕获长距离相同块中的依赖信息

### Experiment

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img4.png" alt="avatar" style="zoom:50%;" />

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img5.png" alt="avatar" style="zoom:50%;" />


消融实验和数据如上

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img6.png" alt="avatar" style="zoom:50%;" />


作者还做了实验将 GCN放在 Transformer 编码器前后位置的影响，其实放哪，还是前后都放差距不大，放前面感觉还好一点

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img7.png" alt="avatar" style="zoom:50%;" />


以及 GCN 层数的实验

<HR align=left color=#987cb9 SIZE=1>

