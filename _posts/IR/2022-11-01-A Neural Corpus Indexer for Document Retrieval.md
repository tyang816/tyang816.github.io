---
layout: post
title: NeurIPS-2022 A Neural Corpus Indexer for Document Retrieval
categories: [IR]
tags: [document-retrieval]
proceedings: NeurIPS
date: 2022-11-01
lang: en
alt_url: /zh/notes/ir/A-Neural-Corpus-Indexer-for-Document-Retrieval/
permalink: /notes/ir/A-Neural-Corpus-Indexer-for-Document-Retrieval/
---

> Paper: [A Neural Corpus Indexer for Document Retrieval](https://proceedings.neurips.cc/paper_files/paper/2022/file/a46156bd3579c3b268108ea6aca71d13-Paper-Conference.pdf)
>
> Code: <https://github.com/solidsea98/Neural-Corpus-Indexer-NCI>


## NCI: End-to-end document–index model, hierarchical clustering, and PAWA decoder

### Abstract

Most document retrieval systems are index-based, which makes it difficult to optimize directly for the final retrieval objective. This work proposes an end-to-end neural approach that unifies training and retrieval to improve recall. The method, Neural Corpus Indexer (NCI), generates relevant document identifiers directly from a query. It also introduces a prefix-aware weight-adaptive (PAWA) decoder architecture that yields large performance gains.

### Introduction

Document retrieval and ranking are the two main stages of a search engine. Ranking is often implemented with a neural network that takes query–document pairs and predicts relevance scores. That step is expensive when the corpus is large, so only hundreds or at most about a thousand candidates are typically reranked—making retrieval critical for surfacing relevant material first.

Existing retrieval methods fall into two families:

- **Term-based**: build an inverted index over the corpus (mapping terms to postings) and return pages or entries containing a query term; semantic meaning is not captured.
- **Semantic-based**: embed queries and documents (commonly with a dual-tower architecture) and run approximate nearest neighbor (ANN) search. A single dense embedding can still be limiting—for example, when exact lexical match matters and fuzzy approximation is undesirable.

An end-to-end design can optimize for the retrieval objective, combine term-based and semantic signals, adapt to shifting workloads, and model richer interactions.

From a systems perspective, if ranking is already neural, making retrieval neural as well simplifies the pipeline by reducing separate sub-modules. In practice, however, deployment has been largely infeasible because of efficiency constraints.

Main contributions:

- Demonstrate that a fully differentiable, end-to-end text retrieval model can deliver substantial gains.
- Propose NCI, which generates docids directly conditioned on a query.
- Design a new decoder for this setting.

### Neural corpus indexer

NCI is an end-to-end network: given a query, it outputs the most relevant document identifier (docid). Query-only training would not encode document content, so the model must be exposed to documents. One approach is to turn each document into multiple synthetic queries, forming many query–id pairs for training.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/fig1.png" alt="avatar" style="zoom:100%;" /></div>

The pipeline covers: how documents are mapped to docids; how queries are generated from documents; how generated and ground-truth queries are fed to an encoder–decoder; decoder modifications; and the training loss.

#### Representing document with semantic identifiers

Hierarchical k-means assigns semantic identifiers (Figure 1a). Document embeddings are clustered into groups 1, 2, 3, etc.; when a cluster exceeds a size threshold, it is split further (e.g., 11, 12; 21, 22, 23), inheriting a prefix from the parent. Documents in a leaf such as 11 are renumbered to final ids like 111, 112, framing retrieval as a hierarchical multi-class problem. These ids carry partial semantic structure, and later tokens are predicted conditioned on earlier ones.

#### Query generation

**DocT5Query**: A large transformer maps a document to a query string. At each step a token is sampled from the predicted distribution; training uses random sampling rather than beam search to improve diversity and stochastic coverage.

**Document As Query**: As in DSI, the first 64 tokens of the document serve as one query; additionally, ten random spans of 64 consecutive tokens from the full text are used as queries.

#### Prefix-aware weight-adaptive decoder

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/fig2.png" alt="avatar" style="zoom:70%;" /></div>

A standard decoder underuses positional structure in docids, motivating a specialized decoder.

For an encoded id such as $3_15_25_3$ (subscripts denote positions), the model does not treat the sequence as bare symbols 3, 5, 5, 3; instead it uses pairs $(1, 3)$, $(2, 5)$, $(3, 5)$ so position is explicit in the input.

At softmax time, weights are not shared globally: $W$ depends on position, and because prediction should also depend on context, the decoder adapts weights accordingly.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/frm4.png" alt="avatar" style="zoom:60%;" /></div>

The output uses hidden states $h_i$ with adaptive weights: $softmax(h_i W_{ada}^i)$.

#### Training and inference

**Consistency-based regularization**

Dropout and other sources of randomness imply that two forward passes on the same query should produce similar representations $z_{i,1}$ and $z_{i,2}$.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/frm5.png" alt="avatar" style="zoom:60%;" /></div>

**Training loss**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/frm6.png" alt="avatar" style="zoom:60%;" /></div>

**Inference via beam search**

Because each decoding step has a finite label space, beam search is constrained to valid docid prefixes at every step.

### Experiment

#### Datasets & evaluation metrics

**Datasets**: Natural Questions (NQ) and TriviaQA; both retrieve Wikipedia pages that contain answers.

**Metrics**: Recall@N, mean reciprocal rank (MRR), and R-precision.

#### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/tab1-tab2.png" alt="avatar" style="zoom:100%;" /></div>

Overall performance is strong.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/tab3.png" alt="avatar" style="zoom:100%;" /></div>

Ablations highlight query generation: T5-generated queries work best; the proposed decoder also helps. Hierarchical classification is compared to a flat classifier over ~320k labels, where the flat baseline remains competitive. Further factors include the consistency regularization weight and legal-prefix constraints during beam search.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/fig3-fig4.png" alt="avatar" style="zoom:100%;" /></div>

Training speed and prediction stability across three model sizes.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NCI/tab5.png" alt="avatar" style="zoom:70%;" /></div>

Efficiency: latency around 100 ms is acceptable, but throughput on a single V100 is only fifty-something queries per second.

### Limitation & Future Works

- Web-scale deployment would require very large model capacity.
- Inference speed is still far from production readiness.
- Updating the index when new documents arrive is difficult; identifiers and the model may need retraining, which is ill-suited to continuously growing corpora.


<HR align=left color=#987cb9 SIZE=1>

