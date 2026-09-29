import { featureImportance, palette } from "@/lib/farm-data";

export function ImportanceBars() {
  return (
    <div className="space-y-3">
      {featureImportance.map((f, i) => (
        <div key={f.name}>
          <div className="mb-1 flex justify-between text-sm">
            <span>{f.name}</span>
            <span className="font-mono text-muted-foreground">{f.v}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-muted/40">
            <div className="h-full rounded-full" style={{ width: `${(f.v / 31) * 100}%`, background: palette[i] }} />
          </div>
        </div>
      ))}
    </div>
  );
}
