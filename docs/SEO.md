# SEO 与中英文收录操作指南

站点已支持全站双语（`/` ↔ `/zh/` 等）与 `hreflang`。以下步骤需你在各站长平台用账号完成；拿到验证码后填入仓库根目录 `_config.yml` 对应字段并重新部署。

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

重点申请索引：`/`、`/zh/`、`/tcm/`、`/tcm-en/`、`/notes/`、`/zh/notes/`。

---

## 1. Google Search Console

1. 打开 [Google Search Console](https://search.google.com/search-console)
2. 「网址前缀」添加 `https://tyang816.github.io`
3. 验证选 **HTML 标记**，复制 content 字符串
4. 填入 `_config.yml`：

```yaml
google_site_verification: "粘贴这里"
```

5. 部署后确认首页源码含验证 meta，再点验证
6. 提交站点地图：`sitemap.xml` 与 `sitemap_i18n.xml`
7. 网址检查并请求索引：`/`、`/zh/`、`/tcm/`、`/notes/`

---

## 2. Bing Webmaster Tools

1. 打开 [Bing Webmaster](https://www.bing.com/webmasters)
2. 可从 Google 导入，或独立验证（`msvalidate.01`）
3. 填入：

```yaml
bing_site_verification: "粘贴这里"
```

4. 提交上述两个 sitemap
5. 对重点 URL 提交收录

---

## 3. 百度搜索资源平台（中文）

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
```

期望：

- 首页与 `/zh/` 互指 `hreflang="en"` / `hreflang="zh-CN"`，且有 `x-default` → `/`
- 各自 `canonical` 指向自身语言 URL
- 导航可见 **EN | 中文** 切换
- `/tcm/` ↔ `/tcm-en/` 互为 alternate

---

## 5. Token 状态提醒

当前 `_config.yml` 中三家 verification 字段仍为空。完成验证前，搜索引擎可能延迟信任站点；**请尽快填入 token 并 push**，否则双语 SEO 无法在站长后台闭环。

---

## 6. 时间预期

| 引擎 | 典型可见时间 |
|------|----------------|
| Google | 数天～数周 |
| Bing | 数天～数周 |
| 百度 | 往往更慢；依赖中文页与外链 |
