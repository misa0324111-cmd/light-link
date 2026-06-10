# LIGHT LINK v2.0 Stripe課金・店舗プラン管理

## 追加内容

- 無料 / スタンダード / プレミアム
- 店舗プラン画面 `/billing`
- Stripe Checkout API
- Stripe webhook受信API
- 課金成功/キャンセル画面
- `billing_subscriptions` テーブル
- 店舗管理画面にプラン管理リンク追加

## 環境変数

```txt
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID=
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=
```

## 確認方法

1. 店舗管理者でログイン
2. `/billing` を開く
3. 無料プランを選ぶ
4. `/billing/success` へ遷移する
5. Stripe設定後はCheckoutへ遷移する

## 注意

Stripeキー未設定時はデモモードで成功画面へ遷移します。

## 次工程 v2.1

- 本番公開チェック
- Vercel設定
- Supabase適用手順
- 環境変数チェック画面
