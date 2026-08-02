# Paper-note translation brief

## Task
Translate one Chinese paper note into academic English.

## Paths
- Read ONLY: `_posts/zh/{CAT}/{YYYY-MM-DD-title}.md`
- Write ONLY: `_posts/{CAT}/{same-filename}.md` (create `{CAT}` dir if needed)

## Frontmatter rules
Keep `layout`, `title`, `categories`, `tags`, `proceedings`, `date` (and any other non-lang fields).
Set:
- `lang: en`
- `alt_url: /zh/{cat-lowercase}/{slug}/` where slug is the filename stem after the date with spaces → hyphens (same as Chinese `permalink` but without `/zh` prefix swapped: use Chinese file’s `alt_url` path under `/zh/...` — i.e. English `alt_url` = Chinese `permalink`)
- Do NOT include `permalink` on the English file (default `/ {cat} / {slug} /` is correct)
- Remove Chinese-only fields if any

## Body rules
- Academic English suitable for a research reading note
- Preserve all Markdown structure, headings, lists, tables, HTML `<div>` image blocks, links, URLs, and math (`$...$` / `$$...$$`)
- Keep figure/table captions meaningful in English
- Do not invent facts, numbers, or citations; do not drop sections
- Keep paper/model names, acronyms, and code identifiers unchanged
- Blockquote paper links at top: translate labels like `论文地址` → `Paper`, `论文实现` → `Code` / `Implementation`

## Done criteria
- English file exists at the target path
- No remaining Chinese prose (except unavoidable proper nouns)
- Frontmatter `alt_url` points to the Chinese permalink
