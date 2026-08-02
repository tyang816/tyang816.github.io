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
| 全站 sitemap | `https://tyang816.github.io/sitemap.xml` |
| 双语优先 sitemap | `https://tyang816.github.io/sitemap_i18n.xml` |
| robots | `https://tyang816.github.io/robots.txt` |

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
3. **请求编入索引**：对「重点申请索引」中的 URL 逐条「网址检查 → 请求编入索引」
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

---

## 5. 排名预期（诚实）

| 查询类型 | 预期 |
|----------|------|
| 品牌词（Yang Tan / 谭扬 + SJTU） | 有机会进前排 |
| 项目名（VenusX） | 默认输给 GitHub / OpenReview / arXiv，除非 README/HF 强回链 |
| 通用词（protein language model） | 个人站几乎不竞争 |

不要用「通用学术关键词首页」衡量本站；用「项目页被索引 + 品牌/项目名可发现」衡量。

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
