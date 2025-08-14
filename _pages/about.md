---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

My name is **Yang Tan (谭扬)**. I am now a PhD student in [Shanghai Jiao Tong University](https://en.sjtu.edu.cn/) & [Shanghai Innovation Institute](https://www.sii.edu.cn/) & [Shanghai Artificial Intelligence Laboratory](https://www.shlab.org.cn/), supervised by Prof. [Liang Hong](https://ins.sjtu.edu.cn/people/lhong/index.html). I receive my B.S. degree of Software Engineering (GPA 3.8/4.0) from East China University of Science and Technology in 2022, and M.S. degree of Computer Science (GPA 3.8/4.0) from East China University of Science and Technology in 2025, supervised by Prof. [Guisheng Fan](https://cise.ecust.edu.cn/2011/0615/c7766a55144/page.htm).

My research interests lie at the intersection of Artificial Intelligence and Biology. 
- *AI research*: Large Language Models, Graph Neural Networks, and Agent Workflow.
- *Biology research*: Directed Evolution, Function Prediction, and Binder Design.

I have published over 20 papers in the field of AI4Bio in prestigious venues such as ***NeurIPS***, ***ICLR***, and ***eLife***. I also serve as a reviewer for leading journals including ***Nature Machine Intelligence*** and ***Journal of Chemical Information and Modeling***.

# 🔥 News
- *2025.08*: &nbsp;🎉 [VenusFactory](https://github.com/ai4protein/VenusREM) releases a **free** website at [venusfactory.cn](http://www.venusfactory.cn/).
- *2025.04*: &nbsp;🏆 [VenusREM](https://github.com/ai4protein/VenusREM) achieves **1st place** in [ProteinGym Substitution](https://proteingym.org/benchmarks) and [VenusMutHub](https://lianglab.sjtu.edu.cn/muthub/) mutation prediction Leaderboard.

# 📝 Selected Publications 

\* denotes equal contribution.

## ✈️ Conference
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL Demo 2025</div><img src='images/papers/venusfactory.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[VenusFactory: An Integrated System for Protein Engineering with Data Retrieval and Language Model Fine-Tuning](https://aclanthology.org/2025.acl-demo.23/)

**Yang Tan**, Chen Liu, Jingyuan Gao, Banghao Wu, Mingchen Li, Ruilin Wang, Lingrong Zhang, Huiqun Yu, Guisheng Fan, Liang Hong, Bingxin Zhou

<a href="http://venusfactory.cn"><img src="https://img.shields.io/badge/Demo-🌐_Website-blue" style="max-width: 100%;"></a>
<a href="https://huggingface.co/AI4Protein/datasets"><img src="https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-red?label=Dataset" style="max-width: 100%;"></a>
<a href="https://github.com/ai4protein/VenusFactory"><img src="https://img.shields.io/github/stars/ai4protein/VenusFactory?style=social&label=Code+Stars" style="max-width: 100%;"></a>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ISMB/ECCB 2025</div><img src='images/papers/venusrem.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[From high-throughput evaluation to wet-lab studies: advancing mutation effect prediction with a retrieval-enhanced model](https://academic.oup.com/bioinformatics/article/41/Supplement_1/i401/8199374)

**Yang Tan**, Ruilin Wang, Banghao Wu, Liang Hong, Bingxin Zhou

<a href="https://huggingface.co/datasets/AI4Protein/VenusREM"><img src="https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-red?label=Dataset" style="max-width: 100%;"></a>
<a href="https://github.com/ai4protein/VenusREM"><img src="https://img.shields.io/github/stars/ai4protein/VenusREM?style=social&label=Code+Stars" style="max-width: 100%;"></a>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ICLR 2025</div><img src='images/papers/venusvaccine.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Immunogenicity Prediction with Dual Attention Enables Vaccine Target Selection](https://openreview.net/forum?id=hWmwL9gizZ)

Song Li*, **Yang Tan\***, Song Ke, Liang Hong, Bingxin Zhou

<a href="https://github.com/ai4protein/VenusVaccine"><img src="https://img.shields.io/github/stars/ai4protein/VenusVaccine?style=social&label=Code+Stars" style="max-width: 100%;"></a>
</div>
</div>


<div class='paper-box'><div class='paper-box-image'><div><div class="badge">NeurIPS 2024</div><img src='images/papers/prosst.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[ProSST: Protein Language Modeling with Quantized Structure and Disentangled Attention](https://proceedings.neurips.cc/paper_files/paper/2024/file/3ed57b293db0aab7cc30c44f45262348-Paper-Conference.pdf)

Mingchen Li*, **Yang Tan\***, Xinzhu Ma, Bozitao Zhong, Huiqun Yu, Ziyi Zhou, Wanli Ouyang, Bingxin Zhou, Pan Tan, Liang Hong

<a href="https://huggingface.co/AI4Protein/ProSST-2048"><img src="https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-red?label=Model" style="max-width: 100%;"></a>
<a href="https://github.com/ai4protein/ProSST"><img src="https://img.shields.io/github/stars/ai4protein/ProSST?style=social&label=Code+Stars" style="max-width: 100%;"></a>
</div>
</div>

## 📚 Journal
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">eLife 2025</div><img src='images/papers/protssn.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Semantical and geometrical protein encoding toward enhanced bioactivity and thermostability](https://elifesciences.org/articles/98033)

**Yang Tan**, Bingxin Zhou, Lirong Zheng, Guisheng Fan, Liang Hong

<a href="https://huggingface.co/tyang816/ProtSSN"><img src="https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-red?label=Model" style="max-width: 100%;"></a>
<a href="https://github.com/ai4protein/ProtSSN"><img src="https://img.shields.io/github/stars/ai4protein/ProtSSN?style=social&label=Code+Stars" style="max-width: 100%;"></a>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Comput. Biol. Med. 2024</div><img src='images/papers/medchatzh.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[MedChatZH: A tuning LLM for traditional Chinese medicine consultations](https://www.researchgate.net/profile/Yang-Tan-33/publication/378954165_MedChatZH_A_tuning_LLM_for_traditional_Chinese_medicine_consultations/links/665fddc716dcf74fcec20c20/MedChatZH-A-tuning-LLM-for-traditional-Chinese-medicine-consultations.pdf)

**Yang Tan**, Zhixing Zhang, Mingchen Li, Fei Pan, Hao Duan, Zijie Huang, Hua Deng, Zhuohang Yu, Chen Yang, Guoyang Shen, Peng Qi, Chengyuan Yue, Yuxian Liu, Liang Hong, Huiqun Yu, Guisheng Fan, Yun Tang

<a href="https://huggingface.co/tyang816/medchatzh"><img src="https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-red?label=Model" style="max-width: 100%;"></a>
<a href="https://github.com/tyang816/medchatzh"><img src="https://img.shields.io/github/stars/tyang816/medchatzh?style=social&label=Code+Stars" style="max-width: 100%;"></a>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">J. Chem. Inf. Model. 2024</div><img src='images/papers/ses-adapter.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Simple, efficient, and scalable structure-aware adapter boosts protein language models](https://pubs.acs.org/doi/10.1021/acs.jcim.4c00689)

**Yang Tan**, Mingchen Li, Bingxin Zhou, Bozitao Zhong, Lirong Zheng, Pan Tan, Ziyi Zhou, Huiqun Yu, Guisheng Fan, Liang Hong

<a href="https://github.com/tyang816/ses-adapter"><img src="https://img.shields.io/github/stars/tyang816/ses-adapter?style=social&label=Code+Stars" style="max-width: 100%;"></a>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">J. Cheminformatics 2024</div><img src='images/papers/peta.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[PETA: evaluating the impact of protein transfer learning with sub-word tokenization on downstream applications](https://link.springer.com/article/10.1186/s13321-024-00884-3)

**Yang Tan**, Mingchen Li, Ziyi Zhou, Pan Tan, Huiqun Yu, Guisheng Fan, Liang Hong

<a href="https://github.com/mingchen-li/ProteinPretraining"><img src="https://img.shields.io/github/stars/mingchen-li/ProteinPretraining?style=social&label=Code+Stars" style="max-width: 100%;"></a>
</div>
</div>


# 🏆 Honors and Awards
- *2025/2022*, College Graduate Excellence Award of Shanghai.
- *2024*, ***National Scholarship***, M.S.
- *2023*, *Bronze Award*, National "Challenge Cup" Competition.
- *2022*, *Silver Award*, Shanghai "Internet+" Competition.
- *2022*, Arkema Bachelor's Scholarship (3 in university).
- *2021/2020*, *Second/Third Prize*, National College Students Computer Design Competition.
- *2021/2020*, *Special Scholarship*, East China University of Technology.
- *2021*, National Undergraduate Innovation Training Program, *Project Leader*.
- *2020*, ***National Scholarship***, B.S.
- *2019*, Lingma Bachelor’s Scholarship (4 in major).
- *2018*, "District Mayor Award for Science and Technology Innovation" in Shapingba, Chongqing.
- *2017*, *Third Prize*, FIRST Tech Challenge Houston World Championship, *Team Leader*.
- *2017*，*Outstanding Project*, Chongqing Youth Innovation Talent Training Eaglet Program, *Project Leader*.
- *2017/2016*, *First/Second Prize*, FIRST Tech Challenge of China, *Team Leader*.

# 📖 Educations
- *2025.09 - Now*, Shanghai Jiao Tong University. Ph.D. in Computer Science. 
- *2022.06 - 2025.06*, East China University of Science and Technology. M.S. in Computer Science & GPA: 3.8 / 4 & #1 in major ranking. 
- *2018.09 - 2022.06*, East China University of Science and Technology. B.S. in Software Engineering & GPA 3.8/4.0 & #1 in major ranking / #1 in overall ranking.

# 💬 Invited Talks
- *2025.08*, Shanghai Jiao Tong University 3th AI4BioE Summer School. Oral report/poster was rated as excellent (1/20).
- *2024.08*, Shanghai Jiao Tong University 2th AI4BioE Summer School. Oral report/poster was rated as excellent (1/200).
- *2023.08*, Shanghai "Green Biomanufacturing" Summer School. Oral report at the Youth Academic Forum and was rated as excellent (6/100).
- *2023.07*, Shanghai Jiao Tong University 1th AI4SCIENCE Summer School. Oral report/group report was rated as excellent (3/100).

# 💻 Internships
- *2023.08 - Now*, [Shanghai Artificial Intelligence Laboratory](https://www.shlab.org.cn/), China.
  - Algorithm Intern, AI4Science.
  - Protein language model and graph network model for protein engineering.
- *2023.06 - 2023.08*, [Shanghai-Chongqing Artificial Intelligence Research Institute](https://www.sjtu.cq.cn/platform), China.
  - Algorithm Intern, Large Languge Model.
  - Participated in the research and development of the "Zhaoyan" large language model.
- *2022.10 - 2023.05*, [Shanghai Tianwu Technology Co., Ltd](https://www.matwings.com/), China.
  - Algorithm Intern, AI4Bio.
  - Protein language model pre-training and zero-shot mutantion prediction.