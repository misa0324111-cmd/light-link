# LIGHT LINK v1.4 Supabase CRUD

## 追加内容

- Supabase schema整理
- seed SQL
- repository層
- キャスト登録フォーム
- 予約保存処理
- 予約一覧
- 店舗管理リンク整理

## 重要

Supabase未設定でもサンプルデータで動きます。
Supabaseを使う場合は `.env.local` に以下を設定してください。

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Supabase設定手順

1. Supabaseプロジェクト作成
2. SQL Editorで `supabase/schema.sql` を実行
3. SQL Editorで `supabase/seed.sql` を実行
4. `.env.local` を設定
5. `npm run dev` を再起動

## 次工程 v1.5

- ログイン後の権限分岐
- 店舗ごとのデータ分離
- 編集/削除機能
