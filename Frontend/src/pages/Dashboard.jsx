import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useDashboard from "../hooks/useDashboard";
import CardHeader from "../components/ui/CardHeader";
import ErrorState from "../components/ui/ErrorState";
import Skeleton from "../components/ui/Skeleton";
import StatCard from "../components/transactions/StatCard";
import TransactionCard from "../components/transactions/TransactionCard";
import {
  BalancePie,
  DayBarChart,
  SourcePie,
} from "../components/charts/charts";

function SeeAll({ to }) {
  return (
    <Link to={to} className="btn-soft py-1.5! px-3! text-xs font-semibold">
      See all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

function List({ items, kind }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <TransactionCard key={item._id} item={item} kind={kind ?? item.type} />
      ))}
    </ul>
  );
}

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading, error, retry } = useDashboard();

  const spentShare = useMemo(() => {
    if (!data?.totalIncome) return 0;
    return Math.min(
      100,
      Math.round((data.totalExpense / data.totalIncome) * 100),
    );
  }, [data]);

  if (loading) {
    return (
      <div
        className="space-y-6"
        aria-busy="true"
        aria-label="Loading dashboard"
      >
        <Skeleton className="h-9 w-64 bg-white" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Skeleton className="h-40 bg-white" />
          <Skeleton className="h-40 bg-white" />
          <Skeleton className="h-40 bg-white" />
        </div>
        <Skeleton className="h-80 bg-white" />
      </div>
    );
  }
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const firstName = user?.fullName?.split(" ")[0];
  const isEmpty = data.recentTransactions.length === 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B2452] sm:text-3xl">
          Welcome back{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-1 text-sm font-normal text-[#556987]">
          Here is where your money stands today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          hero
          label="Total balance"
          value={data.totalBalance}
          icon={Wallet}
        >
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#FFB900] transition-[width] duration-700"
                style={{ width: `${spentShare}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-normal text-[#AFC3EA]">
              {data.totalIncome
                ? `${spentShare}% of your income is spent`
                : "Add income to see how much you spend"}
            </p>
          </div>
        </StatCard>
        <StatCard
          label="Total income"
          value={data.totalIncome}
          icon={TrendingUp}
          tone="gain"
        />
        <StatCard
          label="Total expense"
          value={data.totalExpense}
          icon={TrendingDown}
          tone="loss"
        />
      </div>

      {isEmpty ? (
        <section className="card text-center">
          <h2 className="text-xl font-bold text-[#0B2452]">Nothing tracked yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm font-normal text-[#556987]">
            Add your first income or expense and your charts will appear here.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/income" className="btn-yellow">
              Add income
            </Link>
            <Link to="/expense" className="btn-soft">
              Add expense
            </Link>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="card">
            <CardHeader
              title="Recent transactions"
              hint="Latest income and expenses"
            />
            <List items={data.recentTransactions} />
          </section>

          <section className="card">
            <CardHeader
              title="Financial overview"
              hint="Balance, income and expenses"
            />
            <BalancePie
              balance={data.totalBalance}
              income={data.totalIncome}
              expense={data.totalExpense}
            />
          </section>

          <section className="card">
            <CardHeader title="Expenses" hint="Most recent spending">
              <SeeAll to="/expense" />
            </CardHeader>
            {data.recentExpenses.length ? (
              <List items={data.recentExpenses} kind="expense" />
            ) : (
              <p className="text-sm font-normal text-[#556987]">No expenses yet.</p>
            )}
          </section>

          <section className="card">
            <CardHeader title="Last 30 days expenses" hint="Daily spending" />
            <DayBarChart
              items={data.last30DaysExpenses.transactions}
              color="#EF4444"
              empty="No expenses in the last 30 days."
            />
          </section>

          <section className="card">
            <CardHeader
              title="Last 60 days income"
              hint="Where your income came from"
            />
            <SourcePie
              items={data.last60DaysIncome.transactions}
              labelKey="source"
              total={data.last60DaysIncome.total}
            />
          </section>

          <section className="card">
            <CardHeader title="Income" hint="Most recent earnings">
              <SeeAll to="/income" />
            </CardHeader>
            {data.recentIncome.length ? (
              <List items={data.recentIncome} kind="income" />
            ) : (
              <p className="text-sm font-normal text-[#556987]">No income yet.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
