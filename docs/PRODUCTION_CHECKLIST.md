# LIGHT LINK 本番公開チェックリスト

## 1. Vercel

- GitHubリポジトリ連携
- Framework: Next.js
- Build: `npm run build`
- Install: `npm install`

## 2. Supabase

- `supabase/schema.sql` をSQL Editorで実行
- `supabase/seed.sql` をSQL Editorで実行
- Auth Magic Link有効化
- Site URLをVercel本番URLに設定

## 3. OpenAI

- `OPENAI_API_KEY` を設定
- `OPENAI_MODEL` を設定

## 4. LINE

- `LINE_CHANNEL_ACCESS_TOKEN` を設定
- `NEXT_PUBLIC_LINE_ADD_FRIEND_URL` を設定
- Webhook URL: `/api/line/webhook`

## 5. Stripe

- 商品/価格を作成
- `NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID`
- `NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- Webhook URL: `/api/billing/webhook`

## 6. 最終確認

- `/`
- `/chat`
- `/search`
- `/store-admin`
- `/billing`
- `/line`
- `/admin/production`
