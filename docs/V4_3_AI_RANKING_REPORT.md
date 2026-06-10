# LIGHT LINK v4.3 AIランキング強化

## 追加内容

- AIランキングスコア
- 人気ランキング
- 急上昇ランキング
- AIおすすめランキング
- 初めて向けランキング
- `/api/ranking`
- `/admin/ranking`
- `ranking_snapshots` テーブル

## スコア要素

- AI相性
- 閲覧数
- お気に入り数
- 予約数
- LINEクリック数

## 確認方法

1. `/ranking` を開く
2. 人気/急上昇/AIおすすめ/初めて向けを切り替える
3. `/api/ranking?type=popular` を確認
4. `/admin/ranking` で管理側確認

## 次工程 v5.0

- 本番運営版
- Vercel/Supabase/OpenAI/Stripe/LINE本接続
- 独自ドメイン公開
