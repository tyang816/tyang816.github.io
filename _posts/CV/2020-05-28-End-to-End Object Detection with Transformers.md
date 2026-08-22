---
layout: post
title: ECCV-2020 End-to-End Object Detection with Transformers
categories: [CV]
tags: [transformer, object-detection]
proceedings: ECCV
date: 2020-05-28
lang: en
alt_url: /zh/notes/cv/End-to-End-Object-Detection-with-Transformers/
permalink: /notes/cv/End-to-End-Object-Detection-with-Transformers/
redirect_from:
  - "/cv/End-to-End-Object-Detection-with-Transformers/"
  - "/CV/End-to-End-Object-Detection-with-Transformers/"
---

> Paper: [End-to-End Object Detection with Transformers](https://www.ecva.net/papers/eccv_2020/papers_ECCV/papers/123460205.pdf)
>
> Code: <https://github.com/facebookresearch/detr>

## DETR: Transformers for Object Detection

### Abstract

The authors cast object detection as a set prediction problem. Their main contributions are a new training objective that uses bipartite matching to enforce a one-to-one assignment between predictions and targets, and a transformer encoder–decoder architecture. They also introduce learned object queries that attend to global image context so the model can produce bounding boxes in parallel.

Notable properties include simplicity (no specialized detection libraries) and straightforward extension to other tasks such as panoptic segmentation.

### Introduction

The **end-to-end** design avoids many redundant pipeline stages. End-to-end methods were rare in object detection before this work; most pipelines rely on a post-processing step, **non-maximum suppression (NMS)**. Whether proposal-based, anchor-based, or anchor-free, detectors typically emit many overlapping boxes; NMS removes redundant predictions. NMS complicates hyperparameter tuning and deployment, so a simple end-to-end system has long been desirable.

The authors aim for strong results without hand-crafted priors—just a simple end-to-end detector.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/fig1.png" alt="avatar" style="zoom:60%;" /></div>

1. A CNN extracts features, which are flattened into a sequence.
2. The sequence is processed by a transformer encoder–decoder. Intuitively, every token interacts with all others in the image, so the encoder can localize objects; for each object, one box rather than many is desirable, and global reasoning helps suppress redundant boxes.
3. The decoder applies self-attention with learned queries; the number of queries fixes how many boxes are predicted (100 in the paper).
4. Bipartite matching pairs predictions with ground-truth boxes; only matched pairs contribute classification and bounding-box losses; unmatched predictions are supervised as “no object.”

At inference, step 4 is unnecessary; predictions above a confidence threshold (e.g., 0.7) are kept as foreground objects.

Results are strong on large objects, likely because the transformer models global context, but weaker on small objects. Training is also relatively slow.

### Related Work

#### Object detection

Most detectors refine initial guesses—two-stage methods use proposals, single-stage methods use anchors. Recent work shows performance depends heavily on those initial hypotheses, so post-processing matters a great deal.

**Set-based loss**: Prior work explored learnable NMS and relation networks, but such set losses still underperformed and often needed manual design, which conflicts with the authors’ goal of a minimal, end-to-end pipeline.

**Recurrent detectors**: Older encoder–decoder detectors used RNNs; autoregressive decoding is also slower at inference.

### The DETR Model

#### Object detection set prediction loss

DETR outputs a fixed number of predictions *N*, typically much larger than the number of objects in an image. Bipartite matching decides which predictions align with ground truth.

The matching problem is the classic assignment problem: workers and jobs with pairwise costs form a cost matrix; one seeks a minimum-cost one-to-one assignment. Exhaustive search is too expensive, so the **Hungarian algorithm** is used (e.g., `scipy.optimize.linear_sum_assignment`).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/frm1.png" alt="avatar" style="zoom:60%;" /></div>

In detection, predictions and ground-truth objects play the roles of workers and jobs; matrix entries combine classification and box regression costs.

The authors argue this optimal matching is analogous to encoding human priors about which prediction should supervise which target, but with a stricter one-to-one constraint so NMS is unnecessary.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/frm2.png" alt="avatar" style="zoom:60%;" /></div>

After matching, the final detection loss is computed on the assigned pairs.

#### DETR architecture

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/fig2.png" alt="avatar" style="zoom:60%;" /></div>

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/tab1.png" alt="avatar" style="zoom:60%;" /></div>

Training recipe changes improve AP by about two points without extra parameters, but DETR is slower—roughly half the FPS of strong baselines. The simple design also hurts small-object performance.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/fig3.png" alt="avatar" style="zoom:60%;" /></div>

Self-attention among a few reference points already yields clear spatial separation.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/tab2.png" alt="avatar" style="zoom:60%;" /></div>

Deeper transformer stacks improve accuracy.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/fig6.png" alt="avatar" style="zoom:60%;" /></div>

Both encoder and decoder are necessary: the encoder separates objects; the decoder handles boundaries and occlusion.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DETR/fig7.png" alt="avatar" style="zoom:60%;" /></div>

Visualization of what object queries attend to: green for small objects, red for large horizontal objects, blue for large vertical objects (20 queries shown). Queries also tend to ask whether a large object sits near the image center, possibly reflecting COCO statistics.

### Conclusion

DETR is a new framework built on transformers and bipartite matching. It is simple and effective, with promise for other tasks. Drawbacks include long training time and weaker small-object detection.

<HR align=left color=#987cb9 SIZE=1>
