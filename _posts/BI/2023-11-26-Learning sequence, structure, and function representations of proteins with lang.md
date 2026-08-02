---
layout: post
title: bioRxiv-2023 Learning sequence, structure, and function representations of proteins with language models
categories: [BI]
tags: [protein, PLM, function, MOE]
proceedings: bioRxiv
date: 2023-11-26
lang: en
alt_url: /zh/bi/Learning-sequence,-structure,-and-function-representations-of-proteins-with-lang/
permalink: /bi/Learning-sequence,-structure,-and-function-representations-of-proteins-with-lang/
---

> Paper: [Learning sequence, structure, and function representations of proteins with language models](http://biorxiv.org/lookup/doi/10.1101/2023.11.26.568742)
>
> Code: <https://github.com/tymor22/protein-vec>
> 

## Protein-Vec: Contrastive learning of sequence, structure, and function + MOE

### Abstract

Fewer than 1% of proteins have experimentally validated annotations; computational methods are needed to fill the gaps. The authors introduce Protein-Vec, a multi-aspect framework built on protein language models that learns sequence–structure–function representations for protein sequence retrieval and annotation.

### Introduction

Many gene and protein annotation pipelines rely on mapping annotations (or subsets thereof) inferred or detected via homology, and remote homology detection remains among the most widely used tools in bioinformatics; nevertheless, homology-based annotation fails for a large fraction of proteins.

Computational protein annotation and function prediction are framed by modeling distinct protein aspects, yielding a multi-faceted information retrieval system. These aspects include:

- protein function (encapsulated in Enzyme Commission numbers (EC) and Gene Ontology (GO) annotations
- protein domain sequence families (Pfam)
- gene domains (Gene3D)
- protein structure information (via TM-Scores)

Each aspect poses its own difficulties and computational cost:

- EC classification: recent work suggests that roughly 40% of computationally assigned enzymes are incorrect
- Pfam: curated protein domains, but many Pfam families contain small sequence sets, which makes learning with machine learning methods difficult
- Protein function prediction (GO): erroneous GO annotations, sparse experimental labels, and an extreme multi-label classification setting

### Results

Sequence, structure, and function information are encoded into protein vectors by training a mixture-of-experts neural network with contrastive learning and an improved loss function.

Before training the full Protein-Vec model, single-aspect models must be trained first; these are called Aspect-Vec models and cover Enzyme Commission number (EC), Gene Ontology (GO), Protein Family (Pfam), TM-Scores, and Gene3D domain annotations.

Training Aspect-Vec and Protein-Vec models requires anchor proteins with one positive and one negative example; one training objective is to distinguish positives from negatives.

After each Aspect-Vec model is trained, they are combined into a multi-aspect model, Protein-Vec. A matrix is built by stacking the Aspect-Vec vectors for each training sample, masking unspecified aspects, and training the MOE to form this matrix.

#### Aspect-Vec: Single-aspect expert models

There are seven: EC number, Gene Ontology molecular function (GO MFO), Gene Ontology biological process (GO BPO), Gene Ontology cellular component (GO CCO), Pfam, TM-Scores, and Gene3D domain annotations.

#### Enzyme Commission number prediction for novel proteins

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/tab6.png" alt="avatar" style="zoom:100%;" /></div>

Compared with CLEAN, the Aspect-Vec model already performs better.

#### Pfam prediction for remote homologs

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/tab1.png" alt="avatar" style="zoom:100%;" /></div>

The dataset is clustering Pfam-seed v32 at sequence similarity below 25%.

#### Predicting Gene-Ontology annotations for novel proteins

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/tab2.png" alt="avatar" style="zoom:100%;" /></div>

#### Predicting Gene3D domains: Diamond benchmark

Gene3D provides CATH annotations for protein sequences.

On the Diamond benchmark, DIAMOND achieves 99% top-1 sensitivity, TM-Vec 92%, and the Gene3D Aspect-Vec model 83%.

#### Protein-Vec: Combining sequence-structure-function aspects into one model

Protein-Vec encodes Swiss-Prot as of May 25, 2022 as the lookup database. Three test sets are used:

- time-based split: proteins added after May 25, 2022
- at most 50% sequence similarity to the training set
- at most 20% sequence similarity to the training set

Given a query, predictions are made by retrieving the nearest protein in the lookup database.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/tab3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/tab5.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/tab7.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/tab8.png" alt="avatar" style="zoom:100%;" /></div>

### Online Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/fig1.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/fig2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Protein-Vec/fig3.png" alt="avatar" style="zoom:100%;" /></div>

#### Aspect-Vec embedding model

Each Aspect-Vec model is trained on protein sequence triplets: sequences are passed through ProtTrans (ProtT5-XL-Uniref50) and then through Aspect-Vec (fig. 3a).

#### Protein-Vec embedding model

During training, aspects to encode are sampled with some probability; vectors are generated and concatenated into an Aspect-Vec matrix, with unused aspects masked (fig. 3b).

Protein-Vec is trained with a multi-objective loss; when a training sample has a TM-score, TM-score prediction is included as an additional objective.

#### Protein-Vec search

FAISS is used as the vector search library.

#### Protein-Vec dataset generation

Triplets of anchor, positive, and negative samples must be generated from sequence, structure, and function. All data come from Swiss-Prot.

- Sequence level:
  - Pfam and Gene3D
  - Positive: at least one annotation matches the anchor
  - Negative: for Pfam, hard negatives are constructed using Pfam clan information—45% of negatives share at least one Pfam clan with the anchor; for Gene3D, negatives share neither the same domain nor the same topology
- Structure level:
  - TM-scores computed with TM-align
- Function level:
  - EC number and GO
  - EC number: positives share all four EC hierarchy levels with the anchor; negatives match at two or three levels but differ overall
  - GO: triplets are generated with the GOGO tool; for each GO component, positives have high GO lexical similarity and negatives low similarity (thresholds 0.65 and 0.25, respectively)

The final training set comprises 450M triplets.

<HR align=left color=#987cb9 SIZE=1>
