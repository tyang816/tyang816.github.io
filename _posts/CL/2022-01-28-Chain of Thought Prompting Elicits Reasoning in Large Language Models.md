---
layout: post
title: NeurIPS-2022 Chain of Thought Prompting Elicits Reasoning in Large Language Models
categories: [CL]
tags: [LLM, NLP]
proceedings: NeurIPS
date: 2022-01-28
---

> 论文地址：[Chain of Thought Prompting Elicits Reasoning in Large Language Models](https://openreview.net/pdf?id=_VjQlMeSB_J)
>
> 论文实现：<https://github.com/amazon-science/auto-cot>
>
> AI需要求鼓励吗？在语言模型里面加上一句let's think step by step就能在数学问题上涨点，这句话也变成了一个梗
>
> Auto-CoT设计一些问题和推理步骤给模型，让模型能够顺着问题推理下去得到正确结果，比人工设计的还要好

## CoT：推理链引导语言模型

### Abstract

语言模型规模越来越大，从计算量，数据量大小和参数量大小三个角度来衡量模型大小。但即使是大模型，对于推理，符号等任务依然表现不好，所以提出了chain of thought，就是人类遇到问题时的推理步骤，以一系列短句子来表示

### Introduction (arxiv v2)

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/fig1.png" alt="avatar" style /></div>

语言模型在达到100B参数量后就能在sentiment analysis和topic classication取得非常好的结果，这种就是system1任务，能够很快被理解的任务

还有一类任务是system2，就需要仔细考虑，涉及逻辑，数学，常识的推理任务，即使模型上了几百B的参数量也很难把任务给撬开，很难实现性能随模型大小的提升而提升，不能大力出奇迹了

### Chain-of-Thought Prompting

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/fig3.png" alt="avatar" style /></div>

在给出推理步骤，再给出答案，以这样的样例给模型

*   CoT能够把问题分解成多个步骤，难的问题会生成更多token，使得需要更多推理的问题分配到更多计算量
*   提供了可解释性，不知道答案也知道答案怎么来的
*   使用上任何人类能用语言能解决的问题
*   通过few-shot learning引发语言模型续写中间步骤

### Arithmetic Reasoning

这里算术推理集中在6-10岁小朋友可以解决的问题

#### Chain-of-thought prompting

人工设计了8个带有COT推理链条的few-shot样例，成本很高，很难调试

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/fig4.png" alt="avatar" style /></div>

这里能体现出COT的重要性

#### Ablation Study

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/tab6.png" alt="avatar" style /></div>

方法很简单，但是不能再简单了

这里把COT部分替换成equation only，只包含算式的部分，或者其他方法，都有一定差距，体现出COT中自然语言的作用

#### Robustness of Chain of Thought

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/fig6.png" alt="avatar" style /></div>

对COT比较敏感所以有必要评测一下这套方法的稳健性，带COT的都比不带COT的好很多

<hr align="left" color="#987cb9" size="1">

