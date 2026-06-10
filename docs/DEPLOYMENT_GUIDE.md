# LIGHT LINK デプロイ手順

## 1. GitHubへアップロード

```bash
git init
git add .
git commit -m "LIGHT LINK v3 public release"
git branch -M main
git remote add origin <GitHub Repository URL>
git push -u origin main
```

## 2. Vercel

1. VercelでNew Project
2. GitHubリポジトリを選択
3. Framework Preset: Next.js
4. Build Command: `npm run build`
5. Install Command: `npm install`

## 3. Supabase

1. 新規プロジェクト作成
2. SQL Editorで `supabase/schema.sql`
3. SQL Editorで `supabase/seed.sql`
4. Authentication > URL Configuration
5. Site URLにVercel本番URLを設定

## 4. 環境変数

Vercel Project Settings > Environment Variables に設定します。

```txt
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
LINE_CHANNEL_ACCESS_TOKEN=
NEXT_PUBLIC_LINE_ADD_FRIEND_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID=
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=
RESEND_API_KEY=
NOTIFICATION_EMAIL_FROM=
NOTIFICATION_EMAIL_TO=
```

## 5. 確認URL

```txt
/admin/production
/api/production/check
/sitemap.xml
/robots.txt
```
