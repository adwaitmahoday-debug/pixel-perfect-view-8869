import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Glass, PageTitle, SiteShell, pageHead } from "@/components/SiteShell";
import { ImportanceBars } from "@/components/ImportanceBars";
import { cropBase, districtAvg, predict, type PredictInput } from "@/lib/farm-data";

export const Route = createFileRoute("/predict")({
  head: () => pageHead("Predict Crop Price — FarmSense", "Get a predicted market price, revenue and crop stress for your farm."),
  component: Predict,
});

const field = "w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40";

function L({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Predict() {
  const [f, setF] = useState<PredictInput>({
    crop: "Wheat", district: "Bhopal", season: "Rabi", area: 5, ph: 6.5, moisture: 40,
    rainfall: 120, temp: 26, fertilizer: 200, pesticide: 10, yieldT: 12, water: 300000,
  });
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<ReturnType<typeof predict> | null>(null);
  const set = <K extends keyof PredictInput>(k: K, v: PredictInput[K]) => setF((s) => ({ ...s, [k]: v }));
  const num = (k: keyof PredictInput) => (
    <input type="number" className={field} value={f[k] as number} onChange={(e) => set(k, Number(e.target.value) as never)} />
  );
  const sel = (k: keyof PredictInput, opts: string[]) => (
    <select className={field} value={f[k] as string} onChange={(e) => set(k, e.target.value as never)}>
      {opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
  const run = () => {
    setLoading(true);
    setRes(null);
    setTimeout(() => { setRes(predict(f)); setLoading(false); }, 1800);
  };
  const stressColor = res?.stress === "LOW" ? "text-leaf" : res?.stress === "MOD" ? "text-wheat" : "text-destructive";

  return (
    <SiteShell>
      <PageTitle title="🔮 Predict Market Price" sub="Fill in your farm details to get an AI price estimate." />
      <div className="grid gap-4 md:grid-cols-3">
        <Glass className="space-y-3">
          <h3 className="font-display font-semibold">🌾 Crop & Location</h3>
          <L label="Crop Type">{sel("crop", Object.keys(cropBase))}</L>
          <L label="District">{sel("district", ["Bhopal", "Indore", "Dewas", "Ujjain", "Sehore", "Nashik"])}</L>
          <L label="Season">{sel("season", ["Kharif", "Rabi", "Summer"])}</L>
          <L label="Farm Area (acres)">{num("area")}</L>
        </Glass>
        <Glass className="space-y-3">
          <h3 className="font-display font-semibold">🧪 Soil & Weather</h3>
          <L label={`Soil pH: ${f.ph.toFixed(1)}`}>
            <input type="range" min={4} max={9} step={0.1} value={f.ph} onChange={(e) => set("ph", Number(e.target.value))} className="w-full accent-primary" />
          </L>
          <L label={`Soil Moisture: ${f.moisture}%`}>
            <input type="range" min={5} max={90} value={f.moisture} onChange={(e) => set("moisture", Number(e.target.value))} className="w-full accent-primary" />
          </L>
          <L label="Rainfall (mm)">{num("rainfall")}</L>
          <L label="Temperature (°C)">{num("temp")}</L>
        </Glass>
        <Glass className="space-y-3">
          <h3 className="font-display font-semibold">🚜 Farm Inputs & Output</h3>
          <L label="Fertilizer (kg)">{num("fertilizer")}</L>
          <L label="Pesticide (litres)">{num("pesticide")}</L>
          <L label="Expected Yield (tonnes)">{num("yieldT")}</L>
          <L label="Water Usage (litres)">{num("water")}</L>
        </Glass>
      </div>
      <button onClick={run} disabled={loading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70">
        {loading && <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-[fs-spin_0.8s_linear_infinite]" />}
        {loading ? "Analysing your farm…" : "🔮 Predict Market Price"}
      </button>

      {res && (
        <div className="mt-8 space-y-4 animate-rise">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <Glass><div className="text-sm text-muted-foreground">💰 Predicted Price</div><div className="font-display text-3xl font-semibold text-wheat">₹{res.price.toFixed(2)}<span className="text-base">/kg</span></div></Glass>
            <Glass><div className="text-sm text-muted-foreground">📦 Total Revenue</div><div className="font-display text-2xl font-semibold">₹{Math.round(res.revenue).toLocaleString("en-IN")}</div></Glass>
            <Glass><div className="text-sm text-muted-foreground">🏅 vs District Avg (₹{districtAvg[f.district]})</div><div className={`font-display text-2xl font-semibold ${res.vsAvg >= 0 ? "text-leaf" : "text-destructive"}`}>{res.vsAvg >= 0 ? "+" : ""}{res.vsAvg.toFixed(1)}%</div></Glass>
            <Glass><div className="text-sm text-muted-foreground">🌡️ Crop Stress</div><div className={`font-display text-2xl font-semibold ${stressColor}`}>{res.stress}</div></Glass>
            <Glass><div className="text-sm text-muted-foreground">💧 Water Efficiency</div><div className="font-display text-2xl font-semibold">{Math.round(res.waterEff).toLocaleString("en-IN")} <span className="text-sm">L/t</span></div></Glass>
            <Glass><div className="text-sm text-muted-foreground">🎯 Confidence</div><div className="font-display text-2xl font-semibold">{res.confidence}%</div></Glass>
          </div>
          <div className="rounded-2xl border border-primary/50 bg-primary/20 p-5 backdrop-blur-xl">
            <h3 className="mb-2 font-display font-semibold">💡 Recommendation</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">{res.advice.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
          <Glass><h3 className="mb-4 font-display font-semibold">Feature Importance</h3><ImportanceBars /></Glass>
        </div>
      )}
    </SiteShell>
  );
}
