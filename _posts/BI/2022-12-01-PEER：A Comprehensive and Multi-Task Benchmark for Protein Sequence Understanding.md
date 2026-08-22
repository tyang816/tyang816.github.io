---
layout: post
title: NeurIPS-2022 PEER：A Comprehensive and Multi-Task Benchmark for Protein Sequence Understanding
categories: [BI]
tags: [protein, benchmark, PLM]
proceedings: NeurIPS
date: 2022-12-01
lang: en
alt_url: /zh/notes/bi/PEER：A-Comprehensive-and-Multi-Task-Benchmark-for-Protein-Sequence-Understanding/
permalink: /notes/bi/PEER：A-Comprehensive-and-Multi-Task-Benchmark-for-Protein-Sequence-Understanding/
redirect_from:
  - "/bi/PEER：A-Comprehensive-and-Multi-Task-Benchmark-for-Protein-Sequence-Understanding/"
  - "/BI/PEER：A-Comprehensive-and-Multi-Task-Benchmark-for-Protein-Sequence-Understanding/"
---

> Paper: [PEER：A Comprehensive and Multi-Task Benchmark for Protein Sequence Understanding](https://proceedings.neurips.cc/paper_files/paper/2022/file/e467582d42d9c13fa9603df16f31de6d-Paper-Datasets_and_Benchmarks.pdf)
>
> Code: <https://github.com/DeepGraphLearning/PEER_Benchmark>
>

## PEER: A benchmark for evaluating protein sequence representations

### Abstract

This work introduces a benchmark for evaluating protein sequence representations, covering protein function prediction, protein localization prediction, protein structure prediction, protein–protein interaction prediction, and protein–ligand interaction prediction. The authors also survey how different methods perform under multi-task learning; experiments indicate that large-scale pretrained protein language models achieve the strongest results.

### Introduction

Inspired by ImageNet and GLUE, the authors seek to build a comprehensive protein benchmark with 17 biologically relevant tasks spanning diverse aspects of protein understanding. They evaluate CNNs, LSTMs, Transformers, and large-scale pretrained models.

### Benchmark Tasks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PEER/tab1.png" alt="avatar" style="zoom:100%;" /></div>

### Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PEER/tab2.png" alt="avatar" style="zoom:100%;" /></div>

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PEER/tab3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PEER/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

