import { useCallback, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Avatar from "../ui/Avatar";
import { FinoraLogo } from "../ui/FinoraLogo";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/income", label: "Income", icon: TrendingUp },
  { to: "/expense", label: "Expense", icon: TrendingDown },
];

const Layout = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [openedAt, setOpenedAt] = useState(null);
  const menuOpen = openedAt === pathname;

  const closeMenu = useCallback(() => setOpenedAt(null), []);
  const toggleMenu = () => setOpenedAt(menuOpen ? null : pathname);

  return (
    <div className="min-h-screen bg-[#F5F7FC] lg:pl-64">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-[#102D65] px-4 py-3 text-white lg:hidden">
        <FinoraLogo theme="light" showSubtitle={false} size="sm" />
        <button
          onClick={toggleMenu}
          className="rounded-lg p-2 hover:bg-white/10"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#0B2452]/60 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#102D65] text-white transition-transform duration-200 lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full max-lg:invisible"
        }`}
      >
        <div className="hidden items-center px-6 pt-7 lg:flex">
          <FinoraLogo theme="light" showSubtitle={false} size="md" />
        </div>

        <div className="mt-20 flex flex-col items-center gap-3 px-6 lg:mt-8">
          <Avatar user={user} size="h-20 w-20" text="text-2xl" />
          <div className="max-w-full text-center">
            <p className="truncate font-display text-lg font-semibold text-white">
              {user?.fullName}
            </p>
            <p className="truncate text-xs text-[#AFC3EA]">{user?.email}</p>
          </div>
        </div>

        <nav className="mt-8 flex-1 space-y-1 px-3" aria-label="Main">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl border-l-4 px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#FFB900] bg-white/10 text-white"
                    : "border-transparent text-[#AFC3EA] hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#AFC3EA] hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" /> Log out
          </button>
        </div>
      </aside>

      <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
