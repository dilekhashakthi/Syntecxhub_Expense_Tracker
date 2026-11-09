const CardHeader = ({ title, hint, children }) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-[#0B2452]">{title}</h2>
        {hint && <p className="text-sm font-normal text-[#556987]">{hint}</p>}
      </div>
      {children}
    </div>
  );
};

export default CardHeader;
