---
layout: post
title: bioRxiv-2021 Toward More General Embeddings for Protein Design：Harnessing Joint Representations of Sequence and Structure
categories: [BI]
tags: [protein, PLM, fitness-prediction]
proceedings: bioRxiv
date: 2021-09-01
lang: en
alt_url: /zh/notes/bi/Toward-More-General-Embeddings-for-Protein-Design：Harnessing-Joint-Representatio/
permalink: /notes/bi/Toward-More-General-Embeddings-for-Protein-Design：Harnessing-Joint-Representatio/
---

> Paper: [Toward More General Embeddings for Protein Design：Harnessing Joint Representations of Sequence and Structure](http://biorxiv.org/lookup/doi/10.1101/2021.09.01.458592)
>

## Masked sequence–structure: masked sequence and structure for single-mutant thermal stability

### Abstract

The authors propose a more data-efficient approach that jointly encodes protein information from sequence and structure via semi-supervised training. Experiments show that this approach can encode both modalities into a rich embedding space that transfers better to downstream tasks. By predicting the effect of individual mutations and incorporating rich structural information into the contextual representation, model performance improves. The accuracy gains are attributed to exploiting proximity in the rich representation to identify residues that are sequentially and spatially close and likely affected by a mutation, using experimentally validated or predicted structures.

### Results

#### Masked Structure and Sequence Recovery

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Masked sequence-structure/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Five consecutive residues are masked, yielding 15% masked residues in total. Figure 2a shows masked validation points; on average, initial validation samples are perturbed by 5 Å, and after correction the samples have an RMSD of roughly 2 Å to their respective native proteins. For ESM-1b in Figure 2b, 15% of tokens are masked at random; with added structural information the accuracy is 0.13, versus 0.06 for sequence-only.

#### Predicting the effect of a single mutation on thermal stability

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Masked sequence-structure/fig3.png" alt="avatar" style="zoom:100%;" /></div>

Both the sequence-only baseline and the joint embedding model are fine-tuned with a sequence prediction head (LMHead); results are shown in Figure 3a.

#### Evaluation of mutant vs wild-type embedding space

Structure-aware embeddings achieve higher degree than wild-type and mutant embedding spaces on PDB 1FXA; results are shown in Figure 3b.

#### Single mutation effect prediction using predicted models

Results are shown in Figure 3c.

### Discussion

Jointly learning structure and sequence in the embedding model is more data-efficient, reducing the number of training samples and compute.

The semi-supervised setup uses an SE(3)-equivariant Transformer.

The model is more sensitive to single-point mutations than sequence-only models and performs better on single-mutant thermal stability.

RoseTTAFold is used to predict single-mutation effects.

Several directions could further improve the joint model, such as increasing model capacity and predicting atomic reconstruction.

### Methods

#### Input sequence embedding and structure information

The trRosetta2 dataset is used. The masked sequence is fed into pretrained ESM-1b; the last-layer sequence embedding and attention maps from all 33 layers are used. For structure, only N, Cα, C, and Cβ atoms are considered, with a length limit of 128.

#### Training Objective and Details

Cross-entropy is minimized between masked amino acids and predictions. The optimizer is Adam ($\beta_1=0.9$, $\beta_2=0.999$), learning rate $10^{-3}$, batch size 128.

#### Model Architecture

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Masked sequence-structure/fig1.png" alt="avatar" style="zoom:100%;" /></div>

A 5-layer graph neural network SE(3)-equivariant transformer is used. One-dimensional (sequence embedding) and two-dimensional (attention map) ESM-1b features are linearly projected to 32 dimensions for noise reduction.

When constructing the graph, 16 neighbor nodes are considered. Node features include the ESM-1b sequence embedding per residue and displacement vectors from each atom to Cα (N–Cα, C–Cα, Cβ–Cα). Edge features include the ESM-1b 2D attention map and orientations between residues.

The LMHead is two fully connected layers plus layer normalization; the SE3-SR top model is a 3-layer SE(3)-transformer.

#### Fine-tuning for single-mutant effect prediction

Fine-tuning targets prediction of thermal stability for single mutations, using a ProTherm subset with 1,042 mutants across 126 wild-type proteins; train/test split 8:2.


<HR align=left color=#987cb9 SIZE=1>
