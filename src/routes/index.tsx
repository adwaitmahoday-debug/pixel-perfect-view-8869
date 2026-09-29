import { createFileRoute, Link } from "@tanstack/react-router";
import { Glass, SiteShell, pageHead } from "@/components/SiteShell";
import { Zap, BarChart3, Lightbulb, ArrowRight, TrendingUp, Leaf, MapPin, Wheat } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "FarmSense — The Intelligent Farm-to-Market Decision Engine",
      "AI-powered crop price prediction and market insights built on 1,635 real farm records across 6 districts.",
    ),
  component: Home,
});

const stats = [
  { value: "1,635", label: "Farm Records", icon: Leaf, color: "text-leaf" },
  { value: "6", label: "Districts", icon: MapPin, color: "text-wheat" },
  { value: "10", label: "Crop Types", icon: Wheat, color: "text-leaf" },
  { value: "₹28.69", label: "Avg Price/kg", icon: TrendingUp, color: "text-wheat" },
  { value: "71%", label: "Model R²", icon: Zap, color: "text-leaf" },
];

const features = [
  {
    icon: Zap,
    title: "Price Prediction",
    desc: "Enter crop type, soil conditions, weather and farm inputs — get an instant AI-predicted market price with revenue estimate.",
    href: "/predict",
    accent: "text-wheat",
    border: "hover:border-wheat/30",
  },
  {
    icon: BarChart3,
    title: "Data Dashboard",
    desc: "Explore live charts: price by crop, district rankings, seasonal patterns, and data quality insights from 1,635 records.",
    href: "/dashboard",
    accent: "text-leaf",
    border: "hover:border-leaf/30",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    desc: "Personalised sell timing, best market district, soil pH alerts, and water efficiency guidance — all in plain language.",
    href: "/market",
    accent: "text-wheat",
    border: "hover:border-wheat/30",
  },
];

const highlights = [
  { label: "Dewas", value: "₹30.85/kg", sub: "Best district avg", up: true },
  { label: "Potato", value: "₹33.80/kg", sub: "Highest crop price", up: true },
  { label: "Bhopal", value: "₹27.18/kg", sub: "Lowest district avg", up: false },
  { label: "Soybean", value: "₹419 peak", sub: "Max recorded price", up: true },
];

function Home() {
  return (
    <SiteShell>
      {/* ── Hero ── */}
      <section className="animate-rise pb-4 pt-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs tracking-widest text-leaf">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" />
          AI-POWERED · AGRICULTURE · DECISION ENGINE
        </div>

        {/* Headline */}
        <h1 className="text-gradient-hero mt-7 font-display text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl">
          Farm Smarter.<br />
          <span className="opacity-80">Sell Better.</span>
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Trained on <strong className="text-foreground">1,635 real farm records</strong> across 6 districts of MP &amp; Maharashtra — FarmSense predicts market prices and tells you exactly where and when to sell.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/predict"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-[0_0_24px_oklch(0.62_0.135_146/40%)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_oklch(0.62_0.135_146/60%)]"
          >
            <Zap className="h-4 w-4" />
            Predict Price Now
          </Link>
          <Link
            to="/dashboard"
            className="glass-panel inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            <BarChart3 className="h-4 w-4" />
            View Dashboard
          </Link>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {stats.map(({ value, label, icon: Icon, color }) => (
          <div key={label} className="glass-panel group rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_24px_oklch(0.62_0.135_146/20%)]">
            <Icon className={`mx-auto mb-2 h-4 w-4 ${color} opacity-70`} />
            <div className={`font-display text-2xl font-bold ${color}`}>{value}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </section>

      {/* ── Feature cards ── */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {features.map(({ icon: Icon, title, desc, href, accent, border }) => (
          <Link
            key={title}
            to={href}
            className={`glass-panel group block rounded-2xl border border-transparent p-6 transition-all duration-200 hover:-translate-y-1 ${border}`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${accent}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            <div className={`mt-4 flex items-center gap-1.5 text-sm font-medium ${accent} opacity-0 transition-opacity group-hover:opacity-100`}>
              Explore <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </section>

      {/* ── Live highlights ── */}
      <section className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1 w-6 rounded bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Key Market Insights</span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {highlights.map(({ label, value, sub, up }) => (
            <Glass key={label} className="flex flex-col gap-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
              <div className={`font-display text-xl font-bold ${up ? "text-leaf" : "text-destructive"}`}>{value}</div>
              <div className="text-xs text-muted-foreground">{sub}</div>
            </Glass>
          ))}
        </div>
      </section>

      {/* ── Data quality notice ── */}
      <section className="mt-6">
        <div className="glass-panel rounded-2xl border border-wheat/20 bg-wheat/5 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-wheat/15">
              <Leaf className="h-4 w-4 text-wheat" />
            </div>
            <div>
              <div className="font-semibold text-wheat">About the Dataset</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                1,635 farm records · 14 features · 6 districts (Bhopal, Indore, Dewas, Ujjain, Sehore, Nashik) · 10 crops · 3 seasons.
                Dataset had <strong className="text-foreground">4 quality issues</strong> fixed before training: negative soil pH values, case inconsistencies in crop/season names, and 140 missing values imputed via median/mode.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
