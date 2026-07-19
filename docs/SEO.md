# SEO 与中英文收录操作指南

站点已支持全站双语（`/` ↔ `/zh/` 等）与 `hreflang`。**Google Search Console 站点验证已完成**（`google_site_verification` 已写入 `_config.yml` 并部署）。以下步骤需你在各站长平台用账号完成。

## 规范 URL

| 用途 | URL |
|------|-----|
| 英文首页 | `https://tyang816.github.io/` |
| 中文首页 | `https://tyang816.github.io/zh/` |
| 中医门户（中文） | `https://tyang816.github.io/tcm/` |
| TCM 英文说明 | `https://tyang816.github.io/tcm-en/` |
| 全站 sitemap | `https://tyang816.github.io/sitemap.xml` |
| 双语对照 sitemap | `https://tyang816.github.io/sitemap_i18n.xml` |
| robots | `https://tyang816.github.io/robots.txt` |

重点申请索引：`/`、`/zh/`、`/tcm/`、`/tcm-en/`、`/notes/`、`/zh/notes/`、`/timeline/`、`/zh/timeline/`。

---

## 1. Google Search Console（验证已完成 → 收尾）

1. 打开 [Google Search Console](https://search.google.com/search-console)，确认属性 `https://tyang816.github.io` 已验证
2. **站点地图**：左侧「站点地图」→ 分别提交：
   - `sitemap.xml`
   - `sitemap_i18n.xml`
3. **请求编入索引**：顶部「网址检查」→ 逐条粘贴下列 URL →「请求编入索引」：
   - `https://tyang816.github.io/`
   - `https://tyang816.github.io/zh/`
   - `https://tyang816.github.io/tcm/`
   - `https://tyang816.github.io/tcm-en/`
   - `https://tyang816.github.io/notes/`
   - `https://tyang816.github.io/zh/notes/`
   - `https://tyang816.github.io/timeline/`
   - `https://tyang816.github.io/zh/timeline/`
4. 数日后在「页面」/「索引」中查看上述 URL 是否已收录

> 仓库侧：`robots.txt` 已声明两个 sitemap；`sitemap.xml`（jekyll-sitemap）与 `sitemap_i18n.xml`（手写 hreflang 对照）均已包含上表全部关键 URL。

---

## 2. Bing Webmaster Tools

1. 打开 [Bing Webmaster](https://www.bing.com/webmasters)
2. 可从 Google 导入，或独立验证（`msvalidate.01`）
3. 若尚未验证，填入 `_config.yml`：

```yaml
bing_site_verification: "粘贴这里"
```

4. 提交上述两个 sitemap
5. 对「重点申请索引」中的 URL 提交收录

---

## 3. 百度搜索资源平台（可选，可跳过）

GitHub Pages 在国内访问与百度抓取均不稳定，**可跳过**。若仍要尝试：

1. 打开 [百度搜索资源平台](https://ziyuan.baidu.com/)
2. 添加 `https://tyang816.github.io`
3. HTML 标签验证 → 填入：

```yaml
baidu_site_verification: "粘贴这里"
```

4. 部署后完成验证
5. 提交 sitemap；对 `/zh/`、`/tcm/` 做普通收录提交
6. 外链建议：Awesome-TCM-LLM README、知乎/博客统一链回中文首页与 `/tcm/`

---

## 4. 部署后自检

```bash
curl -sL https://tyang816.github.io/ | rg 'hreflang|canonical|title>'
curl -sL https://tyang816.github.io/zh/ | rg 'hreflang|lang=|谭扬|title>'
curl -sL https://tyang816.github.io/sitemap_i18n.xml | head -40
curl -sL https://tyang816.github.io/robots.txt
# 确认 sitemap.xml 含关键页
for u in / /zh/ /tcm/ /tcm-en/ /notes/ /zh/notes/ /timeline/ /zh/timeline/; do
  curl -sL https://tyang816.github.io/sitemap.xml | grep -F "https://tyang816.github.io${u}</loc>" && echo "OK $u" || echo "MISSING $u"
done
```

期望：

- 首页与 `/zh/` 互指 `hreflang="en"` / `hreflang="zh-CN"`，且有 `x-default` → `/`
- 各自 `canonical` 指向自身语言 URL
- 导航可见 **EN | 中文** 切换
- `/tcm/` ↔ `/tcm-en/` 互为 alternate
- `robots.txt` 声明 `sitemap.xml` 与 `sitemap_i18n.xml`；两个 sitemap 均含上表 8 个关键 URL

---

## 5. Token 状态

| 平台 | `_config.yml` 字段 | 状态 |
|------|-------------------|------|
| Google | `google_site_verification` | ✅ 已配置并验证 |
| Bing | `bing_site_verification` | 待填（可选） |
| 百度 | `baidu_site_verification` | 可跳过 |

---

## 6. 时间预期

| 引擎 | 典型可见时间 |
|------|----------------|
| Google | 数天～数周 |
| Bing | 数天～数周 |
| 百度 | 往往更慢；依赖中文页与外链 |
