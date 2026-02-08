"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "About", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/[0.04] bg-[#08080c]/75">
      <div className="max-w-[1200px] mx-auto px-10 py-[18px] flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
            style={{
              background:
                "linear-gradient(135deg, #a78bfa 0%, #6366f1 50%, #67e8f9 100%)",
              fontFamily: "var(--font-display)",
              fontSize: 18,
            }}
          >
            ∑
          </div>
          <span
            className="text-[15px] font-medium tracking-wide"
            style={{
              color: "#e4e4e7",
              fontFamily: "var(--font-body)",
            }}
          >
            Portfolio
          </span>
        </Link>

        <div className="flex gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="no-underline px-4 py-[7px] rounded-full transition-all duration-300"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.01em",
                color: isActive(item.href) ? "#c4b5fd" : "#71717a",
                background: isActive(item.href)
                  ? "rgba(167,139,250,0.1)"
                  : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
