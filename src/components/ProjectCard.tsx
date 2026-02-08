"use client";

import { useState } from "react";
import type { Project } from "@/lib/config";

const STATUS_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  Active: { color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)" },
  Beta: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" },
  Released: { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)" },
};

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const statusStyle = STATUS_STYLES[project.status ?? "Active"];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-400"
      style={{
        border: `1px solid ${hovered ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.04)"}`,
        background: hovered
          ? "linear-gradient(135deg, rgba(167,139,250,0.04) 0%, rgba(103,232,249,0.02) 100%)"
          : "rgba(255,255,255,0.015)",
      }}
    >
      {/* Background symbol */}
      <div
        className="absolute -top-2.5 right-2.5 pointer-events-none transition-all duration-400"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 120,
          fontWeight: 300,
          color: hovered ? "rgba(167,139,250,0.06)" : "rgba(255,255,255,0.02)",
          lineHeight: 1,
        }}
      >
        {project.icon}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              color: "var(--color-accent)",
              lineHeight: 1,
            }}
          >
            {project.icon}
          </div>
          {project.status && (
            <span
              className="text-[10px] px-2 py-0.5 rounded"
              style={{
                fontFamily: "var(--font-mono)",
                color: statusStyle.color,
                background: statusStyle.bg,
                border: `1px solid ${statusStyle.border}`,
              }}
            >
              {project.status}
            </span>
          )}
        </div>

        <h3
          className="mb-2.5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            fontWeight: 500,
            color: "#e4e4e7",
          }}
        >
          {project.name}
        </h3>

        <p
          className="mb-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-md"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-text-dim)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
