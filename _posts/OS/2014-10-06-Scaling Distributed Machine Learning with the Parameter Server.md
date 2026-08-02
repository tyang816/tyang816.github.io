---
layout: post
title: OSDI-2014 Scaling Distributed Machine Learning with the Parameter Server
categories: [OS]
tags: [distributed-dataflow]
proceedings: OSDI
date: 2014-10-06
lang: en
alt_url: /zh/notes/os/Scaling-Distributed-Machine-Learning-with-the-Parameter-Server/
permalink: /notes/os/Scaling-Distributed-Machine-Learning-with-the-Parameter-Server/
---

> Paper: [Scaling Distributed Machine Learning with the Parameter Server](http://dl.acm.org/citation.cfm?doid=2640087.2644155)

## Parameter Server: Distributed Large-Scale Machine Learning

### Abstract

Data and tasks are distributed across task nodes or worker nodes, while a server node maintains globally shared parameters represented as dense or sparse matrices or vectors.

Billions of data points and parameters arise in algorithms such as LR and LDA.

### Introduction

When data scale is large, a handful of machines can hardly finish the job, yet building a high-performance distributed algorithm is difficult—mainly because of high computational complexity and heavy communication.

Real-world large models have on the order of $10^9$ to $10^{12}$ parameters. These complex models must be shared globally, and all compute nodes access them, which raises three issues:

- Parameter access creates substantial **network traffic**
- Machine learning algorithms are inherently sequential and require extensive **global synchronization**
- At large scale, **fault tolerance** becomes critical

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Parameter Server/table1.png" alt="avatar" style="zoom:60%;" /></div>

The table above shows that failure rates grow quickly as scale increases.

#### Contribution

Abstracting a shared module makes task-specific code simpler and allows adaptation to diverse ML algorithms.

Academia often scales a paper’s ML algorithm blindly by 10× or 100×, but production workloads do not grow that way in practice. This work derives system-level abstractions from real compute workloads, with five key properties:

- **Efficient communication**: asynchronous communication plus aggressive compression tailored to ML algorithms
- **Flexible consistency models**: consistency means whether different machines read exactly the same value when accessing the same node, or see some delay. Weaker consistency is friendlier to the system but can hurt algorithm effectiveness
- **Elastic scalability**: adding nodes does not stop the job
- **Fault tolerance**: how much time recovery takes
- **Ease of use**: global parameters as vectors and matrices (at the time, C++ made this hard to use)

The main novelty is identifying the right interface between machine learning and systems.

#### Engineering Challenge

Distributed training requires continuous reads and writes to global parameters. The parameter server aggregates statistics and state from compute nodes: each parameter-server node holds a shard of the global shared parameters, with many machines cooperating. Each worker fetches a subset of parameters to compute, which leads to:

- **Communication**: Key-value stores offer abstractions ill-suited to ML—sending one key with one floating-point update per message is too expensive. ML algorithms operate on structured mathematical objects (vectors, tensors), so messages should carry contiguous ranges (e.g., a layer slice, a segment of a vector) to enable batched updates.
- **Fault tolerance**: live replication for each server node

### Architecture

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Parameter Server/img4.png" alt="avatar" style="zoom:60%;" /></div>

#### (Key, Value) Vectors

In industry, keys are typically long hashed vectors or int64/int128 integers; values are floats, vectors, or neural-network weights $w$. This layout lets applications use numerical libraries instead of raw C++.

#### Range Push and Pull

Two communication primitives inspired by git:

They send contiguous key–value ranges, avoiding fragmented, per-key chatter.

#### User-Defined Functions on the Server

User-defined functions on the server side add flexibility.

#### Asynchronous Tasks and Dependency

Tasks are executed remotely (RPC).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Parameter Server/img5.png" alt="avatar" style="zoom:60%;" /></div>

For performance, all tasks can run asynchronously. For example, with four scheduler nodes, each iteration can issue work to them in sequence—without waiting for worker 0 to finish before continuing on worker 1.

Dependencies can also require a server task to complete before the next task runs.

#### Flexible Consistency

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Parameter Server/img6.png" alt="avatar" style="zoom:60%;" /></div>

The figure above illustrates common consistency models for ML.

a) The next task must wait until the previous one finishes.

b) Tasks keep running; parameters are updated when the network keeps up, but convergence may not be fastest.

c) Bounded staleness is allowed—delay cannot grow without limit. The delay bound can be tuned like a hyperparameter.

#### User-defined Filters

Not every value must be sent every time. Filters suppress redundant traffic—for example, skip sending a weight $W$ if it changed little since the last round.

### Implementation

#### Vector Clock

Suppose many workers access data $W$ but are at different logical times. The server must track which version of $W$ each worker uses—a naïve approach is expensive, equivalent to replicating weights per worker.

Because the API sends key ranges rather than single keys, tracking can be relaxed to per-range metadata. Deep models may have tens of billions of parameters, but each step only pushes/pulls one layer’s weights; vector clocks then record, per layer and per worker, which timestamp’s values are in use, reducing storage.

#### Message

Each message is a range containing keys and values, but the server mainly needs values—ideally keys are omitted or sent rarely. Send keys once when data is unchanged and weights add no new keys; afterward omit them.

Keys are re-hashed; the server compares hash digests and skips key payloads when they match, implemented via a filter.

#### Consistent Hash

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Parameter Server/img7-8.png" alt="avatar" style="zoom:60%;" /></div>

The consistent-hash ring shows how the server stores weights: the key space is partitioned into ranges, each owned by one server node, with adjacent ranges replicated for backup.

Adding a node splits a range; the original owner hands one half to the new node while backup synchronization proceeds in parallel.

#### Worker Management

The scheduler continuously monitors (pings) workers. If a task stalls or a worker fails, work is reassigned to another worker or new workers are requested from the cluster for fault tolerance.

### Evaluation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Parameter Server/img9.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Parameter Server/img10.png" alt="avatar" style="zoom:50%;" /></div>

Asynchronous execution reduces wait time but can increase time to convergence.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Parameter Server/img11-13.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
