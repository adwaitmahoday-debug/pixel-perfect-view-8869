import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Sprout, BarChart3, TrendingUp, Brain, Home, Zap } from "lucide-react";
import { FarmBackground } from "@/components/FarmBackground";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/predict", label: "Predict", icon: Zap },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/market", label: "Market", icon: TrendingUp },
  { to: "/model", label: "Model", icon: Brain },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <FarmBackground />

      {/* ── Premium Navbar ── */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-background/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/30">
              <Sprout className="h-4 w-4 text-leaf" />
            </div>
            <span className="font-display text-[1.1rem] font-bold tracking-tight">
              Farm<span className="text-gradient-hero">Sense</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-0.5 text-sm md:flex">
            {nav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-muted-foreground transition-all duration-200 hover:border-white/10 hover:bg-white/5 hover:text-foreground"
                activeProps={{
                  className:
                    "!border-primary/40 !bg-primary/15 !text-foreground shadow-[0_0_12px_oklch(0.62_0.135_146/20%)]",
                }}
                activeOptions={{ exact: true }}
              >
                <Icon className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            to="/predict"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_oklch(0.62_0.135_146/35%)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_oklch(0.62_0.135_146/55%)] sm:flex"
          >
            <Zap className="h-3.5 w-3.5" />
            Get Prediction
          </Link>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="relative z-20 mx-auto max-w-6xl px-4 pb-24 pt-10">{children}</main>

      {/* ── Minimal footer bar ── */}
      <footer className="relative z-20 border-t border-white/[0.06] bg-background/40 backdrop-blur-xl py-5 px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sprout className="h-3.5 w-3.5 text-leaf" />
            <span>FarmSense — Intelligent Farm-to-Market Decision Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <span>1,635 farm records</span>
            <span className="opacity-40">·</span>
            <span>6 districts · MP &amp; Maharashtra</span>
            <span className="opacity-40">·</span>
            <span className="text-leaf">Model R² = 0.71</span>
          </div>
        </div>
      </footer>
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

