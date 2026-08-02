---
layout: post
title: Stanford-2022 AI Index Report
categories: [ML]
tags: [other]
proceedings: Stanford
date: 2022-03-02
lang: en
alt_url: /zh/notes/ml/AI-Index-Report/
permalink: /notes/ml/AI-Index-Report/
---

> Report: [AI Index Report](https://aiindex.stanford.edu/wp-content/uploads/2022/03/2022-AI-Index-Report_Master.pdf). Most statistics are drawn from Papers with Code.
>
> Because the report contains a large number of figures, individual screenshots are not included here.

### Top Takeaways

*   In 2021, private-sector investment roughly doubled relative to 2020, reaching $9.35 billion. There were four funding rounds above $500 million in 2020 versus fifteen in 2021.
*   U.S.–China collaborations produced the largest volume of co-authored papers—about 2.7× that of the second-ranked pairing (China–U.K.).
*   Models are becoming more capable but also more biased; for example, bias increased by 29% when GPT’s parameter count rose from 117M to 280M.
*   Ethics and fairness issues around models are increasingly salient.
*   AI is becoming cheaper while performance continues to improve.
*   On ten benchmark datasets highlighted in the report, nine state-of-the-art methods used additional training data.
*   AI-related legislation is expanding worldwide.
*   Robotic-arm costs fell from $42,000 in 2020 to $22,600 in 2021.

### CHAPTER 1: Research and Development

#### 1.1 PUBLICATIONS

As in Figure 1.1.1, roughly 334,000 AI papers were published in 2021, suggesting substantial volume—including many low-impact or practice-oriented works; only on the order of ~50 papers are typically regarded as highly influential.

As in Figure 1.1.2, journal articles grew rapidly in number. Conferences rank second, then arXiv. arXiv preprints carry lower peer recognition because they bypass formal peer review and are not always counted as formal research outputs; publication pressure has also fueled proliferation of journals.

As in Figure 1.1.3, pattern recognition accounts for a large share of publications, while machine learning is growing quickly. Pattern recognition is often organized around tasks; machine learning is better viewed as a methodological toolkit.

As in Figure 1.1.4, about 60% of papers come from academia, 5% from industry, 3% from government, and 11% from nonprofits. Industry’s share of output is rising.

As in Figure 1.1.5, China publishes about 1.5× as many papers as the second-ranked country, but citations exceed the runner-up by only six percentage points; both journal and conference output are high.

As in Figure 1.1.10, the average Chinese paper receives roughly four times fewer citations than the average U.S. paper; lower citation counts do not necessarily imply lower quality—citations also reflect institutional visibility, English writing, and other factors.

As in Figure 1.1.24, China submits many patents but has a lower acceptance rate.

#### 1.2 CONFERENCES

As in Figures 1.2.2 and 1.2.3, ICML attendance has grown steadily.

### CHAPTER 2: Technical Performance

#### 2.1 COMPUTER VISION—IMAGES

##### IMAGE CLASSIFICATION

*   ImageNet: As in Figures 2.1.2 and 2.1.3, top-1 accuracy with extra training data reaches about 90% and is still improving; top-5 reaches about 99%, whereas human performance is around 95%.

##### IMAGE GENERATION

Image synthesis benchmarks.

Methods build on GANs; FID scores assess generated image quality by passing real and generated images through Inception v3, treating intermediate activations as Gaussian random variables, and comparing their distributions. As in Figure 2.1.5, the gap between distributions is shrinking over time.

##### DEEPFAKE DETECTION

Face-swapping and related manipulations are widely used in advertising and adult content.

*   FaceForensics++: ~1,000 original videos for real-vs-fake classification. As in Figure 2.1.7, performance is strong—near 99%.
*   Celeb-DF: Celebrity-focused deepfakes. As in Figure 2.1.8, results are more modest.

##### HUMAN POSE ESTIMATION

Keypoint detection supports sports analytics, surveillance, virtual avatars, sign-language recognition, and related applications.

*   PCK: ~2,000 athlete poses from Flickr; 14 joint locations. As in Figure 2.1.10, performance is strong.
*   Human3.6M: 3D pose with 17 action categories; joint error vs. ground truth. As in Figure 2.1.11, error is on the order of ~2 cm—already relatively low.

##### SEMANTIC SEGMENTATION

Pixel-level labeling for autonomous driving, scene analysis (foreground/background, background blur), and medical diagnosis.

*   Cityscapes: Driving videos from 50 cities; IoU metric. As in Figure 2.1.13, performance is solid.

##### MEDICAL IMAGE SEGMENTATION

Semantic segmentation in medicine assigns each pixel to an organ or tissue class.

As in Figure 2.1.15, accuracy is improving quickly but may still fall short of clinical deployment. False positives on healthy patients may be tolerable in some settings; missed diagnoses can delay optimal treatment.

##### FACE DETECTION AND RECOGNITION

As in Figure 2.1.16, face recognition is already highly accurate.

##### FACE DETECTION: EFFECTS OF MASK-WEARING

Masked face recognition: As in Figure 2.1.17, error rates remain roughly seven times higher with masks.

##### VISUAL REASONING

*   VQA Challenge: Visual question answering (e.g., which person wears a mask). As in Figure 2.1.22, 2021 benchmark scores approach human-level accuracy, though real-world robustness still lags.

#### 2.2 COMPUTER VISION—VIDEO

##### ACTIVITY RECOGNITION

Given a clip, classify what entities are doing (e.g., walking).

*   Kinetics: Video classification across activity categories. As in Figure 2.2.2, accuracy is strong.
*   ActivityNet: ~700 hours, 200 activity classes; temporal localization of actions. As in Figure 2.2.3, substantial headroom remains.

##### OBJECT DETECTION

*   COCO: Early, large-scale benchmark. As in Figure 2.2.5, progress has been rapid.

##### VISUAL COMMONSENSE REASONING (VCR)

Multiple-choice reasoning over images and text. As in Figure 2.2.8, the area is relatively niche and progress has been slower.

#### 2.3 LANGUAGE

##### ENGLISH LANGUAGE UNDERSTANDING

*   SuperGLUE: Multiple subtasks—e.g., BoolQ (yes/no reading comprehension), CB (whether text supports a hypothesis), COPA (causal choice). As in Figures 2.3.2 and 2.3.4, very large models exceed human baselines on several tasks.

##### TEXT SUMMARIZATION

*   arXiv: Predict abstracts from paper bodies; ROUGE measures overlap with reference summaries. As in Figure 2.3.7, performance is still moderate with room to improve.

##### NATURAL LANGUAGE INFERENCE

Three-way classification: contradiction, entailment, or neutral. As in Figure 2.3.10, ~93% accuracy reflects solid progress on this benchmark.

*   ANLI: Harder adversarial NLI requiring extended reasoning. As in Figure 2.3.12, models approach human performance.

##### SENTIMENT ANALYSIS

Sentiment toward products, forecasts, etc. As in Figure 2.3.14, accuracy is in an acceptable range.

##### MACHINE TRANSLATION (MT)

Strong commercial incentives; as in Figure 2.3.16, open systems are scarce relative to proprietary products.

*   WMT 2014: Standard ACL-era sets (e.g., En–De, En–Fr); BLEU evaluation. As in Figure 2.3.15, scores have improved gradually in recent years.

#### 2.4 SPEECH

##### SPEECH RECOGNITION

*   LibriSpeech: ~1,000 hours of audiobooks in clean and noisy splits. As in Figure 2.4.1, clean-set performance is near human-like; noisy conditions are usable but harder.

#### 2.5 RECOMMENDATION

##### COMMERCIAL RECOMMENDATION

*   MovieLens: As in Figure 2.5.1, gains were sharp in 2018–2019 but flatter afterward; the benchmark is not fully representative—recommendation is business-specific and data-hungry, dominated by large platforms.

##### CLICK-THROUGH RATE PREDICTION

*   Criteo: As in Figure 2.5.2, AUC gains are modest—again, this is largely a big-tech domain.

#### 2.6 REINFORCEMENT LEARNING

##### REINFORCEMENT LEARNING ENVIRONMENTS

Environments function as benchmarks: agents receive rewards or penalties based on actions.

*   Atari: 57 games (including Pac-Man); agents learn control policies from environment feedback. As in Figure 2.6.1, rapid progress appeared around 2017.

##### HUMAN GAMES

Chess and similar domains: As in Figure 2.6.4, interest dates to the 1980s; superhuman play was achieved by 2016.

#### 2.7 HARDWARE

##### MLPerf: Training Time

Industry benchmark measuring time for diverse hardware/software stacks to reach target accuracy on standard models.

As in Figure 2.7.1, the y-axis is logarithmic—training time drops exponentially in practice.

As in Figure 2.7.3, some 2020 runs used more than 4,000 accelerators.

##### IMAGENET: Training Cost

As in Figure 2.7.4, the cost to train ImageNet models to ~93% accuracy continues to fall.

#### 2.8 ROBOTICS

##### Price Trends in Robotic Arms

As in Figure 2.8.1, prices roughly halved over the prior five years.

##### AI Skills Employed by Robotics Professors

As in Figure 2.8.3, robotics faculty most often use deep learning, followed by reinforcement learning.

### CHAPTER 3: Technical AI Ethics

The focus is harm models may cause—e.g., bias by race, age, or socioeconomic status—that can exacerbate social division; improving fairness and reducing bias is central.

#### 3.1 META-ANALYSIS OF FAIRNESS AND BIAS METRICS

Fairness might require that swapping protected attributes (gender, age, race) on an otherwise qualified résumé not change a hiring decision. The field is young and metrics remain contested, so conclusions are provisional.

As in Figure 3.1.1, the report tallies various fairness metrics.

As in Figure 3.1.2, it lists datasets and diagnostic measures for fairness and bias.

#### 3.2 NATURAL LANGUAGE PROCESSING BIAS METRICS

Concrete bias measures in NLP.

##### TOXICITY: REALTOXICITYPROMPTS AND THE PERSPECTIVE API

Toxicity captures rude or harmful text.

As in Figure 3.2.2, toxic-generation rates differ sharply across training corpora.

As in Figure 3.2.3, larger models can be more sensitive to prompts that elicit toxic continuations.

As in Figure 3.2.4, three mitigation (“detoxification”) methods all reduce task performance to some degree.

##### STEREOSET

Stereotypes along gender, race, and religion.

As in Figure 3.2.5, stereotypical associations tend to increase with model scale.

##### WINOGENDER AND WINOBIAS

Gender pronouns are masked for infilling. As in Figure 3.2.8, larger LMs achieve higher fill accuracy.

#### 3.4 FACTUALITY AND TRUTHFULNESS

##### FACT-CHECKING WITH AI

Automated misinformation detection.

As in Figure 3.3.2, activity in this area has grown markedly in recent years.

### CHAPTER 4: The Economy and Education

#### 4.1 JOBS

As in Figure 4.1.1, LinkedIn shows regional demand for AI skills as a share of postings; large firms’ private job boards limit completeness.

As in Figure 4.1.3, geographic distribution of AI-related employment—Singapore’s share is notable.

As in Figure 4.1.4, breakdown of in-demand AI skills.

As in Figure 4.1.5, industries hiring AI talent.

As in Figure 4.1.6, AI hiring demand over time.

As in Figure 4.1.8, who lists AI skills on profiles.

#### 4.2 INVESTMENT

As in Figures 4.2.1 and 4.2.2, investment trends.

As in Figure 4.2.3, newly founded AI companies.

As in Figures 4.2.10 and 4.2.11, AI company sectors—cloud, health, finance, autonomous driving; historically strong returns in health and cloud.

#### 4.3 CORPORATE ACTIVITY

As in Figure 4.3.4, industry concerns about AI risk emphasize safety, regulation, interpretability, and privacy; labor-displacement worries have declined relatively.

#### 4.4 AI EDUCATION

As in Figure 4.4.1, graduates in AI-related fields are increasing rapidly.

As in Figure 4.4.3, about 21% of new PhDs specialize in AI or machine learning.

### CHAPTER 5: AI Policy and Governance

#### 5.1 AI AND POLICYMAKING

As in Figure 5.1.1, passed AI-related laws grow roughly linearly over time.

Many enacted bills are pro-innovation or enabling in nature.

<hr align="left" color="#987cb9" size="1">
