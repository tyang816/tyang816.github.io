---
layout: post
title: Nature Biotechnology-2023 Fast and accurate protein structure search with Foldseek
categories: [BI]
tags: [protein, alignment]
proceedings: Nature Biotechnology
date: 2023-05-08
lang: en
alt_url: /zh/notes/bi/Fast-and-accurate-protein-structure-search-with-Foldseek/
permalink: /notes/bi/Fast-and-accurate-protein-structure-search-with-Foldseek/
redirect_from:
  - "/bi/Fast-and-accurate-protein-structure-search-with-Foldseek/"
  - "/BI/Fast-and-accurate-protein-structure-search-with-Foldseek/"
---

> Paper: [Fast and accurate protein structure search with Foldseek](https://www.nature.com/articles/s41587-023-01773-0)
>
> Code: <https://github.com/steineggerlab/foldseek>

## Foldseek: structural serialization and fast structure comparison

### Abstract

Foldseek aligns the structure of a query protein against a database by describing tertiary amino-acid interactions within the protein as a sequence over a structural alphabet. It reduces compute time by four to five orders of magnitude and achieves 86%, 88%, and 133% of the sensitivity of Dali, TM-align, and CE, respectively.

### Introduction

The most widely used approaches for protein annotation and analysis rely on sequence-similarity search to find homologous sequences from which properties of the query can be inferred. Although sequence-based homology inference has been successful, many proteins remain unannotated because detecting distant evolutionary relationships from sequence alone is still difficult. Despite decades of work to improve the speed and sensitivity of structure aligners, current tools are too slow for today’s structure databases.

Searching one protein against a database of 100 million structures with TM-align on a single core takes about a month; an all-versus-all comparison would require a 1,000-core cluster for roughly 10,000 years. With sequence search, MMseqs2 needs only about a week.

Structure alignment is slow for two reasons:

- Sequence alignment has prefilter algorithms that reduce computation by orders of magnitude; structure alignment does not.
- Structural similarity is non-local: changing the alignment in one region affects similarity elsewhere, so most methods rely on iterative or stochastic optimization.

To accelerate search, the protein backbone can be encoded as a sequence and structures compared with sequence-alignment methods—hence the appeal of structural alphabets.

For Foldseek, the authors developed a structural alphabet that does not describe the backbone but tertiary structural interactions. The 20 states of the three-dimensional interaction (3Di) alphabet describe the geometry between each residue *i* and its spatially nearest residue *j*. Compared with traditional backbone structural alphabets, 3Di has three main advantages:

1. **Weaker dependence between consecutive letters:** Each residue’s state is influenced more by its local environment than by the previous residue’s state. Weaker dependence increases information density and reduces false positives.
2. **More uniform state frequencies:** States in the 3Di alphabet are more evenly distributed than in backbone alphabets, where some states dominate and information is imbalanced. Uniform frequencies again improve information density and reduce false positives.
3. **Information density across the structure:** The highest information density is encoded in the conserved protein core, and the lowest in non-conserved coil/loop regions—the opposite pattern for backbone alphabets. 3Di therefore captures structural signal better in conserved regions while down-weighting flexible loops.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Foldseek/fig1.png" alt="avatar" style="zoom:100%;" /></div>

1. **Discretize the query structure into a 3Di sequence:** Foldseek converts the query structure into a sequence over the 3Di alphabet, which encodes three-dimensional interactions between residues; each position summarizes the geometry between a residue and its spatially nearest neighbor.
2. **Search with a pretrained 3Di substitution matrix:** Foldseek searches target libraries of 3Di sequences using a pretrained substitution matrix and MMseqs2’s double-diagonal k-mer prefilter and ungapped alignment prefilter. High-scoring hits are refined with local alignment (3Di by default) or global alignment (Foldseek-TM). The local stage combines 3Di and amino-acid substitution scores. Construction of the 3Di alphabet is described in Fig. 1b and Supplementary Figs. 1–3.
3. **Reduce false positives and compute reliable E-values:** To limit high-scoring false positives and provide trustworthy E-values, Foldseek subtracts the reverse-query alignment score from the raw score; applies composition bias correction within a sliding window of 40 residues; and estimates E-values from an extreme-value score distribution whose parameters are predicted by a neural network from 3Di composition and query length. Rankings use the geometric mean of the alignment bit score, alignment TM-score, and local distance difference test (LDDT).
4. **Homolog probability and ranking:** Foldseek estimates homolog probability for each hit from true versus false matches on SCOPe. Hits are sorted by the same geometric mean of bit score, alignment TM-score, and LDDT.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Foldseek/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Foldseek shows high sensitivity and precision in protein structure comparison with a large speed advantage. Relative to common structure aligners, it performs better at detecting relationships at the family and superfamily levels and is markedly faster than traditional tools.

### Methods

#### Overview

Foldseek’s core modules are built on the MMseqs2 framework and use several key techniques for high performance:

1. **3Di sequence alignment:** Structures are encoded with the 3Di alphabet and structure comparison is cast as 3Di sequence alignment, which captures structural similarity more accurately.
2. **Efficient prefilter:** The prefilter retains candidate pairs with high similarity by finding two similar, spaced 3Di k-mer matches on the same diagonal of the dynamic-programming matrix. Inexact matching boosts sensitivity while greatly reducing the number of full alignments.
3. **Multithreading and SIMD:** Multithreading parallelizes work across tasks; SIMD vector units execute many similar operations at once.

#### Descriptors for 3Di structural alphabet

The paper introduces a structural alphabet that describes tertiary interactions rather than the backbone. The 20 states of the three-dimensional interaction (3Di) alphabet encode the geometry between each residue *i* and its spatially nearest residue *j*. Compared with backbone alphabets, 3Di has three key advantages:

- Weaker dependence between consecutive letters.
- More uniform state frequencies, both of which increase information density and reduce false positives (FPs).
- Highest information density in the conserved core and lowest in non-conserved helix/loop regions—the inverse of backbone alphabets.

#### Foldseek

Foldseek has two main steps:

- Discretize each structure into a 3Di sequence, then search target 3Di sequences with a pretrained substitution matrix and MMseqs2’s double-diagonal k-mer prefilter and ungapped alignment prefilter.

- High-scoring matches are refined with local 3Di alignment (default) or global alignment with TM-align (Foldseek-TM). The local stage combines 3Di and amino-acid substitution scores.

<HR align=left color=#987cb9 SIZE=1>
