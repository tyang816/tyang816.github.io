---
layout: post
title: Bioinformatics-2021 DNABERT：pre-trained Bidirectional Encoder Representations from Transformers model for DNA-language in genome
categories: [BI]
tags: [DNA, genomics, PLM]
proceedings: Bioinformatics
date: 2021-02-04
lang: en
alt_url: /zh/bi/DNABERT：pre-trained-Bidirectional-Encoder-Representations-from-Transformers-mode/
permalink: /bi/DNABERT：pre-trained-Bidirectional-Encoder-Representations-from-Transformers-mode/
---

> Paper: [DNABERT：pre-trained Bidirectional Encoder Representations from Transformers model for DNA-language in genome](https://academic.oup.com/bioinformatics/article/37/15/2112/6128680)
>
> Code: <https://github.com/jerryji1993/DNABERT>

## DNABERT: Pre-trained DNA Model

### Abstract

**Motivation**: Deciphering the language of non-coding DNA is one of the fundamental problems in genomics research. Because of polysemy and long-range semantic dependencies, gene regulatory encoding is highly complex and is often missed by prior informatics approaches, especially when data are scarce.

**Results**: DNABERT captures a global and transferable understanding of genomic DNA sequences based on upstream and downstream nucleotide context. A single pre-trained transformer model, after fine-tuning on small task-specific labeled datasets, simultaneously achieves state-of-the-art performance on promoter, splice-site, and transcription factor binding site prediction. DNABERT enables direct visualization of nucleotide-level importance and semantic relationships in input sequences, improving interpretability and accurate identification of conserved sequence motifs and candidate functional genetic variants. Finally, the authors show that pre-training on the human genome transfers readily to other organisms.

### Introduction

The same cis-regulatory elements often have different functions and activities across biological contexts.

### Materials and methods

#### The DNABERT model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DNABERT/fig1.png" alt="avatar" style="zoom:100%;" /></div>

#### Training of the DNABERT model

Sequences are converted into k-mer token representations as input. Tokens also include a CLS token (representing the meaning of the whole sequence), a SEP token (sequence separator), and MASK tokens (representing k-mers during pre-training).

The authors use 3-mer, 4-mer, 5-mer, and 6-mer encodings of DNA sequences. For example, `ATGGCT` under 3-mer encoding becomes the four tokens {ATG, TGG, GGC, GCT}. In experiments, the choice of k is denoted DNABERT-k.

#### Pre-training

Training data are generated from the human genome by direct non-overlapping splitting and random sampling; sequence lengths range from 5 to 510 bp.

Training runs for 120k steps with batch_size=2000: 15% masking for the first 100k steps and 20% masking for the last 20k steps.

#### Fine-tuning

The same training tricks are used across all downstream tasks: learning rate is warmed up then decayed; see the code for details.

### Results

- The first experiment targets promoter prediction; the fine-tuned model is named DNABERT-Prom. To compare with baselines, the authors also increase input length and use a 1001 bp setting. Results show that DNABERT-Prom outperforms conventional CNN, CNN+LSTM, and CNN+GRU regardless of hyperparameters (Figure 2).
- The second experiment identifies transcription factor binding sites. Prior models match DNABERT-TF on true negatives but predict excessively many false positives and false negatives. On low-quality datasets, DNABERT-TF achieves substantially higher recall than other models.
- The third experiment distinguishes canonical from non-canonical splice sites. DNABERT-Splice again yields strong results relative to many comparison methods; attention-based interpretation highlights the functional importance of introns.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DNABERT/fig2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DNABERT/fig3.png" alt="avatar" style="zoom:50%;" /></div>

To address the black-box nature of deep learning, the authors argue that BERT-style models can naturally expose what they learn. They provide evidence that BERT is well suited to locating important sites and relating them to context.

Attention scores from BERT layers visualize where important sites lie (Figure 4). Panel (a) shows results on arbitrarily selected sequences. Panels (b) and (c) indicate that the model has learned meaningful structure—one around −20 to −30 bp and another around the central flanking regions—whereas on low-quality data attention may concentrate mainly at the start (panel d). Panel (e) visualizes contextual relationships: a yellow head focuses on the CTT motif, and three other heads (green, purple, and pink) also attend to this site, suggesting that multi-head attention captures contextual relevance and importance.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DNABERT/fig4.png" alt="avatar" style="zoom:100%;" /></div>

Splice site prediction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DNABERT/fig5.png" alt="avatar" style="zoom:100%;" /></div>

Identifying functional genetic variants with DNABERT

The authors show that pre-training and task-specific fine-tuning both matter, via controlled comparisons and attention visualizations (Figure 4). Panels (d) and (e) show clear gains. Transfer experiments on mouse data (panel f) remain strong, suggesting the model captures shared deep semantics of DNA and underscoring the value of pre-training.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DNABERT/fig6.png" alt="avatar" style="zoom:100%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
