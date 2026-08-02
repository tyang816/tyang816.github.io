---
layout: post
title: ICML-2021 MSA Transformer
categories: [BI]
tags: [protein, PLM]
proceedings: ICML
date: 2021-02-13
lang: en
alt_url: /zh/notes/bi/MSA-Transformer/
permalink: /notes/bi/MSA-Transformer/
---

> Paper: [MSA Transformer](https://proceedings.mlr.press/v139/rao21a.html)
>
> Code: <https://github.com/facebookresearch/esm>
>
> This work belongs to Facebook’s ESM protein language model line, which aims to predict protein structure and function from sequence. Building on ESM-1b, the authors replace a single protein sequence with an MSA matrix as model input and add row-wise and column-wise axial attention in the Transformer. For each site $x_{mi}$, they model the influence of sequence index $m$ and alignment column $i$, exploiting the full benefit of two-dimensional input.

## ESM-MSA-1b: Axial-Attention Protein Pre-training

### Abstract

Protein language models to date infer from isolated sequences, whereas a long-standing computational biology practice fits each family separately and reasons over evolutionarily related sequence families. This paper combines both paradigms: sequence sets enter as multiple sequence alignments, with row–column attention and a masked language modeling objective across protein families.

### Introduction

Because evolution cannot independently choose amino-acid identities at positions that must contact one another in the folded three-dimensional structure, patterns are imprinted on evolutionarily selected sequences, and constraints on protein structure can be inferred from patterns in related sequences.

Recent protein language modeling uses large-scale networks rather than fitting each family separately, and at inference replaces multi-stage traditional computational biology pipelines with end-to-end prediction from a single sequence.

The model uses axial attention and a masked language modeling objective.

### Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-MSA-1b/fig1.png" alt="avatar" style="zoom:60%;" /></div>

MSA Transformer takes as input a collection of two-dimensional MSA matrices; each MSA is a multiple sequence alignment for a set of protein sequences.

An MSA matrix stores homologous protein sequences from different species. Each row is a protein sequence from a particular species; each column corresponds to the same position in the protein family and records the amino acid at that position across species.

#### Token Embedding

Amino acids are mapped to integers, forming an integer vector. The vocabulary includes 20 standard amino acids, 5 non-standard amino acids, and 4 special tokens, for 29 symbols in total.

#### Position Embedding

- sequence embedding
  - Assigns an index to each column (each alignment position).

- position embedding
  - Assigns an index to each row (each sequence).
  - These embeddings give rows and columns in the MSA distinct identifiers so that each row or column is treated as unique.

#### Pre-training

The model is trained with masked language modeling and outputs, at each masked token, probabilities over amino acids. The primary goal is not these probabilities per se, but using attention maps from the trained model to predict secondary and tertiary protein structure.

- Secondary structure prediction
  - A NetSurf model is trained on MSA Transformer representations to predict eight structural states, reaching 72.9% accuracy.

- Tertiary structure prediction (contact prediction)
  - Logistic regression is trained on attention maps from each layer and head of MSA Transformer to predict tertiary contacts.

#### Axial Attention

For two-dimensional inputs, two axial attention mechanisms are used: row attention and column attention.

To reduce time complexity, attention over the 2D plane is factorized into vertical and horizontal directions. Axial attention assumes that influence on a site comes mainly from its row and column, with other matrix positions neglected; for each site, attention weights are computed only along its row and column.

Row attention computes weights along the site’s row, effectively aggregating information from the protein sequence containing that site and mutual influences among amino acids in the same sequence—reflecting interactions relevant to secondary and tertiary structure.

Column attention computes weights along the site’s column, capturing co-evolutionary signal at that alignment position.

### Result

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-MSA-1b/fig3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-MSA-1b/tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-MSA-1b/tab3.png" alt="avatar" style="zoom:50%;" /></div>

- Comparison with other models
  - Amino-acid contact patterns can be learned directly by row attention heads and are encoded in row attention maps.
  - From these contact patterns, MSA Transformer predicts residue contacts with accuracy substantially above Potts and other baselines regardless of MSA depth, with the largest gains when the MSA is shallow.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-MSA-1b/fig6.png" alt="avatar" style="zoom:60%;" /></div>

- Mechanistic analysis of structure prediction
  - Learning co-variation (similar to Potts models)
    - Randomly permuting amino acids within each MSA column destroys column-wise co-variation: Potts contact prediction drops to random-guess level, ESM-1b is unchanged, and MSA Transformer accuracy decreases but remains above chance. Thus MSA Transformer captures co-variation but does not rely on it exclusively.
  - Learning sequence regularities (similar to ESM-1b)
    - Randomly permuting column order while keeping each column’s residues fixed disrupts per-sequence patterns: ESM-1b drops to random guess, Potts is unchanged, and MSA Transformer accuracy decreases but retains useful signal. Thus MSA Transformer captures sequence regularities but does not rely on them exclusively.

<HR align=left color=#987cb9 SIZE=1>
