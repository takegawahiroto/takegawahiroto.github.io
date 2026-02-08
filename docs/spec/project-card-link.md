# ProjectCardの外部リンク対応

## 背景・目的

ProjectCardをクリックしてもどこにも遷移せず、プロジェクトの詳細を確認できない。`link` が設定されている場合、カードクリックで外部サイト（GitHubリポジトリ等）に遷移できるようにする。

## 実装方針

### `src/components/ProjectCard.tsx`

- `link` が存在する場合、カード全体を `<a>` タグで囲み外部リンクとして機能させる（`target="_blank"`, `rel="noopener noreferrer"`）
- `link` がない場合は現状と同じ（リンクなしのカード）

### `src/lib/config.ts`

- 既存の `PROJECTS` に `link` を追加（ユーザーが後で実際のURLに差し替え可能）

## 変更対象ファイル

| ファイル | 変更内容 |
|---|---|
| `src/components/ProjectCard.tsx` | `link` がある場合にカードをリンク化 |
| `src/lib/config.ts` | `link` を追加 |
| `package.json` | テスト関連パッケージ追加（vitest, @testing-library/react, @testing-library/jest-dom, jsdom） |
| `vitest.config.ts` | **新規作成** — Vitest設定 |
| `tests/project-card-link.test.tsx` | **新規作成** — テストコード |

## テスト計画

テストフレームワークとして **Vitest** + **@testing-library/react** を導入する。

### テストファイル: `tests/project-card-link.test.tsx`

#### 1. ProjectCardコンポーネントのレンダリングテスト

- **linkありの場合**: `<a>` タグでレンダリングされ、`href` / `target="_blank"` / `rel="noopener noreferrer"` が正しく設定されること
- **linkなしの場合**: `<a>` タグが存在せず、`<div>` のままレンダリングされること

#### 2. PROJECTS設定のlinkアクセシビリティテスト

- `PROJECTS` 配列で `link` が設定されている全URLに対し、HTTP HEADリクエストを送信し、ステータスコードが200系または300系であること（リンク切れがないことを検証）

## 影響範囲

- `/projects` ページとホームのFeatured Projectsのみ。他ページへの影響なし
