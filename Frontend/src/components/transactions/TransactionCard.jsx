import { memo } from "react";
import { Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { longDate, money } from "../../utils/helpers";
import TransactionIcon from "./TransactionIcon";

const TransactionCard = memo(function TransactionCard({
  item,
  kind,
  onDelete,
}) {
  const isIncome = kind === "income";
  const label = item.label ?? item.source ?? item.category;
  const Arrow = isIncome ? TrendingUp : TrendingDown;

  return (
    <li className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-bg-light">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bg-light border border-finora-border/60 text-finora-primary transition-colors group-hover:bg-white">
        <TransactionIcon kind={kind} name={item.icon} className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-finora-primary">{label}</p>
        <p className="text-xs text-finora-muted">{longDate(item.date)}</p>
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(item)}
          aria-label={`Delete ${label}`}
          className="rounded-lg p-2 text-finora-muted transition-colors hover:bg-danger/10 hover:text-danger lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      <span
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm font-semibold tabular-nums ${
          isIncome ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
        }`}
      >
        <Arrow className="h-3.5 w-3.5" aria-hidden="true" />
        {isIncome ? "+" : "-"}
        {money(item.amount)}
      </span>
    </li>
  );
});

export default TransactionCard;
