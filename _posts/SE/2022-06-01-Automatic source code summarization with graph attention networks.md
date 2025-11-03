---
layout: post
title: Journal of Systems and Software-2022 Automatic source code summarization with graph attention networks
categories: [SE]
tags: [code-summarization, GNN]
proceedings: Journal of Systems and Software
date: 2022-06-01
---

> 论文地址：[Automatic source code summarization with graph attention networks](https://linkinghub.elsevier.com/retrieve/pii/S0164121222000279)
>
> 论文实现：<https://github.com/sjj0403/GSCS>

## GSCS：语义和结构两个encoder融合

### Abstract

本文提出了GSCS利用了代码块的语义和结构信息，GAT处理AST，使用了多头注意力；还使用了RNN模型来获取语义特征

### Introduction

源代码有复杂的嵌套结构，不能视作朴素文本；现有模型也不能很好的处理结构信息，比如SBT引入了大量的括号造成不必要的冗余，Tree-LSTM和ConvGNN没有考虑到AST节点的上下文，换句话说每个节点在AST里面都是有局部属性的，但上述两种方法是不考虑的（a+b和b+a是同等对待）

作者认为使用GAT能自动学习并分配权重给邻居，是比Tree-LSTM和ConvGNN更好的选择

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/fig1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/fig2-fig4.png" alt="avatar" style="zoom:100%;" /></div>

### Evaluation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/tab2.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GSCS/tab4-tab5.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
