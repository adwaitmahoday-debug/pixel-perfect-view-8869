import { useEffect, useState } from "react";
import farmAerial from "@/assets/farm-aerial.jpg";
import cropRows from "@/assets/crop-rows.jpg";
import farmMarket from "@/assets/farm-market.jpg";

/**
 * Layered cinematic background.
 * L1 farmland environment (scroll cross-fade farm -> crop -> market)
 * L2 sunlight + atmospheric haze
 * L3 subtle agri-intelligence data flow
 * L4 dark green readability gradient
 */
export function FarmBackground() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Cross-fade weights across the three stages
  const farm = Math.max(0, 1 - progress / 0.45);
  const crop = Math.max(0, 1 - Math.abs(progress - 0.5) / 0.35);
  const market = Math.max(0, (progress - 0.6) / 0.4);

  const layers = [
    { src: farmAerial, opacity: farm, speed: 220, anim: "fs-drift 12s linear infinite" },
    { src: cropRows, opacity: crop, speed: 320, anim: "fs-breeze 8s linear infinite" },
    { src: farmMarket, opacity: market, speed: 420, anim: "fs-drift 15s linear infinite" },
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Layer 1 — farmland environment (outer = scroll parallax, inner = endless pan) */}
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ opacity: l.opacity, transition: "opacity 600ms linear" }}
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translate3d(0, ${progress * l.speed}px, 0)` }}
          >
            <div
              className="absolute -inset-[12%] bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${l.src})`, animation: l.anim }}
            />
          </div>
        </div>
      ))}

      {/* Layer 2 — volumetric sunlight + haze */}
      <div
        className="absolute -inset-[20%]"
        style={{
          background:
            "radial-gradient(45% 40% at 22% 12%, oklch(0.9 0.11 88 / 55%) 0%, transparent 70%)",
          animation: "fs-sun 34s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.9 0.04 95 / 22%) 0%, transparent 45%, oklch(0.85 0.03 120 / 14%) 100%)",
          animation: "fs-haze 48s ease-in-out infinite",
        }}
      />

      {/* Layer 3 — agri-intelligence data flow */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[18, 42, 68, 86].map((y, i) => (
          <path
            key={y}
            d={`M -5 ${y} C 30 ${y - 6}, 65 ${y + 7}, 105 ${y - 3}`}
            fill="none"
            stroke="var(--leaf)"
            strokeWidth={0.15}
            strokeDasharray="1 4"
            vectorEffect="non-scaling-stroke"
            style={{ animation: `fs-dash ${26 + i * 7}s linear infinite`, opacity: 0.5 }}
          />
        ))}
      </svg>
      {[12, 34, 57, 73, 90].map((top, i) => (
        <span
          key={top}
          className="absolute h-[3px] w-[3px] rounded-full"
          style={{
            top: `${top}%`,
            background: "var(--wheat)",
            boxShadow: "0 0 10px 2px oklch(0.82 0.12 85 / 45%)",
            animation: `fs-data-flow ${22 + i * 6}s linear infinite`,
            animationDelay: `${i * 4}s`,
          }}
        />
      ))}

      {/* Layer 4 — readability gradient */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-readability)" }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 42%, oklch(0.15 0.03 150 / 35%) 0%, transparent 75%)",
        }}
      />
    </div>
  );
}
