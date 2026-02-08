# 設計概要

## 1. プロジェクト概要

個人ポートフォリオ兼テックブログサイト。数学 (Math)・AI・ソフトウェア (Software) の3領域を軸に、プロジェクト紹介とブログ記事を発信する。

### 技術スタック

| レイヤー | 技術 | バージョン |
|---|---|---|
| フレームワーク | Next.js (App Router) | 16.1.6 |
| 言語 | TypeScript (strict mode) | 5.x |
| UI ライブラリ | React | 19.2.3 |
| スタイリング | Tailwind CSS v4 (`@theme` ディレクティブ) | 4.x |
| コンテンツ解析 | gray-matter (frontmatter) + reading-time | - |
| MDX (導入済み・未活用) | @mdx-js/loader, @mdx-js/react, @next/mdx, next-mdx-remote | - |
| Lint | ESLint 9 (flat config) + eslint-config-next | - |
| ホスティング | GitHub Pages (静的エクスポート) | - |
| CI/CD | GitHub Actions | Node.js 20 |

### ビルド・デプロイ方式

- `next.config.ts` で `output: "export"` を指定し、`npm run build` で `./out` ディレクトリに静的HTMLを生成
- `images.unoptimized: true` により画像最適化を無効化（静的エクスポート制約）
- `basePath` はコメントアウト済み（GitHub Pages サブディレクトリ対応の準備）

---

## 2. ディレクトリ構成

```
src/
├── app/                     # Next.js App Router ページ
│   ├── layout.tsx           # ルートレイアウト（フォント・メタデータ・共通UI）
│   ├── page.tsx             # ホームページ
│   ├── globals.css          # グローバルスタイル・テーマ定義
│   ├── blog/
│   │   ├── page.tsx         # ブログ一覧
│   │   └── [slug]/
│   │       └── page.tsx     # ブログ記事詳細（動的ルート）
│   ├── projects/
│   │   └── page.tsx         # プロジェクト一覧
│   └── contact/
│       └── page.tsx         # コンタクト
├── components/              # 再利用可能なUIコンポーネント
│   ├── Nav.tsx              # ナビゲーションバー
│   ├── Footer.tsx           # フッター
│   ├── MathBackground.tsx   # 装飾的な数式背景
│   ├── BlogList.tsx         # ブログ一覧＋フィルタ管理
│   ├── BlogPostItem.tsx     # ブログ記事カード
│   ├── ProjectCard.tsx      # プロジェクトカード
│   ├── CategoryFilter.tsx   # カテゴリフィルタUI
│   └── SectionHeader.tsx    # セクション見出し
├── lib/                     # ユーティリティ・設定
│   ├── config.ts            # サイト設定・プロジェクトデータ・型定義
│   └── posts.ts             # ブログ記事の読み込み・処理
└── content/
    └── posts/               # Markdownブログ記事ファイル
```

---

## 3. アーキテクチャ詳細

### 3.1 ページ構成とレンダリング戦略

すべてのページは**ビルド時に静的生成**される（Static Site Generation）。

```
layout.tsx
├── MathBackground (装飾レイヤー, z-index低)
├── Nav (固定ヘッダー, z-50)
├── main (z-10)
│   └── {children}  ← 各ページコンポーネント
└── Footer
```

| ページ | パス | レンダリング | 概要 |
|---|---|---|---|
| ホーム | `/` | Server Component | Hero・About・Featured Projects・Recent Posts の4セクション |
| ブログ一覧 | `/blog` | Server → Client | サーバーで全記事取得、`BlogList`(Client)でフィルタリング |
| ブログ記事 | `/blog/[slug]` | Server Component | `generateStaticParams` で全slugを事前生成 |
| プロジェクト | `/projects` | Server Component | `config.ts` のPROJECTSを表示 |
| コンタクト | `/contact` | Client Component | ホバー状態管理のためクライアントコンポーネント |

### 3.2 データフロー

```
                    ┌─────────────────────┐
                    │  src/lib/config.ts   │
                    │  ・SITE_CONFIG       │
                    │  ・PROJECTS[]        │
                    │  ・INTERESTS[]       │
                    │  ・CATEGORY_COLORS   │
                    │  ・型定義            │
                    └────────┬────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        layout.tsx     page.tsx      projects/page.tsx
        (メタデータ)   (プロジェクト   (全プロジェクト
                        一覧・興味)     一覧)

   ┌───────────────────┐
   │ src/content/posts/ │  ← Markdownファイル群
   │   *.md             │
   └────────┬──────────┘
            ▼
   ┌───────────────────┐
   │ src/lib/posts.ts   │  gray-matter + reading-time
   │  getAllPosts()      │  → Post[] (日付降順ソート)
   │  getPostBySlug()   │  → Post | undefined
   │  getPostSlugs()    │  → string[]
   └────────┬──────────┘
            │
     ┌──────┼──────┐
     ▼      ▼      ▼
  page.tsx  blog/   blog/[slug]/
  (最新3件)  page    page
```

**ポイント:**
- 静的データ（プロジェクト・サイト設定）は `config.ts` に集約されており、DBやAPIは不使用
- ブログ記事はファイルシステムベース。`src/content/posts/` にMarkdownを配置するだけで記事が追加される
- ファイル名がそのままslugになる（例: `hello-world.md` → `/blog/hello-world`）

### 3.3 ブログ記事のライフサイクル

```
1. src/content/posts/my-article.md を作成
2. frontmatter に title, date, tags, excerpt, category を記載
3. ビルド時に posts.ts が全 .md を読み込み
4. gray-matter で frontmatter を解析、reading-time で読了時間算出
5. blog/[slug]/page.tsx で正規表現ベースのMarkdown→HTML変換
6. .prose-custom クラスでスタイル適用
```

**Markdown変換の現状:**
- `blog/[slug]/page.tsx` 内で正規表現による簡易変換を実施
- 対応: h1〜h3、インラインコード、太字、斜体、段落
- **未対応**: リスト、テーブル、画像、コードブロック（言語指定付き）、リンク
- MDXパッケージ（`@mdx-js/*`, `next-mdx-remote`）は `package.json` に含まれるが未使用
- `dangerouslySetInnerHTML` で直接HTMLをレンダリング

### 3.4 コンポーネント設計

**Server / Client の分離方針:**

Server Components（デフォルト）:
- ページコンポーネント（`page.tsx`）は原則Server Component
- データ取得（`getAllPosts()`, `config.ts` import）はサーバー側で実行

Client Components（`"use client"` 明示）:
- ユーザーインタラクションが必要なコンポーネントのみ
- `Nav`: `usePathname()` によるアクティブリンク判定
- `BlogList`: カテゴリフィルタのstate管理
- `BlogPostItem`, `ProjectCard`: ホバーエフェクトのstate管理
- `CategoryFilter`: フィルタ選択のコールバック
- `ContactPage`: ホバー状態管理

**コンポーネント依存関係:**

```
BlogPage (Server)
  └── BlogList (Client)
        ├── CategoryFilter (Client)
        └── BlogPostItem (Client)

HomePage (Server)
  ├── ProjectCard (Client)
  ├── BlogPostItem (Client)
  └── SectionHeader (Server)

ProjectsPage (Server)
  ├── ProjectCard (Client)
  └── SectionHeader (Server)
```

---

## 4. デザインシステム

### 4.1 テーマ定義

`globals.css` の `@theme` ディレクティブで CSS カスタムプロパティとして定義。Tailwind CSS v4 のユーティリティクラスから参照可能。

**カラーパレット:**

| 用途 | 変数名 | 値 | 説明 |
|---|---|---|---|
| 背景 | `--color-bg` | `#08080c` | ほぼ黒のダーク背景 |
| 微細背景 | `--color-bg-subtle` | `rgba(255,255,255,0.015)` | カード等の背景 |
| ボーダー | `--color-border` | `rgba(255,255,255,0.04)` | 境界線 |
| テキスト（主） | `--color-text-primary` | `#fafafa` | 見出し・重要テキスト |
| テキスト（副） | `--color-text-secondary` | `#a1a1aa` | 本文テキスト |
| テキスト（淡） | `--color-text-muted` | `#71717a` | 補助テキスト |
| テキスト（極淡） | `--color-text-dim` | `#52525b` | メタ情報 |
| テキスト（最淡） | `--color-text-ghost` | `#3f3f46` | 日時等 |
| アクセント | `--color-accent` | `#a78bfa` | パープル系アクセント |
| Math カテゴリ | `--color-math` | `#f0abfc` | ピンク |
| AI カテゴリ | `--color-ai` | `#67e8f9` | シアン |
| Software カテゴリ | `--color-software` | `#fde68a` | イエロー |

**フォント:**

| 用途 | 変数名 | フォント | 使用箇所 |
|---|---|---|---|
| 見出し・装飾 | `--font-display` | Cormorant Garamond | ページタイトル、セクション見出し、数式シンボル |
| 本文・UI | `--font-body` | Outfit | ナビゲーション、段落、ボタン |
| コード・メタ | `--font-mono` | JetBrains Mono | インラインコード、日時、タグ |

### 4.2 アニメーション

| クラス名 | 効果 |
|---|---|
| `.animate-fade-in-up` | 下から上へフェードイン (0.6s) |
| `.animate-fade-in` | フェードイン (0.8s) |
| `.animate-float` | 上下に浮遊する無限ループ (6s) |
| `.stagger-1` 〜 `.stagger-5` | アニメーション遅延 (0.1s 〜 0.5s) |

### 4.3 レイアウト定数

- 最大コンテンツ幅: `max-w-[1200px]`（ブログ記事は `max-w-[800px]`）
- 水平パディング: `px-10`
- セクション間余白: `py-[100px]`（ホーム）/ `pt-32 pb-24`（サブページ）
- グリッド: プロジェクト・Featured は2カラム (`grid-cols-2 gap-5`)

---

## 5. CI/CD パイプライン

`.github/workflows/deploy.yml` により、main ブランチへのpushで自動デプロイ。

```
push to main
  │
  ▼
Build Job (ubuntu-latest, Node.js 20)
  ├── actions/checkout@v4
  ├── npm ci
  ├── npm run build
  └── upload-pages-artifact (./out)
  │
  ▼
Deploy Job
  └── actions/deploy-pages@v4 → GitHub Pages
```

- `concurrency.cancel-in-progress: false` — デプロイ中の新規ジョブはキューに入る
- `workflow_dispatch` — 手動トリガーも可能

---

## 6. 型定義

`src/lib/config.ts` に集約:

```typescript
type Category = "Math" | "AI" | "Software"

interface Post {
  slug: string
  title: string
  date: string        // "YYYY-MM-DD" 形式
  tags: string[]
  excerpt: string
  readTime: string    // "N min" 形式
  category: Category
  content: string     // Markdown本文
}

interface Project {
  name: string
  description: string
  tech: string[]
  icon: string        // 数学記号（∂, ∀, λ, ∞ 等）
  link?: string
  status?: "Active" | "Beta" | "Released"
}

interface Interest {
  label: string
  icon: string
}
```

---

## 7. 既知の制約・改善候補

| 項目 | 現状 | 課題 |
|---|---|---|
| Markdown変換 | 正規表現による簡易変換 | リスト・テーブル・画像・コードブロック未対応。MDXパッケージは導入済みだが未統合 |
| プレースホルダー | `SITE_CONFIG` の name/url、`contact/page.tsx` のSNSリンクがダミー値 | パーソナライズが必要 |
| レスポンシブ対応 | `grid-cols-2` がモバイルで未調整 | ブレイクポイントによる切り替えが不足 |
| SEO | 基本的な `<Metadata>` のみ | OGP画像、構造化データ、サイトマップ未対応 |
| フォント読み込み | Google Fonts を `<link>` タグで直接読み込み | `next/font` を使用したほうがパフォーマンス最適化される |
| `dangerouslySetInnerHTML` | ブログ記事レンダリングに使用 | XSSリスク。MDXパイプラインへの移行が望ましい |
