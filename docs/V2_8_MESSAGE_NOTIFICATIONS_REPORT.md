# LIGHT LINK v2.8 メール通知・LINE通知統合

## 追加内容

- メール通知送信 `lib/email.ts`
- Resend API対応
- LINE通知との統合
- 予約通知テンプレート
- 通知ディスパッチャー
- `/admin/message-test`
- 通知テスト画面
- `notification_dispatch_logs` テーブル

## 環境変数

```txt
RESEND_API_KEY=
NOTIFICATION_EMAIL_FROM=
NOTIFICATION_EMAIL_TO=
LINE_CHANNEL_ACCESS_TOKEN=
```

## 確認方法

1. 運営管理者でログイン
2. `/admin/message-test` を開く
3. 通知テストを送る
4. 未設定時はデモモードで成功
5. 設定済みならメール/LINEへ送信

## 次工程 v2.9

- リアルタイム通知
- Supabase Realtime
- 管理画面バッジ
