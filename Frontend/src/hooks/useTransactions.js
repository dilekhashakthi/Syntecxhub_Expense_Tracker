import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createTransaction,
  deleteTransaction,
  downloadTransactions,
  fetchTransactions,
} from "../api/transactions.api";
import  {getErrorMessage}  from "../utils/errors";
import { byNewest, saveBlob } from "../utils/helpers";

const useTransactions = (kind) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetchTransactions(kind)
      .then((data) => {
        if (ignore) return;
        setItems(data);
        setError("");
      })
      .catch((err) => {
        if (!ignore) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [kind, reloadKey]);

  const retry = useCallback(() => {
    setLoading(true);
    setReloadKey((key) => key + 1);
  }, []);

  const addItem = useCallback(
    async (payload) => {
      const created = await createTransaction(kind, payload);
      setItems((prev) => [created, ...prev].sort(byNewest));
    },
    [kind],
  );

  const removeItem = useCallback(
    async (id) => {
      await deleteTransaction(kind, id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    },
    [kind],
  );

  const download = useCallback(async () => {
    try {
      saveBlob(await downloadTransactions(kind), `${kind}-details.xlsx`);
    } catch (err) {
      toast.error(
        getErrorMessage(err, "The download failed. Please try again."),
      );
    }
  }, [kind]);

  return { items, loading, error, retry, addItem, removeItem, download };
}

export default useTransactions