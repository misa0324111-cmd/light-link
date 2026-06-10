# LIGHT LINK v1.8 OpenAI API接続・AI会話履歴保存

## 追加内容

- OpenAI API接続
- `OPENAI_API_KEY` がある場合はGPT条件抽出
- APIキー未設定時はルールベースへ自動フォールバック
- GPT解析モード / ルール解析モード表示
- AI会話履歴保存
- `ai_chat_histories` テーブル

## 確認方法

1. `.env.local` に `OPENAI_API_KEY` を設定
2. `npm run dev` を再起動
3. `/chat` で相談文を入力
4. 「GPT解析モード」と表示されることを確認

## 未設定時

`OPENAI_API_KEY` がない場合も、従来通りルール解析で動きます。

## 次工程 v1.9

- LINE連携
- 予約完了後LINE相談導線
- LINE友だち追加計測
