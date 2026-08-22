---
layout: post
title: NeurIPS-2021 FLIP：Benchmark tasks in fitness landscape inference for proteins
categories: [BI]
tags: [protein, benchmark]
proceedings: NeurIPS
date: 2021-10-11
lang: en
alt_url: /zh/notes/bi/FLIP：Benchmark-tasks-in-fitness-landscape-inference-for-proteins/
permalink: /notes/bi/FLIP：Benchmark-tasks-in-fitness-landscape-inference-for-proteins/
redirect_from:
  - "/bi/FLIP：Benchmark-tasks-in-fitness-landscape-inference-for-proteins/"
  - "/BI/FLIP：Benchmark-tasks-in-fitness-landscape-inference-for-proteins/"
---

> Paper: [FLIP：Benchmark tasks in fitness landscape inference for proteins](https://openreview.net/forum?id=p2dMLEwL8tF)
>
> Benchmark: <https://benchmark.protein.properties/>
> 

## FLIP: A supervised benchmark for protein fitness prediction

### Abstract

Machine learning approaches that capture the relationship between protein sequence and function are often framed as fitness landscape inference. Benchmarks such as CASP and CAFA evaluate protein structure and function prediction, respectively, but are not aligned with the goals of protein engineering. This work introduces Fitness Landscape Inference for Proteins (FLIP), a benchmark that enables fast, supervised prediction via representation learning in protein engineering. FLIP aggregates experimental data on adeno-associated virus stability for gene therapy, stability and immunoglobulin binding of protein domain B1, and thermostability across multiple protein families.

### Introduction

The ability of a protein to perform its required function is determined by its amino acid sequence, typically mediated by folding into a three-dimensional structure.

Current biophysical and structure-prediction methods cannot reliably map sequence to functional performance. Protein engineering therefore relies heavily on directed evolution (DE): randomly modifying (mutating) a starting sequence, measuring fitness across variants, selecting improvements, and iterating until performance is sufficient. Machine learning methods that predict fitness from sequence can use positive and negative labels to screen mutants, often reaching higher fitness with fewer measurements than conventional directed evolution, without requiring detailed structural or mechanistic knowledge.

### Related Work

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/FLIP/tab1.png" alt="avatar" style="zoom:100%;" /></div>

The Critical Assessment of Protein Structure Prediction (CASP) targets protein structure prediction.

The Critical Assessment of Function Annotation (CAFA) focuses on assigning Gene Ontology (GO) terms—standardized classifications of protein function—to proteins.

Tasks Assessing Protein Embeddings (TAPE) evaluates how different pretraining schemes and models affect prediction of protein properties.

Envision compiled dozens of single-amino-acid variant (SAV) datasets but does not cover other types of sequence variation.

DeepSequence collected 42 deep mutational scanning (DMS) datasets.

None of these efforts define a standard train/test split.

### Landscapes and Splits

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/FLIP/fig1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/FLIP/tab2.png" alt="avatar" style="zoom:100%;" /></div>

FLIP is designed to address two foundational questions about machine learning on protein sequences:

- Can a model capture complex fitness effects beyond mutations relative to a parent sequence?
- Can a model generalize across proteins for which fitness reflects very different functional readouts?

Prior work such as DeepSequence and Envision supports the second question well but not the first.

TAPE’s fluorescence prediction task evaluates the first question but not the second.

To probe both questions, the authors curate three published landscapes (Table 2) and define 15 splits to test generalization under distinct regimes. Naive random splits are notoriously misleading for sequence-to-function prediction because sequences are not independent and identically distributed (i.i.d.) but structured by evolutionary history.

#### GB1

##### Motivation

Predicting interactions among mutations—epistasis—captures non-additive effects on fitness and is known to constrain evolutionarily accessible paths.

##### Landscape

GB1 is the immunoglobulin-binding domain of protein G from streptococci. The original study measured fitness for 149,361 of 160,000 possible combinatorial mutants at four sites.

##### Splits

More than 96% of amino acid mutations yield non-binding or weak-binding variants; among 149,361 sequences, 143,539 have fitness below 0.5 (wild-type fitness = 1; fitness 0 denotes non-binding).

To ensure models learn nontrivial signal, nonfunctional sequences are downsampled before training set construction: 5,822 sequences with fitness above 0.5 and 2,911 randomly sampled sequences with fitness at or below 0.5. From this pool, five split regimes are defined:

- **Train on single mutants (1-vs-rest)**
- **Train on single and double mutants (2-vs-rest)**
- **Train on single, double and triple mutants (3-vs-rest)**
- **Train on low fitness, test on high (low-vs-high)**: train on negative (low-fitness) examples, test on positive (high-fitness) examples
- **Sampled**: random 80:20 split

#### AAV

##### Motivation

Protein engineering often mutates only a localized region—for example, a known protein–protein interface as a subset of positions. For long sequences, accurate prediction on such a positional subset remains meaningful.

##### Landscape

The adeno-associated virus (AAV) capsid protein helps the virus deliver its DNA payload into target cells.

A 28-amino-acid window (positions 561–588 of VP-1) was assayed for variants with one to 39 mutations; this constitutes the sampled pool. Fitness was also measured for sequences chosen or designed by various machine learning models—the designed pool.

##### Splits

- **Sampled-designed (Mut-Des)**
- **Designed-sampled (Des-Mut)**
- **Train on single mutants (1-vs-rest)**
- **Train on single and double mutants (2-vs-rest)**
- **Train on mutants with up to seven changes (7-vs-rest)**
- **Train on low fitness, test on high (low-vs-high)**
- **Sampled**: random 80:20 split

#### Thermostability

##### Motivation

Thermostability matters industrially and is a common starting point in directed evolution. Prediction is difficult because the landscape is not necessarily smooth; in some families, a single substitution can confer or abolish stability.

##### Landscape

48,000 proteins from 13 species, including global and local mutants.

##### Splits

- **Mixed**: cluster all sequences with MMseqs2 at 20% sequence identity, pick cluster representatives to form a split; use all sequences in 80% of clusters for training and the remainder for testing
- **Human**: same procedure restricted to human sequences
- **Human-cell**: same procedure restricted to sequences from one human cell line

### Baseline algorithms

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/FLIP/tab3.png" alt="avatar" style="zoom:100%;" /></div>

For protein language model baselines, per-residue embeddings are pooled in three ways:

- **Per amino acid (per AA)**: sequence-level pooling with a 1D attention layer for regression
- **Mean**: mean pooling over all residues in the full-length protein
- **Mean over subset (mut mean)**: mean pooling over residues in the mutated region of interest

During training, 10% of the training set is held out at random as a validation set.

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/FLIP/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/FLIP/tab5-tab6.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/FLIP/tab7.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
