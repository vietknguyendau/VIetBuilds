"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TrueNorth compass. The needle turns to follow the visitor's pointer (or finger),
 * and settles back to north when they leave. Purely decorative: hidden from assistive tech.
 */
export function Compass({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [angle, setAngle] = useState(0);
  const last = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let frame = 0;
    const turnTo = (target: number) => {
      // take the shortest way round so the needle never spins the long way
      let delta = target - (last.current % 360);
      delta = ((delta + 540) % 360) - 180;
      last.current += delta;
      setAngle(last.current);
    };
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < 8) return;
        turnTo((Math.atan2(dy, dx) * 180) / Math.PI + 90);
        if (idle.current) clearTimeout(idle.current);
        idle.current = setTimeout(() => turnTo(0), 2600);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      if (idle.current) clearTimeout(idle.current);
    };
  }, []);

  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <svg ref={ref} viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeOpacity="0.18" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeOpacity="0.1" />
      {ticks.map((t) => (
        <line
          key={t}
          x1="100"
          y1={t % 90 === 0 ? 8 : t % 30 === 0 ? 10 : 12}
          x2="100"
          y2="17"
          stroke="currentColor"
          strokeOpacity={t % 90 === 0 ? 0.7 : t % 30 === 0 ? 0.4 : 0.18}
          strokeWidth={t % 90 === 0 ? 2 : 1}
          transform={`rotate(${t} 100 100)`}
        />
      ))}
      {[
        ["N", 100, 38],
        ["E", 164, 105],
        ["S", 100, 170],
        ["W", 36, 105],
      ].map(([l, x, y]) => (
        <text
          key={l as string}
          x={x as number}
          y={y as number}
          textAnchor="middle"
          className="font-display"
          fontSize="15"
          fontWeight="600"
          fill="currentColor"
          fillOpacity={l === "N" ? 0.95 : 0.45}
        >
          {l}
        </text>
      ))}
      <g
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: "100px 100px",
          transition: "transform 0.9s cubic-bezier(0.25, 1.4, 0.4, 1)",
        }}
      >
        <path d="M100 46 L109 100 L100 108 L91 100 Z" fill="var(--color-amber-400)" />
        <path d="M100 154 L109 100 L100 92 L91 100 Z" fill="currentColor" fillOpacity="0.35" />
      </g>
      <circle cx="100" cy="100" r="5" fill="var(--color-spruce-900)" stroke="currentColor" strokeOpacity="0.6" />
    </svg>
  );
}
