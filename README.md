# LIGHT LINK v3.0 Public Release

AIマッチングサービスとして公開するための統合版です。

## 主な機能

- AIマッチング診断
- AIチャット相談
- 相性スコア
- 好み学習
- お気に入り
- 閲覧履歴
- キャスト管理
- 予約管理
- 店舗管理
- 運営管理
- Supabase Auth
- 店舗別データ分離
- OpenAI連携
- LINE連携
- Stripe課金
- メール通知
- リアルタイム通知
- KPI分析
- SEO / OGP / sitemap
- 本番公開チェック

## ローカル起動

```bash
npm install
npm run dev
```

ブラウザで開きます。

```txt
http://localhost:3000
```

## 主要URL

```txt
/
 /matching
 /chat
 /search
 /preferences
 /line
 /login
 /store-admin
 /admin
 /admin/production
```

## 本番公開

`docs/PRODUCTION_CHECKLIST.md` を確認してください。

## 環境変数

`.env.example` をコピーして `.env.local` を作成してください。

```bash
cp .env.example .env.local
```

## QA

```bash
npm run qa
```


## 運用マニュアル

- `docs/USER_GUIDE.md`
- `docs/STORE_ADMIN_GUIDE.md`
- `docs/ADMIN_GUIDE.md`
- `docs/DEPLOYMENT_GUIDE.md`
- `docs/PRODUCTION_CHECKLIST.md`

## 最終確認

```txt
/final-check
/release
/api/release/health
```
