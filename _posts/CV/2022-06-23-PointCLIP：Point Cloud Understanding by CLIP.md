---
layout: post
title: CVPR-2022 PointCLIP：Point Cloud Understanding by CLIP
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: CVPR
date: 2022-06-23
lang: en
alt_url: /zh/cv/PointCLIP：Point-Cloud-Understanding-by-CLIP/
permalink: /cv/PointCLIP：Point-Cloud-Understanding-by-CLIP/
---

> Paper: [PointCLIP：Point Cloud Understanding by CLIP](https://openaccess.thecvf.com/content/CVPR2022/papers/Zhang_PointCLIP_Point_Cloud_Understanding_by_CLIP_CVPR_2022_paper.pdf)
>
> Code: <https://github.com/ZrrSkywalker/PointCLIP>

## PointCLIP: CLIP pre-trained encoding for 3D

### Abstract

Transfer representations learned by CLIP in 2D to the 3D domain by aligning CLIP-encoded point clouds with text descriptions of 3D object categories.

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/fig2.png" alt="avatar" style="zoom:60%;" /></div>

The core idea is to bridge 3D and 2D: project a 3D point cloud onto a 2D plane to form a depth map, then pass the resulting image through CLIP’s visual encoder to obtain representations.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/fig3.png" alt="avatar" style="zoom:60%;" /></div>

Tricks for injecting domain knowledge when adapting to 3D.

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/tab1-tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/tab3-tab4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/fig5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/tab5.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/tab6-tab7.png" alt="avatar" style="zoom:50%;" /></div>


<HR align=left color=#987cb9 SIZE=1>
