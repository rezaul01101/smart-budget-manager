import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { LedgerRoute } from "../modules/ledger/ledger.route";
import { TransactionRoute } from '../modules/transaction/transaction.route';
import { AccountRoute } from "../modules/account/account.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/ledger",
    route: LedgerRoute,
  },
  {
    path: "/transaction",
    route: TransactionRoute,
  },
  {
    path: "/account",
    route: AccountRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
