---
layout: post
title: ICSE-2018 Deep code search
categories: [SE]
tags: [code-search]
proceedings: ICSE
date: 2018-05-27
lang: en
alt_url: /zh/notes/se/Deep-code-search/
permalink: /notes/se/Deep-code-search/
---

> Paper: [Deep code search](https://dl.acm.org/doi/10.1145/3180155.3180167)

## CODEnn: Learning Joint Embeddings of Code Snippets and Natural Language

### Abstract

To implement desired functionality, developers often search the web for similar snippets and adapt them. Existing methods treat code as text documents and use information retrieval to find the most relevant snippets, relying mainly on textual similarity between source code and natural-language queries. Such approaches lack deep understanding of both queries and source code. The authors propose CODEnn, which jointly embeds code snippets and natural language into vector representations. The deep search tool built on this model is named DeepCS.

### Introduction

Other methods depend on information retrieval, but the high-level intent expressed in a query often misaligns with the low-level implementation details in code.

The authors therefore propose:

- CODEnn, a model that jointly embeds code snippets and natural language into vector representations
- DeepCS as the implementation, indexing 18.2 million Java code snippets
- Evaluation using 50 real queries from Stack Overflow

### A DEEP NEURAL NETWORK FOR CODE SEARCH

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/fig4.png" alt="avatar" style="zoom:60%;" /></div>

#### Architecture

- Code Embedding Network: embeds source code into a vector, using the method name, API sequence, and tokens appearing in the code
- Description Embedding Network: embeds natural-language descriptions into a vector
- Similarity Module: cosine similarity

#### Model Training

- Training instance: triplet ⟨C, D+, D−⟩—code, matching natural-language description, and a randomly sampled negative description
- Loss:

  <div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/frm12.png" alt="avatar" style="zoom:60%;" /></div>

### DEEPCS: DEEP LEARNING BASED CODE SEARCH

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/fig5.png" alt="avatar" style="zoom:60%;" /></div>

### Evaluation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/fig8.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CODEnn/tab2.png" alt="avatar" style="zoom:60%;" /></div>

### Discussion

Strengths:

- Captures query semantics
- Less sensitive to irrelevant noisy keywords
- Retrieves matches by semantic relatedness as well as keyword overlap

Limitations:

Partially relevant results sometimes rank above exact matches, which also stems from emphasizing semantic similarity.

<HR align=left color=#987cb9 SIZE=1>
