export default function MathBackground() {
  const formulas = [
    "∇ₓL(θ)", "∫₀^∞", "∂f/∂θ", "𝔼[X]", "Σᵢ₌₁ⁿ", "det(A)",
    "lim_{n→∞}", "⟨φ|ψ⟩", "∀ε>0", "P(A|B)", "∮", "⊗",
    "ker(f)", "dim(V)", "Hom(A,B)", "∇²f",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {formulas.map((f, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14 + (i % 3) * 6,
            color: `rgba(167,139,250,${0.03 + (i % 4) * 0.008})`,
            left: `${(i * 17.3) % 95}%`,
            top: `${(i * 13.7 + 5) % 92}%`,
            transform: `rotate(${-15 + (i % 7) * 5}deg)`,
          }}
        >
          {f}
        </span>
      ))}
    </div>
  );
}
