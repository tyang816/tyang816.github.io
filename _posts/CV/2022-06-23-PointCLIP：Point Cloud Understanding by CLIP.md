---
layout: post
title: CVPR-2022 PointCLIP：Point Cloud Understanding by CLIP
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: CVPR
date: 2022-06-23
---

> 论文地址：[PointCLIP：Point Cloud Understanding by CLIP](https://openaccess.thecvf.com/content/CVPR2022/papers/Zhang_PointCLIP_Point_Cloud_Understanding_by_CLIP_CVPR_2022_paper.pdf)
>
> 论文实现：<https://github.com/ZrrSkywalker/PointCLIP>

## PointCLIP：3D用CLIP预训练编码

### Abstract

将CLIP学习到的2D表征迁移到3D领域来，在CLIP编码的点云和3D类别文本之间进行对齐

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/fig2.png" alt="avatar" style="zoom:60%;" /></div>

关键就是找一个桥梁把3D和2D连接起来就行，把3D点云做了投射到2D平面上变成深度图，这个图像丢给CLIP视觉编码器得到表征

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/fig3.png" alt="avatar" style="zoom:60%;" /></div>

迁移到3D领域时融合的领域知识的trick

### Experiments

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/tab1-tab2.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/tab3-tab4.png" alt="avatar" style="zoom:50%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/fig5.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/tab5.png" alt="avatar" style="zoom:50%;" /><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/PointCLIP/tab6-tab7.png" alt="avatar" style="zoom:50%;" /></div>


<HR align=left color=#987cb9 SIZE=1>