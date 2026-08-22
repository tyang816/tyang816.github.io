---
layout: post
title: arXiv-2024 Movie Gen：A Cast of Media Foundation Models
categories: [CV]
tags: [video-generation]
proceedings: arXiv
date: 2024-10-24
lang: en
alt_url: /zh/notes/cv/Movie-Gen：A-Cast-of-Media-Foundation-Models/
permalink: /notes/cv/Movie-Gen：A-Cast-of-Media-Foundation-Models/
redirect_from:
  - "/cv/Movie-Gen：A-Cast-of-Media-Foundation-Models/"
  - "/CV/Movie-Gen：A-Cast-of-Media-Foundation-Models/"
---

> Paper: [Movie Gen：A Cast of Media Foundation Models](https://arxiv.org/abs/2410.13720)
>
> Implementation: <https://go.fb.me/MovieGenResearchVideos>

## Movie Gen: Meta video generation

### Abstract

Movie Gen is a family of generative foundation models that can produce 1080p high-definition video, instruction-based video editing, or video generation conditioned on user images. The largest model has 30B parameters; the maximum context length is 73K tokens, corresponding to roughly 16 seconds at 16 frames per second.

### 3 Joint Image and Video Generation

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/fig3.png" alt="avatar" style="zoom:100%;" /></div>

#### 3.1 Image and Video Foundation Model

Because video resolution and frame rate are far larger than for images, RGB pixel-space video is compressed into a latent space for efficiency; stronger compression is preferred when possible.

##### 3.1.1 Temporal Autoencoder (TAE)

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/fig4.png" alt="avatar" style="zoom:100%;" /></div>

Compression is applied by a factor of 1/8 along time, length, and height.

**TAE architecture.** A 1D temporal convolution is added on top of each 2D block to handle video; strided convolutions with stride 2 downsample along time. The TAE starts from a pre-trained image autoencoder, then adds the temporal dimension to inflate the model.

##### 3.1.2 Training Objective for Video and Image Generation

Training uses flow matching. Given a video sample’s latent $X_1$, a time step $t \in [0,1]$, and noise $X_0 \sim \mathcal{N}(0,1)$, the model is trained on constructed samples $X_t$ to predict the velocity $V_t = \frac{dX_t}{dt}$—i.e., to learn a direct transport from $X_t$ to the data sample $X_1$ along an optimal transport (OT) path.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/frm1.1.png" alt="avatar" style="zoom:100%;" /></div>

where $\sigma_{min}=10^{-5}$

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/frm1.2.png" alt="avatar" style="zoom:100%;" /></div>

The final loss is

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/frm2.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/tab8.png" alt="avatar" style="zoom:100%;" /></div>

Table 8 compares whether flow matching or diffusion-style training works better.

##### 3.1.3 Joint Image and Video Generation Backbone Architecture

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/fig8.png" alt="avatar" style="zoom:100%;" /></div>

The pipeline still patchifies inputs: 3D convolutions turn latent embeddings into a sequence of tokens that are flattened into a 1D sequence.

Factorized learnable positional embeddings allow transformer inputs at arbitrary resolution and duration. Each spatial or temporal dimension (height $H$, width $W$, time $T$) is mapped into $[0, \mathrm{max\_len}]$; arbitrary values are interpolated within that range. These positional embeddings are added inside every transformer layer, which helps reduce video distortion.

The backbone follows LLaMa3 with three main changes:

- Text embeddings are injected via cross-attention at every layer; because different text encoders emphasize different signals, embeddings are concatenated rather than summed.
- Adaptive layer norm blocks incorporate time-step information more effectively.
- Bidirectional attention is used instead of causal attention.

The backbone is kept as close as possible to LLaMa3 so that language-model training experience transfers directly.

##### 3.1.4 Rich Text Embeddings and Visual-text Generation

Text encoders include UL2, ByT5, and Long-prompt MetaCLIP:

- MetaCLIP provides visual and text towers, which suits visual-prompt tasks with a more global view.
- Character-level ByT5 captures local text structure.
- UL2 supplies prompt-level embeddings.

#### 3.2 Pre-training

##### 3.2.1 Pre-training Data

Pre-training uses on the order of $10^8$ video–text pairs and $10^9$ image–text pairs, with diverse subjects such as people, nature, and animals.

After CLIP-style prompting, each video is roughly 4–16 seconds, with captions focused on a single object or concept when possible—favorable for training—with short videos averaging about 100 words of summary.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/fig9.png" alt="avatar" style="zoom:100%;" /></div>

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/tab39.png" alt="avatar" style="zoom:100%;" /></div>

Six filters are applied in total; many rely on model-based filtering rather than coarse heuristics alone.

- **Visual filtering.** Landscape videos are generally preferred; portrait short clips often have unstable motion, weaker aesthetics, and lower quality. Reading-style footage is removed, as are clips with frequent scene changes (scene boundary detection). Aesthetic filters also remove letterboxing and similar artifacts.
- **Motion filtering.** An in-house static detector drops videos with no motion; VMAF motion scores and motion vectors score motion to keep “reasonable” clips. Jittery camera motion is flagged via shot boundary detection—if a 1-second clip splits into many segments, camera shake is assumed. Special cases such as slide decks are excluded.
- **Content filtering.** Embeddings are extracted and clustered; samples are drawn from each cluster with probability proportional to the inverse square root of cluster size to limit bias.
- **Captioning.** Given video clips, LLaMa3-Video fine-tuned for captioning annotates the full corpus; 8B (70%) and 70B (30%) models are mixed at inference because of cost and diversity needs. Sixteen camera transforms (e.g., zoom-in, zoom-out) are also predicted to recognize common camera motion for better camera control.
- **Multi-stage data curation.** Filtering proceeds in three stages from easy to hard; training moves from low to high resolution, with 80% landscape and 20% portrait, 60% of clips containing people.

##### 3.2.2 Training

The 30B model is trained in multiple stages with three broad steps:

- Warm up with text-to-image (T2I), then text-to-video (T2V).
- Scale from 256p low resolution to 768p high resolution.
- Iterative dataset cleaning and hyperparameter tuning.

Training details are in Table 3. A strictly held-out validation set is maintained, and human evaluation is often the final judge.

#### 3.3 Finetuning

Fine-tuning further improves final quality; these datasets are built with substantial human involvement.

- **Finetuning Video Data.** High-quality data should have good motion, realism, aesthetics, and diversity. Curation runs in four sequential steps:
  - Stricter thresholds on aesthetics and motion; object-detection models remove clips with very small subjects. This retains on the order of a few million videos but with an uneven concept distribution.
  - Human curation yields seed videos; text and video k-NN retrieve conceptually similar clips.
  - Humans select visually strong, trainable clips—high-quality fine-tuning data is hard to capture automatically because criteria such as angle, saturation, color, and lighting are subjective. The best segment within each video is chosen manually.
  - Models draft video captions that humans revise, covering camera control, objects, background, action, and lighting.
  - The final set is 50% at 16 s; the remainder spans 10.6–16 s.
- **Model Averaging.** Data mixing ratios are sensitive, so one hyperparameter set rarely excels everywhere; multiple checkpoints are averaged into the final model.

#### 3.6 Results

##### 3.6.1 Comparisons to Prior Work

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/tab6.png" alt="avatar" style="zoom:100%;" /></div>

Comparison against proprietary and open models uses net win rate—the fraction of pairwise comparisons won.

##### 3.6.4 TAE Ablations

Metrics include reconstructed peak signal-to-noise ratio (PSNR), structural similarity (SSIM), and Fréchet Inception distance (FID).

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/tab11.png" alt="avatar" style="zoom:100%;" /></div>

Table 11 shows that compressing along the frame axis hurts reconstruction quality.

<div align="center" style="float:center"><img src="https://blog-img-1259433191.cos.ap-shanghai.myqcloud.com/MovieGen/tab12.png" alt="avatar" style="zoom:100%;" /></div>

Table 12 indicates TAE 3D still outperforms TAE 2.5D, but the gain is modest whereas 2.5D is much more efficient.

<hr align="left" color="#987cb9" size="1">
