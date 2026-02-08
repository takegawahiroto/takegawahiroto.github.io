export type Category = "Math" | "AI" | "Software";

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  category: Category;
  content: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  icon: string;
  link?: string;
  status?: "Active" | "Beta" | "Released";
}

export interface Interest {
  label: string;
  icon: string;
}

export const SITE_CONFIG = {
  name: "Your Name",
  title: "Researcher & Engineer",
  description:
    "数学の美しさと、AIの可能性と、ソフトウェアの実践をひとつの場所に。理論と実装の交差点を探求しています。",
  url: "https://yourusername.github.io",
} as const;

export const CATEGORY_COLORS: Record<
  Category,
  { color: string; bg: string; border: string }
> = {
  Math: {
    color: "#f0abfc",
    bg: "rgba(240,171,252,0.08)",
    border: "rgba(240,171,252,0.2)",
  },
  AI: {
    color: "#67e8f9",
    bg: "rgba(103,232,249,0.08)",
    border: "rgba(103,232,249,0.2)",
  },
  Software: {
    color: "#fde68a",
    bg: "rgba(253,230,138,0.08)",
    border: "rgba(253,230,138,0.2)",
  },
};

export const PROJECTS: Project[] = [
  {
    name: "Neural ODE Playground",
    description:
      "微分方程式ソルバーとニューラルネットを統合した実験環境。位相空間上の軌道を可視化。",
    tech: ["Python", "JAX", "Diffrax"],
    icon: "∂",
    status: "Active",
  },
  {
    name: "Proof Assistant CLI",
    description:
      "自然言語から形式証明へのブリッジ。Lean 4バックエンドによる対話的証明支援ツール。",
    tech: ["Rust", "Lean 4", "CLI"],
    icon: "∀",
    status: "Beta",
  },
  {
    name: "LLM Evaluation Framework",
    description:
      "大規模言語モデルの多軸評価パイプライン。推論・事実性・安全性を定量化。",
    tech: ["Python", "TypeScript", "FastAPI"],
    icon: "λ",
    status: "Active",
  },
  {
    name: "Obsidian Knowledge Graph",
    description:
      "Zettelkasten + ナレッジグラフ可視化。数学ノート間の関係をインタラクティブに探索。",
    tech: ["TypeScript", "D3.js", "Obsidian API"],
    icon: "∞",
    status: "Released",
  },
];

export const INTERESTS: Interest[] = [
  { label: "Information Geometry", icon: "◇" },
  { label: "Reinforcement Learning", icon: "◈" },
  { label: "Type Theory", icon: "◆" },
  { label: "Functional Programming", icon: "◇" },
  { label: "Topology", icon: "◈" },
  { label: "Compiler Design", icon: "◆" },
];
