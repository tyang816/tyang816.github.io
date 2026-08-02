---
layout: post
title: NeurIPS-2020 Unsupervised Learning of Visual Features by Contrasting Cluster Assignments
categories: [CV]
tags: [unsupervised-learning, contrastive-learning]
proceedings: NeurIPS
date: 2020-12-01
lang: en
alt_url: /zh/notes/cv/Unsupervised-Learning-of-Visual-Features-by-Contrasting-Cluster-Assignments/
permalink: /notes/cv/Unsupervised-Learning-of-Visual-Features-by-Contrasting-Cluster-Assignments/
---

> Paper: [Unsupervised Learning of Visual Features by Contrasting Cluster Assignments](https://papers.neurips.cc/paper_files/paper/2020/file/70feb62b69f16e0238f741fab228fec2-Paper.pdf)

## SwAV: contrastive learning + clustering — use priors and compare to cluster prototypes instead of many negatives

1. Related clustering work includes DeepCluster and others; revisit later.
2. Compared with tens of thousands of negative samples, comparing against ~3000 cluster centers is more compact.

    2.1 Forward pass: from `$x_1$`, data augmentation yields `$x_1,x_2$`; an encoder produces `$z_1,z_2$`; `$z$` and cluster centers `$c$` are mapped via a clustering method to targets `$q_1,q_2$`; `$z_1,z_2$` are similar, so in principle they can predict each other—e.g. `$z_1 \cdot c$` can predict `$q_2$`, and vice versa.
3. Cluster centers have clearer semantic meaning; previously sampled negatives may actually be positives, and class imbalance can make negatives less effective.
4. A new positive-view strategy (Multi-crop): add views while limiting compute.

    4.1 Method: instead of cropping two 224×224 patches from a 256×256 image, crop 2×160 + 4×96 (six patches total). The original cropping focuses mainly on global structure; this scheme captures global and local features, improves results noticeably, and transfers well.

<hr align="left" color="#987cb9" size="1">

