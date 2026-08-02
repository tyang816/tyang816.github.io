---
layout: post
title: MLSys-2022 Pathways：Asynchronous Distributed Dataflow for ML
categories: [OS]
tags: [distributed-dataflow]
proceedings: MLSys
date: 2022-03-23
lang: en
alt_url: /zh/os/Pathways：Asynchronous-Distributed-Dataflow-for-ML/
permalink: /os/Pathways：Asynchronous-Distributed-Dataflow-for-ML/
---

> Paper: [Pathways: Asynchronous Distributed Dataflow for ML](https://proceedings.mlsys.org/paper_files/paper/2022/file/37385144cac01dff38247ab11c119e3c-Paper.pdf)

## Pathways: training across multiple TPU pods

### Abstract

Cloud deployments expose large amounts of compute; mapping workloads onto underlying accelerator resources is a central concern for accelerator-centric training. Pathways is a system for exploring new machine learning research directions and new systems while delivering strong performance.

### Introduction

In recent years, machine learning models have co-evolved with systems and hardware. In practice, software stacks are often optimized heavily for the current workload yet adapt poorly to future requirements. This note discusses Pathways for distributed machine learning; the authors argue that such a system will be needed for future ML workloads.

Most current ML jobs use single-program multiple-data (SPMD), inherited from MPI. That may be adequate for simple distributed setups today, but future settings introduce new challenges. Models are so large that they may not fit on a single accelerator; pure data parallelism is then insufficient, and pipeline-style partitioning of parallel work becomes necessary. Some models also explore sparsity—connections are sparse rather than fully dense—which again changes how optimization should be done.

ML hardware is increasingly heterogeneous: there are “islands” of similar accelerators linked by high-bandwidth interconnects, while links between islands may be much weaker. An island may bundle many tightly coupled accelerators, or be understood as a machine packed with many GPUs. This pattern may be especially characteristic of Google’s TPU topology; other architectures may not exhibit it to the same degree. Because of this heterogeneity, practitioners may pursue multiple-program multiple-data (MPMD) execution, where each machine runs a different program and is optimized differently.

Foundation models such as BERT and GPT are very large, and training and inference may run concurrently, with a single model serving multiple services at once.

### Design Motivation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Pathways/img1.png" alt="avatar" style="zoom:60%;" /></div>

a) JAX/PyTorch SPMD

- Consider two machines in a distributed run. The upper and lower traces are CPU processes on the two hosts; both run the same code. When GPU computation is needed, the CPU sends instructions over PCIe to the GPU. For collective communication, both machines pause at the same point, perform an all-reduce on tensor `t`, then resume and compute the next step; when appropriate, they print the loss.

b) TF1 SPMD

- In a two-machine distributed run, one need not log into each machine to start the program. A controller machine compiles the program once and dispatches work to the workers, which simplifies optimization.

c) TF1 non-SPMD

- TF1 can run settings where each machine may execute **different code**. A controller-based approach provides global visibility and supports complex control logic. The downside is that the controller-driven scheduler may apply extensive graph compilation and optimization; failures can produce long, hard-to-trace error messages, unlike (a), where execution is stepwise and errors map directly to source—even enabling single-machine debugging. Debugging also cannot proceed line by line: the graph must be built first, which is cumbersome.
- The authors still argue that a centralized controller—the dataflow style—is the right design direction, but systems of that era assumed relatively small graphs. Today graphs may have thousands of nodes and run on heterogeneous hardware, so the design must be updated for current scales.

Pathways as a whole targets how to realize the dataflow model on heterogeneous clusters of thousands of accelerators and very large Transformers.

### Pathways Programming Model

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Pathways/img2.png" alt="avatar" style="zoom:60%;" /></div>

After TF1, Google developed its own TPUs and the XLA compiler, which takes a TensorFlow graph, applies compile-time optimizations, and runs on TPU; XLA later supported CPU and GPU as well and became TensorFlow’s default backend.

JAX is an XLA-oriented front end: it maps NumPy-like programs onto XLA while offering a Python-like, line-by-line programming experience. It uses deferred execution—unless a value must be printed or consumed immediately, operations are not executed right away; instead the system keeps building a graph until construction must stop, then compiles, optimizes, and runs. From the user’s perspective, the workflow still feels close to NumPy.

In Figure 2, `jax.pmap` maps a function onto two TPUs. Each small function is cheap to compute; compiling and shipping code for every tiny op would be too heavy, so Pathways adds `@pw.program` to compile and dispatch one larger function per step.

### Architecture

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Pathways/img3.png" alt="avatar" style="zoom:60%;" /></div>

TPU cores are connected by high-bandwidth links, so sending data to neighbors is fast.

At the largest scale, a **pod** has 2048 cores with very fast intra-pod TPU links. Pod-to-pod traffic goes through the datacenter network; because many applications share that bandwidth, effective throughput is lower. One can treat a pod as analogous to a single accelerator card: TensorFlow historically targeted single-host multi-GPU training, whereas Pathways aims to support pod-scale multi-machine, multi-accelerator training.

In Figure 3, regions A, B, and C can each be understood as one “island.”

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Pathways/img4.png" alt="avatar" style="zoom:60%;" /></div>

When upcoming tasks are known, some work can be completed early, avoiding long scheduling and coordination waits when individual tasks are very small.

<HR align=left color=#987cb9 SIZE=1>

