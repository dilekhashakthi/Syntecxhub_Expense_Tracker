import { useCallback, useState } from "react";
import { Download, Plus } from "lucide-react";
import toast from "react-hot-toast";
import useTransactions from "../hooks/useTransactions";
import { KINDS } from "../utils/kinds";
import { getErrorMessage } from "../utils/errors";
import CardHeader from "../components/ui/CardHeader";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import ErrorState from "../components/ui/ErrorState";
import Modal from "../components/ui/Modal";
import Skeleton from "../components/ui/Skeleton";
import TransactionCard from "../components/transactions/TransactionCard";
import TransactionForm from "../components/transactions/TransactionForm";
import { DayBarChart, DayLineChart } from "../components/charts/charts";

const TransactionsPage = ({ kind }) => {
  const config = KINDS[kind];
  const { items, loading, error, retry, addItem, removeItem, download } =
    useTransactions(kind);

  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);
  const askDelete = useCallback((item) => setPendingDelete(item), []);
  const cancelDelete = useCallback(() => setPendingDelete(null), []);

  const handleAdd = useCallback(
    async (payload) => {
      await addItem(payload);
      toast.success(`${config.title} added successfully`);
      setFormOpen(false);
    },
    [addItem, config.title],
  );

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await removeItem(pendingDelete._id);
      toast.success(`${config.title} deleted`);
      setPendingDelete(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-finora-primary sm:text-3xl">{config.title}</h1>

      <section className="card">
        <CardHeader title={config.overviewTitle} hint={config.overviewHint}>
          <button className="btn-yellow" onClick={openForm}>
            <Plus className="h-4 w-4" aria-hidden="true" /> {config.addLabel}
          </button>
        </CardHeader>
        {loading ? (
          <Skeleton className="h-64 bg-bg-light!" />
        ) : kind === "income" ? (
          <DayBarChart items={items} empty={config.emptyHint} />
        ) : (
          <DayLineChart items={items} empty={config.emptyHint} />
        )}
      </section>

      <section className="card">
        <CardHeader
          title={config.listTitle}
          hint={items.length ? `${items.length} records` : undefined}
        >
          <button className="btn-soft" onClick={download} disabled={!items.length}>
            <Download className="h-4 w-4" aria-hidden="true" /> Download Excel
          </button>
        </CardHeader>

        {loading ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Skeleton className="h-16 bg-bg-light!" />
            <Skeleton className="h-16 bg-bg-light!" />
            <Skeleton className="h-16 bg-bg-light!" />
            <Skeleton className="h-16 bg-bg-light!" />
          </div>
        ) : items.length ? (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-1 md:grid-cols-2">
            {items.map((item) => (
              <TransactionCard
                key={item._id}
                item={{ ...item, label: item[config.labelKey] }}
                kind={kind}
                onDelete={askDelete}
              />
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl bg-bg-light border border-finora-border px-4 py-10 text-center">
            <p className="font-semibold text-finora-primary">{config.emptyTitle}</p>
            <p className="mt-1 text-sm font-normal text-finora-muted">{config.emptyHint}</p>
          </div>
        )}
      </section>

      {formOpen && (
        <Modal title={config.addLabel} onClose={closeForm}>
          <TransactionForm config={config} onSubmit={handleAdd} onCancel={closeForm} />
        </Modal>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title={`Delete ${config.title.toLowerCase()}?`}
          message={`"${pendingDelete[config.labelKey]}" will be removed permanently. This can't be undone.`}
          confirmLabel="Delete"
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
