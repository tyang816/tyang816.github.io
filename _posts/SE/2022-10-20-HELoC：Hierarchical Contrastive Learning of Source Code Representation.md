---
layout: post
title: ICPC-2022 HELoC：Hierarchical Contrastive Learning of Source Code Representation
categories: [SE]
tags: [contrastive-learning, GNN]
proceedings: ICPC
date: 2022-10-20
lang: en
alt_url: /zh/notes/se/HELoC：Hierarchical-Contrastive-Learning-of-Source-Code-Representation/
permalink: /notes/se/HELoC：Hierarchical-Contrastive-Learning-of-Source-Code-Representation/
redirect_from:
  - "/se/HELoC：Hierarchical-Contrastive-Learning-of-Source-Code-Representation/"
  - "/SE/HELoC：Hierarchical-Contrastive-Learning-of-Source-Code-Representation/"
---

> Paper: [HELoC：Hierarchical Contrastive Learning of Source Code Representation](https://dl.acm.org/doi/10.1145/3524610.3527896)
>
> Code: <https://github.com/Code-Rep/HELoC>

## HELoC: hierarchical contrastive learning with GCN encoding

### Abstract

The authors propose a multi-level contrastive learning model for code representation. The network is trained to predict AST node levels and to learn hierarchical relations among nodes. They also introduce a new GNN, the Residual Self-Attention Graph Neural Network (RSGNN), so that HELoC captures global structural information while emphasizing local embeddings on the AST. The approach applies to several downstream tasks, including code classification, clone detection, and code clustering.

### Introduction

Existing methods struggle to learn multi-level AST structure, especially as the number of nodes grows, edges multiply, and tree depth increases.

The main innovations in HELoC are:

- Contrastive learning on AST structure: two learning objectives train HELoC to predict AST node levels and to learn three types of hierarchical relations among nodes, so that nodes at very different AST levels are pushed farther apart in embedding space.
- A GNN tailored to multi-level AST structure: although GNNs model local AST information well, they have difficulty modeling long-range dependencies in very deep trees; HELoC therefore uses GCN for local information and self-attention for global information.

### Background and Motivation

#### AST Hierarchy

Three levels of hierarchical structure:

1. **Neighbors**: topological relations among nodes at the same level.
2. **Adjacent-level structure**: topological relations between nodes whose level difference is 1 or 3.
3. **Non-adjacent-level structure**: topological relations between nodes whose level difference is greater than 1.

In the figure below, A, B, and C are neighbors; A and D are adjacent-level; A and E are non-adjacent-level.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/fig1.png" alt="avatar" style="zoom:60%;" /></div>

#### The Limitations of the Existing Work

1. Heavy reliance on labeled data.
2. Insufficient modeling of AST hierarchy: prior work often focuses only on neighbors or adjacent-level nodes and cannot learn non-adjacent topological structure.
3. Semantic fragmentation: methods such as code2vec and code2seq decompose the AST, which loses long-range dependencies and breaks global semantic information.
4. Extra data engineering: although Corder and ContraCode avoid semantic fragmentation, their contrastive learning relies on negative samples at the code level obtained via many program transformations, which makes semantically similar pairs hard to obtain.

### Proposed Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/fig2.png" alt="avatar" style="zoom:60%;" /></div>

#### Input Representation

Path embeddings are added to the corresponding node embeddings to form enriched node representations.

#### RSGNN (Residual Self-Attention GNN)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/fig3.png" alt="avatar" style="zoom:60%;" /></div>

Each RSGNN block consists of two parts: RSM and GCN.

### Hierarchical Contrastive Learning

Suppose node A in Figure 1 is the anchor. With triplet samples in the form {anc, pos, neg}, one obtains triplets {A, B, D} and {A, C, E}. Positive pairs are ⟨A, B⟩ and ⟨A, C⟩; negative pairs are ⟨A, D⟩ and ⟨A, E⟩. However, the distance between ⟨A, E⟩ should be larger than that between ⟨A, D⟩. Because standard contrastive objectives alone are insufficient to learn AST hierarchy, the authors propose two objectives: **Node-level prediction (NEP)**, which predicts the AST level of each node, and **Node relation optimization (NRO)**, which learns triplet topological relations among nodes.

**AST pseudo-label construction**: DFS assigns level 0 to the root and level L to nodes at depth L.

**Hierarchy representation learning**: contrastive pretraining uses NEP and NRO. NEP uses cross-entropy loss; NRO uses triplet loss. A joint loss balances the two to obtain the final training objective.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/frm6-8.png" alt="avatar" style="zoom:60%;" /></div>

**See the original paper for the exact loss functions and formulas.**

### Applications of The Proposed Model

- Fine-tuning on supervised downstream tasks.
- Producing code vectors as a feature extractor for model inputs and specific downstream tasks.

### Experiments

Datasets

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab1.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab2.png" alt="avatar" style="zoom:50%;" /></div>

Code classification

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab3.png" alt="avatar" style="zoom:60%;" /></div>

Code clone detection and code clustering

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab5.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab6.png" alt="avatar" style="zoom:50%;" /></div>

Ablation study

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/HELoC/tab7.png" alt="avatar" style="zoom:60%;" /></div>



<HR align=left color=#987cb9 SIZE=1>
