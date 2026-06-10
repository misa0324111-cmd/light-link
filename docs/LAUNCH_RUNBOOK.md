# LIGHT LINK 本番公開ランブック

## 当日作業

### 1. デプロイ

- mainブランチへpush
- Vercel Production Deploy
- Build成功確認

### 2. DB

- `supabase/schema.sql` 適用
- `supabase/seed.sql` 適用

### 3. 外部連携

- OpenAI
- LINE
- Stripe
- Resend
- Google Analytics
- Search Console

### 4. 動作確認

```txt
/
/concierge
/matching
/ranking
/store/signup
/store/public/s1
/admin/operations
/api/operations/check
/sitemap.xml
/robots.txt
```

### 5. 問題発生時

- Vercel Logs確認
- Supabase Logs確認
- Stripe Webhook Logs確認
- LINE Developers Webhook確認
