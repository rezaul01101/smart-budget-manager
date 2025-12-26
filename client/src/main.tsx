import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Providers from "./lib/Providers";
import ProtectedLayout from "./lib/ProtectedLayout";
import Dashboard from "./pages/protected/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import Transactions from "./pages/protected/Transactions";
import Income from "./pages/protected/Income";
import Expenses from "./pages/protected/Expenses";
import AddLedger from "./pages/protected/AddLedger";
import TransactionEntry from "./pages/protected/TransactionEntry";
import LedgerTransactions from "./pages/protected/LedgerTransactions";


const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // 🔐 Protected area
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
          { path: "/add-ledger", element: <AddLedger /> },
          { path: "/transaction-entry/:id", element: <TransactionEntry /> },
          { path: "/ledger/:ledgerId/transactions", element: <LedgerTransactions /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
