---
layout: post
title: ACS Synthetic Biology-2019 Machine Learning Applied to Predicting Microorganism Growth Temperatures and Enzyme Catalytic Optima
categories: [BI]
tags: [protein, PLM]
proceedings: ACS Synthetic Biology
date: 2019-01-21
lang: en
alt_url: /zh/notes/bi/Machine-Learning-Applied-to-Predicting-Microorganism-Growth-Temperatures-and-Enz/
permalink: /notes/bi/Machine-Learning-Applied-to-Predicting-Microorganism-Growth-Temperatures-and-Enz/
---

> Paper: [Machine Learning Applied to Predicting Microorganism Growth Temperatures and Enzyme Catalytic Optima](https://pubs.acs.org/doi/abs/10.1021/acssynbio.9b00099)
>
> Code: <https://github.com/EngqvistLab/Tome>

## Tome: Machine learning on dipeptides to predict organism OGT and enzyme temperature optima

### Abstract

Machine learning methods accurately predict optimal growth temperature (OGT) directly from proteome-wide 2-mer amino acid composition across bacteria, archaea, and microbial eukaryotes. OGT data are then combined with enzyme amino acid sequences to develop a second machine learning model that predicts the optimal catalytic temperature (Topt) of enzymes. Topt is predicted for 6.5 million enzymes spanning 4,447 enzyme classes, and the resulting dataset is made available to the research community.

### Introduction

Working with OGT data poses two major challenges:

- Experimental OGT measurements often include substantial private data that are not readily accessible, and the experimental workflows are cumbersome.
- Using OGT to infer enzyme properties is coarse: an enzyme’s optimum may lie well above or below the organism’s OGT; Spearman correlation between individual enzymes and OGT is only 0.48, and enzymes from thermophiles may have optimal temperatures lower than one might expect.

Predicting OGT from amino acid composition or combinations of 2-mer amino acids is feasible. For example, Zeldovich showed that in a dataset of 204 archaeal and bacterial proteomes, the sum of fractions of seven amino acids—I, V, Y, W, R, E, and L—correlates with OGT with a coefficient as high as 0.93.

Most prior work targets stability changes upon protein mutation; only a few studies predict thermal stability of proteins.

This paper predicts protein-related temperatures in three steps:

- Build a machine learning model that accurately predicts OGT.
- Use OGT together with sequence information to improve prediction of enzyme stability (temperature optima).
- Predict Topt for 6.5M enzymes.

### Results and Discussion

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tome/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### Collection of Optimal Growth Temperature and Proteomes of Microorganisms

OGT data were downloaded from https://doi.org/10.5281/zenodo.1175608.

For each organism in the annotated and unannotated datasets, global monomer amino acid and dipeptide frequencies were computed. However, some organisms in the datasets contain only a small number of protein sequences, so amino acid composition derived from those sequences may not represent the true composition of the complete proteome. Because it was unclear how many protein sequences are required to obtain a stable amino acid composition, three distinct metrics were designed to test how much sequence data is needed for stable composition estimates.

#### OGT Can Be Accurately Predicted from Amino Acid Composition of the Proteome

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tome/fig2.png" alt="avatar" style="zoom:70%;" /></div>

Nonlinear models perform substantially better than linear models.

#### Improved Estimation of Enzyme Temperature Optima Using Machine Learning

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tome/fig3.png" alt="avatar" style="zoom:100%;" /></div>

#### Annotating Enzymes in BRENDA Using OGT and Predicted Topt

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Tome/fig4.png" alt="avatar" style="zoom:100%;" /></div>

### Methods

#### Estimation of Threshold

- Absolute slope value (|a_i|) from linear regression of residue count versus amino acid frequency
- Frequency variance of the selected frequency (σ_i²)
- Range (R_i): difference between maximum and minimum frequency (i indexes each of the 20 amino acids)

#### Machine Learning Workflow for OGT Model

The OGT workflow used single amino acid frequencies (AA), dipeptide frequencies (dipeptides), or both (AA + dipeptides). Algorithms included linear regression (linear), Bayesian ridge, elastic net, decision trees, support vector regression (SVR), and random forest.

#### Machine Learning Workflow for Topt Model

- 20 amino acid frequencies (AA)
- 400 dipeptide frequencies (dipeptides)
- OGT of the source organism
- Basic features including protein length, isoelectric point, molecular weight, aromaticity, instability index, GRAVY, and partial content of three secondary-structure elements: helix, turn, and sheet.

<HR align=left color=#987cb9 SIZE=1>
