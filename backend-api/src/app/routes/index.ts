import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { LedgerRoute } from "../modules/ledger/ledger.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
