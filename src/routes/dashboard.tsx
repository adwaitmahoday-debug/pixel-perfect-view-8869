import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Glass, PageTitle, SiteShell, pageHead } from "@/components/SiteShell";
import { cropCount, districtAvg, palette, priceByCrop, priceBySeason } from "@/lib/farm-data";

export const Route = createFileRoute("/dashboard")({
  head: () => pageHead("Farm Data Dashboard — FarmSense", "Prices by crop, district and season across 1,635 farm records, plus a data quality report."),
  component: Dashboard,
});

const kpis = [
  ["🌱", "1,635", "Total Farm Records", "↑ MP & Maharashtra"],
  ["💰", "₹28.69", "Avg Market Price/kg", "Range: ₹6.61 – ₹419"],
  ["⚖️", "5.59 T", "Avg Yield per Farm", "Max: 12.44 tonnes"],
  ["⚠️", "4", "Data Quality Issues", "Fixed before training"],
];
const issues: [string, string][] = [
  ["ERROR", "soil_ph has 3 negative values (impossible)"],
  ["ERROR", "soil_ph has 1 value of 20 (max valid is 14)"],
  ["WARN", "16 records with market_price > ₹100 (max ₹419.04)"],
  ["WARN", "\"Tomato\" vs \"Tomatoes\" inconsistency, \"wheat\" vs \"Wheat\""],
  ["WARN", "\"RABI\" vs \"Rabi\", \"kharif\" vs \"Kharif\" season naming"],
  ["WARN", "Missing values in crop(34), soil_ph(33), rainfall(40), yield(33)"],
  ["OK", "No duplicate rows. farm_id dropped before training."],
];
const tag = { ERROR: "bg-destructive/30 text-destructive-foreground", WARN: "bg-wheat/25 text-wheat", OK: "bg-leaf/25 text-leaf" } as Record<string, string>;
const districts = Object.entries(districtAvg).map(([name, v]) => ({ name, v }));
const tip = { contentStyle: { background: "var(--background)", border: "1px solid var(--border)", borderRadius: 8 } };
const axis = { stroke: "var(--muted-foreground)", fontSize: 12 };

function Dashboard() {
  return (
    <SiteShell>
      <PageTitle title="📊 Data Dashboard" sub="What 1,635 farm records say about crop prices." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map(([i, v, l, s]) => (
          <Glass key={l}>
            <div className="text-2xl">{i}</div>
            <div className="mt-2 font-display text-2xl font-semibold text-wheat">{v}</div>
            <div className="text-sm">{l}</div>
            <div className="text-xs text-muted-foreground">{s}</div>
          </Glass>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Glass>
          <h3 className="mb-3 font-display font-semibold">Average Price by Crop</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={priceByCrop}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" {...axis} /><YAxis {...axis} domain={[20, 36]} />
              <Tooltip {...tip} cursor={{ fill: "transparent" }} />
              <Bar dataKey="v" name="₹/kg" radius={[6, 6, 0, 0]}>{priceByCrop.map((_, i) => <Cell key={i} fill={palette[i]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Glass>
        <Glass>
          <h3 className="mb-3 font-display font-semibold">Avg Price by District</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={districts}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" {...axis} /><YAxis {...axis} domain={[20, 32]} />
              <Tooltip {...tip} cursor={{ fill: "transparent" }} />
              <Bar dataKey="v" name="₹/kg" radius={[6, 6, 0, 0]}>{districts.map((_, i) => <Cell key={i} fill={i < 2 ? "var(--wheat)" : "var(--primary)"} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Glass>
        <Glass>
          <h3 className="mb-3 font-display font-semibold">Price by Season (₹/kg)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={priceBySeason} dataKey="v" nameKey="name" innerRadius={55} outerRadius={90} stroke="none">
                {["var(--leaf)", "var(--wheat)", "oklch(0.7 0.15 50)"].map((c) => <Cell key={c} fill={c} />)}
              </Pie>
              <Tooltip {...tip} /><Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </Glass>
        <Glass>
          <h3 className="mb-3 font-display font-semibold">Crop Count Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={cropCount} dataKey="v" nameKey="name" innerRadius={55} outerRadius={90} stroke="none">
                {cropCount.map((_, i) => <Cell key={i} fill={palette[i]} />)}
              </Pie>
              <Tooltip {...tip} /><Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </Glass>
      </div>
      <Glass className="mt-4">
        <h3 className="mb-3 font-display font-semibold">Data Quality Report</h3>
        <ul className="space-y-2 text-sm">
          {issues.map(([t, m]) => (
            <li key={m} className="flex items-start gap-3">
              <span className={`w-16 shrink-0 rounded px-2 py-0.5 text-center font-mono text-xs ${tag[t]}`}>{t}</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </Glass>
    </SiteShell>
  );
}
