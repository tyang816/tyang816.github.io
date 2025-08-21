---
layout: post
title: Nature-2021 Highly accurate protein structure prediction with AlphaFold
categories: [BI]
tags: [protein, PLM, structure prediction]
proceedings: Nature
date: 2021-07-15
---

> 论文地址：[Highly accurate protein structure prediction with AlphaFold](https://www.nature.com/articles/s41586-021-03819-2)

## AlphaFold2：根据氨基酸预测蛋白质结构

1. 达到了原子级别的预测，2021年nature的最佳论文
2. 特征一：多重序列对比，假设输入人的氨基酸片段，从基因库对比拿出比如鱼、鸡等生物相似的氨基酸片段，这样得到不同序列的特征；特征二：同时也可以显示表示每两个氨基酸之间的关系，得到氨基酸之间的特征

   2.1 同时也在结构蛋白质数据库搜索，解析出氨基酸空间距离的模板。
3. Evoformer在原始的多头注意力上做了三个改进

   3.1 row-wise：在MSA中每次拿出一行做为序列，投影后得到q，k，v

   3.2 gated：通过线性、激活函数后与注意力权重相乘

   3.3 pair bias：计算 $q_i$ 和 $k_j$ 做点乘时，拿出第  个对表示加在这后面
4. 3D结构表示采用相对位置
5. 解码器把原点的氨基酸变形为目标形状，输入是编码器输出、对表示模板和3D结构的骨干框架，每次做一部分结构调整
6. 训练：

   6.1 使用没有标号的数据，使用噪音学生自蒸馏方法，先用有标号数据训练模型，然后用模型去预测没有标号的大数据集，然后把那些比较置信的标号拿出来，跟之前有标号的数据拼起来形成更大数据重新训练。核心是加噪音进去，不然一个错误的标号可能导致训练错上加错。

   6.2 来自bert，把蛋白质序列随机遮住一些氨基酸去预测

<HR align=left color=#987cb9 SIZE=1>

