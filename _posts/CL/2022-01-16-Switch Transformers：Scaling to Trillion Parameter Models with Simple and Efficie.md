---
layout: post
title: Journal of Machine Learning Research-2022 Switch Transformers：Scaling to Trillion Parameter Models with Simple and Efficient Sparsity
categories: [CL]
tags: [LLM, NLP, transformer]
proceedings: Journal of Machine Learning Research
date: 2022-01-16
lang: en
alt_url: /zh/notes/cl/Switch-Transformers：Scaling-to-Trillion-Parameter-Models-with-Simple-and-Efficie/
permalink: /notes/cl/Switch-Transformers：Scaling-to-Trillion-Parameter-Models-with-Simple-and-Efficie/
redirect_from:
  - "/cl/Switch-Transformers：Scaling-to-Trillion-Parameter-Models-with-Simple-and-Efficie/"
  - "/CL/Switch-Transformers：Scaling-to-Trillion-Parameter-Models-with-Simple-and-Efficie/"
---

> Paper: [Switch Transformers：Scaling to Trillion Parameter Models with Simple and Efficient Sparsity](https://jmlr.org/papers/volume23/21-0998/21-0998.pdf)
>
> Code: <https://github.com/google-research/t5x>
>
> Related post: <https://www.linkresearcher.com/theses/90dd50dd-a0fa-4779-bb43-74b4f9cdee47>

## Switch Transformers: sparse large-scale models with mixture-of-experts

### Abstract

By selecting parameters per input via a mixture-of-experts (MoE) mechanism, sparsely activated models can reach very large parameter counts while keeping compute overhead acceptable.

### Introduction

MoE selectively activates only a subset of model parameters for each input, so parameter count can grow while compute stays roughly flat.

A typical MoE stack pairs a gating subnetwork (gating network) with several expert subnetworks (expert models). The gate assigns a weight to each expert’s output for input \(x\), and the final output is their weighted sum.

This work applies MoE to Transformers by treating each feed-forward network (FFN) sublayer as an expert: multiple FFNs replace a single FFN, with the simplest routing rule—\(K=1\)—so each input uses only one FFN. Routing adds little compute relative to the original block, so parameters scale up while FLOPs stay nearly unchanged.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/fig1.png" alt="avatar" style="zoom:80%;" /></div>

### Switch Transformer

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/fig2.png" alt="avatar" style="zoom:80%;" /></div>

Switch uses a bank of FFNs (up to 2048 in Switch-C). Each input token passes through a learnable Router weight matrix that yields routing probabilities; the expert with the highest probability (the tallest bar in the Router histogram) receives the token. In the figure, the second column has the largest probability, so the token is routed to the second FFN.

#### Simplifying Sparse Routing

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/frm0.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/frm1.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/frm2.png" alt="avatar" style="zoom:80%;" /></div>

The routing step is defined as above.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/fig3.png" alt="avatar" style="zoom:80%;" /></div>

The paper uses a routing policy that sends each token to exactly one expert, which cuts routing cost while preserving quality. Benefits:

(1)Less routing compute—only one expert is active;

(2)Expert batch size (expert capacity) can be at least halved;

(3)Simpler routing and lower communication cost than conventional MoE.

#### Efficient Sparse Routing

Implemented with Mesh-TensorFlow (MTF).

##### Distributed Switch Implementation 

(1)Issue: compilation fixes the graph statically, but expert assignment is dynamic—how to size each expert dimension;

(2)Approach: scale capacity with a capacity factor; excess capacity wastes compute and memory, while too little capacity drops tokens to the next layer. In practice, pick a low dropped-token rate by trading off model quality and speed.

##### A differentiable Load Balancing Loss

To encourage roughly uniform load across experts, the authors add a load-balancing auxiliary loss. It is minimized when \(f_i = p_i = 1/N\). With \(N\) experts, batch size \(B\), and \(T\) tokens, the auxiliary term is the dot product of \(f\) and \(p\).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/frm4.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/frm5.png" alt="avatar" style="zoom:80%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/frm6.png" alt="avatar" style="zoom:80%;" /></div>

#### Putting It All Together: The Switch Transformer

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/tab1.png" alt="avatar" style="zoom:80%;" /></div>

Experiments build on T5 with Switch Transformer and MoE. Main findings:

(1)Switch Transformer beats both MoE and dense baselines;

(2)Switch Transformer works better at relatively small capacity;

(3)Switch Transformer uses slightly less compute than MoE; at matched compute, Switch can improve further (Switch-base-Expand).

#### Improving Training and Fine-Tuning Techniques

##### Selective precision with large sparse models

Switch Transformer reaches over a trillion parameters. Training one expert per token introduces sparsity and hard switching, which can make optimization unstable and sensitive to random seeds.

With bfloat16, that instability hurts training. bfloat16 (Google Brain floating point) is cheaper than the float32 training used in prior MoE Transformers but less stable. The authors use selective casting: float32 only in local router computations.

Concretely, router inputs and the router function run in float32 on-device; after the function completes, broadcasts use bfloat16 so the rest of the network sees low-precision activations. float32 values never leave the local device, while cross-device traffic stays in bfloat16—stability of float32 without extra communication cost.

The table below shows the benefit: training speed matches pure bfloat16 while stability approaches float32 training.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/tab2.png" alt="avatar" style="zoom:80%;" /></div>

##### Smaller parameter initialization for stability

Stable training also depends on initialization. Weights use a truncated normal with mean \(\mu=0\) and std \(\sigma=\sqrt{s/n}\), where \(s\) is a scale hyperparameter and \(n\) is the fan-in. To reduce routing instability, the default Transformer scale \(s=1.0\) is reduced by 10×. That improves quality and reduces training instability in their runs.

Table 3 reports early-training quality and variance. Average quality (negative log perplexity) improves markedly, and run-to-run variance drops from 0.68 to 0.01. With this recipe they stably scale a ~200M-parameter baseline to a trillion-parameter model.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/tab3.png" alt="avatar" style="zoom:80%;" /></div>

##### Regularizing large sparse models

The model is pre-trained on a large corpus and fine-tuned on smaller downstream tasks, so overfitting is a concern when label data are scarce. Switch Transformer has many more parameters than dense models and may overfit more easily on small tasks.

Prior work uses dropout for regularization. Here the authors increase dropout inside experts only—expert dropout—raising dropout on the expert FFN blocks during fine-tuning.

Table 4 shows that uniform high dropout everywhere hurts; setting a modest rate (0.1) on non-expert layers and a higher rate on expert layers improves four downstream tasks.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/tab4.png" alt="avatar" style="zoom:80%;" /></div>

### Downstream Results

The team fine-tunes on GLUE, SuperGLUE, translation, summarization, and related benchmarks with the following results.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/tab5.png" alt="avatar" style="zoom:80%;" /></div>

Knowledge distillation results:

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/tab6.png" alt="avatar" style="zoom:80%;" /></div>

### Designing Models with Data, Model, and Expert-Parallelism

Standard data parallelism replicates the full model on each device; each device processes part of a batch, then gradients are aggregated and weights updated. Model parallelism shards layers or components across devices while processing one batch.

In the figure below, the top row shows weight placement and the bottom row data placement; each color is one weight matrix and each cell is one core.

**Data parallelism:** 

The first column is data parallelism: 16 replicas of the model (16 same-colored matrices). The data side is one logical batch matrix—after all-reduce, the optimizer step corresponds to one global batch.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/fig9.png" alt="avatar" style="zoom:80%;" /></div>

**Model parallelism:**

Sixteen cores jointly hold one model, but each core owns only part of the weights. The same batch runs on all cores; because weights are sharded, every step requires heavy cross-core communication.

**Expert parallelism:**

Routing originally sent tokens only to experts on the local core; with expert parallelism, tokens can be dispatched to experts on other cores as well.

### Discussion

**Q1:** Does Switch Transformer win mainly because it has more parameters?

**A1:** Yes, and that is intentional. Large models consistently perform better [1]. Switch achieves higher quality at the same compute budget and trains faster.

**Q2:** I do not have a supercomputer—is this still useful?

**A2:** The paper focuses on very large models, but even two experts can help and fit typical GPU/TPU memory. The idea still applies at smaller scale.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Switch Transformers/fig12.png" alt="avatar" style="zoom:80%;" /></div>

**Q3:** Do sparse models beat dense models on the Pareto frontier?

**A3:** Yes. At fixed compute and time, sparse models outperform dense ones in their experiments.

**Q4:** I cannot deploy a trillion-parameter model—can these models be shrunk?

**A4:** Quality after compression is not guaranteed, but distilling a sparse model into a dense one at 10–100× compression can recover roughly 30% of the expert model’s quality gain.

**Q5:** Why Switch Transformer instead of a densely model-parallel model?

**A5:** Switch is much more time-efficient than a dense model-parallel baseline. The two are compatible: model parallelism can increase FLOPs per token inside Switch, at some cost to classic model-parallel efficiency.

**Q6:** Why are sparse models not widely used yet?

**A6:** Dense models’ success—co-evolved with deep-learning hardware—dampens motivation to try sparsity. Sparse training also faces model complexity, optimization difficulty, and communication overhead. Switch Transformer makes substantial progress on these issues.


<HR align=left color=#987cb9 SIZE=1>
