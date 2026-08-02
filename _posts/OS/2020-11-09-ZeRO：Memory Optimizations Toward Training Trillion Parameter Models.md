---
layout: post
title: SC-2020 ZeRO：Memory Optimizations Toward Training Trillion Parameter Models
categories: [OS]
tags: [distributed-dataflow]
proceedings: SC
date: 2020-11-09
lang: en
alt_url: /zh/notes/os/ZeRO：Memory-Optimizations-Toward-Training-Trillion-Parameter-Models/
permalink: /notes/os/ZeRO：Memory-Optimizations-Toward-Training-Trillion-Parameter-Models/
---

> Paper: [ZeRO：Memory Optimizations Toward Training Trillion Parameter Models](https://dl.acm.org/doi/10.5555/3433701.3433727)
>
> Further reading: <https://zhuanlan.zhihu.com/p/116484241>
>
> PyTorch’s FSDP—a fully sharded data-parallel API—is also grounded in ZeRO-style ideas.

## ZeRO: Sharding data to cut redundant memory overhead

### Abstract

In the prevalent data-parallel regime for deep learning training, each machine still holds a fixed full replica of model-related memory; that footprint does not shrink as parallelism increases, so device memory often becomes the bottleneck. This paper introduces the Zero Redundancy Optimizer (ZeRO) to address insufficient memory under data parallelism by spreading model state evenly across GPUs so that per-GPU consumption scales inversely with data-parallel width, with little impact on communication efficiency.

With 400 GPUs training a 100B-parameter model, the authors report nearly super-linear speedup. They train 13B-parameter models without model parallelism—bringing large models that previously required model parallelism under pure data parallelism to avoid the extra cost of model parallel schemes.

### Introduction

Models such as BERT-large, GPT-2, and Megatron-LM are too large for a single GPU. Data parallelism does not reduce per-device memory, so on a 32 GB GPU one can fit at most roughly a 1.4B-parameter model. Pipeline parallelism, model parallelism, or CPU offloading can scale further, but at the cost of compute and communication efficiency.

Among these, model (tensor) parallelism is relatively attractive, yet it does not scale gracefully as models grow because the compute-to-communication ratio worsens. The model is split vertically across layers, forcing communication at every layer and heavy traffic that stresses intra-node bandwidth. On a 40B-parameter model across two DGX-2 nodes, peak throughput reached only about 5 TFLOPS.

For large models, memory goes mainly to (1) optimizer states, gradients, and parameters, and (2) activations, temporary buffers, and fragmentation.

#### Optimizing Model State Memory

The core idea is to partition model state and place each shard on different devices.

#### Optimizing Residual State Memory

ZeRO combines data-parallel ZeRO-DP with residual-state optimizations ZeRO-R.

### Where Did All the Memory Go?

#### Model States: Optimizer States, Gradients and Parameters

With Adam, each trainable weight $w$ requires copies of gradient momentum and variance in addition to $w$ and the gradient itself—roughly doubling state. Mixed-precision training amplifies the issue. NVIDIA GPUs run faster in fp16 thanks to large matrix cores and related optimizations, often yielding several-fold speedups over fp32 for compute.

In mixed precision, layer inputs and outputs are computed in fp16, but updates use fp32 weights because fp16 accumulation can underflow; weights are then cast back to fp16.

If the model has $\Phi$ bytes of parameters, fp16 parameters and gradients each need $2\Phi$ bits (16/8). In fp32, storing $w$ plus Adam’s two states totals $12\Phi$: forward and backward use about $4\Phi$, while updates require $12\Phi$, producing large redundancy.

**For a 1.5B-parameter GPT-2, this implies at least 24 GB of memory—far above the ~3 GB needed to store fp16 parameters alone.**

#### Residual Memory Consumption

**Activations** must be kept through the forward pass for backward. For GPT-2 at 1.5B parameters, sequence length 1000, and batch size 32, storing activations can require about 60 GB.

**Temporary buffers** A flat fp32 buffer can require about 6 GB.

**Memory fragmentation** As much as ~30% of memory can be unusable due to fragmentation.

### ZeRO: Insights and Overview

#### Insights and Overview: ZeRO-DP

1. Data parallelism is usually more efficient than model parallelism because model parallelism increases communication and reduces useful compute.
2. Data parallelism is memory-inefficient and incurs substantial redundant storage.
3. Both data and model parallelism must maintain fp32 intermediate state for the weights each rank owns.

The authors propose storing each weight on only one GPU and fetching it when others need it—akin to a parameter server—thereby lowering memory use.

#### Insights and Overview: ZeRO-R

**Reducing activation memory** Under model parallelism, each input is replicated on every GPU; instead, each GPU can hold a shard and gather when needed, trading bandwidth for memory.

**Managing temporary buffers** Use fixed-size buffers.

**Managing fragmented memory** Perform defragmentation / compact allocation.

### Deep Dive into ZeRO-DP

Three partitioning modes: $P_{os}$, $P_g$, and $P_p$, also called ZeRO-1, ZeRO-2, and ZeRO-3.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ZeRO/img1.png" alt="avatar" style="zoom:60%;" /></div>

ZeRO-3 adds some communication but can overlap work asynchronously: with many layers, required tensors can be prefetched ahead of compute.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ZeRO/tab1.png" alt="avatar" style="zoom:60%;" /></div>

The table shows the largest trainable model (by parameter count) achievable under different degrees of model parallelism and GPU counts; the right column is measured in the authors’ implementation and the left is theoretical. This supports their memory accounting. Under the paper’s assumptions, $P_{os}$, $P_{os}+P_g$, and $P_{os}+P_g+P_p$ reduce memory to roughly 26%, 13%, and 1.7% of the baseline, respectively.

### Deep Dive into ZeRO-R

#### $P_a$: Partitioned Activation Checkpointing

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ZeRO/img2.png" alt="avatar" style="zoom:860%;" /></div>

The extra cost is largely recomputing layer inputs during backward. Most of the time inputs need not be fully replicated on every GPU—as in Megatron—only sharded storage suffices, reducing activation memory by roughly a factor of the GPU count.

#### $C_B$: Constant Size Buffers

Sharding can make each message small (on the order of kilobytes), which underutilizes high bandwidth; buffers can aggregate data until a threshold and then send in one shot—send when full or on timeout.

Using a fixed buffer filled before send improves bandwidth utilization. Timeout behavior guides buffer sizing: if large buffers often time out, shrink them. Many distributed runtimes implement similar logic.

#### $M_D$: Memory Defragmentation

Each GPU allocates from a pre-reserved arena for its shard; new tensors are carved from that region, mitigating long-lived fragmentation.

### Implementation and Evaluation

**Hardware** A cluster of 400 V100 GPUs with 800 Gbps interconnect bandwidth.

**Baseline** Megatron-LM.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ZeRO/fig2.png" alt="avatar" style="zoom:60%;" /></div>

For a fixed model size implemented with Megatron, performance drops sharply beyond eight GPUs because cross-node model parallelism is required.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/ZeRO/fig3.png" alt="avatar" style="zoom:60%;" /></div> Figure 3.

Scaling is nearly super-linear: at 128 GPUs throughput exceeds 2× the 64-GPU case because each machine processes a larger local batch—better matrix utilization—and compute grows while communication does not, improving the compute-to-communication ratio.

### Concluding Remarks

During all-reduce, full results need not be replicated on every GPU; each rank keeps its shard and full tensors are gathered only when needed.


<HR align=left color=#987cb9 SIZE=1>
