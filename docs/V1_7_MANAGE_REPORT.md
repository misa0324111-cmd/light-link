# LIGHT LINK v1.7 編集・削除・予約ステータス管理

## 追加内容

- キャスト編集
- キャスト非表示
- 予約ステータス変更
- `updateTalent`
- `deleteTalent`
- `updateReservationStatus`
- RLS update policy追加

## 確認方法

1. 店舗管理者でログイン
2. `/store-admin/talents`
3. キャストの「編集」を押す
4. 保存できることを確認
5. `/store-admin/reservations`
6. ステータスを「確定」「完了」などへ変更

## 次工程 v1.8

- OpenAI API接続
- GPTによる条件抽出
- AI会話履歴保存
