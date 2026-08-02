---
layout: post
title: ACL-2021 Code Summarization with Structure-induced Transformer
categories: [SE]
tags: [code-summarization, transformer]
proceedings: ACL
date: 2021-01-01
lang: en
alt_url: /zh/notes/se/Code-Summarization-with-Structure-induced-Transformer/
permalink: /notes/se/Code-Summarization-with-Structure-induced-Transformer/
---

> Paper: [Code Summarization with Structure-induced Transformer](https://aclanthology.org/2021.findings-acl.93)

## SiT: Multi-view structural cues

### Abstract

Prior work largely relies on SBT or non-sequential models such as Tree-LSTM and GNN to learn structured semantics of code. Surprisingly, incorporating SBT into stronger encoders such as Transformers rather than LSTMs yields no gain, which makes GNN appear to be the only effective approach for modeling code structure.

To alleviate this puzzling behavior, the authors propose the Structure-induced Transformer (SiT), which encodes sequential code input via multi-view structural cues under a newly proposed self-supervised structure-induction mechanism.

### Introduction

Early code summarization was a spin-off of information retrieval: it mainly matched the most similar code snippets that already had comments. Such methods generalize poorly and deliver unsatisfactory results.

Recently, researchers have cast code summarization as a natural language generation task, often using RNN-based end-to-end models. These models, however, bottleneck when modeling long-range dependencies, especially because code segments typically contain hundreds of tokens.

Accordingly, recent work has explored Transformer-based methods to capture long-sequence context, outperforming RNN-based approaches by a wide margin.

On another front, structural cues can substantially improve programming-language tasks such as code summarization—for example, ASTs help interpret code snippets more faithfully. Related prior work falls into two lines:

- Non-sequential encoders that model structured input directly: TBCNN, Tree-LSTM, Tree-Transformer, GNN
- Preprocessing structured input so it can be consumed by sequential models: SBT

RNN- and LSTM-based methods are limited in capturing long-range dependencies, whereas GNN models are overly sensitive to local information. SBT helps only when paired with LSTM, not with Transformers. The authors attribute this to linear versus nonlinear **inconsistency** induced by the form of SBT and the encoder—in other words, feature–model compatibility.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SiT/table2.png" alt="avatar" style="zoom:60%;" /></div>

The table above indicates that the proposed SiT model avoids these shortcomings.

### Structure-based Code Summarization

#### Structure Representation of Code

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SiT/img2.png" alt="avatar" style="zoom:60%;" /></div>

The figure above shows a standard AST and the three views used in this work.

In the implementation, an adjacency matrix $A$ represents the AST rather than a structure traversal or a sequential tree encoding. Key–query dot products produce an $l \times l$ attention matrix, which is then multiplied in a position-wise manner.

The authors further extend the AST into a multi-view network (MVN, multi-view graph): each view corresponds to one structural relation, and all views share the same set of nodes. The paper builds a **three-view graph based on abstract syntax, control flow, and data dependence**, yielding three adjacency matrices; global attention is also added at the root node.

#### Structure-induced Transformer

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SiT/img3.png" alt="avatar" style="zoom:60%;" /></div>

##### Vanilla Self-Attention

Self-attention:
$$
SAN(X)=Softmax(\frac{QK^T}{\sqrt{d_k}})V
$$
If each sub-token is treated as a vertex $n$ and the key–value inner product as an edge $e$, the formula can be rewritten as
$$
SAN(X)=E\cdot N
$$

##### Structure-induced Self-Attention

To highlight the role of structural information, the authors introduce structure-induced self-attention:
$$
SiSAN(X)=Softmax(\frac{A_{mv}\cdot QK^T}{\sqrt{d_k}})V
$$
Here $A_{mv}$ is the multi-view representation of the code. Si-SAN does not change the input code sequence; instead, it alters the attention pattern, merging code structure into SAN so that structural information is computed more accurately.

##### Structure-induced Module

To improve robustness and mitigate overfitting, they propose a structure-induced module that stacks SAN and Si-SAN.

Hidden states are obtained first through SAN layers:
$$
H=Concat(SAN_1(X),\cdots,SAN_h(X))
$$
where $h$ is the number of attention heads.

Then Si-SAN layers are applied:
$$
H'=Concat(SiSAN_1(H),\cdots,SiSAN_h(H))
$$
Features are fused as
$$
\tilde{H}=Aggr(H,H')
$$
This note uses element-wise summation as the aggregation function.

#### SiT-based Code Summarization

After transforming the input code into adjacency matrices, a weighted sum is formed:
$$
A_{mv}=\alpha A_{ast}+\beta A_{fl}+\gamma A_{dp}
$$
The code sequence and the corresponding adjacency matrices are fed into the encoder—three Si-SAN layers—while the decoder is the standard Transformer decoder.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SiT/table3.png" alt="avatar" style="zoom:60%;" /></div>

SiT improves over the vanilla Transformer.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SiT/table6.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SiT/table7.png" alt="avatar" style="zoom:50%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

