---
layout: post
title: "ECCV-2020 CMC: Contrastive Multiview Coding"
categories: [CV]
tags: [contrastive-learning]
proceedings: ECCV
date: 2020-12-18
lang: en
alt_url: /zh/notes/cv/Contrastive-Multiview-Coding/
permalink: /notes/cv/Contrastive-Multiview-Coding/
---

> Paper: [Contrastive Multiview Coding](https://www.ecva.net/papers/eccv_2020/papers_ECCV/papers/123560749.pdf)

## CMC: Maximize mutual information across views; the pretext task is multiview (multimodal)

1. The abstract is compelling: whether you see a dog or hear it bark, you can recognize it as a dog—motivating learning invariance across views.
2. Positive pairs: although inputs come from different sensors (modalities), they still correspond to the same underlying image; their representations should be close in feature space.

   Negative pairs: views drawn from other images.
3. Different inputs across views may require multiple encoders—potentially one encoder per view—which increases computational cost; transformers may process multiple modalities jointly without modality-specific architectural changes.

Comment: Code: http://github.com/HobbitLong/CMC/

<HR align=left color=#987cb9 SIZE=1>

