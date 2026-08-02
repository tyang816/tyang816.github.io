---
layout: post
title: Bioinformatics-2023 Accurate and efﬁcient protein sequence design through learning concise local environment of residues
categories: [BI]
tags: [protein, protein-design, GNN, PLM]
proceedings: Bioinformatics
date: 2023-03-14
lang: en
alt_url: /zh/bi/Accurate-and-efﬁcient-protein-sequence-design-through-learning-concise-local-env/
permalink: /bi/Accurate-and-efﬁcient-protein-sequence-design-through-learning-concise-local-env/
---

> Paper: [Accurate and efﬁcient protein sequence design through learning concise local environment of residues](https://academic.oup.com/bioinformatics/advance-article/doi/10.1093/bioinformatics/btad122/7077134?login=false)
>
> Code: <https://github.com/bigict/ProDESIGN-LE>

## ProDESIGN-LE: designing protein sequences from local structure with a transformer encoder

### Abstract

The authors propose ProDESIGN-LE for efficient protein sequence design. It uses a concise yet semantically rich representation of each residue’s local environment and trains a transformer to learn the relationship between local environments and amino acid types. Given a backbone structure, ProDESIGN-LE assigns an appropriate residue type at each position via the transformer according to the local environment in that structure, yielding a designed sequence in which all residues match their local environments well. In application, ProDESIGN-LE designs 68 native and 129 hallucinated protein sequences per protein on average within about 20 seconds; predicted structures are highly similar to the targets, with the best TM-scores reaching 0.8.

Experimental validation further used design of chloramphenicol O-acetyltransferase type III (CAT III) followed by recombinant expression in *Escherichia coli*. Among these proteins, three showed good solubility, and one produced a monomer whose circular dichroism spectrum was consistent with native CAT III.

### Introduction

Protein sequence design can be carried out with a simultaneous strategy that determines the amino acid type of every residue at once. Most such methods exploit inter-residue distances from the target backbone structure—for example, SPROF applies a CNN to infer sequence from inter-residue distance maps, or ProteinSolver uses a deep graph network to find sequences satisfying inter-residue constraints—but these approaches generalize poorly.

Sequences can also be designed iteratively: each iteration randomly proposes a residue mutation and checks whether fitness improves, for example using Rosetta scoring.

Because residue–residue interactions are largely local, most methods use the local environment of a specific residue in the target structure—geometric features (relative distances to surrounding residues), physicochemical features (neighboring amino acid types and solvent accessibility)—to predict the target residue.

The core idea is that a designed protein will fold into a global structure similar to the target if every constituent residue conforms to the local environment defined by that target structure.

### Approach

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProDESIGN-LE/fig1.png" alt="avatar" style /></div>

The coordinates of each amino acid can be written as `$B_i=(N-i,C_{\alpha_i},C_i)$`

The local environment is `$env_i=\{(s_j,B_j \ominus B_i,j-i)|\parallel C_{\alpha_i}-C_{\alpha_j} \parallel \le T \}$`, where `$\ominus$` denotes relative displacement. Given backbone B, designing sequence S can be expressed as

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProDESIGN-LE/frm1.png" alt="avatar" style /></div>

That is, maximize this probability.

The algorithm starts from a **random sequence** and repeats:

*   Randomly pick position i
*   For each possible amino acid type a, compute the conditional probability `$P(a|env_i)$`
*   Mutate `$s_i$` to the most likely type `$s_i\leftarrow argmax_aP(a|env_i)$`, updating local environment information as needed

A transformer serves as the classifier, trained on a subset of PDB40. For local geometric environment `$env_i$`, relative positions of two amino acids are represented as a 3×3 rotation matrix and a 3×1 translation vector; after flattening, these are concatenated with other features (e.g., one-hot encoding, relative sequence position).

### Materials and methods

#### Network architecture and training procedure

(1) Local environment encoder: three transformer layers, 16 heads per layer

(2) Residue type distribution calculator: fully connected layer + softmax

batch\_size=1000, Adam optimizer (`$\beta_1=0.9,\beta_2=0.999$`), lr=1e-3

#### Datasets

PDB40

Training set: 5,867,488 residues from 9,995 protein structures; test set: 758,160 residues from 401 structures.

Local features include:

*   One-hot encoding of neighboring amino acids
*   3D relative positions
*   Distances between the target residue and its neighbors

Performance on sequence design was evaluated on 68 native proteins and 129 hallucinated structures from CASP14. To avoid overlap, training proteins similar to these 68 CASP14 targets were filtered out (similarity cutoff: E-value < 1×10−3).

#### Predicting 3D structure for the designed proteins

Designed proteins were assessed by how closely their predicted structures match the targets, using AlphaFold2 and the authors’ ProFOLD-Single.

#### Protein expression and purification

...

#### Analyzing protein thermal stability

...

#### Circular dichroism spectroscopy

...

#### Analytical ultracentrifugation

...

### Results and discussion

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProDESIGN-LE/fig2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProDESIGN-LE/fig3.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProDESIGN-LE/fig4.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

