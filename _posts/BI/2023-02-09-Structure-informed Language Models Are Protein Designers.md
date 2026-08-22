---
layout: post
title: ICML-2023 Structure-informed Language Models Are Protein Designers
categories: [BI]
tags: [protein, PLM, protein-design]
proceedings: ICML
date: 2023-02-09
lang: en
alt_url: /zh/notes/bi/Structure-informed-Language-Models-Are-Protein-Designers/
permalink: /notes/bi/Structure-informed-Language-Models-Are-Protein-Designers/
redirect_from:
  - "/bi/Structure-informed-Language-Models-Are-Protein-Designers/"
  - "/BI/Structure-informed-Language-Models-Are-Protein-Designers/"
---

> Paper: [Structure-informed Language Models Are Protein Designers](https://proceedings.mlr.press/v202/zheng23a/zheng23a.pdf)
>
> Code: <https://github.com/BytedProtein/ByProt>
>

## LM-DESIGN: Structure models prompt sequence models to refine protein design sequences

### Abstract

A general approach built on sequence-based protein language models (PLMs) inserts lightweight structural adapters into PLMs and applies iterative refinement during inference to effectively optimize generated protein sequences.

### Introduction

Structure-based protein design is mainly limited by:

1. Limited experimentally determined protein structure data

2. Regions of structural uncertainty

   From a biological perspective, protein structure sometimes carries insufficient information, especially for flexible regions such as loops and exposed surfaces. In these regions, residue identity is assumed to correlate less with structural context, whereas sequence knowledge is more useful but has largely been ignored. The authors validate this hypothesis and find that existing purely structure-based methods tend to produce functionally invalid sequences for such regions.

Therefore, structure models are used to prompt sequence models to generate sequences.

### Reprogramming pLMs for Structure-based Protein Design with Structure Surgery

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LM-DESIGN/fig1.png" alt="avatar" style="zoom:100%;" /></div>

Adding this structural adapter is a model-agnostic approach.

#### Training

Denoising autoencoding with conditional masked language modeling (CMLM); for sequence generation, this objective—exposing the model only to amino acids on the left—is preferable.

#### Inference with Iterative Refinement

The initial sequence comes from mapping the structure model to the 20 amino acids via a linear head; the method iteratively refines for T steps until optimization plateaus.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LM-DESIGN/tab1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LM-DESIGN/fig3-fig4.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LM-DESIGN/fig5.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LM-DESIGN/fig6-fig7.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LM-DESIGN/fig8.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/LM-DESIGN/tab3-fig10.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
