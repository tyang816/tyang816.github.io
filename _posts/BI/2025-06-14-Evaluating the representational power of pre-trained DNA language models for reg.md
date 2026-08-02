---
layout: post
title: Genome Biology-2025 Evaluating the representational power of pre-trained DNA language models for regulatory genomics
categories: [BI]
tags: [DNA, genomics, PLM]
proceedings: Genome Biology
date: 2025-06-14
lang: en
alt_url: /zh/bi/Evaluating-the-representational-power-of-pre-trained-DNA-language-models-for-reg/
permalink: /bi/Evaluating-the-representational-power-of-pre-trained-DNA-language-models-for-reg/
---

> Paper: [Evaluating the representational power of pre-trained DNA language models for regulatory genomics](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-025-03674-8)
>
> Code: <https://github.com/amberT15/LLM_eval>

## gLM-eval: Evaluating gLMs on diverse zero-shot downstream tasks

### Abstract

The rise of genomic language models (gLMs) offers an unsupervised route to learning cis-regulatory patterns in the non-coding genome. Prior benchmarks have shown that pretrained gLMs can improve prediction on regulatory genomics tasks, but even when fine-tuning works well, it remains open whether gLM representations reflect a fundamental grasp of cis-regulatory biology. Here the authors use pretrained models to interpret cell-type-specific functional genomics data spanning DNA and RNA regulation. The results indicate that current gLMs do not provide substantial gains over conventional machine learning with one-hot encoded sequences. The work highlights a major limitation of present gLMs and raises concerns about standard pretraining strategies for the non-coding genome.

### Introduction

Representations from pretrained protein models support many applications: predicting protein structure, nonsynonymous mutation effects, designing new protein sequences, and studying protein evolutionary relationships.

Models pretrained on genomic DNA sequences accelerate understanding of functional elements in the non-coding genome; in principle, gLMs can help dissect how transcription factors (TFs) coordinately control activity at cis-regulatory elements (CREs).

Inputs are DNA sequences; tokenization uses single-nucleotide or k-mer schemes; backbone architectures include transformers, multi-head attention or variants, or convolutional networks with residual connections. Training data are diverse—single-species genomes, multi-species genomes, or genomic regions such as untranslated regions (UTRs), pre-mRNA, promoters, coding sequences, non-coding RNA, or conserved sites.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/glm-eval/fig1.png "avatar")​

The authors evaluate six major functional genomics prediction tasks that capture cis-regulatory complexity at DNA and RNA levels. Current pretrained gLMs perform only marginally better than traditional one-hot representations plus deep learning. Supervised foundation models trained on functional genomics data transfer more effectively to other functional genomics tasks. Results also suggest that current gLM pretraining schemes struggle to capture cell-type-specific functional elements and have not yet achieved true foundation-model behavior.

### Results

#### Task 1: Predicting cell-type specific regulatory activity from lentiMPRA data

Considering two cell types, HepG2 and K562, allows assessment of whether pretrained gLM representations capture cell-type-specific CRE activity: given input DNA sequence, predict a scalar activity for each CRE.

The setup uses CLS token or mean embedding, a CNN baseline, comparison of penultimate-layer full embeddings against one-hot sequences, and the supervised foundation model Sei—a ResNet on one-hot sequences—for a broad and fair comparison.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/glm-eval/fig2.png "avatar")​

Fig. 2b shows that in many settings embedding-based methods underperform one-hot encoding.

#### Task 2: Predicting TF binding sites from ChIP-seq data

TF binding is cell-type specific, whereas standard language modeling is not cell-type aware; one possible explanation is that the lentiMPRA prediction task loses critical motifs during training.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/glm-eval/fig3.png "avatar")​

#### Task 3: Zero-shot variant effect prediction with MPRA data

Predicting effects of non-coding variants.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/glm-eval/tab1.png "avatar")​

CNNs trained on lentiMPRA data with gLM embeddings achieve markedly better performance than their pretrained counterparts alone.

#### Task 4: Predicting alternative splicing from RNA-seq data

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/glm-eval/fig4.png "avatar")​

Prior work suggests that Nucleotide Transformer and GPN learn features related to gene definition and splice sites; the authors test on the ASCOT dataset.

#### Task 5: Predicting RNA pol II elongation potential from INSERT-seq data

Using nucleotide-level RNA sequence as input, the task predicts RNA pol II elongation on the INSERT-seq dataset; Fig. 4 shows that pretrained models do not necessarily improve performance.

#### Task 6: Predicting RNA-binding protein binding with eCLIP-seq data

RNA-binding proteins (RBPs) are essential across RNA processing stages; the authors use eCLIP-seq (enhanced crosslinking and immunoprecipitation sequencing) data to assess gLMs’ ability to predict RBP binding sites.

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/glm-eval/fig5.png "avatar")​

#### Uncovering cell-type-specific motifs learned by gLMs is challenging

​![avatar](https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/glm-eval/fig6.png "avatar")​

### Discussion

Compared with standard one-hot sequences, gLM representations offer little advantage.

The authors deliberately avoid fine-tuning gLM weights on each downstream task; fine-tuning could improve gLM performance, but the scope of this study is to strictly measure cis-regulatory biology learned before task-specific training.

Extending the current MLM pretraining objective across the whole genome makes it difficult to capture meaningful representations in the non-coding genome; it remains unclear whether continued scaling of gLMs pretrained with standard language modeling objectives (MLM or CLM) will eventually yield emergent capabilities.

***

​
