---
layout: post
title: AAAI-2017 SeqGAN：Sequence Generative Adversarial Nets with Policy Gradient
categories: [CL]
tags: [LLM, NLP]
proceedings: AAAI
date: 2017-02-04
---

> 论文地址：[SeqGAN: Sequence Generative Adversarial Nets with Policy Gradient](https://dl.acm.org/doi/10.5555/3298483.3298649)
>
> 论文实现：<https://github.com/LantaoYu/SeqGAN>

## SeqGAN：序列对抗网络

### 1. 总结

1. 第一个用 GAN 处理离散字符序列的方法。
2. exposure bias：模型迭代地生成一个序列，并根据其先前预测的可能从未在训练数据中观察到的标记来预测下一个标记。这种训练和推断的的差距会随序列长度而累计误差。
3. GAN 能减缓 exposure bias 这一问题，但又存在两个问题：

   2.1 GAN 难以适用于离散的 token 序列生成，因为模型 G 微小的变化对于离散的词表空间其实微乎其微，变化不大，就导致这个损失的梯度其实很难使 G 和 D 共同训练。

   2.2 GAN 只能对整个序列计算分数/损失，但对于部分生成的序列，平衡现在和未来的分数也是很重要的。

> 这里其实引申出来一个我个人思考的问题：一个合理的特定的评价指标能否推动一个小方向的发展，或许在学科基础的研究方向上有突破能极大的带动一个领域的发展。

### 2. 强化学习

SeqGAN主要借鉴了强化学习中的方法。

强化学习的核心是在实践中通过不断试错来学习最好的策略，一般强化学习学到的是一系列决策，其目标是最大化长期收益，例如围棋比赛中当前的操作不仅需要考虑接下来一步的收益，还需要考虑未来多步的收益。

强化学习有几个核心概念：状态s（State）、动作a（Action）、奖励r（Reward）。以生成词系列为例，假设词系列是$Y_{1:T}=(y_1,...,y_t,...,y_T)$，在第 t 个时间步，状态 s 是先前已生成的词 $(y_1,...,y_{t−1})$，动作 a 是如何选择要生成的词 $y_t$，这也是生成模型的工作 $G_θ(y_t|Y_{1:t−1})$ ，它通过前 t-1 个词以及模型参数 $\theta$ 来选择下一个词，确定了该词之后，状态也随之改变成 $s’$，对应词 $(y_1,...,y_t)$，以此类推，最终生成的系列 $(y_1,...,y_t,...,y_T)$，对序列的评分就是奖励r，如果生成的系列成功地骗过了判别模型D，则得1分，如果被识别出是机器生成的则得0分。

强化学习中还有两个重要概念：动作价值action-value和状态价值state-value。简单地说，动作价值就是在某个状态选择某一动作是好是坏，如果能确定每一个动作对应的价值，就很容易做出决定。动作价值不仅与当前动作有关，还涉及此动作之后一系列动作带来的价值。状态价值也是同理，它表示某个状态的好坏。

### 3. SeqGAN原理

SeqGAN中生成模型G的目标是最大化期望奖励reward，简单说就是做出可能是奖励最大的选择，其公式如下：

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img1.png" alt="avatar" style="zoom: 67%;" />

上式中 $J$ 是目标函数，$E[]$ 是期望，$R$ 是序列整体的奖励值，$s$ 是状态，$θ$ 是生成模型的参数，$y$ 是生成的下一个词（动作action），$G$ 是生成模型，$D$ 是判别模型，$Q$ 是动作价值（action-value）。简单地解释公式：希望得到一组生成模型 $G$ 参数 $θ$；能在 $s_0$ 处做出最佳选择，获取最大回报 $R_T$，而如何选择动作又取决于动作的价值 $Q$。

动作价值算法：

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img2.png" alt="avatar" style="zoom:67%;" />

动作价值是由判别函数D判定的，第T个时间步是最后一个时间步，上式中列出的是判别函数对完整系列的打分。若判别该序列为真实文本，则奖励值R最大。

在生成第 $t$ 个词时，如何选择（动作 $a$）涉及前期已生成的 $t-1$个词（状态 $s$），以及后续可能的情况，假设此时用模型 $G_β$ 生成Ｎ个备选词串 $(Y_{t:T})$，再用判别模型D分别对生成的N句 $(Y_{1:T})$ 打分，此时使用了蒙特卡洛方法（MC），如下式所示：

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img3.png" alt="avatar" style="zoom: 67%;" />

这里的生成模型 $G_β$ 与前面 $G_θ$ 通常使用同样的模型参数，有时为了优化速度也可使用不同模型参数。这里使用的蒙特卡洛算法，像下棋一样，不仅要考虑当前一步的最优解，还需要考虑接下来多步组合后的最优解，用于探索此节点以及此节点后续节点 $(Y_{t:T})$ 的可能性，也叫roll-out展开，是蒙特卡洛搜索树中的核心技巧。

根据不同的时间步，采取不同的动作价值计算方法：
`<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img4.png" alt="avatar" style="zoom:67%;" />`

在最后一个时间步 $t=T$ 时，直接使用判别函数 $D$ 计算价值；在其它时间步，使用生成模型 $G_β$ 和蒙特卡洛算法生成Ｎ个后续备选项，用判别函数 $D$ 打分并计算分数的均值。

SeqGAN与GAN模型相同，在训练生成器G的同时，判别器D也迭代地更新其参数。

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img5.png" alt="avatar" style="zoom:67%;" />

此处公式与GAN相同，即优化判别模型D的参数 $φ$ ，使其对真实数据 $P_{data}$ 尽量预测为真，对模型 $G_θ$ 生成的数据尽量预测为假。

### 4. 主要流程

<img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.commyqcloud.com/SeqGAN/SeqGAN-img6.png" alt="avatar" style="zoom: 50%;" />

- 程序定义了基本生成器 $G_θ$，roll-out生成器 $G_β$，判别器 $D$，以及训练集 $S$。
- 用MLE（最大似然估计）预训练生成器 $G$。（2行）
- 用生成器生成的数据和训练集数据预训练判别器 $D$。（4-5行）
- 进入迭代对抗训练：（6行）
- 训练生成器（7-13行）
  在每一个时间步计算 $Q$，这是最关键的一步，它利用判别器 $Ｄ$、roll-out生成器 $G_β$ 以及蒙特卡罗树搜索计算行为价值，然后更新policy gradient策略梯度。
- 训练判别器（14-17行）
  将训练数据作为正例，生成器生成的样例作为反例训练判别模型 $D$。

<HR align=left color=#987cb9 SIZE=1>
