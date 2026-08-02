---
layout: post
title: Nature Biotechnology-2022 Single-sequence protein structure prediction using a language model and deep learning
categories: [BI]
tags: [protein, PLM, structure prediction]
proceedings: Nature Biotechnology
date: 2022-10-03
lang: en
alt_url: /zh/notes/bi/Single-sequence-protein-structure-prediction-using-a-language-model-and-deep-lea/
permalink: /notes/bi/Single-sequence-protein-structure-prediction-using-a-language-model-and-deep-lea/
---

> Paper: [Single-sequence protein structure prediction using a language model and deep learning](https://www.nature.com/articles/s41587-022-01432-w)
>

## RGN2: direct single-sequence protein structure prediction

### Abstract

AlphaFold2 and related computational systems still face challenges for structure prediction: (1) proteins that cannot yield an MSA, including orphan and rapidly evolving proteins; (2) fast exploration of designed structures; (3) understanding the rules of spontaneous peptide folding in solution. The authors combine a recurrent geometric network (RGN) with a protein language model (AminoBERT). On average, RGN2 outperforms AlphaFold2 and RoseTTAFold on orphan and designed protein categories while reducing compute time by six orders of magnitude ($10^6$).

### Introduction

High performance of AlphaFold2 (AF2) on folded targets in the recent CASP14 prediction challenge shows that, when an MSA is available, machine learning can predict protein structures accurately enough to compare with experimental methods such as X-ray crystallography, cryo-electron microscopy, and nuclear magnetic resonance (NMR).

Predicting structure from a single sequence remains difficult: without homologous sequence information, roughly ~20% of proteins in genomes and ~11% in eukaryotic and viral proteomes lack usable MSAs. Protein design and studies that quantify how sequence variants affect function and immunogenicity still require single-sequence structure prediction.

Although RGN2 is less accurate than MSA-based methods for proteins where MSAs are available, it is six orders of magnitude faster.

### Result

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RGN2/fig1.png" alt="avatar" style="zoom:100%;" /></div>

RGN2 uses a Frenet–Serret formulation for protein geometry. This representation is inherently translation- and rotation-invariant—a key property of peptides in solution. An AF2rank-based protocol (ref. 28) refines predicted structures by inferring backbone and side-chain atoms.

- AminoBERT: 12-layer Transformer trained on 250M protein sequences from the UniParc sequence database

  - In each sequence, 2–8 consecutive residues are masked simultaneously

  - Chunk permutation: swaps contiguous protein segments to encourage the Transformer to capture global sequence context

  - AminoBERT is trained separately from RGN2 and does not require fine-tuning

- RGN2:

  - Local residue geometry is described by a single rotation matrix relating the previous frame to the current one. Compared with torsion angles used in RGN1, this rotation- and translation-invariant parameterization has two advantages:
    - Specifying a single biophysical parameter—the sequential Cα−Cα distance of ~3.8 Å (trans peptide bond geometry)—yields only physically realizable local geometry. This overcomes an RGN1 limitation where some torsion angles produced chemically unrealistic values
    - It reduces the cost of chain-extension computations by ~10×, which typically dominates RGN training and inference time
  - Training uses the ProteinNet12 dataset and single protein domains derived from the ASTRAL SCOPe dataset

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RGN2/tab1.png" alt="avatar" style="zoom:90%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RGN2/fig2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RGN2/fig4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RGN2/fig3.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/RGN2/fig5.png" alt="avatar" style="zoom:50%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
