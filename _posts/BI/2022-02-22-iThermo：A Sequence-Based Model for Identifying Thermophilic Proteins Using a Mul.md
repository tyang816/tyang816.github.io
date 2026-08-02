---
layout: post
title: Frontiers in Microbiology-2022 iThermo：A Sequence-Based Model for Identifying Thermophilic Proteins Using a Multi-Feature Fusion Strategy
categories: [BI]
tags: [protein]
proceedings: Frontiers in Microbiology
date: 2022-02-22
lang: en
alt_url: /zh/bi/iThermo：A-Sequence-Based-Model-for-Identifying-Thermophilic-Proteins-Using-a-Mul/
permalink: /bi/iThermo：A-Sequence-Based-Model-for-Identifying-Thermophilic-Proteins-Using-a-Mul/
---

> Paper: [iThermo：A Sequence-Based Model for Identifying Thermophilic Proteins Using a Multi-Feature Fusion Strategy](https://www.frontiersin.org/articles/10.3389/fmicb.2022.790063/full)
>
> Implementation: <http://lin-group.cn/server/iThermo/index.html>

## iThermo: Hand-crafted features, feature selection, and MLP prediction

### Abstract

Thermophilic proteins are important in biotechnology and industrial processes, so a fast and accurate method is needed to identify them. The authors built a benchmark dataset of 1,368 thermophilic and 1,445 non-thermophilic proteins and used an MLP with a multi-feature fusion strategy to distinguish thermophilic from non-thermophilic proteins, reaching 96.26% accuracy.

### Introduction

In general, organisms that survive at an optimal growth temperature (OGT) below 50°C are considered mesophiles, whereas those that survive at an OGT of 50°C or above are called thermophiles; their proteins are thermostable and can effectively withstand temperatures up to 120°C.

Many studies have addressed thermophilic proteins. Protein thermal stability has been linked to **amino acid distribution**, **dipeptide composition** (DC), **hydrophobicity**, **hydrogen bonds**, **residues** and **inter-residue contacts**, **helical polar surface**, **side-chain interactions**, and **salt bridges**.

### Materials and Methods

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/fig1.png" alt="avatar" style /></div>

#### Dataset

In earlier work, researchers used 50°C as a cutoff to build a benchmark dataset. That threshold is not fully objective, because proteins can remain stable above the OGT of the source organism; negative samples below 50°C may still function above 60°C, which causes ambiguity. For example, proteins from a microbe living at 45°C may not denature at 60°C.

To reduce this confusion, the authors classified proteins as thermophilic if they are stable above 60°C and non-thermophilic if below 30°C.

All proteins were retrieved from UniPort. The following steps were applied to ensure data quality:

*   Retain manually curated proteins
*   Exclude sequences with ambiguous residues
*   Exclude fragments of other proteins
*   Exclude proteins inferred only from prediction or homology
*   To reduce redundancy and homology bias, CD-HIT was used with a 30% sequence identity cutoff

The final benchmark contained 1,443 non-thermophilic and 1,366 thermophilic proteins, with an 80:20 train–test split.

#### Feature Extraction

Seven protein feature types were generated with the iFethare program.

##### Amino Acid Composition

Frequency of each of the 20 amino acids in the sequence.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm1.png" alt="avatar" style /></div>

##### Traditional Pseudo Amino Acid Composition

Residue correlation is described from physicochemical properties; each protein *P* can be represented in a (20 + λ)-dimensional space:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm2.png" alt="avatar" style /></div>

Each dimension is computed as follows, where `$f_u$` is the amino acid frequency and `$\tau_k$` is the *k*-tier sequence-correlation factor:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm3.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm4-frm5.png" alt="avatar" style /></div>

Here `$H_1(R_i)$` is hydrophobicity, `$H_2(R_i)$` is hydrophilicity, and `$M(R_i)$` is the side-chain mass of amino acid Ri.

##### Amphiphilic Pseudo Amino Acid Composition

This descriptor captures partial sequence-order effects of amino acids based on hydrophobicity and hydrophilicity.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm6.png" alt="avatar" style /></div>

##### Composition of *k*-Spaced Amino Acid Pairs

CKSAAP describes the frequency of amino acid pairs separated by *k* residues, with *k* from 0 to 5.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm7.png" alt="avatar" style /></div>

*F*<sub>0</sub> denotes CKSAAP at *k* = 0; *F* is the frequency of zero-spaced amino acid pairs, and *n*<sub>0</sub> is the total count of zero-spaced pairs.

##### Dipeptide Composition

Dipeptide composition is the frequency of each dipeptide in the protein sequence.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm8.png" alt="avatar" style /></div>

##### Dipeptide Deviation From Expected Means

This measure combines dipeptide composition (DC), theoretical mean (Tm), and theoretical variance (Tv).

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm9.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm10.png" alt="avatar" style /></div>

*C*<sub>g</sub> is the total number of codons encoding amino acid *g*, and *C*<sub>h</sub> is the total for amino acid *h*. *C*<sub>N</sub> is the number of codons excluding stop codons.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm11.png" alt="avatar" style /></div>

*N* is the sequence length.

##### Composition, Transition, and Distribution

By amino acid property, the 20 types are grouped into polar, neutral, and hydrophobic. Under the CTD definition, Composition (C) is the percentage of polar, neutral, and hydrophobic residues; Transition (T) is the frequency of transitions between groups; Distribution (D) is the position of the first 25%, 50%, 75%, and 100% of residues in each group.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm12.png" alt="avatar" style /></div>

#### Feature Selection

Analysis of variance (ANOVA) selects an optimal feature subset via F-values. The F-value is the ratio of between-class variance to within-class variance for a feature; larger F-values indicate greater contribution to separating positive and negative samples.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm13.png" alt="avatar" style /></div>

`$s^2_b$` is the between-class variance and `$s^2_w$` is the within-class variance for each feature.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm14-frm15.png" alt="avatar" style /></div>

*K* is the total number of features and *N* is the total number of samples.

#### Classification

SVM, random forest, *k*-nearest neighbors, and multilayer perceptron.

#### Performance Evaluation

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/frm20-frm23.png" alt="avatar" style /></div>

### Results and Discussion

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/tab1.png" alt="avatar" style /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/tab2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/fig2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/iThermo/fig3.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">
