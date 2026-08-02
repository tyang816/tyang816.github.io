---
layout: post
title: OpenAI-2020 Language Models are Few-Shot Learners
categories: [CL]
tags: [LLM, NLP]
proceedings: OpenAI
date: 2020-05-14
lang: en
alt_url: /zh/cl/Language-Models-are-Few-Shot-Learners/
permalink: /cl/Language-Models-are-Few-Shot-Learners/
---

> Paper: [Language Models are Few-Shot Learners](http://arxiv.org/abs/2005.14165)
>
> GPT showed that language models can gain substantially on subtasks when given a small number of in-context examples—not the full labeled set.
>
> GPT-2 took a major step beyond GPT by predicting without any task-specific examples.
>
> GPT-3 addresses GPT-2’s weaker end-task performance by returning to few-shot prompting at scale, with extensive experiments—the headline is scale and compute (“more is better”), though the write-up runs to sixty-plus pages.
>
> Quick demos and application roundups: [300+ GPT-3 Examples, Demos, Apps, Showcase, and NLP Use-cases | GPT-3 Demo](https://gpt3demo.com/)

## GPT-3: the third chapter in the NLP pre-training line

### Abstract

The model has 175 billion learnable parameters—about ten times larger than contemporary dense models—so updating weights on each subtask is prohibitively expensive; the paper avoids gradient updates and fine-tuning.

### Introduction

1. Three motivating issues:

   - Large supervised datasets require expensive annotation.
   - When test conditions fall outside the training distribution, bigger models do not always generalize better than smaller ones. Strong fine-tuning scores therefore do not necessarily prove strong pre-training generalization; the model may overfit pre-training data or overlap heavily with the fine-tuning task (e.g., switching language or domain can hurt). The setup effectively stresses raw generalization without allowing fine-tuning.
   - Humans learn new tasks without massive labeled data.
2. The authors reframe “meta-learning” as training a large model with broad generalization, and introduce “in-context learning”: conditioning on demonstration examples in the prompt without updating weights.
3. Three evaluation regimes:

   - few-shot learning: roughly 10–100 examples in context
   - one-shot learning: a single example
   - zero-shot learning: no examples—pure prompting

     <div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT3-img1.png" alt="avatar" style="zoom:60%;" /></div>

### Model

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT3-img2.png" alt="avatar" style="zoom:60%;" /></div>

Two practical limitations remain:

- The method can only fit a small slice of data in context; you cannot pack an entire labeled subtask into one prompt, because the model struggles to use extremely long contexts coherently.
- If zero-shot inference is weak but one-shot helps, every inference must repeat that conditioning so the model can “retrieve” useful patterns from the middle of the context—nothing is stored via weight updates. That makes GPT-3 few-shot somewhat less convenient in deployment.

**Scaling analysis**:

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT3-img3.png" alt="avatar" style="zoom:60%;" /></div>

Small models need modest batch sizes mainly because they overfit easily, so stochastic gradients are noisier. Larger models tolerate—and benefit from—larger batches with less harmful noise. Intuitive explanations include the idea that big models may internalize simpler effective substructures that small models cannot represent as cleanly.

### Dataset

To scale training, the authors revisit Common Crawl and apply filtering:

- Train a logistic binary classifier with GPT-2’s training mix as positive and Common Crawl as negative; score Crawl documents and keep high-quality positives, discard very negative ones.
- Deduplicate with **LSH** to measure similarity between document sets.
- Blend in known high-quality corpora.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT3-img4.png" alt="avatar" style="zoom:60%;" /></div>

Despite Crawl’s size, it is still treated as lower quality, so sampling rates are tuned so each batch retains a fraction of higher-quality data.

### Evaluation

Downstream tasks condition on *K* sampled examples. Multi-class prompts use “Answer:” or “A:”; binary tasks use “True” or “False”; free-form generation uses **Beam Search**.

### Result

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT3-img5.png" alt="avatar" style="zoom:60%;" /></div>

Validation loss correlates with subtask accuracy and tracks pre-training quality. With a well-chosen model and without over-training, **loss decreases roughly linearly as compute grows exponentially**.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT3-img6.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT3-img7.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPT/GPT3-img8.png" alt="avatar" style="zoom:60%;" /></div>

### Limitation

1. Long-form creative generation (e.g., fiction) is still weak; infilling/completion works better.
2. Architecture and training objective are one-directional—unlike BERT, there is no full bidirectional context within the autoregressive stack.
3. Every token is predicted with uniform weight; the model does not explicitly emphasize “important” tokens and may spend capacity on function words.
4. No video, physical interaction, or similar multimodal grounding in training.
5. Demonstration examples are not always used effectively.
6. It is unclear whether multiple in-context examples induce true task learning from scratch or mainly trigger retrieval of memorized patterns—if the latter, generalization reduces to dataset scale.
7. Training is extremely costly; behavior is hard to interpret—success is largely attributed to scale.

<HR align=left color=#987cb9 SIZE=1>
