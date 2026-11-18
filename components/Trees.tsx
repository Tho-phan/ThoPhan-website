// Decorative SVG trees. Palm for Ho Chi Minh City, maple for Pittsburgh (swapped by CSS on data-tenant).

const fronds = [-195, -155, -115, -75, -35, 5];

export default function Trees({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <svg className="tree-vn sway h-full w-full" viewBox="0 0 300 520" fill="none">
        <path d="M150 520 C140 420 170 340 150 250" stroke="var(--bark)" strokeWidth="14" strokeLinecap="round" />
        {fronds.map((a, i) => (
          <path
            key={a}
            d="M150 250 C 185 195, 255 195, 290 275 C 245 232, 190 232, 150 250 Z"
            fill={i % 2 ? "var(--leaf-b)" : "var(--leaf-a)"}
            transform={`rotate(${a} 150 250)`}
          />
        ))}
        <circle cx="150" cy="256" r="9" fill="var(--sun)" />
      </svg>
      <svg className="tree-us sway h-full w-full" viewBox="0 0 300 520" fill="none">
        <path d="M150 520 L150 300 M150 380 L100 320 M150 350 L205 290" stroke="var(--bark)" strokeWidth="13" strokeLinecap="round" />
        {[
          [150, 200, 85],
          [95, 255, 62],
          [205, 245, 66],
          [150, 275, 55],
          [120, 170, 48],
          [185, 165, 50],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? "var(--leaf-b)" : "var(--leaf-a)"} opacity="0.92" />
        ))}
      </svg>
    </div>
  );
}
