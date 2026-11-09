export const FinoraWalletIcon = ({ className = "h-9 w-9" }) => {
  return (
    <img
      src="/icon.png"
      alt="Finora icon"
      className={`${className} object-contain`}
    />
  );
};

export const FinoraLogo = ({
  theme = "light",
  showSubtitle = true,
  size = "md",
  className = "",
}) => {
  const isLight = theme === "light";
  const iconSize =
    size === "xl"
      ? "h-14 w-14"
      : size === "lg"
      ? "h-11 w-11"
      : size === "sm"
      ? "h-7 w-7"
      : "h-9 w-9";
  const textSize =
    size === "xl"
      ? "text-4xl"
      : size === "lg"
      ? "text-3xl"
      : size === "sm"
      ? "text-lg"
      : "text-2xl";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/icon.png"
        alt="Finora logo"
        className={`${iconSize} shrink-0 object-contain`}
      />
      <div className="flex flex-col">
        <div className={`${textSize} font-bold tracking-tight leading-none`}>
          <span className={isLight ? "text-white" : "text-[#102D65]"}>Fin</span>
          <span className="text-[#FFB900]">ora</span>
        </div>
        {showSubtitle && (
          <span
            className={`mt-1.5 text-xs font-normal tracking-wide ${
              isLight ? "text-[#AFC3EA]" : "text-[#556987]"
            }`}
          >
            Personal Finance Tracker
          </span>
        )}
      </div>
    </div>
  );
};

export default FinoraLogo;
