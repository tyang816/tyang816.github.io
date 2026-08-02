---
layout: post
title: Nature Communications-2024 PLMSearch：Protein language model powers accurate and fast sequence search for remote homology
categories: [BI]
tags: [protein, PLM, alignment]
proceedings: Nature Communications
date: 2024-03-30
lang: en
alt_url: /zh/notes/bi/PLMSearch：Protein-language-model-powers-accurate-and-fast-sequence-search-for-re/
permalink: /notes/bi/PLMSearch：Protein-language-model-powers-accurate-and-fast-sequence-search-for-re/
---

> Paper: [PLMSearch: Protein language model powers accurate and fast sequence search for remote homology](https://www.nature.com/articles/s41467-024-46808-5)
>
> Code: <https://dmiip.sjtu.edu.cn/PLMSearch> and <https://github.com/maovshao/PLMSearch>

## PLMSearch: homologous-family filtering, protein similarity prediction, and PLMAlign

### Abstract

Detecting structural homology from sequence alone remains challenging. PLMSearch addresses this using sequence as the only input. Experiments show that PLMSearch can search millions of query–target proteins in seconds, matching the best structure-based search methods while also recovering remote homolog pairs that are dissimilar in sequence but structurally similar.

### Introduction

Sequence-based search methods struggle to detect distant evolutionary relationships. When sequence similarity falls below 0.3, methods based on sequence profiles (MSAs), such as HMMER, HHsearch, or HHblits, perform better.

Because structure diverges more than sequence, structure-similarity search is more sensitive. Approaches fall into three main categories:

*   contact/distance map-based: Map\_align, EigenTHREADER, and DiscoVER
*   structural alphabet-based: 3D-BLAST-SW, CLE-SW, Foldseek and Foldseek-TM
*   structural alignment-based: CE, Dali, and TM-align

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/fig1.png" alt="avatar" style /></div>

PLMSearch comprises three main steps:

1.  PfamClan filters protein pairs that share the same Pfam clan domain
2.  SS-predictor (structural similarity predictor) predicts similarity for query–target pairs, trained with TM-score as ground truth
3.  PLMSearch ranks the PfamClan pre-filtered pairs by predicted similarity and outputs search results for each query protein. PLMAlign then provides sequence alignments and alignment scores for the top pairs retrieved by PLMSearch (Fig. 1d)

### Results

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/fig2.png" alt="avatar" style /></div>

#### PLMSearch reaches similar sensitivity as structure search methods

Retrieval benchmarks on SCOPe40-test and Swiss-Prot show that PLMSearch achieves the best balance of accuracy and speed.

SCOPe40-test (2,207 proteins) yields 4,870,849 query–target pairs in total; Fig. 2a–c, Table S2

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/tabs2.png" alt="avatar" style /></div>

For the Swiss-Prot search test, 50 queries were sampled at random from Swiss-Prot and 50 from SCOPe40-test, searched against 430,140 targets in Swiss-Prot; Fig. S2, Table S1

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/figs2.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/tabs1.png" alt="avatar" style /></div>

#### PLMSearch searches millions of query-target pairs in seconds

All methods used the same hardware: a server with a 56-core Intel (R) Xeon (R) CPU E5-2680 v4 @ 2.40 GHz and 256 GB RAM.

#### PLMSearch accurately detects remote homology pairs

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/fig3.png" alt="avatar" style /></div>

Pairs with sequence similarity > 0.3 and TM-score > 0.5 are termed easy pairs; pairs with sequence similarity < 0.3 and TM-score > 0.5 are termed remote homology pairs.

#### Ablation experiments: PfamClan, SS-predictor, and PLMAlign make PLMSearch more robust

To evaluate PLMSearch without the PfamClan component, 110 queries were selected from the 2,207 queries in the SCOPe40 test that did not match any Pfam domain on scanning.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/figs3.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/tabs4.png" alt="avatar" style /></div>

To evaluate PLMSearch without the SS-predictor component, SCOPe40 test and Swiss-Prot were first clustered based on PfamClan.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/figs4.png" alt="avatar" style /></div>

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/tabs8.png" alt="avatar" style /></div>

Clustering shows a pronounced long-tail effect: after PfamClan pre-filtering, more than 50% of pre-filtered protein pairs (orange rectangles in the figure) come from the largest one or two clusters. Large clusters therefore inject many irrelevant pairs into the pre-filtered set and reduce accuracy; further ranking and filtering by similarity is required—this is the role of SS-predictor.

### Methods

#### PLMSearch pipeline

1. PfamScan identifies Pfam clan domains; 2. similarity prediction; 3. similarity-based ranking; 4. for highly ranked pairs, PLMAlign generates alignments

#### PfamClan

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/fig4.png" alt="avatar" style /></div>

PfamClan retains protein pairs that share the same Pfam clan domain (Fig. 1a). Recall matters more in this initial pre-filtering stage. PfamClan uses a looser criterion—shared Pfam clan domain rather than shared Pfam family (as PfamFamily does)—which gives PfamClan higher recall than PfamFamily (Fig. 4).

#### Similarity prediction

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/fig5.png" alt="avatar" style /></div>

Protein sequences are fed into ESM-1b to predict TM-score; training uses SCOPe40-train and CATHS40.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PLMSearch/fig6.png" alt="avatar" style /></div>

#### PLMAlign

Same approach as PLM-BLAST.

#### Datasets

##### SCOPe40

As in Foldseek, SCOPe40 is split 8:2 for train/test; no fold in the test set appears in the training set.

##### New protein search test

An additional search benchmark includes query proteins that match no Pfam domain on scanning: 110 queries were selected from the 2,207 queries in the SCOPe40 test with no Pfam domain hits.

##### Swiss-Prot

Initially 542,317 proteins with structures were downloaded; entries with pLDDT < 70 were removed, yielding 498,659; proteins with ≥ 40% sequence similarity to a query were removed, yielding 430,140 targets.

Finally, 50 queries were chosen from SCOPe40-test and 50 from Swiss-Prot, for a total of 43,014,000 query–target pairs.

##### CATHS40

Domains longer than 300 amino acids were discarded, leaving 27,270 domains; proteins with ≥ 40% similarity to the test set were removed, leaving 21,474.

<hr align="left" color="#987cb9" size="1">

