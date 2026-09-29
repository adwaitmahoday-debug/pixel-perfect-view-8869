import { createFileRoute } from "@tanstack/react-router";
import {
  Sprout,
  LineChart,
  CloudSun,
  Coins,
  ArrowRight,
  ChevronDown,
  Truck,
  Brain,
  Wheat,
} from "lucide-react";
import { FarmBackground } from "@/components/FarmBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FarmSense — The Intelligent Farm-to-Market Decision Engine" },
      {
        name: "description",
        content:
          "FarmSense turns farm, weather and market data into smarter agricultural decisions, from the field to the mandi.",
      },
      {
        property: "og:title",
        content: "FarmSense — The Intelligent Farm-to-Market Decision Engine",
      },
      {
        property: "og:description",
        content:
          "Farm intelligence, market forecasts, weather risk and net profit — in one AgriTech command center.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const kpis = [
  { icon: Sprout, label: "Farm Intelligence", value: "Plot-level crop health & sowing windows" },
  { icon: LineChart, label: "Market Forecast", value: "14-day price direction across mandis" },
  { icon: CloudSun, label: "Weather Risk", value: "Rainfall, heat and harvest-window alerts" },
  { icon: Coins, label: "Net Profit", value: "Yield minus input, transport and mandi cost" },
];

const journey = [
  { icon: Sprout, title: "Farm", copy: "Soil, irrigation and plot history become a living field record." },
  { icon: Brain, title: "Intelligence", copy: "Models read crop, weather and price signals together." },
  { icon: Wheat, title: "Harvest", copy: "Timing guidance that protects yield and grain quality." },
  { icon: Truck, title: "Market", copy: "Where to sell, when to move, and what it actually nets." },
];

function Index() {
  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <FarmBackground />

      <header className="sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-leaf" />
            <span className="font-display text-lg font-semibold tracking-tight">FarmSense</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {["Dashboard", "Markets", "Insights", "AI Advisor"].map((item) => (
              <a key={item} href="#journey" className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <a
            href="#journey"
            className="glass-panel rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/60"
          >
            Get Started
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-center px-6 pb-20">
          <p className="animate-rise font-mono text-xs uppercase tracking-[0.32em] text-accent">
            Farm → Data → Intelligence → Better Decisions
          </p>
          <h1
            className="animate-rise mt-6 max-w-3xl text-5xl leading-[1.05] font-semibold md:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            <span className="text-gradient-hero">FarmSense</span>
            <span className="mt-3 block text-2xl font-normal text-foreground/90 md:text-3xl">
              The Intelligent Farm-to-Market Decision Engine
            </span>
          </h1>
          <p
            className="animate-rise mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            Turn farm, weather and market data into smarter agricultural decisions — from the field
            to the mandi gate.
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Analyze My Farm <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#journey"
              className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary/60"
            >
              Explore Markets
            </a>
          </div>

          <div
            className="animate-rise mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            style={{ animationDelay: "380ms" }}
          >
            {kpis.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-panel rounded-2xl p-5">
                <Icon className="h-5 w-5 text-accent" />
                <p className="mt-4 font-display text-sm font-semibold">{label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground" />
          </div>
        </section>

        <section id="journey" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            One continuous line from the plot to the price board.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {journey.map(({ icon: Icon, title, copy }, i) => (
              <article key={title} className="glass-panel rounded-3xl p-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <Icon className="mt-5 h-6 w-6 text-leaf" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="glass-panel grid gap-8 rounded-3xl p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Decisions, not dashboards full of noise.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                FarmSense reads your plot conditions, the weather ahead and live mandi movement,
                then answers the only questions that matter: harvest now or wait, sell here or
                there, and what it leaves in your hand.
              </p>
            </div>
            <div className="space-y-3">
              {[
                ["Recommended action", "Hold 6 days — price trend +4.2%"],
                ["Nearest best mandi", "Bettiah · ₹2,340/qtl · 38 km"],
                ["Projected net", "₹1.86L after transport & levies"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3"
                >
                  <span className="text-xs text-muted-foreground">{k}</span>
                  <span className="font-mono text-xs text-accent">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-muted-foreground">
          FarmSense — real agriculture, market analytics and intelligence in one place.
        </div>
      </footer>
    </div>
  );
}
