---
layout: post
title: IJCAI-2021 Graph-Augmented Code Summarization in Computational Notebooks
categories: [SE]
tags: [code-summarization, GNN]
proceedings: IJCAI
date: 2021-07-23
---

> 论文地址：[Graph-Augmented Code Summarization in Computational Notebooks](https://www.ijcai.org/proceedings/2021/717)

## Themisto：通过计算本生成文档的端到端系统

1. 针对 jupyter notebook 的代码块生成注释，有三种方法：①基于HAConvGNN；②基于查询在线api文档；③基于代码结果推动用户自己编写注释。上述方法可以分为“描述为什么写这块代码”和“这块代码的结果是什么”
2. HAConvGNN 是在 [[LeClair et al, 2020]](http://arxiv.org/abs/2004.02843) 的补充，多编码了相邻的四个代码块获取更高层次的注意力权重
3. 这是篇系统实现文章，要看 HAConvGNN 的文章

<HR align=left color=#987cb9 SIZE=1>

