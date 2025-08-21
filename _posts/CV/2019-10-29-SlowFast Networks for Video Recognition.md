---
layout: post
title: ICCV-2019 SlowFast Networks for Video Recognition
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: ICCV
date: 2019-10-29
---

> 论文地址：[SlowFast Networks for Video Recognition](https://ieeexplore.ieee.org/document/9008780/)

## SlowFast：快慢分支视频理解

### Abstract

研究动机来源于人的视觉系统有两种细胞，一个叫p细胞占了80%处理静态图像，一个叫m细胞处理运动信息，发现跟双流有点像，于是也提出了这种一支slow，一支fast这样的网络

### Method

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SlowFast/img1.png" alt="avatar" style="zoom:60%;" /></div>

慢分支：先用很低的帧率，比如每隔16帧取一帧，这种叫慢分支，学习静态图像，场景信息。因为p细胞占了大部分的数量，而且建模场景信息比较难，所以作者也把大部分参数给了慢分支。简单来说慢分支就是一个大的I3D网络，但是因为帧数不多，所以复杂度也不是很高

快分支：比如4帧取一帧，输入快分支。让这个网络尽可能小，去描述运动信息

later connection：网络间结合起来，互相交互学习时空特征

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SlowFast/table1.png" alt="avatar" style="zoom:60%;" /></div>

整个前向过程和网络结构如上

### Experiment

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/SlowFast/table2.png" alt="avatar" style="zoom:60%;" /></div>

slowfast使用帧数增多，加上non local block后性能也一直在增长

<HR align=left color=#987cb9 SIZE=1>

