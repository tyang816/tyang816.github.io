#!/usr/bin/env python3
"""Sync Awesome-TCM-LLM catalog into this site (data + thin item pages)."""

from __future__ import annotations

import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "_data" / "tcm_catalog.json"
ZH_ITEMS = ROOT / "_pages" / "zh" / "projects" / "tcm" / "items"
EN_ITEMS = ROOT / "_pages" / "projects" / "tcm" / "items"

SOURCES = [
    "https://cdn.jsdelivr.net/gh/tyang816/Awesome-TCM-LLM@main/data/catalog.json",
    "https://raw.githubusercontent.com/tyang816/Awesome-TCM-LLM/main/data/catalog.json",
]

TYPE_LABELS_ZH = {
    "news": "新闻",
    "resource": "资源",
    "survey": "综述",
    "dataset": "数据集",
    "model_hf": "模型",
    "tool": "工具",
    "kg": "知识图谱",
    "product": "产品",
    "benchmark": "评测",
}

TYPE_LABELS_EN = {
    "news": "news",
    "resource": "resource",
    "survey": "survey",
    "dataset": "dataset",
    "model_hf": "model",
    "tool": "tool",
    "kg": "kg",
    "product": "product",
    "benchmark": "benchmark",
}


def fetch_catalog() -> dict:
    last_err: Exception | None = None
    for url in SOURCES:
        try:
            with urllib.request.urlopen(url, timeout=60) as res:
                return json.loads(res.read().decode("utf-8"))
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            print(f"warn: failed {url}: {exc}", file=sys.stderr)
    raise RuntimeError(f"Failed to fetch catalog.json: {last_err}")


def published_items(payload: dict) -> list[dict]:
    out = []
    for item in payload.get("items") or []:
        status = item.get("status") or "published"
        if status != "published":
            continue
        if not item.get("verified_at"):
            continue
        if not item.get("id"):
            continue
        out.append(item)
    return out


def strip_md_bold(text: str) -> str:
    return re.sub(r"\*\*([^*]+)\*\*", r"\1", text or "")


def display_name(item: dict) -> str:
    if item.get("type") == "news":
        return strip_md_bold(item.get("summary_zh") or item.get("name") or item["id"])
    return strip_md_bold(item.get("name") or item.get("title_zh") or item["id"])


def display_summary(item: dict) -> str:
    if item.get("type") == "news":
        return strip_md_bold(item.get("summary_zh") or item.get("name") or "")
    return strip_md_bold(item.get("summary_zh") or item.get("title_zh") or "")


def yaml_quote(value: str) -> str:
    escaped = (value or "").replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def safe_filename(item_id: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "-", item_id).strip("-") or "item"


def keywords_for(item: dict, zh: bool) -> list[str]:
    base = (
        ["中医大模型", "TCM LLM", "Traditional Chinese Medicine"]
        if zh
        else ["TCM LLM", "Traditional Chinese Medicine", "Awesome-TCM-LLM"]
    )
    t = item.get("type") or ""
    label = (TYPE_LABELS_ZH if zh else TYPE_LABELS_EN).get(t, t)
    if label:
        base.append(label)
    for tag in item.get("tags") or []:
        if tag and tag not in base:
            base.append(str(tag))
    name = display_name(item)
    if name and name not in base:
        base.append(name[:80])
    return base[:12]


def write_item_page(path: Path, item: dict, zh: bool) -> None:
    item_id = item["id"]
    name = display_name(item)
    summary = display_summary(item)
    desc = summary or name
    if len(desc) > 180:
        desc = desc[:177] + "…"
    type_key = item.get("type") or "resource"
    type_label = (TYPE_LABELS_ZH if zh else TYPE_LABELS_EN).get(type_key, type_key)
    title = f"{name} | 中医大模型" if zh else f"{name} | TCM AI"
    if len(title) > 120:
        title = (name[:90] + "…") + (" | 中医大模型" if zh else " | TCM AI")
    permalink = (
        f"/zh/projects/tcm/items/{item_id}/"
        if zh
        else f"/projects/tcm/items/{item_id}/"
    )
    alt = (
        f"/projects/tcm/items/{item_id}/"
        if zh
        else f"/zh/projects/tcm/items/{item_id}/"
    )
    kws = keywords_for(item, zh)
    kw_yaml = "\n".join(f"- {yaml_quote(k)}" for k in kws)
    date = item.get("date") or str(item.get("year") or "")
    fm = f"""---
permalink: {permalink}
title: {yaml_quote(title)}
layout: default
project: tcm
section: item
tcm_item_id: {yaml_quote(item_id)}
tcm_generated: true
lang: {"zh-CN" if zh else "en"}
alt_url: {alt}
author_profile: true
sidebar_collapsed: true
sidebar_sticky: false
description: {yaml_quote(desc)}
seo_description: {yaml_quote(desc)}
keywords:
{kw_yaml}
tcm_type: {yaml_quote(type_key)}
tcm_type_label: {yaml_quote(type_label)}
tcm_date: {yaml_quote(str(date))}
---

{{% include tcm-item.html %}}
"""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(fm, encoding="utf-8")


def clear_generated(dir_path: Path) -> None:
    if not dir_path.exists():
        return
    for p in dir_path.glob("*.md"):
        text = p.read_text(encoding="utf-8", errors="ignore")
        if "tcm_generated: true" in text:
            p.unlink()


def main() -> int:
    payload = fetch_catalog()
    items = published_items(payload)
    payload = dict(payload)
    payload["items"] = items
    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    DATA_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    clear_generated(ZH_ITEMS)
    clear_generated(EN_ITEMS)
    ZH_ITEMS.mkdir(parents=True, exist_ok=True)
    EN_ITEMS.mkdir(parents=True, exist_ok=True)

    for item in items:
        fname = safe_filename(item["id"]) + ".md"
        write_item_page(ZH_ITEMS / fname, item, zh=True)
        write_item_page(EN_ITEMS / fname, item, zh=False)

    print(
        f"synced {len(items)} items → {DATA_PATH.relative_to(ROOT)} "
        f"and {ZH_ITEMS.relative_to(ROOT)} / {EN_ITEMS.relative_to(ROOT)} "
        f"(updated_at={payload.get('updated_at')})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
