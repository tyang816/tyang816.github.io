---
layout: post
title: ICLR-2021 GraphCodeBERT：Pre-training Code Representations with Data Flow
categories: [SE]
tags: [code-understanding, transformer, GNN]
proceedings: ICLR
date: 2021-09-13
lang: en
alt_url: /zh/notes/se/GraphCodeBERT：Pre-training-Code-Representations-with-Data-Flow/
permalink: /notes/se/GraphCodeBERT：Pre-training-Code-Representations-with-Data-Flow/
---

> Paper: [GraphCodeBERT: Pre-training Code Representations with Data Flow](http://arxiv.org/abs/2009.08366)
>
> Code: <https://github.com/microsoft/CodeBERT>
>
> Further reading: <https://zhuanlan.zhihu.com/p/459803760>

## GraphCodeBERT: Pre-training with Data Flow

### Abstract

The authors propose GraphCodeBERT, a pre-trained model that exploits intrinsic semantic structure in code without relying on abstract syntax trees (ASTs). During pre-training they use **data flow** (where values come from)—a semantic structure that is simpler than ASTs and avoids unnecessary deep hierarchy—so that the model can learn more effectively.

Two pre-training tasks are introduced: data-flow edge prediction and variable alignment between source code and the data-flow graph. The approach achieves state-of-the-art results on four downstream tasks.

### Introduction

Meaning is hard to infer from identifiers alone. For example, in `v=max_value-min_value`, the name `v` is ambiguous unless one follows how variables flow through the program.

GraphCodeBERT therefore represents code via data flow, avoiding the unnecessary complexity of ASTs, and introduces two pre-training tasks:

- **Data-flow edge prediction:** learn structured code representations by predicting edges in the data-flow graph.
- **Variable alignment between source code and data flow:** learn which token in the source code each node in the data-flow graph corresponds to.

The pre-trained GraphCodeBERT model is evaluated on four downstream tasks:

- Code search
- Code clone detection
- Code translation
- Code refinement

### Data Flow

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCodeBERT/img1.png" alt="avatar" style="zoom:60%;" /></div>

An AST is built first. Variable sequences are extracted from the AST; each element in a variable sequence becomes a node in the data-flow graph. The graph is then constructed from the variable sequences and dependency relations among variables taken from the AST. For an assignment `x=expr`, `x` depends on every variable appearing in the expression on the right-hand side, and dependencies propagate similarly. The data-flow graph is directed along the direction of value flow: an edge from `a` to `b` means `b` depends on `a`.

### Model

#### Model Architecture

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCodeBERT/img2.png" alt="avatar" style="zoom:60%;" /></div>

The model uses BERT as its backbone. Inputs comprise source code `C`, documentation/comments `W`, and a data-flow graph `G` with variables `V` and edges `E`. The final input sequence is X={[CLS], W, [SEP], C, [SEP], V}.

Input vectors are formed by summing token embeddings and position embeddings.

GraphCodeBERT stacks 12 Transformer encoder layers as its core, with 12-headed multi-head attention, feed-forward layers, layer normalization, and related components. Unlike a standard Transformer, the authors add a **graph-guided masked attention** layer. Before the softmax that computes attention weights, a mask matrix $M$ is applied to filter invalid positions (by adding $-\infty$ before softmax). Let $H^n$ denote the output of Transformer layer $n$:

$$
H^n=transformer(H^{n-1})
$$

Each Transformer layer computes:

$$
G^n=LN(MultiAttn(H^{n-1})+H^{n-1})
$$

$$
H^n=LN(FFN(G^n)+G^n)
$$

Each attention head uses:

$$
Q_i=H^{n-1}W^Q_i,K_i=H^{n-1}W^K_i,V_i=H^{n-1}W^V_i
$$

$$
head_i=softmax(\frac{Q_iK_i^T}{\sqrt{d_k}}+M)V_i
$$

$$
\hat{G}^m=[head_1,...,head_u]W_n^O
$$

#### Graph-guided Masked Attention

This mechanism filters irrelevant pairs: a query–key pair is allowed only if they are connected by an edge in the graph, or if the query is `[CLS]` or `[SEP]`; otherwise $-\infty$ is added so the softmax weight becomes zero.

#### Pre-Training Tasks

##### Masked Language Modeling

As in BERT, 15% of tokens are sampled at random from code and paired comments; of those, 80% are replaced with `[MASK]`, 10% with a random token, and 10% are left unchanged.

##### Edge Prediction

This task teaches the model where values come from (the blue part in the architecture figure). During pre-training, 20% of nodes are sampled at random. A mask matrix sets masked edges to $-\infty$ (when two sampled nodes are connected by an edge), and the model predicts the masked edges.

##### Node Alignment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCodeBERT/img3.png" alt="avatar" style="zoom:60%;" /></div>

This task learns the correspondence between the data-flow graph and source code (the orange part in the architecture figure). Unlike edge prediction, which models links between two nodes in the variable sequence $V$, node alignment links the source sequence $C$ and $V$—i.e., the mapping between node $v_i$ and token $c_j$.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCodeBERT/table1.png" alt="avatar" style="zoom:60%;" /></div>

In **code search**, given a natural-language query, the system must retrieve the most semantically relevant code from a candidate pool. Experiments use CodeSearchNet, with the first paragraph of each code document as the query and mean reciprocal rank (MRR) as the metric. GraphCodeBERT performs strongly on every language subset.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCodeBERT/table2.png" alt="avatar" style="zoom:60%;" /></div>

In **code clone detection**, two code snippets are compared and a similarity score is produced. Results on BigCloneBench show high accuracy and recall for GraphCodeBERT.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCodeBERT/table3.png" alt="avatar" style="zoom:60%;" /></div>

In **code translation**, code in one programming language is converted to another—often to migrate legacy software. Datasets include open-source projects such as Lucene and POI with both Java and C# implementations; the model takes Java (or C#) as input and outputs the corresponding C# (or Java). GraphCodeBERT improves translation accuracy and BLEU over prior models.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCodeBERT/table4.png" alt="avatar" style="zoom:60%;" /></div>

**Code refinement** (code optimization) aims to fix bugs automatically. On a Java benchmark, the model maps buggy code to repaired code. GraphCodeBERT achieves higher fix accuracy and BLEU than previous methods.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCodeBERT/table5.png" alt="avatar" style="zoom:60%;" /></div>

Ablation studies show that both edge prediction and node alignment improve performance; incorporating data flow yields the largest gain.

<HR align=left color=#987cb9 SIZE=1>
