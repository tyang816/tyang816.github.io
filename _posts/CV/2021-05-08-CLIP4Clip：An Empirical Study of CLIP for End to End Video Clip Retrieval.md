---
layout: post
title: arXiv-2021 CLIP4Clip：An Empirical Study of CLIP for End to End Video Clip Retrieval
categories: [CV]
tags: [Video, Contrastive Learning]
proceedings: arXiv
date: 2021-05-08
lang: en
alt_url: /zh/notes/cv/CLIP4Clip：An-Empirical-Study-of-CLIP-for-End-to-End-Video-Clip-Retrieval/
permalink: /notes/cv/CLIP4Clip：An-Empirical-Study-of-CLIP-for-End-to-End-Video-Clip-Retrieval/
redirect_from:
  - "/cv/CLIP4Clip：An-Empirical-Study-of-CLIP-for-End-to-End-Video-Clip-Retrieval/"
  - "/CV/CLIP4Clip：An-Empirical-Study-of-CLIP-for-End-to-End-Video-Clip-Retrieval/"
---

> Paper: [CLIP4Clip：An Empirical Study of CLIP for End to End Video Clip Retrieval](http://arxiv.org/abs/2104.08860)
>
> Code: <https://github.com/ArrowLuo/CLIP4Clip>

## CLIP4Clip: An empirical study of multi-frame fusion for video–text retrieval

### Abstract

The authors propose CLIP4Clip to transfer CLIP to video–language retrieval in an end-to-end manner and examine several questions: (1) Are image-level features sufficient for video–text retrieval? (2) How does post-pretraining on large-scale video–text data built on CLIP affect performance? (3) What mechanism best captures temporal dependencies among video frames in practice? (4) How sensitive is the model to hyperparameters on video–text retrieval?

### Introduction

CLIP uses a dual-tower design with separate image and text encoders; similarity reduces to a dot product, and features can be precomputed offline—making it well suited to search and retrieval. Video adds a temporal dimension on top of this setup.

### Framework

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP4Clip/fig1.png" alt="avatar" style="zoom:60%;" /></div>

**Temporal structure in video.** Suppose 10 frames are patchified and passed through a ViT, yielding 10 CLS tokens—global representations of 10 frames. In the image setting, one text embedding is matched to one image embedding via a dot product; here, one text embedding is matched against 10 frame-level embeddings.

The authors evaluate the three strategies illustrated above:

- **No temporal modeling:** average the 10 frame embeddings directly, ignoring order (e.g., the progression of someone sitting down cannot be captured).
- **Sequential modeling:** feed the 10 embeddings into an LSTM or Transformer.
- **Early fusion:** concatenate or jointly encode text and frames in a Transformer and predict similarity through an MLP.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP4Clip/tab1.png" alt="avatar" style="zoom:90%;" /></div>

Recall improves substantially, but much of the gain comes from CLIP itself—transfer is strong, and zero-shot already outperforms prior methods by a wide margin.

With limited data, simple averaging works best; with more data, parameterized fusion helps somewhat but only marginally over mean pooling.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/CLIP4Clip/tab2-tab5.png" alt="avatar" style="zoom:90%;" /></div>

**Mean pooling is often the strongest baseline.** Although it cannot model temporal order in principle, it works remarkably well in practice; sequential variants occasionally win slightly, possibly because downstream video–text data remain limited.

### Conclusion

- Image-level representations can still substantially help video–text retrieval.

- Further fine-tuning on video datasets after CLIP pretraining can improve performance further, owing to a domain gap.

- 3D patch linear projection and sequential-type similarity tend to perform somewhat better.

- CLIP-based video–text retrieval is highly sensitive to the learning rate.

<HR align=left color=#987cb9 SIZE=1>
