const CURRENCY = import.meta.env.VITE_CURRENCY || "USD";

const moneyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
});
const moneyWholeFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

export const money = (n) => moneyFmt.format(n || 0);
export const moneyShort = (n) => moneyWholeFmt.format(n || 0);

const dayFmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});
const dayYearFmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const shortDate = (d) => dayFmt.format(new Date(d));
export const longDate = (d) => dayYearFmt.format(new Date(d));
export const dayKey = (d) => new Date(d).toISOString().slice(0, 10);

export const todayInput = () => {
  const now = new Date();
  return new Date(now - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
};

export const byNewest = (a, b) => new Date(b.date) - new Date(a.date);

export function groupByDay(items) {
  const totals = new Map();
  for (const item of items) {
    const key = dayKey(item.date);
    totals.set(key, (totals.get(key) || 0) + item.amount);
  }
  return [...totals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, amount]) => ({ key, day: shortDate(key), amount }));
}

export function groupByLabel(items, labelKey) {
  const totals = new Map();
  for (const item of items) {
    totals.set(item[labelKey], (totals.get(item[labelKey]) || 0) + item.amount);
  }
  return [...totals.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export const assetUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_SERVER_URL || ""}${path}`;
};

export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
