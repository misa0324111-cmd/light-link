# LIGHT LINK v5.0 本番運営版

## 追加内容

- `/admin/operations`
- 本番運営ダッシュボード
- `/api/operations/check`
- 本番接続チェック
- Google Analytics埋め込み
- Search Console用環境変数
- 公開チェックリスト

## 確認方法

1. `/admin/operations` を開く
2. 必須設定スコアを確認
3. `/api/operations/check` を確認
4. `.env.local` に本番環境変数を設定

## 公開に必要なもの

- Vercel本番URL
- Supabase URL / Anon Key
- OpenAI API Key
- LINE Channel Access Token
- Stripe Secret Key / Webhook Secret
- Stripe Price ID
- 独自ドメイン
- Google Search Console
- Google Analytics

## 本番公開順

1. GitHubへpush
2. Vercelへ接続
3. Supabase SQL適用
4. 環境変数設定
5. Stripe Webhook設定
6. LINE Webhook設定
7. 独自ドメイン設定
8. `/admin/operations` で確認
9. 公開
