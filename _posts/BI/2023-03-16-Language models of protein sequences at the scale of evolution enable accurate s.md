---
layout: post
title: Science-2023 Evolutionary-scale prediction of atomic-level protein structure with a language model
categories: [BI]
tags: [protein, PLM, structure prediction]
proceedings: Science
date: 2023-03-16
lang: en
alt_url: /zh/notes/bi/Language-models-of-protein-sequences-at-the-scale-of-evolution-enable-accurate-s/
permalink: /notes/bi/Language-models-of-protein-sequences-at-the-scale-of-evolution-enable-accurate-s/
redirect_from:
  - "/bi/Language-models-of-protein-sequences-at-the-scale-of-evolution-enable-accurate-s/"
  - "/BI/Language-models-of-protein-sequences-at-the-scale-of-evolution-enable-accurate-s/"
---

> Paper: [Evolutionary-scale prediction of atomic-level protein structure with a language model](https://www.science.org/doi/10.1126/science.ade2574)
>
> Code: <https://github.com/facebookresearch/esm>
>
> Meta’s ESM series for proteins uses protein language models to predict structure and function from sequence. ESM-2 scales parameters substantially; accuracy gains are modest, but inference is roughly an order of magnitude faster than AlphaFold2.

## ESM-2: scaling parameters and single-sequence input for faster inference

### Abstract

The model is scaled to 15B parameters—the largest protein language model to date. As models grow, they learn representations that support three-dimensional structure prediction at single-atom resolution. ESMFold matches AlphaFold2 and RoseTTAFold on sequence-level accuracy with lower perplexity, and runs roughly an order of magnitude faster than AlphaFold2.

### Introduction

AlphaFold2 and RoseTTAFold achieved breakthrough success on atomic-resolution structure prediction, but they rely on multiple sequence alignments (MSAs) and structural templates of related proteins for best performance.

In contrast, by leveraging internal representations from language models, ESMFold generates structure predictions from a single sequence alone, greatly accelerating structure prediction.

ESMFold can help close the gap between the rapid growth of protein sequence databases and the slower growth of databases of protein structure and function.

### Training and evaluating 15B parameter protein language models

ESM-2 is a Transformer-based language model that uses attention to learn interaction patterns between pairs of amino acids in the input sequence.

Relative to the previous ESM-1b, Meta improved model architecture and training setup and added compute and data. Relative positional embeddings also allow the model to generalize to sequences of arbitrary length.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-2/tab1.png" alt="avatar" style="zoom:60%;" /></div>

Results show that a 150M-parameter ESM-2 model outperforms the 650M-parameter ESM-1b.

On structure-prediction benchmarks, ESM-2 also surpasses other protein language models. This scaling behavior aligns with trends established in large-scale language modeling.

### Language models enable more efficient predictions of protein structure

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-2/fig1.png" alt="avatar" style="zoom:100%;" /></div>

As the scale of ESM-2 increases, language modeling accuracy improves substantially.

### End-to-end single-sequence structure prediction with ESMFold

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-2/fig2.png" alt="avatar" style="zoom:100%;" /></div>

A key difference between ESMFold and AlphaFold2 is that ESMFold uses language-model representations, removing the need for explicit homologous sequences (in MSA form) as input.

ESMFold simplifies AlphaFold2’s Evoformer by replacing the computationally expensive MSA-processing stack with a Transformer module over the sequence. This simplification yields much higher throughput than MSA-based models.

The folding trunk output is then processed by a structure module that produces the final atom-level structure and predicted confidence.

The authors compared ESMFold with AlphaFold2 and RoseTTAFold on CAMEO (April–June 2022) and CASP14 (May 2020) test sets. With only a single sequence as input, ESMFold substantially outperforms AlphaFold2.

With the full pipeline, AlphaFold2 reaches 88.3 and 84.7 on CAMEO and CASP14, respectively. ESMFold achieves accuracy comparable to RoseTTAFold on CAMEO, with a mean TM-score of 82.0.

### Exploring metagenomic structural space

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-2/fig3.png" alt="avatar" style="zoom:100%;" /></div>

### Conclusions

Structure-prediction performance follows a nonlinear scaling curve with model size, and there is a strong link between how well language models understand sequences and structure prediction quality.

ESMFold delivers accurate atomic-resolution structure predictions with inference roughly an order of magnitude faster than AlphaFold2. In practice, the speed advantage can be even larger because ESMFold does not need to search for evolutionarily related sequences to build an MSA; that speedup makes it feasible to map structural space across large metagenomic sequence databases.

<HR align=left color=#987cb9 SIZE=1>
