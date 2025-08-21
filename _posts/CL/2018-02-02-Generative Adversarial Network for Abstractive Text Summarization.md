---
layout: post
title: AAAI-2018 Generative Adversarial Network for Abstractive Text Summarization
categories: [CL]
tags: [NLP]
proceedings: AAAI
date: 2018-02-02
---

> 论文地址：[Generative Adversarial Network for Abstractive Text Summarization](https://ojs.aaai.org/index.php/AAAI/article/view/12141)

## 针对文本总结生成的GAN

### 1. 总结

*   提出三个挑战：

    *   seq2seq 模型倾向于生成琐碎而通用的总结，常常会包含高频词
    *   生成的总结可读性和语法欠缺
    *   目前的标准 seq2seq 模型多是采用极大似然估计预测下一个单词，这样有两个缺点：① 损失函数与评价标准有差异；② 在训练时解码器每个时间步的输入多来自真实的总结，但在测试阶段每个时间步的输入是解码器的上一步生成，这种 exposure bias 会造成测试时误差积累。
*   作者指出通过 GAN 绕过了 exposure bias 和任务指标不同问题

### 2. 模型架构

先分别预训练生成器和判别器，随后再联合训练。

#### 2.1 Generative Model

    双向 LSTM 编码生成$h_t$ 后，每一时间步由基于注意力的 LSTM 解码器计算隐状态 $s_t$ 和上下文向量 $c_t$ ， $s_t$ 和 $c_t$ concat 起来送进 fc 和 softmax 层得到每步的预测。

```math
P_{vocab}(\hat{y_t})=softmax(V'(V[s_t, c_t]+b)+b')
```

#### 2.2 Discriminative Model

    二分类器，旨在判断输入序列是人类还是机器合成的。输入一个 CNN （因为它在文本分类效果表现好）。

#### 2.3 Updating model parameters

*   更新判别器

```math
\min_{\phi}-E_{Y\sim P_{data}}[\log D_{\phi}(Y)]-E_{Y\sim G_{\theta}}[\log (1-D_{\theta}(Y))]
```

<hr align="left" color="#987cb9" size="1">

