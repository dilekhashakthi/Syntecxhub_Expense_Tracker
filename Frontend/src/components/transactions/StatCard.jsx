import { memo } from "react";
import { money } from "../../utils/helpers";

const TONES = {
  gain: "bg-success/10 text-success",
  loss: "bg-danger/10 text-danger",
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
          ? "bg-primary-navy text-white border border-primary-navy"
          : "bg-white border border-finora-border text-finora-primary"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-xl font-bold ${
            hero ? "bg-primary-yellow text-finora-primary" : TONES[tone]
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span
          className={`text-sm font-medium ${
            hero ? "text-finora-secondary" : "text-finora-muted"
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
