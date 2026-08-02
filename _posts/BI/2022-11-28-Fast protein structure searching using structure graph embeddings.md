---
layout: post
title: bioRxiv-2022 Fast protein structure searching using structure graph embeddings
categories: [BI]
tags: [protein, PLM, alignment]
proceedings: bioRxiv
date: 2022-11-28
lang: en
alt_url: /zh/bi/Fast-protein-structure-searching-using-structure-graph-embeddings/
permalink: /bi/Fast-protein-structure-searching-using-structure-graph-embeddings/
---

> Paper: [Fast protein structure searching using structure graph embeddings](https://www.biorxiv.org/content/10.1101/2022.11.28.518224v2)
>
> Code: <https://github.com/greener-group/progres>

## Progres: graph neural networks + supervised contrastive learning

### Abstract

Compared with primary-sequence search, structure search is more useful for homology detection, functional annotation, and protein classification; a fast and accurate retrieval method can be highly valuable for bioinformatics. The authors train a simple graph neural network with supervised contrastive learning to obtain low-dimensional representations of protein structures. The method is named Progres: its accuracy is comparable to the best existing approaches, and searching TED domains in AFDB on CPU takes only about one tenth of a second.

### Introduction

Protein structure is often more conserved than sequence and can support remote homology detection, protein classification, and functional inference. The highest-accuracy methods today are coordinate-based comparisons such as Dali, but they become slow as databases grow.

Using GNN embeddings and cosine similarity over a pre-embedded database is fast. Supervised contrastive learning is used to encode an understanding of distances in protein structure space.

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Progress/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Supervised contrastive learning is performed on SCOPe domains with sinusoidal position encoding; however, the method does not produce structural alignments.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Progress/tabs1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Progress/figs1.png" alt="avatar" style="zoom:100%;" /></div>

The test set is a random set of 400 domains drawn from the Astral 2.08 40% sequence-identity set, chosen to be independent of SCOPe and with pairwise similarity below 30%.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Progress/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Progress/fig2.png" alt="avatar" style="zoom:100%;" /></div>

A recent TED study splits AFDB into domains; after clustering domains at 50% sequence identity, embeddings are retrieved with FAISS, for a total of 53M structures.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Progress/fig3.png" alt="avatar" style="zoom:100%;" /></div>

### Discussion

The model is trained on domains, so it cannot handle multi-domain proteins, long disordered regions, or complexes directly. Query structures must be split into domains with existing tools such as Merizo, SWORD2, and Chainsaw.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Progress/figs3.png" alt="avatar" style="zoom:100%;" /></div>

Figure S3 compares embeddings after removing varying numbers of N- or C-terminal residues from truncated domains, suggesting that domain-boundary issues are not a major concern.

### Methods

#### Training

Training uses the Astral 2.08 95% sequence-identity set, including discontinuous domains. From the Astral 2.08 40% sequence-identity set, 400 domains are chosen at random for testing and 200 for validation. MMseqs2 removes domains from these 600 that share ≥30% identity with any training domain, and domains with fewer than 20 or more than 500 residues are removed. This yields 30,549 domains from 4,862 families for training.

Cα atoms within 10 Å serve as nodes with the following features: the number of Cα atoms within 10 Å divided by the maximum such count in the protein, whether the Cα is at the N-terminus, whether it is at the C-terminus, and a 64-dimensional sinusoidal position encoding of the residue index in the domain.

The model is an EGNN with edges within 10 Å, six layers, and sum pooling.

For each protein family, five other families are sampled at random. For these six families, six proteins are sampled per family (replicated if fewer than six exist). The 36 domains from the six labels are fed to the model; contrastive temperature is 0.1. During training, Gaussian noise with variance 1.0 Å is added to the x, y, and z coordinates of each Cα atom.

Optimization uses Adam with learning rate 5e-5 and weight decay 1e-16 for 500 epochs.

#### Testing

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Progress/tabs1.png" alt="avatar" style="zoom:100%;" /></div>

15,177 Astral 2.08 40% sequence-identity domains are embedded with the model; Table S1 shows that fp16 has little effect on accuracy.

For the 400 test domains, cosine similarity is computed against all 15,177 domains; evaluation counts true positives until the first incorrect fold is detected.

<HR align=left color=#987cb9 SIZE=1>
