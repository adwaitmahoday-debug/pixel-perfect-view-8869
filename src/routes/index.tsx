import { createFileRoute, Link } from "@tanstack/react-router";
import { Glass, SiteShell, pageHead } from "@/components/SiteShell";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "FarmSense — The Intelligent Farm-to-Market Decision Engine",
      "AI-powered crop price prediction and market insights built on 1,635 real farm records across 6 districts.",
    ),
  component: Home,
});

const stats = [
  ["1,635", "Records"], ["6", "Districts"], ["10", "Crops"], ["₹28.69", "Avg Price"], ["3", "Seasons"],
];
const features = [
  ["🔮", "Price Prediction", "Enter crop, soil, weather and inputs to get a predicted market price and revenue."],
  ["📊", "Data Dashboard", "Explore prices by crop, district and season with interactive charts."],
  ["💡", "Smart Recommendations", "Personalised advice on when and where to sell for the best return."],
];

function Home() {
  return (
    <SiteShell>
      <section className="animate-rise py-10 text-center">
        <span className="glass-panel inline-block rounded-full px-4 py-1.5 font-mono text-xs tracking-widest text-wheat">
          🏆 AI-POWERED · AGRICULTURE · DECISION ENGINE
        </span>
        <h1 className="text-gradient-hero mt-6 font-display text-5xl font-semibold md:text-7xl">
          Farm Smarter. Sell Better.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Trained on 1,635 real farm records across 6 districts of Madhya Pradesh & Maharashtra —
          FarmSense predicts market prices and tells you where and when to sell.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/predict" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
            🔮 Predict Price Now
          </Link>
          <Link to="/dashboard" className="glass-panel rounded-full px-6 py-3 font-semibold transition-transform hover:-translate-y-0.5">
            📊 View Dashboard
          </Link>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {stats.map(([v, l]) => (
          <Glass key={l} className="text-center">
            <div className="font-display text-2xl font-semibold text-wheat">{v}</div>
            <div className="text-sm text-muted-foreground">{l}</div>
          </Glass>
        ))}
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {features.map(([i, t, d]) => (
          <Glass key={t} className="transition-transform hover:-translate-y-1">
            <div className="text-3xl">{i}</div>
            <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </Glass>
        ))}
      </section>
    </SiteShell>
  );
}
