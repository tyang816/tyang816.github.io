---
layout: post
title: OpenAI-2021 Evaluating Large Language Models Trained on Code
categories: [SE]
tags: [LLM, code-generation]
proceedings: OpenAI
date: 2021-07-14
lang: en
alt_url: /zh/notes/se/Evaluating-Large-Language-Models-Trained-on-Code/
permalink: /notes/se/Evaluating-Large-Language-Models-Trained-on-Code/
---

> Paper: [Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374)
>
> Codex from the OpenAI team assists programmers in generating code.

## Codex: GPT-based code tasks—innovation in application rather than algorithms

### Abstract

The OpenAI team introduced Codex, a GPT-based model fine-tuned on GitHub code. The contribution lies in application rather than a new modeling algorithm; the work focuses on Python and solves 28.8% of problems. With repeated sampling—e.g., drawing 100 completions and counting success if any one passes—the effective solve rate rises to 70.2%.

### Introduction

GPT-3 can generate simple code but struggles on harder tasks, so the authors retrained a dedicated model.

They target Python **docstrings** (comments preceding functions) and verify generated code with unit tests. They built a benchmark, [HumanEval](https://www.github.com/openai/human-eval), with straightforward math and programming-interview-style problems.

They generate multiple solutions and check whether any passes the unit tests. A 12B-parameter model reaches 28.8% accuracy; a 300M-parameter model reaches 13.2%; GPT-J at 6B reaches 11.4%; other GPT baselines are essentially 0%.

To further highlight model quality, they collected another dataset. The fine-tuned variant is **Codex-S**; even one in-context example lifts accuracy to 37.7%. With 100 samples, the probability that at least one is correct reaches 77.5%.

That setting is not realistic—you cannot give users 100 candidates and ask them to pick—so with a **ranking** procedure over candidates, the best single submission reaches 44.5% pass rate.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/codex/codex-img1.png" alt="avatar" style="zoom:60%;" /></div>

Performance still trends upward; larger data and models may help further.

### Evaluation Framework

#### Metrics

They evaluate with **pass@k**: draw k samples; success if at least one passes. Very large k overstates model quality. In production, generated code should come with confidence scores and **ranking**; oversized k makes the metric overly optimistic.

#### Estimation

Estimating pass@k by generating exactly k answers per problem is unstable, so experiments are repeated. The authors draw n samples with n > k, then subsample k of them; let c denote the number of correct samples:

$$
pass@k:=\mathbb{E}_{Problems}\left[ 1-\frac{ C_{n-c}^k}{ C_n^k}\right ]
$$

#### Validation set

Hand-written problems avoid web scraping, which often leaks training-set overlap.

### Model

#### Data collection

They collected 179 GB of Python files without license filtering, which drew criticism over legal and ethical conflicts.

#### Method

**Fine-tuning:** Initializing from GPT-3 weights was expected to help but did not improve final quality; training still converged faster—fine-tuning may or may not help accuracy but typically speeds convergence.

**Tokenization:** Runs of whitespace collapse into special tokens so the model need not consume one token per space, cutting token count by about 30%.

**Stopping:** `\nclass`, `\ndef`, `\n#`, `\nif`, or `\nprint`.

**Decoding:** Next-token prediction uses **nucleus (top-p) sampling**, not greedy argmax or beam search.

- At each step, sort candidate tokens by probability, accumulate mass from highest to lowest until the total reaches at least 0.95, sample one token from that nucleus, and continue.
- This yields diverse runs across executions while suppressing low-probability junk.

### Result

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/codex/codex-img2.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/codex/codex-img3.png" alt="avatar" style="zoom:60%;" /></div>

Dividing softmax logits by a higher temperature flattens the distribution; lower temperature sharpens it. Low temperature concentrates mass on top tokens; high temperature makes sampling more uniform.

When more samples are allowed, temperature should increase accordingly.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/codex/codex-img4.png" alt="avatar" style="zoom:60%;" /></div>

For ranking candidates, a strong heuristic averages log softmax probabilities per token; the highest-mean completion is selected.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/codex/codex-img5.png" alt="avatar" style="zoom:60%;" /></div>

BLEU correlates poorly with functional correctness and does not guarantee semantic equivalence of code.

### Supervised Fine-Tuning

They prepared an additional dataset with reference solutions—distinct from HumanEval—so overlap with the eval set might yield further gains.

- ~10,000 problems from programming contests
- Continuous integration (CI) runs unit tests on every commit in agile workflows; CI logs expose which tasks run—roughly 40,000 examples sourced this way

After collection, they filtered with the largest model: generate 100 completions per problem and keep it only if at least one passes unit tests; failures suggest an ill-posed problem or bad tests and little training value.

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/codex/codex-img6.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/codex/codex-img7.png" alt="avatar" style="zoom:60%;" /></div>

### Docstring Generation

In Python, docstrings sit between the signature and the body—hard for left-to-right GPT-style models to fill “in the middle.” They rebuilt a dataset with docstrings moved to the end.

That variant is **Codex-D**.

Evaluation:

- Human inspection
- Generate a docstring with Codex-D, implement the function from the docstring and signature, then run unit tests

<div align="center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/codex/codex-img8.png" alt="avatar" style="zoom:60%;" /></div>

### Limitation

1. Sample efficiency is limited; models may need to see substantial code volume.
2. How should docstring prompts be written? Longer docstrings degrade generated code quality.
   - They compose 13 building blocks, each a string operation (lowercase, uppercase, reorder, etc.); blocks chain arbitrarily and the model must apply them in sequence.
   - More chained blocks correlate with lower accuracy.
3. Weak at math and precise, complex operations.
4. Developers may over-rely on model-generated code.
5. Models may satisfy the literal request but not the intended use—e.g., when asked to generate comments, outputs may mimic training-data style rather than user needs.

<HR align=left color=#987cb9 SIZE=1>
