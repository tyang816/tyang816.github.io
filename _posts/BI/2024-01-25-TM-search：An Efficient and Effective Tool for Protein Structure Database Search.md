---
layout: post
title: Journal of Chemical Information and Modeling-2024 TM-search：An Efficient and Effective Tool for Protein Structure Database Search
categories: [BI]
tags: [protein, structure search]
proceedings: Journal of Chemical Information and Modeling
date: 2024-01-25
lang: en
alt_url: /zh/notes/bi/TM-search：An-Efficient-and-Effective-Tool-for-Protein-Structure-Database-Search/
permalink: /notes/bi/TM-search：An-Efficient-and-Effective-Tool-for-Protein-Structure-Database-Search/
---

> Paper: [TM-search：An Efficient and Effective Tool for Protein Structure Database Search](https://pubs.acs.org/doi/10.1021/acs.jcim.3c01455)
>
> Code: <https://zhanggroup.org/TM-search/>

## TM-search: fast structural alignment

### Abstract

Existing protein structure search algorithms incur substantial computational cost. This work introduces TM-search, a program built on TM-align with a new iterative clustering algorithm. Benchmarks show it runs about 27× faster than TM-score while retaining ~90% hit rate, and 2–10× faster than other current tools such as Foldseek, Dali, and PSI-BLAST.

### Introduction

By 2020 the PDB contained roughly 178,000 structures and ~400,000 protein chains—too large for exhaustive TM-align search, which averages ~0.5 s per protein pair.

Two mainstream strategies accelerate structure database retrieval:

- Map 3D structures to 1D structural identifiers (e.g., Foldseek). This discards much structurally critical information and can reduce sensitivity to remote homolog detection.
- Use clustering to cut redundant computation, performing pairwise alignment only between the query and representative structures. Methods such as MMseq2 or CD-HIT cluster by sequence similarity rather than structure.

TM-search builds a hierarchical database from a structure-similarity matrix.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/fig1.png" alt="avatar" style="zoom:70%;" /></div>

### Materials and Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/fig2.png" alt="avatar" style="zoom:100%;" /></div>

#### Preparation of the TM-search Database

Build a hierarchical structure database.

- Split each structure in the database into domains; use SCOPe domain definitions when available, otherwise Protein Domain Parser.
- After excluding structures shorter than 30 amino acids, ~470,000 structures form the initial database (PDBall).
- CD-HIT clusters at 70% sequence identity; the largest structure in each cluster serves as the representative, yielding 71,115 non-redundant entries (PDB70).

Next, compute pairwise TM-scores for PDB70.

Choosing cluster representatives is key to accuracy and speed; three strategies are used:

- type-α: the representative is the structure with the most neighbors in the cluster with TM-score > 0.5.
- type-αβ: same as type-α, but if several proteins tie for the largest neighbor count, pick the longest.
- type-β: the longest protein not already assigned to an existing cluster becomes the representative.

### Evaluation Metric

AUROC, F-score, recall, precision

#### Algorithm for Database Search

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/alg6.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/alg7.png" alt="avatar" style="zoom:70%;" /></div>

TM-score

### Results and Discussion

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/tab1-tab2.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/fig3.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/tab3-fig5.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/fig4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TM-search/fig6.png" alt="avatar" style="zoom:100%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
