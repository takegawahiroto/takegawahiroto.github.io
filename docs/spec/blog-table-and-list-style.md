# ブログ記事の表・箇条書き表示修正

## 背景・目的

ブログ記事（`flow-matching.md`等）で Markdown の表（テーブル）が正しくHTMLに変換されず描画されない。
また、箇条書き（`ul`/`ol`）のスタイリングが不十分で見づらい。

原因:
1. **表**: `remark-gfm` が未導入のため、GFM テーブル構文がパースされない
2. **箇条書き**: CSSベースリセット (`* { margin: 0; padding: 0; }`) によりリストスタイルが消えており、`.prose-custom` に `list-style-type` の指定がない

## 実装方針

### 1. remark-gfm の導入
- `remark-gfm` をインストール
- `src/lib/markdown.ts` のパイプラインに `.use(remarkGfm)` を追加（`remarkParse` の直後）

### 2. テーブルスタイルの追加（`src/app/globals.css`）
`.prose-custom` に以下のテーブルスタイルを追加:
- `table`: ボーダー、幅、マージン
- `th` / `td`: パディング、ボーダー、テキスト色
- サイトのダークテーマに合わせた配色

### 3. 箇条書きスタイルの改善（`src/app/globals.css`）
`.prose-custom ul` / `.prose-custom ol` に以下を追加:
- `list-style-type: disc`（ul）/ `list-style-type: decimal`（ol）
- 適切な余白・行間の調整

## テスト計画

- **正常系**: `remark-gfm` 追加後、テーブル構文を含むMarkdownが `<table>` タグに正しく変換されることを確認（`markdownToHtml` のユニットテスト）
- **正常系**: 箇条書き構文が `<ul><li>` に正しく変換されることを確認
- **視覚確認**: `npm run dev` でブログ記事ページを開き、表・箇条書きが正しく描画されることを確認

## 影響範囲

- `src/lib/markdown.ts`: パイプラインに `remarkGfm` を追加するのみ。既存の数式レンダリング等に影響なし
- `src/app/globals.css`: `.prose-custom` にスタイルを追加するのみ。他コンポーネントに影響なし
- 既存記事の表示に悪影響はない（テーブルを使っていない記事は変化なし）
