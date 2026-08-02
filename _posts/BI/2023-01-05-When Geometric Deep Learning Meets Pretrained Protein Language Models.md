---
layout: post
title: bioRxiv-2023 When Geometric Deep Learning Meets Pretrained Protein Language Models
categories: [BI]
tags: [protein, PLM, GNN]
proceedings: bioRxiv
date: 2023-01-05
lang: en
alt_url: /zh/bi/When-Geometric-Deep-Learning-Meets-Pretrained-Protein-Language-Models/
permalink: /bi/When-Geometric-Deep-Learning-Meets-Pretrained-Protein-Language-Models/
---

> Paper: [When Geometric Deep Learning Meets Pretrained Protein Language Models](http://biorxiv.org/lookup/doi/10.1101/2023.01.05.522958)
>
> Code: <https://github.com/smiles724/bottleneck>
>
> Data: The data of model quality assessment, protein-protein interface prediction, and ligand affinity prediction is available by <https://www.atom3d.ai/>. The data of protein-protein rigid-body docking can be downloaded directly from the official repository of Equidock <https://github.com/octavian-ganea/equidock_public>.
>

## PLM-GNN: Initializing GNNs with language-model inputs

### Abstract

Few advanced studies have fused multiple modalities of proteins to strengthen geometric representation learning. This work integrates knowledge from pretrained protein language models into several state-of-the-art geometric networks, yielding roughly 20% overall gains across tasks including protein-protein interface prediction, model quality assessment, protein-protein rigid-body docking, and binding affinity prediction.

### Introduction

Compared with sequence data, structure-based training involves orders of magnitude fewer examples.

Protein language models (PLMs) trained with self-supervision unlock information encoded in protein sequences, including fitness, stability, function, and the natural sequence distribution.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/fig1.png" alt="avatar" style="zoom:80%;" /></div>

The paper therefore uses PLMs to enhance geometric graph neural networks (GGNNs).

### Experiments

#### Task and Datasets

##### Model Quality Assessment (MQA)

The goal is to select the best structural model for a protein from a large pool of candidates. MQA methods evaluate candidates by predicting the GDT-TS score between each candidate and experimentally determined structures. The database comprises all models submitted to CASP over the past 18 years. MQA is analogous to protein structure ranking.

##### Protein-protein Rigid-body Docking (PPRD)

Predict the 3D structure of a protein-protein complex from individual unbound structures, assuming no conformational change upon binding. The dataset is Docking Benchmark 5.5 (DB5.5).

##### Protein-protein Interface (PPI)

Predict whether two amino acids contact each other when their respective proteins bind—an important question for understanding protein interactions, e.g., antibody recognition of antigen. The dataset is the Database of Interacting Protein Structures (DIPS).

##### Ligand Binding Affinity (LBA)

A task critical for drug discovery: predict interaction strength between a candidate small molecule and a target protein. The dataset is PDBbind.

#### Experimental Setup

Implemented in PyTorch and PyG. For MQA, PPI, and LBA, the authors use GVP-GNN, EGNN, and Molformer; for PPRD, EquiDock serves as the backbone.

#### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/tab1.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/tab2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/tab3-tab4.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/tab5.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/fig2.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/fig3.png" alt="avatar" style="zoom:80%;" /></div>

### Conclusion

The authors propose a simple and effective approach: initialize graph networks with amino-acid representations from an existing pretrained protein language model, yielding clear gains on downstream tasks.

### Method

The initialization PLM is ESM-2 with embedding dimension 1280.

Experimental structures and raw amino-acid sequences are often incomplete: some residue strings are missing for practical reasons. Common strategies are to feed fragment information directly into the model forward pass, or to align sequence pairs with dynamic programming and discard residues absent from the PDB structure.

### Sequence Recovery Analysis

When operating on 3D geometry, GGNNs use diverse input features including distances, angles, torsions, and higher-order terms. However, when building 3D graphs for GGNNs, the position index hidden in the protein sequence is typically ignored.

#### Protein Graph Construction

Three connectivity patterns are considered: r-ball graphs, fully connected (FC), and K-nearest neighbors (KNN).

#### Recovery from Graphs to Sequences

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/fig4.png" alt="avatar" style="zoom:80%;" /></div>

The analysis addresses one question: can existing GGNNs recover sequential order from protein geometry alone?

As shown in Figure 4, two tasks are defined: predicting absolute position and predicting relative position.

#### Results and Analysis

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLM-GNN/tab6.png" alt="avatar" style="zoom:80%;" /></div>

None of the GGNNs recover relative or absolute positional information: accuracy stays below 1% and RMSE is high. The main reason is that graph connectivity is constructed without sequence information; unlike citation networks, social networks, or knowledge graphs, molecules do not have uniquely defined edges or adjacency.


<HR align=left color=#987cb9 SIZE=1>
