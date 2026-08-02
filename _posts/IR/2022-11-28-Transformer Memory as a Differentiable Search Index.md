---
layout: post
title: NeurIPS-2022 Transformer Memory as a Differentiable Search Index
categories: [IR]
tags: [transformer]
proceedings: NeurIPS
date: 2022-11-28
lang: en
alt_url: /zh/ir/Transformer-Memory-as-a-Differentiable-Search-Index/
permalink: /ir/Transformer-Memory-as-a-Differentiable-Search-Index/
---

> Paper: [Transformer Memory as a Differentiable Search Index](https://openreview.net/pdf?id=Vu-B0clPfq)
>

## DSI: Differentiable Search Index

### Abstract

The approach maps query strings directly to relevant docids, which greatly simplifies retrieval. The work also studies how documents and identifiers should be represented during training.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DSI/fig1-tab1.png" alt="avatar" style="zoom:100%;" /></div>

This paper addresses information retrieval with a Seq2Seq formulation, in contrast to prior dual-encoder models.

The most direct way to use Seq2Seq for retrieval is to take a query and use beam search to generate documents.

However, the setup is not a pure sequence-to-sequence mapping from query to documents.

Instead, the problem is split into two tasks: documents ↔ docids, and query → docids. The first task is called **indexing**: it establishes a one-to-one mapping between a document and a docid, where the docid can be viewed as a compressed summary of the document (itself a seq2seq task). The second task is **retrieval**: given a query, the model generates candidate docids (again a seq2seq task). Retrieval is therefore indirect: query → docids → documents.

The indexing task mainly teaches the model the relationship between docids and documents; retrieval is where search actually happens.

During training, indexing and retrieval share model parameters (otherwise the model may not learn what docids mean) and are optimized jointly via multi-task learning.

### Differentiable Search Index

The core idea of a **Differentiable Search Index (DSI)** is to parameterize the traditional multi-stage retrieve-and-rerank pipeline with a single model. DSI supports two operations:

**Indexing**: A DSI model must learn to link document content to the corresponding document identifier (docid). This work uses a seq2seq model with document content as input and the identifier as output.

**Retrieval**: Given a query, a DSI model should return a ranked list of candidate docids via autoregressive generation (also seq2seq).

##### Semantically Structured Identifiers

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DSI/fig2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DSI/alg1.png" alt="avatar" style="zoom:50%;" /></div>

Instead of random integer identifiers, documents use structured integers—**semantically structured identifiers**. Concretely, given a corpus to index, all documents are clustered into 10 groups. Each document receives a digit from 0 to 9. Each cluster is processed recursively in the same way: split into up to 10 sub-clusters labeled 0–9. If a cluster has fewer than 10 documents (say, c documents), labels run from 0 to c-1. This yields a tree whose leaves are individual documents; a document’s final identifier is the concatenation of digits along the path from the root to that leaf.

Document clustering is unsupervised: BERT representations are extracted and k-means is applied.

Hyperparameters fix 10 clusters per split and a threshold c of 100; clustering continues while a group has more than 100 documents.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DSI/tab2-tab3.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
