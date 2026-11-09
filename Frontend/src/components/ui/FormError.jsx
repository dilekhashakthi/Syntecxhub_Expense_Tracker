import { CircleAlert } from "lucide-react";

const FormError = ({ children }) => {
  if (!children) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 px-3.5 py-2.5 text-sm font-medium text-[#EF4444]"
    >
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
};

export default FormError;
