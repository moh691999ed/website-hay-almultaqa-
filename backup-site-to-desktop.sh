#!/bin/bash
set -euo pipefail

# ينسخ مشروع الموقع إلى: ~/Desktop/حي الملتقى/نسخة-موقع-حي-الملتقى
# شغّل من Terminal العادي (ليس من Cursor إذا منع النظام الكتابة على سطح المكتب).

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEST_BASE="${HOME}/Desktop/حي الملتقى"
DEST="${DEST_BASE}/نسخة-موقع-حي-الملتقى"

echo "المصدر: $ROOT"
echo "الوجهة: $DEST"
mkdir -p "$DEST_BASE"
rm -rf "$DEST"

rsync -a \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.turbo \
  --exclude='*.log' \
  --exclude='حي-الملتقى-موقع-*.tar.gz' \
  "$ROOT/" "$DEST/"

README="${DEST}/اقرأني-النسخة-الاحتياطية.txt"
cat > "$README" << EOF
نسخة احتياطية من موقع «حي الملتقى» (Next.js)

استعادة التشغيل:
  cd "$(basename "$DEST")"
  npm install
  npm run dev

ما لم يُنسَخ: node_modules و .next (يُعاد إنشاؤهما).
ملفات .env انسخها يدوياً إن لزم.

تاريخ النسخ: $(date '+%Y-%m-%d %H:%M')
EOF

echo ""
echo "تم. الحجم التقريبي:"
du -sh "$DEST"
