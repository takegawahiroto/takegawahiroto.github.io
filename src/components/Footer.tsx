export default function Footer() {
  return (
    <footer
      className="max-w-[1200px] mx-auto px-10 py-9 flex justify-between items-center"
      style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "#27272a",
          fontWeight: 300,
        }}
      >
        © 2026 — Built with Next.js & TypeScript
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 14,
          color: "#27272a",
          fontStyle: "italic",
        }}
      >
        &ldquo;The unreasonable effectiveness of mathematics&rdquo;
      </span>
    </footer>
  );
}
