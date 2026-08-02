---
layout: post
title: KDD-2020 GCC：Graph Contrastive Coding for Graph Neural Network Pre-Training
categories: [ML]
tags: [contrastive-learning, GNN]
proceedings: KDD
date: 2020-08-20
lang: en
alt_url: /zh/notes/ml/GCC：Graph-Contrastive-Coding-for-Graph-Neural-Network-Pre-Training/
permalink: /notes/ml/GCC：Graph-Contrastive-Coding-for-Graph-Neural-Network-Pre-Training/
---

> Paper: [GCC：Graph Contrastive Coding for Graph Neural Network Pre-Training](https://dl.acm.org/doi/10.1145/3394486.3403168)

## GCC: Contrastive Learning via Subgraph Instance Discrimination

### Abstract

Graph neural networks perform well on many downstream tasks and apply to real-world problems, but prior work largely designs elaborate, dataset-specific models for particular domains and does not transfer well out of domain. The authors propose **GCC** (Graph Contrastive Coding), with a pre-training task based on **subgraph instance discrimination**. Experiments on three graph learning tasks and ten graph datasets show competitive or superior results compared with task-specific methods, indicating substantial remaining potential for pre-train–fine-tune pipelines on graphs.

### Introduction

This paper aims to design a self-supervised pre-training framework for GNNs, followed by fine-tuning on different graph tasks or different graphs. It uses contrastive learning with subgraph instance discrimination as the proxy task.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/fig1.png" alt="avatar" style="zoom:60%;" /></div>

For each vertex, subgraphs are sampled from its multi-hop neighborhood as instance entities. The goal is to distinguish subgraphs sampled around one vertex from those sampled around other vertices.

### Graph Contrastive Coding (GCC)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/fig2.png" alt="avatar" style="zoom:60%;" /></div>

#### The GNN Pre-Training Problem

The GNN pre-training objective is to learn a mapping from nodes to low-dimensional feature vectors with two desired properties:

- **Structural similarity**: nodes with similar local topology should map to nearby points in representation space.
- **Transferability**: the representation should generalize to nodes not seen during pre-training.

#### GCC Pre-Training

In a dictionary-lookup view, given an encoded query $q$ and a dictionary of $K{+}1$ encoded keys $\{k_0, \ldots, k_K\}$, contrastive learning identifies the single matching key for $q$ (denoted $k^+$) using **InfoNCE**.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/frm1.png" alt="avatar" style="zoom:60%;" /></div>

Three design questions:

- How to define subgraph instances in a graph
- How to define similar instance pairs
- What constitutes an appropriate graph encoder

##### Q1: Design (subgraph) instances in graphs

Using a single node as an instance is insufficient, because before training the model sees purely structural signals without additional features or attributes.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/fig3.png" alt="avatar" style="zoom:60%;" /></div>

The two panels on the left of Figure 3 illustrate **2-ego** subgraphs. GCC treats each **r-ego** network as its own distinct class and trains the model to separate similar instances from dissimilar ones.

##### Q2: Define (dis)similar instances

In computer vision, augmentations such as rotation and cropping yield positive pairs. For r-ego networks, augmentation follows three main steps:

- **Random walk with restart**: start a random walk on $G$ from ego vertex $v$. At each step, the walk moves to a neighbor with probability proportional to edge weight; with a fixed positive probability it returns to the start vertex.
- **Subgraph induction**: repeat random walks; the resulting samples are treated as augmented views.
- **Anonymization**: relabel vertices in the sampled subgraph in an arbitrary order.

Repeating this procedure yields positive pairs; augmentations drawn from different r-ego networks form negative pairs. The pipeline can be implemented with the DGL library.

In random-walk-with-restart sampling, the restart probability controls the radius $r$ of the ego network; the authors use **0.8** as the restart probability.

The anonymization step preserves underlying structural patterns while hiding exact vertex indices. This avoids a trivial solution to subgraph instance discrimination—merely checking whether two subgraphs share the same vertex labels—and helps transfer learned models across graphs, because the encoder is not tied to a fixed vertex set.

##### Q3: Define graph encoders

GCC is largely **encoder-agnostic**; the authors use **GIN**, but most GNN encoders require vertex features. They therefore initialize vertex features from the graph structure of each sampled subgraph, using **generalized positional embeddings**.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/tab1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/tab3.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GCC/tab4.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

