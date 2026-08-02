---
layout: post
title: EMNLP-2021 HAConvGNN：Hierarchical Attention Based Convolutional Graph Neural Network for Code Documentation Generation in Jupyter Notebooks
categories: [SE]
tags: [code-documentation, GNN]
proceedings: EMNLP
date: 2022-11-10
lang: en
alt_url: /zh/notes/se/HAConvGNN：Hierarchical-Attention-Based-Convolutional-Graph-Neural-Network-for-Co/
permalink: /notes/se/HAConvGNN：Hierarchical-Attention-Based-Convolutional-Graph-Neural-Network-for-Co/
---

> Paper: [HAConvGNN:Hierarchical Attention Based Convolutional Graph Neural Network for Code Documentation Generation in Jupyter Notebooks](https://aclanthology.org/2021.findings-emnlp.381/)

## HAConvGNN: Hierarchical Attention-Based Convolutional Graph Neural Network

### 1. Summary

1. The authors observe that roughly 25% of notebooks on GitHub lack comments and that such data remain scarce; they therefore introduce a [new Jupyter notebook dataset](https://ibm.biz/Bdfpk6). A key characteristic is that a single comment may align with up to four code cells (the ratio of code cells to Markdown comments is 2.2195). Comments are categorized into three types: (1) process and headline; (2) result; (3) reasoning and education.
2. They argue that documentation can be produced jointly by humans and AI.
3. They propose a graph-based hierarchical attention architecture and validate it with human evaluation.

### 2. Model architecture

#### 2.1 Input

1. tokenized code sequence
2. tokenized documentation sequence
3. nodes of the AST graph built from the code sequence
4. edges (topology) of the AST graph built from the code sequence

#### 2.2 Embeddings

Three embedding layers: code embedding, document embedding, and Code AST embedding.

#### 2.3 Encoder

One encoder encodes the source code sequence; four additional encoders encode the AST graphs of up to four code cells; a higher-level GRU encoder aggregates the outputs of these four AST encoders into a higher-level representation.

#### 2.4 HAConvGNN

Low-level attention plus high-level attention.

![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HAConvNN/HAConvNN-img1.png)

### 3. Human evaluation

1. Evaluation criteria: informativeness, readability, and correctness.
2. In each round, 30 code–documentation pairs are selected; each pair is shown to five annotators, who choose among four candidate outputs, one of which is the ground truth.

![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HAConvNN/HAConvNN-img2.png)

<HR align=left color=#987cb9 SIZE=1>
