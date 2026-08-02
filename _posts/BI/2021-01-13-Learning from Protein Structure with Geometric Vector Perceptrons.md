---
layout: post
title: ICLR-2021 Learning from Protein Structure with Geometric Vector Perceptrons
categories: [BI]
tags: [protein, GNN, inverse folding]
proceedings: ICLR
date: 2021-01-13
lang: en
alt_url: /zh/bi/Learning-from-Protein-Structure-with-Geometric-Vector-Perceptrons/
permalink: /bi/Learning-from-Protein-Structure-with-Geometric-Vector-Perceptrons/
---

> Paper: [Learning from Protein Structure with Geometric Vector Perceptrons](https://openreview.net/forum?id=1YLJDvSx6J4)
>
> Code: <https://github.com/drorlab/gvp-pytorch>

## GVP: Geometric vector perceptrons for geometric and relational reasoning

### Abstract

We propose geometric vector perceptrons, which extend standard dense layers to operate on Euclidean vectors. Graph neural networks equipped with such layers can perform geometric and relational reasoning over effective representations of large molecules. The approach is evaluated on model quality assessment and computational protein design.

### Introduction

Deep learning methods often exploit domain-specific problem structure—for example, CNNs for computer vision and attention for natural language processing.

On one hand, amino acid residues have spatial arrangement and orientation, which govern molecular dynamics and function; on the other, proteins also exhibit relational structure in their amino acid sequences and in residue–residue interactions that mediate the properties above. These are referred to as the geometric and relational aspects, respectively.

Recent methods that use structural information fall mainly into two lines: relational reasoning with GNNs, or CNNs that operate directly on spatial structure.

We propose GVP, which can jointly handle scalar and geometric features, and can be applied to any problem whose input domain is a single large molecule or structures of molecules in complex. This work focuses on two protein-structure-related tasks: computational protein design and model quality assessment.

### Methods

The proposed architecture combines ideas from CNN- and GNN-based approaches to learning from biomolecular structure.

GNNs as described in the preceding section encode the 3D geometry of proteins by encoding vector features (such as node directions and edge directions) as rotation-invariant scalars, typically by defining a local coordinate system at each node. This paper proposes representing these features directly as 3D geometric vector features that transform appropriately under changes of spatial coordinates at every step of graph propagation.

This yields two benefits:

*   Input features are more convenient: absolute position encodings at each node replace relative position encodings between that node and all of its neighbors.
*   A single global coordinate frame for the entire structure is used, allowing geometric features to propagate directly without conversion between local frames.

#### Geometric vector perceptrons

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/fig1.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/alg1.png" alt="avatar" style /></div>

Given a tuple `$(s,V)$`, with scalar features `$s\in \mathbb{R}^n$` and vector features `$V\in \mathbb{R}^{v\times 3}$`, we compute new features `$(s',V')\in \mathbb{R}^m\times \mathbb{R}^{u\times 3}$`.

Two separate linear transformation matrices act on scalars and vectors, respectively, followed by a nonlinear activation and an L2 norm.

The only operations applicable to vector-valued inputs are scalar multiplication, linear combination, and the L2 norm. The authors provide a formal proof in Appendix A. The screenshot below illustrates their argument that the GVP architecture can approximate any continuous rotation- and reflection-invariant scalar-valued function of `$V$`.

#### Representations of Proteins

The main empirical validation of the authors’ architecture is its performance on two practical tasks: computational protein design (CPD) and model quality assessment (MQA). As shown in Fig. 1b and described in detail in Section 4, these tasks are complementary: CPD predicts per-amino-acid properties, whereas MQA predicts global properties.

A protein structure is represented as an adjacency graph with a minimal set of scalar and vector features that specify the three-dimensional structure. A protein structure is an amino acid sequence in which each amino acid comprises four backbone atoms and a set of side-chain atoms in three-dimensional Euclidean space. Only the backbone is represented, because side chains are unknown in CPD and the MQA benchmark evaluates backbone structures only.

The protein backbone is represented as a graph `$G=(\nu, \varepsilon)$`. Each node `$\nu_i$` corresponds to an amino acid and has an embedding `$\mathbf{h}_\mathbf{\nu}^{(i)}$` with the following features:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/img1.png" alt="avatar" style /></div>

Edges connect the 30 nearest neighbors; each edge `$h_e^{(j\rightarrow i)}$` has the following features:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/img2.png" alt="avatar" style /></div>

#### Network Architecture

Graph propagation proceeds as follows:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/frm3-frm4.png" alt="avatar" style /></div>

Here, g denotes a stack of three GVPs:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/frm5.png" alt="avatar" style /></div>

*

Here, g denotes a stack of two GVPs. These graph-propagation and feedforward steps update both the scalar and vector features at each node.

### Evaluation metrics and datasets

#### Protein design

Computational protein design (CPD) is the conceptual inverse of protein structure prediction: it aims to infer the amino acid sequence that will fold into a given structure.

The dataset used is CATH4.2; the authors also evaluate on TS50, an older test set of 50 native structures.

#### Model quality assessment

Model quality assessment (MQA) aims to select the best structural model for a protein from a large pool of candidate structures.

The CASP dataset is used.

### Experiments

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/tab1.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/tab2-tab3.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GVP/tab4.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

