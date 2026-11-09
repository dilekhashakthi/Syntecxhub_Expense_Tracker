import { useCallback, useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../../utils/errors";
import { todayInput } from "../../utils/helpers";
import { DEFAULT_ICON_KEY } from "../../utils/icons";
import FormError from "../ui/FormError";
import IconPicker from "./IconPicker";

const TransactionForm = ({ config, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    icon: DEFAULT_ICON_KEY[config.kind],
    label: "",
    amount: "",
    date: todayInput(),
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const labelRef = useRef(null);
  const amountRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    labelRef.current?.focus();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleIconChange = useCallback((icon) => {
    setForm((prev) => ({ ...prev, icon }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.label.trim()) {
      setError(`Enter a ${config.labelName.toLowerCase()}.`);
      return labelRef.current?.focus();
    }
    if (!(Number(form.amount) > 0)) {
      setError("Enter an amount greater than 0.");
      return amountRef.current?.focus();
    }
    if (!form.date) {
      setError("Choose a date.");
      return dateRef.current?.focus();
    }

    setBusy(true);
    try {
      await onSubmit({
        icon: form.icon,
        [config.labelKey]: form.label.trim(),
        amount: Number(form.amount),
        date: form.date,
      });
    } catch (err) {
      setError(getErrorMessage(err));
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <IconPicker
        kind={config.kind}
        value={form.icon}
        onChange={handleIconChange}
      />

      <div>
        <label htmlFor="label" className="mb-1.5 block text-sm font-medium">
          {config.labelName}
        </label>
        <input
          id="label"
          name="label"
          ref={labelRef}
          value={form.label}
          onChange={handleChange}
          placeholder={config.labelPlaceholder}
          className="field"
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="amount" className="mb-1.5 block text-sm font-medium">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            ref={amountRef}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="field tabular-nums"
          />
        </div>
        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium">
            Date
          </label>
          <input
            id="date"
            name="date"
            ref={dateRef}
            type="date"
            value={form.date}
            onChange={handleChange}
            className="field"
          />
        </div>
      </div>

      <FormError>{error}</FormError>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          className="btn-soft"
          onClick={onCancel}
          disabled={busy}
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? "Saving..." : config.addLabel}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
