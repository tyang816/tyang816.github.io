---
layout: post
title: DeepMind-2022 Competition-Level Code Generation with AlphaCode
categories: [SE]
tags: [code-generation]
proceedings: DeepMind
date: 2022-03-07
lang: en
alt_url: /zh/se/Competition-Level-Code-Generation-with-AlphaCode/
permalink: /se/Competition-Level-Code-Generation-with-AlphaCode/
---

> Paper: [Competition-Level Code Generation with AlphaCode](http://arxiv.org/abs/2203.07814)

## AlphaCode: competition-level code generation

### Abstract

AI-driven code generation remains difficult. The authors argue that prior work targets relatively easy settings—often treating program instructions as a machine translation problem—and still fails on genuinely hard tasks. They therefore study competitive programming problems and show that on Codeforces their system ranks above roughly half of more than five thousand participants.

This requires (1) a strong dataset; (2) an efficient Transformer-based architecture; and (3) an effective sampling strategy to generate a large pool of candidate solutions.

### Introduction

Methods such as Codex for generating short code snippets resemble direct translation and need not deeply understand what the code is doing; the authors therefore target harder problems.

On ICPC- and IOI-style contests, performance is poor: Codex only passes a few test cases.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img1.png" alt="avatar" style="zoom:60%;" /></div>

The system is estimated to outperform about 72% of competitors.

#### Evaluation

Because online contests are scarce, evaluation is offline. The metric is `n@k`: the model samples *k* candidate programs, ranks them, and takes the top *n*; the problem counts as solved if any of those is correct.

### Dataset

**Pre-training data:** In addition to Python, the authors collect C, Go, Scala, and other languages, yielding 715 GB—about five times the scale of Codex’s corpus.

**Fine-tuning data:** Codeforces problems plus data scraped from other sites are combined into **CodeContests**.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img2.png" alt="avatar" style="zoom:60%;" /></div>

When crawling, a key issue is whether to include all official test cases in training. If every test is available, the model may adapt to those cases and report inflated scores with weak generalization. If not all tests are collected, a generated solution may be wrong on edge cases yet still pass the limited checks available during training.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img3.png" alt="avatar" style="zoom:60%;" /></div>

**FP** (false pass) means too few test cases wrongly accept an incorrect solution; **Slow Rate** means time-limit exceeded. Both decrease when more test cases are added.

### Model

#### Architecture

The model uses a full Transformer encoder–decoder stack: problem statements are long, so a decoder-only model may not suffice; encoder-only is also inadequate because generated code can be long—decoders are better suited to generation.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img4.png" alt="avatar" style="zoom:60%;" /></div>

Design choices:

- Separate projection matrices for queries; keys and values share one projection matrix to reduce compute.
- The decoder is six times deeper than the encoder: a shallow encoder suffices to encode the problem text; most capacity goes to code generation.
- **Asymmetric lengths:** encoder context length 1536, decoder 768. Because Transformer cost scales quadratically with sequence length and the decoder is deep, decoder length is kept shorter.
- Tokenizer: SentencePiece with vocabulary size 8000.

#### Fine-tuning

- **Tempering:** sampling temperature \(T = 0.2\).
- **Value conditioning & prediction:** For assumed-correct solutions, the prefix “Correct Solution” is prepended to the problem; an auxiliary binary loss predicts whether the current solution is correct.
- **GOLD:** A problem may have many solutions, but training should emphasize producing one correct program rather than mixing correct and incorrect ones. Each sample carries a weight: once a correct solution for a problem is good enough, its weight is increased and other solutions are down-weighted. This offline reweighting scheme is **GOLD**, an offline reinforcement-learning method.

#### Large-scale sampling

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img5.png" alt="avatar" style="zoom:60%;" /></div>

At scale, three tricks increase diversity:

- Generate half the samples in Python and half in C++.
- Randomize prompt fields (e.g., set RATING to 100) before concatenating with the problem to steer different outputs.
- Use a slightly higher temperature, \(T = 0.25\).

#### Filtering

For each problem, only outputs predicted as correct are kept. This removes about 99% of model outputs; still, for roughly 10% of problems no sample passes the tests, while for the rest many candidates remain after filtering.

#### Clustering

An auxiliary model predicts additional test inputs. Earlier work often mutated existing tests; here predicted tests aim to generalize to unseen problem instances.

These synthetic tests need not be ground-truth correct. Generated programs are run on them; outputs are used to cluster solutions. Clusters group code that is similar syntactically or semantically; one representative per cluster is kept.

Clusters are ordered by size and submissions follow that order; the authors find this works well.

### Result

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img6.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img7.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img8.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/AlphaCode/AlphaCode-img9.png" alt="avatar" style="zoom:60%;" /></div>

Multilingual training helps.

### Capabilities & limitations

1. Does the model copy code verbatim from training? On novel problems, copy-paste is unlikely.
2. Is generated code bloated (e.g., leftover comments)? Parse to AST, prune useless branches, and regenerate clean code.
3. Simplifying the problem statement can improve accuracy.
4. Lower validation loss is not always better; multiple valid solutions per problem can make validation loss a weak signal.

<HR align=left color=#987cb9 SIZE=1>
