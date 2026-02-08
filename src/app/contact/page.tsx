"use client";

import { useState } from "react";
import type { Metadata } from "next";

const LINKS = [
  { label: "GitHub", icon: "⟐", href: "https://github.com/yourusername" },
  { label: "X / Twitter", icon: "⟡", href: "https://x.com/yourusername" },
  { label: "Email", icon: "⟢", href: "mailto:you@example.com" },
];

export default function ContactPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="pt-32 pb-24 px-10 max-w-[1200px] mx-auto min-h-screen flex items-center">
      <div className="text-center max-w-[520px] mx-auto">
        <div
          className="mb-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            color: "rgba(167,139,250,0.15)",
          }}
        >
          ∗
        </div>

        <span
          className="text-[11px] font-medium tracking-[0.15em] uppercase"
          style={{
            color: "var(--color-accent)",
            fontFamily: "var(--font-body)",
          }}
        >
          Contact
        </span>

        <h1
          className="mt-3 mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 400,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Let&apos;s Connect
        </h1>

        <p
          className="mb-10"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--color-text-dim)",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          数学・AI・ソフトウェアに関する議論、共同研究、
          <br />
          プロジェクトのご相談など、お気軽にどうぞ。
        </p>

        <div className="flex gap-3.5 justify-center">
          {LINKS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-2 no-underline rounded-xl transition-all duration-300"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 400,
                color: hovered === i ? "#e4e4e7" : "var(--color-text-muted)",
                padding: "12px 24px",
                border: `1px solid ${
                  hovered === i
                    ? "rgba(167,139,250,0.25)"
                    : "rgba(255,255,255,0.06)"
                }`,
                background:
                  hovered === i
                    ? "rgba(167,139,250,0.04)"
                    : "rgba(255,255,255,0.015)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
