---
layout: post
title: Proceedings of the National Academy of Sciences-2021 Biological structure and function emerge from scaling unsupervised learning to 250 million protein sequences
categories: [BI]
tags: [protein, PLM]
proceedings: Proceedings of the National Academy of Sciences
date: 2021-04-05
lang: en
alt_url: /zh/notes/bi/Biological-structure-and-function-emerge-from-scaling-unsupervised-learning-to-2/
permalink: /notes/bi/Biological-structure-and-function-emerge-from-scaling-unsupervised-learning-to-2/
redirect_from:
  - "/bi/Biological-structure-and-function-emerge-from-scaling-unsupervised-learning-to-2/"
  - "/BI/Biological-structure-and-function-emerge-from-scaling-unsupervised-learning-to-2/"
---

> Paper: [Biological structure and function emerge from scaling unsupervised learning to 250 million protein sequences](https://www.pnas.org/doi/10.1073/pnas.2016239118)
>
> Code: <https://github.com/facebookresearch/esm>
>
> This note covers Facebook’s ESM series on protein language models (PLMs), whose main line of work uses PLMs to predict protein structure and function from amino acid sequences. It introduces the team’s state-of-the-art protein language model ESM-1b, trained with a [Transformer](https://so.csdn.net/so/search?q=Transformer&spm=1001.2101.3001.7020), which can directly predict structural and functional properties from protein sequences.

## ESM-1b: Can Transformers extract structural information from protein sequences?

### Abstract

Combining large-scale data with unsupervised models has driven major advances in representation learning and statistical generation in AI. The authors train a deep language model with unsupervised learning on 86 billion amino acids drawn from 250 million protein sequences spanning evolutionary diversity. The learned representation space exhibits multi-scale organizational structure, reflecting biology from biochemical properties of amino acids to remote homology at the protein level. Secondary and tertiary structural information is also encoded in the representations and can be surfaced via linear projection.

### Introduction

The focus is on fitting a single model to many diverse sequences across evolution. The work therefore studies high-capacity neural networks trained on large-scale evolutionary data to learn protein biology.

Protein sequence generation differs substantially from natural language, so it is unclear whether natural-language objectives and architectures transfer. The authors investigate this by training high-capacity Transformer models on evolutionary data.

### Scaling language models to 250 million diverse protein sequences

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1b/tab1.png" alt="avatar" style="zoom:60%;" /></div>

Training data: UR50/S; model size: 650M parameters, 33 layers.

They find that a Transformer with only six layers already outperforms LSTM models. Further analysis shows that deeper Transformers yield lower cross-entropy, and richer training data also reduces cross-entropy. On UR50/D, a 34-layer Transformer reaches cross-entropy 8.46, achieving state-of-the-art performance.

The ultimate goal is to test whether Transformers can extract structural information from sequences, but that objective is hard to optimize directly during training. The model is therefore trained on the proxy task MLM: given unmasked residues in a sequence, predict the identity of masked residues.

Hypothesis for why this proxy task embeds structural properties in the representations:

- To predict masked tokens from elsewhere in the sequence, the model must learn dependencies among residues; those dependencies reflect how structure is encoded in sequence, so learning residue–residue relationships implicitly learns structure and function.

### Multi-scale organization in sequence representations

The authors examine the representation space at multiple scales, from biochemistry to evolutionary homology, to characterize biological organization. To understand how training shapes representations, it is necessary to compare embeddings before and after training.

#### Learning encodes biochemical properties

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1b/fig1.png" alt="avatar" style="zoom:60%;" /></div>

Output embeddings can be viewed as points in an *n*-dimensional space. After t-SNE projection to two dimensions, amino acid residues with similar biochemical properties cluster together (e.g., hydrophobic, polar, aromatic, positively charged, negatively charged).

#### Biological variations are encoded in representation space

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1b/fig2.png" alt="avatar" style="zoom:60%;" /></div>

With the same t-SNE visualization, proteins from orthologous genes form distinct clusters. In 2D, proteins separate by species along one axis and by orthologous gene along the other. Untrained representations show no such structure—proteins are scattered.

#### Learning encodes remote homology & Learning encodes alignment within a protein family

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1b/tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1b/fig3.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1b/tab3.png" alt="avatar" style="zoom:60%;" /></div>

Using trained representations, SCOPe is applied to predict whether proteins share the same superfamily or fold.

### Prediction of secondary structure and tertiary contacts

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1b/fig4.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-1b/fig5.png" alt="avatar" style="zoom:50%;" /></div>

- Secondary structure
  - Using ESM-1b embeddings, logistic regression is fit with eight secondary-structure classes as labels to predict secondary structure along the sequence.

- Tertiary structure

  - Linear projections are applied at two sequence positions; their dot product yields a binary variable: 1 if the pair is in contact in the tertiary structure, 0 otherwise.

<HR align=left color=#987cb9 SIZE=1>
