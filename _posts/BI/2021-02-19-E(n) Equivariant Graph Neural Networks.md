---
layout: post
title: ICML-2021 E(n) Equivariant Graph Neural Networks
categories: [BI]
tags: [GNN]
proceedings: ICML
date: 2021-02-19
lang: en
alt_url: /zh/notes/bi/E(n)-Equivariant-Graph-Neural-Networks/
permalink: /notes/bi/E(n)-Equivariant-Graph-Neural-Networks/
---

> Paper: [E(n) Equivariant Graph Neural Networks](http://proceedings.mlr.press/v139/satorras21a/satorras21a.pdf)
>
> Code: <https://github.com/lucidrains/egnn-pytorch>
>
> Reference blog: <https://zhuanlan.zhihu.com/p/665216670>

## EGNN: Equivariant Graph Neural Networks

### Abstract

EGNN achieves strong performance without computing high-order representations in intermediate layers. Most existing methods are restricted to equivariance in three-dimensional space, whereas the approach in this paper extends to higher dimensions.

### Introduction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EGNN/fig1.png" alt="avatar" style="zoom:80%;" /></div>

Although deep learning has largely replaced hand-crafted features, much progress still relies heavily on inductive biases in deep neural networks.

Many problems exhibit three-dimensional translation and rotation symmetries, for example point clouds, 3D molecular structures, and N-body particle simulations. The group corresponding to these symmetries is the Euclidean group: SE(3), or E(3) when reflections are included. Predictions on such tasks are typically desired to be equivariant or invariant under E(3) transformations.

Much work has innovated on types of higher-order representations in intermediate network layers. However, transforming these higher-order representations requires substantial cost to compute coefficients or approximations.

This paper proposes a new architecture that is equivariant to translations, rotations, and reflections in E(n), and permutation-equivariant with respect to the input point set. The model is simpler than prior methods, and its equivariance is not limited to three-dimensional space—it can be extended to higher-dimensional spaces without a significant increase in computation.

The paper uses the QM9 dataset. QM9 consists of small molecules represented as sets of atoms (up to 29 atoms per molecule); each atom has an associated 3D position and a five-dimensional one-hot node embedding describing atom type (H, C, N, O, F). Dataset labels are various chemical properties of each molecule, estimated via regression. These properties are invariant to translation, rotation, and reflection of atomic positions. Therefore, E(3)-invariant models are well suited to this task.

### Background

#### Equivariance

Three types of equivariance, $y=\phi(x)$

- Translation equivariance
  - Translating the input set by $g\in R^n$ yields an equivalently translated output. Write $x+g$ for $(x_1+g,...,x_M+g)$. Then $y+g=\phi(x+g)$
- Rotation (and reflection) equivariance
  - For any orthogonal matrix $Q\in R^{n\times n}$, write $Qx$ for $(Qx_1,...,Qx_M)$. Rotating the input yields an equivalently rotated output: $Qy=\phi(Qx)$
- Permutation equivariance
  - Permuting the input yields the same permutation of the output: $P(y)=\phi(P(x))$, where P is a permutation over row indices

#### Graph Neural Networks

Graph neural networks are permutation-equivariant networks operating on graph-structured data. Given a graph $G=(V,E)$ with nodes $v_i\in V$ and edges $e_{ij}\in E$

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EGNN/frm2.png" alt="avatar" style="zoom:80%;" /></div>

where $h_i^l\in R^{nf}$ denotes the $nf$-dimensional embedding of node $v_i$ at layer $l$, $a_{ij}$ are edge attributes, and $N(i)$ is the neighbor set of node $v_i$. Finally, $\phi_e$ and $\phi_h$ are commonly used multilayer perceptron (MLP) approximations for edge and node operations, respectively.

### Equivariant Graph Neural Networks

Given a graph $G=(V,E)$ with nodes $v_i\in V$ and edges $e_{ij}\in E$. In addition to node feature embeddings $h_i^l\in R^{nf}$, the model also considers $n$-dimensional coordinates $x_i\in R^n$ associated with each graph node. The model preserves equivariance to rotation and translation of the coordinate set $x_i$, and preserves permutation equivariance over the node set V as in a GNN.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EGNN/frm3-frm6.png" alt="avatar" style="zoom:80%;" /></div>

The main difference between the proposed method and the original graph neural network in Equation 2 can be found in Equations 3 and 4. C is $\frac{1}{M-1}$

### Related Work

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EGNN/tab1.png" alt="avatar" style="zoom:100%;" /></div>

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EGNN/tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EGNN/fig2.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EGNN/fig5.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/EGNN/tab3.png" alt="avatar" style="zoom:100%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
