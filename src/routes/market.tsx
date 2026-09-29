import { createFileRoute } from "@tanstack/react-router";
import { Glass, PageTitle, SiteShell, pageHead } from "@/components/SiteShell";

export const Route = createFileRoute("/market")({
  head: () => pageHead("Market Insights — FarmSense", "Crop price rankings, district comparisons and selling recommendations."),
  component: Market,
});

const crops: [string, number, string, string, string][] = [
  ["Potato", 33.8, "₹8–₹419", "↑", "High"], ["Rice", 30.73, "₹7–₹210", "↑", "Good"],
  ["Soybean", 28.43, "₹7–₹160", "→", "Avg"], ["Maize", 27.48, "₹7–₹150", "→", "Avg"],
  ["Onion", 27.92, "₹7–₹180", "→", "Avg"], ["Tomato", 27.91, "₹7–₹170", "→", "Avg"],
  ["Wheat", 28.2, "₹6.61–₹190", "→", "Stable"], ["Cotton", 26.73, "₹7–₹140", "↓", "Lower"],
];
const districts: [string, number, number, string][] = [
  ["Dewas", 30.85, 291, "⭐ Best"], ["Nashik", 30.19, 271, "⭐ High"], ["Sehore", 28.84, 269, "✅ Good"],
  ["Ujjain", 27.44, 274, "✅ Avg"], ["Indore", 27.39, 282, "✅ Avg"], ["Bhopal", 27.18, 248, "⬇ Lower"],
];
const recs = [
  ["🥔", "Potato — Best ROI Crop", "₹33.80/kg avg", "Highest average price. Invest in cold storage to sell off-season and ensure steady irrigation during tuber formation."],
  ["🍚", "Rice — Reliable Returns", "₹30.73/kg avg", "Performs best in Kharif. Nashik mandis consistently pay above the regional average."],
  ["📍", "Dewas — Best Market", "₹30.85/kg avg", "If transport costs stay under ~₹1.5/kg, moving produce to Dewas beats selling locally."],
  ["⚠️", "Soil pH Alert", "Check before sowing", "Test your soil every season. Apply agricultural lime if pH falls below 5.5."],
];
const trendColor = (t: string) => (t === "↑" ? "text-leaf" : t === "↓" ? "text-destructive" : "text-wheat");

function InlineBar({ v, max }: { v: number; max: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 font-mono">₹{v.toFixed(2)}</span>
      <div className="hidden h-2 w-20 rounded-full bg-muted/40 sm:block">
        <div className="h-full rounded-full bg-primary" style={{ width: `${(v / max) * 100}%` }} />
      </div>
    </div>
  );
}

function Market() {
  return (
    <SiteShell>
      <PageTitle title="📈 Market Insights" sub="Where your crop sells best, and which crops pay most." />
      <div className="grid gap-4 md:grid-cols-2">
        <Glass className="overflow-x-auto">
          <h3 className="mb-3 font-display font-semibold">Crop Price Rankings</h3>
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground"><tr><th className="py-2">Crop</th><th>Avg ₹/kg</th><th>Range</th><th>Trend</th></tr></thead>
            <tbody>
              {crops.map(([c, v, r, t, l]) => (
                <tr key={c} className="border-t border-border/40">
                  <td className="py-2">{c}</td><td><InlineBar v={v} max={33.8} /></td>
                  <td className="text-muted-foreground">{r}</td><td className={trendColor(t)}>{t} {l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Glass>
        <Glass className="overflow-x-auto">
          <h3 className="mb-3 font-display font-semibold">District Price Comparison</h3>
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground"><tr><th className="py-2">District</th><th>Avg ₹/kg</th><th>Records</th><th>Rating</th></tr></thead>
            <tbody>
              {districts.map(([d, v, n, r]) => (
                <tr key={d} className="border-t border-border/40">
                  <td className="py-2">{d}</td><td><InlineBar v={v} max={30.85} /></td><td>{n}</td><td>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 rounded-lg bg-wheat/15 p-3 text-sm text-wheat">💡 Dewas and Nashik offer 13–14% higher prices than Bhopal/Indore.</p>
        </Glass>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {recs.map(([i, t, p, d]) => (
          <div key={t} className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/35 to-secondary/40 p-5 backdrop-blur-xl transition-transform hover:translate-x-2">
            <div className="flex items-center gap-3"><span className="text-3xl">{i}</span><div><h4 className="font-display font-semibold">{t}</h4><div className="text-sm text-wheat">{p}</div></div></div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </SiteShell>
  );
}
