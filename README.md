# حي الملتقى — موقع Next.js

موقع تسويقي مع **تسجيل اهتمام**، **لوحة إدارة** (طلبات، فلل، أراضي)، وقاعدة بيانات عبر **Prisma**.

## المتطلبات

- Node.js **20+**
- npm

## التشغيل محلياً

```bash
npm install
cp .env.example .env
# عدّل .env: DATABASE_URL، ADMIN_PASSWORD، ADMIN_SECRET
npx prisma generate
npx prisma db push
npm run dev
```

افتح [http://127.0.0.1:3000](http://127.0.0.1:3000) — لوحة الإدارة: `/admin/login` (كلمة المرور من `ADMIN_PASSWORD`).

## البنية

| جزء | المسار |
|-----|--------|
| واجهة الزائر | `src/app/`, `src/components/`, `src/sections/` |
| API الطلبات | `src/app/api/leads/` |
| إدارة + Server Actions | `src/app/admin/` |
| نماذج البيانات | `prisma/schema.prisma` |

## الإنتاج

```bash
npm run build
npm run start
```

لحزمة **standalone** (VPS / عمان داتا بارك): راجع `scripts/package-standalone.sh` والأمر `npm run export:standalone`.

## تصدير نسخة لـ GitHub في مجلد Documents

```bash
npm run export:github-docs
```

يُنشئ مجلداً تحت `~/Documents/` باسم `حي-الملتقى-موقع-github-ready-التاريخ` مع ملف `اقرأني-قبل-رفع-جيتهب.txt`.

## أمان GitHub

- **لا** ترفع ملف `.env`.
- ارفع `.env.example` فقط كقالب.
- في الإنتاج استخدم `ADMIN_SECRET` قوياً (16+ حرفاً).

## الترخيص

خاص بالمشروع — اضبط الترخيص حسب رغبتك.
