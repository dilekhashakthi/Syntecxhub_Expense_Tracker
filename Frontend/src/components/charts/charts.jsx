import { memo, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  groupByDay,
  groupByLabel,
  money,
  moneyShort,
} from "../../utils/helpers";

const COLORS = {
  gain: "#16A34A",
  loss: "#EF4444",
  balance: "#102D65",
  primaryBlue: "#4779D5",
  yellow: "#FFB900",
  grid: "#D4DDF3",
  axis: "#556987",
};

const SLICES = [
  "#102D65",
  "#4779D5",
  "#FFB900",
  "#16A34A",
  "#EF4444",
  "#6366F1",
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  return (
    <div className="rounded-xl bg-[#102D65] border border-white/10 px-3.5 py-2 text-xs text-white shadow-xl">
      <p className="text-[#AFC3EA] font-medium">{label ?? point.name}</p>
      <p className="text-sm font-bold tabular-nums text-white">{money(point.value)}</p>
    </div>
  );
}

function Empty({ children = "No data to chart yet." }) {
  return (
    <div className="grid h-64 place-items-center rounded-2xl bg-[#F5F7FC] border border-[#D4DDF3] px-4 text-center text-sm font-normal text-[#556987]">
      {children}
    </div>
  );
}

const axisProps = {
  tickLine: false,
  axisLine: false,
  tick: { fill: COLORS.axis, fontSize: 12 },
};

function Legend({ rows }) {
  return (
    <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-sm">
      {rows.map((row) => (
        <li key={row.name} className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: row.fill }}
          />
          <span className="text-[#556987] font-medium text-xs">{row.name}</span>
        </li>
      ))}
    </ul>
  );
}

function Donut({ rows, centerLabel, centerValue }) {
  return (
    <>
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={rows}
              dataKey="value"
              innerRadius="68%"
              outerRadius="92%"
              paddingAngle={3}
              stroke="none"
            />
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-xs font-normal text-[#556987]">{centerLabel}</p>
            <p className="font-display text-2xl font-bold tabular-nums text-[#0B2452]">
              {centerValue}
            </p>
          </div>
        </div>
      </div>
      <Legend rows={rows} />
    </>
  );
}

export const BalancePie = memo(function BalancePie({
  balance,
  income,
  expense,
}) {
  const rows = useMemo(
    () => [
      {
        name: "Total balance",
        value: Math.max(balance, 0),
        fill: COLORS.balance,
      },
      { name: "Total expenses", value: expense, fill: COLORS.loss },
      { name: "Total income", value: income, fill: COLORS.gain },
    ],
    [balance, income, expense],
  );
  if (!income && !expense) return <Empty />;
  return (
    <Donut
      rows={rows}
      centerLabel="Total balance"
      centerValue={money(balance)}
    />
  );
});

export const SourcePie = memo(function SourcePie({ items, labelKey, total }) {
  const rows = useMemo(
    () =>
      groupByLabel(items, labelKey).map((row, i) => ({
        ...row,
        fill: SLICES[i % SLICES.length],
      })),
    [items, labelKey],
  );
  if (!rows.length) return <Empty>No income in the last 60 days.</Empty>;
  return (
    <Donut rows={rows} centerLabel="Total income" centerValue={money(total)} />
  );
});

export const DayBarChart = memo(function DayBarChart({
  items,
  color = COLORS.gain,
  empty,
}) {
  const data = useMemo(() => groupByDay(items), [items]);
  if (!data.length) return <Empty>{empty}</Empty>;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            stroke={COLORS.grid}
            strokeDasharray="4 4"
          />
          <XAxis dataKey="day" {...axisProps} minTickGap={16} />
          <YAxis {...axisProps} width={56} tickFormatter={moneyShort} />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: "rgba(16,45,101,0.06)" }}
          />
          <Bar
            dataKey="amount"
            fill={color}
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export const DayLineChart = memo(function DayLineChart({
  items,
  color = COLORS.loss,
  empty,
}) {
  const data = useMemo(() => groupByDay(items), [items]);
  if (!data.length) return <Empty>{empty}</Empty>;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke={COLORS.grid}
            strokeDasharray="4 4"
          />
          <XAxis dataKey="day" {...axisProps} minTickGap={16} />
          <YAxis {...axisProps} width={56} tickFormatter={moneyShort} />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 4, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
