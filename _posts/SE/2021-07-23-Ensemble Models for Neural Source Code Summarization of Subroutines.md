---
layout: post
title: ICSME-2021 Ensemble Models for Neural Source Code Summarization of Subroutines
categories: [SE]
tags: [code-summarization]
proceedings: ICSME
date: 2021-07-23
---

> 论文地址：[Ensemble Models for Neural Source Code Summarization of Subroutines](http://arxiv.org/abs/2107.11423)

## EnsMdl：通过集成不同模型得到更佳结果

### Abstract

1. 不同的模型虽然在结构上相似，但是对于预测质量可能做出不同的贡献
2. 作者通过集成模型来研究各种代码总结方法的正交性质

### Introduction

1. 不同的信息通过endoer建模后可以对预测提供正交提升

### Background & Realated Work

1. 代码总结提取

   1.1 基于文本：将代码视为序列直接输入

   1.2 扁平结构：将 AST 拍平后输入

   1.3 基于上下文：API、项目上下文等

   1.4 基于GNN：将 AST 构建为图
2. 集成模型

   集成模型在机器翻译、股票市场预测等领域取得了很好结果。

   研究发现非 AST 和 AST 模型的简单集成就能够取得较好结果，说明**在更精致的集成方法上面还有研究潜力**。

### Simple Ensembles

1. 集成过程：Stacking 和 Bagging

   <img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/EnsMdl/EnsMdl-img1.png" alt="avatar" style="zoom:67%;" />
2. 基线模型：Seq2Seq、Transformer、Seq2Seq-AST-Flat、Seq2Seq-AST-GNN、Seq2Seq-AST-FC、Seq2Seq-AST-Flat-FC

### Results

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/EnsMdl/EnsMdl-img2.png" alt="avatar" style="zoom:67%;" />

<HR align=left color=#987cb9 SIZE=1>
