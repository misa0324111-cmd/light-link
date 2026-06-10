# LIGHT LINK v3.0 リリースノート

## v3.0 の位置づけ

AIマッチングサービスとして公開可能な統合版です。

## 搭載済み

- AIマッチング診断
- ユーザー好み学習
- お気に入り/閲覧履歴
- 店舗管理CRUD
- 予約管理
- 通知センター
- メール/LINE通知
- Realtime通知
- Stripe課金
- OpenAI連携
- Supabase連携
- SEO対策
- KPI分析
- 本番公開チェック

## 本番投入前に必要な作業

- Supabaseプロジェクト作成
- schema.sql適用
- seed.sql適用
- Vercel環境変数設定
- OpenAI API Key設定
- LINE Messaging API設定
- Stripe商品/価格作成
- Resend API設定
- 独自ドメイン設定

## 推奨公開順

1. Vercelへデプロイ
2. Supabase接続
3. Auth確認
4. OpenAI接続
5. LINE接続
6. Stripe接続
7. 通知確認
8. SEO確認
9. 本番公開
