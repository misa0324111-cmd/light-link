# LIGHT LINK v1.6 Supabase Auth本接続・店舗別データ分離

## 追加内容

- Supabase Auth Magic Link対応
- デモ認証との自動切替
- `getCurrentSession`
- `signInWithEmail`
- `signOut`
- 店舗ID取得 `getCurrentStoreId`
- 店舗別予約一覧
- store_members schema
- profiles.store_id
- 店舗別RLS設計

## 使い方

Supabase未設定:
- デモログインが動きます。

Supabase設定済み:
- `/login` でメールを送信
- Magic Linkでログイン
- `profiles.role` と `profiles.store_id` で権限判定

## 次工程 v1.7

- キャスト編集/削除
- 予約ステータス変更
- 店舗ごとのキャスト一覧完全分離
