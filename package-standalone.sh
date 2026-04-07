#!/bin/bash
set -euo pipefail

# يبني المشروع ويُنشئ مجلداً جاهزاً للنقل مع تعليمات التشغيل.
# الاستخدام: من جذر المشروع — npm run export:standalone

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

STAMP=$(date '+%Y%m%d-%H%M')
OUT_NAME="al-multaqa-standalone-${STAMP}"
OUT_DIR="${HOME}/Desktop/حي الملتقى/${OUT_NAME}"

echo "==> بناء الإنتاج (next build)…"
npm run build

echo "==> تجميع مجلد standalone…"
mkdir -p "$(dirname "$OUT_DIR")"
rm -rf "$OUT_DIR"
cp -R "$ROOT/.next/standalone" "$OUT_DIR"

mkdir -p "$OUT_DIR/.next"
cp -R "$ROOT/.next/static" "$OUT_DIR/.next/static"
cp -R "$ROOT/public" "$OUT_DIR/public"

mkdir -p "$OUT_DIR/prisma"
cp "$ROOT/prisma/schema.prisma" "$OUT_DIR/prisma/schema.prisma"

README="${OUT_DIR}/اقرأني-التشغيل-على-السيرفر.txt"
cat > "$README" << EOF
حزمة تشغيل «حي الملتقى» (Next.js standalone)

المتطلبات على السيرفر:
  - Node.js 20 أو أحدث
  - ملف .env يحتوي على DATABASE_URL و ADMIN_PASSWORD و ADMIN_SECRET (16+ حرفاً للإنتاج)

قبل التشغيل:
  npm install prisma @prisma/client --omit=dev
  npx prisma generate
  npx prisma db push   (أو migrate حسب بيئتك)

التشغيل (المنفذ الافتراضي 3000):
  cd "$(basename "$OUT_DIR")"
  HOSTNAME=0.0.0.0 PORT=3000 node server.js

ملاحظة: انسخ ملف .env إلى هذا المجلد يدوياً (لا يُضمَّن تلقائياً لأسباب أمنية).

تاريخ التصدير: $(date '+%Y-%m-%d %H:%M')
EOF

ARCHIVE="${HOME}/Desktop/حي الملتقى/${OUT_NAME}.tar.gz"
echo "==> ضغط أرشيف: $ARCHIVE"
tar -czf "$ARCHIVE" -C "$(dirname "$OUT_DIR")" "$(basename "$OUT_DIR")"

echo ""
echo "تم."
echo "  مجلد: $OUT_DIR"
echo "  أرشيف: $ARCHIVE"
du -sh "$OUT_DIR" "$ARCHIVE"
