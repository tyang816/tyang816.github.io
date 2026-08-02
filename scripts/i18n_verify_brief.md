# Paper-note translation verification brief

## Task
Compare one Chinese note with its English translation and fix the English file in place.

## Paths
- Chinese: `_posts/zh/{CAT}/{file}.md`
- English: `_posts/{CAT}/{file}.md`

## Checklist (fix English file if any fail)
1. English file exists and is complete (no truncated ending vs Chinese sections)
2. No remaining Chinese prose in the body (proper nouns OK)
3. Frontmatter: `lang: en`; `alt_url` equals Chinese `permalink`; no `permalink` on English; other fields preserved
4. All images, links, URLs, and math preserved
5. Headings/sections align with Chinese structure
6. Academic English tone; fix clear Chinglish or terminology errors
7. Numbers, model names, and citations unchanged

## Output
Return: OK path=<en> or FIXED path=<en> issues=<short list> or FAIL reason=
