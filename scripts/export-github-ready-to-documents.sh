#!/bin/bash
set -euo pipefail

# نسخة كاملة من الكود (فرونت + باك عبر Next.js) إلى مجلد في Documents
# جاهزة لـ: git init → رفع GitHub → npm install على السيرفر
#
# لا يُنسخ: node_modules، .next، .env (أسرار)، قاعدة SQLite المحلية، .git القديم

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
STAMP=$(date '+%Y%m%d-%H%M')
DEST_NAME="حي-الملتقى-موقع-github-ready-${STAMP}"
DEST="${HOME}/Documents/${DEST_NAME}"

echo "المصدر:  $ROOT"
echo "الوجهة: $DEST"

mkdir -p "$DEST"

rsync -a \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.turbo \
  --exclude=.git \
  --exclude='*.log' \
  --exclude=prisma/dev.db \
  --exclude=prisma/dev.db-journal \
  --exclude=.DS_Store \
  "$ROOT/" "$DEST/"

NOTE="${DEST}/اقرأني-قبل-رفع-جيتهب.txt"
cat > "$NOTE" << 'EOF'
حي الملتقى — نسخة جاهزة لـ GitHub والنشر
==========================================

ما يحتويه المجلد
----------------
• كامل الكود: واجهة الموقع + API + لوحة الإدارة + Prisma (نفس مستودع Next.js).
• لا يوجد node_modules ولا .next (يُعاد إنشاؤهما بعد npm install و npm run build).
• لا يوجد ملف .env — انسخ .env.example إلى .env وعدّل القيم (لا ترفع .env إلى GitHub).

خطوات على جهازك قبل الرفع
---------------------------
1) cd إلى هذا المجلد
2) git init
3) git add .
4) git commit -m "Initial commit: Al Multaqa site"
5) أنشئ مستودعاً فارغاً على GitHub ثم:
   git remote add origin https://github.com/USER/REPO.git
   git branch -M main
   git push -u origin main

بعد الاستنساخ على أي جهاز أو سيرفر
------------------------------------
  npm install
  cp .env.example .env
  # عدّل .env (DATABASE_URL، ADMIN_PASSWORD، ADMIN_SECRET)
  npx prisma generate
  npx prisma db push
  npm run dev          # تطوير
  npm run build && npm run start   # إنتاج محلي

تصدير حزمة تشغيل للسيرفر (اختياري)
------------------------------------
من نسخة المشروع الأصلية (ليس ضرورياً هنا):
  npm run export:standalone

تاريخ النسخ: تم إنشاء هذا الملف تلقائياً عند التصدير.
EOF

echo ""
echo "تم إنشاء: $DEST"
du -sh "$DEST"
echo ""
echo "التالي: cd \"$DEST\" && git init && git add . && git status"
