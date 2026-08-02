---
layout: post
title: arXiv-2020 Neural Subgraph Matching
categories: [ML]
tags: [GNN]
proceedings: arXiv
date: 2020-07-03
lang: en
alt_url: /zh/notes/ml/Neural-Subgraph-Matching/
permalink: /notes/ml/Neural-Subgraph-Matching/
---

> Paper: [Neural Subgraph Matching](http://arxiv.org/abs/2007.03092)
>
> Code: <https://github.com/snap-stanford/neural-subgraph-learning-GNN>
> 

## NeuroMatch: Subgraph Matching via Graph Decomposition

### Abstract

NeuroMatch is a graph neural network (GNN) architecture for efficient subgraph matching. Given a large target graph and a small query graph, NeuroMatch identifies neighborhoods of the target graph that contain the query graph as a subgraph. NeuroMatch uses a GNN to learn graph embeddings in an ordered embedding space that reflects structural properties of the subgraph relation (transitivity, antisymmetry, and nontrivial intersection), enabling real-time approximate subgraph matching at scales that were previously infeasible: it can match a 100-node query graph in target graphs of size 500k. Experiments show that NeuroMatch is 100× faster than existing combinatorial methods and 18% more accurate than existing approximate subgraph matching methods.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Subgraph isomorphism matching has many applications:

- In the social sciences, subgraph analysis plays a major role in studying network effects in social networks.
- Information retrieval systems use subgraph structure in knowledge graphs for semantic generalization, analogical reasoning, and relation prediction.
- In chemistry, subgraph matching is a robust and accurate way to measure similarity between compounds.
- In biology, subgraph matching is essential for analyzing protein–protein interaction networks, where identifying and predicting functional motifs is a primary tool for understanding biological mechanisms such as disease, aging, and medicine.

The target graph \(G_T\) and query graph \(G_Q\) are decomposed into many small overlapping graphs, and a graph neural network (GNN) embeds each piece so that we can quickly decide whether one graph is a subgraph of another.

There are two stages: an embedding stage and a query stage. In the embedding stage, the target graph \(G_T\) is decomposed into multiple subnetworks \(G_u\): for each node \(u\), a subnetwork \(G_u\) around \(u\) is extracted and a GNN yields an embedding for \(u\) that captures the neighborhood structure around \(u\). In the query stage, the embedding of each node \(q\) in the query graph \(G_q\) is computed from the neighborhood of \(q\). Embeddings of all pairs \((q, u)\) are then compared to determine whether \(G_Q\) is a subgraph of \(G_T\).

### NeuroMatch Architecture

#### Problem Setup

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/alg1.png" alt="avatar" style="zoom:100%;" /></div>

##### Problem 1. Matching query to datasets

Given a target graph \(G_T\) and a query graph \(G_Q\), predict whether \(G_Q\) is isomorphic to a subgraph of \(G_T\).

##### Problem 2. Matching neighborhoods

Given a neighborhood \(G_u\) around node \(u\) and a query \(G_Q\) anchored at node \(q\), make a binary prediction of whether \(G_q\) is a subgraph of \(G_u\), where node \(q\) corresponds to \(u\).

#### Overview of NeuroMatch

##### Embedding stage

In the embedding stage, \(G_T\) is decomposed into a collection of subgraphs; each node \(u\) is represented by the embedding of its neighborhood.

##### Query stage

A subgraph prediction function is designed to decide whether the query subgraph \(G_q\) anchored at \(q\) is a subgraph of the target neighborhood \(G_u\).

##### Practical considerations and design choices

The number of layers \(k\) must account for the size of the query graph; \(k\) is at least the diameter of the graph.

Experiments use a variant of GIN combined with skip connections to encode the query graph and neighborhoods.

#### Subgraph Prediction Function \(f(Z_q, Z_u)\)

Given the target node embedding \(z_u\) and a center node \(q \in G_Q\), the subgraph prediction function decides whether \(u \in G_T\) has a \(k\)-hop neighborhood that is isomorphic to the role of \(q\) in \(G_Q\). The key point is that the subgraph prediction function makes its decision using only the embeddings \(z_q\) and \(z_u\) of nodes \(q\) and \(u\).

##### Subgraph prediction function

If \(G_q\) is a subgraph of \(G_u\), then the embedding of \(q\) should lie to the lower left of that of \(u\).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/frm1.png" alt="avatar" style="zoom:60%;" /></div>

Max-margin loss is used; \(P\) denotes positive pairs and \(N\) negative pairs.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/frm2-frm3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/frm4.png" alt="avatar" style="zoom:60%;" /></div>

#### Training NeuroMatch

##### Training data

Positive samples: sample \(G_u\) from \(G_T\), then sample \(G_q\) from \(G_u\); such \((G_q, G_u)\) pairs are positive.

Negative samples: sample different \(u\) and \(q\) from \(G_T\); or perturb the query so that it is no longer a subgraph of the original graph.

##### Test data

Three strategies are used to generate test queries: BFS, random walk, and a degree-weighted sampling strategy.

##### Curriculum

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Training starts on simple queries, then gradually adds more complex queries and larger batch sizes.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/tab2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/NeuroMatch/fig3.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
