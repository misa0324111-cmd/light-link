# LIGHT LINK v1.9 LINE連携・予約導線強化

## 追加内容

- LINE相談CTA
- `/line`
- `/line/complete`
- LINE通知API
- LINE webhook受信API
- 予約完了後LINE相談導線
- キャスト詳細LINE相談導線
- LINEクリック簡易計測
- `line_events` テーブル

## 確認方法

1. `/line` を開く
2. LINE相談ボタンが表示される
3. `/talents/t1` からLINE相談へ進める
4. `/reservation/complete` からLINE相談へ進める

## 環境変数

```txt
LINE_CHANNEL_ACCESS_TOKEN=
NEXT_PUBLIC_LINE_ADD_FRIEND_URL=
```

## 次工程 v2.0

- Stripe課金
- 店舗プラン
- 本番公開準備
