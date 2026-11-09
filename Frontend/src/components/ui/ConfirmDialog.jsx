import Modal from "./Modal";

const ConfirmDialog = ({
  title,
  message,
  confirmLabel,
  busy,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm font-normal text-[#556987]">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button className="btn-soft" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button className="btn-danger" onClick={onConfirm} disabled={busy}>
          {busy ? "Deleting..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
