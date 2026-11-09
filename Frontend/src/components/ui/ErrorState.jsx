import { RefreshCw, TriangleAlert } from "lucide-react";

const ErrorState = ({ message, onRetry }) => {
  return (
    <div
      role="alert"
      className="card flex flex-col items-center gap-3 py-10 text-center"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-danger/10 text-danger">
        <TriangleAlert className="h-6 w-6" aria-hidden="true" />
      </span>
      <div>
        <p className="font-semibold text-finora-primary">We couldn't load this page</p>
        <p className="mt-1 text-sm font-normal text-finora-muted">{message}</p>
      </div>
      {onRetry && (
        <button className="btn-primary" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" /> Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
