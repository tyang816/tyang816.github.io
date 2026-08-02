---
layout: post
title: eLife-2024 Sensitive remote homology search by local alignment of small positional embeddings from protein language models
categories: [BI]
tags: [protein, homology, PLM]
proceedings: eLife
date: 2024-03-15
lang: en
alt_url: /zh/notes/bi/Sensitive-remote-homology-search-by-local-alignment-of-small-positional-embeddin/
permalink: /notes/bi/Sensitive-remote-homology-search-by-local-alignment-of-small-positional-embeddin/
---

> Paper: [Sensitive remote homology search by local alignment of small positional embeddings from protein language models](https://elifesciences.org/articles/91415)
>
> Code: <https://github.com/seanrjohnson/hmmer3di> and <https://github.com/seanrjohnson/esmologs>

## ESM-3B-3Di: ESM2 + 1D CNN predicts 3Di for homology search

### Abstract

Profile- and structure-based methods require slow preprocessing when extended into the twilight zone of sequence similarity. In recent years, deep learning approaches using whole-protein and per-residue encodings have shown the ability to capture long-range homology. This paper shows that low-dimensional positional embeddings can directly enable speed-optimized local search algorithms: ESM 3B converts primary-structure sequences into the 3Di vocabulary, which serves as input to optimized Foldseek, HMMER3, and HH-suite search algorithms.

### Introduction

Assigning a putative function to a protein without experimental characterization is often done by finding experimentally characterized proteins related in sequence, structure, or evolution and transferring that annotation. Common methods include BLASTP, PSI-BLAST, HMMER3, HH-suite3, and MMseqs2.

Sequence profiles are derived from MSAs and modeled with hidden Markov models (HMMs), as in HMMER and HH-suite, which encode amino-acid probabilities and insertion/deletion probabilities at each position. Because these methods depend on database construction and retrieval preprocessing, the overhead is substantial.

Structure-based retrieval is more sensitive than sequence-based retrieval. With advances such as AlphaFold2 and ESMFold and growth of protein structure databases, fast structure search methods have been developed, including Foldseek, RUPEE, and Dali.

### Results

#### Using ESM-2 3B to generate small positional embeddings

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-3B-3Di/fig1.png" alt="avatar" style="zoom:100%;" /></div>

As in Figure 1A, probabilities are generated for HMM tools; an additional two-layer 1D CNN was trained to convert ESM2 3B input amino acid sequences into 3Di, as in Figure 1B.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-3B-3Di/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Figure 2 shows an example of alignment with HMMs.

#### Comparison of newly developed embedding methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-3B-3Di/fig3.png" alt="avatar" style="zoom:100%;" /></div>

Predicted profiles and 3Di sequences were generated from Pfam 32 splits and converted into formats for different search tools. For each Pfam family, the held-out test set was constrained to at most 25% sequence similarity to the training set.

Foldseek search using ESM-2 3B 3Di (Figures 3C,D) performed best among all newly tested methods.

#### Benchmarking of ESM-2 3B 3Di against emerging and established search methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-3B-3Di/fig4.png" alt="avatar" style="zoom:100%;" /></div>

### Discussion

Better than PLM-BLAST, but roughly comparable to ProtT5.

### Methods

#### Alignments

MSA with MAFFT (v7.505): --anysymbol --maxiterate 1000 --globalpair, BLOSUM62 substitution matrix, 3Di substitution matrix from Foldseek

#### Fine-tuning ESM-2 3B to convert amino acid sequences into 3Di sequences

Training set: Foldseek AlphaFold UniProt50 dataset split (9:0.5:0.5)

#### Predicting profiles to generate HH-suite hhm files and HMMER3 hmm files from single sequences

1. Because ESM2 tends to predict M for the first token, which is not typical in Pfam, the first token is discarded.
2. Mask positions 1, 8, ...
3. Obtain logits for each mask.
4. Shift the mask one position to the right.
5. Repeat six times and store logits at each position.

<HR align=left color=#987cb9 SIZE=1>
