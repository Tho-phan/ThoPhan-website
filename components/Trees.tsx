// Decorative SVG trees. Palm for Ho Chi Minh City, maple for Pittsburgh (swapped by CSS on data-tenant).

// Fronds fan upward and droop at the tip; the left half mirrors the right.
const fronds: [number, number][] = [[-84, 1.0], [-58, 1.15], [-32, 1.1], [-6, 1.0], [18, 0.85]];

// silhouette: one dark shape, for use over photographs where flat colour would clash.
export default function Trees({ className = "", silhouette = false }: { className?: string; silhouette?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={silhouette ? ({ "--leaf-a": "#0f0b08", "--leaf-b": "#0f0b08", "--trunk": "#0f0b08", "--nut": "#0f0b08" } as React.CSSProperties) : undefined}
    >
      <svg className="tree-vn sway h-full w-full" viewBox="0 0 300 520" fill="none">
        <path d="M150 520 C140 420 170 340 150 250" stroke="var(--trunk, #8a6642)" strokeWidth="14" strokeLinecap="round" />
        {[false, true].flatMap((mirror) =>
          fronds.map(([a, k], i) => (
            <path
              key={`${mirror}${a}`}
              d="M150 250 C 190 188, 262 186, 304 250 C 316 272, 318 298, 308 326 C 292 268, 226 236, 150 250 Z"
              fill={(i + (mirror ? 1 : 0)) % 2 ? "var(--leaf-b)" : "var(--leaf-a)"}
              transform={`${mirror ? "translate(300 0) scale(-1 1) " : ""}rotate(${a} 150 250) scale(${k})`}
            />
          )),
        )}
        <circle cx="142" cy="262" r="8" fill="var(--nut, #5b3f27)" /><circle cx="160" cy="263" r="8" fill="var(--nut, #5b3f27)" />
      </svg>
      <svg className="tree-us sway h-full w-full" viewBox="0 0 300 520" fill="none">
        <path d="M150 520 L150 300 M150 380 L100 320 M150 350 L205 290" stroke="var(--trunk, #8a6642)" strokeWidth="13" strokeLinecap="round" />
        {[
          [150, 190, 62], [100, 215, 50], [200, 212, 52], [150, 245, 54], [112, 160, 42], [188, 158, 44],
          [150, 130, 38], [78, 250, 34], [224, 248, 34], [118, 270, 32], [184, 272, 32], [150, 100, 26],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? "var(--leaf-b)" : "var(--leaf-a)"} />
        ))}
      </svg>
    </div>
  );
}
