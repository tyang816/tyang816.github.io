---
layout: post
title: ICLR-2019 Graph2Seq：Graph to Sequence Learning with Attention-based Neural Networks
categories: [CL]
tags: [NLP, GNN]
proceedings: ICLR
date: 2018-09-28
lang: en
alt_url: /zh/cl/Graph2Seq：Graph-to-Sequence-Learning-with-Attention-based-Neural-Networks/
permalink: /cl/Graph2Seq：Graph-to-Sequence-Learning-with-Attention-based-Neural-Networks/
---


> Paper: [Graph2Seq：Graph to Sequence Learning with Attention-based Neural Networks](https://openreview.net/forum?id=SkeXehR9t7)

## Graph2Seq: bidirectional node embedding aggregation

In NLP, applications that relate sequences and graphs fall into two broad categories: sequence-to-graph generation and graph-to-sequence generation; this paper focuses on the latter. The conventional approach linearizes a graph into a sequence and then generates output under a Seq2Seq framework. That design has an obvious drawback: **a large amount of structural information is lost when the graph is converted into a sequence.**

Accordingly, the authors propose Graph2Seq, an end-to-end model that maps graphs directly to sequences.

<img src="https://pic1.zhimg.com/v2-2f6adeb035a92b39c51214aac5feb2d0_b.jpg" alt="avatar" style="zoom: 80%;" />

1. Graphs encode more information than plain sequences, which can strengthen expressiveness and reduce information loss during propagation.
2. Node embeddings: concatenate representations from forward and backward neighbors, pass them through fully connected layers and nonlinearities, and iterate this procedure.
3. Aggregation structures: mean, pooling, and LSTM.
4. Graph-level embedding:

   4.1 Pooling-based: apply fully connected layers to node embeddings, then max/min/average pooling—the variants behave similarly.

   4.2 Node-based: introduce a super node with incoming edges from all other nodes, then run the node-embedding procedure above so it aggregates global graph information.
5. Attention-based decoder: compute weighted inputs and measure similarity to nodes in the semantic space.

<HR align=left color=#987cb9 SIZE=1>
