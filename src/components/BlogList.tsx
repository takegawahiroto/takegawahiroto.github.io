"use client";

import { useState } from "react";
import type { Post, Category } from "@/lib/config";
import BlogPostItem from "@/components/BlogPostItem";
import CategoryFilter from "@/components/CategoryFilter";

export default function BlogList({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const filtered =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-8">
        <CategoryFilter active={filter} onChange={setFilter} />
      </div>
      <div className="flex flex-col gap-1">
        {filtered.map((post) => (
          <BlogPostItem key={post.slug} post={post} />
        ))}
        {filtered.length === 0 && (
          <p
            className="text-center py-20"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "var(--color-text-dim)",
            }}
          >
            記事がまだありません。
          </p>
        )}
      </div>
    </>
  );
}
