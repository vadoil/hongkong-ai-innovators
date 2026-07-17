#!/usr/bin/env bash
# Runs on the VPS. Called by GitHub Actions.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/cwh}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"

echo "==> git fetch/reset $BRANCH"
git fetch --depth=1 origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "==> install deps (bun)"
export PATH="$HOME/.bun/bin:$PATH"
bun install

echo "==> ensure better-sqlite3 (prebuilt via npm)"
npm i --no-save --omit=dev better-sqlite3 >/dev/null 2>&1 || true

echo "==> build (nitro node-server preset)"
export NITRO_PRESET=node-server
bun run build

echo "==> ensure data dir"
sudo mkdir -p /var/lib/cwh
sudo chown -R "$USER":"$USER" /var/lib/cwh

echo "==> pm2 reload"
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

echo "==> done"
