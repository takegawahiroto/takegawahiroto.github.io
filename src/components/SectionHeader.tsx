interface SectionHeaderProps {
  label: string;
  title: string;
  right?: React.ReactNode;
}

export default function SectionHeader({ label, title, right }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-14">
      <div>
        <span
          className="text-[11px] font-medium tracking-[0.15em] uppercase"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-body)" }}
        >
          {label}
        </span>
        <h2
          className="mt-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 40,
            fontWeight: 400,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}
