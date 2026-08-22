---
layout: post
title: Nature Biotechnology-2022 Learning protein fitness models from evolutionary and assay-labeled data
categories: [BI]
tags: [protein, PLM, fitness-prediction]
proceedings: Nature Biotechnology
date: 2022-01-17
lang: en
alt_url: /zh/notes/bi/Learning-protein-fitness-models-from-evolutionary-and-assay-labeled-data/
permalink: /notes/bi/Learning-protein-fitness-models-from-evolutionary-and-assay-labeled-data/
redirect_from:
  - "/bi/Learning-protein-fitness-models-from-evolutionary-and-assay-labeled-data/"
  - "/BI/Learning-protein-fitness-models-from-evolutionary-and-assay-labeled-data/"
---

> Paper: [Learning protein fitness models from evolutionary and assay-labeled data](https://www.nature.com/articles/s41587-021-01146-5)
>
> Code: <https://github.com/chloechsu/combining-evolutionary-and-assay-labelled-data>
>

## CEALD: One-hot encoded mutant amino acids with supervised fitness training

### Abstract

Machine learning approaches to protein fitness prediction either learn from unlabeled, evolution-related sequences or from experimentally validated, labeled variant sequences. The authors propose a simple combined method that outperforms more elaborate models. The core idea is ridge regression on site-specific amino acid features, augmented with a probability-density feature derived from evolutionary sequences. A variational autoencoder (VAE) probability-density model yields the best results.

### Introduction

In practice we re-engineer proteins so that they better match desired functions—for example, increasing enzyme activity, brightening fluorescent proteins, or shifting an existing function to a related but distinct one. Here we focus on machine learning for protein fitness prediction.

Two mainstream machine learning strategies dominate fitness assessment:

- **Implicit fitness constraints from evolution.** Natural protein sequences constitute evolutionary data; homolog search builds a probability-density model over that set of sequences.
  - Although these evolution-related homolog sets are not directly tied to the property we wish to evaluate, homolog search itself supplies an implicit, weak, positive label constraint. Compared with purely unsupervised learning, this yields a weak-positive signal for learning.
  - Training such models requires hundreds to millions of sequences.
- **Supervised regression on assay-labeled variants.** Variant sequences are labeled from experimental measurements.
  - Supervised datasets likewise range from hundreds to millions of examples.
  - The mutant set may be restricted to one or two mutations per sequence or may be unevenly distributed.
  - Because data are limited, they cannot fully characterize the protein fitness landscape, but they provide a strong starting point.

Recent work combines both paradigms: weak-positive learning on evolution-related sequences together with supervised learning on labeled protein variants. For many practical settings, only hundreds of labeled proteins are available, so combining the two approaches is essential.

### Results

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CEALD/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### Published machine learning methods assessed

We benchmarked 13 machine learning methods for protein fitness prediction, using evolutionary data, experimental data, or both; some methods also use additional training data such as UniRef50.

Three purely evolutionary models: hidden Markov model (HMM), Potts model (EVmutation), and VAE (DeepSequence).

Two supervised models: linear regression on one-hot encoded, site-specific amino acid features fit to experimental data, and ESM-1b fine-tuned in a supervised manner on experimental datasets.

#### A simple baseline approach

We propose a simple method that combines evolutionary and experimental data and is competitive with more complex or costly approaches.

For any pretrained evolutionary probability-density model, we perform ridge regression on one-hot, site-specific amino acid features to augment the sequence density score; we call this procedure “augment.”

Because the regression augmentation uses only site-specific amino acid features, the Bayesian update concentrates primarily on site-specific parameters.

#### Assay-labeled and evolutionary data sets

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CEALD/fig2.png" alt="avatar" style="zoom:100%;" /></div>

Evaluation covers 19 mutational datasets, including all EVmutation benchmarks and GFP datasets; 16 contain only single-site mutations. MSAs were taken directly from EVmutation.

#### Experimental overview

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CEALD/fig3.png" alt="avatar" style="zoom:60%;" /></div>

For each dataset, 20% of samples were held out for testing while training set size was varied.

Model performance was assessed with Spearman rank correlation and normalized discounted cumulative gain (NDCG).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CEALD/fig4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CEALD/fig5.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CEALD/fig6.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
