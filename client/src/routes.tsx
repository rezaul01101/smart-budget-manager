import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedLayout from "./lib/ProtectedLayout";
import Dashboard from "./pages/protected/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import Transactions from "./pages/protected/Transactions";
import Income from "./pages/protected/Income";
import Expenses from "./pages/protected/Expenses";

import TransactionEntry from "./pages/protected/TransactionEntry";
import LedgerTransactions from "./pages/protected/LedgerTransactions";
import LedgerEntry from "./pages/protected/LedgerEntry";
import { createBrowserRouter } from "react-router";
import NotFoundPage from "./pages/404";
import AddAccount from "./pages/protected/AddAccount";
import AccountList from "./pages/protected/AccountList";
import Profile from "./pages/protected/Profile";
import ForgotPassword from "./pages/auth/ForgotPassword";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },

  //Protected area
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/transactions", element: <Transactions /> },
          { path: "/income", element: <Income /> },
          { path: "/expenses", element: <Expenses /> },
          { path: "/add-ledger", element: <LedgerEntry /> },
          { path: "/edit-ledger/:ledgerId", element: <LedgerEntry /> },
          { path: "/transaction-entry/:id", element: <TransactionEntry /> },
          { path: "/ledger/:ledgerId/transactions", element: <LedgerTransactions /> },
          { path: "/add-account", element: <AddAccount /> },
          { path: "/account-list", element: <AccountList /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
