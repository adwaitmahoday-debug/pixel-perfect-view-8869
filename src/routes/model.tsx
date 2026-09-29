import { createFileRoute } from "@tanstack/react-router";
import { Glass, PageTitle, SiteShell, pageHead } from "@/components/SiteShell";
import { ImportanceBars } from "@/components/ImportanceBars";

export const Route = createFileRoute("/model")({
  head: () => pageHead("ML Model & Pipeline — FarmSense", "How FarmSense cleans data, trains four models and explains its price predictions."),
  component: Model,
});

const steps = [
  ["Data Ingestion", "1,635 XLSX records, auto-detect encoding"],
  ["Data Profiling", "Missing values, outliers, cardinality"],
  ["Data Cleaning", "Standardise crop/season names, drop farm_id, clip pH, impute"],
  ["Feature Engineering", "Temp stress index, water efficiency, soil health score, OHE"],
  ["Train/Test Split", "80/20 stratified, no leakage — fit only on train"],
  ["Model Training", "4 models, 5-fold CV, metric: RMSE + R²"],
  ["Explainability", "Feature importance — crop type dominates"],
];
const models: [string, number, number, string, boolean][] = [
  ["Linear Regression", 14.39, 0.48, "BASELINE", false], ["Random Forest", 12.8, 0.61, "GOOD", false],
  ["Gradient Boosting", 11.9, 0.67, "BETTER", false], ["XGBoost", 11.2, 0.71, "⭐ BEST", true],
];
const stress = [
  ["Feature removed", "Handled via ColumnTransformer remainder='drop'"],
  ["More missing values", "Median/mode imputation handles any %"],
  ["Metric changes (MAE/R²)", "All metrics computed simultaneously"],
  ["New crop/district", "OneHotEncoder handle_unknown='ignore'"],
];

function Model() {
  return (
    <SiteShell>
      <PageTitle title="🧠 ML Model" sub="The pipeline behind every FarmSense prediction." />
      <div className="grid gap-4 md:grid-cols-2">
        <Glass>
          <h3 className="mb-4 font-display font-semibold">Pipeline Steps</h3>
          <ol className="space-y-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-leaf font-semibold text-primary-foreground">{i + 1}</span>
                <div><div className="font-medium">{t}</div><div className="text-sm text-muted-foreground">{d}</div></div>
              </li>
            ))}
          </ol>
        </Glass>
        <div className="space-y-4">
          <Glass>
            <h3 className="mb-4 font-display font-semibold">Model Comparison</h3>
            <div className="grid grid-cols-2 gap-3">
              {models.map(([n, rmse, r2, b, best]) => (
                <div key={n} className={`rounded-xl border p-3 ${best ? "border-wheat/60 bg-wheat/10" : "border-border/50 bg-background/30"}`}>
                  <span className={`rounded px-2 py-0.5 font-mono text-[10px] ${best ? "bg-wheat text-background" : "bg-primary/30 text-leaf"}`}>{b}</span>
                  <div className="mt-2 text-sm font-medium">{n}</div>
                  <div className="text-xs text-muted-foreground">RMSE ~{rmse} · R² ~{r2}</div>
                  <div className="mt-2 h-2 rounded-full bg-muted/40"><div className={`h-full rounded-full ${best ? "bg-wheat" : "bg-primary"}`} style={{ width: `${r2 * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </Glass>
          <Glass><h3 className="mb-4 font-display font-semibold">Feature Importance</h3><ImportanceBars /></Glass>
        </div>
      </div>
      <Glass className="mt-4">
        <h3 className="mb-4 font-display font-semibold">Round 2 Stress Test Readiness</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {stress.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-border/50 bg-background/30 p-4">
              <div className="font-medium text-wheat">{t}</div><div className="text-sm text-muted-foreground">→ {d}</div>
            </div>
          ))}
        </div>
      </Glass>
    </SiteShell>
  );
}
