---
layout: post
title: Science-2023 Evolutionary-scale prediction of atomic-level protein structure with a language model
categories: [BI]
tags: [protein, PLM, structure prediction]
proceedings: Science
date: 2023-03-16
---

> 论文地址：[Evolutionary-scale prediction of atomic-level protein structure with a language model](https://www.science.org/doi/10.1126/science.ade2574)
>
> 论文实现：<https://github.com/facebookresearch/esm>
>
> facebook蛋白质esm系列工作，主线是利用蛋白质语言模型实现从蛋白序列预测蛋白质结构和功能，ESM-2大大提高了参数，虽然精度上提升不明显，但是推理速度比AlphaFold2快了一个数量级

## ESM-2：提高参数量以单序列作为输入提高推理速度

### Abstract

将模型提高到了15B参数，是目前最大的蛋白质语言模型，随着模型的扩大，它们学习的信息能够在单个原子的分辨率下预测蛋白质的三维结构。ESMFold与AlphaFold2和RoseTTAFold对序列的准确度差不多，但是困惑度更低，推理时间比AlphaFold2快一个数量级

### Introduction

AlphaFold2和RoseTTAFold在原子分辨率结构预测问题上取得了突破性的成功，但它们也依赖于使用多序列比对（MSA）和类似的蛋白质结构模板来实现最佳性能

相比之下，通过利用语言模型的内部表征，ESMFold只用一个序列作为输入就能生成相应的结构预测，从而大大加快了结构预测的速度

ESMFold可以帮助解决蛋白质序列数据库的快速增长和蛋白质结构和功能数据库的缓慢增长之间的差距

### Training and evaluating 15B parameter protein language models

ESM-2是一个基于Transformer的语言模型，并使用注意力机制来学习输入序列中成对氨基酸之间的相互作用模式

相对于上一代模型ESM-1b，Meta对模型结构、训练参数进行了改进，并增加了计算资源和数据。同时，相对位置嵌入的加入，使模型能够推广到任意长度的序列

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-2/tab1.png" alt="avatar" style="zoom:60%;" /></div>

从结果来看，具有1.5亿个参数的ESM-2模型比具有6.5亿个参数的ESM-1b模型表现得更好

此外，在结构预测的基准上，ESM-2也超过了其他的蛋白质语言模型。这种性能的提高与大型语言建模领域建立的规律是一致的

### Language models enable more efficient predictions of protein structure

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-2/fig1.png" alt="avatar" style="zoom:100%;" /></div>

随着ESM-2规模的增加，可以观察到语言建模的精度有很大的提高

### End-to-end single-sequence structure prediction with ESMFold

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-2/fig2.png" alt="avatar" style="zoom:100%;" /></div>

SMFold和AlphaFold2的一个关键区别是，ESMFold使用语言模型表示，消除了对明确的同源序列（以MSA的形式）作为输入的需要

ESMFold通过用一个处理序列的Transformer模块取代处理MSA的计算昂贵的网络模块，简化了AlphaFold2中的Evoformer。这种简化意味着ESMFold的速度大大提高，远高于基于MSA的模型

折叠主干的输出接下来又被一个结构模块处理，它负责输出最终的原子级结构和预测的置信度

研究人员将ESMFold与AlphaFold2和RoseTTAFold在CAMEO（2022年4月至2022年6月）和CASP14（2020年5月）测试集上进行比较，当只给单一序列输入时，ESMFold的表现要比Alphafold 2好得多

而当使用完整的管道时，AlphaFold2在CAMEO和CASP14上分别达到了88.3和84.7。ESMFold在CAMEO上取得了与RoseTTAfold相当的准确率，其平均TM分数为82.0

### Exploring metagenomic structural space

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ESM-2/fig3.png" alt="avatar" style="zoom:100%;" /></div>

### Conclusions

蛋白质结构预测的非线性曲线是模型规模的函数，并且观察到了语言模型对序列的理解程度与结构预测之间的强烈联系

ESMFold获得了准确的原子分辨率结构预测，推理时间还比AlphaFold2快了一个数量级。在实践中，速度的优势甚至还要更大。因为ESMFold不需要搜索和进化相关的序列来构建MSA，速度的提高将使绘制大型元基因组学序列数据库的结构空间成为可能

<HR align=left color=#987cb9 SIZE=1>