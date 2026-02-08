# Portfolio & Tech Blog

数学・AI・ソフトウェアに関する個人ポートフォリオ＆技術ブログ。

## Tech Stack

- **Framework**: Next.js 15 (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Blog**: Markdown + gray-matter
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Blog Posts

`src/content/posts/` にMarkdownファイルを配置：

```markdown
---
title: "記事タイトル"
date: "2026-01-01"
tags: ["Tag1", "Tag2"]
excerpt: "記事の概要"
category: "Math"  # "Math" | "AI" | "Software"
---

本文...
```

## Deploy to GitHub Pages

1. GitHubでリポジトリ作成
2. Settings → Pages → Source: **GitHub Actions**
3. リポジトリ名をサブパスに使う場合: `next.config.ts` の `basePath` を設定
4. `git push origin main` → 自動デプロイ

## Customization

| 項目 | ファイル |
|------|---------|
| サイト情報 | `src/lib/config.ts` → `SITE_CONFIG` |
| プロジェクト | `src/lib/config.ts` → `PROJECTS` |
| 興味分野 | `src/lib/config.ts` → `INTERESTS` |
| SNSリンク | `src/app/contact/page.tsx` → `LINKS` |
| カラーテーマ | `src/app/globals.css` → `@theme` |
