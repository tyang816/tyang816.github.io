---
layout: post
title: ACL-2022 Impact of Evaluation Methodologies on Code Summarization
categories: [SE]
tags: [code-summarization]
proceedings: ACL
date: 2022-05-20
lang: en
alt_url: /zh/notes/se/Impact-of-Evaluation-Methodologies-on-Code-Summarization/
permalink: /notes/se/Impact-of-Evaluation-Methodologies-on-Code-Summarization/
---

> Paper: [Impact of Evaluation Methodologies on Code Summarization](https://aclanthology.org/2022.acl-long.339)
>
> Code: <https://github.com/EngineeringSoftware/time-segmented-evaluation>
>
> This paper reflects on evaluation methodology and dataset splitting; I find it highly instructive.

## Time segmented: splitting datasets by timestamp

### Abstract

How practitioners split datasets into training, validation, and test sets has received little systematic study. The authors propose **time-segmented dataset splitting** based on timestamps, compare it with common mixed-project and cross-project splits, and describe realistic deployment scenarios for this approach.

### Introduction

Although data-driven deep learning has driven many new techniques, evaluation methodology remains understudied.

Time-based dataset design is meaningful in software engineering: newly written summaries are often influenced by older ones, yet prior work typically **assumes data are independent and identically distributed (i.i.d.)**, which can inflate reported metrics or mislead practitioners when models are deployed.

Rather than evaluating generated comments without regard to when code was written (batch processing), a more realistic setting is continuous use: a model trained at one timestamp is evaluated on data from later timestamps (continuous processing).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/time segmented/img1.png" alt="avatar" style="zoom:60%;" /></div>

Time-segmented dataset split

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/time segmented/img2.png" alt="avatar" style="zoom:60%;" /></div>

Mixed-project dataset split

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/time segmented/img3.png" alt="avatar" style="zoom:60%;" /></div>

Cross-project dataset split

The authors argue that we need to choose evaluation methodologies more carefully when reporting ML results, aligning splits with the target task and intended use.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/time segmented/table1.png" alt="avatar" style="zoom:60%;" /></div>

### Use Cases

Earlier ML work focused on benchmarks without clearly describing real use cases. We should ask how developers will actually use these models. The authors sketch several hypothetical scenarios (acknowledged as illustrative rather than empirically validated).

Use mixed-project evaluation when developers have written some comments; use cross-project when they have written none; use time-segmented splitting when comments are written contemporaneously within the same timeline.

### Application of Methodologies

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/time segmented/img4.png" alt="avatar" style="zoom:60%;" /></div>

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/time segmented/table3.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/time segmented/table4.png" alt="avatar" style="zoom:60%;" /></div>

### Future Work

#### Methodologies for Other SE Areas Using ML Models

Transferring this approach beyond code summarization mainly requires adapting inputs and outputs—for example, for commit-message generation, replace “(code, comment) pairs” with “(code change, commit message) pairs.”

#### Other Use Cases and Methodologies

**Cross-project continuous use case:** At time $\tau$, training does not use prior data from the same project but instead samples from other projects. This may be less practical but can better stress-test generalization.

**Online continuous use case:** At time $\tau$, training neither discards the model from time $t$ nor retrains from scratch; it uses **online learning**, updating with data between $\tau^{-1}$ and $\tau$.

<HR align=left color=#987cb9 SIZE=1>

