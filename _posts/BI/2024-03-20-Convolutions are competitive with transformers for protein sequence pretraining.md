---
layout: post
title: Cell Systems-2024 Convolutions are competitive with transformers for protein sequence pretraining
categories: [BI]
tags: [protein, PLM, CNN, transformer]
proceedings: Cell Systems
date: 2024-03-20
lang: en
alt_url: /zh/notes/bi/Convolutions-are-competitive-with-transformers-for-protein-sequence-pretraining/
permalink: /notes/bi/Convolutions-are-competitive-with-transformers-for-protein-sequence-pretraining/
---

> Paper: [Convolutions are competitive with transformers for protein sequence pretraining](https://www.cell.com/cell-systems/fulltext/S2405-4712(24)00029-2)
>
> Code: <https://github.com/microsoft/protein-sequence-models/tree/main>

## CARP: convolutional masked networks for protein language model pre-training

### Abstract

CNNs can match transformers with competitive performance and strong results on many downstream tasks, including structure prediction, zero-shot mutation effect prediction, and out-of-domain fitness prediction.

### Introduction and background

A major limitation of transformers is that compute and memory scale quadratically with input sequence length, which leads to strict length caps during training—for example, ESM’s maximum length is 1022. UniRef50 contains 42M sequences, of which 1.1M (2.6%) exceed 1022, including many proteins of broad interest such as the SARS-CoV-2 spike glycoprotein and *Streptococcus pyogenes* CRISPR-associated endonuclease Cas9.

CARP (**C**onvolutional **A**utoencoding **R**epresentations of **P**roteins) was trained on the March 2020 release of UniRef50.

### Convolutional protein sequence masked language models

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/fig1.png" alt="avatar" style /></div>

15% of tokens are masked: 80% are replaced with a mask token, 10% are replaced with a randomly chosen amino acid, and 10% are left unchanged.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/fig2.png" alt="avatar" style /></div>

### Downstream Tasks

#### Protein Structure

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/tab1.png" alt="avatar" style /></div>

#### Zero-shot Mutation Effect Prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/fig3.png" alt="avatar" style /></div>

#### Out-of-Domain Fitness Prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/tab2-tab3.png" alt="avatar" style /></div>

#### In-Domain Property Prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CARP/tab4.png" alt="avatar" style /></div>

<hr align="left" color="#987cb9" size="1">

