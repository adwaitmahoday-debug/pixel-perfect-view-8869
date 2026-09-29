export const cropBase: Record<string, number> = {
  Wheat: 28.5, Rice: 30.7, Soybean: 28.4, Maize: 27.5, Cotton: 26.7, Onion: 27.9, Tomato: 27.9, Potato: 33.8,
};
export const districtAvg: Record<string, number> = {
  Dewas: 30.85, Nashik: 30.19, Sehore: 28.84, Ujjain: 27.44, Indore: 27.39, Bhopal: 27.18,
};
export const seasonMult: Record<string, number> = { Kharif: 1.02, Rabi: 0.98, Summer: 1.01 };
export const OVERALL_AVG = 28.69;

export const featureImportance = [
  { name: "Crop Type", v: 31 }, { name: "District", v: 24 }, { name: "Soil pH", v: 14 },
  { name: "Season", v: 12 }, { name: "Rainfall", v: 9 }, { name: "Temperature", v: 6 }, { name: "Fertilizer", v: 4 },
];

export const priceByCrop = [
  { name: "Potato", v: 33.8 }, { name: "Rice", v: 30.73 }, { name: "Soybean", v: 28.43 }, { name: "Maize", v: 27.48 },
  { name: "Onion", v: 27.92 }, { name: "Tomato", v: 27.91 }, { name: "Wheat", v: 28.2 }, { name: "Cotton", v: 26.73 },
];
export const priceBySeason = [
  { name: "Kharif", v: 29.04 }, { name: "Rabi", v: 28.11 }, { name: "Summer", v: 28.97 },
];
export const cropCount = [
  { name: "Wheat", v: 320 }, { name: "Soybean", v: 170 }, { name: "Onion", v: 170 }, { name: "Rice", v: 169 },
  { name: "Tomato", v: 155 }, { name: "Cotton", v: 154 }, { name: "Maize", v: 150 }, { name: "Potato", v: 145 },
];
export const palette = [
  "var(--wheat)", "var(--leaf)", "var(--primary)", "var(--soil)",
  "oklch(0.7 0.15 40)", "oklch(0.65 0.18 25)", "oklch(0.75 0.12 190)", "oklch(0.7 0.1 110)",
];

export type PredictInput = {
  crop: string; district: string; season: string; area: number; ph: number; moisture: number;
  rainfall: number; temp: number; fertilizer: number; pesticide: number; yieldT: number; water: number;
};

export function predict(i: PredictInput) {
  let p = cropBase[i.crop] + (districtAvg[i.district] - OVERALL_AVG) * 0.65;
  p *= seasonMult[i.season];
  const d = Math.abs(i.ph - 6.5);
  p += d < 0.5 ? 1.2 : d < 1 ? 0 : -1.5;
  p += i.rainfall > 200 ? -1 : i.rainfall > 80 ? 0.8 : -0.5;
  if (Math.abs(i.temp - 27) > 10) p -= 1.5;
  const density = i.area > 0 ? i.yieldT / i.area : 0;
  p += density > 2 ? 1 : density < 1 ? -0.5 : 0;
  p += (Math.random() * 2 - 1) * 2.5;
  p = Math.min(80, Math.max(8, p));
  const revenue = p * i.yieldT * 1000;
  const vsAvg = ((p - districtAvg[i.district]) / districtAvg[i.district]) * 100;
  const stressScore = (d > 1 ? 1 : 0) + (Math.abs(i.temp - 27) > 8 ? 1 : 0) + (i.moisture < 20 || i.moisture > 75 ? 1 : 0);
  const stress = stressScore === 0 ? "LOW" : stressScore === 1 ? "MOD" : "HIGH";
  const waterEff = i.yieldT > 0 ? i.water / i.yieldT : 0;
  const confidence = Math.round(88 - stressScore * 6 - Math.random() * 5);
  const best = Object.entries(districtAvg).sort((a, b) => b[1] - a[1])[0][0];
  const advice: string[] = [
    `Predicted price for ${i.crop} in ${i.district} is ₹${p.toFixed(2)}/kg, giving an estimated revenue of ₹${Math.round(revenue).toLocaleString("en-IN")}.`,
    p >= districtAvg[i.district] ? "Prices look above the local average — a good time to sell." : "Price is below the local average — consider storing or selling in a stronger market.",
  ];
  if (i.ph < 5.5) advice.push("Soil pH is acidic (<5.5): apply agricultural lime before next sowing.");
  if (waterEff > 50000) advice.push("Water use per tonne is high — drip irrigation could cut usage significantly.");
  if (districtAvg[i.district] < OVERALL_AVG) advice.push(`${best} currently offers the best average price (₹${districtAvg[best]}/kg).`);
  return { price: p, revenue, vsAvg, stress, waterEff, confidence, advice };
}
