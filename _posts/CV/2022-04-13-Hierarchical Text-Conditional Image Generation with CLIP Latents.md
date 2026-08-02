---
layout: post
title: OpenAI-2022 Hierarchical Text-Conditional Image Generation with CLIP Latents
categories: [CV]
tags: [vision-language, contrastive-learning]
proceedings: OpenAI
date: 2022-04-13
lang: en
alt_url: /zh/cv/Hierarchical-Text-Conditional-Image-Generation-with-CLIP-Latents/
permalink: /cv/Hierarchical-Text-Conditional-Image-Generation-with-CLIP-Latents/
---

> Paper: [Hierarchical Text-Conditional Image Generation with CLIP Latents](https://arxiv.org/pdf/2204.06125.pdf)
>
> Overview: [DALL·E 2](https://openai.com/dall-e-2/)
>
> OpenAI work that generates and edits images from text.

## DALL·E 2: text-to-image generation with CLIP and diffusion models

### Abstract

Contrastive models such as CLIP learn strong semantic and stylistic representations. To use these representations for image generation, the authors propose a two-stage model: a **prior** that produces CLIP image embeddings conditioned on text, and a **decoder** that maps those embeddings to images. Explicitly generating image latents improves diversity. The decoder is a diffusion model.

### Introduction

Much recent progress in computer vision comes from scaling datasets and models. CLIP learns useful features with simple contrastive training and is relatively robust to distribution shift. Diffusion models have recently pushed state of the art on image and video tasks, with greater diversity than GANs though historically lower fidelity and fine detail than GAN-based methods; recent techniques have continued to close that gap.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/fig1.png" alt="avatar" style="zoom:60%;" /></div>

### Method

Training uses the same image–text pairs as CLIP. The system has two components: a prior and a decoder.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/fig2.png" alt="avatar" style="zoom:60%;" /></div>

The top half of Figure 2 is CLIP: after pretraining it remains frozen and is not updated further.

The bottom half is DALL·E. The CLIP text encoder is fixed; each caption is paired with its text features, which are used to predict the ground-truth CLIP image features shown above.

#### Decoder

The decoder uses classifier-free guidance: during training, 10% of CLIP embeddings are randomly replaced with zero (or a learned null embedding), and the text conditioning is dropped 50% of the time.

The model uses only spatial convolutions and no attention, so at inference time it can run at arbitrary spatial sizes without fixing sequence length, which supports high-resolution generation.

#### Prior

The authors compare two priors: autoregressive and diffusion-based.

With the diffusion prior, only a Transformer decoder is trained. Inputs include the text, CLIP text embeddings, an embedding of the diffusion timestep, the noised CLIP image embedding, and the model’s own positional embeddings; the target is the clean CLIP image embedding.

The authors find that directly predicting the image embedding works better than predicting noise.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/frm2.png" alt="avatar" style="zoom:60%;" /></div>

### Experiment

Examples of image interpolation and image–text interpolation.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/fig4.png" alt="avatar" style="zoom:60%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/fig5.png" alt="avatar" style="zoom:60%;" /></div>

The diffusion prior performs slightly better than the autoregressive prior.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/tab2.png" alt="avatar" style="zoom:60%;" /></div>

Qualitative results.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/fig12.png" alt="avatar" style="zoom:60%;" /></div>

### Limitation

The model often fails to bind attributes to the correct objects, possibly because CLIP emphasizes object-level similarity.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/fig14.png" alt="avatar" style="zoom:60%;" /></div>

Generated compositions sometimes follow the wrong word order in the prompt, which may stem from the text encoder’s focus on stems and affixes or related factors.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/fig16.png" alt="avatar" style="zoom:60%;" /></div>

Complex scenes are hard to generate; many fine details are missing.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/DALL·E 2/fig17.png" alt="avatar" style="zoom:60%;" /></div>

<HR align=left color=#987cb9 SIZE=1>
