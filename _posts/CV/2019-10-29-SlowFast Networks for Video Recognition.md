---
layout: post
title: ICCV-2019 SlowFast Networks for Video Recognition
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: ICCV
date: 2019-10-29
lang: en
alt_url: /zh/notes/cv/SlowFast-Networks-for-Video-Recognition/
permalink: /notes/cv/SlowFast-Networks-for-Video-Recognition/
---

> Paper: [SlowFast Networks for Video Recognition](https://ieeexplore.ieee.org/document/9008780/)

## SlowFast: Slow and Fast Pathways for Video Recognition

### Abstract

The motivation draws on the human visual system, which has two cell types: P-cells (~80%) process static imagery, while M-cells process motion—reminiscent of two-stream designs. The authors propose a network with one **slow** pathway and one **fast** pathway.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SlowFast/img1.png" alt="avatar" style="zoom:60%;" /></div>

**Slow pathway:** Use a very low frame rate (e.g., sample one frame every 16 frames) to learn static appearance and scene context. Because P-cells dominate in number and scene modeling is relatively difficult, most of the model capacity is allocated to the slow branch. In short, the slow pathway is essentially a large I3D-style network; with fewer frames, overall complexity remains moderate.

**Fast pathway:** Sample more densely (e.g., one frame every 4 frames) and feed the fast branch. This pathway is kept as small as possible to encode motion.

**Lateral connections:** The two pathways are fused so they interact and jointly learn spatiotemporal features.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SlowFast/table1.png" alt="avatar" style="zoom:60%;" /></div>

The full forward pass and network structure are summarized above.

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SlowFast/table2.png" alt="avatar" style="zoom:60%;" /></div>

SlowFast accuracy keeps improving as the number of input frames increases and non-local blocks are added.

<HR align=left color=#987cb9 SIZE=1>

