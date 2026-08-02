---
layout: post
title: NeurIPS-2022 Chain of Thought Prompting Elicits Reasoning in Large Language Models
categories: [CL]
tags: [LLM, NLP]
proceedings: NeurIPS
date: 2022-01-28
lang: en
alt_url: /zh/notes/cl/Chain-of-Thought-Prompting-Elicits-Reasoning-in-Large-Language-Models/
permalink: /notes/cl/Chain-of-Thought-Prompting-Elicits-Reasoning-in-Large-Language-Models/
---

> Paper: [Chain of Thought Prompting Elicits Reasoning in Large Language Models](https://openreview.net/pdf?id=_VjQlMeSB_J)
>
> Code: <https://github.com/amazon-science/auto-cot>
>
> Do AIs need encouragement? Adding “let’s think step by step” to a language model prompt improves performance on math problems—a phrase that became a meme.
>
> Auto-CoT designs questions and reasoning steps for the model so it can follow the problem through to the correct answer, often outperforming manually designed prompts.

## CoT: Reasoning chains guide language models

### Abstract

Language models keep scaling up, measured by compute, dataset size, and parameter count. Even so, large models still struggle on reasoning and symbolic tasks. The paper proposes chain of thought (CoT): the step-by-step reasoning humans use when tackling a problem, expressed as a sequence of short sentences.

### Introduction (arxiv v2)

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/fig1.png" alt="avatar" style /></div>

Once language models reach on the order of 100B parameters, they achieve very strong results on sentiment analysis and topic classification—System 1 tasks that can be solved quickly and intuitively.

Another class of tasks is System 2: they require careful thought and involve logical, mathematical, and commonsense reasoning. Even models with hundreds of billions of parameters often fail to “crack” these benchmarks; performance does not reliably improve with scale, so brute-force scaling alone is no longer enough.

### Chain-of-Thought Prompting

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/fig3.png" alt="avatar" style /></div>

Prompting examples show the reasoning steps first, then the final answer.

*   CoT decomposes a problem into multiple steps; harder problems tend to generate more tokens, allocating more computation to questions that need deeper reasoning.
*   It improves interpretability: even when the answer is wrong, one can see how it was derived.
*   In principle, it applies to any problem humans can solve via language.
*   Few-shot examples elicit the model to continue with intermediate reasoning steps.

### Arithmetic Reasoning

Arithmetic reasoning here focuses on problems solvable by children roughly 6–10 years old.

#### Chain-of-thought prompting

The authors manually design eight few-shot examples with full CoT reasoning chains—costly and hard to tune.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/fig4.png" alt="avatar" style /></div>

These results highlight how important CoT is.

#### Ablation Study

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/tab6.png" alt="avatar" style /></div>

The method is simple—and arguably cannot be much simpler.

Replacing the CoT segment with “equation only” (expressions without verbal reasoning) or other variants consistently underperforms full CoT, underscoring the role of natural language in the chain.

#### Robustness of Chain of Thought

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CoT/fig6.png" alt="avatar" style /></div>

Because CoT can be sensitive to prompt details, the authors evaluate robustness: CoT-enabled settings consistently outperform non-CoT baselines by a wide margin.

<hr align="left" color="#987cb9" size="1">
