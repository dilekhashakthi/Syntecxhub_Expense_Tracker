import { memo } from "react";
import { money } from "../../utils/helpers";

const TONES = {
  gain: "bg-[#16A34A]/10 text-[#16A34A]",
  loss: "bg-[#EF4444]/10 text-[#EF4444]",
};

const StatCard = memo(function StatCard({
  label,
  value,
  icon: Icon,
  tone,
  children,
  hero = false,
}) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-card sm:p-6 transition-all ${
        hero
          ? "bg-[#102D65] text-white border border-[#102D65]"
          : "bg-white border border-[#D4DDF3] text-[#0B2452]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-xl font-bold ${
            hero ? "bg-[#FFB900] text-[#0B2452]" : TONES[tone]
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span
          className={`text-sm font-medium ${
            hero ? "text-[#AFC3EA]" : "text-[#556987]"
          }`}
        >
          {label}
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-bold tracking-tight tabular-nums">
        {money(value)}
      </p>
      {children}
    </div>
  );
});

export default StatCard;
