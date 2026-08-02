---
layout: post
title: ICSE-2019 A Novel Neural Source Code Representation Based on Abstract Syntax Tree
categories: [SE]
tags: [GNN, code-summarization]
proceedings: ICSE
date: 2019-05-25
lang: en
alt_url: /zh/se/A-Novel-Neural-Source-Code-Representation-Based-on-Abstract-Syntax-Tree/
permalink: /se/A-Novel-Neural-Source-Code-Representation-Based-on-Abstract-Syntax-Tree/
---

> Paper: [A Novel Neural Source Code Representation Based on Abstract Syntax Tree](https://ieeexplore.ieee.org/document/8812062/)

## ASTNN: Decomposing a Large AST into Small AST Trees

### 1. Introduction

1. Two major limitations of AST-based neural networks

   1.1 When the tree is large and deep, gradient vanishing becomes severe. In C and Java, the maximum AST node counts and depths are 7027/76 and 15217/192, respectively. Remedies such as sliding windows tend to lose long-range information.

   1.2 For simplicity and efficiency, prior work often treats the AST as a binary tree, which discards syntactic structure, increases AST depth, and weakens the ability to capture richer semantic information.

2. Approaches to address these limits

   Control-flow and data-dependency graphs are introduced, and graph embedding techniques represent code—for example, long-range dependency localization for variables and functions (PDG) and control-flow graphs (CFG) for code blocks. Such methods rely heavily on intermediate code representations and are difficult to apply to non-compilable or incomplete code fragments.

3. The authors therefore propose a new way to represent code segments that **does not require compilable code**, called ASTNN. They decompose the AST of a function or method into small AST trees at statement granularity, embed each tree into a vector, and use a bidirectional RNN to produce a code representation. This mitigates both depth and structural representation issues.

### 2. Model

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ASTNN/ASTNN-img1.png" alt="avatar" style="zoom:80%;" />

The first step is how to split the AST. This work splits at statement granularity: a preorder traversal yields a sequence of statement trees S, where each element s corresponds to one statement. For nested statements, each consists of a header and a body (e.g., `try` or `while`). The statement tree rooted at node s is the collection of statement trees for all child nodes of s.

As shown above, the example program is divided into seven AST subtrees; each subtree represents one statement composed of header and body. A preorder traversal of each subtree yields a node sequence that serves as the raw input to ASTNN—that is, the initial input to the subsequent RNN for representation learning.

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ASTNN/ASTNN-img2.png" alt="avatar" style="zoom: 67%;" />

Given the preorder node sequence of an AST subtree, each token is embedded first. As illustrated above, the model iteratively and recursively uses the current node’s embedding as input until all nodes are processed, producing a subtree vector. The whole procedure can be viewed as a pooling process.

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ASTNN/ASTNN-img3.png" alt="avatar" style="zoom: 67%;" />

In this figure, the statement encoder corresponds to the AST-subtree encoding structure in the previous figure. After obtaining subtree vectors, they are fed into an RNN, followed by a pooling layer to produce the final code representation.

### 3. Experiments

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ASTNN/ASTNN-img4.png" alt="avatar" style="zoom: 67%;" />

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ASTNN/ASTNN-img5.png" alt="avatar" style="zoom: 67%;" />

<HR align=left color=#987cb9 SIZE=1>
