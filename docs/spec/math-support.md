# 数式レンダリング対応

## 背景・目的

数学カテゴリの記事（Fisher情報行列、位相的データ解析など）で数式がプレーンテキストとして表示されており、可読性が低い。LaTeX記法（`$...$` / `$$...$$`）で数式を記述し、KaTeX でレンダリングできるようにする。

## 現状

- Markdown → HTML 変換は `blog/[slug]/page.tsx` 内の正規表現ベースの簡易変換
- MDX関連パッケージ（`@mdx-js/loader`, `next-mdx-remote` 等）は導入済みだが未使用
- 数式は `**F(θ) = E[...]**` のようにボールド文字で代用されている

## 実装方針

### 1. パッケージ追加

- `unified` — テキスト処理パイプライン
- `remark-parse` — Markdown パーサー
- `remark-math` — `$...$` / `$$...$$` 数式構文のパース
- `remark-rehype` — remark AST → rehype AST 変換
- `rehype-katex` — 数式を KaTeX HTML にレンダリング
- `rehype-stringify` — HTML 文字列に変換
- `rehype-raw` — Markdown 内の生 HTML を保持

### 2. Markdown処理ユーティリティ作成（`src/lib/markdown.ts`）

unified パイプラインでMarkdownをHTMLに変換する関数を作成。正規表現ベースの変換を置き換える。

```
Markdown → remark-parse → remark-math → remark-rehype → rehype-raw → rehype-katex → rehype-stringify → HTML
```

### 3. ブログ記事ページの修正（`src/app/blog/[slug]/page.tsx`）

- 正規表現ベースの `htmlContent` 変換を削除
- 新しい `markdownToHtml()` 関数を使用

### 4. KaTeX CSS の読み込み（`src/app/layout.tsx`）

- KaTeX の CSS を `<link>` タグでCDNから読み込む

### 5. 数式スタイルの追加（`src/app/globals.css`）

- ダークテーマに合わせた KaTeX の色調整
- ディスプレイ数式のマージン・スクロール対応

### 6. 既存記事の数式をLaTeX記法に更新

`fisher-information-deep-learning.md` の数式をLaTeX記法に書き換え。

## 変更対象ファイル

| ファイル | 変更内容 |
|---|---|
| `package.json` | 依存パッケージ追加 |
| `src/lib/markdown.ts` | **新規作成** — Markdown→HTML変換ユーティリティ |
| `src/app/blog/[slug]/page.tsx` | markdown.ts の関数を使用するよう変更 |
| `src/app/layout.tsx` | KaTeX CSS の CDN リンク追加 |
| `src/app/globals.css` | KaTeX 用スタイル追加 |
| `src/content/posts/fisher-information-deep-learning.md` | 数式をLaTeX記法に更新 |

## テスト計画

- `npm run build` が成功すること（静的エクスポートが正常に動作）
- 数式を含む記事が正しくHTMLにレンダリングされること
- インライン数式 `$...$` とディスプレイ数式 `$$...$$` の両方が動作すること

## 影響範囲

- ブログ記事の表示部分のみ。他のページ（ホーム、プロジェクト、コンタクト）には影響なし
- 既存のMarkdown記事で `$` を通常文字として使用している箇所がある場合はエスケープが必要（現状の記事には該当なし）
