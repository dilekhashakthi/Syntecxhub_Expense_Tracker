import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PasswordInput = ({ inputRef, leftIcon = true, className = "", ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      {leftIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-finora-primary">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
      <input
        {...props}
        ref={inputRef}
        type={visible ? "text" : "password"}
        className={`w-full rounded-2xl border border-finora-border bg-white py-3.5 ${
          leftIcon ? "pl-11" : "pl-4"
        } pr-11 text-sm font-normal text-finora-primary placeholder:font-normal placeholder:text-finora-muted transition-colors focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 focus:outline-none ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-finora-primary/70 hover:text-finora-primary cursor-pointer"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOff className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Eye className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
