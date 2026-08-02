---
layout: post
title: International Journal of Molecular Sciences-2023 DeepTP：A Deep Learning Model for Thermophilic Protein Prediction
categories: [BI]
tags: [protein]
proceedings: International Journal of Molecular Sciences
date: 2023-01-22
lang: en
alt_url: /zh/notes/bi/DeepTP：A-Deep-Learning-Model-for-Thermophilic-Protein-Prediction/
permalink: /notes/bi/DeepTP：A-Deep-Learning-Model-for-Thermophilic-Protein-Prediction/
---

> Paper: [DeepTP：A Deep Learning Model for Thermophilic Protein Prediction](https://doi.org/10.3390/ijms24032217)
>
> Code: <https://github.com/ZhaoDove/DeepTP_predictor>
>
> Web server: <http://www.YangLabMI.org.cn/DeepTP>

## DeepTP: Feature selection and feature fusion for binary classification of thermostable proteins

## Abstract

The authors propose DeepTP, a model for predicting thermophilic proteins based on self-attention and multi-channel feature fusion. They first introduce a new dataset of 20,842 proteins, then extract features using convolutional and bidirectional LSTM networks.

### Introduction

Protein engineering and biotechnology research depend on protein thermal stability. The high thermal stability of thermophilic proteins gives them clear advantages in industrial production. An extracellular isothermal keratinase (KERAK-29) purified from thermophilic actinomycetes isolated from poultry compost exhibits high heat tolerance and fast catalytic kinetics. Mesophilic xylanases from thermophilic fungi play broad roles in food, feed, and bioconversion of lignocellulose.

Distinguishing thermophilic from mesophilic proteins by biological experiments is time-consuming, labor-intensive, and expensive. Computational methods can identify thermophilic and mesophilic proteins quickly and accurately from large-scale sequence information, which is an important topic in the field of protein thermal stability.

Protein thermal stability is closely related to biological properties such as amino acid composition, hydrogen bonds, salt bridges, and disulfide bonds. Studies have found that thermophilic proteins contain more hydrophobic, charged, and aromatic residues than mesophilic proteins. Different dipeptide contents and different types of hydrogen bonds also affect thermal stability. In some experiments, factors such as salt bridges and disulfide bonds have been shown to improve thermal stability. These biological properties are therefore important for predicting thermophilic proteins.

Most computational approaches for thermophilic protein prediction rely on traditional machine learning. In early studies on smaller datasets, researchers derived amino acid pairs, amino acid distribution, and basic features from primary sequence, then applied classical algorithms such as logistic model trees and support vector machines (SVMs) to predict thermophilic proteins.

Methods such as iThermo consider sequence information alone and do not fully exploit properties inherent in the sequence itself. This work uses CNNs to capture local sequence patterns and BiLSTM to model long- and short-range dependencies.

### Results

#### Cross-Validation Performance of DeepTP

To build a model that accurately distinguishes thermophilic from mesophilic proteins, the authors extracted 797 features from six protein descriptor groups: amino acid composition (AAC), dipeptide composition (DPC), composition-transition distribution (CTD), quasi-sequence-order descriptors (QSO), pseudo-amino-acid composition (PAAC), and amphiphilic pseudo-amino-acid composition (APAAC).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepTP/tab1.png" alt="avatar" style="zoom:100%;" /></div>

Because the feature space was large, LightGBM was used for recursive selection, leaving 205 features in the end.

#### Performance Comparison of DeepTP with Other Methods in the Independent Test Set and Validation Set

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepTP/tab2-fig1.png" alt="avatar" style="zoom:100%;" /></div>

TMPpred is a traditional machine learning method (SVM) that uses seven features.

#### Algorithm Comparison

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepTP/fig3.png" alt="avatar" style="zoom:100%;" /></div>

Encoding schemes, features used, and ablation of self-attention.

### Discussion

There is still no large-scale public benchmark dataset for thermophilic protein prediction. The authors therefore constructed a reliable large-scale benchmark, computed six groups of biological features, and used RFECV to filter an optimal feature subset.

Because benchmark data were lacking, they built two independent test sets and obtained a dataset from TMPpred for validation.

### Materials and Methods

#### Datasets

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepTP/fig4.png" alt="avatar" style="zoom:100%;" /></div>

#### Features

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepTP/tab3.png" alt="avatar" style="zoom:100%;" /></div>

#### Feature Selection

Excessive dimensionality makes training convergence difficult.

Following the feature selection strategy used in ProTstab, the authors applied LightGBM with recursive feature elimination based on cross-validation (RFECV). RFE requires specifying the number of features to retain, but the effective count is often unknown. Scoring different feature subsets with cross-validation combined with RFE and selecting the best subset is an effective selection scheme. In addition to deep learning–derived representations, 205 biological features were retained to train the model.

#### Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepTP/fig5.png" alt="avatar" style="zoom:100%;" /></div>

Inputs:

- Amino acid composition encoding: one-hot (letter) encoding of amino acids
- Amino acid physicochemical property encoding: amino acids grouped into six classes—hydrophobic (V, I, L, F, M, W, Y, C), negatively charged (D, E), positively charged (R, K, H), conformation-related (G, P), polar (N, Q, S), and other (A, T)
- Protein sequence-based biological features: 205-dimensional feature vector

#### Evaluation Metrics

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepTP/frm9-frm14.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DeepTP/frm15-frm16.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
