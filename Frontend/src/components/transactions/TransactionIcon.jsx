import { FALLBACK_ICON, ICONS } from "../../utils/icons";

const TransactionIcon = ({ kind, name, className = "h-5 w-5" }) => {
  const Icon = ICONS[kind]?.[name] ?? FALLBACK_ICON[kind];
  return <Icon className={className} aria-hidden="true" />;
};

export default TransactionIcon;
