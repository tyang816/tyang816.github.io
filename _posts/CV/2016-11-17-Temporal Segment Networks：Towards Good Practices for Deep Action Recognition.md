---
layout: post
title: ECCV-2016 Temporal Segment Networks：Towards Good Practices for Deep Action Recognition
categories: [CV]
tags: [video, action-recognition]
proceedings: ECCV
date: 2016-11-17
lang: en
alt_url: /zh/notes/cv/Temporal-Segment-Networks：Towards-Good-Practices-for-Deep-Action-Recognition/
permalink: /notes/cv/Temporal-Segment-Networks：Towards-Good-Practices-for-Deep-Action-Recognition/
---

> Paper: [Temporal Segment Networks：Towards Good Practices for Deep Action Recognition](https://link.springer.com/chapter/10.1007/978-3-319-46484-8_2)

## TSN + Practices: Temporal Segment Networks and Tips for Video Learning

### Abstract

Introduces the TSN framework, which combines sparse temporal sampling with video-level supervision, together with a set of practices for video understanding built around Temporal Segment Networks—including data augmentation, initialization, and strategies against overfitting.

### Model

#### Temporal Segment Networks

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TSN/img1.png" alt="avatar" style="zoom:60%;" /></div>

The model is relatively simple: mainly **video segmentation plus Segmental Consensus**, yet it works very well and is a notably fresh design. The same idea extends to very long videos: even when semantics differ across segments, one can simply omit Segmental Consensus (no semantic fusion) and use an LSTM instead—another reasonable option.

- With a standard two-stream network, each forward pass covers at most about ten frames—less than half a second.

- To cover longer temporal context, TSN splits the video into several segments (e.g., three in the figure above). From each segment it randomly samples one frame as the RGB input, then selects a few frames starting from that frame to compute optical flow; both streams pass through the two-stream network and produce two logits, and the other segments are handled the same way.

- “TSN” here means that although sampled frames may look different on the surface, their high-level semantics should correspond to the same action; spatial and temporal semantics are fused via Segmental Consensus, followed by late fusion for the final prediction.

#### Learning Temporal Segment Networks

##### Cross Modality Pre-training

The modalities here are **RGB frames and optical flow**.

RGB streams can be fine-tuned from ImageNet pre-training. Training the flow stream from scratch on small datasets often works poorly; the authors report that reusing ImageNet-pretrained weights for the flow branch also works very well.

The main issue is that ImageNet expects three RGB channels, whereas the flow input consists of ten flow images with x and y displacement channels. The authors **average the first-layer convolution weights of the RGB model** so three channels become one, then **replicate that channel twenty times**. This initialization is very effective.

##### Regularization Techniques

Batch Normalization speeds training but can worsen overfitting, which motivates partial BN.

- The original motivation is that fine-tuning BN layers on a small dataset **overfits quickly**, so the ideal would be to **freeze** them. **Freezing all BN layers**, however, hurts transfer because the pre-training domain (images) differs from video action recognition.

- Partial BN **unfreezes only the first BN layer and keeps the rest frozen**. Because inputs change, the first layer must adapt to the new data; deeper BN layers stay fixed to limit overfitting.

##### Data Augmentation

- Corner cropping:
  - Random cropping often lands near the image center and rarely reaches corners; the authors force crops that can include edge and corner regions.
- Scale-jittering:
  - Vary aspect ratio by resizing to 256×340, then choosing width–height pairs from {256, 224, 192, 168} for cropping.

#### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/TSN/table6.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>

