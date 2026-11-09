const CardHeader = ({ title, hint, children }) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-finora-primary">{title}</h2>
        {hint && <p className="text-sm font-normal text-finora-muted">{hint}</p>}
      </div>
      {children}
    </div>
  );
};

export default CardHeader;
