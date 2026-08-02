---
layout: post
title: AAAI-2022 Hierarchical Heterogeneous Graph Attention Network for Syntax-Aware Summarization
categories: [SE]
tags: [code-summarization, GNN]
proceedings: AAAI
date: 2022-06-28
lang: en
alt_url: /zh/se/Hierarchical-Heterogeneous-Graph-Attention-Network-for-Syntax-Aware-Summarizatio/
permalink: /se/Hierarchical-Heterogeneous-Graph-Attention-Network-for-Syntax-Aware-Summarizatio/
---

> Paper: [Hierarchical Heterogeneous Graph Attention Network for Syntax-Aware Summarization](https://www.aaai.org/AAAI22Papers/AAAI-6812.SongZ.pdf)

## SynapSum: Syntax Graph Attention Network

### Abstract

The authors propose a hierarchical heterogeneous graph attention network built on constituency parse trees for syntax-aware summarization, motivated by psychological evidence that people construct summaries hierarchically by selecting specific constituency patterns. Experiments on six benchmark datasets across diverse domains show that the approach is effective for both abstractive and extractive summarization.

### Introduction

Summaries produced by existing graph-based methods often diverge semantically from the source text, because the graphs in these models are largely statistical and tend to neglect higher-level semantic information.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/fig1.png" alt="avatar" style="zoom:60%;" /></div>

Prior work indicates that syntactic structure helps generate compressed yet informative summaries: its hierarchical organization supports pruning less important material and focusing on more salient content, in line with how humans summarize by progressively extracting the most important information to integrate meaning. Syntactic graphs are also typically easier to obtain than semantic graphs, which mitigates the computational cost of earlier methods that construct complex semantic graphs.

Reasons for using constituency parse trees:

- Syntactic dependencies among tokens explicitly encode relational paths.
- Sub-phrases can be extracted straightforwardly from the tree.

Main contributions:

- A heterogeneous graph attention network for syntax-aware summarization on constituency trees.
- State-of-the-art results on six datasets.
- Extension to code summarization by replacing the parse tree with an abstract syntax tree (AST).

### Methodology

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/fig2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/fig3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/fig4.png" alt="avatar" style="zoom:50%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab5-tab6.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SynapSum/tab7-tab8.png" alt="avatar" style="zoom:50%;" /></div>


<HR align=left color=#987cb9 SIZE=1>

