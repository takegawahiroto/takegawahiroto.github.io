# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 (App Router) で構築された個人ポートフォリオ兼テックブログ。数学・AI・ソフトウェアの3カテゴリを扱う。Tailwind CSS v4 によるダークテーマデザインで、GitHub Pages に静的エクスポート (`output: "export"`) でデプロイされる。UIは日本語。

## Commands

- `npm run dev` — 開発サーバー起動
- `npm run build` — 本番ビルド（`./out` に静的ファイル生成）
- `npm run lint` — ESLint実行

## Architecture

### ルーティング (App Router)

- `src/app/page.tsx` — ホーム（Hero・About・Featured Projects・Recent Posts）
- `src/app/blog/page.tsx` — ブログ一覧（カテゴリフィルタ付き）
- `src/app/blog/[slug]/page.tsx` — ブログ記事詳細（`generateStaticParams` で静的生成）
- `src/app/projects/page.tsx` — プロジェクト一覧
- `src/app/contact/page.tsx` — コンタクトページ

### データフロー

- **サイト設定・プロジェクト・カテゴリ定義**: `src/lib/config.ts` に集約。`SITE_CONFIG`, `PROJECTS[]`, `INTERESTS[]`, `CATEGORY_COLORS` を管理
- **ブログ記事**: `src/content/posts/*.md` にMarkdownファイルを配置。`src/lib/posts.ts` が `gray-matter` でfrontmatter解析、`reading-time` で読了時間算出
- **Markdown変換**: 現在は正規表現ベースの簡易変換（`blog/[slug]/page.tsx` 内）。MDXパッケージは導入済みだが未活用

### ブログ記事フォーマット

```markdown
---
title: "記事タイトル"
date: "2026-01-01"
tags: ["タグ1", "タグ2"]
excerpt: "記事の要約"
category: "Math" | "AI" | "Software"
---
```

### スタイリング

- Tailwind CSS v4 の `@theme` ディレクティブで色・フォント・アニメーションを `src/app/globals.css` に定義
- フォント: Cormorant Garamond（見出し）、Outfit（本文）、JetBrains Mono（コード）
- カテゴリ色: Math=ピンク、AI=シアン、Software=イエロー
- ブログ記事スタイル: `.prose-custom` クラス

### コンベンション

- パスエイリアス: `@/*` → `src/*`
- `"use client"` は対話的UIコンポーネントのみに使用（Nav, BlogList, ProjectCard, CategoryFilter, BlogPostItem, ContactPage）
- Category型は `"Math" | "AI" | "Software"` の3値リテラル

### デプロイ

`.github/workflows/deploy.yml` で main ブランチへのpush時に自動デプロイ。Node.js 20 + `npm ci` + `npm run build` → GitHub Pages。

## 開発フロー（厳守）

コード変更を伴うすべてのタスクで、以下のステップを**順番通りに**実行すること。
ステップの省略・順序の入れ替えは禁止。

### Step 1: ブランチ作成（最初に必ず行う）

コードの調査・実装を始める**前に**、まずブランチを作成してチェックアウトする。

```bash
git checkout -b <type>/<feature-name>
# 例: feat/add-emotion-hint, refactor/ruff-lint-fix, fix/audio-callback-crash
```

### Step 2: 仕様書を作成し、ユーザーの確認を得る

`docs/spec/<対象機能名>.md` に以下を記載する:

- **背景・目的**: なぜこの変更が必要か
- **実装方針**: 変更対象のファイル、主要な変更内容
- **テスト計画**: どのようなテストケースを書くか（正常系・異常系）
- **影響範囲**: 既存機能への影響

作成したら**ユーザーに確認依頼**を行い、承認を得るまで次のステップに進まない。

### Step 3: テストを先に実装する（TDD）

仕様書が承認されたら、**実装よりも先に**テストコードを書く。

- テストファイル: `tests/test_<対象機能名>.py`
- この時点ではテストは失敗してよい（実装がまだないため）

### Step 4: 実装

テストが通るようにコードを実装する。

- `uv run ruff check .` でlintエラーが0であること
- `uv run ruff format --check .` でフォーマット問題が0であること
- `uv run pytest tests/` で全テストが通ること

テストが全て通るまで修正を繰り返す。

### Step 5: コミット＆PR作成

全テスト通過を確認してから:

1. 変更をコミットする
2. リモートにプッシュする
3. mainブランチに対してPRを作成する

### Step 6: マージ後のクリーンアップ

ユーザーがPRを承認・マージした後:

1. mainブランチに切り替えてpullする
2. 作業ブランチを削除する（ローカル＋リモート）
