---
layout: post
title: NeurIPS-2020 Graph Contrastive Learning with Augmentations
categories: [ML]
tags: [contrastive-learning, GNN]
proceedings: NeurIPS
date: 2020-12-06
lang: en
alt_url: /zh/notes/ml/Graph-Contrastive-Learning-with-Augmentations/
permalink: /notes/ml/Graph-Contrastive-Learning-with-Augmentations/
redirect_from:
  - "/ml/Graph-Contrastive-Learning-with-Augmentations/"
  - "/ML/Graph-Contrastive-Learning-with-Augmentations/"
---

> Paper: [Graph Contrastive Learning with Augmentations](https://proceedings.neurips.cc/paper/2020/hash/3fe230348e9a12c13120749e3f9fa4cd-Abstract.html)
>
> Code: <https://github.com/Shen-Lab/GraphCL>

## GraphCL: Graph Contrastive Learning with Augmentations and Analysis

### Abstract

The authors design four graph augmentation schemes to inject different prior knowledge, and systematically study how various combinations of augmentations perform across datasets under four settings: semi-supervised learning, unsupervised learning, transfer learning, and adversarial attacks. Results show that, even without tuning augmentation strength or using elaborate GNN architectures, the GraphCL framework yields graph representations that compare favorably with state-of-the-art methods.

### Introduction

Unlike CNNs on images, pre-training strategies for GNNs face distinct design challenges on graph structure because graphs encode rich contextual structure—e.g., atomic bonds in molecules and interactions in social networks—making it hard to devise a pre-training objective that generalizes broadly to downstream tasks.

Main contributions:

- Four types of graph data augmentation, each encoding a specific prior on graph data with parameterized scope and pattern
- A graph contrastive learning framework (GraphCL) for GNN pre-training that learns representations invariant to chosen perturbations on diverse graph-structured data, together with a reformulation of GraphCL as a general framework on graph data
- Empirical comparison of augmentations on datasets of different types, analysis of what drives performance, and practical guidance for choosing augmentations on a given dataset

### Methodology

#### Data Augmentation for Graphs

Data augmentation aims to create new, plausible instances via transformations that preserve semantic labels; this direction remains under-explored for graphs.

We focus on three domains: biochemical graphs (e.g., compounds and proteins), social networks, and image superpixel graphs.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCL/tab1.png" alt="avatar" style="zoom:60%;" /></div>

- **Node dropping:** Randomly removes vertices and their incident edges; omitting some vertices does not change the semantic label of graph g. Drop probabilities are i.i.d. uniform by default.
- **Edge perturbation:** Randomly adds or deletes a fraction of edges, reflecting robustness of semantics to variation in connectivity. Each edge is perturbed under an i.i.d. uniform rule (add or remove).
- **Attribute masking:** Masks vertex attributes so the model must infer them from context; the assumption is that missing some attributes has limited impact on prediction.
- **Subgraph:** Samples a subgraph via random walk, under the assumption that semantics are largely preserved in (partial) local structure.

#### Graph Contrastive Learning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCL/fig1.png" alt="avatar" style="zoom:60%;" /></div>

### The Role of Data Augmentation in Graph Contrastive Learning

#### Data Augmentations are Crucial. Composing Augmentations Benefits

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCL/fig2.png" alt="avatar" style="zoom:60%;" /></div>

**Obs. 1. Data augmentations are crucial in graph contrastive learning**

From the top row or rightmost column, a single augmentation already helps: with an appropriate prior injected into the data distribution, maximizing agreement between a graph and its augmentation encourages invariance to the intended perturbation.

**Obs. 2. Composing different augmentations benefits more**

Combining multiple augmentations often works better, plausibly because the contrastive task becomes harder when several perturbation types must be handled jointly.

#### The Types, the Extent, and the Patterns of Effective Graph Augmentations

**Obs. 3. Edge perturbation benefits social networks but hurts some biochemical molecules**

For some biomolecular graphs, semantics depend more sharply on individual edges than in social networks: altering a bond can change chemical meaning entirely, whereas extra or missing social ties often matter less.

**Obs. 4. Applying attribute masking achieves better performance in denser graphs**

Masking pattern matters; masking higher-degree hub nodes helps more on denser graphs, since message passing cannot recover masked features on poorly connected nodes.

**Obs. 5. Node dropping and subgraph are generally beneficial across datasets**

Node dropping encodes the prior that omitting certain vertices—e.g., some hydrogens in compounds or peripheral users in social graphs—does not change semantics, which aligns with intuition.

Subgraph views and consistency with global structure aid representation learning, consistent with subgraphs of compounds capturing structural or functional motifs.

### Comparison with the State-of-the-art Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCL/tab3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCL/tab4.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCL/tab5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GraphCL/tab6.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
