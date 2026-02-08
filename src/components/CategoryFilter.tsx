"use client";

import type { Category } from "@/lib/config";

type FilterOption = "All" | Category;

interface CategoryFilterProps {
  active: FilterOption;
  onChange: (cat: FilterOption) => void;
}

const OPTIONS: FilterOption[] = ["All", "Math", "AI", "Software"];

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="border-none cursor-pointer rounded-full transition-all duration-300"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 400,
            padding: "6px 16px",
            color: active === cat ? "#fafafa" : "var(--color-text-dim)",
            background:
              active === cat
                ? "rgba(167,139,250,0.15)"
                : "rgba(255,255,255,0.03)",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
