#!/usr/bin/env python3
"""Add jekyll-redirect-from entries for pre-/notes/ permalinks (2026-08-02)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / "_posts"
CATS = ("bi", "cl", "cv", "ml", "se", "ir", "os")
ITEM_RE = re.compile(r"^[ \t]*-[ \t]+(.+?)\s*$")
PERMA_RE = re.compile(r"^permalink:\s*[\"']?(\S+?)[\"']?\s*$")


def strip_q(s: str) -> str:
    s = s.strip()
    if len(s) >= 2 and s[0] in "\"'" and s[-1] == s[0]:
        return s[1:-1]
    return s


def split_front_matter(text: str) -> tuple[list[str], str] | None:
    if not text.startswith("---"):
        return None
    lines = text.splitlines(keepends=True)
    if not lines or lines[0].strip() != "---":
        return None
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end = i
            break
    if end is None:
        return None
    return lines[1:end], "".join(lines[end + 1 :])


def permalink_of(fm_lines: list[str]) -> str | None:
    for line in fm_lines:
        m = PERMA_RE.match(line.rstrip("\n"))
        if m:
            return m.group(1)
    return None


def extract_redirects(fm_lines: list[str]) -> tuple[list[str], list[str]]:
    """Return (front-matter without redirect_from, existing redirect items)."""
    start = None
    for i, line in enumerate(fm_lines):
        if re.match(r"^redirect_from:\s*$", line) or re.match(r"^redirect_from:\s*\[", line):
            start = i
            break
    if start is None:
        return fm_lines, []

    items: list[str] = []
    end = start + 1
    while end < len(fm_lines):
        raw = fm_lines[end].rstrip("\n")
        m = ITEM_RE.match(raw)
        if m:
            items.append(strip_q(m.group(1)))
            end += 1
            continue
        if raw.strip() == "":
            end += 1
            continue
        break
    kept = fm_lines[:start] + fm_lines[end:]
    while kept and kept[-1].strip() == "":
        kept.pop()
    return kept, items


def old_paths_from_permalink(permalink: str) -> list[str]:
    p = permalink if permalink.endswith("/") else permalink + "/"
    m = re.match(r"^/(zh/)?notes/([A-Za-z]{2})/(.+)$", p)
    if not m:
        return []
    zh, cat, slug = m.group(1) or "", m.group(2).lower(), m.group(3)
    if cat not in CATS:
        return []
    return [f"/{zh}{cat}/{slug}", f"/{zh}{cat.upper()}/{slug}"]


def normalize(url: str) -> str:
    if not url.startswith("/"):
        url = "/" + url
    if not url.endswith("/") and not re.search(r"\.[a-z0-9]+$", url, re.I):
        url += "/"
    return url


def collect_english_old() -> set[str]:
    owned: set[str] = set()
    for path in POSTS.rglob("*.md"):
        if str(path.relative_to(POSTS)).startswith("zh/"):
            continue
        parsed = split_front_matter(path.read_text(encoding="utf-8"))
        if not parsed:
            continue
        fm_lines, _ = parsed
        pm = permalink_of(fm_lines)
        if not pm:
            continue
        for old in old_paths_from_permalink(pm):
            if not old.startswith("/zh/"):
                owned.add(normalize(old))
    return owned


def dump_items(items: list[str]) -> list[str]:
    out = ["redirect_from:\n"]
    for it in items:
        q = it.replace("\\", "\\\\").replace('"', '\\"')
        out.append(f'  - "{q}"\n')
    return out


def update_file(path: Path, english_old: set[str]) -> bool:
    text = path.read_text(encoding="utf-8")
    parsed = split_front_matter(text)
    if not parsed:
        return False
    fm_lines, body = parsed
    pm = permalink_of(fm_lines)
    if not pm:
        return False

    kept, existing = extract_redirects(fm_lines)
    extra = old_paths_from_permalink(pm)
    is_zh_post = str(path.relative_to(POSTS)).startswith("zh/")

    merged: list[str] = []
    seen: set[str] = set()

    def add(url: str) -> None:
        url = normalize(url)
        if is_zh_post and url in english_old:
            return
        if url in seen:
            return
        seen.add(url)
        merged.append(url)

    for it in existing:
        add(it)
    for it in extra:
        add(it)

    if not merged and not existing:
        return False

    insert_at = None
    for i, line in enumerate(kept):
        if PERMA_RE.match(line.rstrip("\n")):
            insert_at = i + 1
            break
    if insert_at is None:
        insert_at = len(kept)

    new_fm = kept[:insert_at] + dump_items(merged) + kept[insert_at:]
    if new_fm and not new_fm[-1].endswith("\n"):
        new_fm[-1] += "\n"
    new_text = "---\n" + "".join(new_fm) + "---\n" + body
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main() -> None:
    english_old = collect_english_old()
    changed = 0
    for path in sorted(POSTS.rglob("*.md")):
        if update_file(path, english_old):
            changed += 1
    print(f"updated {changed} posts; english-owned old paths={len(english_old)}")


if __name__ == "__main__":
    main()
