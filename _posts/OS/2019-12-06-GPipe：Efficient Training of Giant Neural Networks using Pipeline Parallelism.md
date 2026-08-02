---
layout: post
title: NeurIPS-2019 GPipe：Efficient Training of Giant Neural Networks using Pipeline Parallelism
categories: [OS]
tags: [pipeline-parallelism]
proceedings: NeurIPS
date: 2019-12-06
lang: en
alt_url: /zh/notes/os/GPipe：Efficient-Training-of-Giant-Neural-Networks-using-Pipeline-Parallelism/
permalink: /notes/os/GPipe：Efficient-Training-of-Giant-Neural-Networks-using-Pipeline-Parallelism/
---

> Paper: [GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism](https://proceedings.neurips.cc/paper/2019/hash/093f65e080a295f8076b1c5722a46aa2-Abstract.html)
>
> Systems for machine learning often start from a grand task that current stacks cannot handle and propose a new system to solve it. In practice, that premise is sometimes unrealistic—for example, an extremely large, deep fully connected network may not fit on one GPU, and one can design a system to train it anyway, but the effort may be of limited value: change the architecture and compute and communication patterns shift entirely, so prior optimizations may not transfer to networks that matter in production.

## GPipe: finer-grained partitioning for pipeline parallelism

### Abstract

Scaling up neural networks is beneficial, but larger models exceed the memory of a single accelerator. Extending a model across multiple accelerators typically requires specialized algorithms or architectures that are often tied to a particular model design and hard to reuse elsewhere. To enable efficient, task-agnostic model parallelism, the authors introduce GPipe, a pipeline-parallel library applicable whenever the network can be expressed as a stack of layers.

The approach pipelines distinct subsequences of layers across accelerators for flexibility and strong performance. An innovative batch-splitting scheme yields near-linear speedup when the model is partitioned across devices. Experiments on image models and multilingual machine translation show strong results.

### Introduction

Larger models tend to perform better as capacity grows.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPipe/img1.png" alt="avatar" style /></div>

Scale is constrained by hardware—memory and bandwidth—not because growth is impossible, but because the cost can become prohibitive.

The standard remedy is **model parallelism**: split the model into chunks and place them on different accelerators. The hard part is how to partition—by layers, by tensors, and so on.

GPipe rests on two main techniques:

*   **Re-materialization:** discard selected activations and recompute them when needed, reducing memory footprint.
*   **Micro-batches:** subdivide a mini-batch into smaller units for pipeline-parallel execution.

### The GPipe Library

The work builds on **Lingvo**, a TensorFlow-based framework for variable-length language models, somewhat analogous to Keras. A hallmark is **reproducibility**: the same code should yield the same results across runs and users. Hyperparameters, datasets, and related settings are encoded in code; layers and datasets inherit from a common base class that is essentially a dictionary storing keys and values such as `batch_size`.

With proper version control—e.g., a result tied to a specific code revision—prior experiments can be reproduced faithfully.

#### Interface

A network is defined as a sequence of \(L\) layers, each layer being a forward function plus learnable parameters. GPipe can also expose per-layer cost estimates (e.g., FLOPs). Given a partition into \(K\) contiguous blocks (subsequences), each block is a **cell**; denote the \(k\)-th cell by \(p_k\). After partitioning, training proceeds on that layout.

#### Algorithm

Placing the \(k\)-th block on the \(k\)-th accelerator is model parallelism in the sense that effective model memory scales by roughly \(K\): the large model is sliced so each device holds a feasible shard. **Data parallelism**, by contrast, shards the batch across GPUs that each hold a full copy of the model and synchronize via communication.

The figure below shows that naive model parallelism does not overlap computation well—execution is largely serial, with only one GPU active at a time. GPipe addresses this with **pipeline parallelism**: further split the batch into **micro-batches**, run forward/backward on micro-batches in a pipelined schedule, and **accumulate gradients** across micro-batches.

Panel (c) illustrates splitting a mini-batch into four micro-batches; with enough splits, the fraction of time when all GPUs compute in parallel increases.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPipe/img2.png" alt="avatar" style /></div>

#### Performance Optimization

Many activations must still be retained because some intermediates cannot be dropped—for example, values needed for the chain rule in backprop. Their size often scales with mini-batch size \(n\) and hidden dimension \(d\) (on the order of \(n \times d\)) and can dominate memory.

A common compiler strategy trades compute for memory: drop intermediates, keep inputs, and recompute on demand. Here, each accelerator maintains one cell and **stores only boundary activations** between cells; interior activations are discarded and recomputed.

The authors note that with micro-batch count \(M \ge 4K\), pipeline bubble overhead becomes negligible, while recomputation adds roughly 30% extra compute and communication adds further cost.

Balancing these overheads is critical to avoid bottlenecks.

### Performance Analyses

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPipe/table1.png" alt="avatar" style /></div>

How many micro-batches to use matters. CNNs are less uniform—spatial dimensions shrink while channel counts grow—so partitioning can create stragglers; with eight devices, speedup may reach only about 3×. Transformers with fixed hidden sizes partition more evenly and benefit more.

Under model parallelism, the volume of data moved per synchronization step can be smaller than in pure data-parallel all-reduce of full gradients (depending on partitioning and implementation).

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPipe/table2.png" alt="avatar" style /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPipe/table3.png" alt="avatar" style /></div>

Extra overhead from recomputation and pipeline effects is on the order of ~30%.

<div style><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/GPipe/table4.png" alt="avatar" style /></div>

### Conclusion

*   **Efficiency:** near-linear scaling in favorable settings.
*   **Flexibility:** supports arbitrary layer-wise networks.
*   **Correctness:** synchronous gradient descent equivalent in expectation to single-device training (same optimization objective when gradients are summed correctly).

<hr align="left" color="#987cb9" size="1">
