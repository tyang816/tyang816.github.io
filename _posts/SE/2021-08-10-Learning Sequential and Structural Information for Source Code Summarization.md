---
layout: post
title: ACL-2021 Learning Sequential and Structural Information for Source Code Summarization
categories: [SE]
tags: [Transformer, GNN]
proceedings: ACL
date: 2021-08-10
lang: en
alt_url: /zh/notes/se/Learning-Sequential-and-Structural-Information-for-Source-Code-Summarization/
permalink: /notes/se/Learning-Sequential-and-Structural-Information-for-Source-Code-Summarization/
redirect_from:
  - "/se/Learning-Sequential-and-Structural-Information-for-Source-Code-Summarization/"
  - "/SE/Learning-Sequential-and-Structural-Information-for-Source-Code-Summarization/"
---

> Paper: [Learning Sequential and Structural Information for Source Code Summarization](https://aclanthology.org/2021.findings-acl.251)

## mAST + GCN for structure, Transformer for sequence

### Abstract

Structural information is encoded with mAST and a GCN; the resulting sequence of AST nodes is then encoded by a Transformer.

### Introduction

To represent structural information more effectively, the authors modify the AST by adding sibling edges among nodes at the same level to capture adjacent blocks.

### Model

#### Representing Code as mAST

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img1.png" alt="avatar" style="zoom:50%;" /></div>

For Java code, adjacent edges are added between same-level neighbors.

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img2.png" alt="avatar" style="zoom:50%;" />


For Python, the authors find function names especially important and therefore introduce a dedicated function-name node with additional edges.

#### Proposed Model

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img3.png" alt="avatar" style="zoom:50%;" />


The authors argue that mAST captures information from adjacent blocks, GCN brings representations of structurally neighboring nodes closer in semantic space, and the Transformer models long-range dependencies within the same block.

### Experiment

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img4.png" alt="avatar" style="zoom:50%;" />

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img5.png" alt="avatar" style="zoom:50%;" />


Ablation results and datasets are shown above.

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img6.png" alt="avatar" style="zoom:50%;" />


The authors also study where to place the GCN relative to the Transformer encoder (before, after, or both). Performance differs little across placements; placing GCN before the encoder appears slightly preferable.

<div align=center><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/mAST_GCN_Trans/mAST_GCN_Trans-img7.png" alt="avatar" style="zoom:50%;" />


Experiments on the number of GCN layers are also reported.

<HR align=left color=#987cb9 SIZE=1>

