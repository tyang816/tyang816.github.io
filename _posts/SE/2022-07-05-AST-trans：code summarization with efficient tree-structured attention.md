---
layout: post
title: ICSE-2022 AST-trans：code summarization with efficient tree-structured attention
categories: [SE]
tags: [code-summarization]
proceedings: ICSE
date: 2022-07-05
lang: en
alt_url: /zh/notes/se/AST-trans：code-summarization-with-efficient-tree-structured-attention/
permalink: /notes/se/AST-trans：code-summarization-with-efficient-tree-structured-attention/
---

> Paper: [AST-trans：code summarization with efficient tree-structured attention](https://dl.acm.org/doi/10.1145/3510003.3510224)
>
> Code: <https://github.com/zetang94/ICSE2022_AST_Trans>

## AST-trans: Tree attention on parent–child and sibling nodes

### Abstract

Abstract syntax trees (ASTs) carry structural information but are often much longer than the corresponding source code. Existing approaches ignore length limits and feed entire ASTs into encoders, which makes it hard to exploit relational dependencies effectively and leads to large computational cost. This work proposes AST-trans, which uses two node relations—ancestor–descendant and sibling—and tree-structured attention to weight relevant and irrelevant nodes. It further gives an efficient implementation that supports fast parallel computation of tree-structured attention.

### Introduction

Linearized ASTs are much longer than the corresponding source code; some linearization schemes increase length further—for example, linearized SBT can expand the sequence by several times—so models struggle to recover useful dependencies. This also imposes heavy computation: in transformer-based state-of-the-art methods, attention cost grows with sequence length.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/fig1.png" alt="avatar" style="zoom:60%;" /></div>

The paper assumes each AST node’s state is shaped mainly by two factors: (1) ancestor–descendant links, which capture cross-block relations at different hierarchy levels; (2) sibling links, which capture sequential relations within a block. Ancestor–descendant structure supports high-level semantics; sibling structure supports low-level semantics. Together they are sufficient for comment generation and for the attention each node needs over the tree.

Main contributions:

- AST-trans has linear complexity and encodes long ASTs more efficiently than a standard transformer’s quadratic cost
- A full analysis of computational complexity for alternative implementations, supported by theory and experiments
- State-of-the-art results on Java and Python summarization datasets
- A comparison of representative AST encoding methods and discussion of their trade-offs

### AST-TRANS

#### AST Linearization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/tab1.png" alt="avatar" style="zoom:60%;" /></div>

Pre-order traversal (POT), structure-based traversal (SBT), and path decomposition (PD).

#### Relationship Matrices

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/fig2.png" alt="avatar" style="zoom:60%;" /></div>

Ancestor–descendant relations use matrix **A**; sibling relations use matrix **S**. Entries in **A** are shortest-path distances; entries in **S** are horizontal sibling distances in the AST. **P** is the relative-distance threshold.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm1.png" alt="avatar" style="zoom:60%;" /></div>

#### Tree-Structured Attention

**Self-Attention**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm2.png" alt="avatar" style="zoom:60%;" /></div>

**Relative position embedding**

Equation (2) has no explicit position terms. The original transformer used absolute position embeddings; here the model uses relative position encoding (more effective for code summarization). Relative position $\delta(i,j)$ is the pairwise distance between nodes $n_i$ and $n_j$.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm3.png" alt="avatar" style="zoom:60%;" /></div>

**Disentangled Attention**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm4.png" alt="avatar" style="zoom:60%;" /></div>

**Attention with Tree-Structured Relationships**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm5.png" alt="avatar" style="zoom:60%;" /></div>

The method replaces the relative distance defined on a linear sequence with $\delta_R(i,j)$, where $R$ is either ancestor–descendant relation **A** or sibling relation **S** in the tree.

There are two relation types; each maps to one attention head, so the top-level transformer adds no extra parameters.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm6.png" alt="avatar" style="zoom:60%;" /></div>

$V^P$ is the value projection matrix for relative distances; $V^P_{R_{ij}}$ is row $R_{ij}$ of $V^P$. Restricting computation to $\delta_R(i,j) > 0$ reduces the time and space cost of self-attention.

### Efficient Implementation

A standard transformer’s cost grows with sequence length. AST-Trans can lower cost by computing attention only where $\delta_R(i,j) > 0$, in the spirit of a sliding window that limits attention to a fixed distance.

With a sliding window, node pairs in a sequence can be laid out linearly (dropping pairs with $\delta(i,j) = 0$ or $2P - 1$) and computed in parallel via matrix tiling. That trick does not transfer directly here, because the positions of related nodes change from tree to tree.

The paper describes five implementation options for AST-Trans and their trade-offs:

**Mask**

Compute full attention over all node pairs, then zero out scores where $\delta_R(i,j) = 0$. Time and space remain quadratic, as in a standard transformer.

**Loop**

Iterate over pairs with $\delta_R(i,j) > 0$ and compute attention scores. This is efficient in terms of work but does not parallelize well.

**Sparse**

Store $\delta_R$ as a sparse matrix $ST(\delta_R)$; frameworks such as PyTorch skip zero entries automatically. This works for content-to-position and position-to-content terms, but not for content-to-content, which still requires mask or loop.

**Gather with COO (GC)**

Building on the sparse view, content-to-content attention can be optimized with extra gather operations. The idea is to list each query–key pair that must be scored in a one-to-one layout and materialize them as dense matrices.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm4.1.png" alt="avatar" style="zoom:60%;" /></div>

The total number of gathers is four times the number of nonzeros in $\delta_R$: two for content and two for position.

**Gather with decomposed COO (GDC)**

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/fig3.png" alt="avatar" style="zoom:60%;" /></div>

To cut gathers in GC, the matrix for $\delta_R$ is decomposed into three submatrices; content embeddings are gathered as follows.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm4.2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm4.3.png" alt="avatar" style="zoom:60%;" /></div>

Finally, all $\alpha_{\mathrm{coo}}$ terms are summed.

This yields three benefits:

- $K^P$ and $Q^P$ can be reused: each $Q_{\mathrm{row}_s}$ and $K_{\mathrm{row}_s}$ shares the same relative distance $s$, so the position embedding for $s$ can be fused into content without a gather
- Only one quarter as many gather operations
- Only one dot product is needed; the second can be reused

### Complexity Analysis

This section summarizes best-, worst-, and average-case complexity for the five implementations above.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/frm7.png" alt="avatar" style="zoom:60%;" /></div>

**A** and **B** are $[N, m]$ matrices; $\mathbf{A}[C; :]$ denotes gathering rows of **A** indexed by $C$, and $|C|$ is the size of $C$.

Detailed complexity is in the paper; the analysis is fairly involved.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/fig4-fig5.png" alt="avatar" style="zoom:60%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/tab3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/tab4-tab5.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/tab6-tab7.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AST-trans/fig7.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
