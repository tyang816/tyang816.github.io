---
layout: post
title: KDD-2021 Modeling Protein Using Large-scale Pretrain Language Model
categories: [BI]
tags: [protein, PLM]
proceedings: KDD
date: 2021-12-07
lang: en
alt_url: /zh/notes/bi/Modeling-Protein-Using-Large-scale-Pretrain-Language-Model/
permalink: /notes/bi/Modeling-Protein-Using-Large-scale-Pretrain-Language-Model/
---

> Paper: [Modeling Protein Using Large-scale Pretrain Language Model](http://arxiv.org/abs/2108.07435)
>
> Code: <https://github.com/THUDM/ProteinLM>

## ProteinLM: A 3-billion-parameter protein pre-trained model from WuDao·WenSu

### Abstract

A 3-billion-parameter language model is pre-trained on evolution-scale protein sequences to encode protein biological information in its representations. The model yields clear gains on five token-level and sequence-level downstream tasks, indicating that this large-scale model can accurately capture evolutionary information from single-sequence pre-training at evolution scale.

### Introduction

Traditional protein research is often split into experimentation and analysis. Experiments include purification, crystallization, and X-ray crystallography; analysis includes sequence alignment and molecular dynamics simulation. These approaches struggle with large-scale protein data.

The model is trained on the PFAM dataset with 3 billion parameters and surpasses TAPE in performance.

### Methodology

#### Training Objective

Training uses BERT-style MLM and NSP.

#### Downstream Classification Tasks

Three classification tasks correspond to token, sequence, and token-pair classification.

##### Secondary structure

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/fig1.png" alt="avatar" style="zoom:60%;" /></div>

This is a token-level task: given a protein sequence, the model outputs a label sequence of the same length indicating the secondary-structure state of each amino acid.

The dataset is CB513.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/loss1.png" alt="avatar" style="zoom:60%;" /></div>

##### Remote Homology

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/fig2.png" alt="avatar" style="zoom:60%;" /></div>

This is a sequence-level task that detects structural similarity among related inputs; there are 1,195 classes in total.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/loss2.png" alt="avatar" style="zoom:60%;" /></div>

##### Contact Prediction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/fig3.png" alt="avatar" style="zoom:60%;" /></div>

This task predicts whether pairs of amino acids in the folded structure are in contact; “in contact” means the distance in the folded structure is within 8 angstroms.

The dataset is from ProteinNet.

#### Downstream Regression Tasks

##### Fluorescence

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/fig4.png" alt="avatar" style="zoom:60%;" /></div>

Distinguishing protein sequences with different mutations can be difficult because computational cost grows exponentially with the number of mutations \(m\). The fluorescence prediction task evaluates the model’s ability to separate very similar protein sequences and to generalize to unseen mutation combinations.

##### Stability

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/fig5.png" alt="avatar" style="zoom:60%;" /></div>

This concerns the upper concentration limit at which a protein retains its native fold. The input is an amino acid sequence and the output is a continuous value predicting how well the protein maintains its folded structure.

### Result

#### Training

Two model variants were trained for three weeks on a cluster of 480 V100 GPUs using Megatron-LM.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/tab1.png" alt="avatar" style="zoom:60%;" /></div>

#### Evaluation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/tab2-tab3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/tab4-tab6.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ProteinLM/tab7.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
