---
layout: post
title: PEDS-2022 Masked inverse folding with sequence transfer for protein representation learning
categories: [BI]
tags: [protein, PLM]
proceedings: PEDS
date: 2022-10-26
lang: en
alt_url: /zh/bi/Masked-inverse-folding-with-sequence-transfer-for-protein-representation-learnin/
permalink: /bi/Masked-inverse-folding-with-sequence-transfer-for-protein-representation-learnin/
---

> Paper: [Masked inverse folding with sequence transfer for protein representation learning](https://academic.oup.com/peds/article-abstract/doi/10.1093/protein/gzad015/7330543?redirectedFrom=fulltext)
>
> Model code is available at <https://github.com/microsoft/protein-sequence-models>. Pretrained model weights and AlphaFold predictions used in this work are available at <https://doi.org/10.1234/mifst>

## MIF: leveraging pretrained language models for protein structure pretraining

### Abstract

Sequence-only methods ignore structural information from experimental and predicted protein structures. Inverse folding reconstructs amino acid sequences from structure but does not use the vast pool of sequences without known structures. This work trains a masked inverse folding protein language model parameterized as a structural graph neural network. Using outputs from a pretrained sequence-only masked protein language model as input to the inverse folding model further improves pretraining perplexity.

### Introduction

Inverse folding is used as a pretraining task on the intuition that integrating structural information should improve downstream performance. Existing inverse folding methods still require sequences to be known or structures to be predicted before training, and thus fail to exploit large collections of sequences without structures—for example, UniRef50 contains 42M sequences, whereas PDB has only 190k experimentally validated structures.

A masked language model trained with a GNN is called MIF. Feeding a pretrained sequence-only protein MLM into MIF improves pretraining perplexity; this variant is MIF-ST (Masked Inverse Folding with Sequence Transfer).

### MIF and MIF-ST

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### Masked inverse folding

The protein backbone is represented by the coordinates of the C, Cα, Cβ, and N atoms of each amino acid residue, omitting side-chain information (which would easily reveal each residue’s amino acid identity).

After pretraining, MIF can be applied to downstream tasks like sequence-only PMLMs, except that structure must be provided.

##### Embedding backbone structure and sequence

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/fig2.png" alt="avatar" style="zoom:100%;" /></div>

With k-nearest neighbors and k=30, each node’s structural input features include sine and cosine transforms of dihedral and planar angles relative to nearest neighbors along the backbone:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/frm3.png" alt="avatar" style="zoom:70%;" /></div>

Here $w$ is symmetric; the remaining two coordinates are asymmetric and depend on residue order, so both directions must be encoded.

Input edge features:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/frm4.png" alt="avatar" style="zoom:70%;" /></div>

$d$ is the Euclidean distance between the Cα of residue $i$ and that of a nearest neighbor.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/frm5.png" alt="avatar" style="zoom:70%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/frm6.png" alt="avatar" style="zoom:70%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/frm7-frm8.png" alt="avatar" style="zoom:70%;" /></div>

##### Structured GNN

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/frm9.png" alt="avatar" style="zoom:70%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/frm10.png" alt="avatar" style="zoom:70%;" /></div>

$f_{msg}$ is a three-layer $d$-dimensional neural network with ReLU; Agg is mean pooling.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/frm11.png" alt="avatar" style="zoom:70%;" /></div>

$f_{update}$ is a linear projection.

##### Datasets and model training

CATH4.2; dynamic batch size up to 6000 tokens or 100 sequences; Adam optimizer; peak learning rate $10^{-3}$; linear warmup for 1000 steps.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/tab1.png" alt="avatar" style="zoom:100%;" /></div>

Although MIF has far fewer parameters than CARP, incorporating backbone structure still improves perplexity and recovery.

#### Masked Inverse Folding with Sequence Transfer

Replace the sequence embedding in Equation 5 with outputs from CARP-640M pretrained on UniRef50.

### Downstream tasks

#### Zero-shot mutation effect prediction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/tab2.png" alt="avatar" style="zoom:100%;" /></div>

Table 2 lists mutation benchmarks; see the original paper for dataset details.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/tab3.png" alt="avatar" style="zoom:60%;" /></div>

#### Out-of-domain generalization

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/fig3.png" alt="avatar" style="zoom:100%;" /></div>

Fine-tuning and evaluation on the following two fitness landscapes:

- Rma NOD: mutations at seven positions in *Rhodothermus marinus* (Rma) nitric oxide dioxygenase (NOD) and their effect on enantioselectivity of the reaction between phenyldimethylsilane and ethyl 2-diazopropionate; 214 variants with mutations at three positions are used for training, and variants with mutations at all seven positions are randomly split into 40 validation and 312 test variants.
- GB1: the same GB1 landscape split as in FLIP.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/tab4.png" alt="avatar" style="zoom:100%;" /></div>

“Pretrained” indicates whether pretraining was done on Rma NOD; MIF-ST is the only model that improves performance.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MIF/tab5.png" alt="avatar" style="zoom:100%;" /></div>

Pretraining on GB1 improves performance on all tasks.

### Conclusions

#### Limitations

This work uses a single structure for a protein and its variants; predicting structures for all variants could improve results, but the computational cost is prohibitive.

Because structure is held fixed during pretraining, it remains unclear how to handle insertions and deletions in downstream tasks.

#### Future work

Replace the Structured GNN with more advanced GVP or SE(3)-transformer architectures.

Data augmentation with AlphaFold structures or by adding noise to input structures.

Autoregressive or span-masking losses for generative tasks, to better handle insertions and deletions and improve generalization.


<HR align=left color=#987cb9 SIZE=1>
