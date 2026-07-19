# SEO 与中英文收录操作指南

站点代码侧的 title / description / JSON-LD / sitemap 已就绪。以下步骤需你在各站长平台用账号完成；拿到验证码后填入仓库根目录 `_config.yml` 对应字段并重新部署。

规范域名：`https://tyang816.github.io/`  
Sitemap：`https://tyang816.github.io/sitemap.xml`  
Robots：`https://tyang816.github.io/robots.txt`

重点申请索引的 URL：

- `https://tyang816.github.io/`
- `https://tyang816.github.io/tcm/`（中文主推）
- `https://tyang816.github.io/notes/`

---

## 1. Google Search Console（英文/国际收录）

1. 打开 [Google Search Console](https://search.google.com/search-console)
2. 选择「网址前缀」，添加 `https://tyang816.github.io`
3. 验证方式选 **HTML 标记**，复制 `content="..."` 中的字符串
4. 填入 `_config.yml`：

```yaml
google_site_verification: "粘贴这里"
```

5. 推送后打开线上首页源码，确认存在 `google-site-verification`，再在 GSC 点验证
6. 「站点地图」→ 提交 `sitemap.xml`
7. 「网址检查」→ 分别检查 `/`、`/tcm/`、`/notes/` → **请求编入索引**

---

## 2. Bing Webmaster Tools

1. 打开 [Bing Webmaster](https://www.bing.com/webmasters)
2. 可用 **Import from Google Search Console**，或独立添加站点并验证（HTML meta / `msvalidate.01`）
3. 将验证码填入：

```yaml
bing_site_verification: "粘贴这里"
```

4. 提交站点地图：`https://tyang816.github.io/sitemap.xml`
5. 对重点 URL 使用 URL Inspection / 提交

---

## 3. 百度搜索资源平台（中文收录）

1. 打开 [百度搜索资源平台](https://ziyuan.baidu.com/)
2. 添加网站 `https://tyang816.github.io`（GitHub Pages 一般选「其他」类站点）
3. 验证选 **HTML 标签**，复制 `baidu-site-verification` 的 content
4. 填入：

```yaml
baidu_site_verification: "粘贴这里"
```

5. 部署生效后完成验证
6. 「数据引入」→ 提交 sitemap（若平台要求 txt/xml 链接，使用上述 sitemap URL）
7. 对 `/tcm/` 使用「普通收录」手动提交（百度对 `github.io` 收录较慢，需配合中文外链）

建议外链：Awesome-TCM-LLM README、个人知乎/博客、论文项目页统一链回 `https://tyang816.github.io/tcm/` 与首页。

---

## 4. 部署后自检

```bash
curl -sL https://tyang816.github.io/ | rg 'title>|meta name="description"|application/ld\+json|canonical'
curl -sL https://tyang816.github.io/tcm/ | rg 'lang=|title>|中医大模型|description'
curl -sL https://tyang816.github.io/sitemap.xml | rg '/tcm/|/notes/|tyang816.github.io/</loc>'
curl -sL https://tyang816.github.io/robots.txt
```

期望：

- 首页 title 为 `Yang Tan | AI for Biology & TCM LLMs`（不是 Homepage）
- `/tcm/` 的 `html lang="zh-CN"`，title/description 含「中医大模型」
- 源码含 `Person` / `WebSite` JSON-LD
- sitemap 含 `/`、`/tcm/`、`/notes/`

---

## 5. 时间预期

| 引擎 | 验证后典型可见时间 |
|------|-------------------|
| Google | 数天～数周 |
| Bing | 数天～数周 |
| 百度 | 往往更慢；依赖中文内容与外链 |

勿购买外链或堆砌关键词；保持 GitHub / Scholar / ORCID 个人页主页 URL 一致即可。
