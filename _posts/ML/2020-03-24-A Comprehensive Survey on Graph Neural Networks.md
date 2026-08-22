---
layout: post
title: Transactions on Neural Networks and Learning Systems-2020 A Comprehensive Survey on Graph Neural Networks
categories: [ML]
tags: [GNN]
proceedings: Transactions on Neural Networks and Learning Systems
date: 2020-03-24
lang: en
alt_url: /zh/notes/ml/A-Comprehensive-Survey-on-Graph-Neural-Networks/
permalink: /notes/ml/A-Comprehensive-Survey-on-Graph-Neural-Networks/
redirect_from:
  - "/ml/A-Comprehensive-Survey-on-Graph-Neural-Networks/"
  - "/ML/A-Comprehensive-Survey-on-Graph-Neural-Networks/"
---

> Paper: [A Comprehensive Survey on Graph Neural Networks](https://ieeexplore.ieee.org/document/9046288)

## Survey of graph neural networks

1. Graph neural networks are categorized as recurrent graph neural networks, convolutional graph neural networks, spatiotemporal graph neural networks, and graph autoencoders.

    1.1 Recurrent graph neural networks (RecGNNs) comprise much of the pioneering work on graph neural networks. RecGNNs aim to learn node representations with recurrent neural architectures. They assume that nodes in a graph repeatedly exchange information or messages with their neighbors until a stable equilibrium is reached. This perspective later inspired research on convolutional graph neural networks; the message-passing idea was inherited by spatial-based ConvGNNs.

    1.2 Convolutional graph neural networks (ConvGNNs) generalize convolution from grid-structured data to graph data. The main idea is to form a node representation by aggregating the node’s own features with those of its neighbors.

    1.3 Graph autoencoders (GAEs) are unsupervised learning frameworks that encode nodes or entire graphs into a latent vector space and reconstruct graph data from the encoded representation. GAEs are used for network embedding and for learning generative distributions over graphs. For network embedding, GAEs learn latent node representations by reconstructing graph-structural information (e.g., the adjacency matrix). For graph generation, some methods generate nodes and edges step by step, whereas others output the full graph in one shot.

    1.4 Spatiotemporal graph neural networks (STGNNs) aim to learn hidden patterns from spatiotemporal graphs, a setting that has become increasingly important in applications such as traffic speed forecasting, driver maneuver anticipation, and human action recognition. The key idea of STGNNs is to model spatial and temporal dependencies jointly. Many current approaches combine graph convolutions that capture spatial dependencies with RNNs or CNNs that model temporal dependencies.

2. Unsupervised learning on graphs:

    When no class labels are available on a graph, graph embeddings can be learned in a fully unsupervised manner within an end-to-end framework. These algorithms exploit edge-level information in two ways. A simple approach adopts an autoencoder framework: the encoder maps the graph into a latent representation using graph convolution layers, and a decoder reconstructs the graph structure from that representation. Another popular approach uses negative sampling: a subset of node pairs is drawn as negative pairs, while existing linked node pairs in the graph serve as positive pairs. A logistic regression layer is then applied to distinguish positive from negative pairs.

3. Semi-supervised learning for node-level classification

    Given a single network in which some nodes are labeled and others are not, ConvGNNs can learn a robust model that effectively predicts class labels for unlabeled nodes. An end-to-end framework can be built by stacking several graph convolution layers followed by a softmax layer for multi-class classification.

4. Supervised learning for graph-level classification

    Graph classification aims to predict a class label for an entire graph. End-to-end learning for this task can be implemented by combining graph convolution layers, graph pooling layers, and/or readout layers. Graph convolution layers produce high-level node representations; graph pooling layers act as downsampling operators, coarsening each graph into substructures at each stage.

<hr align="left" color="#987cb9" size="1">
