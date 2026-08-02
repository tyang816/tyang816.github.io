---
layout: post
title: ICSME-2021 Ensemble Models for Neural Source Code Summarization of Subroutines
categories: [SE]
tags: [code-summarization]
proceedings: ICSME
date: 2021-07-23
lang: en
alt_url: /zh/se/Ensemble-Models-for-Neural-Source-Code-Summarization-of-Subroutines/
permalink: /se/Ensemble-Models-for-Neural-Source-Code-Summarization-of-Subroutines/
---

> Paper: [Ensemble Models for Neural Source Code Summarization of Subroutines](http://arxiv.org/abs/2107.11423)

## EnsMdl: Better results by ensembling diverse models

### Abstract

1. Models may share similar architectures yet contribute differently to prediction quality.
2. The authors study the orthogonal properties of various code summarization methods through model ensembling.

### Introduction

1. Different information sources, once modeled with encoders, can provide orthogonal gains for prediction.

### Background & Related Work

1. Code summarization feature extraction

   1.1 Text-based: treat code as a sequence and feed it directly to the model

   1.2 Flat structure: flatten the AST and use it as input

   1.3 Context-based: API usage, project context, and similar signals

   1.4 GNN-based: construct a graph from the AST
2. Ensemble models

   Ensembling has achieved strong results in machine translation, stock market forecasting, and other domains.

   Prior work shows that simple ensembles of non-AST and AST-based models already perform well, indicating **room for more sophisticated ensemble methods**.

### Simple Ensembles

1. Ensemble procedure: stacking and bagging

   <img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/EnsMdl/EnsMdl-img1.png" alt="avatar" style="zoom:67%;" />
2. Baseline models: Seq2Seq, Transformer, Seq2Seq-AST-Flat, Seq2Seq-AST-GNN, Seq2Seq-AST-FC, Seq2Seq-AST-Flat-FC

### Results

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/EnsMdl/EnsMdl-img2.png" alt="avatar" style="zoom:67%;" />

<HR align=left color=#987cb9 SIZE=1>
