---
layout: post
title: ICLR-2024 SaProt：Protein Language Modeling with Structure-aware Vocabulary
categories: [BI]
tags: [protein, PLM]
proceedings: ICLR
date: 2024-01-16
---

> 论文地址：[SaProt：Protein Language Modeling with Structure-aware Vocabulary](https://openreview.net/forum?id=6MRm3G4NiU)
>
> 论文实现：<https://github.com/westlake-repl/SaProt?tab=readme-ov-file>
>
> 知乎：<https://zhuanlan.zhihu.com/p/664754366>

## SaProt：基于结构感知词表的蛋白质语言模型

### Abstract

普通的PLM缺乏对结构信息的考虑，本文使用Foldseek的3D结构词表，使用这种带有结构感知的氨基酸词表在40M的蛋白质序列和结构上进行训练，在10个下游任务上体现了有效性

### Introcution

蛋白质结构相比于序列往往被认为更加具有信息量，因为其直接决定了蛋白质的功能。而随着AlphaFold2带来的巨大突破，我们拥有了大量的预测结构可以利用。如何利用这些蛋白质结构来训练强大且通用的表征模型是一个值得研究的方向

这篇论文里利用Foldseek来处理蛋白质结构，将其编码成一维的离散token，并与传统的氨基酸进行结合，形成了**结构感知词表（Structure-aware Vocabulary）**，以此将结构信息嵌入到模型输入中，增强模型的表征能力。我们的预训练模型用到了目前最多的蛋白质结构（**大约4000万**），在**64张A100上训练了3个月**的时间，最终开源了一个650M大小的模型**SaProt。**实验结果表明各种蛋白质任务上都要好于之前的序列和结构模型

### Methods

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/fig1.png" alt="avatar" style="zoom:100%;" /></div>

如前文提到首先将蛋白质进行编码，生成了一维的结构序列（使用了Foldseek的结构词表，每种token代表不同的局部结构），这样的结构序列与氨基酸序列是等长的。将**结构词表**和**氨基酸词表**计算笛卡尔积（即两两组合），形成新的**结构感知词表。**这样对于蛋白质的每个位点，其氨基酸类型和对应的局部结构都能组合成新词表中的某个元素，然后使用MLM训练

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/fig2.png" alt="avatar" style="zoom:100%;" /></div>

图左和图中是两种经典的蛋白质结构建模方式，即将结构信息encode成bias后添加到transformer的attention map中（如Evoformer，Uni-Mol），或者使用图神经网络的方式建模蛋白质的空间关系（如MIF，GearNet等）。然而从loss图中可以发现，当上述两种建模方式在AF2结构上使用MLM的训练目标进行预训练时，模型会非常迅速地过拟合（表现为在AF2的结构上预测loss非常好，但在真实PDB结构上loss停滞甚至上升）。

推测这是由于AF2预测出来的蛋白质结构带有一些**隐藏的模式（patterns），**由于前两种方式是**直接对蛋白质的三维坐标进行建模**，这些隐藏的pattern可能很轻易地就被模型识别出来，从而造成了**信息泄露**的问题，让模型无需真正学习到蛋白质的进化信息就能轻松地完成训练目标。而我们的结构词表通过将蛋白质结构编码成一维的结构序列，在尽可能保留结构信息的情况下忽略了精细的坐标数值，因此模型能够有效地利用结构信息而不受到隐藏pattern的影响。

#### Zero-shot Mutational Effect Prediction

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/tab1.png" alt="avatar" style="zoom:100%;" /></div>

#### Supervised Fine-Tuning Tasks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/tab2.png" alt="avatar" style="zoom:100%;" /></div>

### Analysis

#### Awareness of Protein Structure

模型通过在4000万的蛋白质结构上进行训练，获得了强大的表征能力。一个可能的疑问是如何确定我们的模型学到了更多的结构信息而不是模型被训练得更好？对SaProt和ESM-2在残基接触预测任务（Contact Prediction Task）上进行了测试。冻住了模型的backbone，只训练一个全连接分类层。实验结果如下

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/tab3.png" alt="avatar" style="zoom:100%;" /></div>

由于结构token的嵌入，SaProt的表现大大超越了ESM-2，这表明SaProt蕴含了非常丰富的结构信息，使其能够在结构预测任务上获得十分优异的结果。同时，我们在SCOPe数据库上对alpha蛋白质和beta蛋白质进行了可视化，结果如下

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/fig5.png" alt="avatar" style="zoom:100%;" /></div>

#### PDB versus AlphaFoldDB

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SaProt/tab4.png" alt="avatar" style="zoom:100%;" /></div>

<HR align=left color=#987cb9 SIZE=1>