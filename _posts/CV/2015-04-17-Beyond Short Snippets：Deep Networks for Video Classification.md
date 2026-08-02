---
layout: post
title: CVPR-2015 Beyond Short Snippets：Deep Networks for Video Classification
categories: [CV]
tags: [video, vision-language, transformer]
proceedings: CVPR
date: 2015-04-17
lang: en
alt_url: /zh/cv/Beyond-Short-Snippets：Deep-Networks-for-Video-Classification/
permalink: /cv/Beyond-Short-Snippets：Deep-Networks-for-Video-Classification/
---


> Paper: [Beyond Short Snippets：Deep Networks for Video Classification](http://ieeexplore.ieee.org/document/7299101/)
>
> Work from Google

## Longer Video Processing: The Role of Pooling and LSTM in Video Understanding

### Abstract

The paper proposes two ways to handle long videos: exploring different pooling operations, and using an LSTM to connect CNN outputs.

### Approach

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Beyond Short Snippets/img1.png" alt="avatar" style="zoom:60%;" /></div>

Following the two-stream idea, using only a few frames from the raw video is too short; what if there are many more frames?

First, features must be extracted from all frames (e.g., hand-crafted descriptors or convolutional networks). The key question is how to pool after extraction—simple max or average pooling, and this paper explores many variants. **The overall conclusion is that they perform similarly**, with ConvPooling working best. They also try LSTM-based feature fusion, but the gain is limited.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Beyond Short Snippets/img4.png" alt="avatar" style="zoom:60%;" /></div>

Each video frame is passed through a convolutional network (weight sharing) to extract features; a five-layer LSTM is used, followed by softmax.

### Result

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Beyond Short Snippets/table5.png" alt="avatar" style="zoom:60%;" /></div>

On Sports-1M, the LSTM is not as helpful as expected—perhaps because LSTM captures relatively high-level patterns, and **even with many frames the clip is still fairly short**, so **semantic content does not change much**. The LSTM mostly receives similar inputs and may learn little, so improvements stay small. LSTM should matter more when motion is strong or videos are truly long.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/Beyond Short Snippets/table7.png" alt="avatar" style="zoom:60%;" /></div>

On UCF-101, results improve only slightly; the gain is very limited.

<HR align=left color=#987cb9 SIZE=1>

