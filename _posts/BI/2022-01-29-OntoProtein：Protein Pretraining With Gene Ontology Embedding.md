---
layout: post
title: ICLR-2022 OntoProtein：Protein Pretraining With Gene Ontology Embedding
categories: [BI]
tags: [protein, PLM]
proceedings: ICLR
date: 2022-01-29
lang: en
alt_url: /zh/notes/bi/OntoProtein：Protein-Pretraining-With-Gene-Ontology-Embedding/
permalink: /notes/bi/OntoProtein：Protein-Pretraining-With-Gene-Ontology-Embedding/
redirect_from:
  - "/bi/OntoProtein：Protein-Pretraining-With-Gene-Ontology-Embedding/"
  - "/BI/OntoProtein：Protein-Pretraining-With-Gene-Ontology-Embedding/"
---

> Paper: [OntoProtein：Protein Pretraining With Gene Ontology Embedding](https://openreview.net/forum?id=yfe1VMYAXa4)
>
> Code: <https://github.com/zjunlp/OntoProtein>

## OntoProtein: Knowledge Graph + Contrastive Learning + Pre-training and Fine-tuning

### Abstract

Pre-trained protein language models trained on millions of sequences can scale parameters from millions to billions, yet prior work rarely incorporates knowledge graphs (KGs). The authors argue that adding a KG can strengthen protein representations. This paper proposes OntoProtein, the first protein pre-training model that injects Gene Ontology (GO) structure. They construct a large-scale KG linking GO and associated proteins, introduce knowledge-aware negative sampling for contrastive learning, and jointly optimize the knowledge graph and protein embeddings before downstream fine-tuning.

### Introduction

Existing protein pre-training models do not fully capture biologically factual knowledge, so the authors turn to knowledge graphs derived from Gene Ontology. Because protein structure largely determines function, models can more readily leverage prior knowledge about functions of similarly shaped proteins to infer function.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/fig1.png" alt="avatar" style /></div>

Protein sequences and Gene Ontology data are heterogeneous—sequences are amino-acid chains whereas GO is a text-described knowledge graph—so challenges remain in structured knowledge encoding and fusing heterogeneous information.

By accessing the public Gene Ontology KG and aligning it with protein sequences from Swiss-Prot, they build ProteinKG25 for pre-training: 4,990,097 triples in total, including 4,879,951 protein–GO triples and 110,146 GO–GO triples.

Main contributions:

*   The first knowledge-enhanced protein model, OntoProtein
*   Joint optimization of knowledge and protein embeddings via contrastive learning with knowledge-aware sampling
*   The ProteinKG25 dataset

### Methodologies

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/fig2.png" alt="avatar" style /></div>

#### Hybrid Encoder

Protein sequences are encoded with the existing pre-trained model ProtBert.

Text sequences (GO encoder) are encoded with BERT, likewise using a pre-trained checkpoint.

#### Knowledge Embedding

A knowledge embedding objective learns representations of the knowledge graph.

The KG consists of tuples $(h, r, t)$, where $h$ and $t$ are head and tail entities and $r$ is the relation type.

There are two node types, $e_{GO}$ and $e_{protein}$: the former corresponds to annotation text in the graph, the latter to protein sequences. The full KG decomposes into $triple_{GO2GO}$ and $triple_{Protein2GO}$.

#### Contrastive Learning With Knowledge-Aware Negative Sampling

Knowledge embedding learns low-dimensional representations of entities and relations; contrastive estimation is a scalable way to score link patterns.

Contrastive learning corrupts the data distribution to obtain negatives, pushing the model toward more discriminative features. Prior negative sampling was overly simplistic; this work proposes knowledge-aware negative sampling. The KE objective is:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/frm1.png" alt="avatar" style /></div>

Here $(h_t', t_i')$ are negatives whose head and tail are sampled by corrupting tuples; $n$ is the number of negatives, $\gamma$ a margin, and $d$ a scoring function—for simplicity TransE is used.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/frm2.png" alt="avatar" style /></div>

Let tuple and entity sets be $T$ and $E$. GO entities belong to MFO (Molecular Function), CCO (Cellular Component), and BPO (Biological Process). For $T_{GO-GO}$ tuples, when replacing entities during corruption, replacements are drawn from the same aspect (MFO, CCO, or BPO). The negative tuple set $T'$ is sampled as:

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/frm3.png" alt="avatar" style /></div>

Here $E' \in \{E_{MFO}, E_{CCO}, E_{BPO}\}$. For $T_{Protein-GO}$, only the tail entity is replaced.

#### Pre-training Objective

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/frm4.png" alt="avatar" style /></div>

$\alpha$ is a hyperparameter; the overall method plugs into standard fine-tuning pipelines.

### Experiment

#### TAPE Benchmark

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/tab1.png" alt="avatar" style /></div>

Without MSA at the token level, results are competitive, but sequence-level performance is weaker—possibly due to the lack of a sequence-level objective; left for future work.

#### Protein–Protein Interaction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/tab2.png" alt="avatar" style /></div>

Strong on small data; on large data, performance is only competitive.

#### Protein Function Prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/tab3.png" alt="avatar" style /></div>

Datasets may suffer from severe long-tail effects: injecting knowledge can help head-class representation learning but hurt tail classes, leading to overall drops—also noted as future work.

#### Analysis

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/OntoProtein/tab4-fig4.png" alt="avatar" style /></div>

Substantial gains under various contact-prediction settings.

<hr align="left" color="#987cb9" size="1">
