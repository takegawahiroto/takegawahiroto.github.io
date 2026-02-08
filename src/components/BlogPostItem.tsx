"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/config";
import { CATEGORY_COLORS } from "@/lib/config";

export default function BlogPostItem({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);
  const catStyle = CATEGORY_COLORS[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="no-underline">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-[14px] cursor-pointer transition-all duration-300 grid gap-6 items-start"
        style={{
          padding: "28px",
          gridTemplateColumns: "auto 1fr auto",
          background: hovered ? "rgba(255,255,255,0.02)" : "transparent",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
        }}
      >
        {/* Category dot */}
        <div
          className="mt-1.5 w-2 h-2 rounded-full shrink-0 transition-all duration-300"
          style={{
            background: catStyle.color,
            boxShadow: hovered ? `0 0 12px ${catStyle.color}40` : "none",
          }}
        />

        <div>
          <h3
            className="mb-2 transition-colors duration-300"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              fontWeight: 500,
              color: hovered ? "#fafafa" : "#a1a1aa",
              lineHeight: 1.4,
            }}
          >
            {post.title}
          </h3>
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--color-text-dim)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {post.excerpt}
          </p>
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-text-dim)",
                  background: "rgba(255,255,255,0.025)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right shrink-0 mt-0.5">
          <div
            className="mb-1"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-text-ghost)",
            }}
          >
            {post.date}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#27272a",
            }}
          >
            {post.readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
