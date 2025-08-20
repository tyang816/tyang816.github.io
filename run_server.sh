#!/usr/bin/env bash

set -euo pipefail

export PATH="$HOME/gems/bin:$PATH"

bundle install
bundle exec jekyll serve --livereload