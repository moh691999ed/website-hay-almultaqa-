# حي الملتقى — موقع Next.js

<<<<<<< HEAD
**حزمة إصدار معتمدة (محمد الصوافي):** نسخة نظيفة جاهزة للرفع — نفس السلوك الذي يعمل على **http://127.0.0.1:3007** عند `npm run dev:3007`.

موقع تسويقي مع **تسجيل اهتمام**، **لوحة إدارة** (طلبات بحالات، فلل/تايبات، أراضي)، وقاعدة **SQLite** محلية عبر **Prisma** — **Next.js 15.5.x**.

راجع أيضاً **`HANDOFF.md`** و **`بطاقة-الإصدار-محمد-الصوافي.txt`**.
=======
موقع تسويقي مع **تسجيل اهتمام**، **لوحة إدارة** (طلبات، فلل، أراضي)، وقاعدة بيانات عبر **Prisma**.
>>>>>>> c70be41ce36f9f98afbf8905cf0ea6474ecda794

## المتطلبات

- Node.js **20+**
<<<<<<< HEAD
=======
- npm
>>>>>>> c70be41ce36f9f98afbf8905cf0ea6474ecda794

## التشغيل محلياً

```bash
npm install
cp .env.example .env
<<<<<<< HEAD
npx prisma generate
npx prisma db push
npm run dev:3007
```

افتح [http://127.0.0.1:3007](http://127.0.0.1:3007) — لوحة الإدارة: `/admin/login`.
=======
# عدّل .env: DATABASE_URL، ADMIN_PASSWORD، ADMIN_SECRET
npx prisma generate
npx prisma db push
npm run dev
```

افتح [http://127.0.0.1:3000](http://127.0.0.1:3000) — لوحة الإدارة: `/admin/login` (كلمة المرور من `ADMIN_PASSWORD`).
>>>>>>> c70be41ce36f9f98afbf8905cf0ea6474ecda794

## البنية

| جزء | المسار |
|-----|--------|
<<<<<<< HEAD
| إدارة + Server Actions | `src/app/admin/` |
| نماذج البيانات | `prisma/schema.prisma` |

## أمان GitHub

- لا ترفع `.env` — ارفع `.env.example` فقط.

## الترخيص

خاص بالمشروع.
=======
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
>>>>>>> c70be41ce36f9f98afbf8905cf0ea6474ecda794
