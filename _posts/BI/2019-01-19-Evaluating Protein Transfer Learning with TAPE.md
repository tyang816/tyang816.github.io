---
layout: post
title: NeurIPS-2019 Evaluating Protein Transfer Learning with TAPE
categories: [BI]
tags: [protein, PLM, benchmark]
proceedings: NeurIPS
date: 2019-01-19
lang: en
alt_url: /zh/notes/bi/Evaluating-Protein-Transfer-Learning-with-TAPE/
permalink: /notes/bi/Evaluating-Protein-Transfer-Learning-with-TAPE/
---

> Paper: [Evaluating Protein Transfer Learning with TAPE](https://papers.nips.cc/paper_files/paper/2019/hash/37f65c068b7723cd7809ee2d31d7861c-Abstract.html)
>
> Code: <https://github.com/songlab-cal/tape>
>
> Further reading: <https://zhuanlan.zhihu.com/p/401130363>

## TAPE: Tasks for Evaluating Protein Embeddings

### Abstract

Introduces five biologically motivated semi-supervised learning tasks to evaluate protein embeddings: Tasks Assessing Protein Embeddings (TAPE). The benchmark spans predictions related to protein structure, evolution, and protein engineering, and indicates that self-supervised learning models have substantial untapped potential in biology.

### Background

1. Protein representation: a protein of length $L$ is represented as an amino acid sequence over 25 letters: $(x_1, x_2, \ldots, x_L)$. The 25 symbols comprise 20 standard amino acids, 2 non-standard amino acids, 2 ambiguous amino acids, and 1 unknown amino acid.
2. Protein 3D structure: primary structure (amino acid sequence), secondary structure (local features), tertiary structure (global features).
3. Homologs: two proteins that share a common ancestor but may differ substantially in sequence because they diverged long ago.
4. In this work, the authors primarily use sequence identity (amino acid sequence alignment) to quantify evolutionary relationships.

### Dataset

Pre-training corpus: a large unlabeled sequence dataset, Pfam (a database of 31M protein domains).

Supervised datasets: task-specific, with between 8,000 and 50,000 training examples.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TAPE/fig1.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TAPE/fig2.png" alt="avatar" style="zoom:60%;" /></div>

#### Task 1: Secondary Structure Prediction

Fig. 1a

Definition: a Seq2Seq task in which each input amino acid $x_i$ is mapped to a label $y_i \in \{\mathrm{Helix\,(H)}, \mathrm{Strand\,(E)}, \mathrm{Other\,(C)}\}$.

Impact: secondary structure is an important descriptor of protein structure; secondary structure predictors are also commonly used to provide richer input features for higher-level models.

Generalization: assesses how well models learn local structure.

#### Task 2: Contact Prediction

Fig. 1b

Definition: a pairwise prediction task in which amino acids $x_i$ and $x_j$ from a protein are mapped to a label $y_{ij} \in \{0, 1\}$, indicating whether they are in contact.

Impact: provides strong global information for robust modeling of full 3D protein structure.

Generalization: probes understanding of the overall protein context.

#### Task 3: Remote Homology Detection

Fig. 1c

Definition: a sequence classification task in which each sequence $x$ is assigned a label $y \in \{1, \ldots, 1195\}$ corresponding to a possible fold.

Impact: relevant to microbiology and medicine, e.g., detecting newly emerging antibiotic resistance genes.

Generalization: tests the ability to recognize structural similarity on distantly related inputs.

#### Task 4: Fluorescence Landscape Prediction (Protein Engineering Task)

Fig. 2a

Definition: a regression task in which each input protein $x$ is associated with a label $y \in \mathbb{R}$ reflecting the log-fluorescence intensity of $x$.

Impact: enables more efficient exploration of the fitness landscape.

Generalization: tests discrimination among very similar inputs and generalization to unseen mutation combinations.

#### Task 5: Stability Landscape Prediction

Fig. 2b

Definition: a regression task in which each input protein $x$ is associated with a label $y \in \mathbb{R}$ representing folding stability.

Impact: helps identify better candidates for costly protein engineering experiments.

Generalization: tests generalization from broad sequence samples and localization of information in neighborhoods of a few sequences.

### Model and Experimental Setup

Models:

The authors evaluate three NLP-inspired architectures: Transformer, residual network, and LSTM.

Baselines: CNN/LSTM (Bepler, Tristan, and Bonnie Berger), LSTM (Alley, Ethan C., et al.), one-hot baseline, and alignment-based baselines.

Results:

1. Self-supervised pre-training almost always improves performance.
2. For structure-related tasks, NLP-inspired models underperform alignment-based baselines.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TAPE/tab2.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
