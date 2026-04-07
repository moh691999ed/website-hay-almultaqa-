#!/bin/bash
set -euo pipefail

# أرشيف zip/tar للكود المصدري (بدون node_modules و .next) — للأرشفة أو إرسال للعميل.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
STAMP=$(date '+%Y%m%d-%H%M')
DEST_BASE="${HOME}/Desktop/حي الملتقى"
ARCHIVE="${DEST_BASE}/حي-الملتقى-موقع-مصدر-${STAMP}.tar.gz"

mkdir -p "$DEST_BASE"
cd "$ROOT/.."
PROJECT_NAME="$(basename "$ROOT")"

echo "==> ضغط المصدر: $ARCHIVE"
tar -czf "$ARCHIVE" \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.turbo' \
  --exclude='*.log' \
  --exclude='.git' \
  --exclude='prisma/dev.db' \
  --exclude='prisma/dev.db-journal' \
  -C "$(dirname "$ROOT")" \
  "$PROJECT_NAME"

echo "تم: $ARCHIVE"
du -sh "$ARCHIVE"
