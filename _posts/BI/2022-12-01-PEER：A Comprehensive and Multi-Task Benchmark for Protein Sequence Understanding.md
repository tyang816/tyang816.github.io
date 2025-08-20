---
layout: post
title: NeurIPS-2022 PEER：A Comprehensive and Multi-Task Benchmark for Protein Sequence Understanding
categories: [BI]
tags: [protein, benchmark, PLM]
proceedings: NeurIPS
date: 2022-12-01
---

> 论文地址：[PEER：A Comprehensive and Multi-Task Benchmark for Protein Sequence Understanding](https://proceedings.neurips.cc/paper_files/paper/2022/file/e467582d42d9c13fa9603df16f31de6d-Paper-Datasets_and_Benchmarks.pdf)
>
> 论文实现：<https://github.com/DeepGraphLearning/PEER_Benchmark>
>

## PEER：蛋白质序列表征评估benchmark

### Abstract

提出蛋白质序列表征评估的benchmark，包括 protein function prediction, protein localization prediction, protein structure prediction, protein-protein interaction prediction, and protein-ligand interaction prediction。此外，还调研了不同方法在多任务学习设置上的性能，实验表明大规模预训练的蛋白质语言模型性能最好

### Introduction

受到ImageNet和GLUE的启发，希望构建一个蛋白质的全面基准数据集，包含了17个生物相关的任务覆盖了不同方面的蛋白质理解。测试了CNN，LSTM，Transformers和大规模的预训练模型等

### Benchmark Tasks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PEER/tab1.png" alt="avatar" style="zoom:100%;" /></div>

### Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PEER/tab2.png" alt="avatar" style="zoom:100%;" /></div>

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PEER/tab3.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PEER/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

