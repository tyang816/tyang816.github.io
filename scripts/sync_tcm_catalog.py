#!/usr/bin/env python3
"""Sync Awesome-TCM-LLM catalog into this site (data + thin item pages)."""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "_data" / "tcm_catalog.json"
ZH_ITEMS = ROOT / "_pages" / "zh" / "projects" / "tcm" / "items"
EN_ITEMS = ROOT / "_pages" / "projects" / "tcm" / "items"

DEFAULT_LOCAL = Path("/home/tanyang/workspace/Awesome-TCM-LLM")
SIBLING_LOCAL = ROOT.parent / "Awesome-TCM-LLM"

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

LINK_LABEL_EN = {
    "论文": "Paper",
    "代码": "Code",
    "灵丹代码": "Lingdan code",
    "模型": "Model",
    "数据集": "Dataset",
    "链接": "Link",
    "DOI": "DOI",
    "预训练数据": "Pretrain data",
    "SFT数据": "SFT data",
    "指令数据": "Instruction data",
    "网站": "Website",
    "新闻": "News",
    "数据": "Data",
    "资料": "Resources",
    "榜单": "Leaderboard",
    "平台": "Platform",
    "相关 MedCare": "Related MedCare",
    "GGUF": "GGUF",
    "JMIR": "JMIR",
    "ScienceDirect": "ScienceDirect",
    "正式发表": "Published",
}


def load_yaml(path: Path) -> dict:
    try:
        import yaml
    except ImportError as exc:  # pragma: no cover
        raise RuntimeError("PyYAML is required to load i18n_en.yml") from exc
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    if not isinstance(data, dict):
        raise RuntimeError(f"Expected mapping in {path}")
    return data


def apply_i18n(entry: dict, i18n: dict) -> dict:
    out = dict(entry)
    patch = i18n.get(entry.get("id")) or {}
    if isinstance(patch, str):
        patch = {"summary_en": patch}
    if not isinstance(patch, dict):
        return out
    for key in ("summary_en", "title_en", "name_en"):
        if patch.get(key) and not out.get(key):
            out[key] = patch[key]
    if patch.get("orgs_en"):
        out["orgs_en"] = list(patch["orgs_en"])
    return out


def links_en(links: dict | None) -> dict:
    if not links:
        return {}
    out: dict[str, str] = {}
    for key, url in links.items():
        if not url:
            continue
        label = LINK_LABEL_EN.get(key, key)
        if re.search(r"[\u4e00-\u9fff]", label):
            label = re.sub(r"[\u4e00-\u9fff]+", "", label).strip() or "Link"
        # Keep uniqueness if multiple Chinese keys map to same English label.
        if label in out and out[label] != url:
            label = f"{label} ({key})"
        out[label] = url
    return out


def fetch_remote_catalog() -> dict:
    last_err: Exception | None = None
    for url in SOURCES:
        try:
            with urllib.request.urlopen(url, timeout=60) as res:
                return json.loads(res.read().decode("utf-8"))
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            print(f"warn: failed {url}: {exc}", file=sys.stderr)
    raise RuntimeError(f"Failed to fetch catalog.json: {last_err}")


def resolve_local_repo(explicit: str | None) -> Path | None:
    candidates: list[Path] = []
    if explicit:
        candidates.append(Path(explicit).expanduser().resolve())
    env = __import__("os").environ.get("TCM_REPO")
    if env:
        candidates.append(Path(env).expanduser().resolve())
    candidates.extend([DEFAULT_LOCAL, SIBLING_LOCAL])
    for path in candidates:
        if (path / "data" / "catalog.json").is_file():
            return path
    return None


def load_catalog(local_repo: Path | None, prefer_remote: bool) -> tuple[dict, dict, str]:
    """Return (payload, i18n_en, source_label)."""
    if not prefer_remote and local_repo is not None:
        catalog_path = local_repo / "data" / "catalog.json"
        i18n_path = local_repo / "data" / "i18n_en.yml"
        payload = json.loads(catalog_path.read_text(encoding="utf-8"))
        i18n = load_yaml(i18n_path) if i18n_path.is_file() else {}
        return payload, i18n, str(catalog_path)

    payload = fetch_remote_catalog()
    i18n: dict = {}
    if local_repo is not None:
        i18n_path = local_repo / "data" / "i18n_en.yml"
        if i18n_path.is_file():
            i18n = load_yaml(i18n_path)
    return payload, i18n, "remote"


def published_items(payload: dict, i18n: dict) -> list[dict]:
    out = []
    for item in payload.get("items") or []:
        status = item.get("status") or "published"
        if status != "published":
            continue
        if not item.get("verified_at"):
            continue
        if not item.get("id"):
            continue
        merged = apply_i18n(item, i18n)
        merged["links_en"] = links_en(merged.get("links"))
        out.append(merged)
    return out


def strip_md_bold(text: str) -> str:
    return re.sub(r"\*\*([^*]+)\*\*", r"\1", text or "")


def display_name(item: dict, zh: bool) -> str:
    if item.get("type") == "news":
        if zh:
            return strip_md_bold(item.get("summary_zh") or item.get("name") or item["id"])
        return strip_md_bold(
            item.get("summary_en")
            or item.get("summary_zh")
            or item.get("name")
            or item["id"]
        )
    if zh:
        return strip_md_bold(item.get("name") or item.get("title_zh") or item["id"])
    return strip_md_bold(
        item.get("name_en")
        or item.get("name")
        or item.get("title_en")
        or item.get("title_zh")
        or item["id"]
    )


def display_summary(item: dict, zh: bool) -> str:
    if item.get("type") == "news":
        if zh:
            return strip_md_bold(item.get("summary_zh") or item.get("name") or "")
        return strip_md_bold(
            item.get("summary_en") or item.get("summary_zh") or item.get("name") or ""
        )
    if zh:
        return strip_md_bold(item.get("summary_zh") or item.get("title_zh") or "")
    return strip_md_bold(
        item.get("summary_en")
        or item.get("title_en")
        or item.get("summary_zh")
        or item.get("title_zh")
        or ""
    )


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
    name = display_name(item, zh)
    if name and name not in base:
        base.append(name[:80])
    return base[:12]


def write_item_page(path: Path, item: dict, zh: bool) -> None:
    item_id = item["id"]
    name = display_name(item, zh)
    summary = display_summary(item, zh)
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
    date_val = item.get("date") or str(item.get("year") or "")
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
tcm_date: {yaml_quote(str(date_val))}
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
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--repo",
        help="Path to local Awesome-TCM-LLM checkout (uses data/catalog.json + i18n_en.yml)",
    )
    parser.add_argument(
        "--remote",
        action="store_true",
        help="Force fetch catalog.json from GitHub instead of local checkout",
    )
    parser.add_argument(
        "--no-bump-date",
        action="store_true",
        help="Keep upstream updated_at instead of today's date",
    )
    args = parser.parse_args()

    local_repo = resolve_local_repo(args.repo)
    if args.remote and local_repo is None:
        print("warn: no local repo for i18n_en.yml; English blurbs may be missing", file=sys.stderr)

    payload, i18n, source = load_catalog(local_repo, prefer_remote=args.remote)
    items = published_items(payload, i18n)
    payload = dict(payload)
    payload["items"] = items
    if not args.no_bump_date:
        today = date.today().isoformat()
        payload["updated_at"] = today
        meta = dict(payload.get("meta") or {})
        meta["updated_at"] = today
        payload["meta"] = meta

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

    with_en = sum(1 for i in items if i.get("summary_en") or i.get("title_en"))
    print(
        f"synced {len(items)} items from {source} → {DATA_PATH.relative_to(ROOT)} "
        f"and {ZH_ITEMS.relative_to(ROOT)} / {EN_ITEMS.relative_to(ROOT)} "
        f"(updated_at={payload.get('updated_at')}, i18n_en={len(i18n)}, with_en={with_en})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
