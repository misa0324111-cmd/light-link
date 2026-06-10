# LIGHT LINK v2.3 画像アップロード・キャスト写真管理

## 追加内容

- `/store-admin/media`
- `/store-admin/media/[talentId]`
- キャスト別画像管理
- 画像URL登録
- Supabase Storage signed upload URL作成
- `talent_media` テーブル
- `talent-media` Storage bucket作成SQL

## 確認方法

1. 店舗管理者でログイン
2. `/store-admin/media` を開く
3. キャストを選択
4. 画像URLを追加
5. StorageアップロードURL作成を押す

## 注意

ブラウザからの実ファイルPUTアップロードUIは次工程で強化します。
v2.3ではStorage URL発行と画像管理の土台を追加しています。

## 次工程 v2.4

- 実ファイル選択アップロード
- 画像プレビュー
- メイン画像設定
