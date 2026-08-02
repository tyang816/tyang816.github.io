#!/usr/bin/env bash
# Launch one agent CLI per remaining Chinese post (parallel with concurrency limit).
set -euo pipefail
ROOT="/home/tanyang/workspace/tyang816.github.io"
cd "$ROOT"
LIST="${1:-scripts/i18n_batches/todo_now.txt}"
MODE="${2:-translate}"  # translate | verify
CONCURRENCY="${CONCURRENCY:-8}"
LOGDIR="scripts/i18n_batches/logs"
mkdir -p "$LOGDIR"

run_one() {
  local zh="$1"
  local en="${zh/_posts\/zh\//_posts/}"
  local base
  base="$(basename "$zh" .md | tr ' /:' '___' | cut -c1-80)"
  local log="$LOGDIR/${MODE}_${base}.log"
  if [[ "$MODE" == "translate" ]]; then
    if [[ -f "$en" && $(wc -c < "$en") -gt 200 ]]; then
      echo "SKIP exists $en"
      return 0
    fi
    prompt="Follow $ROOT/scripts/i18n_translate_brief.md
READ: $ROOT/$zh
WRITE: $ROOT/$en
Academic English translation. lang:en; alt_url = Chinese permalink; no English permalink. Preserve images/links/math. Return DONE/FAIL."
  else
    prompt="Follow $ROOT/scripts/i18n_verify_brief.md
ZH: $ROOT/$zh
EN: $ROOT/$en
Verify and fix EN if needed. Return OK/FIXED/FAIL."
  fi
  echo "START $MODE $zh"
  agent -p --force --trust --workspace "$ROOT" --model composer-2.5-fast "$prompt" >"$log" 2>&1 \
    && echo "OK $MODE $zh" \
    || echo "FAIL $MODE $zh (see $log)"
}

export -f run_one
export ROOT MODE LOGDIR

# GNU parallel if available, else xargs
if command -v parallel >/dev/null 2>&1; then
  parallel -j "$CONCURRENCY" run_one :::: "$LIST"
else
  # xargs -P
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    echo "$line"
  done < "$LIST" | xargs -I{} -P "$CONCURRENCY" bash -c 'run_one "$@"' _ {}
fi
