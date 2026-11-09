import { ICON_OPTIONS } from "../../utils/icons";

const IconPicker = ({ kind, value, onChange }) => {
  const options = ICON_OPTIONS[kind];
  const selected = options.find((option) => option.key === value);

  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-finora-primary">
        Icon
        {selected && (
          <span className="ml-2 font-normal text-finora-muted">
            {selected.label}
          </span>
        )}
      </legend>
      <div
        role="radiogroup"
        aria-label="Choose an icon"
        className="grid grid-cols-6 gap-2"
      >
        {options.map(({ key, label, Icon }) => {
          const isSelected = key === value;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={label}
              title={label}
              onClick={() => onChange(key)}
              className={`grid h-11 place-items-center rounded-xl border transition-colors cursor-pointer ${
                isSelected
                  ? "border-primary-navy bg-primary-navy text-white shadow-sm"
                  : "border-finora-border bg-white text-finora-muted hover:bg-bg-light hover:text-finora-primary"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default IconPicker;
