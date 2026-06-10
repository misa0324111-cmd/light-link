# LIGHT LINK v2.9 リアルタイム通知・管理画面バッジ

## 追加内容

- Supabase Realtime購読
- 通知バッジ
- 新着通知トースト
- 店舗管理画面への通知バッジ
- 運営管理画面への通知バッジ
- Realtime設定SQLメモ

## 確認方法

1. 店舗管理者でログイン
2. `/store-admin` を開く
3. 通知バッジが表示される
4. 予約通知が作成されるとトースト表示される

## Supabase本番設定

必要に応じてSQL Editorで以下を実行します。

```sql
alter publication supabase_realtime add table public.notifications;
```

## 次工程 v3.0

- 最終公開版
- UI polish
- README統合
- 本番デプロイ手順一本化
