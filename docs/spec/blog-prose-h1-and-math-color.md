# ブログ記事の h1 スタイル追加 & 数式の色調整

## 背景・目的

1. `.prose-custom h1` が未定義のため、Markdown の `#` 見出しがスタイルされない
2. KaTeX 数式の色（`color-text-primary` = #fafafa）が本文（`color-text-secondary` = #a1a1aa）と乖離しており、数式だけ浮いて見える

## 実装方針

### 1. `.prose-custom h1` スタイル追加（`globals.css`）
- 既存の h2 スタイルとの一貫性を保ちつつ、より大きなフォントサイズを設定
- `font-family: var(--font-display)` で見出し用フォントを使用

### 2. KaTeX 数式の色調整（`globals.css`）
- インライン数式（`.katex`）の色を `color-text-secondary` に変更し、本文と統一
- ディスプレイ数式（`.katex-display > .katex`）も同様に調整

## テスト計画

- **正常系**: `markdownToHtml` で `# 見出し` が `<h1>` タグに変換されることを確認
- **視覚確認**: 数式と本文の色が統一されていること、h1 が適切にスタイルされていることを確認

## 影響範囲

- `src/app/globals.css` のみ。`.prose-custom` 内のスタイル追加・変更のため他に影響なし
