# SEO 与收录操作指南

站点已支持全站双语（`/` ↔ `/zh/`）、`hreflang`、项目页 OG/JSON-LD，以及优先 sitemap。  
**Google Search Console 验证已完成。** 当前瓶颈通常不是再抠 meta，而是 **部署上线 + 站外回链 + GSC 提交**。

## 规范 URL

| 用途 | URL |
|------|-----|
| 英文首页 | `https://tyang816.github.io/` |
| 中文首页 | `https://tyang816.github.io/zh/` |
| Open Projects（英） | `https://tyang816.github.io/projects/` |
| 开源项目（中） | `https://tyang816.github.io/zh/projects/` |
| 中医门户（中文） | `https://tyang816.github.io/zh/projects/tcm/` |
| TCM 英文目录 | `https://tyang816.github.io/projects/tcm/` |
| 开源中医大模型 | `https://tyang816.github.io/zh/projects/tcm/models/` |
| 中医大模型数据集 | `https://tyang816.github.io/zh/projects/tcm/datasets/` |
| 中医大模型综述 | `https://tyang816.github.io/zh/projects/tcm/surveys/` |
| 中医大模型专利 | `https://tyang816.github.io/zh/projects/tcm/patents/` |
| 全站 sitemap | `https://tyang816.github.io/sitemap.xml` |
| 双语优先 sitemap | `https://tyang816.github.io/sitemap_i18n.xml` |
| TCM 专用 sitemap | `https://tyang816.github.io/sitemap_tcm.xml` |
| robots | `https://tyang816.github.io/robots.txt` |
| llms.txt（给 Gemini / ChatGPT / Perplexity） | `https://tyang816.github.io/llms.txt` |

旧路径已用 `redirect_from` 承接：`/pub/`、`/project/`、`/tcm/`、`/tcm-en/` → 对应 `/projects/...`。

重点申请索引：`/`、`/zh/`、`/projects/`、`/zh/projects/`、`/projects/venusx/`、`/projects/venusrem/`、`/projects/prosst/`、`/projects/protssn/`、`/projects/venusfactory2/`、`/projects/tcm/`、`/zh/projects/tcm/`、`/notes/`、`/zh/notes/`、`/timeline/`、`/zh/timeline/`。

---

## 0. 上线前（仓库侧，优先）

本地已做的站内优化：

- Hub / 首页补齐 `seo_title`、`seo_description`、`keywords`
- `sitemap_i18n.xml`：首页 + notes/timeline/projects hub + 全部项目双语对 + 英文 leaderboard；含 `lastmod` / `priority`
- 笔记 posts 默认 `sitemap: false`（仍可从 `/notes/` 发现，避免 200+ 笔记稀释主 sitemap）
- `jekyll-redirect-from` 加入 `whitelist`，保证旧 URL 跳转在 `--safe` / Pages 场景生效
- `robots.txt` 声明双 sitemap

**你必须完成：** 将含 `/projects/` 的改动 **commit + push 到 `main`**。上线前线上 `/projects/` 为 404，搜索引擎无法收录项目页。

部署后自检：

```bash
for u in / /zh/ /projects/ /zh/projects/ /projects/venusx/ /projects/tcm/ /zh/projects/tcm/ /notes/ /zh/notes/; do
  code=$(curl -sL -o /dev/null -w '%{http_code}' "https://tyang816.github.io${u}")
  echo "$code $u"
done
curl -sL https://tyang816.github.io/sitemap_i18n.xml | rg 'projects/venusx|zh/projects' | head
curl -sL https://tyang816.github.io/projects/venusx/ | rg 'og:image|SoftwareSourceCode|canonical|hreflang' | head
```

期望：关键 URL 均为 `200`；`sitemap_i18n` 含 projects；项目页有 OG 图与 JSON-LD。

---

## 1. Google Search Console（验证已完成 → 收尾）

1. 打开 [Google Search Console](https://search.google.com/search-console)，确认属性 `https://tyang816.github.io`
2. **站点地图**：提交 / 重新提交：
   - `sitemap.xml`
   - `sitemap_i18n.xml`（优先看这个）
   - `sitemap_tcm.xml`（中医大模型目录 + 全部条目）
3. **请求编入索引**：对「重点申请索引」中的 URL 逐条「网址检查 → 请求编入索引」，并加上 `/zh/projects/tcm/models/`、`/datasets/`、`/surveys/`、`/patents/`
4. 数日后在「页面」查看是否已收录；关注是否仍抓到旧 `/tcm/`、`/tcm-en/`（应 301/redirect 到新地址）

---

## 2. Bing Webmaster Tools

1. 打开 [Bing Webmaster](https://www.bing.com/webmasters)
2. 可从 Google 导入，或独立验证（`msvalidate.01`）
3. 若尚未验证，填入 `_config.yml`：

```yaml
bing_site_verification: "粘贴这里"
```

4. 提交上述两个 sitemap，并对重点 URL 提交收录

---

## 3. 百度搜索资源平台（可选，可跳过）

GitHub Pages 在国内访问与百度抓取均不稳定，**可跳过**。若仍要尝试，见历史步骤：添加站点 → HTML 验证 → 提交 sitemap，并以外链指向 `/zh/` 与 `/zh/projects/tcm/`。

---

## 4. 站外曝光清单（比再改 meta 更重要）

站内技术 SEO 解决「可被收录」；站外链接解决「搜得到 / 点得进来」。

### 4.1 GitHub README 回链（最高优先）

在每个一作仓库 README 顶部徽章区增加 Project page：

```markdown
[![Project](https://img.shields.io/badge/Project-tyang816.github.io-blue)](https://tyang816.github.io/projects/venusx/)
```

| 仓库 | 链接 |
|------|------|
| ai4protein/VenusX | `https://tyang816.github.io/projects/venusx/` |
| ai4protein/VenusREM | `https://tyang816.github.io/projects/venusrem/` |
| ai4protein/ProSST | `https://tyang816.github.io/projects/prosst/` |
| ai4protein/ProtSSN | `https://tyang816.github.io/projects/protssn/` |
| ai4protein/VenusFactory2 | `https://tyang816.github.io/projects/venusfactory2/` |
| ai4protein/VenusRAR | `https://tyang816.github.io/projects/venusrar/` |
| tyang816/Awesome-TCM-LLM | `https://tyang816.github.io/zh/projects/tcm/`（中） / `https://tyang816.github.io/projects/tcm/`（英） |
| tyang816/MedChatZH | `https://tyang816.github.io/projects/medchatzh/` |
| tyang816/SES-Adapter | `https://tyang816.github.io/projects/ses-adapter/` |

论文/会议页若可改链接，优先链项目页而非仅 PDF。

### 4.2 Hugging Face Model / Dataset Card

```markdown
- Project page: https://tyang816.github.io/projects/<slug>/
```

### 4.3 Google Scholar

个人资料 →「主页」可填：`https://tyang816.github.io/` 或 `https://tyang816.github.io/projects/`。

### 4.4 中文渠道

Awesome-TCM-LLM README、知乎/博客统一指向 `/zh/projects/tcm/` 与 `/zh/projects/`。

TCM 汇聚页数据来自本仓库 `_data/tcm_catalog.json`（由 `scripts/sync_tcm_catalog.py` 从 Awesome-TCM-LLM 同步；优先本地 `--repo`，并合并 `data/i18n_en.yml` 英文摘要），条目详情在 `/zh/projects/tcm/items/<id>/` 与 `/projects/tcm/items/<id>/`。上游 `meta.portal_url` 若仍指向旧 `/tcm/`，应改为 `/projects/tcm/`（中文 `/zh/projects/tcm/`）。

---

## 5. 排名预期（诚实）

| 查询类型 | 预期 |
|----------|------|
| 品牌词（Yang Tan / 谭扬 + SJTU） | 有机会进前排 |
| 项目名（VenusX） | 默认输给 GitHub / OpenReview / arXiv，除非 README/HF 强回链 |
| 通用词（protein language model） | 个人站几乎不竞争 |
| 品牌词（Awesome-TCM-LLM / 谭扬 中医大模型） | 应能进前排，优先打这个 |
| 中长尾（中医大模型 开源 / 数据集 / 综述 / 有哪些） | 专题页 + GitHub 回链后有机会 |
| 头词（中医大模型） | 会输给论文、医院新闻、高校站；不要用这个当唯一 KPI |

不要用「通用学术关键词首页」衡量本站；用「项目页被索引 + 品牌/项目名可发现」衡量。

---

## 8. 「中医大模型」排名与 Gemini 为什么不提你

站内 title / H1 / FAQ 已经对准「中医大模型」。搜这个头词仍排不进、Gemini 也不引用，通常不是再改 meta 能解决的。

### 为什么排不进去

1. **域名权重**：`tyang816.github.io` 是个人 Pages，竞争不过 arXiv、高校新闻、GitHub.com 上的模型仓库。
2. **检索意图**：用户搜「中医大模型」时，Google 更常给**具体模型/论文/新闻**（仲景、天医、大数中医、TCMLLM），而不是 awesome 列表。仓库 About 若写成「开源中文医疗大模型」而不是「中医大模型」，更对不齐头词。
3. **外链太少**：约 70 star、创建于 2025-10，缺少论文引用和第三方转载。
4. **Gemini**：先看 Google 检索，再看训练语料里的论文/百科。你不在 SERP 前排、又很少被论文引用，就不会被点名。

### 仓库侧（比再改本站更重要）

在 [Awesome-TCM-LLM](https://github.com/tyang816/Awesome-TCM-LLM) 上立刻改：

- **About / Description** 写成：`中医大模型（TCM LLM）开源资源：模型、论文、数据集与评测`
- **README 主标题** 含「中医大模型」，不要只写「开源中文医疗大模型」
- **门户链接** 用 `https://tyang816.github.io/zh/projects/tcm/`（不要旧的 `/tcm/`）
- 顶部徽章链到中文门户；英文 README 链 `/projects/tcm/`
- 加 `CITATION.cff`，方便论文引用

### 上线后在 GSC 做的

1. 提交 `sitemap_tcm.xml`
2. 对 `/zh/projects/tcm/`、`/zh/projects/tcm/models/`、`/datasets/`、`/surveys/`、`/patents/` 请求编入索引
3. 用「[中医大模型 site:tyang816.github.io](https://www.google.com/search?q=%E4%B8%AD%E5%8C%BB%E5%A4%A7%E6%A8%A1%E5%9E%8B+site%3Atyang816.github.io)」确认已收录

### 让 Gemini / ChatGPT 愿意点名

- 写一篇可引用的短文（知乎 / 微信 / 实验室主页），标题带「中医大模型」，正文链到门户和 GitHub
- 自己或合作者的综述/评测论文 **Related Work** 引用 Awesome-TCM-LLM
- Hugging Face 模型卡、Papers with Code、相关 awesome 列表加回链
- 名称始终用 **Awesome-TCM-LLM** + **中医大模型**，不要每次换说法
- Wikidata 可建 item（label: Awesome-TCM-LLM，描述: 中医大模型资源列表）

本站已提供 `https://tyang816.github.io/llms.txt`，方便回答引擎发现目录入口。

---

## 6. Token 状态

| 平台 | `_config.yml` 字段 | 状态 |
|------|-------------------|------|
| Google | `google_site_verification` | ✅ 已配置并验证 |
| Bing | `bing_site_verification` | 待填（可选） |
| 百度 | `baidu_site_verification` | 可跳过 |

---

## 7. 时间预期

| 引擎 | 典型可见时间 |
|------|----------------|
| Google | 部署并提交后数天～数周 |
| Bing | 数天～数周 |
| 百度 | 更慢；依赖中文页与外链 |
