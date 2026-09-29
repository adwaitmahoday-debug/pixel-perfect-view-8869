import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Sprout } from "lucide-react";
import { FarmBackground } from "@/components/FarmBackground";

const nav = [
  { to: "/", label: "Home" },
  { to: "/predict", label: "Predict" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/market", label: "Market" },
  { to: "/model", label: "Model" },
] as const;

const plants = ["🌾", "🌱", "🌽", "🍅"];

function CropStrip() {
  const row = Array.from({ length: 30 }, (_, i) => plants[i % 4]);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-20 overflow-hidden" aria-hidden>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-soil/80" />
      <div className="absolute bottom-10 animate-[fs-tractor_20s_linear_infinite] text-4xl">🚜</div>
      <div className="absolute bottom-3 flex w-[200%] animate-[fs-crops_14s_linear_infinite]">
        {[...row, ...row].map((p, i) => (
          <span
            key={i}
            className="inline-block w-[calc(100%/60)] origin-bottom text-center text-3xl animate-[fs-sway_3s_ease-in-out_infinite]"
            style={{ animationDelay: `${(i % 7) * 0.3}s`, animationDuration: `${2.5 + (i % 5) * 0.4}s` }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <FarmBackground />
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-leaf" />
            <span className="font-display text-lg font-semibold">
              Farm<span className="text-wheat">Sense</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 overflow-x-auto text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full border border-transparent px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "!border-primary/60 bg-primary/25 !text-foreground" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/predict"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:block"
          >
            Get Prediction →
          </Link>
        </div>
      </header>
      <main className="relative z-20 mx-auto max-w-6xl px-4 pb-56 pt-10">{children}</main>
      <CropStrip />
    </div>
  );
}

export function Glass({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`glass-panel rounded-2xl p-5 ${className}`}>{children}</div>;
}

export function PageTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl font-semibold md:text-4xl">{title}</h1>
      <p className="mt-2 text-muted-foreground">{sub}</p>
    </div>
  );
}

export const pageHead = (title: string, description: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});
