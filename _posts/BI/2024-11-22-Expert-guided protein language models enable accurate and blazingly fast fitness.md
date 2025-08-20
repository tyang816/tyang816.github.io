---
layout: post
title: Bioinformatics-2024 Expert-guided protein language models enable accurate and blazingly fast fitness prediction
categories: [BI]
tags: [protein, mutation, PLM]
proceedings: Bioinformatics
date: 2024-11-22
---

> 论文地址：[Expert-guided protein language models enable accurate and blazingly fast fitness prediction](https://academic.oup.com/bioinformatics/article/40/11/btae621/7907184)
>
> 论文实现：<https://github.com/jschlensok/vespag>

## VespaG：FNN+PLM表征在GEMME标注数据训练

### Abstract

**Motivation**: 使用湿实验注释蛋白质突变的影响成本仍然高昂，因此引入了VespaG，一个快速的氨基酸突变效应预测器，利用PLM的embedding作为最小深度模型的输入

**Results**: 为了克服实验训练数据的稀疏性，研究人员创建了一个基于GEMME的包含**3900万个单一氨基酸变体**的大型数据集，在**ProteinGym基准测试**（包括217个多重突变效应实验，涵盖约250万个变体）中，VespaG取得了**平均Spearman相关系数为0.48 ± 0.02**的成绩，能够在一台**普通笔记本电脑**（12核CPU，16GB RAM）上，在**不到30分钟**的时间内预测整个人类或果蝇蛋白质组的所有突变

### Introduction

**计算模型的引入**可以帮助研究人员深入理解蛋白变体的功能影响，并优先考虑最具潜在价值的突变进行实验验证。然而，当前计算模型面临的主要挑战是**实验数据的稀疏性**。许多监督机器学习（ML）方法尽管在特定数据集上表现优异，但往往仅针对已经通过MAVE表征或与疾病相关的变体。这一局限性导致在极少数实验数据集上，各种方法之间的预测高度相关，但在**人类蛋白质组的所有可能突变**上，它们的预测一致性较差。此外，这些方法对数据中的**噪声和不确定性**高度敏感

当前最成功的无监督方法中，**GEMME（Global Epistatic Model for Mutational Effects）是一种表现优异的模型，它显式地建模蛋白序列的进化历史**。GEMME依赖于多序列比对（MSA），通过沿着系统发育树的拓扑结构评估蛋白位点对突变的敏感性，以及适应替换所需的变异次数。该方法仅依赖少量生物学上有意义的参数，并且在输入MSA低变异性的情况下表现出良好的鲁棒性。

在此工作中，研究人员提出了**VespaG**，该方法**优化了预测速度**，绕过了传统计算昂贵的掩码标记重建任务，而是直接将pLM嵌入映射到完整的突变景观。他们采用进化模型GEMME作为教师模型，训练了一个相对简单的深度学习网络（包含66万自由参数），从而避免了计算对数几率比的需要。VespaG不仅克服了实验训练数据稀缺的问题，还避免了实验数据固有的噪声和不一致性

### Materials and methods

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VespaG/fig1.png" alt="avatar" style /></div>

#### Comparison to state-of-the-art methods

ProteinGym上的GEMME、ESM2、TranceptEVE L、PoET等

#### Method development

##### Datasets

为了生成训练数据，研究人员构建了一个主要数据集，基于**人类蛋白质组**，并为不同来源创建了额外的数据集，包括**果蝇（Drosophila melanogaster）**、**大肠杆菌（Escherichia coli）**、以及**病毒**（如流感病毒、HIV等）。每个训练数据集的构建过程如下：

1.  从**UniProt**（The UniProt Consortium 2023）下载参考蛋白质组，每个基因只包含一个蛋白质序列。
2.  剔除长度少于25个氨基酸或多于1024个氨基酸的蛋白质。
3.  通过两步去冗余处理：首先去除与测试数据冗余的蛋白质，其次去除数据集中自重复的蛋白质。

训练和验证集按80/20的比例分割，以避免数据泄露。为了解决实验数据稀缺的问题，研究人员采用了**GEMME方法**。具体而言，对于每个训练集中的蛋白质，研究人员检索并对齐了一组同源序列，使用基于**MMseqs2**的多序列比对（MSA）生成策略来生成这些同源序列。然后，GEMME利用生成的MSA来计算突变效应得分。

GEMME为每个输入的蛋白质序列生成一个完整的替代矩阵，矩阵维度为**L × 20**，其中L是蛋白质的长度。GEMME的得分范围为-10到+2。**GEMME得分**作为伪真值标准被用来训练**VespaG**。

##### Model Specifications

所有开发的模型都仅依赖于从预训练的pLM中提取的嵌入（embeddings）作为输入。具体来说，研究人员使用了两个预训练的pLM：

1.  **ProtT5-XL-U50**：这是一个**编码器-解码器**的变换器架构（transformer architecture），它在**Big Fantastic Database**上进行了预训练，并在**UniRef50**数据集上进行了微调（Elnaggar等，2022年）。
2.  **ESM-2-T36-3B-UR50**：这是一个基于**BERT的编码器**架构，具有30亿个参数，使用**UniRef50**集群的所有序列以及从UniRef90集群采样的代表链进行了训练（Lin等，2023年）。

这两个pLM在推理时没有长度限制，因此它们能够处理完整的蛋白质序列。研究人员通过从**HuggingFace**平台下载预训练模型的编码器权重，并从最后一层隐藏层提取嵌入，来计算蛋白质序列的表示。**ProtT5**生成每个残基的1024维嵌入，**ESM-2**生成2560维嵌入。嵌入的提取方法可以在GitHub仓库中找到。

研究人员没有对这些pLM进行微调，而是直接使用其预训练嵌入来进行变体效应的预测

构建了以下五种架构用于突变效应预测：

1.  **线性回归（LinReg）**：前馈神经网络（FNN）架构，没有隐藏层。
2.  **VespaG**：具有一个256单元的隐藏层的FNN架构。
3.  **FNN\_2\_layer**：具有两个隐藏层的FNN架构。
4.  **卷积神经网络（CNN）**：包含一个1维卷积层和两个隐藏的全连接层。
5.  **FNN和CNN的集成模型**：分别优化FNN和CNN（使用每种架构的最佳模型），最终输出为两者的平均值。

### Results

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VespaG/fig2.png" alt="avatar" style /></div>

VespaG是一个前馈神经网络（FNN），它有一个隐藏层，包含256个隐藏单元，仅输入来自蛋白质语言模型（pLM）ESM-2的序列嵌入

#### VespaG integrating complementary strengths

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VespaG/fig3.png" alt="avatar" style /></div>

研究人员对VespaG与GEMME、ESM-2进行了深入对比，发现：

*   **在病毒蛋白预测方面，VespaG优于ESM-2（Δρ = 0.140, P<10⁻⁴），但仍低于GEMME（Δρ = -0.048, P<10⁻⁴）**。
*   **在特定蛋白质（如酵母泛素、细菌蛋白等）上的预测表现超越GEMME，尤其在高突变敏感残基的识别方面表现出色。**

此外，VespaG不依赖于多序列比对（MSA），使其在输入数据不充足时具有更强的泛化能力，避免了GEMME因MSA质量不稳定带来的不确定性。

#### VespaG generalizing across multiple organisms

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/VespaG/fig4.png" alt="avatar" style /></div>

*   **相较于教师模型GEMME的改进**

    *   VespaG在部分蛋白（如酵母泛素蛋白RL40A）上超过了GEMME，尤其在预测高度敏感的残基（如G75和G76）时，VespaG比GEMME更加准确。
    *   GEMME在某些蛋白上的进化压力假设导致预测失误，而VespaG的深度学习方法能够更好地学习蛋白质突变与功能之间的复杂关系。
*   **跨生物物种的泛化能力**

    *   研究通过在不同物种的蛋白质上进行训练（人类、果蝇、大肠杆菌、病毒等），评估模型的迁移能力。
    *   人类蛋白（5000种），果蝇蛋白（4000种），大肠杆菌蛋白（2000种），各类病毒蛋白（1500种）

结果显示，VespaG在不同物种的泛化能力良好，且在病毒蛋白上的预测性能虽然较低，但仍优于ESM-2。

**VespaG无需重新训练即可适应新的蛋白数据集**，而GEMME的性能会受限于输入的MSA质量。

#### VespaG predictions blazingly fast

VespaG相比于其他最先进方法，在预测速度方面具有显著优势：

*   在一台普通的笔记本电脑（Intel i7-1355U，12核，1.3 GB RAM）上：

    *   处理73个蛋白的运行时间为**5.7秒**，而GEMME需要**1.27小时**。
    *   使用高性能CPU/GPU，VespaG可在**1分钟内**完成整个人类蛋白组的预测，而GEMME需要**90分钟**。

与其他方法相比：

*   VespaG的推理速度比ESM-2**快10⁵倍**（约10万倍）。
*   比GEMME和VESPA**快10³倍**（约1000倍）。

在相同计算资源下，VespaG可以在**30分钟内**完成整个人类蛋白组的单点突变预测，而GEMME只能完成25个蛋白的预测。

### Discussion

#### VespaG reached SOTA despite its simplicity

VespaG的卓越性能证明，即使是相对浅层的神经网络（仅包含66万可训练参数），也能够有效利用诸如GEMME这样的非监督方法所提供的信息。

该方法的核心优势在于：

*   **泛化能力强**：VespaG可以利用预训练蛋白语言模型(PLM)所学习的蛋白质序列表征空间，从而在不同生物体之间进行迁移学习，而无需依赖特定的输入生成或训练方案。
*   **超越传统的进化保守性假设**：VespaG的pLM嵌入能够弥补GEMME的不足，例如对蛋白质泛化能力有限，尤其是在不遵循常见进化保守性趋势的情况下，如酵母泛素（Ubiquitin）蛋白。
*   **病毒蛋白的挑战**：尽管VespaG在病毒蛋白的预测性能不如对其他生物的预测，但它仍然优于ESM-2和SaProt，这表明监督学习有助于克服pLM在病毒蛋白上的固有局限性。

#### Saving resources as criterion

**极快的推理速度**：VespaG与其他SOTA方法相比，显著减少了计算时间和资源消耗。例如，它能够在标准消费级CPU上不到30分钟完成整个人类蛋白质组的突变预测，而GEMME在相同硬件下仅能处理25个蛋白。

**计算资源友好**：

*   VespaG无需昂贵的GPU，甚至在低端硬件（Intel i7-1355U，12核，16GB RAM）上运行速度也远快于其他方法。
*   相较于ESM-2的5.35天推理时间，VespaG减少了5个数量级（100,000倍），远超GEMME和VESPA等基于MSA的预测方法。

#### Gain of speed at the expense of interpretability?

*   GEMME的优势在于其简单而可解释的两大参数（蛋白家族中的保守性程度与突变距离），而VespaG通过深度学习的方式学习这些关系，尽管缺乏直观的可解释性，但它在预测时提供了**更精细的置信度**，这对于研究人员具有重要价值。
*   VespaG的预测可以量化突变效应的强度，而不是仅仅给出二元分类结果（影响/无影响）。
*   在实际应用中，研究人员仍然可以使用MSA或进化树来支持VespaG的预测结果。

#### Interpretable models of variant effects?

*   尽管VespaG在速度和准确性之间取得了平衡，但未来仍需开发**更具生物学可解释性的模型**，以提供具体的分子或机械机制解释。
*   未来的改进方向：

    *   **引入GEMME的中间结果**：例如进化距离等信息，可帮助pLM更准确地学习蛋白质序列的变异影响。
    *   **表征功能变化**：结合VespaG与其他特定的表型预测方法（如稳定性预测），为蛋白质设计提供更全面的评估。
    *   **提高病毒蛋白的预测性能**：当前pLM在病毒蛋白上的效果较差，可能由于其序列多样性较低。未来可以探索专门针对病毒蛋白的微调技术，以改进预测能力。

<hr align="left" color="#987cb9" size="1">

