import { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const trigger = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose();

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B2452]/60 backdrop-blur-xs sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white border border-[#D4DDF3] p-6 shadow-2xl sm:max-w-md sm:rounded-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0B2452]">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#556987] transition-colors hover:bg-[#F5F7FC] hover:text-[#0B2452] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
