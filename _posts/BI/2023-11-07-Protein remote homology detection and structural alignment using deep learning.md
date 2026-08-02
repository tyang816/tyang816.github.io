---
layout: post
title: Nature Biotechnology-2023 Protein remote homology detection and structural alignment using deep learning
categories: [BI]
tags: [protein, homology]
proceedings: Nature Biotechnology
date: 2023-11-07
lang: en
alt_url: /zh/bi/Protein-remote-homology-detection-and-structural-alignment-using-deep-learning/
permalink: /bi/Protein-remote-homology-detection-and-structural-alignment-using-deep-learning/
---

> Paper: [Protein remote homology detection and structural alignment using deep learning](https://www.nature.com/articles/s41587-023-01917-2)
>
> Code: <https://github.com/tymor22/tm-vec>

## TM-vec/DeepBLAST: retrieval and alignment models trained with TM-align

### Abstract

Exploring sequence–structure–function relationships at low sequence similarity now requires improved methods; the authors propose TM-vec and DeepBLAST. The former computes structure–structure similarity at the sequence level because it is trained on a database of TM-scores; the latter performs structural alignment using sequence alone. It outperforms conventional sequence alignment methods and performs similarly to structure-based sequence alignment approaches. The paper demonstrates the advantages of TM-vec and DeepBLAST on diverse datasets, including better identification of remote homologs compared with state-of-the-art sequence alignment and structure prediction methods.

### Introduction

Detecting protein homology from sequence similarity is a standard approach that has been applied over the past 50 years to functional annotation, structure prediction, protein–protein interactions, protein design, and modeling evolutionary relationships.

Most standard sequence homology methods rely on high sequence similarity. Compared with sequence homology, structural homology is preserved over longer evolutionary timescales. Because of distant evolutionary relationships, more than half of proteins lack detectable sequence homologs in standard sequence databases. Recent metagenomic analyses indicate that annotation rates can exceed 70% when structural homology detection is used. A hybrid strategy—sequence-based alignment for closely related proteins and structure-based alignment for distantly related ones—may be ideal and offer improved sensitivity.

Although methods such as TM-align, Dali, FAST, and Mammoth provide structural metrics at low sequence similarity, two major limitations remain:

- Most proteins lack experimentally determined structures
- AlphaFold2 has limited predictive ability for short proteins

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/tab1.png" alt="avatar" style="zoom:60%;" /></div>

With the rapid growth of structural databases, existing structure alignment methods cannot scale to this size.

The authors developed neural networks that can be fine-tuned on protein structures:

- A siamese neural network predicts the TM-score between protein pairs
- A differentiable Needleman–Wunsch algorithm predicts structural alignment between proteins

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/fig1.png" alt="avatar" style="zoom:100%;" /></div>

DeepBLAST structural alignment capability is demonstrated on the Malidup and Malisam structural databases; TM-vec is evaluated on CATH, SWISS-MODEL, Malidup, and Malisam.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### Scalable structural alignment search using neural networks

Direct use of DeepBLAST scales linearly with database size, which is undesirable. After encoding proteins as vectors with TM-vec, query complexity for *n* proteins becomes O(log²*n*).

Training used roughly 150M protein pairs from SWISS-MODEL and data from CATH at 40% sequence identity.

To further validate TM-vec, the authors also evaluated it on the Microbiome Immunity Project (MIP), which contains 200,000 *de novo* protein structures from previously unknown proteins, including 148 putative folds; the correlation with TM-score reached 0.785.

#### Capturing structural information in the latent space

Figure 2c visualizes structure in the latent space.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/tabs1.png" alt="avatar" style="zoom:100%;" /></div>

On the novel-fold dataset from the **Microbiome Immunity Project (MIP)**, TM-vec achieves low false-positive (0.1%) and false-negative (3.9%) rates when deciding whether two proteins share the same fold.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/tabs2.png" alt="avatar" style="zoom:100%;" /></div>

Given a query protein, very high accuracy can be achieved on CATH.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/tabs3.png" alt="avatar" style="zoom:100%;" /></div>

For head-to-head comparison with other baselines, the 219 domains in the **ProtTucker** benchmark serve as the test set. In 81% of cases TM-vec correctly returns homology for the query sequence, versus 77% for Foldseek.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/tabs4.png" alt="avatar" style="zoom:100%;" /></div>

Because only 219 domains are available, the authors also tested on the larger **CATH S20** benchmark. TM-vec trained on CATH again shows the best performance in searching for CATH homologs, outperforming structure-based Foldseek and sequence-based methods such as HHBlits and MMSeqs2.

#### Extracting structural alignments from sequence

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/tab2.png" alt="avatar" style="zoom:60%;" /></div>

DeepBLAST uses sequence only and is given no atomic coordinates. Two benchmarks are used: Malisam and Malidup.

- **Malidup** (*Proteins*, 2003), Manual ALIgnments of DUPlicated domains, contains 241 manually aligned duplicated domains and is the **first library of homologous structures that are structurally similar but not defined by sequence**. Here, duplicated domains refer to proteins that contain multiple repeated domains; although homologous, these domains often perform different functions and have diverged substantially in sequence, so Malidup entries exhibit low sequence similarity but high structural similarity.
- **Malisam** (*NAR*, 2007), Manual ALIgnments for Structurally Analogous Motifs, contains 130 manually aligned structurally analogous motif pairs and is the **first structural analog database**.
- Manually aligned protein structures can be regarded as near-optimal alignments. The drawbacks are that the databases are old and small; the advantage is equally clear: **sequence alignment methods such as BLAST and HMMER struggle to align these pairs (most fail threshold-based detection)**.

#### Remote homology detection and alignment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/fig3.png" alt="avatar" style="zoom:100%;" /></div>

On Malidup, regions of clear structural similarity and expert structure–structure alignments coincide with sequence similarity so low that sequence alignment methods cannot detect homology.

Panel (b) shows per-site alignment probability; (c) shows the aligned sequences of the two small proteins, where similarity is relatively low. (d) shows two annexin domains: after DeepBLAST alignment the TM-score is 0.81, whereas aligning sequences with Needleman–Wunsch and then computing TM-score on the aligned (partial) structures yields 0.33.

#### Full repository-level scaling and runtime

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/figs7.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/tabs5.png" alt="avatar" style="zoom:100%;" /></div>

#### Case study: bacteriocins

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/fig4.png" alt="avatar" style="zoom:100%;" /></div>

**Bacteriocins** are peptides with highly diverse structure and sequence (typically shorter than 50 residues), making them difficult to mine with existing sequence homology tools. Bacteriocins are widespread among bacteria; given the enormous diversity of bacterial species, only about 1,000 bacteriocins have been identified so far. The authors analyzed bacteriocin family diversity using the BAGEL database. Detecting bacteriocins in proteomic and metagenomic data remains challenging.

The authors compared TM-vec's ability to discriminate unannotated bacteriocins against structures predicted by AlphaFold2, OmegaFold, and ESMFold. Specifically, the authors predicted structures for these bacteriocins with all three folding methods and computed TM-scores between predictions for bacteriocins within the same type versus across types. Figure 4: when the three folding methods are compared pairwise, median TM-scores are around 0.3 regardless of whether pairs belong to the same class, so they cannot discriminate types; TM-vec, however, can.

### Discussion

- TM-vec cannot detect structural differences caused by point mutations
- Because it predicts TM-score, a global structural similarity measure, it cannot assess local similarity

### Methods

#### TM-Vec search

##### TM-Vec embedding model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/figs1.png" alt="avatar" style="zoom:100%;" /></div>

The PLM used is ProtTrans (ProtT5-XL-UniRef50).

##### TM-Vec database creation

Vector indices are built with FAISS.

##### DeepBLAST alignment module

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/figs2.png" alt="avatar" style="zoom:100%;" /></div>

A differentiable Needleman–Wunsch algorithm is used.

Residue-level embeddings from the PLM pass through match embeddings (M) and gap embeddings (G) to obtain match scores μ and gap scores $g$, then dynamic programming yields an alignment traceback; these alignments can be fine-tuned against ground-truth alignments.

##### Protein language modeling for alignment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/frm0.png" alt="avatar" style="zoom:70%;" /></div>

$p$ and $q$ denote the lengths of proteins X and Y; $d$ is the embedding dimension of the language model.

##### Differentiable dynamic programming

The differentiable dynamic programming framework has no learnable parameters of its own; it exists so that M and G can receive gradients.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/frm1.png" alt="avatar" style="zoom:70%;" /></div>

The alignment score $v_{i,j}$ pairs position $i$ of the first sequence with position $j$ of the second; $\mu_{i,j}$ is the log-odds score for aligning amino acids $X_i$ and $Y_j$, $g_{ij}$ is the log-odds score for insertion or deletion, and $v_{n,m}$ is the best alignment score for the two sequences. Via argmax and traceback along the alignment matrix, the optimal alignment is obtained.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-Vec/frm1.1.png" alt="avatar" style="zoom:70%;" /></div>

Because max and argmax are not differentiable, a smoothed operation is used instead.

##### Alignment loss function

The loss is the Euclidean distance between predicted and ground-truth alignments.

#### Datasets

##### Protein-chain-pairs dataset

Pairs of chains are sampled from SWISS-MODEL, which contains more than 500,000 chains.

For chain pairs, the train/validation set (maximum length 300 residues) has 141M pairs; the held-out test set has 1M pairs; pairs exceeding 1,000 residues number 320M.

##### Domain-pairs dataset

Domains longer than 300 residues are discarded, yielding 450M pairs; CATH domains from different folds are then undersampled to obtain 23M pairs.

##### Structure alignment dataset

TM-align on PDB structures yields 1.5M alignments for DeepBLAST training, from 40,000 protein structures.

##### ProtTucker benchmark dataset

Training and search sets comprise 66,000 and 69,000 CATH domains, respectively. The test set excludes any domain with HSSP value > 0 and any search-set domain, and contains 219 domains.

##### DIAMOND benchmark dataset

Contains single-domain and multi-domain proteins.

#### TM-Vec training

- Model with 17.3M parameters trained on CATHS40 and SWISS-MODEL (max length 300)
- Model with 34.1M parameters trained on CATHS100 and SWISS-MODEL (max length 1,000)

Learning rate 1e-4, batch size 32.

#### DeepBLAST training

Eight convolutional layers with dimension 1,024 parameterize match embedding M and gap embedding G. The final model has 1.2B parameters, learning rate 5e-4, batch size 360, trained for 20 epochs over 6 days on 24 A100 GPUs.

<HR align=left color=#987cb9 SIZE=1>
